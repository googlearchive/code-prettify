/**
 * @license
 * Copyright (C) 2015 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Dynamically load script
 *
 * @param {string} url JavaScript file
 * @param {Function=} opt_func onload callback
 */
function injectJS(url, opt_func) {
  var el = document.createElement('script');
  if (typeof opt_func === 'function') {
    el.onload = el.onerror = el.onreadystatechange = function () {
      if (el && (!el.readyState || /loaded|complete/.test(el.readyState))) {
        el.onerror = el.onload = el.onreadystatechange = null;
        el = null;
        opt_func();
      }
    };
  }
  el.type = 'text/javascript';
  el.src = url;
  document.getElementsByTagName('head')[0].appendChild(el);
}

/**
 * Dynamically load stylesheet
 *
 * @param {string} url CSS file
 */
function injectCSS(url) {
  var el = document.createElement('link');
  el.rel = 'stylesheet';
  el.type = 'text/css';
  el.href = url;
  document.getElementsByTagName('head')[0].appendChild(el);
}

/**
 * Perform syntax highlighting and execute tests to verify results.
 *
 * @param {Object<string,string>} goldens a mapping from IDs of prettyprinted
 *   chunks to an abbreviated form of the expected output.  See "var goldens"
 *   in prettify_test.html and prettify_test_2.html for examples.
 */
