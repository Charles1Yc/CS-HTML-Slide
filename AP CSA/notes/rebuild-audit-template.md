# AP CSA Rebuild Audit Template

Copy this block into `AP CSA/notes/rebuild-audit/unit-N.md` for each topic.

```md
## Topic N.N Topic Title

- Status: planned | rebuilt
- Source file: `AP CSA/materials/CSAwesome2-main/_sources/.../topic-N-N-source.rst`
- Rebuilt decks:
  - [ ] Deck: `AP CSA/slides/<unit-slug>/<deck-file>.qmd`
- Kept sections:
  - Topic intro explanation
  - Section title from textbook
- Kept exercises:
  - `activecode:: id` -> converted to code task slide
  - `mchoice:: id` -> converted to quick check slide
  - `parsonsprob:: id` -> converted to mixed-up code slide
  - `shortanswer:: id` -> converted to student response slide
- Omitted items:
  - Summary
  - Review/practice bank
  - Optional enrichment with reason
- Assets:
  - source figure -> course asset path
- Verification:
  - [ ] Rendered with `bash scripts/render-clean-reveal.sh`
  - [ ] Passed `bash scripts/check-clean-reveal.sh`
  - [ ] Passed `node scripts/check-ap-csa-content-quality.mjs`
```
