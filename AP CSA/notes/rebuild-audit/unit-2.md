# AP CSA Unit 2 Rebuild Audit

This audit tracks rebuilt Unit 2 topics against CSAwesome2 source content.

## Topic 2.1 Algorithms with Selection and Repetition

- Status: rebuilt
- Source file: `AP CSA/materials/CSAwesome2-main/_sources/Unit2-Selection-and-Iteration/topic-2-1-algorithms.rst`
- Rebuilt decks:
  - [x] Deck: `AP CSA/slides/2-selection-and-iteration/2-1-algorithms-with-selection-and-repetition.qmd`
- Kept sections:
  - Topic intro explanation
  - Selection
  - Repetition
  - Algorithms with Pseudocode and Flowcharts
  - Groupwork Coding Challenge: Algorithms
- Kept exercises:
  - `clickablearea:: clickSelection` -> converted to selection identification slide
  - `clickablearea:: clickRepetition` -> converted to repetition identification slide
  - `parsonsprob:: algorithm-gift` -> converted to mixed-up algorithm slide
  - `mchoice:: trace-algorithm-gift1` and `trace-algorithm-gift2` -> converted to trace quick checks
  - `shortanswer:: challenge-algorithm-snack` -> converted to student response task
- Omitted items:
  - Summary
- Assets:
  - `Figures/algorithms.png` -> `AP CSA/assets/2-selection-and-iteration/2-1-algorithms-with-selection-and-repetition/algorithms.png`
  - `Figures/Condition-two.png` -> `AP CSA/assets/2-selection-and-iteration/2-1-algorithms-with-selection-and-repetition/Condition-two.png`
- Verification:
  - [x] Rendered with `bash scripts/render-clean-reveal.sh`
  - [x] Passed `bash scripts/check-clean-reveal.sh`
  - [x] Passed `node scripts/check-ap-csa-content-quality.mjs`

## Topic 2.2 Boolean Expressions

- Status: rebuilt
- Source file: `AP CSA/materials/CSAwesome2-main/_sources/Unit2-Selection-and-Iteration/topic-2-2-booleans.rst`
- Rebuilt decks:
  - [x] Deck: `AP CSA/slides/2-selection-and-iteration/2-2-boolean-expressions.qmd`
- Kept sections:
  - Topic intro explanation
  - Testing Equality
  - Relational Operators
  - Testing with remainder
  - Groupwork Coding Challenge: Prime Numbers POGIL
- Kept exercises:
  - `activecode:: bool1` -> converted to equality code task
  - `activecode:: boolRef` -> converted to object-reference explanation
  - `activecode:: bool2` -> converted to relational trace code task
  - `dragndrop:: BooleanExps` -> converted to operator table
  - `activecode:: boolRem` -> converted to divisibility code task
  - `activecode:: challenge-primeNumbers` -> converted to prime-number starter
  - `mchoice:: prime1`, `prime2`, `prime3` and `fillintheblank:: prime4`, `prime5` -> converted to prime reasoning quick check
- Omitted items:
  - Summary
  - AP Practice
  - Relational Operators Practice Game
- Assets:
  - `Figures/turtleEquality.png` -> `AP CSA/assets/2-selection-and-iteration/2-2-boolean-expressions/turtleEquality.png`
- Verification:
  - [x] Rendered with `bash scripts/render-clean-reveal.sh`
  - [x] Passed `bash scripts/check-clean-reveal.sh`
  - [x] Passed `node scripts/check-ap-csa-content-quality.mjs`

## Topic 2.3 if Statements

- Status: rebuilt
- Source file: `AP CSA/materials/CSAwesome2-main/_sources/Unit2-Selection-and-Iteration/topic-2-3-ifs.rst`
- Rebuilt decks:
  - [x] Deck: `AP CSA/slides/2-selection-and-iteration/2-3-if-statements.qmd`
- Kept sections:
  - Topic intro explanation
  - One-way selection
  - Relational Operators in If Statements
  - Two-way selection
  - Common Errors with If Statements
  - Groupwork Coding Challenge: Magic 8 Ball
