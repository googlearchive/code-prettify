
var IN_GLOBAL_SCOPE = false;

/* @include prettify.js */

var path = require('path');

module.exports = {
  prettyPrint: prettyPrint,
  prettyPrintOne: prettyPrintOne,
  // include paths for css preprocessor support
  includePaths: [
    __dirname,
    path.resolve(__dirname, '../styles')
  ]
};
