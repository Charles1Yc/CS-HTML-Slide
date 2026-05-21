# AP CSA Unit 4 Rebuild Audit

This audit tracks rebuilt Unit 4 topics against CSAwesome2 source content.

## Topic 4.1 Ethical and Social Issues Around Data Collection

- Status: rebuilt
- Source file: `AP CSA/materials/CSAwesome2-main/_sources/Unit4-Data-Collections/topic-4-1-data-ethics.rst`
- Rebuilt decks:
  - [x] Deck: `AP CSA/slides/4-data-collections/4-1-ethical-and-social-issues-around-data-collection.qmd`
- Kept sections:
  - Topic intro explanation
  - Data Privacy
  - Data and Bias
- Kept exercises:
  - `shortanswer:: privacy` -> converted to privacy tradeoff response
  - `shortanswer:: bias` -> converted to bias response task
  - `shortanswer:: datasets` -> converted to dataset checklist prompt
- Omitted items:
  - Summary
- Assets:
  - `Figures/googletimeline.png` -> `AP CSA/assets/4-data-collections/4-1-ethical-and-social-issues-around-data-collection/googletimeline.png`
- Verification:
  - [x] Rendered with `bash scripts/render-clean-reveal.sh`
  - [x] Passed `bash scripts/check-clean-reveal.sh`
  - [x] Passed `node scripts/check-ap-csa-content-quality.mjs`

## Topic 4.2 Introduction to Using Data Sets

- Status: rebuilt
- Source file: `AP CSA/materials/CSAwesome2-main/_sources/Unit4-Data-Collections/topic-4-2-data-sets.rst`
- Rebuilt decks:
  - [x] Deck: `AP CSA/slides/4-data-collections/4-2-introduction-to-using-data-sets.qmd`
- Kept sections:
  - Topic intro explanation
  - Data Sets
- Kept exercises:
  - `parsonsprob:: algorithm-avg-gpa` -> converted to average GPA algorithm task
  - `shortanswer:: honorroll` -> converted to honor roll filter prompt
- Omitted items:
  - Summary
- Assets:
  - No retained topic-specific image.
- Verification:
  - [x] Rendered with `bash scripts/render-clean-reveal.sh`
  - [x] Passed `bash scripts/check-clean-reveal.sh`
  - [x] Passed `node scripts/check-ap-csa-content-quality.mjs`

## Topic 4.3 Array Creation and Access

- Status: rebuilt
- Source file: `AP CSA/materials/CSAwesome2-main/_sources/Unit4-Data-Collections/topic-4-3-array-basics.rst`
- Rebuilt decks:
  - [x] Deck: `AP CSA/slides/4-data-collections/4-3-array-creation-and-access.qmd`
- Kept sections:
  - Topic intro explanation
  - Declaring and Creating an Array
  - Using new to Create Arrays
  - Initializer Lists to Create Arrays
  - Array length
  - Access and Modify Array Values
  - Coding Challenge: Countries Array
- Kept exercises:
  - `shortanswer:: arrayAnalogy` -> converted to array analogy intro
  - `mchoice:: createarray` -> converted to quick check
  - `activecode:: arrayex1`, `arrayex2`, `array-set` -> converted to code tasks
  - `fillintheblank:: array-access1`, `array-access2` -> converted to access checkpoints
  - `activecode:: challenge-array-countries` -> converted to Countries Array starter
- Omitted items:
  - Summary
  - AP Practice
  - Arrays Game
  - Optional image-array and community-object extensions
- Assets:
  - `Figures/rowLockers.jpg` -> `AP CSA/assets/4-data-collections/4-3-array-creation-and-access/rowLockers.jpg`
  - `Figures/arrayIndicies.png` -> `AP CSA/assets/4-data-collections/4-3-array-creation-and-access/arrayIndicies.png`
  - `Figures/intAndStringArrays.png` -> `AP CSA/assets/4-data-collections/4-3-array-creation-and-access/intAndStringArrays.png`
- Verification:
  - [x] Rendered with `bash scripts/render-clean-reveal.sh`
  - [x] Passed `bash scripts/check-clean-reveal.sh`
  - [x] Passed `node scripts/check-ap-csa-content-quality.mjs`

## Topic 4.4 Array Traversals

- Status: rebuilt
- Source file: `AP CSA/materials/CSAwesome2-main/_sources/Unit4-Data-Collections/topic-4-4-array-traversal.rst`
- Rebuilt decks:
  - [x] Deck: `AP CSA/slides/4-data-collections/4-4-array-traversals.qmd`
