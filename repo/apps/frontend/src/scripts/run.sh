#!/usr/bin/env bash
set -e

PWD=$(pwd)
TARGET=$1
SCRIPT="$PWD/src/scripts/$TARGET.script.ts"

get-script-list() {
  echo "Available scripts:"
  for filepath in $(find $PWD/src/scripts -type f -name "*.script.ts") ; do
      echo "- $(basename $filepath | sed 's/.script.ts//g')"
  done
}

if [ ! -f $PWD/package.json ]; then
  echo "Error: running outside a Node.js project."
  exit 1
fi

# Script exists, running actual file with tsx
if [ -f $SCRIPT ]; then
  tsx $SCRIPT
else
  echo "Error: script \"$TARGET\" does not exist."
  get-script-list
  exit 1
fi