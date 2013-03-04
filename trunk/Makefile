SHELL := /bin/bash

CLOSURE_COMPILER=java -jar tools/closure-compiler/compiler.jar \
	      --warning_level VERBOSE \
	      --language_in ECMASCRIPT5 \
	      --compilation_level ADVANCED_OPTIMIZATIONS \
	      --charset US-ASCII
# Don't specify --charset=UTF-8.  If we do, then non-ascii codepoints
# that do not correspond to line terminators are converted
# to UTF-8 sequences instead of being emitted as ASCII.
# This makes the resulting JavaScript less portable.

YUI_COMPRESSOR=java -jar tools/yui-compressor/yuicompressor-2.4.4.jar \
	      --charset UTF-8

TAR_ROOT=distrib/google-code-prettify

all: distrib

clean:
	rm -rf distrib.tstamp distrib src/prettify.js src/run_prettify.js

src/prettify.js: js-modules/*.js js-modules/*.pl
	@if [ -e "$@" ]; then chmod +w "$@"; fi
	@perl js-modules/js_include.pl "$$(basename $@)" > "$@"
	@if [ -e "$@" ]; then chmod -w "$@"; fi

src/run_prettify.js: js-modules/*.js js-modules/*.pl
	@if [ -e "$@" ]; then chmod +w "$@"; fi
	@perl js-modules/js_include.pl "$$(basename $@)" > "$@"
	@if [ -e "$@" ]; then chmod -w "$@"; fi

distrib: distrib.tstamp distrib/prettify-small.tgz distrib/prettify-small.zip distrib/prettify-small.tar.bz2
	@wc -c distrib/prettify-small.{tar.bz2,tgz,zip} \
	    | grep -v total

distrib.tstamp: src/prettify.js src/run_prettify.js src/*.js src/*.css
	@echo Compiling
	@mkdir -p $(TAR_ROOT)
	@for f in src/*.css; do \
	  $(YUI_COMPRESSOR) --type css $$f \
	      > $(TAR_ROOT)/$$(basename $$f); \
	  wc -c $$f $(TAR_ROOT)/$$(basename $$f) \
	      | grep -v total; \
	done
	@$(CLOSURE_COMPILER) --js src/prettify.js \
	    --externs tools/closure-compiler/console-externs.js \
	    --externs tools/closure-compiler/amd-externs.js \
	    --define IN_GLOBAL_SCOPE=true \
	    --output_wrapper='!function(){%output%}()' \
	    > $(TAR_ROOT)/prettify.js
	@wc -c src/prettify.js $(TAR_ROOT)/prettify.js \
	    | grep -v total
	@$(CLOSURE_COMPILER) --js src/run_prettify.js \
	    --externs tools/closure-compiler/console-externs.js \
	    --externs tools/closure-compiler/amd-externs.js \
	    --define IN_GLOBAL_SCOPE=false \
	    --output_wrapper='!function(){%output%}()' \
	    > $(TAR_ROOT)/run_prettify.js
	@wc -c src/run_prettify.js $(TAR_ROOT)/run_prettify.js \
	    | grep -v total
	@for f in src/lang*.js; do \
	  if [ $$f -nt $(TAR_ROOT)/$$(basename $$f) ]; then \
	    $(CLOSURE_COMPILER) --js $$f --externs js-modules/externs.js \
	        | perl -pe 's/\bPR\.PR_ATTRIB_NAME\b/"atn"/g; \
			    s/\bPR\.PR_ATTRIB_VALUE\b/"atv"/g; \
			    s/\bPR\.PR_COMMENT\b/"com"/g; \
			    s/\bPR\.PR_DECLARATION\b/"dec"/g; \
			    s/\bPR\.PR_KEYWORD\b/"kwd"/g; \
			    s/\bPR\.PR_LITERAL\b/"lit"/g; \
			    s/\bPR\.PR_PLAIN\b/"pln"/g; \
			    s/\bPR\.PR_PUNCTUATION\b/"pun"/g; \
			    s/\bPR\.PR_STRING\b/"str"/g; \
			    s/\bPR\.PR_TAG\b/"tag"/g; \
			    s/\bPR\.PR_TYPE\b/"typ"/g;' \
	        > $(TAR_ROOT)/$$(basename $$f); \
	    wc -c $$f $(TAR_ROOT)/$$(basename $$f) \
	        | grep -v total; \
	  fi \
	done
	@touch distrib.tstamp

lang-aliases : lang-aliases.tstamp
lang-aliases.tstamp : distrib.tstamp
	@tools/lang-handler-aliases.sh \
            distrib/sources/google-code-prettify/src \
	  | perl -ne 'system("cp $$1 $$2") if m/^(\S+) (\S+)$$/ && ! -e $$2' \
	  && touch lang-aliases.tstamp

%.tgz: %.tar
	@gzip -c -9 $^ > $@

%.tar.bz2: %.tar
	@bzip2 -k -9f $^

distrib/prettify-small.tar: distrib.tstamp
	tar cf $@ -C distrib google-code-prettify

distrib/prettify-small.zip: distrib.tstamp
	@pushd distrib >& /dev/null; \
	rm -f ../$@; \
	zip -q -9 -r ../$@ google-code-prettify; \
	popd >& /dev/null

distrib/prettify.tar: distrib.tstamp
	mkdir -p distrib/sources/google-code-prettify
	cp -fr CHANGES.html COPYING README.html Makefile \
	  examples js-modules src styles tests tools \
	  distrib/sources/google-code-prettify
	tar cf distrib/prettify.tar -C distrib/sources google-code-prettify

