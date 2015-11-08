/**
 * @license
 * Copyright (C) 2012 Jeffrey B. Arnold
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
 * Registers a language handler for ini and properties source code.
 *
 *
 * To use, include prettify.js and this file in your HTML page.
 * Then put your code in an HTML tag like
 *      <pre class="prettyprint lang-ini"> code </pre>
 */
PR['registerLangHandler'](
    PR['createSimpleLexer'](
        [
            // A line comment that starts with ; or #
            [PR['PR_COMMENT'],     /^[;#].*/, null, ';#'],
            // Whitespace
            [PR['PR_PLAIN'],       /^[\t\n\r \xA0]+/, null, '\t\n\r \xA0'],
            // header of a paragraph
            [PR['PR_KEYWORD'],     /^\[.*\]/, null, '[]']
        ],
        [
            [PR['PR_PLAIN'],       /^(?:"'\w+)(\w\s,.-"')*/, null, '"'],
            [PR['PR_PUNCTUATION'], /^=/]
        ]),
    ['ini', 'properties']);
