/**
 * @license
 * Copyright (C) 2020 wmin0@hotmail.com
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
 * Registers a language handler for Verilog.
 *
 * Based on the lexical grammar and keywords at
 * https://www.verilog.com/VerilogBNF.html#REF170
 *
 * @author wmin0@hotmail.com
 */
PR['registerLangHandler'](
    PR['createSimpleLexer'](
        [
            [PR['PR_PLAIN'], /^[\t\n\r \xA0]+/, null, '\t\n\r \xA0'],
            [PR['PR_PUNCTUATION'], /^[.!%&()*+,\-;<=>?\[\\\]^{|}:@#]+/, null, '.!%&()*+,-;<=>?[\\]^{|}:@#']
        ],
        [
            [PR['PR_KEYWORD'], /^(?:\$hold|\$period|\$recovery|\$setup|\$setuphold\$skew|\$width|always|assign|begin|case|casex|casez|default|defparam|disable|else|end|endcase|endfunction|endmodule|endprimitive|endspecify|endtable|endtask|for|force|forever|fork|function|if|initial|join|macromodule|module|negedge|parameter|posedge|primitive|release|repeat|specify|specparam|table|task|wait|while)(?=[^\w-]|$)/i],
            [PR['PR_TYPE'], /^(?:and|buf|bufif0|bufif1|cmos|event|inout|input|integer|nand|nmos|nor|not|notif0|notif1|or|output|pmos|pulldown|pullup|rcmos|real|reg|rnmos|rpmos|rtran|rtranif0|rtranif1|scalared|supply0|supply1|time|tran|tranif0|tranif1|tri|tri0|tri1|triand|trior|trireg|vectored|wand|wire|wor|xnor|xor)(?=[^\w-]|$)/i],
            [PR['PR_TAG'], /^(?:highz0|highz1|large|medium|pull0|pull1|small|strong0|strong1|supply0|supply1|weak0|weak1)(?=[^\w-]|$)/i],
            // number
            [PR['PR_LITERAL'], /^(?:[0-9][0-9_]*(?:\.[0-9_]+)?(?:e[0-9_]+)?)|(?:(?:[0-9][0-9_]*)?'[bodh][0-9a-fA-FxXzZ?]+)/i],
            // edge
            [PR['PR_LITERAL'], /^(?:01|0x|10|1x|x0|x1)(?=[^\w-]|$)/i],
            // string
            [PR['PR_STRING'], /^"([^"\\]|\\[\s\S])*"/],
            // double slash comments
            [PR['PR_COMMENT'], /^\/\/.*/],
            // slash star comments and documentation
            [PR['PR_COMMENT'], /^\/\*[\s\S]*?(?:\*\/|$)/]
        ]),
    ['verilog', 'v']);
