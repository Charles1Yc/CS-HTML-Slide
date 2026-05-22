#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const root = process.cwd();

function usage() {
  console.error('Usage: node scripts/check-slide-overflow.mjs [--viewport=1600x900] [--warn-only] "<glob-or-file.html>" [...]');
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
      if (fs.existsSync(target) && target.endsWith(".html")) {
        files.add(target);
      }
      continue;
    }

    const regex = globToRegex(arg);
    for (const filePath of walkFiles(globBase(arg))) {
      if (filePath.endsWith(".html") && regex.test(toPosix(path.resolve(filePath)))) {
        files.add(path.resolve(filePath));
      }
    }
  }

  return Array.from(files).sort();
}

function parseArgs(argv) {
  const options = {
    viewport: { width: 1600, height: 900 },
    warnOnly: false,
    files: [],
  };

  for (const arg of argv) {
    if (arg === "--warn-only") {
      options.warnOnly = true;
      continue;
    }

    if (arg.startsWith("--viewport=")) {
      const value = arg.slice("--viewport=".length);
      const match = value.match(/^(\d+)x(\d+)$/);
      if (!match) {
        throw new Error(`Invalid viewport: ${value}`);
      }
      options.viewport = {
        width: Number(match[1]),
        height: Number(match[2]),
      };
      continue;
    }

    options.files.push(arg);
  }

  return options;
}

async function launchBrowser(chromium) {
  try {
    return await chromium.launch({ headless: true });
  } catch (defaultError) {
    try {
      return await chromium.launch({ headless: true, channel: "chrome" });
    } catch (channelError) {
      console.error("FAIL: could not launch Playwright Chromium or Chrome channel.");
      console.error(defaultError.message);
      console.error(channelError.message);
      process.exit(2);
    }
  }
}

async function checkDeck(page, filePath) {
  const url = pathToFileURL(filePath).href;
  await page.goto(url, { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(250);

  const revealReady = await page.evaluate(() => Boolean(window.Reveal && document.querySelector(".reveal .slides")));
  if (!revealReady) {
    return [{
      level: "FAIL",
      filePath,
      slide: "deck",
      heading: "(no reveal deck)",
      message: "HTML does not expose a Reveal deck",
    }];
  }

  const slideIndices = await page.evaluate(() => {
    const sections = Array.from(document.querySelectorAll(".reveal .slides > section"));
    const indices = [];

    sections.forEach((section, h) => {
      const verticalSections = Array.from(section.children).filter((child) => child.tagName === "SECTION");
      if (verticalSections.length > 0) {
        verticalSections.forEach((_, v) => indices.push({ h, v }));
      } else {
        indices.push({ h, v: 0 });
      }
    });

    return indices;
  });

  const issues = [];

  for (let slideNumber = 0; slideNumber < slideIndices.length; slideNumber += 1) {
    const index = slideIndices[slideNumber];
    await page.evaluate(({ h, v }) => window.Reveal.slide(h, v), index);
    await page.waitForTimeout(80);

    const result = await page.evaluate(() => {
      const slide = window.Reveal.getCurrentSlide();
      const heading = slide?.querySelector("h2, h1, h3")?.textContent?.trim() || "(untitled)";
      const verticalOverflow = Math.ceil((slide?.scrollHeight || 0) - (slide?.clientHeight || 0));
      const horizontalOverflow = Math.ceil((slide?.scrollWidth || 0) - (slide?.clientWidth || 0));
      const slideRect = slide.getBoundingClientRect();
      const candidates = Array.from(slide.querySelectorAll("*")).filter((element) => {
        const allowedScroller = element.closest(".code-scroll, .scroll-block");
        if (allowedScroller) {
          return element === allowedScroller;
        }

        const plainCodeBlock = element.closest("pre");
        return !plainCodeBlock || element === plainCodeBlock;
      });

      let visualBottomOverflow = 0;
      let visualRightOverflow = 0;

      for (const element of candidates) {
        const rect = element.getBoundingClientRect();
        if (rect.width === 0 && rect.height === 0) {
          continue;
        }
        visualBottomOverflow = Math.max(visualBottomOverflow, Math.ceil(rect.bottom - slideRect.bottom));
        visualRightOverflow = Math.max(visualRightOverflow, Math.ceil(rect.right - slideRect.right));
      }

      return {
        heading,
        verticalOverflow,
        horizontalOverflow,
        visualBottomOverflow,
        visualRightOverflow,
      };
    });

    const tolerance = 6;
    const overflows = [];

    if (result.verticalOverflow > tolerance) {
      overflows.push(`vertical ${result.verticalOverflow}px`);
    }
    if (result.horizontalOverflow > tolerance) {
      overflows.push(`horizontal ${result.horizontalOverflow}px`);
    }
    if (result.visualBottomOverflow > tolerance) {
      overflows.push(`visual-bottom ${result.visualBottomOverflow}px`);
    }
    if (result.visualRightOverflow > tolerance) {
      overflows.push(`visual-right ${result.visualRightOverflow}px`);
    }

    if (overflows.length > 0) {
      issues.push({
        level: "FAIL",
        filePath,
        slide: `${slideNumber + 1}/${slideIndices.length}`,
        heading: result.heading,
        message: overflows.join(", "),
      });
    }
  }

  return issues;
}

const args = process.argv.slice(2);
if (args.length === 0) {
  usage();
  process.exit(2);
}

let options;
try {
  options = parseArgs(args);
} catch (error) {
  console.error(`FAIL: ${error.message}`);
  process.exit(2);
}

const htmlFiles = expandInputs(options.files);
if (htmlFiles.length === 0) {
  console.error("FAIL: no .html files matched.");
  process.exit(1);
}

let chromium;
try {
  ({ chromium } = await import("playwright"));
} catch (error) {
  console.error("FAIL: Playwright is not installed. Run `npm install` first.");
  process.exit(2);
}

const browser = await launchBrowser(chromium);
const page = await browser.newPage({ viewport: options.viewport });

let failureCount = 0;
let slideIssueCount = 0;

for (const filePath of htmlFiles) {
  const issues = await checkDeck(page, filePath);
  for (const issue of issues) {
    const rel = path.relative(root, issue.filePath);
    const level = options.warnOnly ? "WARN" : issue.level;
    console.log(`${level}: ${rel} slide ${issue.slide} ${issue.heading} - ${issue.message}`);
    slideIssueCount += 1;
    if (!options.warnOnly && issue.level === "FAIL") {
      failureCount += 1;
    }
  }
}

await browser.close();

console.log(`OK: checked ${htmlFiles.length} html deck(s) at ${options.viewport.width}x${options.viewport.height}.`);

if (slideIssueCount > 0) {
  console.log(`${options.warnOnly ? "WARN" : "FAIL"}: ${slideIssueCount} slide overflow issue(s).`);
}

if (failureCount > 0) {
  process.exit(1);
}

console.log("OK: slide overflow checks passed.");
