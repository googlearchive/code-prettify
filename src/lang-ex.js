/**
 * @license
 * Copyright (C) 2017 Jacek Królikowski
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
         // # comments
         [PR['PR_COMMENT'], /^#.*/, null, '#'],
         // a (possibly multiline) charlist
         [PR['PR_LITERAL'], /^'(?:[^'\\]|\\(?:.|\n|\r))*'?/, null, '\''],
         // @attributes
         [PR['PR_ATTRIB_NAME'], /^@\w+/, null, '@'],
         [PR['PR_PUNCTUATION'], /^[!%&()*+,\-;<=>?\[\\\]^{|}]+/, null,
          '!%&()*+,-;<=>?[\\]^{|}'],
         // Borrowed from lang-erlang.js:
         [PR['PR_LITERAL'],
          /^(?:0o[0-7](?:[0-7]|_[0-7])*|0x[\da-fA-F](?:[\da-fA-F]|_[\da-fA-F])*|\d(?:\d|_\d)*(?:\.\d(?:\d|_\d)*)?(?:[eE][+\-]?\d(?:\d|_\d)*)?)/,
          null, '0123456789']
        ],
        [
         // the iex> prompt for interactive examples
         [PR['PR_ATTRIB_NAME'], /^iex(?:\(\d+\))?> /],
         // special case for binaries, so that they don't get presented like atoms
         [PR['PR_PUNCTUATION'], /^::/],
         // atoms - :__a_word or :"colon followed by a string"
         [PR['PR_LITERAL'], /^:(?:\w+[\!\?\@]?|"(?:[^"\\]|\\.)*"?)/],
         // compile-time information
         [PR['PR_ATTRIB_NAME'], /^(?:__(?:CALLER|ENV|MODULE|DIR)__)/],
         // keywords
         [PR['PR_KEYWORD'],
          /^(?:alias|case|catch|def(?:delegate|exception|impl|macrop?|module|overridable|p?|protocol|struct)|do|else|end|fn|for|if|in|import|quote|raise|require|rescue|super|throw|try|unless|unquote(?:_splicing)?|use|when|with|yield)\b/],
         [PR['PR_LITERAL'], /^(?:true|false|nil)\b/],
         // atoms as keyword list keys
         // NOTE: this does also handle the %{"I'm an atom": :foo} case
         //
         // Contains negative lookahead to handle <<foo::binary>>
         [PR['PR_LITERAL'], /^(?:\w+[\!\?\@]?|"(?:[^"\\]|\\.)*"):(?!:)/],
         // heredoc: triple double-quoted multi-line string.
         //
         // NOTE: the opening """ needs to be followed by a newline
         [PR['PR_STRING'],
          /^"""\s*(\r|\n)+(?:""?(?!")|[^\\"]|\\(?:.|\n|\r))*"{0,3}/],
         // A double-quoted multi-line string
         [PR['PR_STRING'],
          /^"(?:[^"\\]|\\(?:.|\n|\r))*"?(?!")/],
         // types
         [PR['PR_TYPE'], /^[A-Z]\w*/],
         // variables not meant to be used or private functions
         [PR['PR_COMMENT'], /^_\w*/],
         // plain: variables, functions, ...
         [PR['PR_PLAIN'], /^[$a-z]\w*[\!\?]?/],
         // sigils with the same starting and ending character.
         // Key part: X(?:[^X\r\n\\]|\\.)+X where X is the sigil character
         [PR['PR_ATTRIB_VALUE'], /^~[A-Z](?:\/(?:[^\/\r\n\\]|\\.)+\/|\|(?:[^\|\r\n\\]|\\.)+\||"(?:[^"\r\n\\]|\\.)+"|'(?:[^'\r\n\\]|\\.)+')[A-Z]*/i],
         // sigils with a different starting and ending character.
         // Key part: X(?:[^Y\r\n\\]|\\.)+Y where X and Y are the starting and ending characters
         [PR['PR_ATTRIB_VALUE'], /^~[A-Z](?:\((?:[^\)\r\n\\]|\\.)+\)|\[(?:[^\]\r\n\\]|\\.)+\]|\{(?:[^\}\r\n\\]|\\.)+\}|\<(?:[^\>\r\n\\]|\\.)+\>)[A-Z]*/i],
         [PR['PR_PUNCTUATION'], /^(?:\.+|\/|[:~])/]
        ]),
    ['ex','exs']);
