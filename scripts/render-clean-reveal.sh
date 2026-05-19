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
mkdir -p "$HOME" "$DENO_DIR"

DECK_PATH="$1"
"$QUARTO_BIN" render "$DECK_PATH" --to clean-revealjs "${@:2}"

bash "$ROOT_DIR/scripts/dedupe-slide-libs.sh" "$DECK_PATH"
