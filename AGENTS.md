# HTML Slide Project Instructions

## Purpose

- 本项目用于把任意科目、任意教材或课程资源制作成 Quarto clean reveal.js HTML Slide。
- `IGCSE CS/`、Unit 3 Hardware 等只是当前已有课程与章节示例；项目规则不得写死为某一单元或某一课程专用流程。
- 正式课件以 `.qmd` 为唯一可维护源文件，`.html` 是由 `.qmd` 渲染生成的交付结果。

## Defaults

- 与用户沟通默认使用中文。
- 本项目课件默认使用当前目录内的 Quarto clean 规范，不使用全局 Quarto 扩展。
- 课程资源、素材、笔记与课件分别放入对应课程目录。现有示例包括 `IGCSE CS/`、`A Level CS/`、`AP CSA/`；新增科目或教材可建立新的课程目录。

## Local Tooling

- HTML / Reveal.js 使用 `_extensions/clean` 中的 `clean-revealjs`，基础模板见 `config/templates/clean-revealjs-basic.qmd`。
- PDF / Typst 使用 `_extensions/clean` 中的 `clean-typst`，基础模板见 `config/templates/clean-typst-basic.qmd`。
- 主题来源保存在 `vendor/quarto-revealjs-clean` 和 `vendor/quarto-clean-typst`；后续修改应优先保持与这些来源一致。
- 最终 HTML 必须由 `.qmd` 通过 `bash scripts/render-clean-reveal.sh <deck.qmd>` 渲染生成，不把手写 Reveal HTML 当作正式成品。

## Textbook-to-Slide Workflow

### Step 1: Course Decomposition

1. **Whole-textbook pass**
   - 粗略阅读整本教材或完整课程资源，重点审查目录、单元边界、页码范围、活动/实验/复习结构。
   - 生成或更新课程大纲目录文件，例如 `<Course>/notes/course-outline.md` 或同等命名文件。
   - 大纲目录使用 `Unit -> Topic -> related knowledge content` 的层级，便于后续对比校验。
   - 通过逻辑校验大纲：检查缺失单元、重复小节、页码跳跃、标题层级冲突、内容归属不清等问题。
   - 依据大纲生成或更新课程主干目录，例如课程 `index.html`、slide manifest、单元目录或 README。

2. **Unit-level pass**
   - 对每个 Unit 逐个做二次检阅，精度高于整本粗读，但仍以结构梳理为主。
   - 生成或更新该 Unit 的 Topic 文件，例如 `<Course>/notes/<unit-slug>-topic-breakdown.md`。
   - Topic 文件应列出每个 Topic 的页码范围、教材标题、相关知识块、图表/活动、预计 slide deck。
   - 如果 Unit 检阅结果与课程大纲冲突，必须回到教材原文做二次校验，并订正课程大纲、Topic 文件和主干目录。

3. **Topic-level pass**
   - 这是生成 Slide 的核心步骤：对每个 Topic 做高精度阅读，先理解内容，再梳理逻辑和讲解顺序。
   - 保留教材自然结构，识别定义、流程、表格、图示、例题、活动、易错点和考试答题点。
   - 按课堂教学动作拆解 Slide，形成 `.qmd`，并在 Topic 文件、manifest 或 audit 中记录该 deck。
   - 如果 Topic 精读发现内容与 Unit Topic 文件冲突，必须校验原文并更新错误内容；不要让旧大纲覆盖新的精读结论。

### Step 2: Render and Asset Handoff

- 完成 Topic `.qmd` 后，使用 `bash scripts/render-clean-reveal.sh <deck.qmd>` 渲染 HTML。
- Topic 写作阶段允许使用临时占位图；占位必须在 Slide 中显示清楚的图片名称或教材编号，例如 `Figure 3.55 screenshot placeholder`。
- 渲染或交付前检查 `Temp ScreenShot/`：如果存在名称相同或明显符合该占位的图片，自动复制一份到课程资产目录，例如 `<Course>/assets/<unit-slug>/<topic-slug>/`，更新 `.qmd` 路径后再渲染。
- 如果 `Temp ScreenShot/` 中不存在符合条件的图片，则保留命名占位，并在交付说明或 audit 中列出缺失图形。
- `Temp ScreenShot/` 中的人工截图原件不得自动删除；它只作为临时交接区。

