# Quarto Clean Templates

This directory stores project-local starter templates for future slide generation.

## HTML / Reveal.js

- Template: `templates/clean-revealjs-basic.qmd`
- Local extension: `_extensions/clean`
- Format: `clean-revealjs`
- Source: `vendor/quarto-revealjs-clean`

Render command when Quarto is available:

```bash
bash scripts/render-clean-reveal.sh templates/clean-revealjs-basic.qmd
```

## PDF / Typst

- Template: `templates/clean-typst-basic.qmd`
- Full demo template: `templates/clean-typst-full.qmd`
- Brand demo template: `templates/clean-typst-brand.qmd`
- Local extension: `_extensions/clean`
- Format: `clean-typst`
- Source: `vendor/quarto-clean-typst`
- Supporting files for the full Typst demo: `custom.typ` and `static/`

Render command when Quarto is available:

```bash
quarto render templates/clean-typst-basic.qmd --to clean-typst
```

Note: this project includes a project-local Quarto CLI at `.local/bin/quarto`.
Use `scripts/render-clean-reveal.sh` so rendering works even when no global
`quarto` command is installed.
