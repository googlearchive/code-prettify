// Copyright (C) 2015 Google Inc.
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



/**
 * @fileoverview
 * Registers a language handler for Swift
 *
 *
 * To use, include prettify.js and this file in your HTML page.
 * Then put your code in an HTML tag like
 *      <pre class="prettyprint lang-swift">(my swift code)</pre>
 * This file supports the following language extensions:
 *     lang-swift - Swift
 *
 * I used https://developer.apple.com/library/ios/documentation/Swift/Conceptual/Swift_Programming_Language/AboutTheLanguageReference.html
 * as the basis for this. In particular, I targeted the revision from
 * 2015-04-08. Swift is still evolving, and this was the latest version 
 * available at the time.
 *
 * @author cerech@google.com
 */

PR['registerLangHandler'](
    PR['createSimpleLexer'](
        [
          //whitespace
          [PR['PR_PLAIN'],                /^[\s\n\r\t\u000B\u000C\u0000]+/, null, '\s\n\r\t\u000B\u000C\u0000']
        ],
        [
          //single-line comment
          [PR['PR_COMMENT'],              /^\/\/.*?[\n\r]/, null]
          //multiline comment
          [PR['PR_COMMENT'],              /^\/\*.*?\/\*\//, null]
        ]),
    ['swift']); 


//PR['registerLangHandler'](
//    PR['createSimpleLexer'](
//        [
//         ['opn',             /^\(+/, null, '('],
//        ['clo',             /^\)+/, null, ')'],
//       // A line comment that starts with ;
//         [PR['PR_COMMENT'],     /^;[^\r\n]*/, null, ';'],
//         // Whitespace
//         [PR['PR_PLAIN'],       /^[\t\n\r \xA0]+/, null, '\t\n\r \xA0'],
//         // A double quoted, possibly multi-line, string.
//         [PR['PR_STRING'],      /^\"(?:[^\"\\]|\\[\s\S])*(?:\"|$)/, null, '"']
//        ],
//        [
//         [PR['PR_KEYWORD'],     /^(?:block|c[ad]+r|catch|con[ds]|def(?:ine|un)|do|eq|eql|equal|equalp|eval-when|flet|format|go|if|labels|lambda|let|load-time-value|locally|macrolet|multiple-value-call|nil|progn|progv|quote|require|return-from|setq|symbol-macrolet|t|tagbody|the|throw|unwind)\b/, null],
//         [PR['PR_LITERAL'],
//          /^[+\-]?(?:[0#]x[0-9a-f]+|\d+\/\d+|(?:\.\d+|\d+(?:\.\d*)?)(?:[ed][+\-]?\d+)?)/i],
//         // A single quote possibly followed by a word that optionally ends with
//         // = ! or ?.
//         [PR['PR_LITERAL'],
//          /^\'(?:-*(?:\w|\\[\x21-\x7e])(?:[\w-]*|\\[\x21-\x7e])[=!?]?)?/],
//         // A word that optionally ends with = ! or ?.
//         [PR['PR_PLAIN'],
//          /^-*(?:[a-z_]|\\[\x21-\x7e])(?:[\w-]*|\\[\x21-\x7e])[=!?]?/i],
//         // A printable non-space non-special character
//         [PR['PR_PUNCTUATION'], /^[^\w\t\n\r \xA0()\"\\\';]+/]
//        ]),
//    ['cl', 'el', 'lisp', 'lsp', 'scm', 'ss', 'rkt']);*/
