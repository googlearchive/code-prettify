/**
 * @license
 * Copyright (C) 2017 Cody Gray
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
 * Registers a language handler for x86 assembly language
 * supporting both Intel/MASM and AT&T/GAS syntax.
 * 
 * The highlighting focuses on constructs likely to be found in typical code samples.
 * Some of the more esoteric syntax and unique features of the various x86 assemblers
 * are not supported. All constructs are matched without respect to case. Generally,
 * only valid instructions will be highlighted, but there are a few exceptions that
 * have been made for convenience of implementation (see specific notes below).
 * 
 * The authoritative documentation for the registers and instruction mnemonics is
 * the "Intel IA-32 Architecture Software Developer's Manual", available online at:
 *   <https://software.intel.com/en-us/articles/intel-sdm>
 * Documentation for Microsoft's assembler (MASM) is available online at:
 *   <https://msdn.microsoft.com/en-us/library/afzk3475.aspx>
 * Documentation for the GNU assembler 'as' (GAS) is available online at:
 *   <https://sourceware.org/binutils/docs/as/>
 * 
 * The largely obsolete AMD 3DNow! instruction set is not explicitly supported.
 * Other obscure, vendor-specific, and/or newly-released x86 instruction set
 * extensions are also not (yet) supported. All of the common instructions should
 * be here, though, and additions to this file are encouraged if you find that
 * something you need is missing!
 * 
 * To use, include 'prettify.js' and this file in your HTML page.
 * Then, put your code in an HTML tag like:
 *      <pre class="prettyprint lang-x86">...</pre>
 * 
 * @author cody@codygray.com
 */

