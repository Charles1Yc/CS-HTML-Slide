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

- `activecode`: convert to a code task slide. Keep the prompt, starter code, and expected output or key test requirements.
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
- kept sections
- kept exercises
- omitted items
- rebuilt deck paths
- verification status

The audit is the semantic quality gate. The content-check script only verifies minimum structural requirements.
