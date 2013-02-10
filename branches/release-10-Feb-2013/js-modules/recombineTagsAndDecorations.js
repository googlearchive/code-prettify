/**
 * Breaks {@code job.sourceCode} around style boundaries in
 * {@code job.decorations} and modifies {@code job.sourceNode} in place.
 * @param {Object} job like <pre>{
 *    sourceCode: {string} source as plain text,
 *    spans: {Array.<number|Node>} alternating span start indices into source
 *       and the text node or element (e.g. {@code <BR>}) corresponding to that
 *       span.
 *    decorations: {Array.<number|string} an array of style classes preceded
 *       by the position at which they start in job.sourceCode in order
 * }</pre>
 * @private
 */
function recombineTagsAndDecorations(job) {
  var isIE8OrEarlier = /\bMSIE\s(\d+)/.exec(navigator.userAgent);
  isIE8OrEarlier = isIE8OrEarlier && +isIE8OrEarlier[1] <= 8;
  var newlineRe = /\n/g;

  var source = job.sourceCode;
  var sourceLength = source.length;
  // Index into source after the last code-unit recombined.
  var sourceIndex = 0;

  var spans = job.spans;
  var nSpans = spans.length;
  // Index into spans after the last span which ends at or before sourceIndex.
  var spanIndex = 0;

  var decorations = job.decorations;
  var nDecorations = decorations.length;
  // Index into decorations after the last decoration which ends at or before
  // sourceIndex.
  var decorationIndex = 0;

  // Remove all zero-length decorations.
  decorations[nDecorations] = sourceLength;
  var decPos, i;
  for (i = decPos = 0; i < nDecorations;) {
    if (decorations[i] !== decorations[i + 2]) {
      decorations[decPos++] = decorations[i++];
      decorations[decPos++] = decorations[i++];
    } else {
      i += 2;
    }
  }
  nDecorations = decPos;

  // Simplify decorations.
  for (i = decPos = 0; i < nDecorations;) {
    var startPos = decorations[i];
    // Conflate all adjacent decorations that use the same style.
    var startDec = decorations[i + 1];
    var end = i + 2;
    while (end + 2 <= nDecorations && decorations[end + 1] === startDec) {
      end += 2;
    }
    decorations[decPos++] = startPos;
    decorations[decPos++] = startDec;
    i = end;
  }

  nDecorations = decorations.length = decPos;

  var sourceNode = job.sourceNode;
  var oldDisplay;
  if (sourceNode) {
    oldDisplay = sourceNode.style.display;
    sourceNode.style.display = 'none';
  }
  try {
    var decoration = null;
    while (spanIndex < nSpans) {
      var spanStart = spans[spanIndex];
      var spanEnd = spans[spanIndex + 2] || sourceLength;

      var decEnd = decorations[decorationIndex + 2] || sourceLength;

      var end = Math.min(spanEnd, decEnd);

      var textNode = spans[spanIndex + 1];
      var styledText;
      if (textNode.nodeType !== 1  // Don't muck with <BR>s or <LI>s
          // Don't introduce spans around empty text nodes.
          && (styledText = source.substring(sourceIndex, end))) {
        // This may seem bizarre, and it is.  Emitting LF on IE causes the
        // code to display with spaces instead of line breaks.
        // Emitting Windows standard issue linebreaks (CRLF) causes a blank
        // space to appear at the beginning of every line but the first.
        // Emitting an old Mac OS 9 line separator makes everything spiffy.
        if (isIE8OrEarlier) {
          styledText = styledText.replace(newlineRe, '\r');
        }
        textNode.nodeValue = styledText;
        var document = textNode.ownerDocument;
        var span = document.createElement('span');
        span.className = decorations[decorationIndex + 1];
        var parentNode = textNode.parentNode;
        parentNode.replaceChild(span, textNode);
        span.appendChild(textNode);
        if (sourceIndex < spanEnd) {  // Split off a text node.
          spans[spanIndex + 1] = textNode
              // TODO: Possibly optimize by using '' if there's no flicker.
              = document.createTextNode(source.substring(end, spanEnd));
          parentNode.insertBefore(textNode, span.nextSibling);
        }
      }

      sourceIndex = end;

      if (sourceIndex >= spanEnd) {
        spanIndex += 2;
      }
      if (sourceIndex >= decEnd) {
        decorationIndex += 2;
      }
    }
  } finally {
    if (sourceNode) {
      sourceNode.style.display = oldDisplay;
    }
  }
}
