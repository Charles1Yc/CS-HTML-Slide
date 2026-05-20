#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

if command -v quarto >/dev/null 2>&1; then
  QUARTO_BIN="quarto"
elif [ -x "$ROOT_DIR/.local/bin/quarto" ]; then
  QUARTO_BIN="$ROOT_DIR/.local/bin/quarto"
else
  echo "Error: quarto command not found." >&2
  echo "Install Quarto globally, or use the project-local .local/bin/quarto runtime." >&2
  exit 1
fi

if [ "$#" -lt 1 ]; then
  echo "Usage: bash scripts/render-clean-reveal.sh <deck.qmd> [extra quarto render args...]" >&2
  exit 2
fi

export HOME="$ROOT_DIR/.quarto-home"
export DENO_DIR="$ROOT_DIR/.quarto-home/deno"
LOCK_PARENT="$ROOT_DIR/.tmp-rendered-pages"
LOCK_DIR="$LOCK_PARENT/render-clean-reveal.lock"
LOCK_TIMEOUT_SECONDS="${RENDER_CLEAN_REVEAL_LOCK_TIMEOUT:-120}"
LOCK_WAIT_SECONDS=1
mkdir -p "$HOME" "$DENO_DIR" "$LOCK_PARENT"

DECK_PATH="$1"

acquire_lock() {
  local start now elapsed
  start="$(date +%s)"

  while ! mkdir "$LOCK_DIR" 2>/dev/null; do
    now="$(date +%s)"
    elapsed=$((now - start))
    if [ "$elapsed" -ge "$LOCK_TIMEOUT_SECONDS" ]; then
      echo "Error: timed out waiting for render lock: $LOCK_DIR" >&2
      echo "If no render process is active, remove the stale lock directory and retry." >&2
      exit 1
    fi
    sleep "$LOCK_WAIT_SECONDS"
  done

  printf '%s\n' "$$" > "$LOCK_DIR/pid"
}

release_lock() {
  rm -rf "$LOCK_DIR"
}

acquire_lock
trap release_lock EXIT INT TERM

"$QUARTO_BIN" render "$DECK_PATH" --to clean-revealjs "${@:2}"

bash "$ROOT_DIR/scripts/dedupe-slide-libs.sh" "$DECK_PATH"