PR['registerLangHandler'](
   PR['createSimpleLexer']([], [
         // Comments begin with either ';' (Intel/MASM) or '#' (AT&T/GAS),
         // and extend all the way to the end of that line.
         [PR['PR_COMMENT'],      /^[;#].*/],
         
         // String & character literals.
         [PR['PR_STRING'],       /^"[^"\\]*(?:\\.[^"\\]*)*"/],  // double quotation marks
         [PR['PR_STRING'],       /^'[^'\\]*(?:\\.[^'\\]*)*'/],  // single quotation marks
         
         // Instruction mnemonics will be like "names" for attributes.
         // Unfortunately, regular expressions don't help us much here: we have to exhaustively
         // enumerate every possibility. We do, however, use a regex to match AT&T/GAS's suffixes,
         // albeit at the risk of matching some invalid instructions (e.g., outsq, popq, popfdq,
         // fisttpb, etc., as well as those with alternate encodings in Intel vs. AT&T syntax).
         // [Base]
         [PR['PR_ATTRIB_NAME'],  /^\s(?:a(?:a[adms]|d[cd]|nd|rpl)|b(?:ound|s(?:f|r|wap)|t[crs]?)|c(?:all|bw|wde?|dq|l(?:ac|c|d|i|ts?)|flush|m(?:c|p(?:s[bwd]?|xchg(?:486|8b)?)?)|puid)|d(?:a[as]|ec)|e(?:nter|sc)|fatret|hlt|i(?:bts|cebp|n(?:c|s[bwd]?|to?|v(?:d|lpg|pcid))?|ret(?:df?|f|w)?)|i?(?:div|mul)|l(?:a(?:hf|r)|ds|e(?:a(?:ve)?|s)|fs|g(?:dt|s)|[i|l]dt|msw|o(?:adall(?:d|286|386)?|ck|ds[bwd]?|op(?:d|w|n?ed?|n?ew|n?zd?|n?zw)?)|s[ls]|tr)|mov(?:be|s(?:bw?|w|d|x|lq)?|z(?:x|[wb]l))?|n(?:eg|o[pt])|o(?:r|ut(?:s[bwd]?)?)|p(?:ush|op)(?:a[wd]?|f[wd]?)?|r(?:c[lr]|d(?:msr|pmc|shr|tsc)|e(?:p(?:n?e|n?z)?|t[fn]?)|o[lr]|s(?:dc|ldt|m|ts))|s(?:a(?:hf|lc?|r)|cas[bwd]?|gdt|h[lr]d?|[il]dt|m(?:i(?:nt(?:old)?)?|sw)|t(?:a?c|d|i|os[bwds]?|r)|[ub]b|v(?:dc|ldt|ts)|ys(?:call|enter|exit|ret))|test|u(?:d[0-2]|mov)|ver[rw]|w(?:ait|binvd|r(?:ms|sh)r)|x(?:add|bts|chg|latb?|or|save(?:opt)?|rstor))[bwlq]?\b/i],
         // [Base, x86-64]
         [PR['PR_ATTRIB_NAME'],  /^\s(?:c(?:dqe|qo|mp(?:sq|xchg16))|iretq|lodsq|movsxd|p(?:op|ush)fq|rdtscp|s(?:casq|tosq|wapgs))[bwlq]?\b/i],         
         // [Jumps/Branches]
         [PR['PR_ATTRIB_NAME'],  /^\sj(?:mp|[re]?cxz|n?o|n?s|n?e|n?z|n?[ab]e?|n?c|n?le?|n?ge?|p[eo]?|np)\b/i],
         // [Other conditional instructions]
         [PR['PR_ATTRIB_NAME'],  /^\s(?:set|cmov)(?:n?o|n?s|n?e|n?z|n?[ab]e?|n?c|n?le?|n?ge?|p[eo]?|np)[bwlq]?\b/i],
         [PR['PR_ATTRIB_NAME'],  /^\sfcmovn?(?:be?|e|u)\b/i],
         // [x87 FPU]
         [PR['PR_ATTRIB_NAME'],  /^\sf(?:2xm1|a(?:bs|ddp?)|bld|(?:b|dec)stp|c[ho]s|u?com(?:ip?|pp?)?|div(?:p|rp?)?|freep?|i(?:add|comp?|divr?|ld|mul|n(?:cstp|it)|s(?:tp?|ubr?))|ld(?:1|cw|env[wd]?|l(?:2[et]|[gn]2)|pi|z)?|mulp?|n?(?:clex|disi|eni)|n(?:init|op|s(?:ave[wd]?|t(?:cw|env[wd]?|sw)))|p(?:rem1?|a?tan)|r(?:ndint|stor[wd]?)|s(?:ave[wd]?|cale|etpm|in(?:cos)?|qrt|t(?:cw|env[wd]?|p|sw)?|ub(?:p|rp?)?)|tst|wait|x(?:am|ch|tract)|yl2x(?:p1)?)[slqt]?\b/i],
         // [MMX, SSE, SSE2, SSE3, SSSE3, SSE4.1, SSE4.2 -- no 'v' prefix]
         [PR['PR_ATTRIB_NAME'],  /^\s(?:(?:c(?:lflush|vt(?:p(?:[sd]2pi|i2p[sd])|tp[sd]2pi)|rc32)|f(?:isttp|x(?:rstor|save)(?:64)?)|movnt(?:i|s[sd]|q)|p(?:avg[bw]|(?:ext|ins)rw|m(?:(?:ax|in)(?:sw|ub)|ulhuw)|opcnt|s(?:adbw|hufw)|refetch(?:w?(?:t[0-2])?|nta)?))[bwlq]?|(?:f?emms|p(?:ause|movmskb)|m(?:askmovq|o(?:nitor|v(?:dq2q|q2dq))|wait)|[mls]fence))\b/i],
         // [AVX & AVX2 -- 'v' prefix]
         [PR['PR_ATTRIB_NAME'],  /^\sv(?:broadcast(?:s[sd]|[fi]128)|cmp(?:n?eq_[ou][sq]|g[et](?:_oq)?|ng[et](?:_uq)?|l[et]_oq|nl[et]_uq|(?:un)?ord_s|true(?:_us)?|false(?:_os)?)[sp][sd]|(?:extract|insert)[fi]128|gather(?:dq?|q)(?:p[sd]|[dq])|p(?:b(?:lendd|roadcast)|gather[dq]{2}|erm(?:2[fi]128|il(?:(?:m[oz]|td)?2)?p[sd]|d|q|p[sd])|maskmov[dq]|s(?:llv[dq]|r(?:avd|lv[dq])))|m(?:askmovp[sd]|ov(?:ntqq|qq[au]))|testp[sd]|zero(?:all|upper))[bwlq]?\b/i],
         // [SSE, SSE2, SSE3, SSSE3, SSE4.1, SSE4.2, AVX, AVX2, & AES -- optional 'v' prefix]
         [PR['PR_ATTRIB_NAME'],  /^\sv?(?:(?:a(?:es(?:dec(?:last)?|enc(?:last)?|imc|keygenassist)|(?:dd(?:p|s(?:ubp)?)|ndn?p)[sd])|blendv?p[sd]|u?comis[sd]|c(?:mp(?:n?eq|n?l[et]|(?:un)?ord)?[sp][sd]|vt(?:dq2p[sd]|p(?:d2(?:dq|ps)|s2(?:dq|pd))|s(?:d2s[is]|i2s[sd]|s2s[id])|t(?:p[sd]2dq|s[sd]2si)))|d(?:iv[sp]|pp)[sd]|insert(?:ps|q)|extr(?:actps|q)|h(?:add|sub)p[sd]|ld(?:[dq]qu|mxcsr)|m(?:(?:ax|in|ul)[sp][sd]|ov(?:ap[sd]|d(?:dup)?|[hl]p[sd]|s(?:[sd]|[hl]dup)|up[sd]|(?:dq[au]|mskp[sd]|nt(?:dqa?|p[sd])|q))|psadbw)|x?orp[sd]|p(?:a(?:bs[bwd]|ck(?:ss(?:dw|wb)|uswb|usdw)|dd(?:[bwdq]|u?s[bw])|ndn?|vg[bw]|lignr)|blend(?:vb|w)|cmp(?:(?:eq|gt)[bwdq]|[ei]str[im])|(?:ext|ins)r[bwdq]|h(?:(?:add|sub)(?:d|s?w)|minposuw)|m(?:(?:ax|in)(?:sw|ub)|ul(?:hu?w|lw|udq)|a(?:dd(?:ubsw|wd)|x(?:s[bd]|u[wd]))|in(?:s[bd]|u[wd])|ov[sz]x(?:b[wdq]|w[dq]|dq)|ul(?:dq|hrsw|ld))|x?or|s(?:adbw|huf(?:b|d|[hl]w)|ign[bwd]|ll(?:w|dq?|q)|r(?:a[wd]|l(?:w|dq?|q))|ub(?:u?s[bw]|[bwdq]))|test|unpck[hl](?:bw|dq|wd|qdq))|r(?:(?:cp|sqrt)[sp]s|ound[sp][sd])|s(?:hufp[sd]|qrt[sp][sd]|tmxcsr|ub[sp][sd])|unpck[hl]p[sd])[bwlq]?|(?:m(?:askmovdqu|ov(?:hl|lh)ps)|pmovmskb))\b/i],
         // [ABM, BMI1, BMI2, ADX, TSX, CLMUL, & Miscellaneous]
         [PR['PR_ATTRIB_NAME'],  /^\s(?:a(?:d[co]x|ndn)|b(?:extr|ls(?:i|r|msk)|zhi)|mulx|p(?:dep|ext)|r(?:orx|d(?:ran|see)d)|s(?:ar|h[rl])x|x(?:a(?:bort|cquire)|begin|end|test|release)|[lt]zcnt|v?pclmul(?:[lh]q[lh])?qdq)[bwlq]?\b/i],
         // [FMA]
         [PR['PR_ATTRIB_NAME'],  /^\svf(?:(?:m(?:addsub|subadd)[123]{3}p)|(?:n?m(?:add|sub)[123]{3}[ps]))[sd][bwlq]?\b/i],
         
         // Registers will be like the corresponding "values" for attributes.
         [PR['PR_ATTRIB_VALUE'], /^%?\b(?:(?:[ds]i|bp)l|(?:[re]?(?:[ac]x|b[xp]|d[xi]|s[ip]|ip))|(?:(?:a|b|c|d|[bs]p)[lh]+)|(?:[cdefgs]+s)|(?:r(?:[8-9]|1[0-5])[blwd]?)|mm[0-7]|[xy]mm(?:1[0-5]|[0-9])|zmm(?:[1-2][0-9]|3[0-1]|[0-9])|cr[0234]|dr[012367])\b/i],
         // The x87 FPU registers are matched using a separate expression because of the optional parentheses.
         // For some reason, "/^%?\b(?:st\(?[0-7]?\)?)/i" doesn't highlight the trailing parenthesis.
         [PR['PR_ATTRIB_VALUE'], /^%?\b(?:st\(?[0-7]?)\W/i],
         
         // Keywords/directives relating to types are highlighted as types.
         [PR['PR_TYPE'],         /^(?:(?:\bshort)|(?:\b(?:(?:d|sd?|q|f|[xy]?mm)?word|[st]?byte)(?: ptr)?)|(?:\breal(?:4|8|10)\b)|(?:\bd[bwdqft]\b)|\s\.(?:byte|h?word|int|long|quad|octa|[su]leb128|float|double|s(?:hort|ingle|tring(?:8|16)?))|asci[iz])\b/i],
         
         // All other keywords/directives/pseudo-ops are highlighted as "keywords".
         // First, match GAS-style's initial '.', and then match MASM's unadorned syntax.
         [PR['PR_KEYWORD'],      /^\.(?:align|balign[wl]|cfi_(?:window_save|val_encoded_addr|undefined|startproc|signal_frame|sections|same_value|re(?:turn_column|store|member_state|l_offset|gister)|personality|offset|lsda|e(?:scape|ndproc)|adjust_cfa_offset|def_cfa(?:_(?:register|offset))?)|d(?:ata|e(?:f|sc)|im)|e(?:nd(?:m|func|ef)?|q(?:u|uiv)|xitm|xtern)|f(?:il[le]|unc)|g(?:loba?l|nu_attribute)|i(?:dent|n(?:t(?:ernal|el_syntax)|clude))|l(?:li(?:st|ne)|n|oc(?:al|_mark_labels))|(?:(?:no)?alt)?macro|model|org|re(?:loc|pt)|s(?:ection|ize|kip|pace|truct|ubsection)|t(?:ag|ext|itle|ype))\s/i],
         [PR['PR_KEYWORD'],      /^(?:a(?:ddr|li(?:as|gnb?)|ssumes?)|bits|c(?:pu|o(?:m(?:da|pac)|ns)t)|d(?:osseg|up)|e(?:nd(?:m|p|s(?:truc)?)?|qu?|ven|x(?:itm|port|t(?:ern(?:def)?|rn)))|f(?:ar|lat)|g(?:lobal|roup)|huge|%?i(?:mport|n(?:clude(?:lib)?|voke)|struc)|l(?:arge|ength)|m(?:acro|edium)|n(?:ear|pad)|o(?:ffset|ption|rg)|p(?:ro(?:c|to)|data)|rep(?:(?:ea)?t)?|s(?:e(?:ction|g(?:ment)?)|ize(?:of)?|mall|t(?:ruct|dcall))|ti(?:ny|mes)|xdata)|(?:[\._]+(?:text|data|code|bss))\s/i],
         
         // Any remaining text that is followed by a colon is considered to be a label.
         // This is matching is a little bit over-eager, since labels can only be a single token
         // (no spaces), but that's actually OK because it will match GAS-style leading function
         // signatures in compiler-generated output.  Note that we must explicitly ignore comments
         // on a line following a label, especially those with embedded colons, to prevent them from
         // being treated as part of the label. Colons inside of string and character literals are
         // also ignored. The beginning of line anchor ('^') does not seem to do what it is
         // expected to do, so '\b' is used as a workaround, but this means we need to explicitly
         // include any symbols that might be found preceding a label, like '.' and '$'.
         [PR['PR_DECLARATION'],  /^[$._]*\b[^'":;#\r\n]*:/],
         
         // Decimal and hexadecimal integer literals.
         // (Rarely-used octal literals not yet supported.)
         [PR['PR_LITERAL'],      /^(?=\$?)0x[\da-f]+/i], // "0x" prefix
         [PR['PR_LITERAL'],      /^\d[\da-f]*h?/i],      // MASM-style "h" suffix (must start with a decimal digit)
         // In Intel and certain places in AT&T syntax, decimal literals occur with no identifying
         // prefix or suffix (although MASM allows an optional 'd' suffix). These are tricky because
         // they must be matched in just about any context, except when they are embedded within
         // another identifier (like those commonly generated by compilers). This is handled by
         // explicitly detecting such identifers and marking them as "plain text" to exclude them
         // from future matches, and then detecting and highlighting the remaining integer literals.
         [PR['PR_PLAIN'],        /^(?:[a-z_\.]+\d+)|(?:\d+[a-z_\.]+)/i],
         // Also, though we normally don't want to highlight any preceding symbols (like arithmetic
         // operators) as being part of numeric literals, we *do* need to highlight the leading
         // negative sign for negative integer literals.
         // BUG: This matches the negative sign in expressions like "[eax-4]", where the operator
         //      actually denotes subtraction. A simple workaround is to add a space: "[eax - 4]".
         [PR['PR_LITERAL'],      /^(?=\$?)\-?\d+(?=d?)(?![^\s\](),\+\-*])/],
         
         // Finally, highlight significant punctuation: grouping, comma, and arithmetic operators.
         [PR['PR_PUNCTUATION'],  /^[\[\]\(\),+\-*?]/],
      ]),
   ['x86']);
