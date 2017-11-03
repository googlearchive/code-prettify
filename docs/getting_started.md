# Getting Started

You can load the Prettify script to highlight code in your web pages.

It adds styles to code snippets so that token boundaries stand out and your
readers can get the gist of your code without having to mentally perform a
left-to-right parse.

## Marking code sections

The prettyprinter looks for `<pre>`, `<code>`, or `<xmp>` elements with the
*prettyprint* class, and adds `<span>`s to colorize keywords, strings,
comments, and other token types.

```HTML
<pre class="prettyprint">
source code here
</pre>
```

If you're using Markdown or some other HTML generator that does not add
classes, you can alternatively ask the prettifier to target your code by
preceding it with a processing instruction thus:

```HTML
<?prettify?>
<pre class="prettyprint">
code here
</pre>
```

[Larger example](https://rawgit.com/google/code-prettify/master/examples/quine.html)

## Auto-Loader

You can load the JavaScript and CSS for prettify via one URL:

```HTML
<script src="https://cdn.rawgit.com/google/code-prettify/master/loader/run_prettify.js"></script>
```

This will load the entire system and schedule the prettifier to run on page
load.  There are a variety of additional options you can specify (as CGI
arguments) to configure the runner.

| CGI parameter         | default | meaning                        |
| --------------------- | ------- | ------------------------------ |
| autorun=(true, false) | true    | run automatically on page load |
| lang=...              | none    | Loads the language handler for the given language which is usually the file extension for source files for that language.  See the [index of language handlers](../src).  If specified multiple times (`?lang=css&lang=ml`) then all are loaded. |
| skin=...              | none    | See the [skin gallery](https://cdn.rawgit.com/google/code-prettify/master/styles/index.html).  If specified multiple times, the first one to successfully load is used. |
| callback=js_ident     |         | `window.exports["js_ident"]` will be called when prettyprinting finishes.  If specified multiple times, all are called. |

For example:

```HTML
<script src="https://cdn.rawgit.com/google/code-prettify/master/loader/run_prettify.js?lang=css&amp;skin=sunburst"></script>
```

The above specifies the `lang` parameter to also load the CSS language
extension and the `skin` parameter to load the
[*sunburst*](https://cdn.rawgit.com/google/code-prettify/master/styles/index.html#sunburst)
skin.

## Serving your own JS & CSS

You can
[download](https://github.com/google/code-prettify/raw/master/distrib/prettify-small.zip)
the scripts and styles and serve them yourself.  Make sure to include both the
script and a stylesheet:

```HTML
<link rel="stylesheet" type="text/css" href="prettify.css">
<script type="text/javascript" src="prettify.js"></script>
```

Then run the `PR.prettyPrint()` function once your page has finished loading.
One way to do this is via the `onload` handler thus:

```HTML
<body onload="PR.prettyPrint()">
```

## Styling

The prettifier only adds `class`es; it does not specify exact colors or fonts,
so you can swap in a different stylesheet to change the way code is
prettified.

The easiest way to create your own stylesheet is by starting with one from the
[style gallery](https://cdn.rawgit.com/google/code-prettify/master/styles/index.html)
and tweaking it.

You can use CSS `@media` rules to specify styles that work well with printers
(for example, dark text on a white background) when someone tries to print it.

## Language Hints

Prettify makes a best effort to guess the language but works best with C-like
and HTML-like languages.  For others, there are special language handlers that
are chosen based on language hints.

For example, set the `lang-scm` hint to specify that the code is Scheme code:

```HTML
<pre class="prettyprint lang-scm">(friends 'of '(parentheses))</pre>
```

It can also be specified as:

```HTML
<?prettify lang=scm?>
<pre>(friends 'of '(parentheses))</pre>
```

## Line Numbering

```HTML
<pre class="prettyprint linenums">
Many
lines
of
code
</pre>
```

The `linenums` class in the above code tells the prettyprinter to insert an
`<ol>` element and `<li>` elements around each line so that you get line
numbers.

Most stylesheets then hide the line numbers except for every fifth line.

The class `linenums:40` makes line numbering start at line 40 if you're
excerpting a larger chunk of code.  The following also works:

```HTML
<?prettify linenums=40?>
<pre>lots of code</pre>
```