- Kept sections:
  - Topic intro explanation
  - Index Variables
  - Loops to Traverse Arrays
  - Arrays as Objects and Parameters
  - Looping through Part of an Array
  - Common Errors When Looping Through an Array
  - Enhanced For-Loop for Arrays
  - Enhanced For Loop Limitations
  - Traversing Arrays of Objects
  - Coding Challenge: SpellChecker
- Kept exercises:
  - `activecode:: arraytrace2`, `arrayMethodTrace`, `tripleFirstFour`, `offbyone`, `foreach1`, `evenLoop`, `incrementLoop`, `student-array` -> converted to trace and code task slides
  - `parsonsprob:: patdonsArraySubtract` -> converted to mixed-up traversal task
  - `mchoice:: qIndexOutOfBounds`, `mcq_for_each1`, `mcqfor-each2` -> converted to quick checks
  - `activecode:: challenge-spellchecker` -> converted to SpellChecker groupwork starter
- Omitted items:
  - Summary
  - Arrays Game
  - Optional SpellChecker extension and community extension
- Assets:
  - `Figures/arraywithindex.png` -> `AP CSA/assets/4-data-collections/4-4-array-traversals/arraywithindex.png`
  - `Figures/arrayForLoop.png` -> `AP CSA/assets/4-data-collections/4-4-array-traversals/arrayForLoop.png`
  - `Figures/appinvForEachComparison.png` -> `AP CSA/assets/4-data-collections/4-4-array-traversals/appinvForEachComparison.png`
  - `Figures/spellcheck.png` -> `AP CSA/assets/4-data-collections/4-4-array-traversals/spellcheck.png`
- Verification:
  - [x] Rendered with `bash scripts/render-clean-reveal.sh`
  - [x] Passed `bash scripts/check-clean-reveal.sh`
  - [x] Passed `node scripts/check-ap-csa-content-quality.mjs`

## Topic 4.5 Implementing Array Algorithms

- Status: rebuilt
- Source file: `AP CSA/materials/CSAwesome2-main/_sources/Unit4-Data-Collections/topic-4-5-array-algorithms.rst`
- Rebuilt decks:
  - [x] Deck: `AP CSA/slides/4-data-collections/4-5-implementing-array-algorithms.qmd`
- Kept sections:
  - Topic intro explanation
  - Accumulator Pattern for Sum/Average
  - Min, Max, Search Algorithms
  - Looping From Back to Front
  - Test Property
  - Pairs and Duplicates in Array
  - Rotating Array Elements
  - Reversing an Array
- Kept exercises:
  - `parsonsprob:: parsons_array_avg`, `parsons_for_each_largest`, `parsons-even-array`, `rotateRightParsons`, `parsons_array_reverse` -> converted to mixed-up code tasks
  - `activecode:: enhanced-for-loop-avg`, `minmax`, `early_return_error`, `arrayFindSmaller`, `exAllOdd`, `sumPairs`, `noDups`, `rotate`, `reverseArrayCode` -> converted to code tasks
  - `mchoice:: mcq_array_error1`, `mcq_array_loop1`, `mcq_array_loop2` -> converted to quick checks
- Omitted items:
  - Review and FRQ Practice for Arrays
- Assets:
  - `Figures/swap.png` -> `AP CSA/assets/4-data-collections/4-5-implementing-array-algorithms/swap.png`
- Verification:
  - [x] Rendered with `bash scripts/render-clean-reveal.sh`
  - [x] Passed `bash scripts/check-clean-reveal.sh`
  - [x] Passed `node scripts/check-ap-csa-content-quality.mjs`

## Topic 4.6 Using Text Files

- Status: rebuilt
- Source file: `AP CSA/materials/CSAwesome2-main/_sources/Unit4-Data-Collections/topic-4-6-input-files.rst`
- Rebuilt decks:
  - [x] Deck: `AP CSA/slides/4-data-collections/4-6-using-text-files.qmd`
- Kept sections:
  - Topic intro explanation
  - Java File, Scanner, and IOException Classes
  - Reading in Data with Scanner
  - Loop to Read in a File
  - Save File Data into an Array
  - Split Strings
  - Object-Oriented Design with CSV Files
  - Coding Challenge: Array of Pokemon from Input File
