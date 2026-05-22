# AP CSA Content Quality Standard

This standard governs AP CSA slide rebuilding from CSAwesome2.

## Goal

AP CSA decks must be classroom-ready, not topic summaries. A rebuilt deck should let a teacher explain the concept, run or trace representative code, and assign the retained classroom task without reopening the source textbook.

## Source Fidelity

- Use `AP CSA/materials/CSAwesome2-main/_sources` as the textbook source of truth.
- Preserve the topic intro explanation before numbered subsections.
- Preserve the textbook's teaching order unless the audit explains a classroom reason to split or reorder.
- Preserve definitions, key examples, diagrams, important code, and classroom-usable exercises.
- Do not preserve `Summary`, broad review banks, AP Classroom external review directions, games, or optional enrichment that is not needed for core classroom teaching.

## Strict Textbook Fidelity Lock

AP CSA rebuilding is now under **strict textbook fidelity**. The default action is to preserve and reorganize the CSAwesome2 source, not to improve, simplify, summarize, or replace it.

Hard rules:

- Do not replace a textbook example with a self-authored example unless the original example is preserved first and the new example is explicitly labeled `Supplemental`.
- Do not compress a retained activity into a generic task list. If the textbook provides a prompt, starter code, expected output, test case, or required deliverable, those parts must appear in the slide deck.
- Do not turn starter code into a completed answer. Student-facing starter pages must keep missing parts as missing parts. If a worked solution is useful, put it on a separate answer or reasoning page after the task.
- Do not replace a long algorithm with a conceptual "shape" when the source provides full code. Use a `.code-scroll` full-code page, then add focused trace pages.
- Do not omit Runestone tests, expected outputs, data-file requirements, or setup context when they define what students must build.
- Do not write polished substitute prose that changes the source emphasis. Keep textbook wording or near-textbook wording, adding only concise Chinese term glosses where useful.
- Do not mark a topic `rebuilt` until every retained source section and retained exercise has a source-to-slide coverage entry.
- When content is too long for one slide, split slides or split decks. Compression is not an acceptable overflow fix.

Allowed edits are limited to:

- formatting source content into teachable slide pages
- splitting long content into multiple pages
- adding concise Chinese glossary notes for difficult terms
- adding a bridge line that tells the class what to do next
- omitting only items listed under the allowed omitted categories

## Required Deck Shape

Every rebuilt knowledge deck must include:

- `Course Directory`
- topic intro / framing slide
- core teaching sequence in textbook order
- at least one converted classroom task or quick check
- `Classroom Check`
- `End`

Pure activity decks are allowed only when a long topic is split and the audit marks the deck as activity-focused.

## Runestone Conversion Rules

- `activecode`: convert to a code task slide. Keep the prompt, starter code, setup imports, data files, expected output, and key test requirements. Do not replace starter code with a completed answer.
- `mchoice`: convert to a quick check slide. Add a short reasoning slide when the distractors reveal a common misconception.
- `parsonsprob`: convert to a mixed-up code / reorder task slide with the required correct order.
- `fillintheblank`: convert to a trace checkpoint or short response prompt.
- `shortanswer`: convert to a student response task.
- `Coding Challenge`, `Tracing Challenge`, and `Groupwork`: preserve the task goal, starter context, and required student deliverable.

## Code Requirements

- Code examples must be complete enough to trace in class.
- Do not replace important logic with `...`.
- Skeleton code is allowed only when the slide explicitly labels it as a pattern skeleton and the missing part is the student task.
- Keep Java code in English and aligned with the textbook.
- For sorting, searching, recursion, file input, and other algorithm topics, full source code from the textbook must be retained before any focused trace or simplified explanation.

## Language and Highlighting

- Keep textbook English terms and Java code.
- Add inline Chinese terms for difficult technical vocabulary.
- Use `.term` for important technical terms and `.mark` for scoring-critical conditions.
- Avoid whole-sentence highlighting.

## Deck Length and Splitting

- Target length: `12-22` slides per deck.
- Split at more than `24` slides or when a topic contains multiple large code exercises.
- Keep the first deck filename on the original topic slug. Use `-part-2-*`, `-part-3-*` for later lesson segments.
- Register all split decks in the same topic's `decks` array in `course-data.json`.

## Audit Requirement

Before or during rebuilding, each topic must have an audit entry with:

- source file
- fidelity mode
- kept sections
- kept exercises
- source coverage map
- compression/adaptation log
- omitted items
- rebuilt deck paths
- verification status

The audit is the semantic quality gate. A topic without strict source coverage is not complete, even if the HTML renders and the minimum content-check script passes.

Completion gate:

- Run `node scripts/check-ap-csa-source-fidelity.mjs` before marking AP CSA content work complete.
- Any failure from that script means the content task is not complete.
- If the script flags an existing topic that was previously rebuilt under the older rule, upgrade that topic's audit and slides before treating it as finished.
