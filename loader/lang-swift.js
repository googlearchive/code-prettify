/*

 Copyright (C) 2015 Google Inc.
 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

 http://www.apache.org/licenses/LICENSE-2.0
 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/
var a=null;
PR.registerLangHandler(PR.createSimpleLexer([["pln",/^[\0\t-\r ]+/,a," \n\r\t\u000b\u000c\0"],["str",/^"(?:[^"\\]|\\.|\\\((?:[^")\\]|\\.)*\))*"/,a,'"']],[["lit",/^(?:0x[\dA-Fa-f][\dA-F_a-f]*\.[\dA-Fa-f][\dA-F_a-f]*[Pp]?|\d[\d_]*\.\d[\d_]*[Ee]?)[+-]?\d[\d_]*/,a],["lit",/^-?(?:0(?:b[01][01_]*|o[0-7][0-7_]*|x[\dA-Fa-f][\dA-F_a-f]*)|\d[\d_]*)/,a],["lit",/^(?:true|false|nil)\b/,a],["kwd",/^\b(?:__COLUMN__|__FILE__|__FUNCTION__|__LINE__|#available|#else|#elseif|#endif|#if|#line|arch|arm|arm64|associativity|as|break|case|catch|class|continue|convenience|default|defer|deinit|didSet|do|dynamic|dynamicType|else|enum|fallthrough|final|for|func|get|import|indirect|infix|init|inout|internal|i386|if|in|iOS|iOSApplicationExtension|is|lazy|left|let|mutating|none|nonmutating|operator|optional|OSX|OSXApplicationExtension|override|postfix|precedence|prefix|private|protocol|Protocol|public|required|rethrows|return|right|safe|self|set|static|struct|subscript|super|switch|throw|try|Type|typealias|unowned|unsafe|var|weak|watchOS|while|willSet|x86_64)\b/,a],
["com",/^\/\/.*?[\n\r]/,a],["com",/^\/\*[\S\s]*?(?:\*\/|$)/,a],["pun",/^<<=|<=|<<|>>=|>=|>>|===|==|\.\.\.|&&=|\.\.<|!==|!=|&=|~=|[#(),.:;@[\]{}~]|\|\|=|\?\?|\|\||&&|&\*|&\+|&-|&=|\+=|-=|\/=|\*=|\^=|%=|\|=|->|`|==|\+\+|--|[!%&*+/<-?^_|-]/,a],["typ",/^\b(?:[@_]?[A-Z]+[a-z][\w$@]*|\w+_t\b)/,a]]),["swift"]);
