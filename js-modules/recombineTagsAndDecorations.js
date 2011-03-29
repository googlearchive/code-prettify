/**
 * Breaks {@code job.source} around style boundaries in {@code job.decorations}
 * and modifies {@code job.sourceNode} in place.
 * @param {Object} job like <pre>{
 *    source: {string} source as plain text,
 *    spans: {Array.<number|Node>} alternating span start indices into source
 *       and the text node or element (e.g. {@code <BR>}) corresponding to that
 *       span.
 *    decorations: {Array.<number|string} an array of style classes preceded
 *       by the position at which they start in job.source in order
 * }</pre>
 * @private
 */
function recombineTagsAndDecorations(job) {
  var isIE = /\bMSIE\b/.test(navigator.userAgent);
  var newlineRe = /\n/g;

  var source = job.source;
  var sourceLength = source.length;
  // Index into source after the last code-unit recombined.
  var sourceIndex = 0;

  var spans = job.spans;
  var nSpans = spans.length;
  // Index into spans after the last span which ends at or before sourceIndex.
  var spanIndex = 0;

  var decorations = job.decorations;
  var nDecorations = decorations.length;
  // Index into decorations after the last decoration which ends at or before sourceIndex.
  var decorationIndex = 0;

  // Simplify decorations.
  var decPos = 0;
  for (var i = 0; i < nDecorations;) {
    // Skip over any zero-length decorations.
    var startPos = decorations[i];
    var start = i;
    while (start + 2 < nDecorations && decorations[start + 2] === startPos) {
      start += 2;
    }
    // Conflate all adjacent decorations that use the same style.
    var startDec = decorations[start + 1];
    var end = start + 2;
    while (end + 2 <= nDecorations
           && (decorations[end + 1] === startDec
               || decorations[end] === decorations[end + 2])) {
      end += 2;
    }
    decorations[decPos++] = startPos;
    decorations[decPos++] = startDec;
    i = end;
  }

  // Strip any zero-length decoration at the end.
  if (decPos && decorations[decPos - 2] === sourceLength) { decPos -= 2; }
  nDecorations = decorations.length = decPos;

  var decoration = null;
  while (spanIndex < nSpans) {
    var spanStart = spans[spanIndex];
    var spanEnd = spans[spanIndex + 2] || sourceLength;

    var decStart = decorations[decorationIndex];
    var decEnd = decorations[decorationIndex + 2] || sourceLength;

    var end = Math.min(spanEnd, decEnd);

    var textNode = spans[spanIndex + 1];
    if (textNode.nodeType !== 1) {  // Don't muck with <BR>s or <LI>s
      var styledText = source.substring(sourceIndex, end);
      if (isIE) { styledText = styledText.replace(newlineRe, '\r'); }
      textNode.nodeValue = styledText;
      var document = textNode.ownerDocument;
      var span = document.createElement('SPAN');
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
}
