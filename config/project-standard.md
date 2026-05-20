# Project Standard

## Purpose

This document defines the canonical structure and responsibility split for the HTML Slide workspace.

It is the stable project-level standard for:

- course directory structure
- course index pages
- course data files
- slide source/output locations
- local and remote access rules

## Root Structure

The project root keeps shared site and rendering infrastructure:

```text
/
  index.html
  config/
  scripts/
  _extensions/
  vendor/
  <Course>/
```

Required shared files:

- `index.html`: top-level course hub
- `config/course-catalog.js`: shared course-card metadata
- `config/course-index.js`: shared course-page rendering and interactions
- `config/course-index.css`: shared course-page and hub styling
- `scripts/render-clean-reveal.sh`: canonical deck render entry
- `scripts/check-clean-reveal.sh`: text-level deck check
- `scripts/start-local-site.sh`: local HTTP testing entry

## Canonical Course Layout

Every course directory must follow the same internal layout:

```text
<Course>/
  index.html
  course-data.json
  README.md
  assets/
  materials/
  notes/
  resources/
  slides/
    _shared/
      site_libs/
```

Meaning of each path:

- `index.html`: course directory page shell only
- `course-data.json`: unit / section / topic / deck tree data
- `assets/`: formal image assets used by decks
- `materials/`: raw external materials or source mirrors
- `notes/`: outlines, topic breakdowns, audits, planning notes
- `resources/`: textbook PDFs and original source files
- `slides/`: `.qmd` sources and rendered `.html` decks
- `slides/_shared/site_libs/`: shared Quarto / Reveal runtime for this course

## Page And Data Responsibilities

The workspace uses a fixed split between shared UI, shared metadata, and course-specific data.

### 1. Site hub

- Root `index.html` is the course hub only.
- It must not contain per-course tree data.
- It reads shared card metadata from `config/course-catalog.js`.

### 2. Course overview metadata

- `config/course-catalog.js` stores course-level shared metadata.
- It is the only place for:
  - course card title/subtitle
  - course tag and track badge
  - progress summary shown on the hub
  - course code/provider summary

### 3. Course directory pages

- `<Course>/index.html` is a shell page only.
- It must not inline the unit/topic tree.
- It must declare:
  - `data-course-id`
  - `data-course-data="course-data.json"`
- Rendering is handled by `config/course-index.js`.

### 4. Course tree data

- `<Course>/course-data.json` is the source of truth for:
  - units
  - sections
  - topics
  - deck links
- If a deck is added, removed, or renamed, update this file.

### 5. Slides

- `.qmd` is the only maintainable slide source.
- `.html` is rendered output.
- A deck link in `course-data.json` must point to the rendered `.html` file under `<Course>/slides/...`.

## Slide Rules

- New or updated decks must be rendered from `.qmd` through:

```bash
bash scripts/render-clean-reveal.sh '<Course>/slides/<unit>/<deck>.qmd'
```

- Clean-style text check should use:

```bash
bash scripts/check-clean-reveal.sh '<Course>/slides/<unit>/<deck>.qmd' '<Course>/slides/<unit>/<deck>.html'
```

- Deck HTML must use relative paths only.
- Do not keep local absolute paths such as `/Volumes/...`, `/Users/...`, or `file:///...` in committed HTML, CSS, JS, or JSON.

## Asset Rules

- Formal slide images must live under `<Course>/assets/`.
- Temporary screenshots may pass through `Temp ScreenShot/`, but committed deck references must point into the course `assets/` tree.
- Shared Reveal runtime must live under `<Course>/slides/_shared/site_libs/`.

## Local And Remote Access Rules

### Local testing

Course directory pages load `course-data.json` through `fetch()`.

Therefore:

- do not treat `file://.../index.html` as the canonical test path for course directories
- use a local HTTP server from the project root instead

```bash
bash scripts/start-local-site.sh
```

### Remote publishing

- GitHub Pages is the canonical remote delivery path.
- Root `.nojekyll` must stay committed so underscore-prefixed folders remain publishable.

## Change Workflow

Use this decision table when editing the project:

- change course card title/progress/provider: edit `config/course-catalog.js`
- change course tree structure: edit `<Course>/course-data.json`
- change course page layout/interactions: edit `config/course-index.js` or `config/course-index.css`
- change deck content: edit `<Course>/slides/.../*.qmd`
- change deck images: edit `<Course>/assets/...`

## Publishable Vs Local-Only Material

Publishable site/runtime content:

- `index.html`
- each course `index.html`
- each course `course-data.json`
- `<Course>/slides/`
- `<Course>/assets/`
- `<Course>/slides/_shared/site_libs/`
- `config/`, `scripts/`, `_extensions/`, `vendor/`, `.nojekyll`, `_quarto.yml`

Local working material:

- `<Course>/notes/`
- `<Course>/resources/`
- `<Course>/materials/`
- `Temp ScreenShot/`

## Non-Negotiable Constraints

- All courses must use the same directory skeleton.
- All course directory pages must remain shell pages.
- All course trees must live in `course-data.json`.
- All shared hub and course-page behavior must stay in `config/`.
- All formal decks must remain render-derived from `.qmd`.
