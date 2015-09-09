/**
 * @license
 * Copyright (C) 2014 Paulo Moura
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
 * Registers a language handler for Logtalk.
 * http://logtalk.org/
 * @author Paulo Moura
 */

PR['registerLangHandler'](
    PR['createSimpleLexer'](
        [
          // double-quoted strings.
          [PR['PR_STRING'], /^\"(?:[^\"\\\n\x0C\r]|\\[\s\S])*(?:\"|$)/, null, '"'],
          // atoms (don't break on underscores!)
          [PR['PR_LITERAL'], /^[a-z][a-zA-Z0-9_]*/],
          // quoted atoms
          [PR['PR_LITERAL'], /^\'(?:[^\'\\\n\x0C\r]|\\[^&])+\'?/, null, "'"],
          // numbers
          [PR['PR_LITERAL'], /^(?:0'.|0b[0-1]+|0o[0-7]+|0x[\da-f]+|\d+(?:\.\d+)?(?:e[+\-]?\d+)?)/i, null, '0123456789']
        ],
        [
          // single-line comments begin with %
          [PR['PR_COMMENT'], /^%[^\r\n]*/, null, '%'],
          // block comments are delimited by /* and */
          [PR['PR_COMMENT'], /^\/\*[\s\S]*?\*\//],
          // directives
          [PR['PR_KEYWORD'], /^\s*:-\s(c(a(lls|tegory)|oinductive)|p(ublic|r(ot(ocol|ected)|ivate))|e(l(if|se)|n(coding|sure_loaded)|xport)|i(f|n(clude|itialization|fo))|alias|d(ynamic|iscontiguous)|m(eta_(non_terminal|predicate)|od(e|ule)|ultifile)|reexport|s(et_(logtalk|prolog)_flag|ynchronized)|o(bject|p)|use(s|_module))/],
          [PR['PR_KEYWORD'], /^\s*:-\s(e(lse|nd(if|_(category|object|protocol)))|built_in|dynamic|synchronized|threaded)/],
          // variables
          [PR['PR_TYPE'], /^[A-Z_][a-zA-Z0-9_]*/],
          // operators
          [PR['PR_PUNCTUATION'], /^[.,;{}:^<>=\\/+*?#!-]/]
        ]),
    ['logtalk', 'lgt']);
