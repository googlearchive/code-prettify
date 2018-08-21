/**
 * @license
 * Copyright (C) 2018 Herman Torjussen
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
 * Registers a language handler for SuperCollider. 
 * Based on the syntax highlighter in the SC help browser:
 * https://github.com/supercollider/supercollider/blob/develop/HelpSource/editor.js
 * See https://supercollider.github.io for more info on the language.
 *
 * @author herman.torjussen@gmail.com
 */

PR.registerLangHandler(
    PR.createSimpleLexer(
        [
            /* whitespace */
            [PR.PR_PLAIN, /^\s+/],
            /* keyword */
            [PR.PR_KEYWORD, /^(?:arg|classvar|const|super|this|var)\b/],
            /* built-in */
            [PR.PR_TAG, /^(?:false|inf|nil|true|thisFunction|thisFunctionDef|thisMethod|thisProcess|thisThread|currentEnvironment|topEnvironment)\b/],
            /* number, radix-float */
            [PR.PR_LITERAL, /^\b\d+r[0-9a-zA-Z]*(\.[0-9A-Z]*)?/],
            /* number, float  */
            [PR.PR_LITERAL, /^\b((\d+(\.\d+)?([eE][-+]?\d+)?(pi)?)|pi)\b/],
            /* number, hex-int */
            [PR.PR_LITERAL, /^\b0(x|X)(\d|[a-f]|[A-F])+/],
            /* symbol, symbol-arg */
            [PR.PR_ATTRIB_NAME, /^\b[A-Za-z_]\w*\:/],
            /* text, name */
            [PR.PR_PLAIN, /^[a-z]\w*/],
            /* class */
            [PR.PR_TYPE, /^\b[A-Z]\w*/],
            /* primitive */
            [PR.PR_DECLARATION, /^\b_\w+/],
            /* symbol */
            [PR.PR_ATTRIB_NAME, /^\\\w*/],
            /* symbol */
            [PR.PR_ATTRIB_NAME, /'(?:[^\\]|\\.)*?(?:'|$)/],
            /* char */
            [PR.PR_ATTRIB_NAME, /^\$\\?./],
            /* env-var */
            [PR.PR_ATTRIB_NAME, /^~\w+/],
            /* comment, single-line-comment */
            [PR.PR_COMMENT, /^\/\/[^\r\n]*/],
            /* string */
            [PR.PR_STRING, /"(?:[^\\]|\\.)*?(?:"|$)/],
            /* text, punctuation */
            [PR.PR_PUNCTUATION, /^[-.,;#()\[\]{}]/]
            /* comment, multi-line-comment (FIXME: support nested comments) */
            [PR.PR_COMMENT, /^\/(?:\*(?:\/|\**[^*/])*(?:\*+\/?)?)/],
            /* text, operator */
            [PR.PR_PUNCTUATION, /^[+\-*/&\|\^%<>=!?]+/]
        ]),
    ['sc']);
