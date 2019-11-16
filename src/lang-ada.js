// Contributed by Felix Krause <contact curl flyx dot org>

/**
 * @fileoverview
 * Registers a language handler for Ada 2012.
 *
 * @author Felix Krause <contact curl flyx dot org>
 */

PR.registerLangHandler(
   PR.createSimpleLexer(
       [ //shortcutStylePatterns
         // no escapes in Ada strings - double quotes are added by repeating them
         // inside the string (" foo "" bar ")
         [PR.PR_STRING, /^"([^"\r\n]|"")*"/, null, '"']
       ],
       [ // fallthroughStylePatterns
         // there are no multiline comments in Ada, but we can combine
         // full-line comments into one
         [PR.PR_COMMENT, /^--(?:[^\r\n]|(?:\r|\n){1,2}--)*/, null],
         // a single character literal
         // (should this rather be a PR_LITERAL? I don't think so)
         [PR.PR_STRING, /^\'.\'/, null],
         // PR_ATTRIB_NAME originally is for XML attributes, but it fits quite
         // well here. It's important that this rule comes before the keywords,
         // so that 'Access is parsed as an attribute, not as a keyword. We're
         // doing some heuristic here by saying that attributes have to be at
         // least 2 characters long, to avoid clash with character literals
         [PR.PR_ATTRIB_NAME, /\'[A-Za-z_]{2,}/, null],
         [PR.PR_KEYWORD, /^\b(?:abort|abs|abstract|accept|access|aliased|all|and|array|at|begin|body|case|constant|declare|delay|delta|digits|do|else|elsif|end|entry|exception|exit|for|function|generic|goto|if|in|interface|is|limited|loop|mod|new|not|null|of|or|others|out|overriding|package|pragma|private|procedure|protected|raise|range|record|rem|renames|requeue|return|reverse|select|separate|some|subtype|synchronized|tagged|task|terminate|then|type|until|use|when|while|with|xor)\b/i, null],
         [PR.PR_PLAIN, /^\b[a-zA-Z](_|[a-zA-Z0-9])*\b/, null],
         // numeric literals are quite complex,
         // like 2_000_000, 1.34E-12, or 16#9A4E#.
         [PR.PR_LITERAL, /^\b([0-9](_?[0-9])*((#[0-9a-f](_?[0-9a-f])*#((e(\+|-)?[0-9](_?[0-9])*\b)|\B))|((\.[0-9](_?[0-9])*)?(e(\+|-)?[0-9](_?[0-9])*)?\b)))\b/i, null],
         // the box is a special literal of sorts.
         [PR.PR_LITERAL, /<>/, null],
         [PR.PR_PUNCTUATION, /^[\+\-\*\/&<>=:;\.\(\)\',]/, null]
       ]),
   ['ada']);