- Kept exercises:
  - `activecode:: throws-exception-exercise`, `calculatorInput`, `loop-read-file`, `read-pokemon-file`, `pokeImages`, `challenge-pokemon-file` -> converted to file input tasks
- Omitted items:
  - Summary
  - Optional Challenge with a Dataset
- Assets:
  - No retained topic-specific image.
- Verification:
  - [x] Rendered with `bash scripts/render-clean-reveal.sh`
  - [x] Passed `bash scripts/check-clean-reveal.sh`
  - [x] Passed `node scripts/check-ap-csa-content-quality.mjs`

## Topic 4.7 Wrapper Classes

- Status: rebuilt
- Source file: `AP CSA/materials/CSAwesome2-main/_sources/Unit4-Data-Collections/topic-4-7-wrapper-classes.rst`
- Rebuilt decks:
  - [x] Deck: `AP CSA/slides/4-data-collections/4-7-wrapper-classes.qmd`
- Kept sections:
  - Topic intro explanation
  - Creating Integer and Double Objects
  - Autoboxing and Unboxing
  - Parsing Strings to Numbers
  - Coding Challenge: Pokemon Speed
- Kept exercises:
  - `activecode:: lcmm1`, `parseMethods`, `wrapperDebug`, `challenge-pokespeed` -> converted to code tasks
  - `dragndrop:: WrapperClasses` -> converted to primitive-wrapper matching table
- Omitted items:
  - Summary
- Assets:
  - No retained topic-specific image.
- Verification:
  - [x] Rendered with `bash scripts/render-clean-reveal.sh`
  - [x] Passed `bash scripts/check-clean-reveal.sh`
  - [x] Passed `node scripts/check-ap-csa-content-quality.mjs`

## Topic 4.8 ArrayList Methods

- Status: rebuilt
- Source file: `AP CSA/materials/CSAwesome2-main/_sources/Unit4-Data-Collections/topic-4-8-arraylists.rst`
- Rebuilt decks:
  - [x] Deck: `AP CSA/slides/4-data-collections/4-8-arraylist-methods.qmd`
- Kept sections:
  - Topic intro explanation
  - import java.util.ArrayList
  - Declaring and Creating ArrayLists
  - ArrayList Methods
  - size
  - add
  - add(index,obj)
  - remove
  - get and set
  - Comparing arrays and ArrayLists
  - Coding Challenge: FRQ Digits
- Kept exercises:
  - `mchoice:: qloopList`, `qlib_1`, `qArrayListInteger`, `qalAdd1`, `qListRem`, `qListRem1` -> converted to quick checks
  - `activecode:: ArrayListCreateStr`, `listAdd`, `StudentArrayList`, `listAddInt2`, `listRem`, `listGetSet`, `array-to-arraylist`, `ArrayListFromArray`, `divideby10`, `challenge-digits` -> converted to code tasks
- Omitted items:
  - Summary
- Assets:
  - `Figures/lists.jpg` -> `AP CSA/assets/4-data-collections/4-8-arraylist-methods/lists.jpg`
- Verification:
  - [x] Rendered with `bash scripts/render-clean-reveal.sh`
  - [x] Passed `bash scripts/check-clean-reveal.sh`
  - [x] Passed `node scripts/check-ap-csa-content-quality.mjs`

## Topic 4.9 ArrayList Traversals

- Status: rebuilt
- Source file: `AP CSA/materials/CSAwesome2-main/_sources/Unit4-Data-Collections/topic-4-9-arraylist-traversal.rst`
- Rebuilt decks:
  - [x] Deck: `AP CSA/slides/4-data-collections/4-9-arraylist-traversals.qmd`
- Kept sections:
  - Topic intro explanation
  - Enhanced For Loop
  - For Loops and IndexOutOfBounds Exception
  - While Loop
  - ArrayList of Student Objects
  - Coding Challenge: FRQ Word Pairs
- Kept exercises:
  - `activecode:: listForEachLoop`, `listForLoop`, `listForEachLoopObj`, `StudentList`, `ArrayListWordPair1`, `challenge-WordPairs` -> converted to traversal and groupwork tasks
  - `parsonsprob:: list_1`, `listInsertParsons` -> converted to mixed-up code tasks
  - `mchoice:: qloopList_1` -> converted to quick check
- Omitted items:
  - Summary
  - Reading in Files with java.nio.file as optional enrichment
- Assets:
  - `Figures/wordpairs.png` -> `AP CSA/assets/4-data-collections/4-9-arraylist-traversals/wordpairs.png`
