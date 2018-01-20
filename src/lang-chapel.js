/**
 * @license
 * Copyright (C) 2008 Google Inc.
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
 * Register a language handler for Chapel.
 *
 * https://github.com/chapel-lang/chapel/tree/master/highlight used to get the knowledge about Chapel highlighting tools .
 * https://github.com/chapel-lang/chapel-tmbundle/blob/master/Syntaxes/Chapel.tmLanguage#L60-L83 as the bases for keywords and literals
 *
 * @author suryapriy1997@gmail.com
 */

PR['registerLangHandler'](
    PR['createSimpleLexer'](
        [
		    // Whitespace 
            [PR['PR_PLAIN'], /^[\t\n\r \xA0]+/, null, '\t\n\r \xA0'],
			// punctuation - symbols present 
            [PR['PR_PUNCTUATION'], /^[.!%&()*+,\-;<=>?\[\\\]^{|}:]+/, null, '.!%&()*+,-;<=>?[\\]^{|}:']
        ],
		
        [
         [PR['PR_KEYWORD'],     
	            /^(?:align|as|atomic|begin|break|by|catch|class|cobegin|coforall|continue|delete|dmapped|do|else|enum|except|export|extern|for|forall|if|index|inline|in|iter|label|lambda|let|local|module|new|noinit|on|only|otherwise|pragma|private|proc|prototype|public|record|reduce|require|return|scan|select|serial|then|throw|throws|try|union|use|var|when|where|while|with|yield|zip|bool|real|int|uint|imag|complex|dmap|domain|string|range|sync|tuple|config|const|param|private|public|sparse|single|type|enum)\b/, null],	 
            [PR['PR_LITERAL'], 
			             /^(?:true|false|null)\b/],
            // literals
            [PR['PR_LITERAL'],
                     			/^(0[xX][0-9a-fA-F_]+L?|0[bB][0-1]+L?|[0-9_.]+([eE]-?[0-9]+)?[fFL]?)/],
            [PR['PR_TYPE'], 
			                    /^(\b[A-Z]+[a-z][a-zA-Z0-9_$@]*|`.*`)/, null],
            //double slash comments
            [PR['PR_COMMENT'],
                        			/^\/\/.*/],
            //slash star comments and documentation
            [PR['PR_COMMENT'],
                     			/^\/\*[\s\S]*?(?:\*\/|$)/],
            // char
            [PR['PR_STRING'],
                     			/'.'/],
            // string
            [PR['PR_STRING'], 
			                   /^"([^"\\]|\\[\s\S])*"/],
            // multiline string
            [PR['PR_STRING'], 
			                     /^"{3}[\s\S]*?[^\\]"{3}/],
            // annotation (and label)
            [PR['PR_LITERAL'], 
			                    /^@([a-zA-Z0-9_$@]*|`.*`)/],
            // label definition
            [PR['PR_LITERAL'], 
			                    /^[a-zA-Z0-9_]+@/]
        ]),
		['chapel']);
