var PR = {};

/**
 * @param {function (Object)} handler
 * @param {Array.<string>} fileExtensions
 */
PR.registerLangHandler = function registerLangHandler(handler, fileExtensions) {};

/**
 * @param {Array} shortcutStylePatterns
 * @param {Array} fallthroughStylePatterns
 * @return {function (Object)}
 */
PR.createSimpleLexer = function createSimpleLexer(
  shortcutStylePatterns, fallthroughStylePatterns) {};

/**
 * @param {Object} options a set of optional parameters.
 * @return {function (Object)} a function that examines the source code
 *     in the input job and builds the decoration list.
 */
PR.sourceDecorator = function sourceDecorator(options) {};


PR.PR_ATTRIB_NAME = 'atn';
PR.PR_ATTRIB_VALUE = 'atv';
PR.PR_COMMENT = 'com';
PR.PR_DECLARATION = 'dec';
PR.PR_KEYWORD = 'kwd';
PR.PR_LITERAL = 'lit';
PR.PR_NOCODE = 'nocode';
PR.PR_PLAIN = 'pln';
PR.PR_PUNCTUATION = 'pun';
PR.PR_SOURCE = 'src';
PR.PR_STRING = 'str';
PR.PR_TAG = 'tag';
PR.PR_TYPE = 'typ';
