# AP CSA Unit 3 Rebuild Audit

This audit tracks rebuilt Unit 3 topics against CSAwesome2 source content.

## Topic 3.1 Abstraction and Program Design

- Status: rebuilt
- Source file: `AP CSA/materials/CSAwesome2-main/_sources/Unit3-Class-Creation/topic-3-1-abstraction.rst`
- Rebuilt decks:
  - [x] Deck: `AP CSA/slides/3-class-creation/3-1-abstraction-and-program-design.qmd`
- Kept sections:
  - Topic intro explanation
  - Object-Oriented Design
  - UML Class Diagrams
  - Abstraction
  - Data Abstraction
  - Procedural Abstraction
  - Group Challenge: Game Design
- Kept exercises:
  - `shortanswer:: OOD1` -> converted to object-oriented design response task
  - `activecode:: OldMacDonaldSongRepeated` -> converted to procedural abstraction code task
  - `shortanswer:: OOD2` -> converted to game design group challenge
- Omitted items:
  - Summary
- Assets:
  - `Figures/turtleUMLClassDiagram.png` -> `AP CSA/assets/3-class-creation/3-1-abstraction-and-program-design/turtleUMLClassDiagram.png`
- Verification:
  - [x] Rendered with `bash scripts/render-clean-reveal.sh`
  - [x] Passed `bash scripts/check-clean-reveal.sh`
  - [x] Passed `node scripts/check-ap-csa-content-quality.mjs`

## Topic 3.2 Impact of Program Design

- Status: rebuilt
- Source file: `AP CSA/materials/CSAwesome2-main/_sources/Unit3-Class-Creation/topic-3-2-impacts.rst`
- Rebuilt decks:
  - [x] Deck: `AP CSA/slides/3-class-creation/3-2-impact-of-program-design.qmd`
- Kept sections:
  - Topic intro explanation
  - Impact of Program Design
  - Groupwork: Impacts of CS
- Kept exercises:
  - `shortanswer:: impacts` -> converted to student response task
- Omitted items:
  - Summary
- Assets:
  - No retained topic-specific image.
- Verification:
  - [x] Rendered with `bash scripts/render-clean-reveal.sh`
  - [x] Passed `bash scripts/check-clean-reveal.sh`
  - [x] Passed `node scripts/check-ap-csa-content-quality.mjs`

## Topic 3.3 Anatomy of a Class

- Status: rebuilt
- Source file: `AP CSA/materials/CSAwesome2-main/_sources/Unit3-Class-Creation/topic-3-3-anatomy-of-class.rst`
- Rebuilt decks:
  - [x] Deck: `AP CSA/slides/3-class-creation/3-3-anatomy-of-a-class.qmd`
- Kept sections:
  - Topic intro explanation
  - Parts of a Class
  - Designing a Class
  - Data encapsulation
  - Instance Variables
  - Instance Methods
  - Coding Challenge: Virtual Pet Class
  - Design a Class for your Community
- Kept exercises:
  - `activecode:: PersonClass` -> converted to class anatomy code page
  - `clickablearea:: name_instance_variables` -> converted to identify instance variables task
  - `activecode:: PersonClass2` -> converted to instance variable reading task
  - `clickablearea:: name_methods` -> converted to method identification task
  - `activecode:: class-add-print-method` -> converted to add print method code task
  - `activecode:: challenge-VirtualPet-Class` -> converted to virtual pet groupwork starter
  - `activecode:: community-challenge1` -> converted to community class extension
- Omitted items:
  - Summary
  - AP Practice
- Assets:
  - `Figures/PersonClassWithCookies.png` -> `AP CSA/assets/3-class-creation/3-3-anatomy-of-a-class/PersonClassWithCookies.png`
  - `Figures/virtualpet.jpg` -> `AP CSA/assets/3-class-creation/3-3-anatomy-of-a-class/virtualpet.jpg`
- Verification:
  - [x] Rendered with `bash scripts/render-clean-reveal.sh`
  - [x] Passed `bash scripts/check-clean-reveal.sh`
  - [x] Passed `node scripts/check-ap-csa-content-quality.mjs`

## Topic 3.4 Constructors

- Status: rebuilt
- Source file: `AP CSA/materials/CSAwesome2-main/_sources/Unit3-Class-Creation/topic-3-4-constructors.rst`
- Rebuilt decks:
  - [x] Deck: `AP CSA/slides/3-class-creation/3-4-constructors.qmd`
- Kept sections:
  - Topic intro explanation
  - Constructor Signature
  - The Job of a Constructor
  - Coding Challenge: Student Class
  - Design a Class for your Community
