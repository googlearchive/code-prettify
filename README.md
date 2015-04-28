# Javascript code prettifier

An embeddable script that makes source-code snippets in HTML prettier.

[See an example](https://rawgit.com/google/code-prettify/master/examples/quine.html)

## Setup

 * Include the script tag below in your document
```HTML
<script src="https://cdn.rawgit.com/google/code-prettify/master/loader/run_prettify.js"></script>
```
 * See [Getting Started](docs/getting_started.md) to configure that URL with options you need.
 * Look at the [skin gallery](https://cdn.rawgit.com/google/code-prettify/master/styles/index.html) and pick styles that suit you.

## Usage

Put code snippets in `<pre class="prettyprint">...</pre>` or
`<code class="prettyprint">...</code>` and it will automatically be
pretty printed.

```HTML
<pre class="prettyprint">class Voila {
public:
  // Voila
  static const string VOILA = "Voila";

  // will not interfere with embedded <a href="#voila2">tags</a>.
}</pre>
```

## FAQ

### For which languages does it work?

The comments in `prettify.js` are authoritative but the lexer should
work on a number of languages including C and friends, Java, Python,
Bash, SQL, HTML, XML, CSS, Javascript, Makefiles, and Rust.

It works passably on Ruby, PHP, VB, and Awk and a decent subset of
Perl and Ruby, but, because of commenting conventions, doesn't work on
Smalltalk, OCaml, etc. without a language extension.

Other languages are supported via extensions:

[Apollo](https://github.com/google/code-prettify/tree/master/src/lang-apollo.js);
[Basic](https://github.com/google/code-prettify/tree/master/src/lang-basic.js);
[Clojure](https://github.com/google/code-prettify/tree/master/src/lang-clj.js);
[CSS](https://github.com/google/code-prettify/tree/master/src/lang-css.js);
[Dart](https://github.com/google/code-prettify/tree/master/src/lang-dart.js);
[Erlang](https://github.com/google/code-prettify/tree/master/src/lang-erlang.js);
[Go](https://github.com/google/code-prettify/tree/master/src/lang-go.js);
[Haskell](https://github.com/google/code-prettify/tree/master/src/lang-hs.js);
[Lisp, Scheme](https://github.com/google/code-prettify/tree/master/src/lang-lisp.js);
[Llvm](https://github.com/google/code-prettify/tree/master/src/lang-llvm.js);
[Lua](https://github.com/google/code-prettify/tree/master/src/lang-lua.js);
[Matlab](https://github.com/google/code-prettify/tree/master/src/lang-matlab.js);
[MLs:F#, Ocaml,SML](https://github.com/google/code-prettify/tree/master/src/lang-ml.js);
[Mumps](https://github.com/google/code-prettify/tree/master/src/lang-mumps.js);
[Nemerle](https://github.com/google/code-prettify/tree/master/src/lang-n.js);
[Pascal](https://github.com/google/code-prettify/tree/master/src/lang-pascal.js);
[Protocol buffers](https://github.com/google/code-prettify/tree/master/src/lang-proto.js);
[R, S](https://github.com/google/code-prettify/tree/master/src/lang-r.js);
[RD](https://github.com/google/code-prettify/tree/master/src/lang-rd.js);
[Scala](https://github.com/google/code-prettify/tree/master/src/lang-scala.js);
[SQL](https://github.com/google/code-prettify/tree/master/src/lang-sql.js);
[TCL](https://github.com/google/code-prettify/tree/master/src/lang-tcl.js);
[Latek](https://github.com/google/code-prettify/tree/master/src/lang-tex.js);
[Visual Basic](https://github.com/google/code-prettify/tree/master/src/lang-vb.js);
[CHDL](https://github.com/google/code-prettify/tree/master/src/lang-vhdl.js);
[Wiki](https://github.com/google/code-prettify/tree/master/src/lang-wiki.js);
[XQ](https://github.com/google/code-prettify/tree/master/src/lang-xq.js);
[YAML](https://github.com/google/code-prettify/tree/master/src/lang-yaml.js)

If you'd like to add an extension for your favorite language, please
look at `src/lang-lisp.js` and submit a patch.

### How do I specify the language of my code?

You don't need to specify the language since `prettyprint()`
will guess.  You can specify a language by specifying the language extension
along with the `prettyprint` class:

```HTML
<pre class="prettyprint lang-html">
  The lang-* class specifies the language file extensions.
  File extensions supported by default include
    "bsh", "c", "cc", "cpp", "cs", "csh", "cyc", "cv", "htm", "html",
    "java", "js", "m", "mxml", "perl", "pl", "pm", "py", "rb", "sh",
    "xhtml", "xml", "xsl".
</pre>
```

You may also use the
[HTML 5](http://dev.w3.org/html5/spec-author-view/the-code-element.html#the-code-element)
convention of embedding a `code` element inside the `PRE` and using `language-java` style classes.

E.g. `<pre class="prettyprint"><code class="language-java">...</code></pre>`

### It doesn't work on `<obfuscated code sample>`?

Yes.  Prettifying obfuscated code is like putting lipstick on a pig --
i.e. outside the scope of this tool.

### Which browsers does it work with?

It's been tested with IE 6, Firefox 1.5 & 2, and Safari 2.0.4.
Look at [the tests](https://rawgit.com/google/code-prettify/master/tests/prettify_test.html)
to see if it works in your browser.

### What's changed?

See the [change log](https://rawgit.com/google/code-prettify/master/CHANGES.html)

### Why doesn't Prettyprinting of strings work on WordPress?

Apparently wordpress does "smart quoting" which changes close quotes.
This causes end quotes to not match up with open quotes.

This breaks prettifying as well as copying and pasting of code samples.
See [WordPress's help center](http://wordpress.org/support/topic/125038)
for info on how to stop smart quoting of code snippets.

### How do I put line numbers in my code?

You can use the `linenums` class to turn on line
numbering.  If your code doesn't start at line number 1, you can
add a colon and a line number to the end of that class as in
`linenums:52`.

For example

```HTML
<pre class="prettyprint linenums:4"
>// This is line 4.
foo();
bar();
baz();
boo();
far();
faz();
</pre>
```

### How do I prevent a portion of markup from being marked as code?

You can use the `nocode` class to identify a span of markup
that is not code.

```HTML
<pre class=prettyprint>
int x = foo();  /* This is a comment  <span class="nocode">This is not code</span>
  Continuation of comment */
int y = bar();
</pre>
```

For a more complete example see the issue22
[testcase](https://rawgit.com/google/code-prettify/master/tests/prettify_test.html#issue22)

### I get an error message "a is not a function" or "opt_whenDone is not a function"

If you are calling `prettyPrint` via an event handler, wrap it in a function.
Instead of doing

```JavaScript
addEventListener('load', prettyPrint, false);
```

wrap it in a closure like

```JavaScript
addEventListener('load', function (event) { prettyPrint() }, false);
```

so that the browser does not pass an event object to `prettyPrint`
which will confuse it.

### How can I customize the colors and styles of my code?

Prettify adds `<span>` with `class`es describing the kind of code.
You can create CSS styles to matches these classes.

See the [theme gallery](https://cdn.rawgit.com/google/code-prettify/master/styles/index.html) for examples.

### I can't add classes to my code (because it comes from Markdown, etc.)

Instead of ```<pre class="prettyprint ...">``` you can use a comment
or processing instructions that survives processing instructions :
`<?prettify ...?>` works as explained in
[Getting Started](docs/getting_started.md).

### How can I put line numbers on every line instead of just every fifth line?

Prettify puts lines into an HTML list element so that line numbers
aren't caught by copy/paste, and the line numbering is controlled by
CSS in the default stylesheet, "prettify.css".

```HTML
<style>
li.L0, li.L1, li.L2, li.L3,
li.L5, li.L6, li.L7, li.L8
{ list-style-type: decimal !important }
</style>
```

should turn line numbering back on for the other lines.
