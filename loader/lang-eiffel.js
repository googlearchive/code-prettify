/*
 * Copyright (C) 2018-2019 Alexander Kogtenkov
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
PR.registerLangHandler(PR.createSimpleLexer([["pln",/^\s+/,null,' \r\n\t\xA0'],["str",/^(?:'''|'[^']+')/,null,"'"],["str",/^"(?:(?:%[ \t\v]*[\r\n]\s*%|%"|[^"\r\n])*|\[(?=\s*[\r\n])[\s\S]*[\r\n]\s*\]|\{(?=\s*[\r\n])[\s\S]*[\r\n]\s*\})"/,null,'"'],["lit",/^0[bcx][a-f\d](?:[_a-f\d]*[a-f\d])?|(?:\d(?:[_\d]*\d)?(?:\.(?:\d(?:[_\d]*\d)?)?(?:e[-+]?\d+)?)?)/i,null,'0123456789']],[["com",/^--[^\r\n]*/],["kwd",/^\b(?:across|agent|alias|all|and|as|assign|attached|attribute|check|class|convert|create|debug|deferred|detachable|do|else|elseif|end|ensure|expanded|export|external|feature|from|frozen|if|implies|inherit|inspect|invariant|like|local|loop|not|note|obsolete|old|once|only|or|redefine|rename|require|rescue|retry|select|separate|some|then|undefine|until|variant|when|xor)\b/i],["kwd",/^\b(?:Current|Precursor|Result)\b/i],["lit",/^\b(?:False|True|Void)\b/i],["typ",/^[A-Z][_A-Z\d]*/],["lit",/^\.\d(?:[_\d]*\d)?(?:e[-+]?\d+)?/i],["pln",/^[a-z]\w*/iu],["pun",/^[^\s\w]+/]]),['eiffel','e']);
