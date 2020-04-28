/**
 * @license
 * Copyright (C) 2016 Eyal Dechter
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
 * Registers a language handler for Prolog.
 * @author Eyal Dechter
 */

PR['registerLangHandler'](
    PR['createSimpleLexer'](
        [
            // double-quoted strings.
            [PR['PR_STRING'], /^\"(?:[^\"\\\n\x0C\r]|\\[\s\S])*(?:\"|$)/, null, '"'],
            // quoted atoms
            [PR['PR_PLAIN'], /^\'(?:[^\'\\\n\x0C\r]|\\[^&])+\'?/, null, "'"],
            // numbers
            [PR['PR_PLAIN'], /^(?:0'.|0b[0-1]+|0o[0-7]+|0x[\da-f]+|\d+(?:\.\d+)?(?:e[+\-]?\d+)?)/i, null, '0123456789'],
            // single-line comments begin with %
            [PR['PR_COMMENT'], /^%[^\r\n]*/, null, '%']
        ],
        [
            // atoms (don't break on underscores!)
            [PR['PR_PLAIN'], /^[a-z][a-zA-Z0-9_]*/, null, "abcdefghijklmnopqrstuvwxyz"],
            // block comments are delimited by /* and */
            [PR['PR_COMMENT'], /^\/\*[\s\S]*?\*\//],
            // directives
            [PR['PR_KEYWORD'], /^\s*:-\s(module|use_module|export|reexport|meta_predicate|multifile|dynamic)/],
            // variables
            [PR['PR_TYPE'], /^[A-Z_][a-zA-Z0-9_]*/],
            // operators
            [PR['PR_PUNCTUATION'], /^[.,;{}:^<>=\\/+*?#!-]/]
            
        ]),
    ['prolog']);
