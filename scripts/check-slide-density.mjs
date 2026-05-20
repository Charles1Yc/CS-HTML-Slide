#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const root = process.cwd();

function usage() {
  console.error('Usage: node scripts/check-slide-density.mjs "<glob-or-file.qmd>" [...]');
}

function toPosix(filePath) {
  return filePath.split(path.sep).join("/");
}

function escapeRegex(value) {
  return value.replace(/[|\\{}()[\]^$+?.]/g, "\\$&");
}

function globToRegex(pattern) {
  const normalized = toPosix(path.resolve(root, pattern));
  let regex = "";

  for (let i = 0; i < normalized.length; i += 1) {
    const char = normalized[i];
    const next = normalized[i + 1];

    if (char === "*" && next === "*") {
      regex += ".*";
      i += 1;
    } else if (char === "*") {
      regex += "[^/]*";
    } else if (char === "?") {
      regex += "[^/]";
    } else {
      regex += escapeRegex(char);
    }
  }

  return new RegExp(`^${regex}$`);
}

function globBase(pattern) {
  const absolute = path.resolve(root, pattern);
  const parts = absolute.split(path.sep);
  const base = [];

  for (const part of parts) {
    if (/[*?]/.test(part)) {
      break;
    }
    base.push(part);
  }

  return base.join(path.sep) || path.parse(absolute).root;
}

function walkFiles(dir) {
  if (!fs.existsSync(dir)) {
    return [];
  }

  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === "node_modules" || entry.name.startsWith(".")) {
        continue;
      }
      files.push(...walkFiles(fullPath));
    } else if (entry.isFile()) {
      files.push(fullPath);
    }
  }

  return files;
}

function expandInputs(args) {
  const files = new Set();

  for (const arg of args) {
    if (!/[*?]/.test(arg)) {
      const target = path.resolve(root, arg);
      if (fs.existsSync(target) && target.endsWith(".qmd")) {
        files.add(target);
      }
      continue;
    }

    const regex = globToRegex(arg);
    for (const filePath of walkFiles(globBase(arg))) {
      if (filePath.endsWith(".qmd") && regex.test(toPosix(path.resolve(filePath)))) {
        files.add(path.resolve(filePath));
      }
    }
  }

  return Array.from(files).sort();
}

function splitSlides(text) {
  const lines = text.split(/\r?\n/);
  const slides = [];
  let current = null;
  let inCode = false;

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index];

    if (/^\s*```/.test(line)) {
      inCode = !inCode;
    }

    if (!inCode && /^##\s+/.test(line)) {
      if (current) {
        slides.push(current);
      }
      current = {
        heading: line.trim(),
        lineNumber: index + 1,
        lines: [],
      };
      continue;
    }

    if (current) {
      current.lines.push(line);
    }
  }

  if (current) {
    slides.push(current);
  }

  return slides;
}

function countCodeBlocks(lines) {
  const blocks = [];
  let inCode = false;
  let codeLines = 0;

  for (const line of lines) {
    if (/^\s*```/.test(line)) {
      if (inCode) {
        blocks.push(codeLines);
        codeLines = 0;
      }
      inCode = !inCode;
      continue;
    }

    if (inCode) {
      codeLines += 1;
    }
  }

  return blocks;
}