- Verification:
  - [x] Rendered with `bash scripts/render-clean-reveal.sh`
  - [x] Passed `bash scripts/check-clean-reveal.sh`
  - [x] Passed `node scripts/check-ap-csa-content-quality.mjs`

## Topic 4.10 Implementing ArrayList Algorithms

- Status: rebuilt
- Source file: `AP CSA/materials/CSAwesome2-main/_sources/Unit4-Data-Collections/topic-4-10-arraylist-algorithms.rst`
- Rebuilt decks:
  - [x] Deck: `AP CSA/slides/4-data-collections/4-10-implementing-arraylist-algorithms.qmd`
- Kept sections:
  - Topic intro explanation
  - Add/Remove Elements
  - Min, Max, Sum, Average
  - Finding a property
  - Pairs and Duplicates
  - Shift/Rotate an ArrayList
  - Reversing an ArrayList
  - Multiple or Parallel Data Structures
- Kept exercises:
  - `mchoice:: qListRem3`, `qListRem4` -> converted to removal quick checks
  - `parsonsprob:: arraylistAvgParsons`, `arraylistMinParsons`, `arraylistEvenParsons`, `arraylistDuplicatesParsons`, `rotateArrayListParsons`, `reverseArrayListParsons` -> converted to mixed-up algorithm tasks
  - `activecode:: arrayListRemoveInLoop`, `arraylistMax`, `countOddArrayList`, `arraylistDuplicates`, `rotateNewList`, `reverseNewList`, `parallelArrayLists` -> converted to code tasks
- Omitted items:
  - Summary
  - Review and FRQ Practice with ArrayLists
- Assets:
  - No retained topic-specific image.
- Verification:
  - [x] Rendered with `bash scripts/render-clean-reveal.sh`
  - [x] Passed `bash scripts/check-clean-reveal.sh`
  - [x] Passed `node scripts/check-ap-csa-content-quality.mjs`

## Topic 4.11 2D Array Creation and Access

- Status: rebuilt
- Source file: `AP CSA/materials/CSAwesome2-main/_sources/Unit4-Data-Collections/topic-4-11-2Darrays.rst`
- Rebuilt decks:
  - [x] Deck: `AP CSA/slides/4-data-collections/4-11-2d-array-creation-and-access.qmd`
- Kept sections:
  - Topic intro explanation
  - Array Storage
  - Declaring 2D Arrays
  - Initializer Lists for 2D Arrays
  - Set Values in a 2D Array
  - Get a Value from a 2D Array
  - 2D Array Row and Column length
  - Coding Challenge: ASCII Art
- Kept exercises:
  - `clickablearea:: clicktd1` through `clicktd5` -> converted to row-column identification
  - `fillintheblank:: twodaNumElfill`, `twodaGetElfill` -> converted to checkpoints
  - `activecode:: twoDArrayCreate`, `twoDArraySet`, `twoDArrayInitGet`, `challenge-8-1-ascii-art` -> converted to code tasks
  - `mchoice:: qa2dab_1`, `qa2dab_2`, `qa2ldb_2`, `qa2ldb_3` -> converted to quick checks
- Omitted items:
  - Summary
  - 2D Arrays Game
- Assets:
  - `Figures/2DLockers.jpg` -> `AP CSA/assets/4-data-collections/4-11-2d-array-creation-and-access/2DLockers.jpg`
  - `Figures/rowMajor.png` -> `AP CSA/assets/4-data-collections/4-11-2d-array-creation-and-access/rowMajor.png`
  - `Figures/ArrayRowsAndCols.png` -> `AP CSA/assets/4-data-collections/4-11-2d-array-creation-and-access/ArrayRowsAndCols.png`
- Verification:
  - [x] Rendered with `bash scripts/render-clean-reveal.sh`
  - [x] Passed `bash scripts/check-clean-reveal.sh`
  - [x] Passed `node scripts/check-ap-csa-content-quality.mjs`

## Topic 4.12 2D Array Traversals

- Status: rebuilt
- Source file: `AP CSA/materials/CSAwesome2-main/_sources/Unit4-Data-Collections/topic-4-12-2Darray-traversal.rst`
- Rebuilt decks:
  - [x] Deck: `AP CSA/slides/4-data-collections/4-12-2d-array-traversals.qmd`
