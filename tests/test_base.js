// get accurate timing.
// This file must be loaded after prettify.js for this to work.
PR_SHOULD_USE_CONTINUATION = false;
var realIsIE6 = _pr_isIE6();
if (!/\btestcopypaste\b/.test(location.fragment)) {
  _pr_isIE6 = function() { return false; };  // Ensure consistent output.
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
    return plainText.replace(/\046/g, '&amp;')
        .replace(/\074/g, '&lt;')
        .replace(/\076/g, '&gt;')
        .replace(/\042/g, '&quot;')
        .replace(/\xa0/g, '&nbsp;');
  }

  /**
   * get normalized markup.  innerHTML varies enough across browsers that we
   * can't use it.
   */
  function normalizedInnerHtml(node) {
    var out = [];
    for (var child = node.firstChild; child; child = child.nextSibling) {
      PR_normalizedHtml(child, out, true);
    }
    out = out.join('');
    // more normalization to work around problems with non-ascii chars in
    // regexps in Safari
    for (var i = 0; (i = out.indexOf('\xa0')) >= 0;) {
      out = out.substring(0, i) + '&nbsp;' + out.substring(i + 1);
    }
    return out;
  }

  var htmlOut = [];
  var failures = 0;
  document.getElementById('errorReport').innerHTML =
      '<h1>Running tests&hellip;<\/h1>';
  htmlOut.push('<h1>Test results<\/h1>');
  for (var lang in goldens) {
    var container = document.getElementById(lang);
    if (realIsIE6 && /\bknown_ie6_failure\b/.test(container.className)) {
      continue;
    }
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
  var summary = (failures ? (failures + ' test(s) failed') : 'Tests Passed');
  htmlOut.push('<h2>' + summary + '<\/h2>');
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

