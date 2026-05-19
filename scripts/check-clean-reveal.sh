#!/usr/bin/env bash
set -euo pipefail

failures=0

note() {
  printf '%s\n' "$*"
}

fail() {
  note "FAIL: $*"
  failures=$((failures + 1))
}

warn() {
  note "WARN: $*"
}

if [ "$#" -lt 1 ]; then
  echo "Usage: bash scripts/check-clean-reveal.sh <deck.qmd> [deck.html]" >&2
  exit 2
fi

qmd="$1"
html="${2:-${qmd%.qmd}.html}"

if [ ! -f "$qmd" ]; then
  fail "QMD file not found: $qmd"
else
  if ! rg -q "clean-revealjs" "$qmd"; then
    fail "QMD does not declare clean-revealjs format: $qmd"
  fi

  if rg -q "feature-grid|node-grid|summary-grid|line-list|compare-table|checklist|rubric-table" "$qmd"; then
    fail "QMD contains old custom component classes: $qmd"
  fi

  table_count="$(rg -c '^\|.*\|' "$qmd" || true)"
  if [ "${table_count:-0}" -gt 8 ]; then
    warn "QMD has many markdown table lines; confirm this is necessary for teaching clarity."
  fi
fi

if [ ! -f "$html" ]; then
  fail "HTML file not found: $html"
else
  if rg -q "white\\.min\\.css" "$html"; then
    fail "HTML loads Reveal white.min.css; expected Quarto clean-revealjs output."
  fi

  if rg -q "feature-grid|node-grid|summary-grid|line-list|compare-table|checklist|rubric-table" "$html"; then
    fail "HTML contains old custom component classes; regenerate from clean QMD."
  fi

  if ! rg -q "revealjs" "$html"; then
    warn "HTML does not contain a revealjs marker; confirm it is a slide deck."
  fi

  if rg -q "_extensions/clean|clean\\.scss|clean-revealjs|quarto" "$html"; then
    note "OK: HTML contains Quarto/clean-related markers."
  else
    warn "HTML does not expose clear Quarto clean markers; inspect if it was hand-written."
  fi
fi

if [ "$failures" -gt 0 ]; then
  exit 1
fi

note "OK: clean-reveal text checks passed."