- Kept exercises:
  - `activecode:: if-raining` -> converted to one-way selection trace
  - `fillintheblank:: iffalseOutput` -> converted to quick check
  - `activecode:: if-relational` -> converted to relational code task
  - `mchoice:: mcq-if-trace` -> converted to trace quick check
  - `activecode:: ifHeads`, `licenseifelse`, `scoreifelse` -> converted to two-way selection examples
  - `parsonsprob:: ifelseevenOdd` -> converted to mixed-up even or odd slide
  - `activecode:: if-missing-curlies` -> converted to missing-braces debugging slide
  - `activecode:: challenge-Magic8ball` -> converted to groupwork starter
- Omitted items:
  - Summary
  - AP Practice
- Assets:
  - `Figures/BlocksIfComparison.png` -> `AP CSA/assets/2-selection-and-iteration/2-3-if-statements/BlocksIfComparison.png`
  - `Figures/Condition.png` -> `AP CSA/assets/2-selection-and-iteration/2-3-if-statements/Condition.png`
  - `Figures/Condition-two.png` -> `AP CSA/assets/2-selection-and-iteration/2-3-if-statements/Condition-two.png`
  - `Figures/Magic_eight_ball.png` -> `AP CSA/assets/2-selection-and-iteration/2-3-if-statements/Magic_eight_ball.png`
- Verification:
  - [x] Rendered with `bash scripts/render-clean-reveal.sh`
  - [x] Passed `bash scripts/check-clean-reveal.sh`
  - [x] Passed `node scripts/check-ap-csa-content-quality.mjs`

## Topic 2.4 Nested if Statements

- Status: rebuilt
- Source file: `AP CSA/materials/CSAwesome2-main/_sources/Unit2-Selection-and-Iteration/topic-2-4-nested-ifs.rst`
- Rebuilt decks:
  - [x] Deck: `AP CSA/slides/2-selection-and-iteration/2-4-nested-if-statements.qmd`
- Kept sections:
  - Topic intro explanation
  - Multiway selection
  - Dangling Else Statements
  - Groupwork Coding Challenge: Adventure
- Kept exercises:
  - `activecode:: TryElseIf` -> converted to multiway selection code example
  - `mchoice:: trace-nested-if`, `trace-nested-ifs2`, `trace-nested-ifs3` -> converted to branch-order quick checks
  - `activecode:: ifElseIfDebug` -> converted to branch-order debugging slide
  - `activecode:: danglingelse` -> converted to dangling else explanation
  - `activecode:: challenge-ElseIf-Adventure` -> converted to groupwork starter
- Omitted items:
  - Summary
  - AP Practice
- Assets:
  - `Figures/Condition-three.png` -> `AP CSA/assets/2-selection-and-iteration/2-4-nested-if-statements/Condition-three.png`
  - `Figures/adventure.jpg` -> `AP CSA/assets/2-selection-and-iteration/2-4-nested-if-statements/adventure.jpg`
- Verification:
  - [x] Rendered with `bash scripts/render-clean-reveal.sh`
  - [x] Passed `bash scripts/check-clean-reveal.sh`
  - [x] Passed `node scripts/check-ap-csa-content-quality.mjs`

## Topic 2.5 Compound Boolean Expressions

- Status: rebuilt
- Source file: `AP CSA/materials/CSAwesome2-main/_sources/Unit2-Selection-and-Iteration/topic-2-5-compound-ifs.rst`
- Rebuilt decks:
  - [x] Deck: `AP CSA/slides/2-selection-and-iteration/2-5-compound-boolean-expressions.qmd`
- Kept sections:
  - Topic intro explanation
  - And, Or, and Not
  - Truth Tables
  - Short Circuit Evaluation
  - Groupwork Coding Challenge: Truth Tables POGIL
- Kept exercises:
  - `activecode:: compoundAnd`, `compoundOr`, `compound-number-range`, `not-operator` -> converted to compound condition examples
  - `fillintheblank:: truthTableFill`, `truthTableFill2` -> converted to truth table checkpoint
  - `mchoice:: traceCompoundBools`, `traceCompoundBools2`, `qcbc_or` -> converted to trace quick checks
  - `mchoice:: shortCircuit1`, `shortCircuit2` -> converted to short circuit explanation
  - `activecode:: challenge-truthtables` -> converted to coding challenge
- Omitted items:
  - Summary
  - AP Practice
  - Boolean Game
- Assets:
  - No retained topic-specific image beyond shared diagrams.
- Verification:
  - [x] Rendered with `bash scripts/render-clean-reveal.sh`
  - [x] Passed `bash scripts/check-clean-reveal.sh`
  - [x] Passed `node scripts/check-ap-csa-content-quality.mjs`

