# AP CSA Rebuild Audit Template

Copy this block into `AP CSA/notes/rebuild-audit/unit-N.md` for each topic.

```md
## Topic N.N Topic Title

- Status: planned | rebuilt
- Source file: `AP CSA/materials/CSAwesome2-main/_sources/.../topic-N-N-source.rst`
- Fidelity mode: strict textbook
- Rebuilt decks:
  - [ ] Deck: `AP CSA/slides/<unit-slug>/<deck-file>.qmd`
- Kept sections:
  - source lines 1-20 `Topic intro explanation` -> `deck.qmd` / `## Topic Intro` / preserved
  - source lines 21-80 `Section title from textbook` -> `deck.qmd` / `## Slide Heading` / preserved
- Kept exercises:
  - source lines 100-180 `activecode:: id` -> `deck.qmd` / `## Code Task` / prompt + starter + tests preserved
  - source lines 190-220 `mchoice:: id` -> `deck.qmd` / `## Quick Check` / question + answers + reasoning preserved
  - source lines 230-260 `parsonsprob:: id` -> `deck.qmd` / `## Mixed-Up Code` / prompt + blocks preserved
  - source lines 270-290 `shortanswer:: id` -> `deck.qmd` / `## Student Response` / prompt preserved
- Source coverage map:
  - source lines 1-20 -> `deck.qmd` lines 17-30 -> preserved
  - source lines 100-180 -> `deck.qmd` lines 52-95 -> preserved
- Compression/adaptation log:
  - none
  - or: source lines 300-330 shortened only for slide split; full starter code retained on `## Full Code` page
- Omitted items:
  - source lines 400-420 `Summary` -> omitted allowed category
  - source lines 430-520 `Review/practice bank` -> omitted allowed category
  - source lines 530-560 `Optional enrichment title` -> omitted because ...
- Assets:
  - source figure -> course asset path
- Verification:
  - [ ] Rendered with `bash scripts/render-clean-reveal.sh`
  - [ ] Passed `bash scripts/check-clean-reveal.sh`
  - [ ] Passed `node scripts/check-ap-csa-content-quality.mjs`
  - [ ] Passed `node scripts/check-ap-csa-source-fidelity.mjs`
```

Audit rules:

- `Fidelity mode: strict textbook` is mandatory for every rebuilt topic.
- Every kept section and exercise must include source line ranges and destination deck/heading.
- `converted to` is not enough. State what was preserved: prompt, starter code, expected output, test requirements, reasoning, trace table, or answer options.
- `Compression/adaptation log` must be `none` unless the slide intentionally splits or shortens source text. In that case, explain where the full source-equivalent content is retained.
- A topic cannot be marked `rebuilt` if the coverage map is missing or if a retained activity has been replaced by a generic task.
