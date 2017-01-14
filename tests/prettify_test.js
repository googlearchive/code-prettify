/**
 * maps ids of rewritten code to the expected output.
 * For brevity, <span class="foo"> has been changed to `FOO
 * and < /span> has been changed to `END.
 */
var goldens = {
  bash: (
    '`COM#!/bin/bash`END`PLN\n' +
    '\n' +
    '`END`COM# Fibonacci numbers`END`PLN\n' +
    '`END`COM# Writes an infinite series to stdout, one entry per line`END' +
      '`PLN\n' +
    '`END`KWDfunction`END`PLN fib`END`PUN()`END`PLN `END`PUN{`END`PLN\n' +
    '  `END`KWDlocal`END`PLN a`END`PUN=`END`LIT1`END`PLN\n' +
    '  `END`KWDlocal`END`PLN b`END`PUN=`END`LIT1`END`PLN\n' +
    '  `END`KWDwhile`END`PLN `END`KWDtrue`END`PLN `END`PUN;`END' +
      '`PLN `END`KWDdo`END`PLN\n' +
    '    echo $a\n' +
    '    `END`KWDlocal`END`PLN tmp`END`PUN=`END`PLN$a\n' +
    '    a`END`PUN=`END`PLN$`END`PUN((`END`PLN $a `END`PUN+`END' +
      '`PLN $b `END`PUN))`END`PLN\n' +
    '    b`END`PUN=`END`PLN$tmp\n' +
    '  `END`KWDdone`END`PLN\n' +
    '`END`PUN}`END`PLN\n' +
    '\n' +
    '`END`COM# output the 10th element of the series and halt`END`PLN\n' +
    'fib `END`PUN|`END`PLN head `END`PUN-`END`LIT10`END`PLN `END`PUN|`END' +
      '`PLN tail `END`PUN-`END`LIT1`END'
  ),
  bash_lang: (
    '<ol class="linenums">`#`COM#!/bin/bash`END' +
    '`#1`PLN&nbsp;`END' +
    '`#2`COM# Fibonacci numbers`END' +
    '`#3`COM# Writes an infinite series to stdout, one entry per line`END' +
    '`#4`KWDfunction`END`PLN fib`END`PUN()`END`PLN `END`PUN{`END' +
    '`#5`PLN  `END`KWDlocal`END`PLN a`END`PUN=`END`LIT1`END' +
    '`#6`PLN  `END`KWDlocal`END`PLN b`END`PUN=`END`LIT1`END' +
    '`#7`PLN  `END`KWDwhile`END`PLN true `END`PUN;`END' +
      '`PLN `END`KWDdo`END' +
    '`#8`PLN    echo $a`END' +
    '`#9`PLN    `END`KWDlocal`END`PLN tmp`END`PUN=`END`PLN$a`END' +
      '`#0`PLN    a`END`PUN=`END`PLN$`END`PUN((`END`PLN $a `END`PUN+`END' +
      '`PLN $b `END`PUN))`END' +
    '`#1`PLN    b`END`PUN=`END`PLN$tmp`END' +
    '`#2`PLN  `END`KWDdone`END' +
    '`#3`PUN}`END' +
    '`#4`PLN&nbsp;`END' +
    '`#5`COM# output the 10th element of the series and halt`END' +
    '`#6`PLNfib `END`PUN|`END`PLN `END`PUN/`END`PLNusr`END`PUN/`END`PLNbin`END' +
      '`PUN/*`END`PLNhead `END`PUN-`END`LIT10`END`PLN `END`PUN|`END' +
      '`PLN tail `END`PUN-`END`LIT1`END</li></ol>'
  ),
  issue_165: (
    '`COM# Comment`END`PLN\n' +
    '`END`KWDlocal`END`PLN $x `END`PUN=`END`PLN $`END`PUN{#`END`PLNx`END`PUN[@]}`END`PLN  `END' +
      '`COM# Previous is not a comment`END`PLN\n' +
    '`END`COM# A comment`END'
  ),
  c: (
    '`COM#include`END`PLN `END`STR&lt;stdio.h&gt;`END`PLN\n' +
    '\n' +
    '`END`COM/* the n-th fibonacci number.\n' +
    ' *\/`END`PLN\n' +
    '`END`KWDunsigned`END`PLN `END`KWDint`END`PLN fib`END`PUN(`END' +
      '`KWDunsigned`END`PLN `END`KWDint`END`PLN n`END`PUN)`END`PLN `END' +
      '`PUN{`END`PLN\n' +
    '  `END`KWDunsigned`END`PLN `END`KWDint`END`PLN a `END`PUN=`END' +
      '`PLN `END`LIT1`END`PUN,`END`PLN b `END`PUN=`END`PLN `END`LIT1`END' +
      '`PUN;`END`PLN\n' +
    '  `END`KWDunsigned`END`PLN `END`KWDint`END`PLN tmp`END`PUN;`END' +
      '`PLN\n' +
    '  `END`KWDwhile`END`PLN `END`PUN(--`END`PLNn `END`PUN&gt;=`END' +
      '`PLN `END`LIT0`END`PUN)`END`PLN `END`PUN{`END`PLN\n' +
    '    tmp `END`PUN=`END`PLN a`END`PUN;`END`PLN\n' +
    '    a `END`PUN+=`END`PLN b`END`PUN;`END`PLN\n' +
    '    b `END`PUN=`END`PLN tmp`END`PUN;`END`PLN\n' +
    '  `END`PUN}`END`PLN\n' +
    '  `END`KWDreturn`END`PLN a`END`PUN;`END`PLN\n' +
    '`END`PUN}`END`PLN\n' +
    '\n' +
    'main`END`PUN()`END`PLN `END`PUN{`END`PLN\n' +
    '  printf`END`PUN(`END`STR"%u"`END`PUN,`END`PLN fib`END`PUN(`END' +
      '`LIT10`END`PUN));`END`PLN\n' +
    '`END`PUN}`END'
  ),
  c_lang: (
    '`COM#include`END`PLN `END`STR&lt;stdio.h&gt;`END`PLN\n' +
    '\n' +
    '`END`COM/* the n`END<sup>`COMth`END<\/sup>`COM fibonacci number. *\/`END`PLN\n' +
    '`END`TYPuint32`END`PLN fib`END`PUN(`END' +
      '`KWDunsigned`END`PLN `END`TYPint`END`PLN n`END`PUN)`END`PLN `END' +
      '`PUN{`END`PLN\n' +
    '  `END`TYPuint32`END`PLN a `END`PUN=`END`PLN `END`LIT1`END`PUN,`END' +
      '`PLN b `END`PUN=`END`PLN `END`LIT1`END`PUN;`END`PLN\n' +
    '  `END`TYPuint32`END`PLN tmp`END`PUN;`END`PLN\n' +
    '  `END`KWDwhile`END`PLN `END`PUN(--`END`PLNn `END`PUN&gt;=`END' +
      '`PLN `END`LIT0`END`PUN)`END`PLN `END`PUN{`END`PLN\n' +
    '    tmp `END`PUN=`END`PLN a`END`PUN;`END`PLN\n' +
    '    a `END`PUN+=`END`PLN b`END`PUN;`END`PLN\n' +
    '    b `END`PUN=`END`PLN tmp`END`PUN;`END`PLN\n' +
    '  `END`PUN}`END`PLN\n' +
    '  `END`KWDreturn`END`PLN a`END`PUN;`END`PLN\n' +
    '`END`PUN}`END`PLN\n' +
    '\n' +
    '`END`KWDvoid`END`PLN main`END`PUN()`END`PLN `END`PUN{`END`PLN\n' +
    '  `END`TYPsize_t`END`PLN size `END`PUN=`END`PLN `END`KWDsizeof`END' +
      '`PUN(`END`TYPwchar_t`END`PUN);`END`PLN\n' +
    '  ASSERT_EQ`END`PUN(`END`PLNsize`END`PUN,`END`PLN `END`LIT1`END' +
      '`PUN);`END`PLN\n' +
    '  printf`END`PUN(`END`STR"%u"`END`PUN,`END`PLN fib`END`PUN(`END' +
      '`LIT10`END`PUN));`END`PLN\n' +
    '`END`PUN}`END`PLN\n' +
    '\n' +
    '`END`COM#define`END`PLN ZERO `END`LIT0`END`PLN `END`COM/* a\n' +
    '  multiline comment *\/`END'
  ),
  cpp: (
    '`COM#include`END`PLN `END`STR&lt;iostream&gt;`END`PLN\n' +
    '\n' +
    '`END`KWDusing`END`PLN `END`KWDnamespace`END`PLN std`END`PUN;`END' +
      '`PLN\n' +
    '\n' +
    '`END`COM//! fibonacci numbers with gratuitous use of templates.`END' +
      '`PLN\n' +
    '`END`COM//! \\param n an index into the fibonacci series`END`PLN\n' +
    '`END`COM//! \\param fib0 element 0 of the series`END`PLN\n' +
    '`END`COM//! \\return the nth element of the fibonacci series`END' +
      '`PLN\n' +
    '`END`KWDtemplate`END`PLN `END`PUN&lt;`END`KWDclass`END`PLN T`END' +
      '`PUN&gt;`END`PLN\n' +
    'T fib`END`PUN(`END`KWDunsigned`END`PLN `END`KWDint`END`PLN n`END' +
      '`PUN,`END`PLN `END`KWDconst`END`PLN T`END`PUN&amp;`END`PLN fib0' +
      '`END`PUN)`END`PLN `END`PUN{`END`PLN\n' +
    '  T a`END`PUN(`END`PLNfib0`END`PUN),`END`PLN b`END`PUN(`END' +
      '`PLNfib0`END`PUN);`END`PLN\n' +
    '  `END`KWDfor`END`PLN `END`PUN(;`END`PLN n`END`PUN;`END' +
      '`PLN `END`PUN--`END`PLNn`END`PUN)`END`PLN `END`PUN{`END`PLN\n' +
    '    T tmp`END`PUN(`END`PLNa`END`PUN);`END`PLN\n' +
    '    a `END`PUN+=`END`PLN b`END`PUN;`END`PLN\n' +
    '    b `END`PUN=`END`PLN tmp`END`PUN;`END`PLN\n' +
    '  `END`PUN}`END`PLN\n' +
    '  `END`KWDreturn`END`PLN a`END`PUN;`END`PLN\n' +
    '`END`PUN}`END`PLN\n' +
    '\n' +
    '`END`KWDint`END`PLN main`END`PUN(`END`KWDint`END`PLN argc`END' +
      '`PUN,`END`PLN `END`KWDchar`END`PLN `END`PUN**`END`PLNargv`END' +
      '`PUN)`END`PLN `END`PUN{`END`PLN\n' +
    '  cout `END`PUN&lt;&lt;`END`PLN fib`END`PUN(`END`LIT10`END' +
      '`PUN,`END`PLN `END`LIT1U`END`PUN);`END`PLN\n' +
    '`END`PUN}`END'
  ),
  cpp_lang: (
    '`COM#include`END`PLN `END`STR&lt;iostream&gt;`END`PLN\n' +
    '\n' +
    '`END`KWDusing`END`PLN `END`KWDnamespace`END`PLN std`END`PUN;`END' +
      '`PLN\n' +
    '\n' +
    '`END`COM//! fibonacci numbers with gratuitous use of templates.`END' +
      '`PLN\n' +
    '`END`COM//! \\param n an index into the fibonacci series`END`PLN\n' +
    '`END`COM//! \\param fib0 element 0 of the series`END`PLN\n' +
    '`END`COM//! \\return the nth element of the fibonacci series`END' +
      '`PLN\n' +
    '`END`KWDtemplate`END`PLN `END`PUN&lt;`END`KWDclass`END`PLN T`END' +
      '`PUN&gt;`END`PLN\n' +
    'T fib`END`PUN(`END`TYPint`END`PLN n`END' +
      '`PUN,`END`PLN `END`KWDconst`END`PLN T`END`PUN&amp;`END`PLN fib0' +
      '`END`PUN)`END`PLN `END`PUN{`END`PLN\n' +
    '  T a`END`PUN(`END`PLNfib0`END`PUN),`END`PLN b`END`PUN(`END' +
      '`PLNfib0`END`PUN);`END`PLN\n' +
    '  `END`KWDwhile`END`PLN `END`PUN(--`END`PLNn `END`PUN&gt;=`END' +
      '`PLN `END`LIT0`END`PUN)`END`PLN `END`PUN{`END`PLN\n' +
    '    T tmp`END`PUN(`END`PLNa`END`PUN);`END`PLN\n' +
    '    a `END`PUN+=`END`PLN b`END`PUN;`END`PLN\n' +
    '    b `END`PUN=`END`PLN tmp`END`PUN;`END`PLN\n' +
    '  `END`PUN}`END`PLN\n' +
    '  `END`KWDreturn`END`PLN a`END`PUN;`END`PLN\n' +
    '`END`PUN}`END`PLN\n' +
    '\n' +
    '`END`TYPint`END`PLN main`END`PUN(`END`TYPint`END`PLN argc`END' +
      '`PUN,`END`PLN `END`KWDchar`END`PLN `END`PUN**`END`PLNargv`END' +
      '`PUN)`END`PLN `END`PUN{`END`PLN\n' +
    '  cout `END`PUN&lt;&lt;`END`PLN fib`END`PUN(`END`LIT10`END' +
      '`PUN,`END`PLN `END`LIT1U`END`PUN);`END`PLN\n' +
    '`END`PUN}`END'
  ),
  java: (
    '`KWDpackage`END`PLN foo`END`PUN;`END`PLN\n' +
    '\n' +
    '`END`KWDimport`END`PLN java`END`PUN.`END`PLNutil`END`PUN.`END' +
      '`TYPIterator`END`PUN;`END`PLN\n' +
    '\n' +
    '`END`COM/**\n' +
    ' * the fibonacci series implemented as an Iterable.\n' +
    ' *\/`END`PLN\n' +
    '`END`KWDpublic`END`PLN `END`KWDfinal`END`PLN `END`KWDclass`END' +
      '`PLN `END`TYPFibonacci`END`PLN `END`KWDimplements`END`PLN `END' +
      '`TYPIterable`END`PUN&lt;`END`TYPInteger`END`PUN&gt;`END`PLN `END`' +
      'PUN{`END`PLN\n' +
    '  `END' +
      '`COM/** the next and previous members of the series. *\/`END' +
      '`PLN\n' +
    '  `END`KWDprivate`END`PLN `END`KWDint`END`PLN a `END`PUN=`END' +
      '`PLN `END`LIT1`END`PUN,`END`PLN b `END`PUN=`END`PLN `END`LIT1`END' +
      '`PUN;`END`PLN\n' +
    '\n' +
    '  `END`LIT@Override`END`PLN\n' +
    '  `END`KWDpublic`END`PLN `END`TYPIterator`END`PUN&lt;`END' +
      '`TYPInteger`END`PUN&gt;`END`PLN iterator`END`PUN()`END`PLN `END' +
      '`PUN{`END`PLN\n' +
    '    `END`KWDreturn`END`PLN `END`KWDnew`END`PLN `END' +
      '`TYPIterator`END`PUN&lt;`END`TYPInteger`END`PUN&gt;()`END`PLN `END' +
      '`PUN{`END`PLN\n' +
    '      `END`COM/** the series is infinite. *\/`END' +
      '`PLN\n' +
    '      `END`KWDpublic`END`PLN `END`KWDboolean`END' +
      '`PLN hasNext`END`PUN()`END`PLN `END`PUN{`END`PLN `END' +
      '`KWDreturn`END`PLN `END`KWDtrue`END`PUN;`END`PLN `END`PUN}`END' +
      '`PLN\n' +
    '      `END`KWDpublic`END`PLN `END`TYPInteger`END' +
      '`PLN `END`KWDnext`END`PUN()`END`PLN `END`PUN{`END`PLN\n' +
    '        `END`KWDint`END`PLN tmp `END`PUN=`END' +
      '`PLN a`END`PUN;`END`PLN\n' +
    '        a `END`PUN+=`END`PLN b`END`PUN;`END' +
      '`PLN\n' +
    '        b `END`PUN=`END`PLN tmp`END`PUN;`END' +
      '`PLN\n' +
    '        `END`KWDreturn`END`PLN a`END`PUN;`END' +
      '`PLN\n' +
    '      `END`PUN}`END`PLN\n' +
    '      `END`KWDpublic`END`PLN `END`KWDvoid`END' +
      '`PLN `END`KWDremove`END`PUN()`END`PLN `END`PUN{`END`PLN `END`KWDthrow`END' +
      '`PLN `END`KWDnew`END`PLN `END' +
      '`TYPUnsupportedOperationException`END`PUN();`END`PLN `END' +
      '`PUN}`END`PLN\n' +
    '    `END`PUN};`END`PLN\n' +
    '  `END`PUN}`END`PLN\n' +
    '\n' +
    '  `END`COM/**\n' +
    '   * the n&lt;sup&gt;th&lt;/sup&gt; element of the given ' +
      'series.\n' +
    '   * @throws NoSuchElementException if there are less than ' +
      'n elements in the\n' +
    '   *   given Iterable\'s {@link Iterable#iterator ' +
      'iterator}.\n' +
    '   *\/`END`PLN\n' +
    '  `END`KWDpublic`END`PLN `END`KWDstatic`END`PLN `END' +
      '`PUN&lt;`END`PLNT`END`PUN&gt;`END`PLN\n' +
    '  T nth`END`PUN(`END`KWDint`END`PLN n`END`PUN,`END`PLN `END' +
      '`TYPIterable`END`PUN&lt;`END`PLNT`END`PUN&gt;`END' +
      '`PLN iterable`END`PUN)`END`PLN `END`PUN{`END`PLN\n' +
    '    `END`TYPIterator`END`PUN&lt;?`END`PLN ' +
      '`END`KWDextends`END`PLN T`END`PUN&gt;`END`PLN it `END`PUN=`END' +
      '`PLN iterable`END`PUN.`END`PLNiterator`END`PUN();`END`PLN\n' +
    '    `END`KWDwhile`END`PLN `END`PUN(--`END`PLNn `END' +
      '`PUN&gt;`END`PLN `END`LIT0`END`PUN)`END`PLN `END`PUN{`END`PLN\n' +
    '      it`END`PUN.`END`KWDnext`END`PUN();`END`PLN\n' +
    '    `END`PUN}`END`PLN\n' +
    '    `END`KWDreturn`END`PLN it`END`PUN.`END`KWDnext`END' +
      '`PUN();`END`PLN\n' +
    '  `END`PUN}`END`PLN\n' +
    '\n' +
    '  `END`KWDpublic`END`PLN `END`KWDstatic`END`PLN `END`KWDvoid`END' +
      '`PLN main`END`PUN(`END`TYPString`END`PUN[]`END`PLN args`END' +
      '`PUN)`END`PLN `END`PUN{`END`PLN\n' +
    '    `END`TYPSystem`END`PUN.`END`KWDout`END`PUN.`END' +
      '`KWDprint`END`PUN(`END`PLNnth`END`PUN(`END`LIT10`END`PUN,`END' +
      '`PLN `END`KWDnew`END`PLN `END`TYPFibonacci`END`PUN()));`END' +
      '`PLN\n' +
    '  `END`PUN}`END`PLN\n' +
    '`END`PUN}`END'
  ),
  java_lang: (
    '<ol class="linenums"><li class="L1" value="12">' +
      '`KWDpackage`END`PLN foo`END`PUN;`END' +
    '`#2`PLN&nbsp;`END' +
    '`#3`KWDimport`END`PLN java`END`PUN.`END`PLNutil`END`PUN.`END' +
      '`TYPIterator`END`PUN;`END' +
    '`#4`PLN&nbsp;`END' +
    '`#5`COM/**`END' +
    '`#6`COM * the fibonacci series implemented as an Iterable.`END' +
    '`#7`COM *\/`END' +
    '`#8`KWDpublic`END`PLN `END`KWDfinal`END`PLN `END`KWDclass`END' +
      '`PLN `END`TYPFibonacci`END`PLN `END`KWDimplements`END`PLN `END' +
      '`TYPIterable`END`PUN&lt;`END`TYPInteger`END`PUN&gt;`END`PLN `END`' +
      'PUN{`END' +
    '`#9`PLN  `END' +
      '`COM/** the next and previous members of the series. *\/`END' +
      '' +
    '`#0`PLN  `END`KWDprivate`END`PLN `END`KWDint`END`PLN a `END`PUN=`END' +
      '`PLN `END`LIT1`END`PUN,`END`PLN b `END`PUN=`END`PLN `END`LIT1`END' +
      '`PUN;`END' +
    '`#1`PLN&nbsp;`END' +
    '`#2`PLN  `END`LIT@Override`END' +
    '`#3`PLN  `END`KWDpublic`END`PLN `END`TYPIterator`END`PUN&lt;`END' +
      '`TYPInteger`END`PUN&gt;`END`PLN iterator`END`PUN()`END`PLN `END' +
      '`PUN{`END' +
    '`#4`PLN    `END`KWDreturn`END`PLN `END`KWDnew`END`PLN `END' +
      '`TYPIterator`END`PUN&lt;`END`TYPInteger`END`PUN&gt;()`END`PLN `END' +
      '`PUN{`END' +
    '`#5`PLN      `END`COM/** the series is infinite. *\/`END' +
      '' +
    '`#6`PLN      `END`KWDpublic`END`PLN `END`KWDboolean`END' +
      '`PLN hasNext`END`PUN()`END`PLN `END`PUN{`END`PLN `END' +
      '`KWDreturn`END`PLN `END`KWDtrue`END`PUN;`END`PLN `END`PUN}`END' +
      '' +
    '`#7`PLN      `END`KWDpublic`END`PLN `END`TYPInteger`END' +
      '`PLN next`END`PUN()`END`PLN `END`PUN{`END' +
    '`#8`PLN        `END`KWDint`END`PLN tmp `END`PUN=`END' +
      '`PLN a`END`PUN;`END' +
    '`#9`PLN        a `END`PUN+=`END`PLN b`END`PUN;`END' +
      '' +
    '`#0`PLN        b `END`PUN=`END`PLN tmp`END`PUN;`END' +
      '' +
    '`#1`PLN        `END`KWDreturn`END`PLN a`END`PUN;`END' +
      '' +
    '`#2`PLN      `END`PUN}`END' +
    '`#3`PLN      `END`KWDpublic`END`PLN `END`KWDvoid`END' +
      '`PLN remove`END`PUN()`END`PLN `END`PUN{`END`PLN `END`KWDthrow`END' +
      '`PLN `END`KWDnew`END`PLN `END' +
      '`TYPUnsupportedOperationException`END`PUN();`END`PLN `END' +
      '`PUN}`END' +
    '`#4`PLN    `END`PUN};`END' +
    '`#5`PLN  `END`PUN}`END' +
    '`#6`PLN&nbsp;`END' +
    '`#7`PLN  `END`COM/**`END' +
    '`#8`COM   * the n&lt;sup&gt;th&lt;/sup&gt; element of the given ' +
      'series.`END' +
    '`#9`COM   * @throws NoSuchElementException if there are less than ' +
      'n elements in the`END' +
    '`#0`COM   *   given Iterable\'s {@link Iterable#iterator ' +
      'iterator}.`END' +
    '`#1`COM   *\/`END' +
    '`#2`PLN  `END`KWDpublic`END`PLN `END`KWDstatic`END`PLN `END' +
      '`PUN&lt;`END`PLNT`END`PUN&gt;`END' +
    '`#3`PLN  T nth`END`PUN(`END`KWDint`END`PLN n`END`PUN,`END`PLN `END' +
      '`TYPIterable`END`PUN&lt;`END`PLNT`END`PUN&gt;`END' +
      '`PLN iterable`END`PUN)`END`PLN `END`PUN{`END' +
    '`#4`PLN    `END`TYPIterator`END`PUN&lt;?`END`PLN `END' +
      '`KWDextends`END`PLN T`END`PUN&gt;`END`PLN in `END`PUN=`END' +
      '`PLN iterable`END`PUN.`END`PLNiterator`END`PUN();`END' +
    '`#5`PLN    `END`KWDwhile`END`PLN `END`PUN(--`END`PLNn `END' +
      '`PUN&gt;`END`PLN `END`LIT0`END`PUN)`END`PLN `END`PUN{`END' +
    '`#6`PLN      in`END`PUN.`END`PLNnext`END`PUN();`END' +
    '`#7`PLN    `END`PUN}`END' +
    '`#8`PLN    `END`KWDreturn`END`PLN in`END`PUN.`END`PLNnext`END' +
      '`PUN();`END' +
    '`#9`PLN  `END`PUN}`END' +
    '`#0`PLN&nbsp;`END' +
    '`#1`PLN  `END`KWDpublic`END`PLN `END`KWDstatic`END`PLN `END`KWDvoid`END' +
      '`PLN main`END`PUN(`END`TYPString`END`PUN[]`END`PLN args`END' +
      '`PUN)`END`PLN `END`PUN{`END' +
    '`#2`PLN    `END`TYPSystem`END`PUN.`END`PLNout`END`PUN.`END' +
      '`PLNprint`END`PUN(`END`PLNnth`END`PUN(`END`LIT10`END`PUN,`END' +
      '`PLN `END`KWDnew`END`PLN `END`TYPFibonacci`END`PUN()));`END' +
      '' +
    '`#3`PLN  `END`PUN}`END' +
    '`#4`PUN}`END' +
    '`#5`PLN&nbsp;`END' +
    '`#6`PUN#`END`PLN not a java comment`END' +
    '`#7`PUN#`END`PLN not keywords`END`PUN:`END' +
      '`PLN static_cast and namespace`END</li></ol>'
  ),
  javascript: (
    '`COM/**\n' +
    ' * nth element in the fibonacci series.\n' +
    ' * @param n &gt;= 0\n' +
    ' * @return the nth element, &gt;= 0.\n' +
    ' *\/`END`PLN\n' +
    '`END`KWDfunction`END`PLN fib`END`PUN(`END`PLNn`END`PUN)`END`PLN `END' +
      '`PUN{`END`PLN\n' +
    '  `END`KWDvar`END`PLN a `END`PUN=`END`PLN `END`LIT1`END`PUN,`END' +
      '`PLN b `END`PUN=`END`PLN `END`LIT1`END`PUN;`END`PLN\n' +
    '  `END`KWDvar`END`PLN tmp`END`PUN;`END`PLN\n' +
    '  `END`KWDwhile`END`PLN `END`PUN(--`END`PLNn `END`PUN&gt;=`END' +
      '`PLN `END`LIT0`END`PUN)`END`PLN `END`PUN{`END`PLN\n' +
    '    tmp `END`PUN=`END`PLN a`END`PUN;`END`PLN\n' +
    '    a `END`PUN+=`END`PLN b`END`PUN;`END`PLN\n' +
    '    b `END`PUN=`END`PLN tmp`END`PUN;`END`PLN\n' +
    '  `END`PUN}`END`PLN\n' +
    '  `END`KWDreturn`END`PLN a`END`PUN;`END`PLN\n' +
    '`END`PUN}`END`PLN\n' +
    '\n' +
    'document`END`PUN.`END`PLNwrite`END`PUN(`END`PLNfib`END`PUN(`END' +
      '`LIT10`END`PUN));`END'
  ),
  perl: (
    '`COM#!/usr/bin/perl`END`PLN\n' +
    '\n' +
    '`END`KWDuse`END`PLN strict`END`PUN;`END`PLN\n' +
    '`END`KWDuse`END`PLN integer`END`PUN;`END`PLN\n' +
    '\n' +
    '`END`COM# the nth element of the fibonacci series`END`PLN\n' +
    '`END`COM# param n - an int &gt;= 0`END`PLN\n' +
    '`END`COM# return an int &gt;= 0`END`PLN\n' +
    '`END`KWDsub`END`PLN fib`END`PUN(`END`PLN$`END`PUN)`END`PLN `END' +
      '`PUN{`END`PLN\n' +
    '  `END`KWDmy`END`PLN $n `END`PUN=`END`PLN shift`END`PUN,`END`PLN ' +
    '$a `END`PUN=`END`PLN `END`LIT1`END`PUN,`END`PLN $b `END' +
      '`PUN=`END`PLN `END`LIT1`END`PUN;`END`PLN\n' +
    '  `END`PUN(`END`PLN$a`END`PUN,`END`PLN $b`END`PUN)`END' +
      '`PLN `END`PUN=`END`PLN `END`PUN(`END`PLN$a `END`PUN+`END' +
      '`PLN $b`END`PUN,`END`PLN $a`END`PUN)`END`PLN `END`KWDuntil`END' +
      '`PLN `END`PUN(--`END`PLN$n `END`PUN&lt;`END`PLN `END`LIT0`END' +
      '`PUN);`END`PLN\n' +
    '  `END`KWDreturn`END`PLN $a`END`PUN;`END`PLN\n' +
    '`END`PUN}`END`PLN\n' +
    '\n' +
    '`END`KWDprint`END`PLN fib`END`PUN(`END`LIT10`END`PUN);`END'
  ),
  python: (
    '`COM#!/usr/bin/python2.4`END`PLN\n' +
    '\n' +
    '`END`KWDdef`END`PLN fib`END`PUN():`END`PLN\n' +
    '  `END`STR\'\'\'\n' +
    '  a generator that produces the elements of the fibonacci series' +
      '\n' +
    '  \'\'\'`END`PLN\n' +
    '\n' +
    '  a `END`PUN=`END`PLN `END`LIT1`END`PLN\n' +
    '  b `END`PUN=`END`PLN `END`LIT1`END`PLN\n' +
    '  `END`KWDwhile`END`PLN `END`KWDTrue`END`PUN:`END`PLN\n' +
    '    a`END`PUN,`END`PLN b `END`PUN=`END`PLN a `END`PUN+`END' +
      '`PLN b`END`PUN,`END`PLN a\n' +
    '    `END`KWDyield`END`PLN a\n' +
    '\n' +
    '`END`KWDdef`END`PLN nth`END`PUN(`END`PLNseries`END`PUN,`END`PLN n`END' +
      '`PUN):`END`PLN\n' +
    '  `END`STR\'\'\'\n' +
    '  returns the nth element of a series,\n' +
    '  consuming the earlier elements of the series\n' +
    '  \'\'\'`END`PLN\n' +
    '\n' +
    '  `END`KWDfor`END`PLN x `END`KWDin`END`PLN series`END`PUN:`END' +
      '`PLN\n' +
    '    n `END`PUN=`END`PLN n `END`PUN-`END`PLN `END`LIT1`END' +
      '`PLN\n' +
    '    `END`KWDif`END`PLN n `END`PUN&lt;=`END`PLN `END' +
      '`LIT0`END`PUN:`END`PLN `END`KWDreturn`END`PLN x\n' +
    '\n' +
    '`END`KWDprint`END`PLN nth`END`PUN(`END`PLNfib`END`PUN(),`END`PLN `END' +
      '`LIT10`END`PUN)`END'
  ),
  python_lang: (
    '`COM#!/usr/bin/python2.4`END`PLN\n' +
    '\n' +
    '`END`KWDdef`END`PLN fib`END`PUN():`END`PLN\n' +
    '  `END`STR\'\'\'\n' +
    '  a generator that produces the fibonacci series\'s elements' +
      '\n' +
    '  \'\'\'`END`PLN\n' +
    '\n' +
    '  a `END`PUN=`END`PLN `END`LIT1`END`PLN\n' +
    '  b `END`PUN=`END`PLN `END`LIT1`END`PLN\n' +
    '  `END`KWDwhile`END`PLN `END`KWDTrue`END`PUN:`END`PLN\n' +
    '    a`END`PUN,`END`PLN b `END`PUN=`END`PLN a `END`PUN+`END' +
      '`PLN b`END`PUN,`END`PLN a\n' +
    '    `END`KWDyield`END`PLN a\n' +
    '\n' +
    '`END`KWDdef`END`PLN nth`END`PUN(`END`PLNseries`END`PUN,`END`PLN n`END' +
      '`PUN):`END`PLN\n' +
    '  `END`STR\'\'\'\n' +
    '  returns the nth element of a series,\n' +
    '  consuming the series\' earlier elements.\n' +
    '  \'\'\'`END`PLN\n' +
    '\n' +
    '  `END`KWDfor`END`PLN x `END`KWDin`END`PLN series`END`PUN:`END' +
      '`PLN\n' +
    '    n `END`PUN-=`END`PLN `END`LIT1`END' +
      '`PLN\n' +
    '    `END`KWDif`END`PLN n `END`PUN&lt;=`END`PLN `END' +
      '`LIT0`END`PUN:`END`PLN `END`KWDreturn`END`PLN x\n' +
    '\n' +
    '`END`KWDprint`END`PLN nth`END`PUN(`END`PLNfib`END`PUN(),`END`PLN `END' +
      '`LIT10`END`PUN)`END`PLN\n' +
    '\n' +
    '`END`PUN/*`END`PLN `END`KWDnot`END`PLN a comment `END`KWDand`END' +
      '`PLN `END`KWDnot`END`PLN keywords`END`PUN:`END' +
      '`PLN null char true `END`PUN*\/`END'
  ),
  sql_lang: (
    '`COM/* A multi-line\n' +
    ' * comment *\/`END`PLN\n' +
    '`END`STR\'Another string /* Isn\\\'t a comment\'`END`PUN,`END`PLN\n' +
    '`END`STR"A string *\/"`END`PLN\n' +
    '`END`COM-- A line comment`END`PLN\n' +
    '`END`KWDSELECT`END`PLN `END`PUN*`END`PLN `END`KWDFROM`END' +
      '`PLN users `END`KWDWHERE`END`PLN id `END`KWDIN`END`PLN `END' +
      '`PUN(`END`LIT1`END`PUN,`END`PLN `END`LIT2.0`END`PUN,`END`PLN `END' +
      '`LIT+30e-1`END`PUN);`END`PLN\n' +
    '`END`COM-- keywords are case-insensitive.`END`PLN\n' +
    '`END`COM-- Note: user-table is a single identifier, not a pair of' +
      ' keywords`END`PLN\n' +
    '`END`KWDselect`END`PLN `END`PUN*`END`PLN `END`KWDfrom`END' +
      '`PLN user-table `END`KWDwhere`END`PLN id `END`KWDin`END`PLN `END' +
      '`PUN(`END`PLNx`END`PUN,`END`PLN y`END`PUN,`END`PLN z`END`PUN);`END'
  ),
  xml: (
    '`DEC&lt;!DOCTYPE series PUBLIC "fibonacci numbers"&gt;`END`PLN\n' +
    '\n' +
    '`END`TAG&lt;series.root`END`PLN `END`ATNbase`END`PUN=`END' +
      '`ATV"1"`END`PLN `END' +
      '`ATNstep`END`PUN=`END`ATV"s(n-2) + s(n-1)"`END`TAG&gt;`END' +
      '`PLN\n' +
    '  `END`TAG&lt;element`END`PLN `END`ATNi`END`PUN=`END' +
      '`ATV"0"`END' +
      '`TAG&gt;`END`PLN1`END`TAG&lt;/element&gt;`END' +
      '`PLN\n' +
    '  `END`TAG&lt;element`END`PLN `END`ATNi`END`PUN=`END' +
      '`ATV"1"`END' +
      '`TAG&gt;`END`PLN1`END`TAG&lt;/element&gt;`END' +
      '`PLN\n' +
    '  `END`TAG&lt;element`END`PLN `END`ATNi`END`PUN=`END' +
      '`ATV"2"`END' +
      '`TAG&gt;`END`PLN2`END`TAG&lt;/element&gt;`END' +
      '`PLN\n' +
    '  `END`TAG&lt;element`END`PLN `END`ATNi`END`PUN=`END' +
      '`ATV"3"`END' +
      '`TAG&gt;`END`PLN3`END`TAG&lt;/element&gt;`END' +
      '`PLN\n' +
    '  `END`TAG&lt;element`END`PLN `END`ATNi`END`PUN=`END' +
      '`ATV"4"`END' +
      '`TAG&gt;`END`PLN5`END`TAG&lt;/element&gt;`END' +
      '`PLN\n' +
    '  `END`TAG&lt;element`END`PLN `END`ATNi`END`PUN=`END' +
      '`ATV"5"`END' +
      '`TAG&gt;`END`PLN8`END`TAG&lt;/element&gt;`END' +
      '`PLN\n' +
    '  ...\n' +
    '`END`TAG&lt;/series.root&gt;`END'
  ),
  html: (
    '`TAG&lt;html&gt;`END`PLN\n' +
    '  `END`TAG&lt;head&gt;`END`PLN\n' +
    '    `END`TAG&lt;title&gt;`END`PLNFibonacci number`END' +
      '`TAG&lt;/title&gt;`END`PLN\n' +
    '    `END`TAG&lt;style&gt;`END`COM&lt;!--`END' +
      '`PLN BODY `END`PUN{`END`PLN `END`KWDtext-decoration`END`PUN:`END' +
      '`PLN blink `END`PUN}`END`PLN `END`COM--&gt;`END`TAG&lt;/' +
      'style&gt;`END`PLN\n' +
    '    `END`TAG&lt;script`END`PLN `END`ATNsrc`END`PUN=`END' +
      '`ATV"foo.js"`END`TAG&gt;&lt;/script&gt;`END`PLN\n' +
    '    `END`TAG&lt;script`END`PLN `END`ATNsrc`END`PUN=`END' +
      '`ATV"bar.js"`END`TAG&gt;&lt;/script&gt;`END`PLN\n' +
    '  `END`TAG&lt;/head&gt;`END`PLN\n' +
    '  `END`TAG&lt;body&gt;`END`PLN\n' +
    '    `END`TAG&lt;noscript&gt;`END`PLN\n' +
    '      `END`TAG&lt;dl&gt;`END`PLN\n' +
    '        `END`TAG&lt;dt&gt;`END' +
      '`PLNFibonacci numbers`END`TAG&lt;/dt&gt;`END' +
      '`PLN\n' +
    '        `END`TAG&lt;dd&gt;`END`PLN1`END' +
      '`TAG&lt;/dd&gt;`END`PLN\n' +
    '        `END`TAG&lt;dd&gt;`END`PLN1`END' +
      '`TAG&lt;/dd&gt;`END`PLN\n' +
    '        `END`TAG&lt;dd&gt;`END`PLN2`END' +
      '`TAG&lt;/dd&gt;`END`PLN\n' +
    '        `END`TAG&lt;dd&gt;`END`PLN3`END' +
      '`TAG&lt;/dd&gt;`END`PLN\n' +
    '        `END`TAG&lt;dd&gt;`END`PLN5`END' +
      '`TAG&lt;/dd&gt;`END`PLN\n' +
    '        `END`TAG&lt;dd&gt;`END`PLN8`END' +
      '`TAG&lt;/dd&gt;`END`PLN\n' +
    '        &amp;hellip;\n' +
    '      `END`TAG&lt;/dl&gt;`END`PLN\n' +
    '    `END`TAG&lt;/noscript&gt;`END`PLN\n' +
    '\n' +
    '    `END`TAG&lt;script`END`PLN `END`ATNtype`END`PUN=`END' +
      '`ATV"text/javascript"`END`TAG&gt;`END`PUN&lt;!--`END`PLN\n' +
    '`END`KWDfunction`END`PLN fib`END`PUN(`END`PLNn`END`PUN)`END`PLN `END' +
      '`PUN{`END`PLN\n' +
    '  `END`KWDvar`END`PLN a `END`PUN=`END`PLN `END`LIT1`END`PUN,`END' +
      '`PLN b `END`PUN=`END`PLN `END`LIT1`END`PUN;`END`PLN\n' +
    '  `END`KWDvar`END`PLN tmp`END`PUN;`END`PLN\n' +
    '  `END`KWDwhile`END`PLN `END`PUN(--`END`PLNn `END`PUN&gt;=`END' +
      '`PLN `END`LIT0`END`PUN)`END`PLN `END`PUN{`END`PLN\n' +
    '    tmp `END`PUN=`END`PLN a`END`PUN;`END`PLN\n' +
    '    a `END`PUN+=`END`PLN b`END`PUN;`END`PLN\n' +
    '    b `END`PUN=`END`PLN tmp`END`PUN;`END`PLN\n' +
    '  `END`PUN}`END`PLN\n' +
    '  `END`KWDreturn`END`PLN a`END`PUN;`END`PLN\n' +
    '`END`PUN}`END`PLN\n' +
    '\n' +
    'document`END`PUN.`END`PLNwriteln`END`PUN(`END`PLNfib`END`PUN(`END' +
      '`LIT10`END`PUN));`END`PLN\n' +
    '`END`COM// --&gt;`END`PLN\n' +
    '    `END`TAG&lt;/script&gt;`END`PLN\n' +
    '  `END`TAG&lt;/body&gt;`END`PLN\n' +
    '`END`TAG&lt;/html&gt;`END'
  ),
  html_lang: (
    '`PLNFibonacci Numbers\n' +
    '\n' +
    '`END`TAG&lt;noscript&gt;`END`PLN\n' +
    '  `END`TAG&lt;dl`END`PLN `END`ATNstyle`END`PUN=`END' +
      '`ATV"`END`KWDlist-style`END`PUN:`END`PLN disc`END`ATV"`END' +
      '`TAG&gt;`END`PLN\n' +
    '    `END`TAG&lt;dt&gt;`END' +
      '`PLNFibonacci numbers`END`TAG&lt;/dt&gt;`END`PLN\n' +
    '    `END`TAG&lt;dd&gt;`END`PLN1`END`TAG&lt;/dd&gt;`END' +
      '`PLN\n' +
    '    `END`TAG&lt;dd&gt;`END`PLN1`END`TAG&lt;/dd&gt;`END' +
      '`PLN\n' +
    '    `END`TAG&lt;dd&gt;`END`PLN2`END`TAG&lt;/dd&gt;`END' +
      '`PLN\n' +
    '    `END`TAG&lt;dd&gt;`END`PLN3`END`TAG&lt;/dd&gt;`END' +
      '`PLN\n' +
    '    `END`TAG&lt;dd&gt;`END`PLN5`END`TAG&lt;/dd&gt;`END' +
      '`PLN\n' +
    '    `END`TAG&lt;dd&gt;`END`PLN8`END`TAG&lt;/dd&gt;`END' +
      '`PLN\n' +
    '    &amp;hellip;\n' +
    '  `END`TAG&lt;/dl&gt;`END`PLN\n' +
    '`END`TAG&lt;/noscript&gt;`END`PLN\n' +
    '\n' +
    '`END`TAG&lt;script`END`PLN `END`ATNtype`END`PUN=`END' +
      '`ATV"text/javascript"`END`TAG&gt;`END`PUN&lt;!--`END`PLN\n' +
    '`END`KWDfunction`END`PLN fib`END`PUN(`END`PLNn`END`PUN)`END`PLN `END' +
      '`PUN{`END`PLN\n' +
    '  `END`KWDvar`END`PLN a `END`PUN=`END`PLN `END`LIT1`END`PUN,`END' +
      '`PLN b `END`PUN=`END`PLN `END`LIT1`END`PUN;`END`PLN\n' +
    '  `END`KWDvar`END`PLN tmp`END`PUN;`END`PLN\n' +
    '  `END`KWDwhile`END`PLN `END`PUN(--`END`PLNn `END`PUN&gt;=`END' +
      '`PLN `END`LIT0`END`PUN)`END`PLN `END`PUN{`END`PLN\n' +
    '    tmp `END`PUN=`END`PLN a`END`PUN;`END`PLN\n' +
    '    a `END`PUN+=`END`PLN b`END`PUN;`END`PLN\n' +
    '    b `END`PUN=`END`PLN tmp`END`PUN;`END`PLN\n' +
    '  `END`PUN}`END`PLN\n' +
    '  `END`KWDreturn`END`PLN a`END`PUN;`END`PLN\n' +
    '`END`PUN}`END`PLN\n' +
    '\n' +
    'document`END`PUN.`END`PLNwriteln`END`PUN(`END`PLNfib`END`PUN(`END' +
      '`LIT10`END`PUN));`END`PLN\n' +
    '`END`COM// --&gt;`END`PLN\n' +
    '`END`TAG&lt;/script&gt;`END'
  ),
  html_xmp: (
    '`TAG&lt;html&gt;`END`PLN\n' +
    '  `END`TAG&lt;head&gt;`END`PLN\n' +
    '    `END`TAG&lt;title&gt;`END`PLNFibonacci number`END' +
      '`TAG&lt;/title&gt;`END`PLN\n' +
    '  `END`TAG&lt;/head&gt;`END`PLN\n' +
    '  `END`TAG&lt;body&gt;`END`PLN\n' +
    '    `END`TAG&lt;noscript&gt;`END`PLN\n' +
    '      `END`TAG&lt;dl&gt;`END`PLN\n' +
    '        `END`TAG&lt;dt&gt;`END' +
      '`PLNFibonacci numbers`END`TAG&lt;/dt&gt;`END`PLN\n' +
    '        `END`TAG&lt;dd&gt;`END`PLN1`END' +
      '`TAG&lt;/dd&gt;`END`PLN\n' +
    '        `END`TAG&lt;dd&gt;`END`PLN1`END' +
      '`TAG&lt;/dd&gt;`END`PLN\n' +
    '        `END`TAG&lt;dd&gt;`END`PLN2`END' +
      '`TAG&lt;/dd&gt;`END`PLN\n' +
    '        `END`TAG&lt;dd&gt;`END`PLN3`END' +
      '`TAG&lt;/dd&gt;`END`PLN\n' +
    '        `END`TAG&lt;dd&gt;`END`PLN5`END' +
      '`TAG&lt;/dd&gt;`END`PLN\n' +
    '        `END`TAG&lt;dd&gt;`END`PLN8`END' +
      '`TAG&lt;/dd&gt;`END`PLN\n' +
    '        &amp;hellip;\n' +
    '      `END`TAG&lt;/dl&gt;`END`PLN\n' +
    '    `END`TAG&lt;/noscript&gt;`END`PLN\n' +
    '\n' +
    '    `END`TAG&lt;script`END`PLN `END`ATNtype`END`PUN=`END' +
      '`ATV"text/javascript"`END`TAG&gt;`END`PUN&lt;!--`END`PLN\n' +
    '`END`KWDfunction`END`PLN fib`END`PUN(`END`PLNn`END`PUN)`END`PLN `END' +
      '`PUN{`END`PLN\n' +
    '  `END`KWDvar`END`PLN a `END`PUN=`END`PLN `END`LIT1`END`PUN,`END' +
      '`PLN b `END`PUN=`END`PLN `END`LIT1`END`PUN;`END`PLN\n' +
    '  `END`KWDvar`END`PLN tmp`END`PUN;`END`PLN\n' +
    '  `END`KWDwhile`END`PLN `END`PUN(--`END`PLNn `END`PUN&gt;=`END' +
      '`PLN `END`LIT0`END`PUN)`END`PLN `END`PUN{`END`PLN\n' +
    '    tmp `END`PUN=`END`PLN a`END`PUN;`END`PLN\n' +
    '    a `END`PUN+=`END`PLN b`END`PUN;`END`PLN\n' +
    '    b `END`PUN=`END`PLN tmp`END`PUN;`END`PLN\n' +
    '  `END`PUN}`END`PLN\n' +
    '  `END`KWDreturn`END`PLN a`END`PUN;`END`PLN\n' +
    '`END`PUN}`END`PLN\n' +
    '\n' +
    'document`END`PUN.`END`PLNwriteln`END`PUN(`END`PLNfib`END`PUN(`END' +
      '`LIT10`END`PUN));`END`PLN\n' +
    '`END`COM// --&gt;`END`PLN\n' +
    '    `END`TAG&lt;/script&gt;`END`PLN\n' +
    '  `END`TAG&lt;/body&gt;`END`PLN\n' +
    '`END`TAG&lt;/html&gt;`END'
  ),
  xhtml: (
    '`TAG&lt;xhtml&gt;`END`PLN\n' +
    '  `END`TAG&lt;head&gt;`END`PLN\n' +
    '    `END`TAG&lt;title&gt;`END' +
      '`PLNFibonacci number`END`TAG&lt;/title&gt;`END' +
      '`PLN\n' +
    '  `END`TAG&lt;/head&gt;`END`PLN\n' +
    '  `END`TAG&lt;body`END`PLN `END`ATNonload`END`PUN=`END' +
      '`ATV"`END`PLNalert`END`PUN(`END`PLNfib`END`PUN(`END`LIT10`END' +
      '`PUN))`END`ATV"`END`TAG&gt;`END`PLN\n' +
    '    `END`TAG&lt;script`END`PLN `END`ATNtype`END' +
      '`PUN=`END`ATV"text/javascript"`END`TAG&gt;`END' +
      '`PUN&lt;![`END`PLNCDATA`END`PUN[`END`PLN\n' +
    '`END`KWDfunction`END`PLN fib`END`PUN(`END`PLNn`END`PUN)`END`PLN `END' +
      '`PUN{`END`PLN\n' +
    '  `END`KWDvar`END`PLN a `END`PUN=`END`PLN `END`LIT1`END`PUN,`END' +
      '`PLN b `END`PUN=`END`PLN `END`LIT1`END`PUN;`END`PLN\n' +
    '  `END`KWDvar`END`PLN tmp`END`PUN;`END`PLN\n' +
    '  `END`KWDwhile`END`PLN `END`PUN(--`END`PLNn `END`PUN&gt;=`END' +
      '`PLN `END`LIT0`END`PUN)`END`PLN `END`PUN{`END`PLN\n' +
    '    tmp `END`PUN=`END`PLN a`END`PUN;`END`PLN\n' +
    '    a `END`PUN+=`END`PLN b`END`PUN;`END`PLN\n' +
    '    b `END`PUN=`END`PLN tmp`END`PUN;`END`PLN\n' +
    '  `END`PUN}`END`PLN\n' +
    '  `END`KWDreturn`END`PLN a`END`PUN;`END`PLN\n' +
    '`END`PUN}`END`PLN\n' +
    '`END`PUN]]&gt;`END`PLN\n' +
    '    `END`TAG&lt;/script&gt;`END`PLN\n' +
    '  `END`TAG&lt;/body&gt;`END`PLN\n' +
    '`END`TAG&lt;/xhtml&gt;`END'
  ),
  php: (
    '`TAG&lt;html&gt;`END`PLN\n' +
    '  `END`TAG&lt;head&gt;`END`PLN\n' +
    '    `END`TAG&lt;title&gt;`END`PUN&lt;?=`END' +
      '`PLN `END' +
      '`STR\'Fibonacci numbers\'`END`PLN `END' +
      '`PUN?&gt;`END`TAG&lt;/title&gt;`END`PLN\n' +
    '\n' +
    '    `END`PUN&lt;?`END`PLNphp\n' +
    '      `END`COM// PHP has a plethora of comment types' +
      '`END`PLN\n' +
    '      `END`COM\/* What is a\n' +
    '         "plethora"? *\/`END`PLN\n' +
    '      `END`KWDfunction`END`PLN fib`END`PUN(`END' +
      '`PLN$n`END`PUN)`END`PLN `END`PUN{`END`PLN\n' +
    '        `END`COM# I don\'t know.`END`PLN\n' +
    '        $a `END`PUN=`END`PLN `END`LIT1`END' +
      '`PUN;`END`PLN\n' +
    '        $b `END`PUN=`END`PLN `END`LIT1`END' +
      '`PUN;`END`PLN\n' +
    '        `END`KWDwhile`END`PLN `END`PUN(--`END' +
      '`PLN$n `END`PUN&gt;=`END`PLN `END`LIT0`END`PUN)`END`PLN `END' +
      '`PUN{`END`PLN\n' +
    '          echo `END`STR"$a\\n"`END`PUN;`END' +
      '`PLN\n' +
    '          $tmp `END`PUN=`END`PLN $a`END' +
      '`PUN;`END`PLN\n' +
    '          $a `END`PUN+=`END`PLN $b`END' +
      '`PUN;`END`PLN\n' +
    '          $b `END`PUN=`END`PLN $tmp`END' +
      '`PUN;`END`PLN\n' +
    '        `END`PUN}`END`PLN\n' +
    '      `END`PUN}`END`PLN\n' +
    '    `END`PUN?&gt;`END`PLN\n' +
    '  `END`TAG&lt;/head&gt;`END`PLN\n' +
    '  `END`TAG&lt;body&gt;`END`PLN\n' +
    '    `END`PUN&lt;?=`END`PLN fib`END' +
      '`PUN(`END`LIT10`END`PUN)`END`PLN `END`PUN?&gt;`END`PLN\n' +
    '  `END`TAG&lt;/body&gt;`END`PLN\n' +
    '`END`TAG&lt;/html&gt;`END'
  ),
  xsl: (
    '`COM&lt;!-- Test elements and attributes with namespaces --&gt;' +
      '`END`PLN\n' +
    '\n' +
    '`END`TAG&lt;xsl:stylesheet`END`PLN `END`ATNxml:lang`END' +
      '`PUN=`END`ATV"en"`END`TAG&gt;`END`PLN\n' +
    '  `END`TAG&lt;xsl:template`END' +
      '`PLN `END`ATNmatch`END`PUN=`END`ATV"."`END' +
      '`TAG&gt;`END`PLN\n' +
    '    `END`TAG&lt;xsl:text&gt;`END' +
      '`PLNHello World`END' +
      '`TAG&lt;/xsl:text&gt;`END`PLN\n' +
    '  `END`TAG&lt;/xsl:template&gt;`END`PLN\n' +
    '`END`TAG&lt;/xsl:stylesheet&gt;`END'
  ),
  whitespace: '',
  misc1: (
    '`COM// ends with line comment token`END`PLN\n' +
    '`END`COM//`END'
  ),
  js_script: (
    '`TAG&lt;script`END`PLN `END' +
      '`ATNtype`END`PUN=`END`ATV"text/javascript"`END' +
      '`TAG&gt;`END`PLN\n' +
    '   var savedTarget=null' +
      ';               ' +
      '            // The target ' +
      'layer (effectively vidPane)\n' +
    '   var orgCursor=null' +
      ';               ' +
      '              // The ' +
      'original mouse style so we can restore it\n' +
    '   var dragOK=false' +
      ';               ' +
      '                ' +
      '// True if we\'re allowed to move the element under mouse' +
      '\n' +
    '   var dragXoffset=0' +
      ';               ' +
      '               ' +
      '// How much we\'ve moved the element on the horozontal' +
      '\n' +
    '   var dragYoffset=0' +
      ';               ' +
      '               ' +
      '// How much we\'ve moved the element on the verticle' +
      '\n' +
    '   vidPaneID = document.' +
      'getElementById(\'vidPane\');' +
      ' // Our movable layer\n' +
    '   vidPaneID.style.top' +
      '=\'75px\';       ' +
      '              // ' +
      'Starting location horozontal\n' +
    '   vidPaneID.style.left' +
      '=\'75px\';       ' +
      '             // ' +
      'Starting location verticle\n' +
    '`END`TAG&lt;script&gt;`END'
  ),
  issue8: (
    '<b>`PLNone`END</b>`PLN\t`END<b>`TYPTwo`END</b>`PLN' +
      '\t`END<b>`PLNthree`END</b>`PLN\t`END`TYPFour' +
      '`END`PLN\t`END<b>`PLNfive`END</b>`PLN\t' +
      '`END`PUN|`END`PLN\n' +
    '`END`TYPSix`END`PLN\t`END<b>`PLNseven`END</b>`PLN\t' +
      '`END`TYPEight`END`PLN\tnine\t`END`TYPTen`END' +
      '`PLN\t`END`PUN|`END`PLN\n' +
    '`END<b>`PLNeleven`END</b>`PLN\t`END`TYPTwelve`END`PLN\t`END' +
      '<b>`PLNthirteen`END</b>`PLN\t`END' +
      '`TYPFourteen`END`PLN\tfifteen\t`END`' +
      'PUN|`END'
  ),
  js_regexp: (
    '`STR/foo/`END`PUN;`END`PLN  `END`COM// a slash starting a line ' +
      'treated as a regexp beginning`END`PLN\n' +
    '`END`STR"foo"`END`PUN.`END`PLNmatch`END`PUN(`END`STR/fo+$/`END' +
      '`PUN);`END`PLN\n' +
    '`END`COM// this line comment not treated as a regular expressions`END' +
      '`PLN\n' +
    '`END`STR"foo /bar/"`END`PUN.`END`PLNtest`END`PUN(`END`STR/"baz"/`END' +
      '`PUN);`END`PLN  `END`COM// test string and regexp boundaries' +
      '`END`PLN\n' +
    '`END`KWDvar`END`PLN division `END`PUN=`END`PLN `END' +
      '`STR/\\b\\d+\\/\\d+/`END`PLNg`END`PUN;`END`PLN  `END' +
      '`COM// test char sets and escaping of specials`END`PLN\n' +
    '`END`KWDvar`END`PLN allSpecials `END`PUN=`END`PLN `END' +
      '`STR/([^\\(\\)\\[\\]\\{\\}\\-\\?\\+\\*\\.\\^\\$\\/]+)\\\\/`END' +
      '`PUN;`END`PLN\n' +
    '`END`KWDvar`END`PLN slashInCharset `END`PUN=`END`PLN `END' +
      '`STR/[^/]/`END`PLNg`END`PUN,`END`PLN notCloseSq `END`PUN=`END' +
      '`PLN `END`STR/[^\\]]/`END`PUN;`END`PLN\n' +
    '\n' +
    '`END`COM// test that slash used in numeric context treated as an ' +
      'operator`END`PLN\n' +
    '`END`LIT1`END`PLN `END`PUN/`END`PLN `END`LIT2`END`PUN;`END`PLN\n' +
    '`END`LIT1.`END`PLN `END`PUN/`END`PLN x`END`PUN;`END`PLN\n' +
    'x `END`PUN/`END`PLN y`END`PUN;`END`PLN\n' +
    '`END`PUN(`END`PLNx`END`PUN)`END`PLN `END`PUN/`END`PLN y`END`PUN;`END' +
      '`PLN\n' +
    '`END`LIT1`END`PLN `END`COM/* foo *\/`END`PLN `END`PUN/`END`PLN `END' +
      '`LIT2`END`PUN;`END`PLN\n' +
    '`END`LIT1`END`PLN `END`COM/* foo *\/`END`PUN/`END`PLN `END`LIT2`END' +
      '`PUN;`END`PLN\n' +
    '`END`LIT1`END`PUN/`END`LIT2`END`PUN;`END`PLN\n' +
    '`END`LIT1.`END`PUN/`END`PLNx`END`PUN;`END`PLN\n' +
    'x`END`PUN/`END`PLNy`END`PUN;`END`PLN\n' +
    '`END`PUN(`END`PLNx`END`PUN)/`END`PLNy`END`PUN;`END`PLN\n' +
    '\n' +
    '`END`COM// test split over two lines.  line comment should not ' +
      'fool it`END`PLN\n' +
    '`END`LIT1`END`COM//`END`PLN\n' +
    '`END`PUN/`END`LIT2`END`PUN;`END`PLN\n' +
    '\n' +
    'x`END`PUN++/`END`PLNy`END`PUN;`END`PLN\n' +
    'x`END`PUN--/`END`PLNy`END`PUN;`END`PLN\n' +
    'x`END`PUN[`END`PLNy`END`PUN]`END`PLN `END`PUN/`END`PLN z`END`PUN;`END' +
      '`PLN\n' +
    'f`END`PUN()`END`PLN `END`PUN/`END`PLN n`END`PUN;`END`PLN\n' +
    '\n' +
    '`END`COM// test that slash after non postfix operator is start of ' +
      'regexp`END`PLN\n' +
    'log`END`PUN(`END`STR\'matches = \'`END`PLN `END`PUN+`END`PLN `END' +
      '`STR/foo/`END`PUN.`END`PLNtest`END`PUN(`END`PLNfoo`END`PUN));`END' +
      '`PLN\n' +
    '\n' +
    '`END`COM// test keyword preceders`END`PLN\n' +
    '`END`KWDreturn`END`PLN `END`STR/a regexp/`END`PUN;`END`PLN\n' +
    'division `END`PUN=`END`PLN notreturn `END`PUN/`END`PLN not_a_regexp ' +
      '`END`PUN/`END`PLN `END`LIT2`END`PUN;`END`PLN  `END`COM// ' +
      'keyword suffix does not match`END`PLN\n' +
    '\n' +
    '`END`COM// &amp; not used as prefix operator in javascript but this ' +
      'should still work`END`PLN\n' +
    '`END`PUN&amp;`END`STR/foo/`END`PUN;`END`PLN\n' +
    '\n' +
    '`END`KWDextends`END`PLN `END`PUN=`END`PLN `END`STR/extends/`END' +
      '`PUN;`END'
  ),
  js_regexp_lang: (
    '`STR/foo/`END`PUN;`END`PLN  `END`COM// a slash starting a line ' +
      'treated as a regexp beginning`END`PLN\n' +
    '`END`STR"foo"`END`PUN.`END`PLNmatch`END`PUN(`END`STR/fo+$/`END' +
      '`PUN);`END`PLN\n' +
    '`END`COM// this line comment not treated as a regular expressions`END' +
      '`PLN\n' +
    '`END`STR"foo /bar/"`END`PUN.`END`PLNtest`END`PUN(`END`STR/"baz"/`END' +
      '`PUN);`END`PLN  `END`COM// test string and regexp boundaries' +
      '`END`PLN\n' +
    '`END`KWDvar`END`PLN division `END`PUN=`END`PLN `END' +
      '`STR/\\b\\d+\\/\\d+/`END`PLNg`END`PUN;`END`PLN  `END' +
      '`COM// test char sets and escaping of specials`END`PLN\n' +
    '`END`KWDvar`END`PLN allSpecials `END`PUN=`END`PLN `END' +
      '`STR/([^\\(\\)\\[\\]\\{\\}\\-\\?\\+\\*\\.\\^\\$\\/]+)\\\\/`END' +
      '`PUN;`END`PLN\n' +
    '`END`KWDvar`END`PLN slashInCharset `END`PUN=`END`PLN `END' +
      '`STR/[^/]/`END`PLNg`END`PUN,`END`PLN notCloseSq `END`PUN=`END' +
      '`PLN `END`STR/[^\\]]/`END`PUN;`END`PLN\n' +
    '\n' +
    '`END`COM// test that slash used in numeric context treated as an ' +
      'operator`END`PLN\n' +
    '`END`LIT1`END`PLN `END`PUN/`END`PLN `END`LIT2`END`PUN;`END`PLN\n' +
    '`END`LIT1.`END`PLN `END`PUN/`END`PLN x`END`PUN;`END`PLN\n' +
    'x `END`PUN/`END`PLN y`END`PUN;`END`PLN\n' +
    '`END`PUN(`END`PLNx`END`PUN)`END`PLN `END`PUN/`END`PLN y`END`PUN;`END' +
      '`PLN\n' +
    '`END`LIT1`END`PLN `END`COM/* foo *\/`END`PLN `END`PUN/`END`PLN `END' +
      '`LIT2`END`PUN;`END`PLN\n' +
    '`END`LIT1`END`PLN `END`COM/* foo *\/`END`PUN/`END`PLN `END`LIT2`END' +
      '`PUN;`END`PLN\n' +
    '`END`LIT1`END`PUN/`END`LIT2`END`PUN;`END`PLN\n' +
    '`END`LIT1.`END`PUN/`END`PLNx`END`PUN;`END`PLN\n' +
    'x`END`PUN/`END`PLNy`END`PUN;`END`PLN\n' +
    '`END`PUN(`END`PLNx`END`PUN)/`END`PLNy`END`PUN;`END`PLN\n' +
    '\n' +
    '`END`COM// test split over two lines.  line comment should not ' +
      'fool it`END`PLN\n' +
    '`END`LIT1`END`COM//`END`PLN\n' +
    '`END`PUN/`END`LIT2`END`PUN;`END`PLN\n' +
    '\n' +
    'x`END`PUN++/`END`PLNy`END`PUN;`END`PLN\n' +
    'x`END`PUN--/`END`PLNy`END`PUN;`END`PLN\n' +
    'x`END`PUN[`END`PLNy`END`PUN]`END`PLN `END`PUN/`END`PLN z`END`PUN;`END' +
      '`PLN\n' +
    'f`END`PUN()`END`PLN `END`PUN/`END`PLN n`END`PUN;`END`PLN\n' +
    '\n' +
    '`END`COM// test that slash after non postfix operator is start of ' +
      'regexp`END`PLN\n' +
    'log`END`PUN(`END`STR\'matches = \'`END`PLN `END`PUN+`END`PLN `END' +
      '`STR/foo/`END`PUN.`END`PLNtest`END`PUN(`END`PLNfoo`END`PUN));`END' +
      '`PLN\n' +
    '\n' +
    '`END`COM// test keyword preceders`END`PLN\n' +
    '`END`KWDreturn`END`PLN `END`STR/a regexp/`END`PUN;`END`PLN\n' +
    'division `END`PUN=`END`PLN notreturn `END`PUN/`END`PLN not_a_regexp ' +
      '`END`PUN/`END`PLN `END`LIT2`END`PUN;`END`PLN  `END`COM// ' +
      'keyword suffix does not match`END`PLN\n' +
    '\n' +
    '`END`COM// &amp; not used as prefix operator in javascript but this ' +
      'should still work`END`PLN\n' +
    '`END`PUN&amp;`END`STR/foo/`END`PUN;`END`PLN\n' +
    '\n' +
    'extends `END`PUN=`END`PLN `END`STR/extends/`END`PUN;`END'
  ),
  coffee: (
    '`KWDclass`END`PLN `END`TYPAnimal`END`PLN\n' +
    '  constructor`END`PUN:`END`PLN `END`PUN(`END`LIT@name`END`PUN)`END`PLN `END`PUN-&gt;`END`PLN\n' +
    '  move`END`PUN:`END`PLN `END`PUN(`END`PLNmeters`END`PUN,`END`PLN loc`END`PUN)`END`PLN `END`PUN-&gt;`END`PLN\n' +
    '    alert `END`LIT@name`END`PLN `END`PUN+`END`PLN `END`STR" moved "`END`PLN `END`PUN+`END`PLN meters `END`PUN+`END`PLN `END`STR"m."`END`PLN\n' +
    '  travel`END`PUN:`END`PLN `END`PUN(`END`PLNpath`END`PUN...)`END`PLN `END`PUN-&gt;`END`PLN\n' +
    '    `END`KWDfor`END`PLN place `END`KWDin`END`PLN path\n' +
    '      `END`LIT@move`END`PLN place`END`PUN.`END`PLNdistance`END`PUN,`END`PLN place`END`PUN.`END`PLNlocation\n' +
    '\n' +
    '`END`KWDclass`END`PLN `END`TYPHorse`END`PLN `END`KWDextends`END`PLN `END`TYPAnimal`END`PLN\n' +
    '  `END`COM###\n' +
    '  @param name Horse name\n' +
    '  @param jumper Jumping ability\n' +
    '  ###`END`PLN\n' +
    '  constructor`END`PUN:`END`PLN `END`PUN(`END`PLNname`END`PUN,`END`PLN jumper`END`PUN)`END`PLN `END`PUN-&gt;`END`PLN\n' +
    '    `END`KWDsuper`END`PLN name\n' +
    '    `END`LIT@capable`END`PLN `END`PUN=`END`PLN jumper\n' +
    '  step`END`PUN:`END`PLN `END`PUN-&gt;`END`PLN\n' +
    '    alert `END`STR\'\'\'\n' +
    '          Step,\n' +
    '          step...\n' +
    '          \'\'\'`END`PLN\n' +
    '  jump`END`PUN:`END`PLN `END`PUN-&gt;`END`PLN\n' +
    '    `END`LIT@capable`END`PLN\n' +
    '  move`END`PUN:`END`PLN `END`PUN(`END`PLNmeters`END`PUN,`END`PLN where`END`PUN)`END`PLN `END`PUN-&gt;`END`PLN\n' +
    '    switch where\n' +
    '      `END`KWDwhen`END`PLN `END`STR"ground"`END`PLN\n' +
    '        `END`LIT@step`END`PUN()`END`PLN\n' +
    '        `END`KWDsuper`END`PLN meters\n' +
    '      `END`KWDwhen`END`PLN `END`STR"hurdle"`END`PLN\n' +
    '        `END`KWDsuper`END`PLN meters `END`KWDif`END`PLN `END`LIT@jump`END`PUN()`END`PLN\n' +
    '\n' +
    '`END`COM# Create horse`END`PLN\n' +
    'tom `END`PUN=`END`PLN `END`KWDnew`END`PLN `END`TYPHorse`END`PLN `END`STR"Tommy"`END`PUN,`END`PLN `END`KWDyes`END`PLN\n' +
    '\n' +
    'street `END`PUN=`END`PLN\n' +
    '  location`END`PUN:`END`PLN `END`STR"ground"`END`PLN\n' +
    '  distance`END`PUN:`END`PLN `END`LIT12`END`PLN\n' +
    'car `END`PUN=`END`PLN\n' +
    '  location`END`PUN:`END`PLN `END`STR"hurdle"`END`PLN\n' +
    '  distance`END`PUN:`END`PLN `END`LIT2`END`PLN\n' +
    '\n' +
    '`END`COM###\n' +
    'Tell him to travel:\n' +
    '1. through the street\n' +
    '2. over the car\n' +
    '###`END`PLN\n' +
    'tom`END`PUN.`END`PLNtravel street`END`PUN,`END`PLN car`END'
  ),
  issue14a: (
    '`COM//comment`END<br>' +
    '`KWDint`END`PLN main`END`PUN(`END`KWDint`END`PLN argc`END`PUN,`END' +
      '`PLN `END`KWDchar`END`PLN `END`PUN**`END`PLNargv`END`PUN)`END' +
      '`PLN\n' +
    '`END`PUN{}`END'
  ),
  issue14b: (
    '`COM&lt;!-- There\'s an `END<acronym title="tag soup">`COMHTML`END' +
      '</acronym>`COM comment in my comment --&gt;`END`PLN\n' +
    '`END`TAG&lt;p&gt;`END' +
      '`PLNAnd another one inside the end tag`END' +
    '`TAG&lt;/p`END`TAG&gt;`END'
  ),
  issue20: (
    '`TAG&lt;html&gt;`END`PLN\n' +
    '\n' +
    '`END`TAG&lt;head&gt;`END'
  ),
  issue21: (
    '`TAG&lt;html&gt;`END`PLN\n' +
    '  `END`TAG&lt;head&gt;`END`PLN\n' +
    '    `END`TAG&lt;title&gt;`END`PLNTest`END' +
      '`TAG&lt;/title&gt;`END`PLN\n' +
    '  `END`TAG&lt;/head&gt;`END`PLN\n' +
    '`END`TAG&lt;/html&gt;`END'
  ),
  issue22: (
    '<span class="nocode">01: `END`COM// This is a line of code`END`PLN\n' +
    '`END<span class="nocode">02: `END`COM/* Multiline comments can\n' +
    '`END<span class="nocode">03: `END`COM * span over and around\n' +
    '`END<span class="nocode">04: `END`COM * line markers\n' +
    '`END<span class="nocode annot">And can even be interrupted`END`COM\n' +
    '`END<span class="nocode annot">by inline code annotations`END`COM\n' +
    '`END<span class="nocode">05: `END`COM *\/`END`PLN\n' +
    '`END<span class="nocode">06: `END`KWDclass`END`PLN `END`TYPMyClass`END' +
      '`PLN `END`KWDextends`END`PLN `END`TYPFoo`END`PLN `END`PUN{`END' +
      '`PLN\n' +
    '`END<span class="nocode">07: `END`PLN  `END`KWDpublic`END' +
      '`PLN `END`KWDstatic`END`PLN `END`KWDvoid`END`PLN main`END`PUN(`END' +
      '`TYPString`END`PUN...`END`PLN argv`END`PUN)`END`PLN `END`PUN{`END' +
      '`PLN\n' +
    '`END<span class="nocode">08: `END`PLN    `END`TYPSystem`END' +
      '`PUN.`END`PLNout`END`PUN.`END`PLNprint`END`PUN(`END' +
      '`STR"Hello World"`END`PUN);`END`PLN\n' +
    '`END<span class="nocode">09: `END`PLN  `END`PUN}`END`PLN\n' +
    '`END<span class="nocode">10: `END`PUN}`END'
  ),
  lua: (
    '`PLNos`END`PUN=`END`PLNrequire`END`PUN(`END`STR"os"`END`PUN)`END`PLN\n' +
    'math`END`PUN=`END`PLNrequire`END`PUN(`END`STR"math"`END`PUN)`END`PLN\n' +
    '\n' +
    '`END`COM-- Examples from the language reference`END`PLN\n' +
    '     a `END`PUN=`END`PLN `END`STR\'alo\\n123"\'`END' +
      '`PLN\n' +
    '     a `END`PUN=`END`PLN `END`STR"alo\\n123\\""`END' +
      '`PLN\n' +
    '     a `END`PUN=`END`PLN `END' +
      '`STR\'\\97lo\\10\\04923"\'`END`PLN\n' +
    '     a `END`PUN=`END`PLN `END`STR[[alo\n' +
    '     123"]]`END`PLN\n' +
    '     a `END`PUN=`END`PLN `END`STR[==[\n' +
    '     alo\n' +
    '     123"]==]`END`PLN\n' +
    '\n' +
    '`END`LIT3`END`PLN   `END`LIT3.0`END`PLN   `END`LIT3.1416`END' +
      '`PLN   `END`LIT314.16e-2`END`PLN   `END`LIT0.31416E1`END' +
      '`PLN   `END`LIT0xff`END`PLN   `END`LIT0x56`END`PLN\n' +
    '\n' +
    '`END`COM-- Some comments that demonstrate long brackets`END`PLN\n' +
    'double_quoted `END`PUN=`END`PLN `END`STR"Not a long bracket [=["`END' +
      '`PLN\n' +
    '`END`COM--[=[ quoting out\n' +
    ' [[ foo ]]\n' +
    ' [==[does not end comment either]==]\n' +
    ']=]`END`PLN\n' +
    'past_end_of_comment\n' +
    '`END`COM--]=]`END`PLN\n' +
    '\n' +
    '`END`COM-- Example code courtesy Joseph Harmbruster`END`PLN\n' +
    '`END`PUN#`END`PLN\n' +
    '`END`KWDdo`END`PLN\n' +
    '  `END`KWDlocal`END`PLN `END`KWDfunction`END`PLN ssgeneral`END' +
      '`PUN(`END`PLNt`END`PUN,`END`PLN n`END`PUN,`END`PLN before`END' +
      '`PUN)`END`PLN\n' +
    '    `END`KWDfor`END`PLN _`END`PUN,`END`PLN h `END`KWDin`END' +
      '`PLN ipairs`END`PUN(`END`PLNincs`END`PUN)`END`PLN `END`KWDdo`END' +
      '`PLN\n' +
    '      `END`KWDfor`END`PLN i `END`PUN=`END`PLN h `END' +
      '`PUN+`END`PLN `END`LIT1`END`PUN,`END`PLN n `END`KWDdo`END`PLN\n' +
    '        `END`KWDlocal`END`PLN v `END`PUN=`END' +
      '`PLN t`END`PUN[`END`PLNi`END`PUN]`END`PLN\n' +
    '        `END`KWDfor`END`PLN j `END`PUN=`END' +
      '`PLN i `END`PUN-`END`PLN h`END`PUN,`END`PLN `END`LIT1`END`PUN,`END' +
      '`PLN `END`PUN-`END`PLNh `END`KWDdo`END`PLN\n' +
    '          `END`KWDlocal`END`PLN testval `END' +
      '`PUN=`END`PLN t`END`PUN[`END`PLNj`END`PUN]`END`PLN\n' +
    '          `END`KWDif`END`PLN `END`KWDnot`END' +
      '`PLN before`END`PUN(`END`PLNv`END`PUN,`END`PLN testval`END' +
      '`PUN)`END`PLN `END`KWDthen`END`PLN `END`KWDbreak`END`PLN `END' +
      '`KWDend`END`PLN\n' +
    '          t`END`PUN[`END`PLNi`END`PUN]`END' +
      '`PLN `END`PUN=`END`PLN testval`END`PUN;`END`PLN i `END`PUN=`END' +
      '`PLN j\n' +
    '        `END`KWDend`END`PLN\n' +
    '        t`END`PUN[`END`PLNi`END`PUN]`END`PLN `END' +
      '`PUN=`END`PLN v\n' +
    '      `END`KWDend`END`PLN \n' +
    '    `END`KWDend`END`PLN\n' +
    '    `END`KWDreturn`END`PLN t\n' +
    '  `END`KWDend`END`PLN\n' +
    '\n' +
    '  `END`KWDfunction`END`PLN shellsort`END`PUN(`END`PLNt`END' +
      '`PUN,`END`PLN before`END`PUN,`END`PLN n`END`PUN)`END`PLN\n' +
    '    n `END`PUN=`END`PLN n `END`KWDor`END`PLN `END`PUN#`END' +
      '`PLNt\n' +
    '    `END`KWDif`END`PLN `END`KWDnot`END`PLN before `END' +
      '`KWDor`END`PLN before `END`PUN==`END`PLN `END`STR"&lt;"`END' +
      '`PLN `END`KWDthen`END`PLN `END`KWDreturn`END`PLN ssup`END`PUN(`END' +
      '`PLNt`END`PUN,`END`PLN n`END`PUN)`END`PLN\n' +
    '    `END`KWDelseif`END`PLN before `END`PUN==`END`PLN `END' +
      '`STR"&gt;"`END`PLN `END`KWDthen`END`PLN `END`KWDreturn`END' +
      '`PLN ssdown`END`PUN(`END`PLNt`END`PUN,`END`PLN n`END`PUN)`END' +
      '`PLN\n' +
    '    `END`KWDelse`END`PLN `END`KWDreturn`END' +
      '`PLN ssgeneral`END`PUN(`END`PLNt`END`PUN,`END`PLN n`END`PUN,`END' +
      '`PLN before`END`PUN)`END`PLN\n' +
    '    `END`KWDend`END`PLN\n' +
    '  `END`KWDend`END`PLN\n' +
    '  `END`KWDreturn`END`PLN shellsort\n' +
    '`END`KWDend`END'
  ),
  vbs: (
    '`KWDImports`END`PLN System\n' +
    '\n' +
    '`END`KWDClass`END`PLN [class]\n' +
    '    `END`KWDShared`END`PLN `END`KWDSub`END`PLN [shared]`END' +
      '`PUN(`END`KWDByVal`END`PLN [boolean] `END`KWDAs`END`PLN `END' +
      '`KWDBoolean`END`PUN)`END`PLN\n' +
    '        `END`KWDIf`END`PLN [boolean] `END' +
      '`KWDThen`END`PLN\n' +
    '            Console`END`PUN.`END' +
      '`PLNWriteLine`END`PUN(`END`STR"true"`END`PUN)`END`PLN\n' +
    '        `END`KWDElse`END`PLN\n' +
    '            Console`END`PUN.`END' +
      '`PLNWriteLine`END`PUN(`END`STR"false"`END`PUN)`END`PLN\n' +
    '        `END`KWDEnd`END`PLN `END`KWDIf`END' +
      '`PLN\n' +
    '    `END`KWDEnd`END`PLN `END`KWDSub`END`PLN\n' +
    '`END`KWDEnd`END`PLN `END`KWDClass`END`PLN\n' +
    '\n' +
    '`END`COM\' Comment`END`PLN\n' +
    '`END`COM\u2018 Second Line comment with a smart quote _\n' +
    '  continued line using VB6 syntax.`END`PLN\n' +
    '`END`KWDModule`END`PLN [module]\n' +
    '    `END`KWDSub`END`PLN Main`END`PUN()`END`PLN\n' +
    '        [class]`END`PUN.`END`PLN[shared]`END' +
      '`PUN(`END`LITTrue`END`PUN)`END`PLN\n' +
    '\n' +
    '        `END`COM\' This prints out: \".`END' +
      '`PLN\n' +
    '        Console`END`PUN.`END`PLNWriteLine`END' +
      '`PUN(`END`STR""""`END`PUN)`END`PLN\n' +
    '\n' +
    '        `END`COM\' This prints out: a"b.`END' +
      '`PLN\n' +
    '        Console`END`PUN.`END`PLNWriteLine`END' +
      '`PUN(`END`STR"a""b"`END`PUN)`END`PLN\n' +
    '\n' +
    '        `END`COM\' This prints out: a.`END' +
      '`PLN\n' +
    '        Console`END`PUN.`END`PLNWriteLine`END' +
      '`PUN(`END`STR"a"c`END`PUN)`END`PLN\n' +
    '\n' +
    '        `END`COM\' This prints out: ".`END' +
      '`PLN\n' +
    '        Console`END`PUN.`END`PLNWriteLine`END' +
      '`PUN(`END`STR""""c`END`PUN)`END`PLN\n' +
    '\n' +
    '        `END`COMREM an old-style comment`END`PLN\n' +
    '        REMOVE`END`PUN(`END`PLNnot_a_comment`END`PUN)`END`PLN\n' +
    '    `END`KWDEnd`END`PLN `END`KWDSub`END`PLN\n' +
    '`END`KWDEnd`END`PLN `END`KWDModule`END`PLN\n' +
    '\n' +
    '`END`KWDDim`END`PLN d `END`KWDAs`END`PLN `END`KWDDate`END`PLN\n' +
    'd `END`PUN=`END`PLN `END`LIT# 8/23/1970 3:45:39AM #`END`PLN\n' +
    'd `END`PUN=`END`PLN `END`LIT# 8/23/1970 #`END`PLN\n' +
    'd `END`PUN=`END`PLN `END`LIT# 3:45:39AM #`END`PLN\n' +
    'd `END`PUN=`END`PLN `END`LIT# 3:45:39 #`END`PLN\n' +
    'd `END`PUN=`END`PLN `END`LIT# 13:45:39 #`END`PLN\n' +
    'd `END`PUN=`END`PLN `END`LIT# 13:45:39PM #`END`PLN\n' +
    '\n' +
    '`END`KWDDim`END`PLN n `END`KWDAs`END`PLN Float\n' +
    'n `END`PUN=`END`PLN `END`PUN(`END`LIT0.0`END`PUN,`END`PLN `END' +
      '`LIT.99F`END`PUN,`END`PLN `END`LIT1.0E-2D`END`PUN,`END`PLN `END' +
      '`LIT1.0E+3D`END`PUN,`END`PLN `END`LIT.5E4`END`PUN,`END`PLN `END' +
      '`LIT1E3R`END`PUN,`END`PLN `END`LIT4D`END`PUN)`END`PLN\n' +
    '\n' +
    '`END`KWDDim`END`PLN i `END`KWDAs`END`PLN `END`KWDInteger`END`PLN\n' +
    'i `END`PUN=`END`PLN `END`PUN(`END`LIT0`END`PUN,`END`PLN `END' +
      '`LIT123`END`PUN,`END`PLN `END`LIT45L`END`PUN,`END`PLN `END' +
      '`LIT&amp;HA0I`END`PUN,`END`PLN `END`LIT&amp;O177S`END`PUN)`END'
  ),
  haskell: (
    '`COM-- A comment`END`PLN\n' +
    'Not`END`PUN(--`END`STR"a comment"`END`PUN)`END`PLN\n' +
    'Also.not`END`PUN(--(`END`PLNA.comment`END`PUN))`END`PLN\n' +
    '\n' +
    '`END`KWDmodule`END`PLN Foo`END`PUN(`END`PLNbar`END`PUN)`END`PLN `END' +
      '`KWDwhere`END`PLN\n' +
    '`END`KWDimport`END`PLN Blah\n' +
    '`END`KWDimport`END`PLN BlahBlah`END`PUN(`END`PLNblah`END`PUN)`END' +
      '`PLN\n' +
    '`END`KWDimport`END`PLN Monads`END`PUN(`END`PLNException`END' +
      '`PUN(..),`END`PLN FIO`END`PUN(..),`END`PLNunFIO`END`PUN,`END' +
      '`PLNhandle`END`PUN,`END`PLNrunFIO`END`PUN,`END`PLNfixFIO`END' +
      '`PUN,`END`PLNfio`END`PUN,`END`PLN\n' +
    '              write`END`PUN,`END' +
      '`PLNwriteln`END`PUN,`END`PLNHasNext`END`PUN(..),`END' +
      '`PLNHasOutput`END`PUN(..))`END`PLN\n' +
    '\n' +
    '`END`COM{- nested comments\n' +
    ' - don\'t work {-yet-}`END`PLN `END`PUN-}`END`PLN\n' +
    '`END`KWDinstance`END`PLN Thingy Foo `END`KWDwhere`END`PLN\n' +
    '  a `END`PUN=`END`PLN b\n' +
    '\n' +
    '`END`KWDdata`END`PLN Foo `END`PUN::`END`PLN `END`PUN(*`END`PLN `END' +
      '`PUN-&gt;`END`PLN `END`PUN*`END`PLN `END`PUN-&gt;`END`PLN `END' +
      '`PUN*)`END`PLN `END`PUN-&gt;`END`PLN `END`PUN*`END`PLN `END' +
      '`PUN&gt;`END`PLN `END`PUN*`END`PLN `END`PUN-&gt;`END`PLN `END' +
      '`PUN*`END`PLN `END`KWDwhere`END`PLN\n' +
    '  Nil `END`PUN::`END`PLN Foo a b c\n' +
    '  Cons `END`PUN::`END`PLN a b c `END`PUN-&gt;`END' +
      '`PLN Foo abc `END`PUN-&gt;`END`PLN Foo a b c\n' +
    '\n' +
    'str `END`PUN=`END`PLN `END`STR"Foo\\\\Bar"`END`PLN\n' +
    'char `END`PUN=`END`PLN `END`STR\'x\'`END`PLN\n' +
    'Not.A.Char `END`PUN=`END`PLN `END`STR\'t`END`PLNoo long\'  `END' +
      '`COM-- Don\'t barf.  Show that \'t is a lexical error.`END' +
      '`PLN\n' +
    '\n' +
    '`END`PUN(`END`PLNident`END`PUN,`END`PLN ident\'`END`PUN,`END' +
      '`PLN Fo\'\'o.b\'ar`END`PUN)`END`PLN\n' +
    '\n' +
    '`END`PUN(`END`LIT0`END`PUN,`END`PLN `END`LIT12`END`PUN,`END`PLN `END' +
      '`LIT0x45`END`PUN,`END`PLN `END`LIT0xA7`END`PUN,`END`PLN `END' +
      '`LIT0o177`END`PUN,`END`PLN `END`LIT0O377`END`PUN,`END`PLN `END' +
      '`LIT0.1`END`PUN,`END`PLN `END`LIT1.0`END`PUN,`END`PLN `END' +
      '`LIT1e3`END`PUN,`END`PLN `END`LIT0.5E-3`END`PUN,`END`PLN `END' +
      '`LIT1.0E+45`END`PUN)`END'
  ),
  ml: (
    '`COM(*\n' +
    ' * Print the 10th fibonacci number\n' +
    ' *)`END`PLN\n' +
    '\n' +
    '`END`COM//// A line comment`END`PLN\n' +
    '`END`STR"A string"`END`PUN;;`END`PLN\n' +
    '`END`PUN(`END`LIT0`END`PUN,`END`PLN `END`LIT125`END`PUN,`END' +
      '`PLN `END`LIT0xa0`END`PUN,`END`PLN `END`LIT-1.0`END`PUN,`END' +
      '`PLN `END`LIT1e6`END`PUN,`END`PLN `END`LIT1.2e-3`END`PUN);;`END' +
      '`PLN  `END`COM// number literals`END`PLN\n' +
    '\n' +
    '`END`COM#if fibby`END`PLN\n' +
    '  `END`KWDlet`END`PLN\n' +
    '    `END`KWDrec`END`PLN fib `END`PUN=`END`PLN `END' +
      '`KWDfunction`END`PLN `END`PUN(`END`LIT0`END`PUN,`END`PLN a`END' +
      '`PUN,`END`PLN _`END`PUN)`END`PLN `END`PUN-&gt;`END`PLN a\n' +
    '                    ' +
      ' `END`PUN|`END`PLN `END`PUN(`END`PLNn`END`PUN,`END`PLN a`END' +
      '`PUN,`END`PLN b`END`PUN)`END`PLN `END`PUN-&gt;`END`PLN fib`END' +
      '`PUN(`END`PLNn `END`PUN-`END`PLN `END`LIT1`END`PUN,`END' +
      '`PLN a `END`PUN+`END`PLN b`END`PUN,`END`PLN a`END`PUN)`END' +
      '`PLN\n' +
    '  `END`KWDin`END`PLN\n' +
    '    print_int`END`PUN(`END`PLNfib`END`PUN(`END`LIT10`END' +
      '`PUN,`END`PLN `END`LIT1`END`PUN,`END`PLN `END`LIT1`END' +
      '`PUN));;`END`PLN\n' +
    '`END`COM#endif`END`PLN\n' +
    '\n' +
    '`END`KWDlet`END`PLN zed `END`PUN=`END`PLN `END`STR\'z\'`END`PLN\n' +
    '\n' +
    '`END`KWDlet`END`PLN f\' x\' `END`PUN=`END`PLN x\' `END`PUN+`END`PLN `END`LIT1`END'
  ),
  lisp: (
    '`COM; -*- mode: lisp -*-`END`PLN\n' +
    '\n' +
    '`END`OPN(`END`KWDdefun`END`PLN back-six-lines `END`OPN(`END`CLO)`END' +
      '`PLN `END`OPN(`END`PLNinteractive`END`CLO)`END`PLN `END`OPN(`END' +
      '`PLNforward-line `END`LIT-6`END`CLO))`END`PLN\n' +
    '`END`OPN(`END`KWDdefun`END`PLN forward-six-lines `END`OPN(`END' +
      '`CLO)`END`PLN `END`OPN(`END`PLNinteractive`END`CLO)`END`PLN `END' +
      '`OPN(`END`PLNforward-line `END`LIT6`END`CLO))`END`PLN\n' +
    '\n' +
    '`END`OPN(`END`PLNglobal-set-key `END`STR"\\M-l"`END`PLN `END' +
      '`LIT\'goto-line`END`CLO)`END`PLN\n' +
    '`END`OPN(`END`PLNglobal-set-key `END`STR"\\C-z"`END`PLN `END' +
      '`LIT\'advertised-undo`END`CLO)`END`PLN\n' +
    '`END`OPN(`END`PLNglobal-set-key `END`PUN[`END`PLNC-insert`END' +
      '`PUN]`END`PLN `END`LIT\'clipboard-kill-ring-save`END`CLO)`END' +
      '`PLN\n' +
    '`END`OPN(`END`PLNglobal-set-key `END`PUN[`END`PLNS-insert`END`PUN]`END' +
      '`PLN `END`LIT\'clipboard-yank`END`CLO)`END`PLN\n' +
    '`END`OPN(`END`PLNglobal-set-key `END`PUN[`END`PLNC-up`END`PUN]`END' +
      '`PLN `END`LIT\'back-six-lines`END`CLO)`END`PLN\n' +
    '`END`OPN(`END`PLNglobal-set-key `END`PUN[`END`PLNC-down`END`PUN]`END' +
      '`PLN `END`LIT\'forward-six-lines`END`CLO)`END`PLN\n' +
    '\n' +
    '`END`OPN(`END`KWDsetq`END`PLN visible-bell `END`KWDt`END`CLO)`END' +
      '`PLN\n' +
    '`END`OPN(`END`KWDsetq`END`PLN user-mail-address `END' +
      '`STR"foo@bar.com"`END`CLO)`END`PLN\n' +
    '`END`OPN(`END`KWDsetq`END`PLN default-major-mode `END' +
      '`LIT\'text-mode`END`CLO)`END`PLN\n' +
    '\n' +
    '`END`OPN(`END`PLNsetenv `END`STR"TERM"`END`PLN `END' +
      '`STR"emacs"`END`CLO)`END`PLN\n' +
    '`END`OPN(`END`PLNc-set-offset `END`LIT\'case-label`END`PLN `END' +
      '`LIT2`END`CLO)`END`PLN\n' +
    '`END`OPN(`END`KWDsetq`END`PLN c-basic-offset `END`LIT2`END`CLO)`END' +
      '`PLN\n' +
    '`END`OPN(`END`KWDsetq`END`PLN perl-indent-level `END`LIT0x2`END`CLO)`END' +
      '`PLN\n' +
    '`END`OPN(`END`KWDsetq`END`PLN delete-key-deletes-forward `END`KWDt`END' +
      '`CLO)`END`PLN\n' +
    '`END`OPN(`END`KWDsetq`END`PLN indent-tabs-mode `END`KWDnil`END' +
      '`CLO)`END`PLN\n' +
    '\n' +
    '`END`COM;; Text mode`END`PLN\n' +
    '`END`OPN(`END`PLNadd-hook `END`LIT\'text-mode-hook`END`PLN \n' +
    '  `END`LIT\'`END`OPN(`END`KWDlambda`END`PLN `END`OPN(`END' +
      '`CLO)`END`PLN\n' +
    '     `END`OPN(`END`PLNturn-on-auto-fill`END`CLO)`END' +
      '`PLN\n' +
    '   `END`CLO)`END`PLN\n' +
    '`END`CLO)`END`PLN\n' +
    '\n' +
    '`END`COM;; Fundamental mode`END`PLN\n' +
    '`END`OPN(`END`PLNadd-hook `END`LIT\'fundamental-mode-hook`END' +
      '`PLN \n' +
    '  `END`LIT\'`END`OPN(`END`KWDlambda`END`PLN `END`OPN(`END' +
      '`CLO)`END`PLN\n' +
    '     `END`OPN(`END`PLNturn-on-auto-fill`END' +
      '`CLO)`END`PLN\n' +
    '   `END`CLO)`END`PLN\n' +
    '`END`CLO)`END`PLN\n' +
    '\n' +
    '`END`COM;; Define and cond are keywords in scheme`END`PLN\n' +
    '`END`OPN(`END`KWDdefine`END`PLN `END`OPN(`END`PLNsqt x`END`CLO)`END' +
      '`PLN `END`OPN(`END`PLNsqrt-iter `END`LIT1.0`END`PLN `END' +
      '`LIT2.0`END`PLN x`END`CLO))`END'
  ),
  issue45: (
    '`KWDthrow`END`PLN `END`KWDnew`END`PLN `END`TYPRuntimeException`END' +
      '`PUN(`END`STR"Element ["`END`PLN `END`PUN+`END`PLN element`END' +
      '`PUN.`END`PLNgetName`END`PUN()`END`PLN `END`PUN+`END`PLN \n' +
    '  `END`STR"] missing attribute."`END`PUN);`END`PLN\n' +
    'variable`END`PUN++;`END'
  ),
  proto: (
    '`KWDmessage`END`PLN `END`TYPSearchRequest`END`PLN `END`PUN{`END' +
      '`PLN\n' +
    '  `END`KWDrequired`END`PLN `END`TYPstring`END`PLN query `END' +
      '`PUN=`END`PLN `END`LIT1`END`PUN;`END`PLN\n' +
    '  `END`KWDoptional`END`PLN `END`TYPint32`END`PLN page_number `END' +
      '`PUN=`END`PLN `END`LIT2`END`PUN;`END`PLN\n' +
    '  `END`KWDoptional`END`PLN `END`TYPint32`END' +
      '`PLN result_per_page `END`PUN=`END`PLN `END`LIT3`END`PLN `END' +
      '`PUN[`END`KWDdefault`END`PLN `END`PUN=`END`PLN `END`LIT10`END' +
      '`PUN];`END`PLN\n' +
    '  `END`KWDenum`END`PLN `END`TYPCorpus`END`PLN `END`PUN{`END' +
      '`PLN\n' +
    '    UNIVERSAL `END`PUN=`END`PLN `END`LIT0`END`PUN;`END' +
      '`PLN\n' +
    '    WEB `END`PUN=`END`PLN `END`LIT1`END`PUN;`END`PLN\n' +
    '    IMAGES `END`PUN=`END`PLN `END`LIT2`END`PUN;`END`PLN\n' +
    '    LOCAL `END`PUN=`END`PLN `END`LIT3`END`PUN;`END`PLN\n' +
    '    NEWS `END`PUN=`END`PLN `END`LIT4`END`PUN;`END`PLN\n' +
    '    PRODUCTS `END`PUN=`END`PLN `END`LIT5`END`PUN;`END' +
      '`PLN\n' +
    '    VIDEO `END`PUN=`END`PLN `END`LIT6`END`PUN;`END`PLN\n' +
    '  `END`PUN}`END`PLN\n' +
    '  `END`KWDoptional`END`PLN `END`TYPCorpus`END`PLN corpus `END' +
      '`PUN=`END`PLN `END`LIT4`END`PLN `END`PUN[`END`KWDdefault`END' +
      '`PLN `END`PUN=`END`PLN UNIVERSAL`END`PUN];`END`PLN\n' +
    '`END`PUN}`END'
  ),
  wiki: (
    '`KWD#summary`END`PLN hello world\n' +
    '`END`KWD#labels`END`PLN `END`LITHelloWorld`END`PLN `END' +
      '`LITWikiWord`END`PLN Hiya\n' +
    '\n' +
    '`END`PUN[`END' +
      '`STRhttp://www.google.com/?q=WikiSyntax+site:code.google.com`END' +
      '`PLN `END`LITWikiSyntax`END`PUN]`END`PLN\n' +
    '\n' +
    'Lorem Ipsum ``END`KWDwhile`END`PLN `END`PUN(`END`LIT1`END' +
      '`PUN)`END`PLN `END`KWDprint`END`PUN(`END`STR"blah blah"`END' +
      '`PUN);`END`PLN`\n' +
    '\n' +
    '   `END`PUN*`END`PLN Bullet\n' +
    '   `END`PUN*`END`PLN Points\n' +
    '      `END`PUN*`END`PLN `END`LITNestedBullet`END' +
      '`PLN\n' +
    '\n' +
    '`END`PUN==`END`LITDroningOnAndOn`END`PUN==`END`PLN\n' +
    '{{{\n' +
    '  `END`COM// Some EmbeddedSourceCode`END`PLN\n' +
    '  `END`KWDvoid`END`PLN main`END`PUN()`END`PLN `END`PUN{`END' +
      '`PLN\n' +
    '    `END`TYPPrint`END`PUN(`END`STR\'hello world\'`END' +
      '`PUN);`END`PLN\n' +
    '  `END`PUN}`END`PLN\n' +
    '}}}\n' +
    '\n' +
    '{{{\n' +
    '  `END`COM&lt;!-- Embedded XML --&gt;`END`PLN\n' +
    '  `END`TAG&lt;foo`END`PLN `END`ATNbar`END`PUN=`END' +
      '`ATV"baz"`END`TAG&gt;&lt;boo`END`PLN `END' +
      '`TAG/&gt;&lt;foo&gt;`END`PLN\n' +
    '}}}`END'
  ),
  css: (
    '`COM&lt;!--`END`PLN\n' +
    '`END`KWD@charset`END`PUN(`END`STR\'UTF-8\'`END`PUN);`END`PLN\n' +
    '\n' +
    '`END`COM/** A url that is not quoted. *\/`END`PLN\n' +
    '`END`KWD@import`END`PUN(`END`KWDurl`END`PUN(`END`STR/more-styles.css`END' +
      '`PUN));`END`PLN\n' +
    '\n' +
    'HTML `END`PUN{`END`PLN `END`KWDcontent-before`END`PUN:`END`PLN `END' +
      '`STR\'hello\\20\'`END`PUN;`END`PLN `END`KWDcontent-after`END' +
      '`PUN:`END`PLN `END`STR\'w\\6f rld\'`END`PUN;`END`PLN\n' +
    '       `END`KWD-moz-spiff`END`PUN:`END`PLN `END' +
      '`KWDinherit`END`PLN `END`KWD!important`END`PLN `END`PUN}`END' +
      '`PLN\n' +
    '\n' +
    '`END`COM/* Test units on numbers. *\/`END`PLN\n' +
    'BODY `END`PUN{`END`PLN `END`KWDmargin-bottom`END`PUN:`END`PLN `END' +
      '`LIT4px`END`PUN;`END`PLN `END`KWDmargin-left`END`PUN:`END' +
      '`PLN `END`LIT3in`END`PUN;`END`PLN `END`KWDmargin-bottom`END' +
      '`PUN:`END`PLN `END`LIT0`END`PUN;`END`PLN `END`KWDmargin-top`END' +
      '`PUN:`END`PLN `END`LIT5%`END`PLN `END`PUN}`END`PLN\n' +
    '\n' +
    '`END`COM/** Test number literals and quoted values. *\/`END`PLN\n' +
    'TABLE`END`PUN.`END`PLNfoo TR`END`PUN.`END`PLNbar A`END`PUN#`END' +
      '`PLNvisited `END`PUN{`END`PLN `END`KWDcolor`END`PUN:`END`PLN `END' +
      '`LIT#001123`END`PUN;`END`PLN `END`KWDfont-family`END`PUN:`END' +
      '`PLN `END`STR"monospace"`END`PLN `END`PUN}`END`PLN\n' +
    '`END`COM/** bolder is not a name, so should be plain. ' +
      ' !IMPORTANT is a keyword\n' +
    '  * regardless of case.\n' +
    '  *\/`END`PLN\n' +
    'blink `END`PUN{`END`PLN `END`KWDtext-decoration`END`PUN:`END' +
      '`PLN BLINK `END`KWD!IMPORTANT`END`PUN;`END`PLN `END' +
      '`KWDfont-weight`END`PUN:`END`PLN bolder `END`PUN}`END`PLN\n' +
    '`END`COM/* Empty url() was causing infinite recursion */`END`PLN\n' +
    'a `END`PUN{`END`PLN `END`KWDbackground-image`END`PUN:`END`PLN ' +
      '`END`KWDurl`END`PUN();`END`PLN `END`PUN}`END`PLN\n' +
    'p`END`PUN#`END`PLNfeatured`END`PUN{`END`KWDbackground`END`PUN:`END`LIT#fea`END`PUN}`END`PLN\n' +
    '`END`COM--&gt;`END'
  ),
  css_style: (
    '`TAG&lt;style`END`PLN `END`ATNtype`END`PUN=`END`ATV\'text/css\'`END' +
      '`TAG&gt;`END`PLN\n' +
    '`END`COM/* desert scheme ported from vim to google prettify */`END' +
      '`PLN\n' +
    'code`END`PUN.`END`PLNprettyprint `END`PUN{`END`PLN `END' +
      '`KWDdisplay`END`PUN:`END`PLN block`END`PUN;`END`PLN `END' +
      '`KWDpadding`END`PUN:`END`PLN `END`LIT2px`END`PUN;`END`PLN `END' +
      '`KWDborder`END`PUN:`END`PLN `END`LIT1px`END`PLN solid `END' +
      '`LIT#888`END`PUN;`END`PLN\n' +
    '`END`KWDbackground-color`END`PUN:`END`PLN `END`LIT#333`END`PUN;`END' +
      '`PLN `END`PUN}`END`PLN\n' +
    '`END`PUN.`END`PLNstr `END`PUN{`END`PLN `END`KWDcolor`END`PUN:`END' +
      '`PLN `END`LIT#ffa0a0`END`PUN;`END`PLN `END`PUN}`END`PLN `END' +
      '`COM/* string  - pink */`END`PLN\n' +
    '`END`PUN.`END`PLNkwd `END`PUN{`END`PLN `END`KWDcolor`END`PUN:`END' +
      '`PLN `END`LIT#f0e68c`END`PUN;`END`PLN `END`KWDfont-weight`END' +
      '`PUN:`END`PLN bold`END`PUN;`END`PLN `END`PUN}`END`PLN\n' +
    '`END`PUN.`END`PLNcom `END`PUN{`END`PLN `END`KWDcolor`END`PUN:`END' +
      '`PLN `END`LIT#87ceeb`END`PUN;`END`PLN `END`PUN}`END`PLN `END' +
      '`COM/* comment - skyblue */`END`PLN\n' +
    '`END`PUN.`END`PLNtyp `END`PUN{`END`PLN `END`KWDcolor`END`PUN:`END' +
      '`PLN `END`LIT#98fb98`END`PUN;`END`PLN `END`PUN}`END`PLN `END' +
      '`COM/* type    - lightgreen */`END`PLN\n' +
    '`END`PUN.`END`PLNlit `END`PUN{`END`PLN `END`KWDcolor`END`PUN:`END' +
      '`PLN `END`LIT#cd5c5c`END`PUN;`END`PLN `END`PUN}`END`PLN `END' +
      '`COM/* literal - darkred */`END`PLN\n' +
    '`END`PUN.`END`PLNpun `END`PUN{`END`PLN `END`KWDcolor`END`PUN:`END' +
      '`PLN `END`LIT#fff`END`PUN;`END`PLN `END`PUN}`END`PLN    `END' +
      '`COM/* punctuation */`END`PLN\n' +
    '`END`PUN.`END`PLNpln `END`PUN{`END`PLN `END`KWDcolor`END`PUN:`END' +
      '`PLN `END`LIT#fff`END`PUN;`END`PLN `END`PUN}`END`PLN    `END' +
      '`COM/* plaintext */`END`PLN\n' +
    '`END`PUN.`END`PLNtag `END`PUN{`END`PLN `END`KWDcolor`END`PUN:`END' +
      '`PLN `END`LIT#f0e68c`END`PUN;`END`PLN `END`KWDfont-weight`END' +
      '`PUN:`END`PLN bold`END`PUN;`END`PLN `END`PUN}`END`PLN `END' +
      '`COM/* html/xml tag    - lightyellow*/`END`PLN\n' +
    '`END`PUN.`END`PLNatn `END`PUN{`END`PLN `END`KWDcolor`END`PUN:`END' +
      '`PLN `END`LIT#bdb76b`END`PUN;`END`PLN `END`KWDfont-weight`END' +
      '`PUN:`END`PLN bold`END`PUN;`END`PLN `END`PUN}`END`PLN `END' +
      '`COM/* attribute name  - khaki*/`END`PLN\n' +
    '`END`PUN.`END`PLNatv `END`PUN{`END`PLN `END`KWDcolor`END`PUN:`END' +
      '`PLN `END`LIT#ffa0a0`END`PUN;`END`PLN `END`PUN}`END`PLN `END' +
      '`COM/* attribute value - pink */`END`PLN\n' +
    '`END`PUN.`END`PLNdec `END`PUN{`END`PLN `END`KWDcolor`END`PUN:`END' +
      '`PLN `END`LIT#98fb98`END`PUN;`END`PLN `END`PUN}`END`PLN `END' +
      '`COM/* decimal         - lightgreen */`END`PLN\n' +
    '`END`TAG&lt;/style&gt;`END'
  ),
  issue84: '`KWDsuper`END`PUN(`END`STR"&amp;nbsp;"`END`PUN);`END',
  issue86_0: '`COM#One Two words`END',
  issue86_1: (
    '`COM#One`END`PLN\n' +
    '`END`TYPTwo`END`PLN lines`END'
  ),
  issue86_2: (
    '`COM#One`END`PLN\n' +
    '`END`TYPTwo`END`PLN lines`END'
  ),
  issue86_3: (
    '`COM#One`END`PLN\n' +
    '`END`TYPTwo`END`PLN lines`END'
  ),
  issue86_4: (
    '`COM#One`END`PLN\n' +
    '`END`TYPTwo`END`PLN lines`END'
  ),
  issue86_5: (
    '`COM#One`END<br>`PLN ' +
    '`END`TYPTwo`END`PLN lines`END'
  ),
  issue92: (
    '`PUN&lt;?`END`PLNxml version`END`PUN=`END`STR"1.0"`END`PLN encoding`END`PUN=`END' +
      '`STR"UTF-8"`END`PUN?&gt;`END`PLN\n' +
    '`END`TAG&lt;kml`END`PLN `END`ATNxmlns`END`PUN=`END`ATV"http://www.opengis.net/kml/2.2"`END' +
      '`TAG&gt;`END`PLN\n' +
    '  `END`TAG&lt;Placemark&gt;`END`PLN\n' +
    '    `END`TAG&lt;name&gt;`END`PLNSimple placemark`END`TAG&lt;/name&gt;`END`PLN\n' +
    '    `END`TAG&lt;description`END' +
      '`PLN `END`ATNLang`END`PUN=`END`ATV"en"`END`TAG&gt;`END' +
      '`PLNAttached to the ground.' +
      ' Intelligently places itself \n' +
    '       at the height of the underlying terrain.`END' +
      '`TAG&lt;/description&gt;`END`PLN\n' +
    '    `END`TAG&lt;Point&gt;`END`PLN\n' +
    '      `END`TAG&lt;coordinates&gt;`END' +
      '`PLN-122.0822035425683,37.42228990140251,0`END`TAG&lt;/coordinates&gt;`END`PLN\n' +
    '    `END`TAG&lt;/Point&gt;`END`PLN\n' +
    '  `END`TAG&lt;/Placemark&gt;`END`PLN\n' +
    '`END`TAG&lt;/kml&gt;`END'
  ),
  cs_verbatim: (
    '`COM// The normal string syntax`END`PLN\n' +
    '`END`KWDstring`END`PLN a `END`PUN=`END`PLN `END`STR"C:\\\\"`END`PUN;`END`PLN\n' +
    '`END`COM// is equivalent to a verbatim string`END`PLN\n' +
    '`END`KWDstring`END`PLN b `END`PUN=`END`PLN `END`STR@"C:\\"`END`PUN;`END'
  ),
  vhdl: (
    '`KWDlibrary`END`PLN ieee`END`PUN;`END`PLN\n' +
    '`END`KWDuse`END`PLN ieee`END`PUN.`END`PLNstd_logic_1164`END`PUN.`END`KWDall`END`PUN;`END`PLN\n' +
    '`END`KWDuse`END`PLN ieee`END`PUN.`END`PLNnumeric_std`END`PUN.`END`KWDall`END`PUN;`END`PLN\n' +
    '\n' +
    '`END`COM-- A line comment`END`PLN\n' +
    '`END`KWDentity`END`PLN foo_entity `END`KWDis`END`PLN\n' +
    '\n' +
    '  `END`KWDgeneric`END`PLN `END`PUN(`END`COM-- comment after punc`END`PLN\n' +
    '    a `END`PUN:`END`PLN `END`TYPnatural`END`PLN `END`PUN:=`END' +
      '`PLN `END`LIT42`END`PUN;`END`PLN\n' +
    '    x `END`PUN:`END`PLN `END`TYPreal`END`PLN `END' +
      '`PUN:=`END`PLN `END`LIT16#ab.cd#-3`END`PLN\n' +
    '  `END`PUN);`END`PLN\n' +
    '  `END`KWDport`END`PLN `END`PUN(`END`PLN\n' +
    '    clk_i `END`PUN:`END`PLN `END`KWDin`END`PLN  `END`TYPstd_logic`END`PUN;`END`PLN\n' +
    '    b_i   `END`PUN:`END`PLN `END`KWDin`END`PLN  `END`TYPnatural`END`PLN `END`KWDrange`END`PLN `END`LIT0`END`PLN `END`KWDto`END`PLN `END`LIT100`END`PUN;`END`PLN\n' +
    '    c_o   `END`PUN:`END`PLN `END`KWDout`END`PLN `END`TYPstd_logic_vector`END`PUN(`END`LIT5`END`PLN `END`KWDdownto`END`PLN `END`LIT0`END`PUN);`END`PLN\n' +
    '    \\a "name"\\ `END`PUN:`END`PLN `END`KWDout`END`PLN `END`TYPinteger`END`PLN  `END`COM-- extended identifier`END`PLN\n' +
    '  `END`PUN);`END`PLN\n' +
    '\n' +
    '`END`KWDend`END`PLN `END`KWDentity`END`PLN foo_entity`END`PUN;`END`PLN\n' +
    '\n' +
    '`END`KWDarchitecture`END`PLN foo_architecture `END`KWDof`END`PLN foo_entity `END`KWDis`END`PLN\n' +
    '  `END`KWDsignal`END`PLN bar_s `END`PUN:`END`PLN `END`TYPstd_logic_vector`END`PUN(`END`LIT2`END`PLN `END`KWDdownto`END`PLN `END`LIT0`END`PUN);`END`PLN\n' +
    '`END`KWDbegin`END`PLN\n' +
    '  \n' +
    '  bar_s `END`PUN&lt;=`END`PLN `END`STRb"101"`END`PUN;`END`PLN\n' +
    '\n' +
    '  dummy_p `END`PUN:`END`PLN `END`KWDprocess`END`PLN `END`PUN(`END`PLNclk_i`END`PUN)`END`PLN\n' +
    '  `END`KWDbegin`END`PLN\n' +
    '    `END`KWDif`END`PLN b_i `END`PUN=`END`PLN `END`LIT1`END`PLN `END`KWDthen`END`PLN\n' +
    '      c_o `END`PUN&lt;=`END`PLN `END`PUN(`END`KWDothers`END`PLN `END`PUN=&gt;`END`PLN `END`STR\'0\'`END`PUN);`END`PLN\n' +
    '    `END`KWDelsif`END`PLN rising_edge`END`PUN(`END`PLNclk_i`END`PUN)`END`PLN `END`KWDthen`END`PLN\n' +
    '      c_o `END`PUN&lt;=`END`PLN `END`STR"1011"`END`PLN `END`PUN&amp;`END`PLN bar_s`END`PUN(`END`LIT1`END`PLN `END`KWDdownto`END`PLN `END`LIT0`END`PUN);`END`PLN\n' +
    '    `END`KWDend`END`PLN `END`KWDif`END`PUN;`END`PLN\n' +
    '  `END`KWDend`END`PLN `END`KWDprocess`END`PLN dummy_p`END`PUN;`END`PLN\n' +
    '\n' +
    '`END`KWDend`END`PLN `END`KWDarchitecture`END`PLN foo_architecture`END`PUN;`END'
  ),
  yaml1: (
    '`KWDapplication: `END`PLNmirah`END`PUN-`END`PLNlang\n' +
    '`END`KWDversion: `END`PLN1\n' +
    '\n' +
    '`END`COM# Here\'s a comment`END`PLN\n' +
    '`END`KWDhandlers:\n' +
    '`END`PLN  `END`PUN-`END`PLN `END`KWDurl: `END`PLN/red/*\n' +
    '     `END`KWDservlet: `END`PLNmysite.server.TeamServlet\n' +
    '     `END`KWDinit_params:\n' +
    '`END`PLN       `END`KWDteamColor: `END`PLNred\n' +
    '       `END`KWDbgColor: `END`STR"#CC0000"`END`PLN\n' +
    '     `END`KWDname: `END`PLNredteam\n' +
    '  `END`PUN-`END`PLN `END`KWDurl: `END`PLN/blue/*\n' +
    '     `END`KWDservlet: `END`PLNmysite.server.TeamServlet\n' +
    '     `END`KWDinit_params:\n' +
    '`END`PLN       `END`KWDteamColor: `END`PLNblue\n' +
    '       `END`KWDbgColor: `END`STR"#0000CC"`END`PLN\n' +
    '     `END`KWDname: `END`PLNblueteam\n' +
    '  `END`PUN-`END`PLN `END`KWDurl: `END`PLN/register/*\n' +
    '     `END`KWDjsp: `END`PLN/register/start.jsp\n' +
    '  `END`PUN-`END`PLN `END`KWDurl: `END`PLN*.special\n' +
    '     `END`KWDfilter: `END`PLNmysite.server.LogFilterImpl\n' +
    '     `END`KWDinit_params:\n' +
    '`END`PLN       `END`KWDlogType: `END`PLNspecial\n' +
    '  `END'
  ),
  yaml2: (
    '`DEC%YAML 1.1`END`PLN\n' +
    '`END`DEC---\n' +
    '`END`TYP!!map`END`PLN {\n' +
    '  `END`PUN?`END`PLN `END`TYP!!str`END`PLN `END`STR""`END`PLN\n' +
    '  `END`PUN:`END`PLN `END`TYP!!str`END`PLN `END`STR"value"`END`PLN,\n' +
    '  `END`PUN?`END`PLN `END`TYP!!str`END`PLN `END`STR"explicit key"`END`PLN\n' +
    '  `END`PUN:`END`PLN `END`TYP!!str`END`PLN `END`STR"value"`END`PLN,\n' +
    '  `END`PUN?`END`PLN `END`TYP!!str`END`PLN `END`STR"simple key"`END`PLN\n' +
    '  `END`PUN:`END`PLN `END`TYP!!str`END`PLN `END`STR"value"`END`PLN,\n' +
    '  `END`PUN?`END`PLN `END`TYP!!seq`END`PLN [\n' +
    '    `END`TYP!!str`END`PLN `END`STR"collection"`END`PLN,\n' +
    '    `END`TYP!!str`END`PLN `END`STR"simple"`END`PLN,\n' +
    '    `END`TYP!!str`END`PLN `END`STR"key"`END`PLN\n' +
    '  ]\n' +
    '  `END`PUN:`END`PLN `END`TYP!!str`END`PLN `END`STR"value"`END`PLN\n' +
    '}`END'
  ),
  scala: (
    '`COM/* comment 1 *\/`END`PLN\n' +
    '`END`COM/*\n' +
    'comment 2\n' +
    '*\/`END`PLN\n' +
    '`END`COM/* comment / * comment 3 **\/`END`PLN\n' +
    '`END`COM// strings`END`PLN\n' +
    '`END`STR"Hello, World!"`END`PUN,`END`PLN `END`STR"\\n"`END`PUN,`END`PLN\n' +
    '`END`LIT`an-identifier``END`PUN,`END`PLN `END`LIT`\\n``END`PUN,`END`PLN\n' +
    '`END`STR\'A\'`END`PUN,`END`PLN `END`STR\'\\n\'`END`PUN,`END`PLN\n' +
    '`END`LIT\'aSymbol`END`PUN,`END`PLN\n' +
    '`END`STR"""Hello,\n' +
    'World"""`END`PUN,`END`PLN `END`STR"""Hello,\\nWorld"""`END`PUN,`END`PLN\n' +
    '`END`STR"""Hello, "World"!"""`END`PUN,`END`PLN\n' +
    '`END`STR"""Hello, \\"World\\""""`END`PLN\n' +
    '\n' +
    '`END`COM// Numbers`END`PLN\n' +
    '`END`LIT0`END`PLN\n' +
    '`END`LIT0123`END`PLN\n' +
    '`END`LIT0xa0`END`PLN\n' +
    '`END`LIT0XA0L`END`PLN\n' +
    '`END`LIT123`END`PLN\n' +
    '`END`LIT123.45`END`PLN\n' +
    '`END`LIT1.50F`END`PLN\n' +
    '`END`LIT0.50`END`PLN\n' +
    '`END`PUN.`END`LIT50`END`PLN\n' +
    '`END`LIT123e-1`END`PLN\n' +
    '`END`LIT123.45e+1`END`PLN\n' +
    '`END`LIT1.50e2`END`PLN\n' +
    '`END`LIT0.50e-6`END`PLN\n' +
    '`END`PUN.`END`LIT50e+42f`END`PLN\n' +
    '\n' +
    '`END`COM// Values`END`PLN\n' +
    '`END`LITfalse`END`PUN,`END`PLN `END`LITtrue`END`PUN,`END`PLN `END`LITnull`END`PUN,`END`PLN `END`LITthis`END`PUN;`END`PLN\n' +
    '\n' +
    '`END`COM// Keywords`END`PLN\n' +
    '`END`KWDclass`END`PLN `END`TYPMyClass`END`PUN;`END`PLN\n' +
    '`END`KWDimport`END`PLN foo`END`PUN.`END`PLNbar`END`PUN;`END`PLN\n' +
    '`END`KWDpackage`END`PLN baz`END`PUN;`END`PLN\n' +
    '\n' +
    '`END`COM// From scala-lang.org/node/242`END`PLN\n' +
    '`END`KWDdef`END`PLN act`END`PUN()`END`PLN `END`PUN{`END`PLN\n' +
    '  `END`KWDvar`END`PLN pongCount `END`PUN=`END`PLN `END`LIT0`END`PLN\n' +
    '  loop `END`PUN{`END`PLN\n' +
    '    react `END`PUN{`END`PLN\n' +
    '      `END`KWDcase`END`PLN `END`TYPPing`END`PLN `END`PUN=&gt;`END`PLN\n' +
    '        `END`KWDif`END`PLN `END`PUN(`END`PLNpongCount `END`PUN%`END`PLN `END`LIT1000`END`PLN `END`PUN==`END`PLN `END`LIT0`END`PUN)`END`PLN\n' +
    '          `END`TYPConsole`END`PUN.`END`PLNprintln`END`PUN(`END`STR"Pong: ping "`END`PUN+`END`PLNpongCount`END`PUN)`END`PLN\n' +
    '        sender `END`PUN!`END`PLN `END`TYPPong`END`PLN\n' +
    '        pongCount `END`PUN=`END`PLN pongCount `END`PUN+`END`PLN `END`LIT1`END`PLN\n' +
    '      `END`KWDcase`END`PLN `END`TYPStop`END`PLN `END`PUN=&gt;`END`PLN\n' +
    '        `END`TYPConsole`END`PUN.`END`PLNprintln`END`PUN(`END`STR"Pong: stop"`END`PUN)`END`PLN\n' +
    '        exit`END`PUN()`END`PLN\n' +
    '    `END`PUN}`END`PLN\n' +
    '  `END`PUN}`END`PLN\n' +
    '`END`PUN}`END'
  ),
  go: (
    '`PLNpackage main  `END`COM/* Package of which this program is part. *\/`END`PLN\n' +
    '\n' +
    'import fmt "fmt"  `END`COM// Package implementing formatted I/O.`END`PLN\n' +
    '\n' +
    '\n' +
    'func main() {\n' +
    '    fmt.Printf("Hello, world; or \u039a\u03b1\u03bb\u03b7\u03bc\u03ad\u03c1\u03b1 \u03ba\u03cc\u03c3\u03bc\u03b5; or \u3053\u3093\u306b\u3061\u306f \u4e16\u754c\\n")  `END`COM// Semicolon inserted here`END`PLN\n' +
    '}\n' +
    '\n' +
    '`END`COM/* " *\/`END`PLN  "foo /* "  `END`COM/*\/  *\/`END`PLN\n' +
    '`END`COM/* ` *\/`END`PLN  `foo /* `  `END`COM/*\/  *\/`END'
  ),
  erlang: (
    '`COM% Sample comment`END`PLN\n' +
    '\n' +
    '`END`KWD-module`END`PLN(my_test)`END`PUN.`END`PLN\n' +
    '`END`KWD-include_lib`END`PLN(`END`STR"my_sample_lib.hrl"`END`PLN)`END`PUN.`END`PLN\n' +
    '`END`KWD-export`END`PLN([\n' +
    '    test/`END`LIT2`END`PLN\n' +
    '])`END`PUN.`END`PLN\n' +
    '\n' +
    '`END`COM%% @doc Define a macro`END`PLN\n' +
    '`END`KWD-define`END`PLN(my_macro`END`PUN,`END`PLN `END`TYPVariable`END`PLN)`END`PUN.`END`PLN\n' +
    '\n' +
    '`END`COM%% @doc My function`END`PLN\n' +
    'test(`END`TYPVariables`END`PUN,`END`PLN `END`TYPMoreVariables`END`PLN) -&gt;\n' +
    '    `END`COM% Inline comment`END`PLN\n' +
    '    {ok`END`PUN,`END`TYPScanned`END`PUN,`END`TYP_`END`PLN} = my_lib:do_stuff()`END`PUN,`END`PLN\n' +
    '\n' +
    '    `END`TYPVariable`END`PLN = `END`KWDfun`END`PLN(`END`TYPV`END`PLN) -&gt; {ok`END`PUN,`END`PLN `END`TYPV`END`PLN} `END`KWDend`END`PUN,`END`PLN\n' +
    '\n' +
    '    `END`KWDtry`END`PLN `END`LIT?my_macro`END`PLN({value`END`PUN,`END`PLN test}) `END`KWDof`END`PLN\n' +
    '        {value`END`PUN,`END`PLN `END`TYPResult`END`PUN,`END`PLN `END`TYP_`END`PLN} -&gt;\n' +
    '            {ok`END`PUN,`END`PLN `END`TYPResult`END`PLN}\n' +
    '    `END`KWDcatch`END`PLN\n' +
    '        `END`TYPType`END`PLN:`END`TYPError`END`PLN -&gt;\n' +
    '            {`END`LIT\'error\'`END`PUN,`END`PLN `END`TYPType`END`PUN,`END`PLN `END`TYPError`END`PLN}\n' +
    '    `END`KWDend`END`PUN.`END'
  ),
  rust: (
    '`COM// Single line comment`END`PLN\n' +
    '`END`COM/* Multi-line (nesting not highlighted properly, sorry)\n' +
    'comment */`END`PLN\n' +
    '\n' +
    '`END`ATV#![feature(code_prettification)]`END`PLN\n' +
    '\n' +
    '`END`KWDuse`END`PLN std`END`PUN::`END`PLNio`END`PUN::{`END`LITself`END`PUN,`END`PLN Write`END`PUN};`END`PLN\n' +
    '\n' +
    '`END`KWDimpl`END`PUN&lt;`END`TAG\'a`END`PUN,`END`PLN T`END`PUN:`END`PLN `END`TAG\'a`END`PLN `END`PUN+`END`PLN `END`PUN?`END`TYPSized`END`PUN&gt;`END`PLN Foo`END`PUN&lt;`END`TAG\'a`END`PUN,`END`PLN `END`TAG\'static`END`PUN&gt;`END`PLN `END`KWDfor`END`PLN Bar`END`PUN&lt;`END`TAG\'b`END`PUN&gt;`END`PLN\n' +
    '`END`KWDwhere`END`PLN T`END`PUN:`END`PLN `END`TYPIterator`END`PUN&lt;`END`PLNItem `END`PUN=`END`PLN `END`TYPBox`END`PUN&lt;`END`TYPFn`END`PUN()`END`PLN `END`PUN-&gt;`END`PLN `END`TYPu32`END`PUN&gt;&gt;`END`PLN `END`PUN{`END`PLN\n' +
    '    `END`KWDfn`END`PLN something`END`PUN(&amp;`END`KWDmut`END`PLN `END`LITself`END`PUN)`END`PLN `END`PUN-&gt;`END`PLN `END`TYPu32`END`PLN `END`PUN{`END`PLN\n' +
    '        `END`KWDif`END`PLN `END`KWDlet`END`PLN `END`TYPSome`END`PUN(`END`KWDref`END`PLN x`END`PUN)`END`PLN `END`PUN=`END`PLN `END`LITself`END`PUN.`END`PLNfoo`END`PUN(`END`STR"multi li\\ne\n' +
    's\\tring"`END`PUN)`END`PLN `END`PUN{`END`PLN\n' +
    '            `END`ATNpanic!`END`PUN(`END`STRr"\\things is going wrong!"`END`PUN);`END`PLN\n' +
    '            `END`ATNpanic!`END`PUN(`END`STRr#"Things is "really" goig\\n wront!"#`END`PUN);`END`PLN\n' +
    '            `END`ATNpanic!`END`PUN(`END`STRr##"Raw strings are #"#fancy#"#"##`END`PUN);`END`PLN\n' +
    '        `END`PUN}`END`PLN\n' +
    '    `END`PUN}`END`PLN\n' +
    '`END`PUN}`END`PLN\n' +
    '\n' +
    '`END`KWDpub`END`PLN `END`KWDtype`END`PLN CowString`END`PUN&lt;`END`TAG\'a`END`PUN&gt;`END`PLN `END`PUN=`END`PLN std`END`PUN::`END`PLNcow`END`PUN::`END`PLNCow`END`PUN&lt;`END`TAG\'a`END`PUN,`END`PLN `END`TYPstr`END`PUN&gt;;`END`PLN\n' +
    '\n' +
    '`END`KWDfn`END`PLN main`END`PUN()`END`PLN `END`PUN{`END`PLN\n' +
    '    `END`KWDlet`END`PLN `END`PUN(`END`PLNi`END`PUN,`END`PLN r`END`PUN)`END`PLN `END`PUN=`END`PLN `END`PUN(`END`LIT1u8`END`PUN,`END`PLN `END`STR\'c\'`END`PUN);`END`PLN\n' +
    '    `END`KWDlet`END`PLN s `END`PUN=`END`PLN `END`STRr#"Take a raw egg,\n' +
    '        "break" it (or the line),\n' +
    '        and beat it"#`END`PUN;`END`PLN\n' +
    '`END`PUN}`END'
  )
};
