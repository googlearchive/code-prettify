#!/usr/bin/perl

# Given a JS file looks for lines like
#    include("path/to/file/to/include");
# and replaces them with the quoted file relative to the js-modules directory.
# If the included file ends with ".pl" then it is treated as a perl file to
# execute and the stdout is used as the JS to include.

use strict;

# Closure Compiler @define annotations that need to be pulled out of included
# files because @defines need to be top-level vars.
my $global_defs = "";

# Find @defines at the top of a JS file by pulling off comments and looking for
# comments containing @define followed by a var declaration.
sub extractGlobalDefs($) {
  my @headerComments;
  my $s = shift;
  while ($s) {
    last unless $s =~ m#^\s*(?://[^\r\n]*|/\*.*?\*/[ \t]*)[\r\n]*#s;
    my $comment = $&;
    $s = $';
    if ($comment =~ /[\@](define|typedef)/
        && $s =~ /^\s*var\s+[^;]+;[ \t]*[\r\n]*/) {
      my $global = "$&";
      $s = $';
      $global =~ s/(var\s*IN_GLOBAL_SCOPE\s*=\s*)true\b/$1false/;
      $global_defs .= "$comment$global";
    } else {
      push(@headerComments, $comment);
    }
  }
  return (join "", @headerComments) . $s;
}

# readInclude(whiteSpacePrefix, path) returns the JS content at path
# (with the ".pl" adjustment above) and prepends each line with the
# whitespace in whiteSpacePrefix to produce a chunk of JS that matches the
# indentation of the including file.
# @defines are extracted so that they can all appear globally at the top of
# the file.
sub readInclude($$) {
  my $prefix = shift;
  my $name = "js-modules/" . (shift);
  my $in;
  if ($name =~ /\.pl$/) {
    open($in, "perl $name|") or die "$name: $!";
  } else {
    open($in, "<$name")      or die "$name: $!";
  }
  my $buf = "";
  while (<$in>) {
    if (m/(\s*)include\("([^"]+)"\);\s*$/) {
      my $inc = extractGlobalDefs(readInclude("$prefix$1", $2));
      $buf .= $inc;
    } else {
      $buf .= "$prefix$_";
    }
  }
  close($in);
  return $buf;
}

my $target = shift;
my $inc = readInclude("", $target);
my $header = "";
# Put descriptive top level comments above the grouped @defines.
if ($inc =~ s#^(?://[^\r\n]*|/\*.*?\*/|\s)+##s) {
  $header = $&;
}
my $globals = $global_defs;
# Un-indent @defines.
$globals =~ s#^[ \t]*##gm;
$globals .= "\n" unless $globals eq "";

print "$header$globals$inc";