- Kept sections:
  - Topic intro explanation
  - Nested Loops
  - Row-Major and Column-Major Traversals
  - Enhanced For-Each Loop for 2D Arrays
  - 2D Array of Objects
  - Coding Challenge: Picture Lab
- Kept exercises:
  - `activecode:: lcgetAverage`, `ColumnMajorTraversal`, `getAvgForEach`, `challenge-picture` -> converted to traversal and Picture Lab tasks
  - `mchoice:: AP-2DArrays` -> converted to quick check
- Omitted items:
  - Summary
  - AP Practice
  - 2D Arrays and Loops Game
- Assets:
  - `Figures/pixel.jpg` -> `AP CSA/assets/4-data-collections/4-12-2d-array-traversals/pixel.jpg`
  - `../../_static/arch.jpg` -> `AP CSA/assets/4-data-collections/4-12-2d-array-traversals/arch.jpg`
- Verification:
  - [x] Rendered with `bash scripts/render-clean-reveal.sh`
  - [x] Passed `bash scripts/check-clean-reveal.sh`
  - [x] Passed `node scripts/check-ap-csa-content-quality.mjs`

## Topic 4.13 Implementing 2D Array Algorithms

- Status: rebuilt
- Source file: `AP CSA/materials/CSAwesome2-main/_sources/Unit4-Data-Collections/topic-4-13-2Darray-algorithms.rst`
- Rebuilt decks:
  - [x] Deck: `AP CSA/slides/4-data-collections/4-13-implementing-2d-array-algorithms.qmd`
- Kept sections:
  - Topic intro explanation
  - Sum, Average, Min, Max 2D Array Algorithms
  - Subsection of a 2D Array for a Property
  - Duplicates in 2D Arrays
  - Rotate and Reverse
- Kept exercises:
  - `activecode:: lca2dloopPart`, `lca2dloopPart2`, `noDups2DArray`, `rotate2DArray` -> converted to code tasks
  - `parsonsprob:: max2DArrayParsons` -> converted to mixed-up max task
- Omitted items:
  - Review and FRQ Practice with 2D arrays
- Assets:
  - No retained topic-specific image.
- Verification:
  - [x] Rendered with `bash scripts/render-clean-reveal.sh`
  - [x] Passed `bash scripts/check-clean-reveal.sh`
  - [x] Passed `node scripts/check-ap-csa-content-quality.mjs`

## Topic 4.14 Searching Algorithms

- Status: rebuilt
- Source file: `AP CSA/materials/CSAwesome2-main/_sources/Unit4-Data-Collections/topic-4-14-searching.rst`
- Rebuilt decks:
  - [x] Deck: `AP CSA/slides/4-data-collections/4-14-searching-algorithms.qmd`
  - [x] Deck: `AP CSA/slides/4-data-collections/4-14-part-2-binary-search.qmd`
  - [x] Deck: `AP CSA/slides/4-data-collections/4-14-part-3-search-runtimes.qmd`
- Kept sections:
  - Topic intro explanation
  - Linear Search
  - Linear Search with 2D Arrays
  - Binary Search
  - Runtimes
  - Coding Challenge: Search Runtimes
- Kept exercises:
  - `activecode:: seqSearch`, `seqSearchList`, `seqSearchStr`, `linearSearch2DArrays`, `binSearch`, `binSearchStrings`, `challenge-search-coding` -> converted to code task slides
  - `mchoice:: qss_1`, `qss_2`, `qbs_1` through `qbs_4` -> converted to quick checks
  - `shortanswer:: challenge-binary-search` -> converted to groupwork runtime prompt
- Omitted items:
  - Summary
- Assets:
  - `Figures/binary-search-small.gif` -> `AP CSA/assets/4-data-collections/4-14-searching-algorithms/binary-search-small.gif`
- Verification:
  - [x] Rendered with `bash scripts/render-clean-reveal.sh`
  - [x] Passed `bash scripts/check-clean-reveal.sh`
  - [x] Passed `node scripts/check-ap-csa-content-quality.mjs`

## Topic 4.15 Sorting Algorithms

- Status: rebuilt
- Source file: `AP CSA/materials/CSAwesome2-main/_sources/Unit4-Data-Collections/topic-4-15-sorting.rst`
- Rebuilt decks:
  - [x] Deck: `AP CSA/slides/4-data-collections/4-15-sorting-algorithms.qmd`
- Kept sections:
  - Topic intro explanation
  - Selection Sort
  - Insertion Sort
  - Coding Challenge: Sort Runtimes
