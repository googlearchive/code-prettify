use strict;

print "

/**
 * A set of tokens that can precede a regular expression literal in
 * javascript
 * http://web.archive.org/web/20070717142515/http://www.mozilla.org/js/language/js20/rationale/syntax.html
 * has the full list, but I've removed ones that might be problematic when
 * seen in languages that don't support regular expression literals.
 *
 * <p>Specifically, I've removed any keywords that can't precede a regexp
 * literal in a syntactically legal javascript program, and I've removed the
 * \"in\" keyword since it's not a keyword in many languages, and might be used
 * as a count of inches.
 *
 * <p>The link above does not accurately describe EcmaScript rules since
 * it fails to distinguish between (a=++/b/i) and (a++/b/i) but it works
 * very well in practice.
 *
 * \@private
 * \@const
 */
var REGEXP_PRECEDER_PATTERN = ";

my @preceders = (
                 "[!=]=?=?",   # "!", "!=", "!==", "=", "==", "===",
                 "\\#",
                 "%=?",        # "%", "%=",
                 "&&?=?",      # "&", "&&", "&&=", "&=",
                 "\\(",
                 "\\*=?",      # "*", "*=",
                 "[+\\-]=",    # +=, -=.  + and - handled below.
                 "->",
                 "\\/=?",      # "/", "/=",
                 "::?",        # ":", "::",
                 "<<?=?",      # "<", "<<", "<<=", "<=", 
                 ">>?>?=?",    # ">", ">=", ">>", ">>=", ">>>", ">>>=",
                 ",",
                 ";",          # ";"
                 "\\?",
                 "@",
                 "\\[",
                 "~",          # handles =~ and !~
                 "{",
                 "\\^\\^?=?",  # "^", "^=", "^^", "^^=",
                 "\\|\\|?=?",  # "|", "|=", "||", "||=",
                 "break", "case", "continue", "delete",
                 "do", "else", "finally", "instanceof",
                 "return", "throw", "try", "typeof"
                );
# match at beginning, a dot that is not part of a number, or sign.
my $pattern = "'(?:^^\\\\.?|[+-]";
foreach my $preceder (@preceders) {
  $preceder =~ s/\\/\\\\/g;
  $pattern .= "|$preceder";
}
$pattern .= ")\\\\s*'";  # matches at end, and matches empty string

print "$pattern;\n";

print "
// CAVEAT: this does not properly handle the case where a regular
// expression immediately follows another since a regular expression may
// have flags for case-sensitivity and the like.  Having regexp tokens
// adjacent is not valid in any language I'm aware of, so I'm punting.
// TODO: maybe style special characters inside a regexp as punctuation.
";
