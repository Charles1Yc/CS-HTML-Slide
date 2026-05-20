# Project Configuration

This folder stores reusable project configuration material for generating HTML Slide decks.

Primary project standard:

- `project-standard.md`: canonical rules for course structure, course pages, course JSON data, slide paths, and local/remote access.

## Runtime files kept at project root

Some files must stay at the project root because Quarto and Codex discover them from there:

- `AGENTS.md`
- `_quarto.yml`
- `_extensions/clean/`
- `scripts/render-clean-reveal.sh`
- `scripts/check-clean-reveal.sh`
- `.local/bin/quarto`

## Files stored here

- `templates/`: base Quarto templates for Reveal.js HTML and Typst PDF output.
- `runtime/`: loose runtime support files preserved from the original setup.
- `style-references/`: Clean Academic Reveal Style notes and sample images.

## Course folders

Course resources and slide outputs are separated by course:

- `IGCSE CS/`
- `A Level CS/`
- `AP CSA/`

Each course folder should use the same internal structure:

- `index.html`
- `course-data.json`
- `assets/`
- `materials/`
- `notes/`
- `resources/`
- `slides/`
