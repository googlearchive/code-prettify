/**
 * google-code-prettify
 * https://github.com/google/code-prettify
 *
 * @author Amro
 * @license Apache-2.0
 */

module.exports = function (grunt) {
  'use strict';

  /*
   * HACK: Custom task to override "closure-compiler:langs" since all lang-*
   * files are compiled in parallel, launching too many Java processes at once
   * which easily runs out of memory! This task programmatically creates
   * separate targets (one file per target) so that lang files are compiled
   * sequentially (sync) instead of in parallel (async).
   */
  grunt.registerMultiTask('gcc', 'Override closure-compiler', function () {
    // closure-compiler:langs
    var task = 'closure-compiler';
    var target = this.target;
    if (!grunt.task.exists(task)) {
      grunt.fail.warn(grunt.util.error('Require task "' + task + '".'));
    }

    // create new targets for each file (one file per target)
    var count = 0;
    var opts = this.options();
    this.files.forEach(function (file, idx) {
      // simple target config with only: src, dest, and options
      delete file.orig;
      file.options = opts;

      // configure new target
      grunt.config.set([task, target + idx], file);
      grunt.verbose.writeln('New target ' + (task + ':' + target + idx).cyan);
      count++;
    });
    grunt.log.ok('Configured ' + count.toString().cyan + ' lang targets');

    // remove original multi-file target
    grunt.config.set([task, target], {});

    // enqueue modified task to run
    //console.log(grunt.config.get(task));
    grunt.task.run(task);
  });
};
