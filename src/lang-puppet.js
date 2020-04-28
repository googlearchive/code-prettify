/**
 * @license
 * Copyright (C) 2016 Jorge Morgado
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
 * Registers a language handler for Puppet.
 *
 * @author jorge at morgado dot ch
 */

// Falls back to 'plain text' for stylesheets that don't style opn and clo.
var PR_OPEN  = 'opn pln';
var PR_CLOSE = 'clo pln';

// Falls back to 'attribute name' for stylesheets that don't style fun.
var PR_FUNCTION = 'fun atn';
// Falls back to 'literal' for stylesheets that don't style var.
var PR_VARIABLE = 'var lit';

PR['registerLangHandler'](
    PR['createSimpleLexer'](
        [
          // Open and close
          [PR_OPEN,              /^[\(\{\[]+/, null, '([{'],
          [PR_CLOSE,             /^[\)\}\]]+/, null, ')]}'],

          // A line comment that starts with #
          [PR['PR_COMMENT'],     /^#[^\r\n]*/, null, '#'],
          // Whitespace
          [PR['PR_PLAIN'],       /^[\t\n\r \xA0]+/, null, '\t\n\r \xA0'],
          // A double or a single quoted string
          [PR['PR_STRING'],      /^\"(?:[^\"\\]|\\[\s\S])*(?:\"|$)/, null, '"'],
          [PR['PR_STRING'],      /^\'(?:[^\'\\]|\\[\s\S])*(?:\'|$)/, null, "'"]
        ],
        [
          // Matching keywords
          [PR['PR_KEYWORD'],     /^(?:case|class|default|define|else|elsif|false|if|inherits|node|unless|undef|true)\b/, null],

          // Matching types (first letter can be lower or upper case)
          // Any of the defined words not followed by ( or =.
          [PR['PR_TYPE'],        /^(?:[aA]ugeas|[cC](omputer|cron)|[eE]xec|[fF](ile|ilebucket)|[gG]roup|[hH]ost|[iI]nterface|[kK]5login|[mM](acauthorization|ailalias|aillist|cx|ount))\b(?!\s*[\(|=])/, null],
          [PR['PR_TYPE'],        /^(?:[nN]agios_(command|contact|contactgroup|timeperiod)|[nN]agios_host(|dependency|escalation|textinfo|group)|[nN]agios_service(|dependency|escalation|extinfo|group))\b(?!\s*[\(|=])/, null],
          [PR['PR_TYPE'],        /^(?:[nN]otify|[pP]ackage|[rR](esources|outer)|[sS]chedule(|_task)|[sS]el(boolean|module)|[sS](ervice|sh_authorized_key|shkey|tage)|[tT]idy|[uU]ser|[vV]lan|[yY]umrepo|[zZ](fs|one|pool))\b(?!\s*[\(|=])/, null],

          // Matching $var, or $::var, or ${::var}, or ${::var1::var2}, etc.
          [PR_VARIABLE, /^\$((::)?[a-z]\w*)*((::)?[a-z_]\w*)\b/, null],
          [PR_VARIABLE, /^\$\{(?:[a-zA-Zx7f-xff\$]|::)(?:[a-zA-Z0-9_x7f-xff\$]|::)*\}/, null],

          // Matching functions
          // Any of the defined words not followed by { or =.
          [PR_FUNCTION, /^(?:alert|assert_type|concat|contain|create_resources|crit|debug|defined|digest|each|emerg|epp|err|escape|fail|file|filter|fqdn_rand|generate|gsub|hiera|hiera_array|hiera_hash|hiera_include)\b(?!\s*[{|=])/, null],
          [PR_FUNCTION, /^(?:import|include|info|inline_epp|inline_template|lookup|map|match|md5|notice|realize|reduce|regsubst|require|scanf|search|sha1|shellquote|slice|split|sprintf|tag|tagged|template|versioncmp|warning|with)\b(?!\s*[{|=])/, null],

          // Matching plain
          // A word that ends with =>
          [PR['PR_PLAIN'],       /^-*(?:[a-z_]|\\[\x21-\x7e])(?:[\w-]*|\\[\x21-\x7e])\s*(=>)/i],

          // A printable non-space non-special character
          [PR['PR_PUNCTUATION'], /^[^\w\t\n\r \xA0()\"\\\';]+/, null]
        ]),
    ['puppet']);
