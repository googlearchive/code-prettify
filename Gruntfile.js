/**
 * google-code-prettify
 * https://github.com/google/code-prettify
 *
 * Copyright (C) 2017 Google Inc.
 * Licensed under Apache 2.0 license.
 */

module.exports = function (grunt) {
  'use strict';

  // project configuration
  grunt.initConfig({
    // metadata
    pkg: grunt.file.readJSON('package.json'),

    // grunt-preprocess
    preprocess: {
      // https://github.com/jsoverson/preprocess#optionstype
      options: {
        // renders @include directives (similar to SSI server-side includes)
        // where JS files are resolved relative to this directory
        srcDir: 'js-modules',
        type: 'js'
      },
      prettify: {
        src: 'js-modules/prettify.js',
        dest: 'src/prettify.js'
      },
      runprettify: {
        options: {
          context: {
            // to control where defs.js is included (top level)
            RUN_PRETTIFY: true
          }
        },
        src: 'js-modules/run_prettify.js',
        dest: 'src/run_prettify.js'
      }
    },

    // grunt-contrib-copy
    copy: {
      prettify: {
        options: {
          process: function (content) {
            // trim trailing whitespaces in blank lines added by preprocess
            return content.replace(/[ \f\t\v]+$/gm, '');
          }
        },
        files: [
          {src: 'src/prettify.js', dest: 'src/prettify.js'},
          {src: 'src/run_prettify.js', dest: 'src/run_prettify.js'}
        ]
      }
    },

    // grunt-contrib-uglify
    uglify: {
      // https://github.com/mishoo/UglifyJS2#usage
      options: {
        report: 'gzip',
        ASCIIOnly: true,
        maxLineLen: 500,
        screwIE8: false
      },
      prettify: {
        options: {
          compress: {
            global_defs: {'IN_GLOBAL_SCOPE': true}
          },
          wrap: true
        },
        src: 'src/prettify.js',
        dest: 'loader/prettify.js'
      },
      runprettify: {
        options: {
          compress: {
            global_defs: {'IN_GLOBAL_SCOPE': false}
          },
          wrap: true
        },
        src: 'src/run_prettify.js',
        dest: 'loader/run_prettify.js'
      },
      langs: {
        files: [{
          expand: true,
          cwd: 'src/',
          src: ['lang-*.js'],
          dest: 'loader/',
          ext: '.js'
        }]
      }
    }
  });

  // load plugins that provide tasks
  grunt.loadNpmTasks('grunt-preprocess');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // register task aliases
  grunt.registerTask('default', ['preprocess', 'copy', 'uglify']);
};
