/**
 * @license
 * Copyright (C) 2019 Michael Newton
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
 * Registers a language handler for Windows-style "ini" configuration files
 *
 *
 * To use, include prettify.js and this file in your HTML page.
 * Then put your code in an HTML tag like
 *      <pre class="prettyprint lang-ini">(my ini file)</pre>
 * This file supports the following extensions:
 *     lang-ini - Standard INI file syntax
 *     lang-ast - Asterisk-style configuration files
 *
 * "Name"    = 'INI'
 * "Author"  = 'Michael Newton'
 * "Version" = '1.0'
 * "About"   = 'The INI file format is an informal standard for configuration'
 *           | 'files for some computing platforms or software. INI files are'
 *           | 'simple text files with a basic structure composed of sections,'
 *           | 'properties, and values.'
 *
 * @author https://github.com/miken32
 */

PR.registerLangHandler(
    PR.createSimpleLexer(
        // Patterns that always start with a known character.  Must have a shortcut string.
        [
            [
                // A line comment that starts with ;
                PR.PR_COMMENT,
                /^;[^\r\n]*/,
                null,
                ';'
            ],
            [
                // key/value divider
                PR.PR_PUNCTUATION,
                /^=>?/,
                null,
                '='
            ],
            [
                // Whitespace
                PR.PR_PLAIN,
                /^[\t\n\r \xA0]+/,
                null,
                '\t\n\r \xA0'
            ],
            [
                // A double quoted string
                PR.PR_STRING,
                /^"(?:[^\\"]|\\.)*(?:"|$)/,
                null,
                '"'
            ],
            [
                // A section in square brackets
                PR.PR_TYPE,
                /^\[[^\]]+\]/,
                null,
                '['
            ]
        ],

        // Patterns that will be tried in order if the shortcut ones fail.  May have shortcuts.
        [
            [
                PR.PR_KEYWORD,
                /^[^=>;\r\n]+\s*=>?/
            ],
            [
                PR.PR_LITERAL,
                /[!-~]+/
            ]
        ]
    ),
    ['ini']
);
