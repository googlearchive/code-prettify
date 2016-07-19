// Copyright (C) 2008 Google Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/* 
 *  Original Google (Apache) license as-is above 
 *  All addition work comes under this (Apache 2 license)
 *  - Copyright (C) 2013- (see contributors)
*/

/**
 * @fileoverview
 * Registers a language handler for Rebol
 *
 * To use, include prettify.js and this file in your HTML page.
 * Then put your code in an HTML tag like
 *      <pre class="prettyprint lang-rebol">(rebol code)</pre>
 *
 * I used lang-lisp.js as the basis and then amended to Rebol
 *
 * "Name"    = 'Rebol'
 * "Author"  = 'Carl Sassenrath'
 * "Version" = 'rebol2|rebol3'
 * "About"   = 'Rebol - Relative Expression Based Object Language'
 *
 * @author draegtun@gmail.com
 *
 */

/**
 * History - https://github.com/draegtun/PrettifyRebol/Changes
 *
 * Contributors
 * - draegtun (Barry Walsh)
 * - rgchris  (Christopher Ross-Gill)
 * 
 * Grammar - http://reb4.me/r/rebol#Value
 *
 * Source - https://github.com/draegtun/PrettifyRebol
 *
 */

var REB = {
    'word!': "lit dt-word",
    'get-word!': "lit dt-get-word",
    'function!': "kwd dt-function",
    'native!': "kwd dt-native",
    'op!': "kwd dt-native",
    'datatype!': "typ dt-datatype",
    'binary!': "str dt-binary",
    'bitset!': "str dt-bitset",
    'char!': "str dt-char",
    'date!': "str dt-date",
    'decimal!': "lit dt-decimal",
    'email!': "str dt-email",
    'file!': "str dt-file",
    'integer!': "lit dt-integer",
    'issue!': "str dt-issue",
    'lit-word!': "lit dt-lit-word",
    'logic!': "lit dt-logic",
    'money!': "lit dt-money",
    'none!': "lit dt-none",
    'number!': "lit dt-integer",
    'pair!': "lit dt-pair",
    'percent!': "lit dt-percent",
    'string!': "str dt-string",
    'tag!': "tag dt-tag",
    'time!': "lit dt-time",
    'tuple!': "lit dt-tuple",
    'url!': "str dt-url",
    'refinement!': "lit dt-refinement",
    'set-word!': "dec dt-set-word",
    'set-path!': "fun dt-set-path",
    'rebol!': "kwd dt-rebol",
    'comment!': "com dt-cmt",
    'literal-block-hack': "opn"
};

