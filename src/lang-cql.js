/**
 * @license
 * Copyright (C) 2008 Peter Janssen
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
 * Registers a language handler for CQL.
 *
 *
 * To use, include prettify.js and this file in your HTML page.
 * Then put your code in an HTML tag like
 *      <pre class="prettyprint lang-cql">(my CQL code)</pre>
 *
 * https://docs.datastax.com/en/cql/3.1/cql/cql_reference/cql_lexicon_c.html
 *
 * @author Peter Janssen
 */

PR['registerLangHandler'](
    PR['createSimpleLexer'](
        [
         // Whitespace
         [PR['PR_PLAIN'],       /^[\t\n\r \xA0]+/, null, '\t\n\r \xA0'],
         // A double or single quoted, possibly multi-line, string.
         [PR['PR_STRING'],      /^(?:"(?:[^\"\\]|\\.)*"|'(?:[^\'\\]|\\.)*')/, null,
          '"\'']
        ],
        [
         // A comment is either a line comment that starts with two dashes, or
         // two dashes preceding a long bracketed block.
         [PR['PR_COMMENT'], /^(?:--[^\r\n]*|\/\*[\s\S]*?(?:\*\/|$))/],
         [PR['PR_KEYWORD'], /^(?:ADD|ALL|ALLOW|ALTER|AND|ANY|APPLY|AS|ASC|ASCII|AUTHORIZE|BATCH|BEGIN|BIGINT|BLOB|BOOLEAN|BY|CLUSTERING|COLUMNFAMILY|COMPACT|CONSISTENCY|COUNT|COUNTER|CREATE|CUSTOM|DECIMAL|DELETE|DESC|DISTINCT|DOUBLE|DROP|EACH_QUORUM|EXISTS|FILTERING|FLOAT|FROM|FROZEN|FULL|GRANT|IF|IN|INDEX|INET|INFINITY|INSERT|INT|INTO|KEY|KEYSPACE|KEYSPACES|LEVEL|LIMIT|LIST|LOCAL_ONE|LOCAL_QUORUM|MAP|MODIFY|NAN|NORECURSIVE|NOSUPERUSER|NOT|OF|ON|ONE|ORDER|PASSWORD|PERMISSION|PERMISSIONS|PRIMARY|QUORUM|RENAME|REVOKE|SCHEMA|SELECT|SET|STATIC|STORAGE|SUPERUSER|TABLE|TEXT|TIMESTAMP|TIMEUUID|THREE|TO|TOKEN|TRUNCATE|TTL|TUPLE|TWO|TYPE|UNLOGGED|UPDATE|USE|USER|USERS|USING|UUID|VALUES|VARCHAR|VARINT|WHERE|WITH|WRITETIME)(?=[^\w-]|$)/i, null],
         // A number is a hex integer literal, a decimal real literal, or in
         // scientific notation.
         [PR['PR_LITERAL'],
          /^[+-]?(?:0x[\da-f]+|(?:(?:\.\d+|\d+(?:\.\d*)?)(?:e[+\-]?\d+)?))/i],
         // An identifier
         [PR['PR_PLAIN'], /^[a-z_][\w-]*/i],
         // A run of punctuation
         [PR['PR_PUNCTUATION'], /^[^\w\t\n\r \xA0\"\'][^\w\t\n\r \xA0+\-\"\']*/]
        ]),
    ['cql']);