## Topic 2.6 Comparing Boolean Expressions

- Status: rebuilt
- Source file: `AP CSA/materials/CSAwesome2-main/_sources/Unit2-Selection-and-Iteration/topic-2-6-comparing-booleans.rst`
- Rebuilt decks:
  - [x] Deck: `AP CSA/slides/2-selection-and-iteration/2-6-comparing-boolean-expressions.qmd`
- Kept sections:
  - Topic intro explanation
  - De Morgan's Laws
  - Truth Tables
  - Simplifying Boolean Expressions
  - Comparing Objects
  - String Equality
  - Equality with New Strings
  - Comparing with null
  - Groupwork Coding Challenge: Truth and Tracing Tables POGIL
- Kept exercises:
  - `activecode:: lcdmtest` -> converted to De Morgan simplification example
  - `mchoice:: compareBool1`, `compareBool2` -> converted to De Morgan quick check
  - `activecode:: lcse1`, `strEquals`, `nullTest` -> converted to string and null code examples
  - `mchoice:: qsbeq_1`, `qsbeq_2`, `qsbeq_3` -> converted to reference equality checkpoints
  - `activecode:: challengeBooleanExpr` -> converted to tracing table task
  - `mchoice:: qcbdm1` through `qcbdm4` and `shortanswer:: challengetracingStrings` -> converted to student response task
- Omitted items:
  - Summary
  - AP Practice
  - Review/Practice for Selection
- Assets:
  - `Figures/demorgan.png` -> `AP CSA/assets/2-selection-and-iteration/2-6-comparing-boolean-expressions/demorgan.png`
  - `Figures/demorganex.png` -> `AP CSA/assets/2-selection-and-iteration/2-6-comparing-boolean-expressions/demorganex.png`
  - `Figures/stringEquality.png` -> `AP CSA/assets/2-selection-and-iteration/2-6-comparing-boolean-expressions/stringEquality.png`
  - `Figures/s1ands2.jpg` -> `AP CSA/assets/2-selection-and-iteration/2-6-comparing-boolean-expressions/s1ands2.jpg`
  - `Figures/s2ands3.jpg` -> `AP CSA/assets/2-selection-and-iteration/2-6-comparing-boolean-expressions/s2ands3.jpg`
- Verification:
  - [x] Rendered with `bash scripts/render-clean-reveal.sh`
  - [x] Passed `bash scripts/check-clean-reveal.sh`
  - [x] Passed `node scripts/check-ap-csa-content-quality.mjs`

## Topic 2.7 while Loops

- Status: rebuilt
- Source file: `AP CSA/materials/CSAwesome2-main/_sources/Unit2-Selection-and-Iteration/topic-2-7-while-loops.rst`
- Rebuilt decks:
  - [x] Deck: `AP CSA/slides/2-selection-and-iteration/2-7-while-loops.qmd`
- Kept sections:
  - Topic intro explanation
  - Three Steps to Writing a Loop
  - Tracing Loops
  - Common Errors with Loops
  - Input-Controlled Loops
  - Groupwork Coding Challenge: Turtle Squares
- Kept exercises:
  - `activecode:: whileloop` -> converted to initialize-test-update code task
  - `parsonsprob:: print_odds_while` -> converted to print-odds task
  - `mchoice:: while1`, `while2`, `while3` -> converted to trace quick checks
  - `activecode:: whileloopbugs` -> converted to infinite-loop debugging slide
  - `clickablearea:: repeatedcode-square` -> converted to repeated-code identification task
  - `activecode:: challenge-turtle-square-while` -> converted to turtle-square groupwork starter
- Omitted items:
  - Summary
  - AP Practice
- Assets:
  - `Figures/loops.png` -> `AP CSA/assets/2-selection-and-iteration/2-7-while-loops/loops.png`
  - `Figures/WhileLoopFlow.png` -> `AP CSA/assets/2-selection-and-iteration/2-7-while-loops/WhileLoopFlow.png`
  - `Figures/loop3steps.png` -> `AP CSA/assets/2-selection-and-iteration/2-7-while-loops/loop3steps.png`
  - `Figures/traceTable.png` -> `AP CSA/assets/2-selection-and-iteration/2-7-while-loops/traceTable.png`