- Kept exercises:
  - `clickablearea:: name_constructor` -> converted to constructor identification task
  - `mchoice:: constructor-purpose` -> converted to quick check
  - `activecode:: class-Fraction` -> converted to constructor reading task
  - `activecode:: class-Car` -> converted to constructor code task
  - `activecode:: challenge-Student-class` -> converted to Student class groupwork starter
  - `activecode:: community-challenge2` -> converted to community class constructor extension
- Omitted items:
  - Summary
  - AP Practice
- Assets:
  - No retained topic-specific image.
- Verification:
  - [x] Rendered with `bash scripts/render-clean-reveal.sh`
  - [x] Passed `bash scripts/check-clean-reveal.sh`
  - [x] Passed `node scripts/check-ap-csa-content-quality.mjs`

## Topic 3.5 Methods: How to Write Them

- Status: rebuilt
- Source file: `AP CSA/materials/CSAwesome2-main/_sources/Unit3-Class-Creation/topic-3-5-methods.rst`
- Rebuilt decks:
  - [x] Deck: `AP CSA/slides/3-class-creation/3-5-methods-how-to-write-them.qmd`
  - [x] Deck: `AP CSA/slides/3-class-creation/3-5-part-2-getters-and-tostring.qmd`
  - [x] Deck: `AP CSA/slides/3-class-creation/3-5-part-3-setters-and-parameters.qmd`
  - [x] Deck: `AP CSA/slides/3-class-creation/3-5-part-4-class-pet-challenge.qmd`
- Kept sections:
  - Topic intro explanation
  - Defining and Calling Methods
  - void Methods
  - Non-void Methods
  - Accessors / Getters
  - toString
  - Mutators / Setters
  - Parameters
  - Methods with Parameters that Return Calculated values
  - Coding Challenge: Class Pet
  - Design a Class for your Community
- Kept exercises:
  - `activecode:: PersonPrint` -> converted to add-and-call method task
  - `activecode:: StudentObjExample` -> converted to getters deck code task
  - `activecode:: StudentToString` -> converted to toString code task
  - `activecode:: StudentObjExample2` -> converted to setter design task
  - `mchoice:: setSignature` -> converted to setter signature quick check
  - `activecode:: StringFind` -> converted to calculated-return method task
  - `activecode:: challenge-Pet-Class` -> converted to Class Pet challenge deck
  - `activecode:: community-challenge3` -> converted to community method extension
- Omitted items:
  - Summary
  - AP Practice
- Assets:
  - `Figures/FlowChartCallingMethods.png` -> `AP CSA/assets/3-class-creation/3-5-methods-how-to-write-them/FlowChartCallingMethods.png`
  - `Figures/get-set-comparison.png` -> `AP CSA/assets/3-class-creation/3-5-methods-how-to-write-them/get-set-comparison.png`
  - `Figures/method-param-arg.png` -> `AP CSA/assets/3-class-creation/3-5-methods-how-to-write-them/method-param-arg.png`
  - `Figures/animalclinic.png` -> `AP CSA/assets/3-class-creation/3-5-methods-how-to-write-them/animalclinic.png`
- Verification:
  - [x] Rendered with `bash scripts/render-clean-reveal.sh`
  - [x] Passed `bash scripts/check-clean-reveal.sh`
  - [x] Passed `node scripts/check-ap-csa-content-quality.mjs`

## Topic 3.6 Methods: Passing and Returning References of an Object

- Status: rebuilt
- Source file: `AP CSA/materials/CSAwesome2-main/_sources/Unit3-Class-Creation/topic-3-6-methods-references.rst`
- Rebuilt decks:
  - [x] Deck: `AP CSA/slides/3-class-creation/3-6-methods-passing-and-returning-references-of-an-object.qmd`
- Kept sections:
  - Topic intro explanation
  - Objects as Instance Variables
  - Objects as Arguments
  - Copying Parameter Objects
  - Parameter of the Same Class Type
  - Returning Objects
  - Coding Challenge: Friends and Birthdays
- Kept exercises:
  - `activecode:: AddressPerson` -> converted to object-as-argument task
  - `activecode:: PersonAddressCopy` -> converted to copying reference explanation
  - `activecode:: PersonAddressGet` -> converted to same-class parameter task
  - `activecode:: PersonReturnAddress` -> converted to returning-object task
  - `activecode:: challenge-friend-birthday` -> converted to friends and birthdays groupwork starter
- Omitted items:
  - Summary
