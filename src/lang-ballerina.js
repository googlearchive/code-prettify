/**
 * @license
 * Copyright (c) 2018, WSO2 Inc. (http://www.wso2.org) All Rights Reserved.
 *
 * WSO2 Inc. licenses this file to you under the Apache License,
 * Version 2.0 (the 'License'); you may not use this file except
 * in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * 'AS IS' BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

/**
 * @fileoverview
 * Registers a language handler for Ballerina.
 *
 * To use, include prettify.js and this file in your HTML page.
 * Then put your code in an HTML tag like
 *      <pre class="prettyprint lang-ballerina">(my Ballerina code)</pre>
 *
 * @author arunabherath@gmail.com
 */

PR['registerLangHandler'](
    PR['createSimpleLexer'](
        [
         // Whitespace is made up of spaces, tabs and newline characters.
         [PR['PR_PLAIN'], /^[\t\n\r \xA0]+/, null, '\t\n\r \xA0'],
         
         // Strings are double-quoted can be mutiline
         [PR['PR_STRING'], /^"(?:[^\\"]|\\.)*(?:"|$)/, null, '"'],
        ],
        [
         // Comments begin with // and extend to the end of a line.
         [PR['PR_COMMENT'], /^\/\/[^\r\n]*/],
         [PR['PR_KEYWORD'], /^\b(?:if|else|iterator|try|catch|finally|fork|join|all|some|while|foreach|in|throw|return|returns|break|timeout|transaction|aborted|abort|committed|failed|retries|next|bind|with|lengthof|typeof|enum|import|version|public|private|attach|as|native|documentation|lock|from|on|select|group|by|having|order|where|followed|insert|into|update|delete|set|for|window|query|annotation|const|reply|create|parameter|package|type|typedesc|connector|function|resource|service|action|worker|struct|transformer|endpoint|object)\b/],
         [PR['PR_TYPE'], /^\b(?:boolean|int|float|string|var|any|datatable|table|blob|map|exception|json|xml|xmlns|error|stream|streamlet|aggregation)\b/],
         [PR['PR_CONSTANT'], /^\b(?:true|false)\b/],
         [PR['PR_LITERAL'], /^\b0[xX][\da-f]+\b|\b\d+\.?\d*/],
         [PR['PR_PUNCTUATION'], /^(?:!|%|\+|\-|~|=|=|!|<|>|&|\|)/],
        ]),
    ['ballerina', 'bal']);
