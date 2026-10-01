#!/bin/sh
set -e

NEXT_DIR="/runner/frontend/repo/apps/frontend/.next"

echo "Replacing env placeholders with runtime values..."

replace_placeholder() {
  placeholder="$1"
  value="$2"

  [ -z "$placeholder" ] || [ -z "$value" ] && return

  echo "Replacing placeholder for $placeholder"

  # find instead of a glob: /bin/sh has no bash globstar, so "**/*.js" only
  # matches one level deep and silently misses nested chunk/page files.
  # find walks the whole tree so baked-in NEXT_PUBLIC_* values are replaced
  # everywhere, including server chunks and prerendered .html/.rsc output.
  find "$NEXT_DIR" \( -name '*.js' -o -name '*.html' -o -name '*.rsc' \) -type f -print0 2>/dev/null \
    | xargs -0 sed -i "s|$placeholder|$value|g" 2>/dev/null
}

replace_placeholder "http://replacemelater.com" "$NEXT_PUBLIC_CANONICAL_URL"

echo "Placeholder replacement complete. Starting application..."

exec "$@"
