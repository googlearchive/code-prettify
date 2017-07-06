/**
 * @license
 * Copyright (C) 2017 Michał Bączkowski
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
 * Registers a language handler for Kotlin.
 *
 * Limitations:
 * - doesn't support string interpolation ("$var")
 * - doesn't support labels if there is no space between the keyword (break@loop, loop@for)
 *
 * @author mibac138@gmail.com
 */

PR['registerLangHandler'](
    PR['createSimpleLexer'](
        [
            [PR['PR_PLAIN'], /^[\t\n\r \xA0]+/, null, '\t\n\r \xA0'],
            [PR['PR_PUNCTUATION'], /^[.!%&()*+,\-;<=>?\[\\\]^{|}:]+/, null, '.!%&()*+,-;<=>?[\\]^{|}:']
        ],
        [
            // keywords
            [PR['PR_KEYWORD'],
                /^\b(package|public|protected|private|open|abstract|constructor|final|override|import|for|while|as|typealias|get|set|((data|enum|annotation|sealed) )?class|this|super|val|var|fun|is|in|throw|return|break|continue|(companion )?object|if|try|else|do|when|init|interface|typeof)\b/],
            [PR['PR_LITERAL'], /^(?:true|false|null)\b/],
            // number literals
            [PR['PR_LITERAL'], /^(0[xX][0-9a-fA-F_]+L?|0[bB][0-1]+L?|[0-9_.]+([eE]-?[0-9]+)?[fFL]?)/],
            [PR['PR_TYPE'], /^(\b[A-Z]+[a-z][a-zA-Z0-9_$@]*|`.*`)/, null],
            //double slash comments
            [PR['PR_COMMENT'], /^\/\/.*/],
            //slash star comments and documentation
            [PR['PR_COMMENT'], /^\/\*[\s\S]*?(?:\*\/|$)/],
            // char
            [PR['PR_STRING'], /'.'/],
            // string
            [PR['PR_STRING'], /^"([^"\\]|\\[\s\S])*"/],
            // multiline string
            [PR['PR_STRING'], /^"{3}[\s\S]*?[^\\]"{3}/],
            // annotation (and label)
            [PR['PR_LITERAL'], /^@([a-zA-Z0-9_$@]*|`.*`)/],
            // label definition
            [PR['PR_LITERAL'], /^[a-zA-Z0-9_]+@/]
        ]),
    ['kotlin']);