function slideMetrics(slide) {
  const text = [slide.heading, ...slide.lines].join("\n");
  const nonCodeLines = [];
  let inCode = false;

  for (const line of slide.lines) {
    if (/^\s*```/.test(line)) {
      inCode = !inCode;
      continue;
    }
    if (!inCode) {
      nonCodeLines.push(line);
    }
  }

  const tableLines = nonCodeLines.filter((line) => /^\s*\|.*\|\s*$/.test(line));
  const tableRows = tableLines.filter((line) => !/^\s*\|?\s*:?-{3,}:?\s*(\|\s*:?-{3,}:?\s*)+\|?\s*$/.test(line));

  return {
    heading: slide.heading.replace(/\s*\{.*\}\s*$/, ""),
    lineNumber: slide.lineNumber,
    totalLines: slide.lines.filter((line) => line.trim()).length,
    codeBlocks: countCodeBlocks(slide.lines),
    tableRows: tableRows.length,
    bulletCount: nonCodeLines.filter((line) => /^\s*[-*]\s+/.test(line)).length,
    imageCount: (text.match(/!\[[^\]]*\]\(/g) || []).length,
    hasCodeScroll: /\.code-scroll\b/.test(text),
    hasTableFit: /\.table-fit\b/.test(text),
    hasImageFit: /\.image-fit\b/.test(text),
    hasTwoCol: /\.two-col\b|\.compare-grid\b/.test(text),
  };
}

function analyzeSlide(filePath, slide) {
  const metrics = slideMetrics(slide);
  const maxCodeLines = metrics.codeBlocks.length ? Math.max(...metrics.codeBlocks) : 0;
  const longCodeBlocks = metrics.codeBlocks.filter((count) => count > 8).length;
  const issues = [];

  function add(level, message) {
    issues.push({ level, message });
  }

  if (metrics.totalLines > 42) {
    add("WARN", `dense slide has ${metrics.totalLines} non-empty source lines`);
  }

  if (metrics.codeBlocks.length > 1) {
    add("WARN", `slide has ${metrics.codeBlocks.length} code blocks; consider prompt/answer split`);
  }

  if (longCodeBlocks > 2) {
    add("FAIL", `slide has ${longCodeBlocks} long code blocks`);
  }

  if (maxCodeLines > 55 && !metrics.hasCodeScroll) {
    add("FAIL", `code block has ${maxCodeLines} lines without .code-scroll`);
  } else if (maxCodeLines > 55) {
    add("WARN", `code block has ${maxCodeLines} lines; also provide a focused trace slide`);
  } else if (maxCodeLines > 24 && !metrics.hasCodeScroll) {
    add("WARN", `code block has ${maxCodeLines} lines; use .code-scroll or split`);
  }

  if (metrics.tableRows > 10) {
    add("FAIL", `table has ${metrics.tableRows} rows; split the table`);
  } else if (metrics.tableRows > 6 && !metrics.hasTableFit) {
    add("WARN", `table has ${metrics.tableRows} rows; use .table-fit or split`);
  }

  if (metrics.imageCount > 0 && !metrics.hasImageFit && metrics.bulletCount > 4) {
    add("WARN", `image slide has ${metrics.bulletCount} bullets without .image-fit`);
  }

  if (metrics.hasTwoCol && (metrics.imageCount > 2 || metrics.bulletCount > 6)) {
    add("FAIL", `two-column slide has ${metrics.imageCount} images and ${metrics.bulletCount} bullets; split it`);
  }

  return issues.map((issue) => ({
    ...issue,
    filePath,
    lineNumber: metrics.lineNumber,
    heading: metrics.heading,
  }));
}

const args = process.argv.slice(2);
if (args.length === 0) {
  usage();
  process.exit(2);
}

const qmdFiles = expandInputs(args);
if (qmdFiles.length === 0) {
  console.error("FAIL: no .qmd files matched.");
  process.exit(1);
}

let warningCount = 0;
let failureCount = 0;
let slideCount = 0;

for (const filePath of qmdFiles) {
  const slides = splitSlides(fs.readFileSync(filePath, "utf8"));
  slideCount += slides.length;

  for (const slide of slides) {
    for (const issue of analyzeSlide(filePath, slide)) {
      const rel = path.relative(root, issue.filePath);
      console.log(`${issue.level}: ${rel}:${issue.lineNumber} ${issue.heading} - ${issue.message}`);
      if (issue.level === "FAIL") {
        failureCount += 1;
      } else {
        warningCount += 1;
      }
    }
  }
}

console.log(`OK: scanned ${slideCount} slides in ${qmdFiles.length} qmd file(s).`);

if (warningCount > 0) {
  console.log(`WARN: ${warningCount} density warning(s).`);
}

if (failureCount > 0) {
  console.error(`FAIL: ${failureCount} density failure(s).`);
  process.exit(1);
}

console.log("OK: slide density checks passed.");