- Kept exercises:
  - `activecode:: selSort`, `insertionSort` -> converted to full code and trace pages
  - `mchoice:: qsel_1`, `qsel_2`, `qins_1`, `qins_2` -> converted to quick checks
  - `shortanswer:: challenge-sorting` -> converted to sort runtimes groupwork prompt
- Omitted items:
  - Summary
  - Search/Sort Multiple-Choice Exercises
- Assets:
  - No retained topic-specific image.
- Verification:
  - [x] Rendered with `bash scripts/render-clean-reveal.sh`
  - [x] Passed `bash scripts/check-clean-reveal.sh`
  - [x] Passed `node scripts/check-ap-csa-content-quality.mjs`

## Topic 4.16 Recursion

- Status: rebuilt
- Source file: `AP CSA/materials/CSAwesome2-main/_sources/Unit4-Data-Collections/topic-4-16-recursion.rst`
- Rebuilt decks:
  - [x] Deck: `AP CSA/slides/4-data-collections/4-16-recursion.qmd`
  - [x] Deck: `AP CSA/slides/4-data-collections/4-16-part-2-factorial.qmd`
  - [x] Deck: `AP CSA/slides/4-data-collections/4-16-part-3-tracing-recursion.qmd`
- Kept sections:
  - Topic intro explanation
  - Recursive Call
  - Why use Recursion
  - Factorial Method
  - Base Case
  - Tracing Recursive Methods
  - Tracing Challenge: Recursion
- Kept exercises:
  - `fillintheblank:: recurb1fill`, `recurb2fill`, `recBase1`, `recFBTracex1`, `recFBTracey1`, `recFBBase2`, `recFBRetX2`, `recFBRetY2`, `recFBRetZ2` -> converted to trace checkpoints
  - `mchoice:: qrb_1` through `qrb_9` -> converted to quick checks
  - `activecode:: FactorialTest` -> converted to factorial code deck
  - `clickablearea:: rec_base1` -> converted to base case identification
- Omitted items:
  - Summary
- Assets:
  - `Figures/triangleSub.png` -> `AP CSA/assets/4-data-collections/4-16-recursion/triangleSub.png`
  - `Figures/cupStack.jpg` -> `AP CSA/assets/4-data-collections/4-16-recursion/cupStack.jpg`
  - `Figures/codeForCallStack.png` -> `AP CSA/assets/4-data-collections/4-16-recursion/codeForCallStack.png`
  - `Figures/errorCallStack.png` -> `AP CSA/assets/4-data-collections/4-16-recursion/errorCallStack.png`
  - `Figures/callTree.png` -> `AP CSA/assets/4-data-collections/4-16-recursion/callTree.png`
- Verification:
  - [x] Rendered with `bash scripts/render-clean-reveal.sh`
  - [x] Passed `bash scripts/check-clean-reveal.sh`
  - [x] Passed `node scripts/check-ap-csa-content-quality.mjs`

## Topic 4.17 Recursive Searching and Sorting

- Status: rebuilt
- Source file: `AP CSA/materials/CSAwesome2-main/_sources/Unit4-Data-Collections/topic-4-17-recursive-search-sort.rst`
- Rebuilt decks:
  - [x] Deck: `AP CSA/slides/4-data-collections/4-17-recursive-searching-and-sorting.qmd`
  - [x] Deck: `AP CSA/slides/4-data-collections/4-17-part-2-merge-sort.qmd`
- Kept sections:
  - Topic intro explanation
  - Recursive Binary Search
  - Merge Sort
  - Tracing Challenge: Recursive Search and Sort
- Kept exercises:
  - `activecode:: BinarySearchLoop`, `recursiveBinarySearch`, `recursiveBinarySearchArrayList`, `mergeSort` -> converted to code and trace pages
  - `shortanswer:: baseCaseQ`, `recursiveCallQ`, `challenge-mergesort`, `challenge-recursive-binary-search` -> converted to response and tracing prompts
  - `mchoice:: qms_1`, `qms_2` -> converted to merge sort quick checks
- Omitted items:
  - Summary
  - Summary and Review Exercises
- Assets:
  - No retained topic-specific image.
- Verification:
  - [x] Rendered with `bash scripts/render-clean-reveal.sh`
  - [x] Passed `bash scripts/check-clean-reveal.sh`
  - [x] Passed `node scripts/check-ap-csa-content-quality.mjs`
