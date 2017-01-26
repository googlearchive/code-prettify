/**
 * @fileoverview
 * Registers a language handler for SystemVerilog IEEE 1800-2012.
 *
 * Based on the lexical grammar and keywords at
 * http://standards.ieee.org/getieee/1800/download/1800-2012.pdf
 *
 * @author boone.severson@gmail.com
 */

PR['registerLangHandler'](
    PR['createSimpleLexer'](
        [
         // Whitespace
         [PR['PR_PLAIN'], /^[\t\n\r \xA0]+/, null, '\t\n\r \xA0']
        ],
        [
         // numeric literal
         [PR['PR_LITERAL'], /(?:\d+'[hodb][\dxz]+)|(?:[\dxz]+\.[\dxz]+)/i],
         // Block Comments are delimited by /* and */
         // Single-line comments begin with // and extend to the end of the line.
         [PR['PR_COMMENT'], /^(?:\/\/[^\r\n]*|\/\*[\s\S]*?\*\/)/],
         // Types
         [PR['PR_TYPE'], /^(?:shortint|int|int\s+unsigned|int\s+unsigned|longint|byte|bit|logic|reg|integer|time|string|wire|real|shortreal|realtime|chandle|event)(?=[^\w-]|$)/i, null],
         // Keywords from 1800-2012.pdf
         [PR['PR_KEYWORD'], /^(?:accept_on|alias|always|always_comb|always_ff|always_latch|and|assert|assign|assume|automatic|before|begin|bind|bins|binsof|bit|break|buf|bufif0|bufif1|byte|case|casex|casez|cell|chandle|checker|class|clocking|cmos|config|const|constraint|context|continue|cover|covergroup|coverpoint|cross|deassign|default|defparam|design|disable|dist|do|edge|else|end|endcase|endchecker|endclass|endclocking|endconfig|endfunction|endgenerate|endgroup|endinterface|endmodule|endpackage|endprimitive|endprogram|endproperty|endspecify|endsequence|endtable|endtask|enum|event|eventually|expect|export|extends|extern|final|first_match|for|force|foreach|forever|fork|forkjoin|function|generate|genvar|global|highz0|highz1|if|iff|ifnone|ignore_bins|illegal_bins|implements|implies|import|incdir|include|initial|inout|input|inside|instance|int|integer|interconnect|interface|intersect|join|join_any|join_none|large|let|liblist|library|local|localparam|logic|longint|macromodule|matches|medium|modport|module|nand|negedge|nettype|new|nexttime|nmos|nor|noshowcancelled|not|notif0|notif1|null|or|output|package|packed|parameter|pmos|posedge|primitive|priority|program|property|protected|pull0|pull1|pulldown|pullup|pulsestyle_ondetect|pulsestyle_onevent|pure|rand|randc|randcase|randsequence|rcmos|real|realtime|ref|reg|reject_on|release|repeat|restrict|return|rnmos|rpmos|rtran|rtranif0|rtranif1|s_always|s_eventually|s_nexttime|s_until|s_until_with|scalared|sequence|shortint|shortreal|showcancelled|signed|small|soft|solve|specify|specparam|static|string|strong|strong0|strong1|struct|super|supply0|supply1|sync_accept_on|sync_reject_on|table|tagged|task|this|throughout|time|timeprecision|timeunit|tran|tranif0|tranif1|tri|tri0|tri1|triand|trior|trireg|type|typedef|union|unique|unique0|unsigned|until|until_with|untyped|use|uwire|var|vectored|virtual|void|wait|wait_order|wand|weak|weak0|weak1|while|wildcard|wire|with|within|wor|xnor|xor)(?=[^\w-]|$)/i, null],
         // String, character or bit string
         [PR['PR_STRING'], /^(?:[BOX]?"(?:[^\"]|"")*"|'.')/i],
         // Identifier, basic or extended
         [PR['PR_PLAIN'], /^(?:[a-z]\w*|\\[^\\]*\\)/i],
         // Punctuation
         [PR['PR_PUNCTUATION'], /^[^\w\t\n\r \xA0\"\'][^\w\t\n\r \xA0\-\"\']*/]
        ]),
    ['v', 'sv', "svh"]);
