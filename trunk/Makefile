src/prettify.js: js-modules/*.js
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
