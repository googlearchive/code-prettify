/**
 * @license
 * Copyright (C) 2015 Chris Morgan
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
 * Registers a language handler for Rust.
 *
 * Derived from prior experience implementing similar things in a few environments,
 * most especially rust.vim.
 *
 * @author me@chrismorgan.info
 */

PR['registerLangHandler'](
    PR['createSimpleLexer']([], [
		// Whitespace
		[PR['PR_PLAIN'],       /^[\t\n\r \xA0]+/],

		// Single line comments
		[PR['PR_COMMENT'], /^\/\/.*/],
		// Block comments (sadly I do not see how to make this cope with comment nesting as it should)
		[PR['PR_COMMENT'], /^\/\*[\s\S]*?(?:\*\/|$)/],//, null],
		// String and character literals
		[PR['PR_STRING'], /^b"(?:[^\\]|\\(?:.|x[\da-fA-F]{2}))*?"/],  // Bytes literal
		[PR['PR_STRING'], /^"(?:[^\\]|\\(?:.|x[\da-fA-F]{2}|u\{\[\da-fA-F]{1,6}\}))*?"/],  // String literal
		[PR['PR_STRING'], /^b?r(#*)\"[\s\S]*?\"\1/],  // Raw string/bytes literal
		[PR['PR_STRING'], /^b'([^\\]|\\(.|x[\da-fA-F]{2}))'/],  // Byte literal
		[PR['PR_STRING'], /^'([^\\]|\\(.|x[\da-fA-F]{2}|u\{[\da-fA-F]{1,6}\}))'/],  // Character literal

		// Lifetime
		[PR['PR_TAG'], /^'\w+?\b/],

		// Keywords, reserved keywords and primitive types
		[PR['PR_KEYWORD'], /^(?:match|if|else|as|break|box|continue|extern|fn|for|in|if|impl|let|loop|pub|return|super|unsafe|where|while|use|mod|trait|struct|enum|type|move|mut|ref|static|const|crate)\b/],
		[PR['PR_KEYWORD'], /^(?:alignof|become|do|offsetof|priv|pure|sizeof|typeof|unsized|yield|abstract|virtual|final|override|macro)\b/],
		[PR['PR_TYPE'], /^(?:[iu](8|16|32|64|128|size)|char|bool|f32|f64|str|Self)\b/],

		// Rust 1.0 prelude items
		[PR['PR_TYPE'], /^(?:Copy|Send|Sized|Sync|Drop|Fn|FnMut|FnOnce|Box|ToOwned|Clone|PartialEq|PartialOrd|Eq|Ord|AsRef|AsMut|Into|From|Default|Iterator|Extend|IntoIterator|DoubleEndedIterator|ExactSizeIterator|Option|Some|None|Result|Ok|Err|SliceConcatExt|String|ToString|Vec)\b/],

		// Literals:
		[PR['PR_LITERAL'], /^(self|true|false|null)\b/],
		// A number is a hex integer literal, a decimal real literal, or in
		// scientific notation.
		// Integer literals: decimal, hexadecimal, octal, binary.
		[PR['PR_LITERAL'], /^\d[0-9_]*(?:[iu](?:size|8|16|32|64|128))?/],
		[PR['PR_LITERAL'], /^0x[a-fA-F0-9_]+(?:[iu](?:size|8|16|32|64|128))?/],
		[PR['PR_LITERAL'], /^0o[0-7_]+(?:[iu](?:size|8|16|32|64|128))?/],
		[PR['PR_LITERAL'], /^0b[01_]+(?:[iu](?:size|8|16|32|64|128))?/],
		// Float literals
		[PR['PR_LITERAL'], /^\d[0-9_]*\.(?![^\s\d.])/],
		[PR['PR_LITERAL'], /^\d[0-9_]*(?:\.\d[0-9_]*)(?:[eE][+-]?[0-9_]+)?(?:f32|f64)?/],
		[PR['PR_LITERAL'], /^\d[0-9_]*(?:\.\d[0-9_]*)?(?:[eE][+-]?[0-9_]+)(?:f32|f64)?/],
		[PR['PR_LITERAL'], /^\d[0-9_]*(?:\.\d[0-9_]*)?(?:[eE][+-]?[0-9_]+)?(?:f32|f64)/],

		// Macro invocations (an identifier plus a !)
		[PR['PR_ATTRIB_NAME'], /^[a-z_]\w*!/i],
		// An identifier (sorry, this should be unicode)
		[PR['PR_PLAIN'], /^[a-z_]\w*/i],
		// Attributes
		[PR['PR_ATTRIB_VALUE'], /^#!?\[[\s\S]*?\]/],
		// All the punctuation
		[PR['PR_PUNCTUATION'], /^[+\-/*=^&|!<>%[\](){}?:.,;]/],
		// Anything else (which is probably illegal, as all the legal stuff should have been covered) can be plain
		[PR['PR_PLAIN'], /./]
		]),
    ['rust']);
