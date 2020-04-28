/**
 * @license
 * Copyright (C) 2016 Comandante Cheth
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
 * Registers a language handler for Solidity.
 *
 * From https://solidity.readthedocs.io:
 *
 * > Solidity is a contract-oriented, high-level language whose syntax is
 * > similar to that of JavaScript and it is designed to target the Ethereum
 * > Virtual Machine.
 *
 * @author Comandante Cheth
 */


(function() {
  // 8, 16, ..., 256
  var intSizes = '';
  for (var i = 8; i <= 256; i += 8) {
    intSizes += i.toString() + '|';
  }
  intSizes = intSizes.slice(0, -1);
  // 0x8, ..., 0x256, 8x8, ..., 8x248, ..., ..., 248x8
  var fixedSizes = '';
  for (var i = 0; i <= 248; i += 8) {
    for (var j = 8; j <= 256 - i; j += 8) {
      fixedSizes += i.toString() + 'x' + j.toString() + '|';
    }
  }
  fixedSizes = fixedSizes.slice(0, -1);
  var keywords = 'abstract|anonymous|as|assembly|break|case|catch|constant' +
                 '|continue|contract|default|delete|do|else|enum|external' +
                 '|final|for|function|if|import|in|indexed|inline|interface' +
                 '|internal|is|let|library|match|memory|modifier|new|of' +
                 '|payable|pragma|private|public|pure|relocatable|return' +
                 '|returns|static|storage|struct|switch|throw|try|type' +
                 '|typeof|using|view|while';
  var units = 'wei|szabo|finney|ether|seconds|minutes|hours|days|weeks|years';



  PR['registerLangHandler'](
    PR['createSimpleLexer']([], [

      // single line and block comments
      [PR['PR_COMMENT'], /^\/\/.*/],
      [PR['PR_COMMENT'], /^\/\*[\s\S]*?(?:\*\/|$)/],

      // types
      [PR['PR_TYPE'], new RegExp('^u?int(' + intSizes + ')?\\b')],  // int and uint
      [PR['PR_TYPE'], new RegExp('^u?fixed(' + fixedSizes + ')?\\b')],  // fixed and ufixed
      [PR['PR_TYPE'], /^byte(?:s(?:[1-9]|[1-2][0-9]|3[0-2])?)?\b/],  // bytes
      [PR['PR_TYPE'], /^mapping|address|bool|string|var\b/],  // mapping, address, bool, string, var

      // keywords
      [PR['PR_KEYWORD'], new RegExp('^(?:' + keywords + ')\\b')],

      // literals
      [PR['PR_LITERAL'], new RegExp('^(?:0x[a-fA-F0-9_]+|\\d+)(\\s+(?:' + units + '))?')],  // decimal or hex number with optional unit
      [PR['PR_LITERAL'], /^"(?:[^"\\\r\n]|\\.)*"|^'(?:[^'\\\r\n]|\\.)*'/],  // string
      [PR['PR_LITERAL'], /^hex(?:"(?:[a-fA-F0-9_]{2})*"|'(?:[a-fA-F0-9_]{2})*')/],  // hex

      // punctuation and operators
      [PR['PR_PUNCTUATION'], /^\(|\)|\[|\]|\{|\}|\+|\-|\*|\/|\%|\&|\||\!|\~|\>|\<|\=|\?|\:|\^\=|\,/],

      [PR['PR_PLAIN'], /./]
    ]),
    ['sol']
  );
})();
