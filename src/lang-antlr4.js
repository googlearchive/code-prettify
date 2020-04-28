/**
 * @license
 * Copyright (C) 2016 Bart Kiers
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview
 * Registers a language handler for ANTLR 4. <http://www.antlr.org>
 *
 * To use, include prettify.js and this file in your HTML page.
 * Then enclose your code in an HTML tag like so:
 *      <pre class="prettyprint lang-antlr4">[your ANTLR grammar]</pre>
 *
 * Note that embedded code blocks, like `@members::` blocks, are not
 * highlighted. These blocks can contain arbitrary target code, containing
 * a large amount of nested curly braces: impossible to define with a (JS)
 * regex.
 *
 * @author Bart Kiers
 */
PR['registerLangHandler'](
    PR['createSimpleLexer']([], [

        [PR['PR_PLAIN'],      /^[\t\n\r \xA0]+/],

        // Comments
        [PR['PR_COMMENT'],    /^\/\/[^\r\n]*/],
        [PR['PR_COMMENT'],    /^\/\*[\s\S]*?(?:\*\/|$)/],

        // Literal tokens: single quoted strings and character sets
        [PR['PR_STRING'],     /^'(?:\\.|[^\\'\r\n])+'/],
        [PR['PR_STRING'],     /^\[(?:\\.|[^\\\[\]])+]/],

        // Keywords: https://github.com/antlr/grammars-v4/blob/master/antlr4/ANTLRv4Lexer.g4
        [PR['PR_KEYWORD'],    /^(?:options|tokens|import|fragment|lexer|parser|grammar\s+\w+|protected|public|private|returns|locals|throws|catch|finally|mode)\b/],

        // Predicates
        [PR['PR_SOURCE'],     /^\{.*?}\?/],

        // Lexer- and parser-rules
        [PR['PR_TYPE'],       /^[A-Z]\w*/],
        [PR['PR_LITERAL'],    /^[a-z]\w*/],

        // Fall through rule matching any char as a 'plain' char
        [PR['PR_PLAIN'], /./]
    ]),
    ['antlr4']);