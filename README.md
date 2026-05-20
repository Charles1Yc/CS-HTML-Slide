# HTML Slide Workspace

This project keeps only the files needed to open the course site and HTML slide decks reliably on any machine.

## Project Standard

Canonical project standard:

- [config/project-standard.md](config/project-standard.md)

Use that document as the source of truth for course structure, page/data responsibilities, slide paths, and publish/test rules.

## Canonical Course Layout

Each course directory now follows the same internal layout:

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

This keeps course pages, slide output, assets, and local working materials in predictable locations.

## Publishable Scope

Keep these in the GitHub repo:

- `index.html` and each course `index.html`
- each course `course-data.json`
- `<Course>/slides/`: generated `.html` decks and `.qmd` sources
- `<Course>/assets/`: images used by the slide decks
- `<Course>/slides/_shared/site_libs/`: shared Quarto/Reveal runtime copied from generated decks
- `_extensions/clean/`, `config/`, `scripts/`, `vendor/`, `_quarto.yml`
- `README.md`, `AGENTS.md`, `.gitignore`

## Local-Only Scope

These stay local and are excluded from upload:

- `.local/`, `.quarto/`, `.quarto-home/`
- `Temp ScreenShot/`
- `**/resources/`, `**/materials/`, `**/notes/`
- `.claude/`, `.codex-tmp/`, `.vscode/`
- `MIGRATION_HANDOFF.md`

## Shared Slide Runtime

Generated Quarto decks normally create one `<deck>_files/libs/` runtime folder per deck.

This workspace now dedupes those copies into one shared folder per course:

- `<Course>/slides/_shared/site_libs/`

After each render, `bash scripts/render-clean-reveal.sh '<Course>/slides/<unit>/<deck>.qmd'` will:

1. render the target HTML deck
2. copy one canonical runtime into `<Course>/slides/_shared/site_libs/`
3. rewrite deck HTML to use the shared runtime
4. remove duplicated per-deck `*_files/` folders

## Render

Render one clean reveal deck:

```bash
bash scripts/render-clean-reveal.sh '<Course>/slides/<unit>/<deck>.qmd'
```

Run a text-level clean-style check after rendering:

```bash
bash scripts/check-clean-reveal.sh '<Course>/slides/<unit>/<deck>.qmd' '<Course>/slides/<unit>/<deck>.html'
```

## Local Testing

Course directory pages now load `course-data.json` via `fetch()`.

Do not rely on `file://.../index.html` for course-directory testing. Use a local static server from the repo root instead:

```bash
bash scripts/start-local-site.sh
```

Then open:

- `http://localhost:8000/`
- `http://localhost:8000/IGCSE%20CS/`
- `http://localhost:8000/AP%20CSA/`
- `http://localhost:8000/A%20Level%20CS/`

You can use another port if needed:

```bash
bash scripts/start-local-site.sh 9000
```

## Remote Testing

After GitHub Pages is enabled, test the published site over HTTPS rather than local file paths.

Recommended checks:

1. Open the site root and verify course cards load.
2. Open each course index and verify the unit tree renders from `course-data.json`.
3. Open several slide decks and confirm shared runtime assets under `_shared/site_libs/` load correctly.
4. Use browser DevTools Network panel to confirm `course-data.json` returns `200`.

