/**
 * @license
 * Copyright (C) 2010 Google Inc.
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
 * Registers a language handler for Chapel.
 *
 * Derived from prior experience implementing similar things in a few environments,
 * most especially Codemirror-mode-chapel
 *
 * @author krishnakumardey.dey@gmail.com
 */

PR['registerLangHandler'](
    PR['createSimpleLexer'](
        [
         // Whitespace
         [PR['PR_PLAIN'],       /^[\t\n\r \xA0]+/, null, '\t\n\r \xA0'],
         // A double or single quoted string 
         [PR['PR_STRING'],
          /^(?:"(?:[^"\r\n]|\\.)*")|(?:'(?:[^'\r\n]|\\.)*')/],
         [PR['PR_PUNCTUATION'], /^(=|\+=|-=|\*=|\/=|\*\*=|%=|&=|\|=|\^=|&&=|\|\|=|<<=|>>=|<=>|<~>|\.\.|by|#|\.\.\.|&&|\|\||!|&|\||\^|~|<<|>>|==|!=|<=|>=|<|>|[+\-*/%]|\*\*)/]
        ],
        [
         [PR['PR_LITERAL'],     /^'[a-zA-Z_$][\w$]*(?!['$\w])/],
         [PR['PR_KEYWORD'],     /^(?:#|align|as|atomic|begin|borrowed|break|by|catch|class|cobegin|coforall|config|const|continue|delete|dmapped|do|domain|else|enum|except|export|extern)\b/],
         [PR['PR_KEYWORD'],     /^(?:for|forall|if|in|index|inline|inout|iter|label|lambda|let|local|module|new|nil|noinit|on|only|otherwise|out|param|private|proc|public|record|reduce|ref|require|return|scan)\b/],
         [PR['PR_KEYWORD'],     /^(?:select|serial|shared|single|sparse|subdomain|sync|then|try|type|union|unmanaged|use|var|when|where|while|with|write|writeln|yield|zip)\b/],
         [PR['PR_LITERAL'],     /^(?:nil|true|false)\b/],
         [PR['PR_TYPE'], /^(?:int|uint|bool|real|imag|complex|string|void|_void|record|domain|subdomain|sparse)\b/],
         [PR['PR_LITERAL'],     /^(?:0[xX][a-f\d]+|0[bB][01]+|0[oO][0-7]+|(?:\d+\.?\d*|\.\d+)(?:[eE][-+]?\d+)?((([+-](?:\d+\.?\d*|\.\d+)(?:[eE][-+]?\d+)?i)?|i?)?|i?))(u|ll?|l|f)/i],
         [PR['PR_PLAIN'],       /^[$a-zA-Z_][\w$]*/],
         [PR['PR_COMMENT'],     /^\/(?:\/.*|\*(?:\/|\**[^*/])*(?:\*+\/?)?)/],
         [PR['PR_PUNCTUATION'], /[\[\]{}\(\),;\:\.\?]/]
        ]),
    ['chapel']);
