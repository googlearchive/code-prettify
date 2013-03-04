#!/bin/bash

LANG_DIR="$1"
shift

HAS_LANG_FILES=1
if echo "$LANG_DIR"/lang-*.js | egrep -q "[*]" >& /dev/null; then
  HAS_LANG_FILES=0
fi

if [ -n "$*" ] || [ -z "$LANG_DIR" ] || ! (( $HAS_LANG_FILES )); then
  echo "Usage: $0 <LANG_DIR>"
  echo
  echo "Dumps lines of the form"
  echo "    $LANG_DIR/lang-foo.js $LANG_DIR/lang-<extension>.js"
  echo "where the first element is a path name under LANG_DIR"
  echo "and the second is the name of a language extension for which"
  echo "it registers an extension."
  exit -1
fi

if [ -z "$JS_INTERPRETER" ]; then
  JS_INTERPRETER="jsc-1"
fi

if ! which "$JS_INTERPRETER" >& /dev/null; then
  echo "\$JS_INTERPRETER ( '$JS_INTERPRETER' ) is not on the \$PATH."
  echo "It should be an executable that loads each argument as a JS file"
  echo "and runs them in a context where the print function dumps a string"
  echo "to stdout."
  exit -1
fi

for JS in "$LANG_DIR"/lang-*.js; do
  # Run the language handler in a context where PR.registerLangHandler
  # dumps out the handler names without doing anything else, and
  # then use a perl script that prepends each handler with the basename
  # of the JS file.
  # The JS interpreter is run with STDIN of /dev/null so that it does not
  # hand waiting for REPL input.
  ("$JS_INTERPRETER" \
    <(echo '

      var window = this;
      var PR = {
        registerLangHandler: function (_, exts) {
          for (var i = 0, n = exts.length; i < n; ++i) {
            var handler = String(exts[i]);
            if (/^\w+$/.test(handler)) {
              print(handler);
            }
          }
        },
        createSimpleLexer: function () {},
        sourceDecorator:   function () {}
      };

      ') \
    \
    "$JS" \
    < /dev/null \
   || echo "Failed to execute $JS" 1>&2 ) \
    | perl -e '$JS=shift;' \
      -e 'use File::Basename; $DIR=dirname($JS);' \
      -e 'while (<STDIN>) { s/^\w+$/$JS $DIR\/lang-$&.js/; print; }' \
      "$JS"
done