function runTests(goldens) {
  // Regexp literals defined here so that the interpreter doesn't have to
  // compile them each time the function containing them is called.
  /** @const {RegExp} */
  var ampRe = /&/g;
  /** @const {RegExp} */
  var ltRe = /</g;
  /** @const {RegExp} */
  var gtRe = />/g;
  /** @const {RegExp} */
  var quotRe = /\"/g;
  /** @const {RegExp} */
  var nbspRe = /\xa0/g;
  /** @const {RegExp} */
  var newlineRe = /[\r\n]/g;
  /** @const {RegExp} */
  var voidElemsRe = /^(?:br|hr|link|img)$/;

  /** @type {?boolean} */
  var innerHtmlWorks = null;

  /**
   * Get timestamp in milliseconds unit.
   *
   * @return {number}
   */
  function now() {
    return (Date.now ? Date.now() : (new Date()).getTime());
  }

  /**
   * Escapes HTML special characters to HTML.
   *
   * @param {string} str the HTML to escape
   * @return {string} output escaped HTML
   */
  function textToHtml(str) {
    return str
      .replace(ampRe, '&amp;')
      .replace(ltRe, '&lt;')
      .replace(gtRe, '&gt;');
  }

  /**
   * Like {@link textToHtml} but escapes double quotes to be attribute safe.
   *
   * @param {string} str the HTML to escape
   * @return {string} output escaped HTML
   */
  function attribToHtml(str) {
    return textToHtml(str).replace(quotRe, '&quot;');
  }

  /**
   * convert a plain text string to HTML by escaping HTML special chars.
   *
   * @param {string} plainText
   * @return {string}
   */
  function htmlEscape(plainText) {
    return attribToHtml(plainText).replace(nbspRe, '&nbsp;');
  }

  /**
   * Traverse node and manually build `innerHTML`.
   *
   * @param {Node} node DOM node
   * @param {string} out HTML content
   * @param {boolean=} opt_sortAttrs if attributes should be sorted
   */
  function normalizedHtml(node, out, opt_sortAttrs) {
    switch (node.nodeType) {
      case 1:  // ELEMENT_NODE
        // start-tag
        var name = node.tagName.toLowerCase();
        out.push('<', name);
        // attributes
        var attrs = node.attributes;
        var n = attrs.length;
        if (n) {
          if (opt_sortAttrs) {
            // sort attributes by name
            var sortedAttrs = [];
            for (var i = n; --i >= 0;) { sortedAttrs[i] = attrs[i]; }
            sortedAttrs.sort(function (a, b) {
              return (a.name < b.name) ? -1 : (a.name === b.name ? 0 : 1);
            });
            attrs = sortedAttrs;
          }
          for (var i = 0; i < n; ++i) {
            var attr = attrs[i];
            // specified: <tag atn> vs. <tag atn="atv">
            if (!attr.specified) { continue; }
            out.push(' ', attr.name.toLowerCase(),
              '="', attribToHtml(attr.value), '"');
          }
        }
        out.push('>');
        // children
        for (var child = node.firstChild; child; child = child.nextSibling) {
          normalizedHtml(child, out, opt_sortAttrs);
        }
        // end-tag
        if (node.firstChild || !voidElemsRe.test(name)) {
          out.push('<\/', name, '>');
        }
        break;
      case 3:  // TEXT_NODE
      case 4:  // CDATA_SECTION_NODE
        out.push(textToHtml(node.nodeValue));
        break;
    }
  }

  /**
   * get normalized markup.  innerHTML varies enough across browsers that we
   * can't use it.
   *
   * @param {Node} node
   * @return {string}
   */
  function normalizedInnerHtml(node) {
    // manually build innerHTML with sorted attributes
    var out = [];
    for (var child = node.firstChild; child; child = child.nextSibling) {
      normalizedHtml(child, out, true);
    }
    out = out.join('');

    // more normalization to work around problems with non-ascii chars in
    // regexps in Safari
    for (var i = 0; (i = out.indexOf('\xa0')) >= 0;) {
      out = out.substring(0, i) + '&nbsp;' + out.substring(i + 1);
    }
    return out.replace(/\r\n?/g, '\n');
  }

  /**
   * Are newlines and adjacent spaces significant in the given node's
   * `innerHTML`?
   *
   * @param {Node} node DOM node
   * @param {string} content its HTML content
   * @return {boolean} is it preformatted
   */
  function isPreformatted(node, content) {
    // PRE means preformatted, and is a very common case, so don't create
    // unnecessary computed style objects.
    if ('PRE' === node.tagName) { return true; }
    if (!newlineRe.test(content)) { return true; }  // Don't care
    var whitespace = '';
    // For disconnected nodes, IE has no currentStyle.
    if (node.currentStyle) {
      whitespace = node.currentStyle.whiteSpace;
    } else if (window.getComputedStyle) {
      // Firefox makes a best guess if node is disconnected whereas Safari
      // returns the empty string.
      whitespace = window.getComputedStyle(node, null).whiteSpace;
    }
    return !whitespace || whitespace === 'pre';
  }

  /**
   * Get `innerHTML` of a node
   *
   * @param {Node} node DOM node
   * @return {string} HTML content
   */
  function getInnerHtml(node) {
    // innerHTML is hopelessly broken in Safari 2.0.4 when the content is
    // an HTML description of well formed XML and the containing tag is a PRE
    // tag, so we detect that case and emulate innerHTML.
    if (null === innerHtmlWorks) {
      var testNode = document.createElement('pre');
      testNode.appendChild(
        document.createTextNode('<!DOCTYPE foo PUBLIC "foo bar">\n<foo />'));
      innerHtmlWorks = !/</.test(testNode.innerHTML);
    }

    if (innerHtmlWorks) {
      var content = node.innerHTML;
      // XMP tags contain unescaped entities so require special handling.
      if ('XMP' === node.tagName) {
        content = textToHtml(content);
      } else if (!isPreformatted(node, content)) {
        content = content.replace(/(<br\s*\/?>)[\r\n]+/g, '$1')
          .replace(/(?:[\r\n]+[ \t]*)+/g, ' ');
      }
      return content;
    } else {
      var out = [];
      for (var child = node.firstChild; child; child = child.nextSibling) {
        normalizedHtml(child, out);
      }
      return out.join('');
    }
  }

  /**
   * number of characters in common from the beginning.
   *
   * @param {string} a
   * @param {string} b
   * @return {number}
   */
  function commonPrefix(a, b) {
    var n = Math.min(a.length, b.length);
    var i;
    for (i = 0; i < n; ++i) {
      if (a.charAt(i) !== b.charAt(i)) { break; }
    }
    return i;
  }

  /**
   * number of characters in common at the end up to max.
   *
   * @param {string} a
   * @param {string} b
   * @param {number} max
   * @return {number}
   */
  function commonSuffix(a, b, max) {
    var n = Math.min(a.length - max, b.length - max);
    var i;
    for (i = 0; i < n; ++i) {
      if (a.charAt(a.length - i - 1) !== b.charAt(b.length - i - 1)) { break; }
    }
    return i;
  }

  /**
   * Replace whitespace characters with printable graphical representations.
   *
   * @param {string} txt
   * @return {string}
   */
  function showAllCharacters(txt) {
    // space   = \xb7, \u02f0, \u2219, \u2423, \u2420
    // htab    = \xbb, \u21e5, \u25b8, \u2409
    // newline = \xac, \xb6, \u21b5, \u2424
    // vtab    = \u240B
    // ffeed   = \u240C
    return txt
      .replace(/ /g, '\xb7')
      .replace(/(\r?\n)/g, '\u21b5$1')
      .replace(/\t/g, '\u25b8')
      .replace(/\v/g, '\u240B')
      .replace(/\f/g, '\u240C');
  }

  /**
   * Find differences between two texts, and return an HTML report.
   *
   * @param {string} golden text
   * @param {string} actual text
   * @return {string} HTML representation
   */
  function diffTexts(golden, actual) {
    if (true) {
      golden = showAllCharacters(golden);
      actual = showAllCharacters(actual);
    }
    var npre = commonPrefix(golden, actual);
    var npost = commonSuffix(golden, actual, npre);
    return (
      '<table class="diff"><tr><th>Golden<\/th><td><code>' +
      htmlEscape(golden.substring(0, npre)) +
      '&raquo;<span class="mismatch">' +
      htmlEscape(golden.substring(npre, golden.length - npost)) +
      '<\/span>&laquo;' +
      htmlEscape(golden.substring(golden.length - npost)) +
      '<\/code><\/td><\/tr><tr><th>Actual<\/th><td><code>' +
      htmlEscape(actual.substring(0, npre)) +
      '&raquo;<span class="mismatch">' +
      htmlEscape(actual.substring(npre, actual.length - npost)) +
      '<\/span>&laquo;' +
      htmlEscape(actual.substring(actual.length - npost)) +
      '<\/code><\/td><\/tr><\/table>'
    );
  }

  /**
   * Convert golden from abbreviated form back to original text
   *
   * @param {string} golden
   * @return {string}
   */
  function expandGolden(golden) {
    return golden.replace(/`([A-Z]{3})/g, function (_, lbl) {
        // convert abbreviations that start with `
        return (lbl === 'END' ? '<\/span>' :
          '<span class="' + lbl.toLowerCase() + '">');
      })
      // line numbers
      .replace(/`#(?![0-9])/, '<li class="L0">')
      .replace(/`#([0-9])/g, '<\/li><li class="L$1">');
  }

  /**
   * Compare tests results against expected outcomes.
   *
   * @param {Object<string,string>} goldens
   * @return {{html: Array<string>, pass: integer, fail: integer}} HTML report
   */
  function runComparison(goldens) {
    var out = [];
    var npass = 0;
    var nfail = 0;
    for (var id in goldens) {
      // compare actual against expexted
      var golden = expandGolden(goldens[id]);
      var actual = normalizedInnerHtml(document.getElementById(id));
      var diff = golden !== actual;
      out.push('<div class="test">' + (diff ? 'FAIL' : 'PASS') +
        ': <a href="#' + id + '">' + id + '<\/a><\/div>');
      if (diff) {
        ++nfail;
        // write out difference
        out.push(
          diffTexts(golden, actual).replace(/&lt;br&gt;/g, '&lt;br&gt;\n'));
      } else {
        ++npass;
      }
    }
    out.unshift(
      '<p class="pass">\u2714 ' + npass + ' passing<\/p>',
      '<p class="fail">\u2718 ' + nfail + ' failing<\/p>');
    out.push('<h3 id="summary">Tests ' +
      (nfail ? 'failed' : 'passed') + '<\/h3>');
    return {
      html: out,
      pass: npass,
      fail: nfail
    };
  }

  // for more accurate timing, no continuation.
  // This file must be loaded after prettify.js for this to work.
  window.PR_SHOULD_USE_CONTINUATION = false;

  // time syntax highlighting
  var t = now();    // tic
  PR.prettyPrint(function () {
    t = now() - t;  // toc

    // verify results against golden and write HTML report
    var report = runComparison(goldens);
    document.title += (' \u2014 ' + (report.fail ? 'FAIL' : 'PASS'));
    report.html.unshift('<p id="timing">Took ' + t + ' ms<\/p>');
    document.getElementById('report').innerHTML = report.html.join('\n');
  });
}