PR['registerLangHandler'](
    PR['createSimpleLexer'](
        [
         // Rebol block/parens.  Is opn/clo really needed for Rebol?
         ['opn',             /^[\(\[]+/, null, '(['],
         //['opn',             /^#\[/, null, '#['],
         ['clo',             /^[\)\]]+/, null, ')]'],
         //
         // Whitespace
         [PR['PR_PLAIN'],       /^[\t\n\r \xA0]+/, null, '\t\n\r \xA0'],
         //
         // Multi-line string {braces} - allowed within:  { ^{ ^}  
         // [PR['PR_STRING'],      /^\{(?:[^\}\^]|\^[\s\S])*(?:\}|$)/, null, '{}'],
    ],
    [
         [REB['literal-block-hack'], /^#\[/],
         //
         // Types
         // -- comment!
         [REB['comment!'], /^#![^\r\n]+/i],
         [REB['comment!'], /^;[^\r\n]*/],
         [REB['comment!'], /^comment\s*\{(?:[^\}\^]|\^[\s\S])*(?:\}|$)/],
         [REB['comment!'], /^comment\s*\[(?:[^\]\\]|\\[\s\S])*(?:\]|$)/],
         // -- char!
         [REB['char!'], /^#"(?:[^^"]|\^(?:[\^"\/\-A-Z]|\((?:[0-9A-F]{2,4}|tab|newline)\)))"/i],
         // -- string!
         [REB['string!'], /^"(?:[^"\\]|\\[\s\S])*(?:"|$)/],
         [REB['string!'], /^\{(?:[^\}\^]|\^[\s\S])*(?:\}|$)/],
         // -- comment!
         [REB['comment!'], /^<!--(?:[^-]|-(?!->))+-->/],
         // -- tag!
         [REB['tag!'], /^<[^"<=>\x00\x09\x0A\x0D\x20\u005D\u007F][^>\x00]*>/],
         // -- file!
         [REB['file!'], /^%(?:[a-zA-Z?!.*&|=_~0-9'+\-,:\/\\@]|%[0-9A-F]{2})+/],
         [REB['file!'], /^%"(?:[^"])*"/],
         // -- url!
         [REB['url!'], /^[a-zA-Z?!.*&|=_~][a-zA-Z?!.*&|=_~0-9'+-,]*:(?:[a-zA-Z?!.*&|=_~0-9'+\-,:\/@]|%[0-9A-F]{2})+/],
         // -- email!
         [REB['email!'], /^[\w\d\+\-\.]+\@[\w\d\+\-\.]+\b/],
         // -- binary!
         [REB['binary!'], /^2#\{(?:[01\r\n\t ])*\}/],
         [REB['binary!'], /^64#\{(?:[0-9+\/a-yA-Z=\r\n\t ])*\}/],
         [REB['binary!'], /^(?:16)?#\{(?:[0-9a-f\r\n\t ])*\}/i],
         // -- issue!
         [REB['issue!'], /^#[\w\d\-]+(?=[\s\n\t]|$)/],
         // -- date!
         [REB['date!'], /^\d{1,2}[\-\/](\d{1,2}|\w{3,9})[\-\/]\d{2,4}\/\d{1,2}\:\d{1,2}\:\d{1,2}(\+|\-)\d{1,2}\:(00|30)\b/],
         [REB['date!'], /^\d{1,2}[\-\/](\d{1,2}|\w{3,9})[\-\/]\d{2,4}\/\d{1,2}\:\d{1,2}\:\d{1,2}\b/],
         [REB['date!'], /^\d{1,2}[\-\/](\d{1,2}|\w{3,9})[\-\/]\d{2,4}\b/],
         [REB['date!'], /^\d{2,4}[\/\-](\d{1,2}|\w{3,9})[\/\-]\d{1,2}(?:\/\d{1,2}\:\d{1,2}(?:\:\d{1,2})?(?:[-+]\d{1,2}:[03]0)?)?/],
         // -- time!
         [REB['time!'], /^[-+]?\d{1,2}:\d{1,2}(?::\d{1,2}(?:\.\d+)?)?\b/],
         // -- tuple!
         [REB['tuple!'], /^\d+(?:\.\d+){2,9}/],
         // -- pair!
         [REB['pair!'], /^[-+]?(?:[.,]\d+|\d+['\d]*(?:[.,]\d*)?)(?:e[-+]?\d+)?x[-+]?(?:[.,]\d+|\d+['\d]*(?:[.,]\d*)?)(?:e[-+]?\d+)?/i],
         // -- money!
         [REB['money!'], /^[-+]?[A-Z]{0,3}\$(?:[.,]\d+|\d+['\d]*(?:[.,]\d*)?)(?:e[-+]?\d+)?/],
         // -- number!
         [REB['number!'], /^[-+]?(?:[.,]\d+|\d+['\d]*(?:[.,]\d*)?)(?:e[-+]?\d+)?%?/i],
         // -- datatype!
         [REB['datatype!'], /^(?:[A-Za-z\-]+)\!(?![A-Za-z0-9\-])/],
         // -- set-word!
         [REB['set-word!'], /^[A-Za-z=\-?!_*+.`~&][A-Za-z0-9=\-!?_*+.`~&]*(?:\/[A-Za-z=\-?!_*+.`~&][A-Za-z0-9=\-!?_*+.`~&]*|\/\d+)*:/],
         // -- get-word!
         [REB['get-word!'], /^:[A-Za-z=\-?!_*+.`~&][A-Za-z0-9=\-!?_*+.`~&]*/],
         // -- lit-word!
         [REB['lit-word!'], /^'[A-Za-z=\-?!_*+.`~&][A-Za-z0-9=\-!?_*+.`~&]*/],
         // -- refinement!
         [REB['refinement!'], /^\/[A-Za-z0-9=\-!?_*+.`~&]+(?![A-Za-z0-9\-])/],
         // -- op!
         [REB['op!'], /^(?:!=?=?|\*\*?|[+-]|\/\/?|<[=>]?|=[=?]?|>=?)(?![A-Za-z0-9\-])/],
         // -- function!
         [REB['function!'], /^\b(?:to\-relative\-file\/as\-local|to\-relative\-file\/as\-rebol|to\-relative\-file\/no\-copy|load\-extension\/dispatch|map\-gob\-offset\/reverse|collect\-words\/ignore|request\-file\/filter|arctangent\/radians|round\/half\-ceiling|request\-file\/multi|to\-local\-file\/full|collect\-words\/deep|request\-file\/title|request\-file\/save|collect\-words\/set|request\-file\/file|greater\-or\-equal\?|strict\-not\-equal\?|arccosine\/radians|lesser\-or\-equal\?|invalid\-utf\?\/utf|unprotect\/values|decompress\/limit|to\-relative\-file|transcode\/error|decompress\/part|round\/half\-down|difference\/case|arcsine\/radians|difference\/skip|decompress\/gzip|recycle\/torture|minimum\-of\/skip|checksum\/secure|recycle\/ballast|clean\-path\/only|extract\/default|maximum\-of\/skip|tangent\/radians|unprotect\/words|checksum\/method|import\/no\-share|charset\/length|resolve\/extend|construct\/with|intersect\/skip|intersect\/case|select\/reverse|switch\/default|uppercase\/part|map\-gob\-offset|encode\/options|construct\/only|transcode\/next|unprotect\/deep|load\-extension|clean\-path\/dir|protect\/values|lowercase\/part|import\/version|import\/no\-user|trace\/function|transcode\/only|dump\-obj\/match|cosine\/radians|reword\/escape|import\/no\-lib|to\-local\-file|new\-line\/skip|random\/secure|save\/compress|make\-dir\/deep|delta\-profile|to\-rebol\-file|reduce\/no\-set|compress\/part|stats\/profile|shift\/logical|round\/ceiling|strict\-equal\?|checksum\/hash|to\-refinement|any\-function\?|checksum\/part|collect\-words|protect\/words|extract\/index|compress\/gzip|array\/initial|import\/check|sort\/reverse|new\-line\/all|sort\/compare|checksum\/tcp|resolve\/only|checksum\/key|speed\?\/no\-io|speed\?\/times|collect\/into|sine\/radians|extract\/into|invalid\-utf\?|compose\/deep|compose\/into|break\/return|protect\/hide|protect\/deep|write\/append|funct\/extern|confirm\/with|encloak\/with|request\-file|replace\/tail|deline\/lines|replace\/case|exclude\/case|find\/reverse|exclude\/skip|module\/mixin|compose\/only|reverse\/part|decloak\/with|cause\-error|assert\/type|select\/part|select\/skip|select\/only|select\/last|remold\/flat|select\/case|limit\-usage|recycle\/off|select\/with|to\-datatype|load\/header|unique\/skip|say\-browser|save\/length|random\/seed|reduce\/into|save\/header|unique\/case|random\/only|launch\/wait|find\-script|launch\/args|append\/part|quit\/return|reduce\/only|append\/only|to\-function|make\-banner|round\/floor|refinement\?|any\-string\?|do\-callback|now\/precise|read\/string|now\/weekday|stats\/timer|insert\/part|reword\/into|insert\/only|stats\/evals|return\/redo|now\/yearday|any\-object\?|stack\/limit|stack\/depth|resolve\/all|to\-get\-path|write\/allow|square\-root|to\-get\-word|enbase\/base|write\/lines|change\/part|change\/only|to\-hex\/size|to\-lit\-path|unbind\/deep|to\-set\-path|to\-lit\-word|replace\/all|repend\/part|repend\/only|to\-set\-word|remove\/part|remove\-each|remold\/only|stack\/block|do\-commands|debase\/base|to\-typeset|entab\/size|remold\/all|round\/down|round\/even|file\-type\?|difference|detab\/size|delta\-time|find\/match|repend\/dup|write\/seek|write\/part|maximum\-of|alter\/case|any\-block\?|trim\/lines|delect\/all|minimum\-of|try\/except|append\/dup|to\-integer|to\-decimal|select\/any|recycle\/on|decompress|decode\-url|mkdir\/deep|apply\/only|copy\/types|arctangent|format\/pad|read\/lines|to\-command|to\-closure|open\/allow|list\-dir\/r|set\-scheme|list\-dir\/l|list\-dir\/i|funct\/with|to\-percent|list\-dir\/f|query\/mode|complement|list\-dir\/d|throw\/name|not\-equal\?|union\/skip|type\?\/word|clean\-path|union\/case|not\-equiv\?|split\-path|split\/into|switch\/all|change\/dup|change\-dir|stack\/args|parse\/case|boot\-print|stats\/show|catch\/quit|catch\/name|stack\/func|insert\/dup|stack\/size|open\/write|stack\/word|trace\/back|loud\-print|remainder|open\/read|open\/seek|call\/wait|to\-string|parse\/all|positive\?|bind\/only|intersect|to\-object|bind\/copy|what\/args|to\-module|now\/month|values\-of|sort\/skip|sort\/case|to\-vector|new\-line\?|take\/deep|take\/last|take\/part|get\-word\?|to\-binary|negative\?|move\/skip|to\-bitset|move\/part|get\-path\?|function\?|set\-word\?|construct|set\-path\?|index\?\/xy|lit\-path\?|lit\-word\?|mold\/only|copy\/deep|copy\/part|mold\/flat|read\/part|arccosine|load\/next|load\/type|read\/seek|modified\?|transcode|datatype\?|find\/with|find\/tail|lowercase|find\/skip|find\/part|find\/last|trim\/with|trim\/tail|find\/case|trim\/head|trim\/auto|any\-word\?|any\-path\?|delect\/in|unprotect|uppercase|map\-event|encoding\?|selfless\?|find\/only|sort\/part|to\-tuple|map\-each|trim\/all|make\-dir|dump\-obj|absolute|subtract|checksum|bind\/set|to\-issue|bind\/new|find\-all|find\/any|closure\?|to\-money|rebcode\?|load\/all|mold\/all|load\-gui|to\-image|sort\/all|to\-paren|list\-env|do\-codec|list\-dir|round\/to|save\/all|multiply|case\/all|to\-error|wait\/all|library\?|new\-line|function|q\/return|greater\?|ask\/hide|command\?|title\-of|to\-logic|words\-of|types\-of|decimal\?|now\/date|to\-block|compress|what\-dir|now\/time|help\/doc|integer\?|now\/year|percent\?|now\/zone|continue|to\-email|typeset\?|to\-event|open\/new|quit\/now|undirize|replace|offset\?|set\/any|confirm|object\?|set\/pad|context|number\?|to\-date|set\-env|arcsine|to\-port|if\/else|as\-pair|to\-char|pending|seventh|series\?|now\/utc|now\/day|wake\-up|to\-file|to\-pair|latin1\?|decloak|compose|protect|to\-word|handle\?|single\?|get\/any|get\-env|default|length\?|script\?|scalar\?|to\-time|native\?|tangent|attempt|move\/to|binary\?|body\-of|license|bitset\?|forskip|to\-path|forever|foreach|collect|recycle|do\/args|string\?|do\/next|module\?|upgrade|closure|vector\?|action\?|spec\-of|reflect|struct\?|reverse|extract|changes|minimum|exists\?|exclude|resolve|maximum|encloak|suffix\?|lesser\?|charset|tuple\?|error\?|equiv\?|repeat|equal\?|rename|enline|encode|event\?|enbase|switch|email\?|either|remove|eighth|extend|remold|return|unset\?|rejoin|reform|reword|update|reduce|first\+|unless|forall|format|divide|dirize|found\?|block\?|fourth|frame\?|utype\?|random|deline|delete|delect|bound\?|unique|assert|repend|secure|select|to\-map|decode|printf|ascii\?|debase|browse|create|cosine|value\?|unbind|image\?|paren\?|import|to\-tag|in\-dir|index\?|object|insert|intern|issue\?|to\-url|append|to\-gob|launch|negate|native|to\-hex|money\?|mold64|modulo|log\-10|module|modify|change|source|logic\?|speed\?|action|second|empty\?|zero\?|char\?|check|stack|clear|close|catch|size\?|sixth|sign\?|shift|stats|date\?|break|dehex|same\?|detab|usage|round|until|unset|entab|even\?|evoke|bind\?|fifth|file\?|first|tail\?|funco|while|quote|word\?|funct|split|q\/now|task\?|tenth|third|throw|union|time\?|probe|print|power|head\?|port\?|path\?|past\?|array|parse|pair\?|apply|open\?|info\?|input|last\?|none\?|write|alter|ninth|trace|ajoin|type\?|log\-2|log\-e|mkdir|true\?|query|about|echo|task|take|tail|tag\?|swap|sort|skip|sine|bind|save|bugs|read|quit|what|prin|poke|pick|call|xor\~|open|case|odd\?|wait|why\?|next|move|more|mold|chat|exit|demo|map\?|trim|back|make|ls\/r|ls\/l|ls\/i|ls\/f|ls\/d|dir\?|url\?|loop|load|last|join|docs|also|help|head|does|halt|gob\?|and\~|func|form|dump|find|copy|utf\?|set|for|and|get|any|has|all|ask|add|try|use|exp|max|min|mod|xor|now|op\?|or\~|pwd|abs|map|not|rm|at|do|dp|ds|dt|cd|in|ls|to|or|if)(?![A-Za-z0-9\-])/],
         // -- rebol!
         [REB['rebol!'], /^(?:rebol|red(?:\/system)?|world|topaz)$/i],
         // -- logic!
         [REB['logic!'], /^(?:true|false|yes|no|on|off)$/],
         // -- none!
         [REB['none!'], /^none$/],
         // -- word!
         [REB['word!'], /^[A-Za-z=\-?!_*+.`~&][A-Za-z0-9=\-!?_*+.`~&]*/],
         //
         // Above is the Rebol data types grammar.  
         // Punctuation (from lisp)
         [PR['PR_PUNCTUATION'], /^[^\w\t\n\r \xA0()\"\\\';]+/]
        ]),
    ['rebol', 'red']);
