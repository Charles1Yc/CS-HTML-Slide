#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

if [ "$#" -lt 1 ]; then
  echo "Usage: bash scripts/dedupe-slide-libs.sh <course-path-or-deck-path>" >&2
  exit 2
fi

INPUT="${1#./}"
COURSE_REL=""

if [[ "$INPUT" == *"/slides/"* ]]; then
  COURSE_REL="${INPUT%%/slides/*}"
elif [ -d "$ROOT_DIR/$INPUT/slides" ]; then
  COURSE_REL="$INPUT"
else
  echo "Error: could not resolve course path from '$1'." >&2
  exit 1
fi

SLIDES_DIR="$ROOT_DIR/$COURSE_REL/slides"
SHARED_DIR="$SLIDES_DIR/_shared/site_libs"
FIRST_LIB_DIR="$(find "$SLIDES_DIR" -type d -path '*_files/libs' | sort | head -n 1 || true)"

if [ -z "$FIRST_LIB_DIR" ]; then
  echo "No per-deck support libraries found under $COURSE_REL/slides; nothing to dedupe."
  exit 0
fi

mkdir -p "$SHARED_DIR"
cp -R "$FIRST_LIB_DIR"/. "$SHARED_DIR"/

while IFS= read -r html; do
  deck_name="$(basename "$html" .html)"
  support_dir="${html%.html}_files"
  if [ ! -d "$support_dir" ]; then
    continue
  fi
  perl -0pi -e "s@\Q${deck_name}_files/libs/@../_shared/site_libs/@g" "$html"
done < <(find "$SLIDES_DIR" -mindepth 2 -maxdepth 2 -type f -name '*.html' | sort)

while IFS= read -r support_dir; do
  rm -rf "$support_dir"
done < <(find "$SLIDES_DIR" -mindepth 2 -maxdepth 2 -type d -name '*_files' | sort)

echo "Shared slide runtime ready at: $COURSE_REL/slides/_shared/site_libs"
