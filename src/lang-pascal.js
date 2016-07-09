/**
 * @license
 * Copyright (C) 2013 Peter Kofler
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

// Contributed by peter dot kofler at code minus cop dot org

/**
 * @fileoverview
 * Registers a language handler for (Turbo) Pascal.
 *
 * To use, include prettify.js and this file in your HTML page.
 * Then put your code in an HTML tag like
 *      <pre class="prettyprint lang-pascal">(my Pascal code)</pre>
 *
 * @author peter dot kofler at code minus cop dot org
 */

PR.registerLangHandler(
    PR.createSimpleLexer(
        [ // shortcutStylePatterns
          // 'single-line-string'
          [PR.PR_STRING,        /^(?:\'(?:[^\\\'\r\n]|\\.)*(?:\'|$))/, null, '\''],
          // Whitespace
          [PR.PR_PLAIN,         /^\s+/, null, ' \r\n\t\xA0']
        ],
        [ // fallthroughStylePatterns
          // A cStyleComments comment (* *) or {} or // to eoln
          [PR.PR_COMMENT,       /^(?:\/\/[^\r\n]*|^\(\*[\s\S]*?(?:\*\)|$)|^\{[\s\S]*?(?:\}|$)/, null],
          [PR.PR_KEYWORD,       /^(?:ABSOLUTE|ABSTRACT|AND|ARRAY|AS|ASM|ASSEMBLER|AUTOMATED|BEGIN|CASE|CDECL|CLASS|CONST|CONSTRUCTOR|DEFAULT|DELAYED|DEPRECATED|DESTRUCTOR|DISPID|DISPINTERFACE|DIV|DO|DOWNTO|DYNAMIC|ELSE|END|EXCEPT|EXPERIMENTAL|EXPORT|EXPORTS|EXTERNAL|FILE|FINAL|FINALIZATION|FINALLY|FOR|FORWARD|FUNCTION|HELPER|GOTO|IF|IMPLEMENTATION|IMPLEMENTS|IN|INDEX|INHERITED|INITIALIZATION|INLINE|INTERFACE|IS|INTERRUPT|LABEL|LIBRARY|MESSAGE|MOD|NIL|NODEFAULT|NOT|OBJECT|OF|OPERATOR|OR|OUT|OVERLOAD|OVERRIDE|PACKED|PASCAL|PLATFORM|PRIVATE|PROCEDURE|PROGRAM|PROPERTY|PROTECTED|PUBLIC|PUBLISHED|RAISE|READ|READONLY|RECORD|REFERENCE|REGISTER|REINTRODUCE|REPEAT|RESOURCESTRING|SAFECALL|SEALED|SET|SHL|SHR|STATIC|STDCALL|STRICT|STRING|STORED|THEN|THREADVAR|TO|TRY|TYPE|UNIT|UNSAFE|UNTIL|USES|VAR|VARARGS|VIRTUAL|WHILE|WINAPI|WITH|WRITE|WRITEONLY|XOR)\b/i, null],
          [PR.PR_LITERAL,       /^(?:true|false|self|nil)/i, null],
          [PR.PR_PLAIN,         /^[a-z][a-z0-9]*/i, null],
          // Literals .0, 0, 0.0 0E13
          [PR.PR_LITERAL,       /^(?:\$[a-f0-9]+|(?:\d+(?:\.\d*)?|\.\d+)(?:e[+\-]?\d+)?)/i,  null, '0123456789'],
          [PR.PR_PUNCTUATION,   /^.[^\s\w\.$@\'\/]*/, null]
        ]),
    ['pascal']);
