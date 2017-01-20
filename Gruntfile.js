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
      },
      langs: {
        options: {
          process: function (content) {
            // replace PR.PR_* token names with inlined strings
            return content
              .replace(/\bPR\.PR_ATTRIB_NAME\b/g,  '"atn"')
              .replace(/\bPR\.PR_ATTRIB_VALUE\b/g, '"atv"')
              .replace(/\bPR\.PR_COMMENT\b/g,      '"com"')
              .replace(/\bPR\.PR_DECLARATION\b/g,  '"dec"')
              .replace(/\bPR\.PR_KEYWORD\b/g,      '"kwd"')
              .replace(/\bPR\.PR_LITERAL\b/g,      '"lit"')
              .replace(/\bPR\.PR_NOCODE\b/g,       '"nocode"')
              .replace(/\bPR\.PR_PLAIN\b/g,        '"pln"')
              .replace(/\bPR\.PR_PUNCTUATION\b/g,  '"pun"')
              .replace(/\bPR\.PR_SOURCE\b/g,       '"src"')
              .replace(/\bPR\.PR_STRING\b/g,       '"str"')
              .replace(/\bPR\.PR_TAG\b/g,          '"tag"')
              .replace(/\bPR\.PR_TYPE\b/g,         '"typ"');
          }
        },
        files: [{
          expand: true,
          cwd: 'loader/',
          src: ['lang-*.js'],
          dest: 'loader/'
        }]
      }
    },

    // ./tasks/aliases.js
    aliases: {
      langs: {
        src: 'loader/lang-*.js',
        filter: function (src) {
          // skip files that are themselves aliases created in previous runs
          return grunt.file.exists(src.replace(/^loader/, 'src'));
        }
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
    },

    // google-closure-compiler
    'closure-compiler': {
      // https://github.com/google/closure-compiler/wiki
      options: {
        // Don't specify --charset=UTF-8.  If we do, then non-ascii
        // codepoints that do not correspond to line terminators are
        // converted to UTF-8 sequences instead of being emitted as
        // ASCII. This makes the resulting JavaScript less portable.
        warning_level: 'VERBOSE',
        language_in: 'ECMASCRIPT5',
        compilation_level: 'ADVANCED',
        charset: 'US-ASCII',
      },
      prettify: {
        options: {
          externs: 'tools/closure-compiler/amd-externs.js',
          define: 'IN_GLOBAL_SCOPE=true',
          output_wrapper: '!function(){%output%}()'
        },
        src: '<%= uglify.prettify.src %>',
        dest: '<%= uglify.prettify.dest %>'
      },
      runprettify: {
        options: {
          externs: 'tools/closure-compiler/amd-externs.js',
          define: 'IN_GLOBAL_SCOPE=false',
          output_wrapper: '!function(){%output%}()'
        },
        src: '<%= uglify.runprettify.src %>',
        dest: '<%= uglify.runprettify.dest %>'
      },
      langs: {
        options: {
          externs: 'js-modules/externs.js'
        },
        files: '<%= uglify.langs.files %>'
      }
    },

    // ./tasks/gcc.js
    gcc: {
      // same as 'closure-compiler:langs'
      langs: {
        options: {
          externs: 'js-modules/externs.js'
        },
        files: '<%= uglify.langs.files %>'
      }
    },

    // grunt-contrib-cssmin
    cssmin: {
      // https://github.com/jakubpawlowicz/clean-css#how-to-use-clean-css-api
      options: {
        report: 'gzip'
      },
      prettify: {
        src: 'src/prettify.css',
        dest: 'loader/prettify.css'
      },
      skins: {
        files: [{
          expand: true,
          cwd: 'styles/',
          src: ['*.css'],
          dest: 'loader/skins/',
          ext: '.css'
        }]
      }
    },

    // grunt-contrib-compress
    compress: {
      zip: {
        options: {
          archive: 'distrib/prettify-small.zip',
          mode: 'zip',
          level: 9
        },
        files: [{
          expand: true,
          cwd: 'loader/',
          src: ['*.js', '*.css', 'skins/*.css'],
          dest: 'google-code-prettify/'
        }]
      }
    },

    // grunt-contrib-clean
    clean: {
      js: ['src/prettify.js', 'src/run_prettify.js', 'loader/*.js'],
      css: ['loader/*.css', 'loader/skins/*.css'],
      zip: ['distrib/*.zip']
    }
  });

  // load plugins that provide tasks
  require('google-closure-compiler').grunt(grunt);
  grunt.loadTasks('./tasks');
  grunt.loadNpmTasks('grunt-preprocess');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-compress');
  grunt.loadNpmTasks('grunt-contrib-clean');

  // register task aliases
  grunt.registerTask('default', [
    //'clean',
    'preprocess',
    'copy:prettify',
    'gcc',
    'copy:langs',
    'aliases',
    'cssmin',
    'compress'
  ]);
};