- Verification:
  - [x] Rendered with `bash scripts/render-clean-reveal.sh`
  - [x] Passed `bash scripts/check-clean-reveal.sh`
  - [x] Passed `node scripts/check-ap-csa-content-quality.mjs`

## Topic 2.8 for Loops

- Status: rebuilt
- Source file: `AP CSA/materials/CSAwesome2-main/_sources/Unit2-Selection-and-Iteration/topic-2-8-for-loops.rst`
- Rebuilt decks:
  - [x] Deck: `AP CSA/slides/2-selection-and-iteration/2-8-for-loops.qmd`
- Kept sections:
  - Topic intro explanation
  - Three Parts of a For Loop
  - Decrementing Loops
  - Groupwork Coding Challenge: Turtles Drawing Shapes
- Kept exercises:
  - `activecode:: forloop`, `forloopfromwhile` -> converted to for loop and while-to-for code tasks
  - `mchoice:: mcq-for-1`, `mcq-for-2`, `mcq-for-3` -> converted to iteration-count quick checks
  - `parsonsprob:: print_evens` -> converted to mixed-up even-number code
  - `activecode:: for-bottles-backwards`, `forloop-backwards` -> converted to decrementing loop examples
  - `activecode:: challenge-TurtleLoopShapes` -> converted to turtle polygon groupwork starter
- Omitted items:
  - Summary
  - AP Practice
- Assets:
  - `Figures/loopAppInv.png` -> `AP CSA/assets/2-selection-and-iteration/2-8-for-loops/loopAppInv.png`
  - `Figures/compareForAndWhile.png` -> `AP CSA/assets/2-selection-and-iteration/2-8-for-loops/compareForAndWhile.png`
  - `Figures/ForLoopFlow.png` -> `AP CSA/assets/2-selection-and-iteration/2-8-for-loops/ForLoopFlow.png`
- Verification:
  - [x] Rendered with `bash scripts/render-clean-reveal.sh`
  - [x] Passed `bash scripts/check-clean-reveal.sh`
  - [x] Passed `node scripts/check-ap-csa-content-quality.mjs`

## Topic 2.9 Implementing Selection and Iteration Algorithms

- Status: rebuilt
- Source file: `AP CSA/materials/CSAwesome2-main/_sources/Unit2-Selection-and-Iteration/topic-2-9-loop-algorithms.rst`
- Rebuilt decks:
  - [x] Deck: `AP CSA/slides/2-selection-and-iteration/2-9-implementing-selection-and-iteration-algorithms.qmd`
- Kept sections:
  - Topic intro explanation
  - Accumulator Pattern for Sum/Average
  - Input-Controlled Loop
  - Loop with if and Minimum/Maximum
  - Divisibility
  - Finding Digits with slash and percent
  - Math.random in if Statements
  - Frequency
  - Groupwork Coding Challenge: Prime Number Finder
- Kept exercises:
  - `activecode:: accumulator-practice` -> converted to sum and average code task
  - `activecode:: input-controlled-loop` -> converted to sentinel loop example
  - `activecode:: min-max-practice` -> converted to max update code task
  - `activecode:: isPrimeLoop` -> converted to prime-checking code task
  - `activecode:: checkDigit` -> converted to digit extraction code task
  - `mchoice:: mcq-rnd-ifs` -> converted to probability quick check
  - `activecode:: randomShapes` -> converted to random-choice note
  - `activecode:: challenge-find-primes` -> converted to groupwork starter
- Omitted items:
  - Summary
- Assets:
  - No retained topic-specific image beyond source code tasks.
- Verification:
  - [x] Rendered with `bash scripts/render-clean-reveal.sh`
  - [x] Passed `bash scripts/check-clean-reveal.sh`
  - [x] Passed `node scripts/check-ap-csa-content-quality.mjs`

## Topic 2.10 Implementing String Algorithms

- Status: rebuilt
- Source file: `AP CSA/materials/CSAwesome2-main/_sources/Unit2-Selection-and-Iteration/topic-2-10-strings-loops.rst`
- Rebuilt decks:
  - [x] Deck: `AP CSA/slides/2-selection-and-iteration/2-10-implementing-string-algorithms.qmd`
- Kept sections:
  - Topic intro explanation
  - While Find and Replace Loop
  - For Loops: Reverse String
  - Groupwork Coding Challenge: String Replacement Cats and Dogs
