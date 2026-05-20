# AP CSA Slide Layout and Overflow Standard

This note defines the layout rules used when rebuilding AP CSA clean reveal.js decks.

## Core Rule

Each slide should carry one clear teaching move: concept, example, starter code, trace, quick check, answer reasoning, or classroom task. If a slide needs two teaching moves, split it.

## Slide Density Rules

- Code:
  - `<= 24` lines: normal code block is acceptable.
  - `25-55` lines: use `.code-scroll`.
  - `> 55` lines: split into a full code scroll page and at least one focused trace/key block page.
- Tables:
  - `<= 6` rows: normal table is acceptable.
  - `7-10` rows: use `.table-fit` or split the table.
  - `> 10` rows: split the table.
- Images:
  - Use `.image-fit` when an image is the main visual on a slide.
  - Keep image explanation to `2-4` bullets.
  - If a two-column image slide has more than two images or more than six bullets, split it.
- Scroll:
  - `.code-scroll` is allowed for full code, starter code, debug tasks, and complex algorithms.
  - `.scroll-block` is only for rare reference/task pages.
  - Do not make ordinary concept slides depend on scrolling.

## Complex Algorithm Pattern

Use this sequence for searching, recursion, sorting, or other full algorithms:

1. Algorithm idea page
2. Full code scroll page
3. Focused trace or key block page

The full code page preserves completeness. The focused trace page is where line-by-line teaching happens.

## QMD Patterns

Scrollable code:

````markdown
## Full Algorithm Code

### Use the full version for tracing

::: {.code-scroll}
```java
public static int binarySearch(int[] nums, int target) {
    int left = 0;
    int right = nums.length - 1;

    while (left <= right) {
        int mid = (left + right) / 2;

        if (nums[mid] == target) {
            return mid;
        } else if (nums[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }

    return -1;
}
```
:::
````

Compact scrollable code:

````markdown
::: {.code-scroll .compact}
```java
// longer starter code
```
:::
````

Compact table:

```markdown
## AP String Methods {.table-fit}

| Method | Meaning |
|---|---|
| `int length()` | returns the number of characters |
```

Image fit:

```markdown
## Method Flow {.image-fit}

![Method flow](../../assets/unit/topic/flow.png){fig-align="center" width="70%"}
```

## Prohibited Fixes

- Do not globally shrink all deck text to hide overflow.
- Do not use whole-slide scrolling for normal concept pages.
- Do not replace key algorithm logic with `...` to save space.
- Do not place prompt, full starter code, expected output, and answer reasoning on one slide.