- Assets:
  - `Figures/turtleEquality.png` -> `AP CSA/assets/3-class-creation/3-6-methods-passing-and-returning-references-of-an-object/turtleEquality.png`
  - `Figures/cake.jpg` -> `AP CSA/assets/3-class-creation/3-6-methods-passing-and-returning-references-of-an-object/cake.jpg`
- Verification:
  - [x] Rendered with `bash scripts/render-clean-reveal.sh`
  - [x] Passed `bash scripts/check-clean-reveal.sh`
  - [x] Passed `node scripts/check-ap-csa-content-quality.mjs`

## Topic 3.7 Class Variables and Methods

- Status: rebuilt
- Source file: `AP CSA/materials/CSAwesome2-main/_sources/Unit3-Class-Creation/topic-3-7-static-vars-methods.rst`
- Rebuilt decks:
  - [x] Deck: `AP CSA/slides/3-class-creation/3-7-class-variables-and-methods.qmd`
- Kept sections:
  - Topic intro explanation
  - Class Methods
  - Class Variables
  - final keyword
  - Coding Challenge: Static Song and counter
- Kept exercises:
  - `activecode:: staticmethods` -> converted to static method example
  - `activecode:: PersonClassStaticCounter` -> converted to static counter code task
  - `mchoice:: staticTrace` -> converted to quick check
  - `activecode:: TemperatureBugs` -> converted to static/instance debug task
  - `activecode:: finalPi` -> converted to final constant example
  - `activecode:: challenge-static-song` -> converted to static song groupwork starter
- Omitted items:
  - Summary
- Assets:
  - `Figures/FlowChartCallingMethods.png` -> `AP CSA/assets/3-class-creation/3-7-class-variables-and-methods/FlowChartCallingMethods.png`
- Verification:
  - [x] Rendered with `bash scripts/render-clean-reveal.sh`
  - [x] Passed `bash scripts/check-clean-reveal.sh`
  - [x] Passed `node scripts/check-ap-csa-content-quality.mjs`

## Topic 3.8 Scope and Access

- Status: rebuilt
- Source file: `AP CSA/materials/CSAwesome2-main/_sources/Unit3-Class-Creation/topic-3-8-scope-access.rst`
- Rebuilt decks:
  - [x] Deck: `AP CSA/slides/3-class-creation/3-8-scope-and-access.qmd`
- Kept sections:
  - Topic intro explanation
  - Class, Method, and Block Level Scope
  - Local Variables
  - Coding Challenge: Debugging
- Kept exercises:
  - `clickablearea:: name_class_scope` -> converted to class-level scope identification
  - `clickablearea:: name_method_scope` -> converted to method-level scope identification
  - `activecode:: PersonScope` -> converted to scope example
  - `activecode:: PersonLocalVar` -> converted to local variable example
  - `activecode:: challenge-scope-debug` -> converted to debugging groupwork task
- Omitted items:
  - Summary
  - AP Practice
- Assets:
  - `Figures/scopeDiagram.png` -> `AP CSA/assets/3-class-creation/3-8-scope-and-access/scopeDiagram.png`
- Verification:
  - [x] Rendered with `bash scripts/render-clean-reveal.sh`
  - [x] Passed `bash scripts/check-clean-reveal.sh`
  - [x] Passed `node scripts/check-ap-csa-content-quality.mjs`

## Topic 3.9 this Keyword

- Status: rebuilt
- Source file: `AP CSA/materials/CSAwesome2-main/_sources/Unit3-Class-Creation/topic-3-9-this.rst`
- Rebuilt decks:
  - [x] Deck: `AP CSA/slides/3-class-creation/3-9-this-keyword.qmd`
- Kept sections:
  - Topic intro explanation
  - this.instanceVariable
  - this as an Argument
  - Coding Challenge: Bank Account
- Kept exercises:
  - `activecode:: PersonClassThis` -> converted to constructor with this task
  - `activecode:: PayClassThis` -> converted to this-as-argument/code example
  - `mchoice:: AP-this-arg` -> converted to quick check
  - `activecode:: challenge-BankAccount` -> converted to Bank Account groupwork starter
- Omitted items:
  - Summary
  - AP Practice
- Assets:
  - `Figures/thisTrace.png` -> `AP CSA/assets/3-class-creation/3-9-this-keyword/thisTrace.png`
  - `Figures/dollarSign.png` -> `AP CSA/assets/3-class-creation/3-9-this-keyword/dollarSign.png`
- Verification:
  - [x] Rendered with `bash scripts/render-clean-reveal.sh`
  - [x] Passed `bash scripts/check-clean-reveal.sh`
  - [x] Passed `node scripts/check-ap-csa-content-quality.mjs`