- Kept exercises:
  - `parsonsprob:: removeA` -> converted to mixed-up remove-character task
  - `activecode:: string-replace1` -> converted to count-replacements code task
  - `parsonsprob:: countEs` -> converted to count-letter task
  - `activecode:: reverseString` -> converted to reverse-string trace
  - `activecode:: challenge-string-replace` -> converted to cats-and-dogs groupwork starter
- Omitted items:
  - Summary
- Assets:
  - `Figures/stringIndicies.png` -> `AP CSA/assets/2-selection-and-iteration/2-10-implementing-string-algorithms/stringIndicies.png`
  - `Figures/catordog.jpg` -> `AP CSA/assets/2-selection-and-iteration/2-10-implementing-string-algorithms/catordog.jpg`
- Verification:
  - [x] Rendered with `bash scripts/render-clean-reveal.sh`
  - [x] Passed `bash scripts/check-clean-reveal.sh`
  - [x] Passed `node scripts/check-ap-csa-content-quality.mjs`

## Topic 2.11 Nested Iteration

- Status: rebuilt
- Source file: `AP CSA/materials/CSAwesome2-main/_sources/Unit2-Selection-and-Iteration/topic-2-11-nested-loops.rst`
- Rebuilt decks:
  - [x] Deck: `AP CSA/slides/2-selection-and-iteration/2-11-nested-iteration.qmd`
- Kept sections:
  - Topic intro explanation
  - Nested loop rectangle pattern
  - Nested Loops with Turtles
  - Groupwork Coding Challenge: Turtle Snowflakes
- Kept exercises:
  - `activecode:: lcfcnl1` -> converted to rectangle rows and columns task
  - `mchoice:: nested1`, `nested2` -> converted to nested-loop quick checks
  - `parsonsprob:: nestedParsons1` -> converted to mixed-up nested-loop code
  - `activecode:: TurtleNestedLoop` -> converted to turtle nested-loop code task
  - `activecode:: challenge-Turtle-Nested-Loop-Snowflakes` -> converted to snowflake groupwork starter
- Omitted items:
  - Summary
- Assets:
  - `Figures/nestedloops.png` -> `AP CSA/assets/2-selection-and-iteration/2-11-nested-iteration/nestedloops.png`
- Verification:
  - [x] Rendered with `bash scripts/render-clean-reveal.sh`
  - [x] Passed `bash scripts/check-clean-reveal.sh`
  - [x] Passed `node scripts/check-ap-csa-content-quality.mjs`

## Topic 2.12 Informal Run-Time Analysis

- Status: rebuilt
- Source file: `AP CSA/materials/CSAwesome2-main/_sources/Unit2-Selection-and-Iteration/topic-2-12-loop-analysis.rst`
- Rebuilt decks:
  - [x] Deck: `AP CSA/slides/2-selection-and-iteration/2-12-informal-run-time-analysis.qmd`
- Kept sections:
  - Topic intro explanation
  - Tracing Loops
  - Counting Loop Iterations
  - Analyzing Nested Loops
  - Non-rectangular Nested Loops
  - Groupwork Coding Challenge: POGIL Analyzing Loops
- Kept exercises:
  - `activecode:: example_trace_loop` -> converted to trace example
  - `mchoice:: loop-trace-count`, `loop-trace-count2` -> converted to iteration-count quick checks
  - `activecode:: countstars1` -> converted to single-loop counting example
  - `activecode:: countstars` -> converted to rectangular nested-loop analysis
  - `activecode:: triangle-stars` -> converted to triangular nested-loop analysis
  - `mchoice:: qln1`, `qln2`, `qln3`, `qln4` -> converted to groupwork analysis prompts and quick checks
- Omitted items:
  - Summary
  - Loop Analysis Game
  - Review/Practice for Loops
- Assets:
  - `Figures/whileLoopTrace.png` -> `AP CSA/assets/2-selection-and-iteration/2-12-informal-run-time-analysis/whileLoopTrace.png`
  - `Figures/sumFormula.png` -> `AP CSA/assets/2-selection-and-iteration/2-12-informal-run-time-analysis/sumFormula.png`
- Verification:
  - [x] Rendered with `bash scripts/render-clean-reveal.sh`
  - [x] Passed `bash scripts/check-clean-reveal.sh`
  - [x] Passed `node scripts/check-ap-csa-content-quality.mjs`