## Slide Authoring

- 依据教材或课件的自然结构组织内容，保留原有小节、并列要点和讲解顺序；不要跳过教材重点，也不要为“整洁”重排成与教材逻辑无关的结构。
- 教材同一标题下的连续项目符号属于同一整体；即使跨页、被图形或图注打断，也要先识别完整子项数量，再按同一主标题拆成连续 Slide。
- 只有某个概念一页无法清晰容纳时才拆成多页；拆分时主标题保持一致，并用 `1/2`、`2/2` 等副标题编号。
- 语言处理方式是保留教材英文定义与概念原文，对较难单词和专业术语添加行内中文术语注释，例如 `execution (执行)`；不要做逐句中英重复翻译。
- 教材原文优先保留，不随意改写成概括句；只在必要时压缩过长句子。
- 教材中本来是表格的内容，如果表格能清晰呈现，就保持表格形式；必要时拆成多张连续 Slide，而不是压小字体塞进一页。
- 重点图应在 Slide 中占主要视觉比例；能用“图片 + 简短解释”表达时，不额外做标签化组件、dashboard、卡片网格或装饰性容器。

## Highlighting and Checks

- 新建或重制的知识型 clean reveal deck 默认沿用项目高亮规范：在 front matter 的 `include-in-header` 中定义 `.term`、`.mark`、`.tight-list`、`.figure-note`，表格页按需要定义 `.clean-table` 或 `book-table`。
- `.term` 使用红色加粗标出专业术语、设备名、组件名、缩写和考试关键词，例如 `ADC`、`DAC`、`microprocessor`。
- `.mark` 使用黄色底色标出判断条件、阈值、数值、流程关键短语和容易漏写的答题点，例如 `discrete digital values`、`constant values`、`outside the acceptable range`。
- 高亮必须克制：不要整句或整段上色；每页优先标出 2-5 个真正影响理解或得分的关键词。表格中通常只高亮第一列术语和少量关键条件。
- 每个知识型 deck 默认包含 `## Classroom Check` 收束页，位置通常在主体内容之后、`End` 或下一节 `Bridge` 之前；目录页、纯活动页或用户明确要求省略时除外。
- `Classroom Check` 使用 `A complete answer should...`、`A strong answer should...` 等英文句式，列出 3-6 个本 deck 最容易漏写的得分点；可配合 `.tight-list`、`.term` 和 `.mark`，但不要引入新知识或长篇复述。

## Assets

- 教材图形可先从 `Temp ScreenShot/` 接收人工截图；交付前必须归档到对应课程资产目录，例如 `<Course>/assets/<unit-slug>/<topic-slug>/`，并让 qmd 引用课程内资产路径。
- `Temp ScreenShot/` 只作为人工截图暂存区，不作为最终 qmd 或 HTML 的正式图片引用目录。
- 不得自动删除 `Temp ScreenShot/` 中的人工截图原件；即使已归档到课程资产目录，也必须等待用户确认后才能清理。
- 如果某个课件所需图形在临时截图目录中不存在，先在 Slide 中预留位置，并在交付说明中列出缺失图形；不要为了填空而使用不准确截图。
- 如果截图质量不适合投影，先做本地画质增强；仍不适合时再使用高清重制图、网络图片或 AI 生成图替代，并在说明中标记该图不是教材原始截图。

## Verification

- `.qmd` 必须使用 `format: clean-revealjs` 或 `format: { clean-revealjs: ... }`。
- 渲染后运行 `bash scripts/check-clean-reveal.sh <deck.qmd> <deck.html>` 做文本级 clean 检查。
- 如果课程或单元已有专用 completeness/audit 脚本，必须运行对应脚本；例如 Unit 3 相关改动运行 `node scripts/check-unit3-qmd-completeness.mjs`。
- 如果没有专用脚本，至少检查 `.qmd`、`.html`、资产路径、命名占位图、课程大纲/Topic 文件和主干目录是否一致。
- 本项目默认不做浏览器或 headless 渲染校验；用户会人工查看。
