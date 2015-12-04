/**
 * Given a DOM subtree, wraps it in a list, and puts each line into its own
 * list item.
 *
 * @param {Node} node modified in place.  Its content is pulled into an
 *     HTMLOListElement, and each line is moved into a separate list item.
 *     This requires cloning elements, so the input might not have unique
 *     IDs after numbering.
 * @param {number|null|boolean} startLineNum
 *     If truthy, coerced to an integer which is the 1-indexed line number
 *     of the first line of code.  The number of the first line will be
 *     attached to the list.
 * @param {boolean} isPreformatted true iff white-space in text nodes should
 *     be treated as significant.
 */
function numberLines(node, startLineNum, isPreformatted) {
  var nocode = /(?:^|\s)nocode(?:\s|$)/;
  var lineBreak = /\r\n?|\n/;

  var document = node.ownerDocument;

  var li = document.createElement('li');
  while (node.firstChild) {
    li.appendChild(node.firstChild);
  }
  // An array of lines.  We split below, so this is initialized to one
  // un-split line.
  var listItems = [li];

  function walk(node) {
    var type = node.nodeType;
    if (type == 1 && !nocode.test(node.className)) {  // Element
      if ('br' === node.nodeName) {
        breakAfter(node);
        // Discard the <BR> since it is now flush against a </LI>.
        if (node.parentNode) {
          node.parentNode.removeChild(node);
        }
      } else {
        for (var child = node.firstChild; child; child = child.nextSibling) {
          walk(child);
        }
      }
    } else if ((type == 3 || type == 4) && isPreformatted) {  // Text
      var text = node.nodeValue;
      var match = text.match(lineBreak);
      if (match) {
        var firstLine = text.substring(0, match.index);
        node.nodeValue = firstLine;
        var tail = text.substring(match.index + match[0].length);
        if (tail) {
          var parent = node.parentNode;
          parent.insertBefore(
            document.createTextNode(tail), node.nextSibling);
        }
        breakAfter(node);
        if (!firstLine) {
          // Don't leave blank text nodes in the DOM.
          node.parentNode.removeChild(node);
        }
      }
    }
  }

  // Split a line after the given node.
  function breakAfter(lineEndNode) {
    // If there's nothing to the right, then we can skip ending the line
    // here, and move root-wards since splitting just before an end-tag
    // would require us to create a bunch of empty copies.
    while (!lineEndNode.nextSibling) {
      lineEndNode = lineEndNode.parentNode;
      if (!lineEndNode) { return; }
    }

    function breakLeftOf(limit, copy) {
      // Clone shallowly if this node needs to be on both sides of the break.
      var rightSide = copy ? limit.cloneNode(false) : limit;
      var parent = limit.parentNode;
      if (parent) {
        // We clone the parent chain.
        // This helps us resurrect important styling elements that cross lines.
        // E.g. in <i>Foo<br>Bar</i>
        // should be rewritten to <li><i>Foo</i></li><li><i>Bar</i></li>.
        var parentClone = breakLeftOf(parent, 1);
        // Move the clone and everything to the right of the original
        // onto the cloned parent.
        var next = limit.nextSibling;
        parentClone.appendChild(rightSide);
        for (var sibling = next; sibling; sibling = next) {
          next = sibling.nextSibling;
          parentClone.appendChild(sibling);
        }
      }
      return rightSide;
    }

    var copiedListItem = breakLeftOf(lineEndNode.nextSibling, 0);

    // Walk the parent chain until we reach an unattached LI.
    for (var parent;
         // Check nodeType since IE invents document fragments.
         (parent = copiedListItem.parentNode) && parent.nodeType === 1;) {
      copiedListItem = parent;
    }
    // Put it on the list of lines for later processing.
    listItems.push(copiedListItem);
  }

  // Split lines while there are lines left to split.
  for (var i = 0;  // Number of lines that have been split so far.
       i < listItems.length;  // length updated by breakAfter calls.
       ++i) {
    walk(listItems[i]);
  }

  // Make sure numeric indices show correctly.
  if (startLineNum === (startLineNum|0)) {
    listItems[0].setAttribute('value', startLineNum);
  }

  var ol = document.createElement('ol');
  ol.className = 'linenums';
  var offset = Math.max(0, ((startLineNum - 1 /* zero index */)) | 0) || 0;
  for (var i = 0, n = listItems.length; i < n; ++i) {
    li = listItems[i];
    // Stick a class on the LIs so that stylesheets can
    // color odd/even rows, or any other row pattern that
    // is co-prime with 10.
    li.className = 'L' + ((i + offset) % 10);
    if (!li.firstChild) {
      li.appendChild(document.createTextNode('\xA0'));
    }
    ol.appendChild(li);
  }

  node.appendChild(ol);
}
