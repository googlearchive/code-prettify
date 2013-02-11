#!/bin/bash

function help_and_exit() {
    echo "Usage: $0 [-go] [-verbose] [-force]"
    echo
    echo "Moves minified CSS and JS to distribution directories and"
    echo "creates a branch in SVN."
    echo
    echo "  -go:      Run commands instead of just echoing them."
    echo "  -verbose: More verbose logging."
    echo "  -force:   Ignore sanity checks for testing."
    echo "            Incompatible with -go."
    exit "$1"
}

# 1 for verbose logging
export VERBOSE="0"
# 1 if commands that have side-effects should actually be run instead of logged
export EFFECT="0"
# 1 to not exit on panic.
export NO_PANIC="0"

function panic() {
    echo "PANIC: $*"

    if ! (( $NO_PANIC )); then
        exit -1
    fi
}

function command() {
    if (( $VERBOSE )) || ! (( $EFFECT )); then
        echo '$' "$*"
    fi
    if (( $EFFECT )); then
        "$@" || panic "command failed: $@"
    fi
}

function mime_for_file() {
    local path="$1"
    case "${path##*.}" in
        js)   echo -n "text/javascript;charset=UTF-8";;
        css)  echo -n "text/css;charset=UTF-8";;
        html) echo -n "text/html;charset=UTF-8";;
        *)    panic "unrecognized extension for $path";;
    esac
}

for var in "$@"; do
  case "$var" in
      -verbose)
          VERBOSE="1"
          ;;
      -go)
          EFFECT="1"
          ;;
      -force)
          NO_PANIC="1"
          ;;
      -h)
          help_and_exit 0
          ;;
      *)
          echo "Unrecognized variable $var"
          help_and_exit -1
          ;;
  esac
done

if (( $NO_PANIC )) && (( $EFFECT )); then
    NO_PANIC="0"
    panic "-force is incompatible with -go"
fi

# Find svn root
export VERSION_BASE="$(
  pushd "$(dirname "$0")/.." > /dev/null; pwd; popd > /dev/null)"

if [ -z "$VERSION_BASE" ] || ! [ -d "$VERSION_BASE" ]; then
    panic "unknown VERSION_BASE"
fi
if ! [ -d "$VERSION_BASE/trunk" ]; then
    panic "missing trunk in $VERSION_BASE"
fi
if ! [ -d "$VERSION_BASE/loader" ]; then
    panic "missing loader in $VERSION_BASE"
fi
if ! [ -d "$VERSION_BASE/branches" ]; then
    panic "missing branches in $VERSION_BASE"
fi

if (( $VERBOSE )); then
    echo "VERSION_BASE=$VERSION_BASE"
fi

# Choose a release label
export RELEASE_LABEL="$(date -u +release-%e-%b-%Y)"

if (( $VERBOSE )); then
    echo "RELEASE_LABEL=$RELEASE_LABEL"
fi

if [ -e "$VERSION_BASE/branches/$RELEASE_LABEL" ]; then
    panic "duplicate release $VERSION_BASE/branches/$RELEASE_LABEL"
fi


# Make the distribution
function build() {
  pushd "$VERSION_BASE/trunk" > /dev/null
  make distrib
  local status=$?
  popd > /dev/null
  (($status))
}
if build; then
  panic "Make failed"
fi

if [ -n "$(svn stat "$VERSION_BASE/trunk")" ]; then
  svn stat "$VERSION_BASE/trunk"
  panic "Uncommitted changes"
fi

function diffq() {
    ! diff -q "$@" > /dev/null
}

function sync() {
    local action="$1"
    local src_dir="$2"
    local dest_dir="$3"
    shift 3
    local exts=$@
    local ext
    local src_file
    local dest_file
    (
        shopt -s nullglob
        for ext in $exts; do
            for src_file in "$src_dir"/*."$ext"; do
                dest_file="$dest_dir"/"$(basename "$src_file")"
                if ! [ -e "$dest_file" ] || \
                    diffq "$src_file" "$dest_file"; then
                    "$action" "$src_file" "$dest_file"
                fi
            done
            for dest_file in "$dest_dir"/*."$ext"; do
                src_file="$src_dir"/"$(basename "$dest_file")"
                if ! [ -e "$src_file" ]; then
                    "$action" "$src_file" "$dest_file"
                fi
            done
        done
    )
}

function svn_sync() {
    local src_file="$1"
    local dest_file="$2"
    if ! [ -e "$src_file" ]; then
        command svn delete "$dest_file"
    else
        if [ -e "$dest_file" ]; then
            command cp "$src_file" "$dest_file"
        else
            command cp "$src_file" "$dest_file"
            command svn add "$dest_file"
            command svn propset svn:mime-type "$(mime_for_file "$src_file")" \
                "$dest_file"
        fi
    fi
}

# Deploy the current compiled source to /loader
sync svn_sync "$VERSION_BASE/trunk/distrib/google-code-prettify" \
    "$VERSION_BASE/loader" js css
sync svn_sync "$VERSION_BASE/trunk/styles" \
    "$VERSION_BASE/loader/skins" css

# Cut branch
command svn copy "$VERSION_BASE/trunk" "$VERSION_BASE/branches/$RELEASE_LABEL"

# Dump final instructions for caller.
echo
if (( $EFFECT )); then
    echo "Finally run"
    echo "    $ svn commit -m 'Release $RELEASE_LABEL'"
    echo "to commit the new release then upload"
    echo "    $VERSION_BASE/trunk/distrib/prettify-small.*"
    echo "to"
    echo "    http://code.google.com/p/google-code-prettify/downloads/list"
else
   echo "Rerun with -go flag to actually execute these commands."
fi

exit 0
