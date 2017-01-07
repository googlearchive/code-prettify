/**
 * google-code-prettify
 * https://github.com/google/code-prettify
 *
 * @author Amro
 * @license Apache-2.0
 */

var fs = require('fs');
var path = require('path');
var vm = require('vm');

/**
 * Returns a mock object PR of the prettify API. This is used to collect
 * registered language file extensions.
 *
 * @return {Object} PR object with an additional `extensions` property.
 */
function createSandbox() {
  // collect registered language extensions
  var sandbox = {};
  sandbox.extensions = [];
  // mock prettify.js API
  sandbox.window = {};
  sandbox.window.PR = sandbox.PR = {
    registerLangHandler: function (handler, exts) {
      sandbox.extensions = sandbox.extensions.concat(exts);
    },
    createSimpleLexer: function (sPatterns, fPatterns) {
      return function (job) {};
    },
    sourceDecorator: function (options) {
      return function (job) {};
    },
    prettyPrintOne: function (src, lang, ln) {
      return src;
    },
    prettyPrint: function (done, root) {},
    PR_ATTRIB_NAME: 'atn',
    PR_ATTRIB_VALUE: 'atv',
    PR_COMMENT: 'com',
    PR_DECLARATION: 'dec',
    PR_KEYWORD: 'kwd',
    PR_LITERAL: 'lit',
    PR_NOCODE: 'nocode',
    PR_PLAIN: 'pln',
    PR_PUNCTUATION: 'pun',
    PR_SOURCE: 'src',
    PR_STRING: 'str',
    PR_TAG: 'tag',
    PR_TYPE: 'typ'
  };
  return sandbox;
}

/**
 * Runs a language handler file under VM to collect extensions.
 *
 * Given a lang-*.js file, runs the language handler in a fake context where
 * PR.registerLangHandler collects handler names without doing anything else.
 * This is later used to makes copies of the JS extension under all its
 * registered language names lang-<EXT>.js
 *
 * @param {string} src path to lang-xxx.js language handler
 * @return {Array<string>} registered file extensions
 */
function runLanguageHandler(src) {
  // execute source code in an isolated sandbox with a mock PR object
  var sandbox = createSandbox();
  vm.runInNewContext(fs.readFileSync(src), sandbox, {
    filename: src
  });

  // language name
  var lang = path.basename(src, path.extname(src)).replace(/^lang-/, '');

  // collect and filter extensions
  var exts = sandbox.extensions.map(function (ext) {
    // case-insensitive names
    return ext.toLowerCase();
  }).filter(function (ext) {
    // skip self, and internal names like foo-bar-baz or lang.foo
    return ext !== lang && !/\W/.test(ext);
  });
  exts = exts.filter(function (ext, pos) {
    // remove duplicates
    return exts.indexOf(ext) === pos;
  });
  return exts;
}

module.exports = runLanguageHandler;
