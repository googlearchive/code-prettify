/**
 * @license
 * Copyright (C) 2018 Alexander Kogtenkov
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview
 * Registers a language handler for Eiffel.
 *
 * To use, include prettify.js and this file in your HTML page.
 * Then put your code in an HTML tag like
 *      <pre class="prettyprint lang-eiffel">(my Eiffel code)</pre>
 *
 * @author Alexander Kogtenkov
 */

PR.registerLangHandler(
    PR.createSimpleLexer(
        [ // shortcutStylePatterns
                // Whitespace
            [PR['PR_PLAIN'],       /^\s+/, null, ' \r\n\t\xA0'],
                // Character
            [PR['PR_STRING'],      /^(?:'''|'[^']+')/, null, "'"],
                // String
            [PR['PR_STRING'],      /^"(?:(?:%[ \t\v]*[\r\n]\s*%|%"|[^"\r\n])*|\[(?=\s*[\r\n])[\s\S]*[\r\n]\s*\]|\{(?=\s*[\r\n])[\s\S]*[\r\n]\s*\})"/, null, '"'],
                // Integer or real starting from a digit
            [PR['PR_LITERAL'],     /^0[bcx][a-f\d](?:[_a-f\d]*[a-f\d])?|(?:\d(?:[_\d]*\d)?(?:\.(?:\d(?:[_\d]*\d)?)?(?:e[-+]?\d+)?)?)/i, null, '0123456789']
        ],
        [ // fallthroughStylePatterns
                // A line comment
            [PR['PR_COMMENT'],     /^--[^\r\n]*/],
                // Keyword
            [PR['PR_KEYWORD'],     /^\b(?:across|agent|alias|all|and|as|assign|attached|attribute|check|class|convert|create|debug|deferred|detachable|do|else|elseif|end|ensure|expanded|export|external|feature|from|frozen|if|implies|inherit|inspect|invariant|like|local|loop|not|note|obsolete|old|once|only|or|redefine|rename|require|rescue|retry|select|separate|some|then|undefine|until|variant|when|xor)\b/i],
                // A reserved word: entity
            [PR['PR_KEYWORD'],     /^\b(?:Current|Precursor|Result)\b/i],
                // A reserved word: value
            [PR['PR_LITERAL'],     /^\b(?:False|True|Void)\b/i],
                // Treat an upper case identifier as a type
            [PR['PR_TYPE'],        /^[A-Z][_A-Z\d]*/],
                // Real starting from a dot
            [PR['PR_LITERAL'],     /^\.\d(?:[_\d]*\d)?(?:e[-+]?\d+)?/i],
                // Identifier
            [PR['PR_PLAIN'],       /^[a-z]\w*/iu],
                // Other symbols
            [PR['PR_PUNCTUATION'], /^[^\s\w]+/]
        ]),
    ['eiffel','e']);
