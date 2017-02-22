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
         [PR['PR_PLAIN'], /^[\t\n\r \xA0]+/, null, '\t\n\r \xA0'],
         // A double-quoted multi-line string
         // or a triple double-quoted multi-line string.
         [PR['PR_STRING'],
          /^(?:"(?:(?:""(?:""?(?!")|[^\\"]|\\.)*"{0,3})|(?:[^"\\]|\\.)*"?))/,
          null, '"'],
         // # comments
         [PR['PR_COMMENT'], /^#.*/, null, '#'],
         // a (possibly multiline) charlist
         [PR['PR_LITERAL'], /^'(?:[^'\\]|\\.)*'?/, null, '\''],
         // @attributes
         [PR['PR_ATTRIB_NAME'], /^@\w+/, null, '@'],
         [PR['PR_PUNCTUATION'], /^[!%&()*+,\-;<=>?\[\\\]^{|}~]+/, null,
          '!%&()*+,-;<=>?[\\]^{|}~'],
         // Borrowed from lang-erlang.js:
         [PR['PR_LITERAL'],
          /^(?:0o[0-7](?:[0-7]|_[0-7])*|0x[\da-f](?:[\da-f]|_[\da-f])*|\d(?:\d|_\d)*(?:\.\d(?:\d|_\d)*)?(?:e[+\-]?\d(?:\d|_\d)*)?)/i,
          null, '0123456789']
        ],
        [
         // atoms - :__a_word or :"colon followed by a string"
         [PR['PR_LITERAL'], /^:(?:\w+|"(?:[^"\\]|\\.)*"?)/],
         // compile-time information
         [PR['PR_ATTRIB_NAME'], /^(?:__(?:CALLER|ENV|MODULE|DIR)__)/],
         // keywords
         [PR['PR_KEYWORD'],
          /^(?:alias|case|catch|defp?|defdelegate|defexception|defimpl|defmacrop?|defmodule|defoverridable|defprotocol|defstruct|do|else|end|for|if|import|raise|require|throw|type|unless|use|yield)\b/],
         [PR['PR_LITERAL'], /^(?:true|false|nil)\b/],
         // atoms as keyword list keys
         // NOTE: this doesn't handle the %{"I'm an atom": :foo} case to make
         // the string detection faster. It is rarely ever used too.
         [PR['PR_LITERAL'], /^(?:\w+):/],
         // types
         [PR['PR_TYPE'], /^[A-Z]\w*/],
         // TODO: sigils
         // variables not meant to be used or private functions
         [PR['PR_COMMENT'], /^_\w*/],
         // plain: variables, functions, ...
         [PR['PR_PLAIN'], /^[$a-zA-Z_][\w$]*/],
         [PR['PR_PUNCTUATION'], /^(?:\.+|\/|:)/]
        ]),
    ['ex','exs']);
