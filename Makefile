CLOSURE_COMPILER=java -jar closure-compiler/compiler.jar \
	      --warning_level VERBOSE \
	      --charset UTF-8 \
	      --compilation_level ADVANCED_OPTIMIZATIONS \
	      --output_wrapper '(function(){%output%})()'

YUI_COMPRESSOR=java -jar yui-compressor/yuicompressor-2.4.4.jar \
	      --charset UTF-8

src/prettify.js: js-modules/*.js
	if [ -e $@ ]; then chmod +w $@; fi
	perl -e '\
	  sub readInclude($$$$) {\
	    my $$prefix = $$_[0];\
	    my $$name = "js-modules/" . $$_[1];\
	    my $$buf = "";\
	    open(IN, "<$$name") or die "$$name: $$!";\
	    while (<IN>) {\
	      $$buf .= "$$prefix$$_";\
	    }\
	    return $$buf;\
	  }' \
	  -pe 's/^(\s*)include\("([^"]+)"\);/readInclude($$1, $$2)/ge' \
	  js-modules/prettify.js \
	  > src/prettify.js \
	  || rm src/prettify.js
	if [ -e $@ ]; then chmod -w $@; fi

distrib: distrib.tstamp distrib/google-code-prettify-minimized.tgz

distrib.tstamp: src/*.js src/*.css
	mkdir -p distrib/google-code-prettify
	for f in src/*.css; do \
	  $(YUI_COMPRESSOR) --type css $$f > distrib/google-code-prettify/$$(basename $$f); \
	done
	$(CLOSURE_COMPILER) --js src/prettify.js --externs closure-compiler/console-externs.js \
	    > distrib/google-code-prettify/prettify.js
	for f in src/lang*.js; do \
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
	      > distrib/google-code-prettify/$$(basename $$f); \
	done
	touch distrib.tstamp

distrib/google-code-prettify-minimized.tgz: distrib/google-code-prettify/*
	pushd distrib; tar cfz google-code-prettify-minimized.tgz google-code-prettify; popd
