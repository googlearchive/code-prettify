/**
 * Split markup into a string of source code and an array mapping ranges in
 * that string to the text nodes in which they appear.
 *
 * <p>
 * The HTML DOM structure:</p>
 * <pre>
 * (Element   "p"
 *   (Element "b"
 *     (Text  "print "))       ; #1
 *   (Text    "'Hello '")      ; #2
 *   (Element "br")            ; #3
 *   (Text    "  + 'World';")) ; #4
 * </pre>
 * <p>
 * corresponds to the HTML
 * {@code <p><b>print </b>'Hello '<br>  + 'World';</p>}.</p>
 *
 * <p>
 * It will produce the output:</p>
 * <pre>
 * {
 *   sourceCode: "print 'Hello '\n  + 'World';",
 *   //                 1         2
 *   //       012345678901234 5678901234567
 *   spans: [0, #1, 6, #2, 14, #3, 15, #4]
 * }
 * </pre>
 * <p>
 * where #1 is a reference to the {@code "print "} text node above, and so
 * on for the other text nodes.
 * </p>
 *
 * <p>
 * The {@code} spans array is an array of pairs.  Even elements are the start
 * indices of substrings, and odd elements are the text nodes (or BR elements)
 * that contain the text for those substrings.
 * Substrings continue until the next index or the end of the source.
 * </p>
 *
 * @param {Node} node an HTML DOM subtree containing source-code.
 * @return {Object} source code and the text nodes in which they occur.
 */
function extractSourceSpans(node) {
  var nocode = /(?:^|\s)nocode(?:\s|$)/;

  var chunks = [];
  var length = 0;
  var spans = [];
  var k = 0;

  var whitespace;
  if (node.currentStyle) {
    whitespace = node.currentStyle.whiteSpace;
  } else if (window.getComputedStyle) {
    whitespace = document.defaultView.getComputedStyle(node, null)
        .getPropertyValue('white-space');
  }
  var isPreformatted = whitespace && 'pre' === whitespace.substring(0, 3);

  function walk(node) {
    switch (node.nodeType) {
      case 1:  // Element
        if (nocode.test(node.className)) { return; }
        for (var child = node.firstChild; child; child = child.nextSibling) {
          walk(child);
        }
        var nodeName = node.nodeName;
        if ('BR' === nodeName || 'LI' === nodeName) {
          chunks[k] = '\n';
          spans[k << 1] = length++;
          spans[(k++ << 1) | 1] = node;
        }
        break;
      case 3: case 4:  // Text
        var text = node.nodeValue;
        if (text.length) {
          if (!isPreformatted) {
            text = text.replace(/[ \t\r\n]+/g, ' ');
          } else {
            text = text.replace(/\r\n?/g, '\n');  // Normalize newlines.
          }
          // TODO: handle tabs here?
          chunks[k] = text;
          spans[k << 1] = length;
          length += text.length;
          spans[(k++ << 1) | 1] = node;
        }
        break;
    }
  }

  walk(node);

  return {
    sourceCode: chunks.join('').replace(/\n$/, ''),
    spans: spans
  };
}
