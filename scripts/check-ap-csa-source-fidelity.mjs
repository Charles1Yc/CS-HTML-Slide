#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const auditDir = path.join(root, "AP CSA", "notes", "rebuild-audit");

const requiredStrictFields = [
  "- Fidelity mode: strict textbook",
  "- Source coverage map:",
  "- Compression/adaptation log:",
];

const bannedDeckPatterns = [
  {
    label: "algorithm code compressed into a shape instead of full source code",
    pattern: /Full Code Shape/i,
  },
  {
    label: "self-authored classroom-version wording",
    pattern: /classroom version/i,
  },
  {
    label: "simplification marker",
    pattern: /simplified|simplify|compressed|summarized/i,
  },
  {
    label: "generic replacement task marker",
    pattern: /generic task|generalized task/i,
  },
];

const starterTodoPattern =
  /TODO|Write|Complete|Add|Fill|Implement|your code|missing|student task|replace this|finish/i;

let failures = 0;

function fail(message) {
  failures += 1;
  console.error(`FAIL: ${message}`);
}

function ok(message) {
  console.log(`OK: ${message}`);
}

function readText(filePath) {
  return fs.readFileSync(filePath, "utf8");
}

function listAuditFiles() {
  if (!fs.existsSync(auditDir)) {
    return [];
  }
  return fs
    .readdirSync(auditDir)
    .filter((name) => name.endsWith(".md"))
    .map((name) => path.join(auditDir, name));
}

function resolveInputAuditFiles() {
  const args = process.argv.slice(2);
  if (args.length === 0) {
    return listAuditFiles();
  }

  return args.map((arg) => path.resolve(root, arg));
}

function extractTopicBlocks(auditText) {
  const lines = auditText.split(/\r?\n/);
  const blocks = [];
  let current = null;

  for (const line of lines) {
    if (line.startsWith("## Topic ")) {
      if (current) {
        blocks.push(current);
      }
      current = { title: line.slice(3).trim(), lines: [line] };
    } else if (current) {
      current.lines.push(line);
    }
  }

  if (current) {
    blocks.push(current);
  }

  return blocks;
}

function sectionText(blockText, heading) {
  const start = blockText.indexOf(heading);
  if (start === -1) {
    return "";
  }

  const rest = blockText.slice(start + heading.length);
  const next = rest.search(/\n- [A-Z][^:\n]+:/);
  return next === -1 ? rest : rest.slice(0, next);
}

function checkedDecks(blockText) {
  return [...blockText.matchAll(/- \[x\] Deck: `([^`]+\.qmd)`/g)].map((match) =>
    path.join(root, match[1]),
  );
}

function checkAuditBlock(filePath, block) {
  const rel = path.relative(root, filePath);
  const blockText = block.lines.join("\n");

  if (!/- Status:\s*rebuilt\b/.test(blockText)) {
    return [];
  }

  for (const required of requiredStrictFields) {
    if (!blockText.includes(required)) {
      fail(`${rel} ${block.title} missing strict source-fidelity field: ${required}`);
    }
  }

  const keptSections = sectionText(blockText, "- Kept sections:");
  const keptExercises = sectionText(blockText, "- Kept exercises:");
  const coverageMap = sectionText(blockText, "- Source coverage map:");
  const adaptationLog = sectionText(blockText, "- Compression/adaptation log:");

  for (const [label, text] of [
    ["Kept sections", keptSections],
    ["Kept exercises", keptExercises],
  ]) {
    const keptLines = text
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter((line) => line.startsWith("- "));

    for (const line of keptLines) {
      if (!/source lines? \d+-\d+/i.test(line)) {
        fail(`${rel} ${block.title} ${label} item lacks source line range: ${line}`);
      }
      if (!/->\s*`[^`]+\.qmd`/i.test(line)) {
        fail(`${rel} ${block.title} ${label} item lacks destination deck path: ${line}`);
      }
      if (/\bconverted to\b/i.test(line) && !/preserved|starter|prompt|tests?|expected|reasoning|trace|blocks/i.test(line)) {
        fail(`${rel} ${block.title} ${label} item uses weak conversion wording: ${line}`);
      }
    }
  }

  if (coverageMap && !/source lines? \d+-\d+\s*->\s*`[^`]+\.qmd`/i.test(coverageMap)) {
    fail(`${rel} ${block.title} Source coverage map has no source-to-slide line mapping.`);
  }

  if (adaptationLog && !/(^|\n)\s*-\s*(none|source lines? \d+-\d+)/i.test(adaptationLog)) {
    fail(`${rel} ${block.title} Compression/adaptation log must be 'none' or source-line-specific.`);
  }

  return checkedDecks(blockText);
}

function codeBlockAfterStarter(lines, startIndex) {
  let codeStart = -1;
  for (let i = startIndex + 1; i < Math.min(lines.length, startIndex + 40); i += 1) {
    if (lines[i].trim().startsWith("```")) {
      codeStart = i;
      break;
    }
    if (i > startIndex + 1 && lines[i].startsWith("## ")) {
      return "";
    }
  }

  if (codeStart === -1) {
    return "";
  }

  const collected = [];
  for (let i = codeStart + 1; i < lines.length; i += 1) {
    if (lines[i].trim().startsWith("```")) {
      break;
    }
    collected.push(lines[i]);
  }
  return collected.join("\n");
}

function checkDeck(deckPath) {
  if (!fs.existsSync(deckPath)) {
    fail(`Rebuilt deck missing: ${path.relative(root, deckPath)}`);
    return;
  }

  const text = readText(deckPath);
  const rel = path.relative(root, deckPath);

  for (const banned of bannedDeckPatterns) {
    if (banned.pattern.test(text)) {
      fail(`${rel} contains ${banned.label}.`);
    }
  }

  const lines = text.split(/\r?\n/);
  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i].trim();
    if (line === "Starter:" || /^#+\s+.*Starter/i.test(line)) {
      const starterCode = codeBlockAfterStarter(lines, i);
      if (starterCode && !starterTodoPattern.test(starterCode)) {
        fail(`${rel}:${i + 1} starter code appears complete; keep textbook blanks/TODOs and move answers to a later slide.`);
      }
    }
  }
}

const auditFiles = resolveInputAuditFiles();

if (auditFiles.length === 0) {
  fail("No AP CSA rebuild audit files found.");
}

const deckPaths = new Set();
for (const filePath of auditFiles) {
  if (!fs.existsSync(filePath)) {
    fail(`Audit file not found: ${path.relative(root, filePath)}`);
    continue;
  }

  const blocks = extractTopicBlocks(readText(filePath));
  for (const block of blocks) {
    for (const deckPath of checkAuditBlock(filePath, block)) {
      deckPaths.add(deckPath);
    }
  }
}

for (const deckPath of deckPaths) {
  checkDeck(deckPath);
}

ok(`source-fidelity audit scanned ${auditFiles.length} audit file(s) and ${deckPaths.size} rebuilt deck(s).`);

if (failures > 0) {
  console.error(`AP CSA source fidelity check failed with ${failures} issue(s).`);
  process.exit(1);
}

ok("AP CSA source fidelity checks passed.");
