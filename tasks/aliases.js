/**
 * google-code-prettify
 * https://github.com/google/code-prettify
 *
 * @author Amro
 * @license Apache-2.0
 */

module.exports = function (grunt) {
  'use strict';

  var fs = require('fs');
  var runLanguageHandler = require('./lib/lang-aliases');

  /**
   * Copy timestamp from source to destination file.
   * @param {string} src
   * @param {string} dest
   * @param {boolean} timestamp
   */
  function syncTimestamp(src, dest, timestamp) {
    if (timestamp) {
      var stat = fs.lstatSync(src);
      var fd = fs.openSync(dest, process.platform === 'win32' ? 'r+' : 'r');
      fs.futimesSync(fd, stat.atime, stat.mtime);
      fs.closeSync(fd);
    }
  }

  /**
   * Copy file mode from source to destination.
   * @param {string} src
   * @param {string} dest
   * @param {boolean|number} mode
   */
  function syncMod(src, dest, mode) {
    if (mode !== false) {
      fs.chmodSync(dest, (mode === true) ? fs.lstatSync(src).mode : mode);
    }
  }

  // Create copies of language handler files under all registered aliases
  grunt.registerMultiTask('aliases', 'Create language aliases', function () {
    var opts = this.options({
      timestamp: false,
      mode: false
    });

    var count = 0;
    this.filesSrc.forEach(function (src) {
      // run language handler in sandbox
      grunt.verbose.subhead('Running ' + src.cyan + ' in sandbox...');
      var exts = runLanguageHandler(src);
      grunt.verbose.ok();

      // go over collected extensions
      exts.forEach(function (ext) {
        // copy file
        var dest = src.replace(/\blang-\w+\b/, 'lang-' + ext);
        grunt.verbose.writeln('Copying ' + src.cyan + ' -> ' + dest.cyan);
        grunt.file.copy(src, dest);

        // sync timestamp and file mode
        syncTimestamp(src, dest, opts.timestamp);
        syncMod(src, dest, opts.mode);
        count++;
      });
    });
    grunt.log.ok('Copied ' + count.toString().cyan +
      grunt.util.pluralize(count, ' file/ files'));
  });
};
