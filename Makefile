#!/usr/bin/make -f

# ============================================================================
#                        google-code-prettify Makefile
# ============================================================================
#
# Requirements:
# - Make: runs this makefile
# - Shell: runs various core utils as part of the build
#          (touch, mkdir, cp, rm, wc, grep, zip)
# - Perl: runs js_include.pl script which combines/generates JS source files,
#         also to run some regex search-and-replace
# - Java: runs Closure Compiler and YUI Compressor
# - Node.js: runs lang-handler-aliases.js script which generates language
#            aliases from loader/lang-*.js extensions
#
# ============================================================================

# Don't specify --charset=UTF-8.  If we do, then non-ascii codepoints
# that do not correspond to line terminators are converted
# to UTF-8 sequences instead of being emitted as ASCII.
# This makes the resulting JavaScript less portable.
CLOSURE_COMPILER=java -jar tools/closure-compiler/compiler.jar \
  --warning_level VERBOSE \
  --language_in ECMASCRIPT5 \
  --compilation_level ADVANCED_OPTIMIZATIONS \
  --charset US-ASCII

YUI_COMPRESSOR=java -jar tools/yui-compressor/yuicompressor-2.4.8.jar \
  --charset UTF-8

RE_TOKENS='s/\bPR\.PR_ATTRIB_NAME\b/"atn"/g;  \
  s/\bPR\.PR_ATTRIB_VALUE\b/"atv"/g; \
  s/\bPR\.PR_COMMENT\b/"com"/g;      \
  s/\bPR\.PR_DECLARATION\b/"dec"/g;  \
  s/\bPR\.PR_KEYWORD\b/"kwd"/g;      \
  s/\bPR\.PR_LITERAL\b/"lit"/g;      \
  s/\bPR\.PR_PLAIN\b/"pln"/g;        \
  s/\bPR\.PR_PUNCTUATION\b/"pun"/g;  \
  s/\bPR\.PR_STRING\b/"str"/g;       \
  s/\bPR\.PR_TAG\b/"tag"/g;          \
  s/\bPR\.PR_TYPE\b/"typ"/g;'

# targets
OUT_DIR     := loader/ loader/skins/ distrib/
JS_FILES    := loader/prettify.js loader/run_prettify.js
LANG_FILES  := $(subst src/, loader/, $(wildcard src/lang-*.js))
STYLE_FILES := $(subst src/, loader/, $(wildcard src/*.css))
SKIN_FILES  := $(subst styles/, loader/skins/, $(wildcard styles/*.css))
TARGETS     := $(JS_FILES) $(LANG_FILES) $(STYLE_FILES) $(SKIN_FILES)

.PHONY: all clean

all: $(TARGETS) lang-aliases.tstamp distrib/prettify-small.zip

clean:
	rm -rf *.tstamp src/prettify.js src/run_prettify.js $(OUT_DIR)

# (order-only prerequisite to make sure output directories exist)
$(TARGETS): | $(OUT_DIR)

$(OUT_DIR):
	mkdir -p $(OUT_DIR)

# JS_FILES
src/prettify.js src/run_prettify.js: js-modules/*.js js-modules/*.pl
	@perl js-modules/js_include.pl $(notdir $@) > $@

# JS_FILES
loader/prettify.js: src/prettify.js
	@$(CLOSURE_COMPILER) --js $< \
	  --externs tools/closure-compiler/amd-externs.js \
	  --define IN_GLOBAL_SCOPE=true \
	  --output_wrapper='!function(){%output%}()' \
	  --js_output_file $@
	@wc -c $< $@ | grep -v total

# JS_FILES
loader/run_prettify.js: src/run_prettify.js
	@$(CLOSURE_COMPILER) --js $< \
	  --externs tools/closure-compiler/amd-externs.js \
	  --define IN_GLOBAL_SCOPE=false \
	  --output_wrapper='!function(){%output%}()' \
	  --js_output_file $@
	@wc -c $< $@ | grep -v total

# LANG_FILES
loader/lang-%.js: src/lang-%.js
	@$(CLOSURE_COMPILER) --js $< \
	  --externs js-modules/externs.js \
	  | perl -pe $(RE_TOKENS) \
	  > $@
	@wc -c $< $@ | grep -v total

# STYLE_FILES
loader/%.css: src/%.css
	@$(YUI_COMPRESSOR) --type css $< > $@
	@wc -c $< $@ | grep -v total

# SKIN_FILES
loader/skins/%.css: styles/%.css
	@$(YUI_COMPRESSOR) --type css $< > $@
	@wc -c $< $@ | grep -v total

# aliases
lang-aliases.tstamp: $(LANG_FILES)
	@node tools/lang-handler-aliases.js \
	  && touch lang-aliases.tstamp

# zip file
distrib/prettify-small.zip: $(TARGETS)
	@rm -f $@ \
	  && cp -R loader google-code-prettify \
	  && zip -q -9 -r $@ google-code-prettify \
	  && rm -rf google-code-prettify
	@wc -c $@ | grep -v total
