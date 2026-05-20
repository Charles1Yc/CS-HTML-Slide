#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const courseRoot = path.join(root, "AP CSA");
const auditDir = path.join(courseRoot, "notes", "rebuild-audit");
const courseDataPath = path.join(courseRoot, "course-data.json");

const requiredDeckHeadings = [
  "## Course Directory",
  "## Classroom Check",
  "## End",
];

const bannedPatterns = [
  { label: "Retained classroom work placeholder", pattern: /Retained classroom work/i },
  { label: "Practice worth keeping placeholder", pattern: /Practice worth keeping/i },
  { label: "Retained task focus placeholder", pattern: /Retained task focus/i },
  { label: "Generic retained-topic phrasing", pattern: /Retained (classroom|task|teaching|extension)/i },
];

const allowedEllipsisLines = [
  /^#{2,6}\s+A (complete|strong) answer should\.\.\.$/,
];

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

function extractRebuiltDecksFromAudit() {
  const decks = new Set();
  const auditFiles = listAuditFiles();

  if (auditFiles.length === 0) {
    fail("No rebuild audit files found under AP CSA/notes/rebuild-audit.");
    return decks;
  }

  for (const filePath of auditFiles) {
    const text = readText(filePath);
    const blocks = extractTopicBlocks(text);

    for (const block of blocks) {
      const blockText = block.lines.join("\n");
      if (!/- Status:\s*rebuilt\b/.test(blockText)) {
        continue;
      }

      for (const required of [
        "- Source file:",
        "- Kept sections:",
        "- Kept exercises:",
        "- Omitted items:",
        "- Verification:",
      ]) {
        if (!blockText.includes(required)) {
          fail(`${path.relative(root, filePath)} ${block.title} missing ${required}`);
        }
      }

      const deckMatches = blockText.matchAll(/- \[x\] Deck: `([^`]+\.qmd)`/g);
      let deckCount = 0;
      for (const match of deckMatches) {
        deckCount += 1;
        decks.add(path.join(root, match[1]));
      }

      if (deckCount === 0) {
        fail(`${path.relative(root, filePath)} ${block.title} has rebuilt status but no checked rebuilt deck.`);
      }
    }
  }

  return decks;
}

function checkCourseDataLinks() {
  if (!fs.existsSync(courseDataPath)) {
    fail("AP CSA/course-data.json not found.");
    return;
  }

  const data = JSON.parse(readText(courseDataPath));
  let deckRefs = 0;

  for (const unit of data.units || []) {
    for (const section of unit.sections || []) {
      for (const topic of section.topics || []) {
        for (const deck of topic.decks || []) {
          deckRefs += 1;
          const href = deck.href || "";
          const target = path.join(courseRoot, href);
          if (!href.endsWith(".html")) {
            fail(`Deck href is not an HTML file for topic ${topic.code}: ${href}`);
          }
          if (!fs.existsSync(target)) {
            fail(`Deck href target missing for topic ${topic.code}: ${path.relative(root, target)}`);
          }
        }
      }
    }
  }

  ok(`course-data deck hrefs checked (${deckRefs} refs).`);
}

function checkRebuiltDeck(deckPath) {
  if (!fs.existsSync(deckPath)) {
    fail(`Rebuilt deck missing: ${path.relative(root, deckPath)}`);
    return;
  }

  const text = readText(deckPath);
  const rel = path.relative(root, deckPath);

  if (!text.includes("clean-revealjs")) {
    fail(`${rel} does not declare clean-revealjs.`);
  }

  for (const heading of requiredDeckHeadings) {
    if (!text.includes(heading)) {
      fail(`${rel} missing required heading: ${heading}`);
    }
  }

  for (const banned of bannedPatterns) {
    if (banned.pattern.test(text)) {
      fail(`${rel} contains ${banned.label}.`);
    }
  }

  const ellipsisLines = text
    .split(/\r?\n/)
    .map((line, index) => ({ line, lineNumber: index + 1 }))
    .filter(({ line }) => line.includes("..."))
    .filter(({ line }) => !allowedEllipsisLines.some((pattern) => pattern.test(line.trim())));

  for (const { lineNumber } of ellipsisLines) {
    fail(`${rel}:${lineNumber} contains possible ellipsis placeholder.`);
  }
}

const rebuiltDecks = extractRebuiltDecksFromAudit();
checkCourseDataLinks();

for (const deckPath of rebuiltDecks) {
  checkRebuiltDeck(deckPath);
}

ok(`rebuilt deck content checks scanned (${rebuiltDecks.size} decks).`);

if (failures > 0) {
  console.error(`Content quality check failed with ${failures} issue(s).`);
  process.exit(1);
}

ok("AP CSA content quality checks passed.");
