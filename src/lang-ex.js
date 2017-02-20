/**
 * @license
 * Copyright (C) 2017 Google Inc.
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
 * Registers a language handler for Elixir.
 *
 * @author nietaki@gmail.com
 */

PR['registerLangHandler'](
    PR['createSimpleLexer'](
        [
         [PR['PR_PLAIN'],       /^[\t\n\r \xA0]+/, null, '\t\n\r \xA0'],
         // A double or single quoted string
         // or a triple double-quoted multi-line string.
         [PR['PR_STRING'],
          /^(?:"(?:(?:""(?:""?(?!")|[^\\"]|\\.)*"{0,3})|(?:[^"\r\n\\]|\\.)*"?))/,
          null, '"'],
         [PR['PR_LITERAL'],     /^`(?:[^\r\n\\`]|\\.)*`?/, null, '`'],
         // TODO: atoms (including :"I'm a weird atom")
         [PR['PR_COMMENT'],     /^#.*/, null, '#'],
         [PR['PR_ATTRIB_NAME'], /^@[a-z][a-z0-9_]*/, null, '@'],
         [PR['PR_PUNCTUATION'], /^[!%&()*+,\-:;<=>?\[\\\]^{|}~]+/, null,
          '!%&()*+,-:;<=>?[\\]^{|}~'],
          // Borrowed from lang-erlang.js:
          // decimal      ->    digit{digit}
          // octal        ->    octit{octit}
          // hexadecimal  ->    hexit{hexit}
          // integer      ->    decimal
          //               |    0o octal | 0O octal
          //               |    0x hexadecimal | 0X hexadecimal
          // float        ->    decimal . decimal [exponent]
          //               |    decimal exponent
          // exponent     ->    (e | E) [+ | -] decimal
          // TODO: add the mid-number underscores (100_000)
          [PR['PR_LITERAL'],
           /^(?:0o[0-7]+|0x[\da-f]+|\d+(?:\.\d+)?(?:e[+\-]?\d+)?)/i,
           null, '0123456789']
        ],
        [
         // A symbol literal is a single quote followed by an identifier with no
         // single quote following
         // A character literal has single quotes on either side
         [PR['PR_STRING'],      /^'(?:[^\r\n\\']|\\(?:'|[^\r\n']+))'/],
         [PR['PR_LITERAL'],     /^'[a-zA-Z_$][\w$]*(?!['$\w])/],
         [PR['PR_ATTRIB_NAME'], /^(?:__(?:CALLER|ENV|MODULE|DIR)__)/],
         [PR['PR_KEYWORD'],     /^(?:alias|case|catch|defp?|defdelegate|defexception|defimpl|defmacrop?|defmodule|defoverridable|defprotocol|defstruct|do|else|end|for|if|import|raise|require|throw|type|unless|use|yield)\b/],
         [PR['PR_LITERAL'],     /^(?:true|false|nil)\b/],

         // Treat upper camel case identifiers as types.
         [PR['PR_TYPE'],        /^[$_]*[A-Z][_$A-Z0-9]*[a-z][\w$]*/],
         // TODO: variables starting with underscores
         // TODO: sigils
         [PR['PR_PLAIN'],       /^[$a-zA-Z_][\w$]*/],
         [PR['PR_PUNCTUATION'], /^(?:\.+|\/)/]
        ]),
    ['ex','exs']);
