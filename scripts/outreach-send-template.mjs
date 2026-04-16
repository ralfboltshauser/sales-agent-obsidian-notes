#!/usr/bin/env node
/**
 * Every Outreach Sends/*.md must link at least one Outreach Templates note via YAML `template:` (MultiFile).
 */
import { readFileSync, readdirSync } from "node:fs";
import { basename, dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const sendsDir = join(__dirname, "..", "Outreach Sends");
const TEMPLATE_PATH = "Outreach Templates/";
const TEMPLATE_LINK = new RegExp(String.raw`\[\[Outreach Templates\/[^[\]]+]]`, "m");

function parseFrontmatter(content) {
  const m = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!m) return { fm: null };
  return { fm: m[1] };
}

/** Value block for `template:` until next top-level YAML key (line `word:` at column 0). */
function extractTemplateBlock(fm) {
  const lines = fm.split(/\r?\n/);
  const i = lines.findIndex((l) => /^template:\s*/.test(l));
  if (i === -1) return null;
  const first = lines[i];
  if (/^template:\s*\[\]\s*$/.test(first)) return "";
  if (/^template:\s*null\s*$/.test(first)) return "";
  const parts = [first];
  for (let j = i + 1; j < lines.length; j++) {
    const line = lines[j];
    if (/^[A-Za-z_][A-Za-z0-9_]*:\s/.test(line)) break;
    parts.push(line);
  }
  return parts.join("\n");
}

function validate(targetFiles = null) {
  const mdFiles = readdirSync(sendsDir).filter((f) => f.endsWith(".md"));
  const errors = [];

  const toCheck =
    targetFiles?.length > 0
      ? [...new Set(targetFiles.map((p) => basename(p)).filter((f) => f.endsWith(".md")))]
      : mdFiles;

  for (const file of toCheck) {
    if (!mdFiles.includes(file)) {
      errors.push(`${file}: not under Outreach Sends/ or missing`);
      continue;
    }
    const path = join(sendsDir, file);
    const content = readFileSync(path, "utf8");
    const { fm } = parseFrontmatter(content);
    if (!fm) {
      errors.push(`${file}: missing YAML frontmatter`);
      continue;
    }

    const block = extractTemplateBlock(fm);
    if (block === null) {
      errors.push(`${file}: missing template field`);
      continue;
    }
    if (!block.trim()) {
      errors.push(
        `${file}: template must link at least one note under ${TEMPLATE_PATH} (non-empty template list)`,
      );
      continue;
    }
    if (!TEMPLATE_LINK.test(block)) {
      errors.push(
        `${file}: template must include a wikilink like [[Outreach Templates/...]] (got: ${JSON.stringify(block.slice(0, 120))}…)`,
      );
    }
  }

  return errors;
}

const cmd = process.argv[2];
if (cmd === "validate") {
  const only = process.argv.slice(3).filter((a) => !a.startsWith("-"));
  const errors = validate(only);
  if (errors.length) {
    console.error(errors.join("\n"));
    process.exit(1);
  }
  console.error("outreach-send-template: ok");
  process.exit(0);
}

console.error("Usage: node scripts/outreach-send-template.mjs validate [files...]");
process.exit(1);
