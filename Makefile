CLOSURE_COMPILER=java -jar closure-compiler/compiler.jar \
	      --warning_level VERBOSE \
	      --charset UTF-8 \
	      --language_in ECMASCRIPT5 \
	      --compilation_level ADVANCED_OPTIMIZATIONS

YUI_COMPRESSOR=java -jar yui-compressor/yuicompressor-2.4.4.jar \
	      --charset UTF-8

TAR_ROOT=distrib/google-code-prettify

all: src/prettify.js distrib

clean:
	rm -rf distrib.tstamp distrib src/prettify.js

src/prettify.js: js-modules/*.js js-modules/*.pl
	@if [ -e $@ ]; then chmod +w $@; fi
	@perl -e '\
	  sub readInclude($$$$) {\
	    my $$prefix = $$_[0];\
	    my $$name = "js-modules/" . $$_[1];\
	    my $$buf = "";\
	    if ($$name =~ /\.pl$$/) {\
	      open(IN, "|perl $$name") or die "$$name: $$!";\
	    } else {\
	      open(IN, "<$$name") or die "$$name: $$!";\
	    }\
	    while (<IN>) {\
	      $$buf .= "$$prefix$$_";\
	    }\
	    return $$buf;\
	  }' \
	  -pe 's/^(\s*)include\("([^"]+)"\);/readInclude($$1, $$2)/ge' \
	  js-modules/prettify.js \
	  > src/prettify.js \
	  || rm src/prettify.js
	@if [ -e $@ ]; then chmod -w $@; fi

distrib: distrib.tstamp distrib/prettify-small.tgz \
	 distrib/prettify-small.tar.bz2
	@wc -c distrib/prettify-small.{tar.bz2,tgz} \
	    | grep -v total

distrib.tstamp: src/*.js src/*.css
	@echo Compiling
	@mkdir -p $(TAR_ROOT)
	@for f in src/*.css; do \
	  $(YUI_COMPRESSOR) --type css $$f \
	      > $(TAR_ROOT)/$$(basename $$f); \
	  wc -c $$f $(TAR_ROOT)/$$(basename $$f) \
	      | grep -v total; \
	done
	@$(CLOSURE_COMPILER) --js src/prettify.js \
	    --externs closure-compiler/console-externs.js \
	    | perl -e 'binmode STDIN, ":utf8";' -pe 's/\xA0/\\xa0/' \
	    > $(TAR_ROOT)/prettify.js
	@wc -c src/prettify.js $(TAR_ROOT)/prettify.js \
	    | grep -v total
	@for f in src/lang*.js; do \
	  if [ $$f -nt $(TAR_ROOT)/$$(basename $$f) ]; then \
	    $(CLOSURE_COMPILER) --js $$f --externs js-modules/externs.js \
	        | perl -e 'binmode STDIN, ":utf8";' -pe 's/\xA0/\\xa0/' \
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

%.tgz: %.tar
	@gzip -c -9 $^ > $@

%.tar.bz2: %.tar
	@bzip2 -9f $^

distrib/prettify-small.tar: distrib.tstamp
	@pushd distrib >& /dev/null; \
	tar cf ../$@ google-code-prettify; \
	popd >& /dev/null
