/**
 * @license
 * Copyright (C) 2015 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// get accurate timing.
// This file must be loaded after prettify.js for this to work.
PR_SHOULD_USE_CONTINUATION = false;

var attribToHtml, textToHtml;

var getInnerHtml;

(function () {
  /** is the given node's innerHTML normally unescaped? */
  function isRawContent(node) {
    return 'XMP' === node.tagName;
  }

  var newlineRe = /[\r\n]/g;
  /**
   * Are newlines and adjacent spaces significant in the given node's innerHTML?
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

  // Define regexps here so that the interpreter doesn't have to create an
  // object each time the function containing them is called.
  // The language spec requires a new object created even if you don't access
  // the $1 members.
  var pr_amp = /&/g;
  var pr_lt = /</g;
  var pr_gt = />/g;
  var pr_quot = /\"/g;

  /** escapest html special characters to html. */
  textToHtml = function (str) {
    return str.replace(pr_amp, '&amp;')
        .replace(pr_lt, '&lt;')
        .replace(pr_gt, '&gt;');
  };

  /** like textToHtml but escapes double quotes to be attribute safe. */
  attribToHtml = function (str) {
    return str.replace(pr_amp, '&amp;')
        .replace(pr_lt, '&lt;')
        .replace(pr_gt, '&gt;')
        .replace(pr_quot, '&quot;');
  };

  var PR_innerHtmlWorks = null;
  getInnerHtml = function (node) {
    // inner html is hopelessly broken in Safari 2.0.4 when the content is
    // an html description of well formed XML and the containing tag is a PRE
    // tag, so we detect that case and emulate innerHTML.
    if (null === PR_innerHtmlWorks) {
      var testNode = document.createElement('PRE');
      testNode.appendChild(
          document.createTextNode('<!DOCTYPE foo PUBLIC "foo bar">\n<foo />'));
      PR_innerHtmlWorks = !/</.test(testNode.innerHTML);
    }

    if (PR_innerHtmlWorks) {
      var content = node.innerHTML;
      // XMP tags contain unescaped entities so require special handling.
      if (isRawContent(node)) {
        content = textToHtml(content);
      } else if (!isPreformatted(node, content)) {
        content = content.replace(/(<br\s*\/?>)[\r\n]+/g, '$1')
            .replace(/(?:[\r\n]+[ \t]*)+/g, ' ');
      }
      return content;
    }

    var out = [];
    for (var child = node.firstChild; child; child = child.nextSibling) {
      normalizedHtml(child, out);
    }
    return out.join('');
  };
})();

function normalizedHtml(node, out, opt_sortAttrs) {
  switch (node.nodeType) {
    case 1:  // an element
      var name = node.tagName.toLowerCase();

      out.push('<', name);
      var attrs = node.attributes;
      var n = attrs.length;
      if (n) {
        if (opt_sortAttrs) {
          var sortedAttrs = [];
          for (var i = n; --i >= 0;) { sortedAttrs[i] = attrs[i]; }
          sortedAttrs.sort(function (a, b) {
              return (a.name < b.name) ? -1 : a.name === b.name ? 0 : 1;
            });
          attrs = sortedAttrs;
        }
        for (var i = 0; i < n; ++i) {
          var attr = attrs[i];
          if (!attr.specified) { continue; }
          out.push(' ', attr.name.toLowerCase(),
                   '="', attribToHtml(attr.value), '"');
        }
      }
      out.push('>');
      for (var child = node.firstChild; child; child = child.nextSibling) {
        normalizedHtml(child, out, opt_sortAttrs);
      }
      if (node.firstChild || !/^(?:br|link|img)$/.test(name)) {
        out.push('<\/', name, '>');
      }
      break;
    case 3: case 4: // text
      out.push(textToHtml(node.nodeValue));
      break;
  }
}


/**
 * @param golden a mapping from IDs of prettyprinted chunks to an abbreviated
 *     form of the expected output.  See "var goldens" in prettify_test.html
 *     for an example.
 */
function go(goldens) {
  startClock();
  prettyPrint(function () { stopClock(); runTests(goldens); });
}

function runTests(goldens) {
  /** number of characters in common at the end up to max. */
  function commonPrefix(a, b) {
    var n = Math.min(a.length, b.length);
    var i;
    for (i = 0; i < n; ++i) {
      if (a.charAt(i) !== b.charAt(i)) { break; }
    }
    return i;
  }

  /** number of characters in common at the end up to max. */
  function commonSuffix(a, b, max) {
    var n = Math.min(a.length - max, b.length - max);
    var i;
    for (i = 0; i < n; ++i) {
      if (a.charAt(a.length - i - 1) !== b.charAt(b.length - i - 1)) { break; }
    }
    return i;
  }

  /** convert a plain text string to html by escaping html special chars. */
  function html(plainText) {
    return attribToHtml(plainText).replace(/\xa0/g, '&nbsp;');
  }

  /**
   * get normalized markup.  innerHTML varies enough across browsers that we
   * can't use it.
   */
  function normalizedInnerHtml(node) {
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

  var htmlOut = [];
  var failures = 0;
  document.getElementById('errorReport').innerHTML =
      '<h1>Running tests&hellip;<\/h1>';
  htmlOut.push('<h1>Test results<\/h1>');
  for (var lang in goldens) {
    var container = document.getElementById(lang);
    // Convert abbreviations that start with `.
    var golden = goldens[lang].replace(/`([A-Z]{3})/g, function (_, lbl) {
        return (lbl == 'END'
            ? '<\/span>'
            : '<span class="' + lbl.toLowerCase() + '">');
      })
      // Line numbers
      .replace(/`#(?![0-9])/, '<li class="L0">')
      .replace(/`#([0-9])/g, '</li><li class="L$1">');
    var actual = normalizedInnerHtml(container);
    if (golden !== actual) {  // test failed
      // write out
      var pre = commonPrefix(golden, actual);
      var post = commonSuffix(golden, actual, pre);

      ++failures;
      htmlOut.push(
          '<h2><a href="#' + html(lang) + '">'
          + html(lang) + '<\/a> Failed<\/h2>');
      htmlOut.push(
          '<tt>' + html(golden.substring(0, pre)) +
          '&raquo;<span class="mismatch">' +
          html(golden.substring(pre, golden.length - post)) +
          '<\/span>&laquo;' +
          html(golden.substring(golden.length - post)) +

          '<br>!==<br>' +

          html(actual.substring(0, pre)) +
          '&raquo;<span class="mismatch">' +
          html(actual.substring(pre, actual.length - post)) +
          '<\/span>&laquo;' +
          html(actual.substring(actual.length - post)) + '<\/tt>');
    } else {
      htmlOut.push(
          '<h2><a href="#' + html(lang) + '">' + html(lang) + '<\/a> OK<\/h2>');
    }
  }
  var summary = (
      failures
      ? (failures + ' test' + (failures === 1 ? '' : 's') + ' failed') 
      : 'Tests Passed');
  var summaryStr = '<h2>' + summary + '<\/h2>';
  htmlOut.push(summaryStr);
  htmlOut.splice(0, 0, summaryStr);
  document.title += ' \u2014 ' + summary;
  document.getElementById('errorReport').innerHTML =
      htmlOut.join('').replace(/&lt;br&gt;/g, '&lt;br&gt;\n');
}

var startTime = null;
function startClock() {
  startTime = (new Date).getTime();
}

function stopClock() {
  var delta = (new Date).getTime() - startTime;
  startTime = null;
  document.getElementById('timing').innerHTML = 'Took ' + delta + ' ms';
}
