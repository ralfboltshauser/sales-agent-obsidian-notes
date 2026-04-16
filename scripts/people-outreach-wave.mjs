#!/usr/bin/env node
/**
 * Validates that every Person note has `outreach_wave` in frontmatter (integer 1–5).
 * Edit the wave directly in each `People/*.md` file — no sidecar config.
 */
import { readFileSync, readdirSync } from "node:fs";
import { basename, dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const peopleDir = join(__dirname, "..", "People");

function parseFrontmatter(content) {
  const m = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!m) return { fm: null };
  return { fm: m[1] };
}

function getOutreachWave(fm) {
  const line = fm.match(/^outreach_wave:\s*"?(\d+)"?\s*$/m);
  return line ? Number(line[1], 10) : null;
}

function validate(targetFiles = null) {
  const mdFiles = readdirSync(peopleDir).filter((f) => f.endsWith(".md"));
  const errors = [];

  const toCheck =
    targetFiles?.length > 0
      ? [...new Set(targetFiles.map((p) => basename(p)).filter((f) => f.endsWith(".md")))]
      : mdFiles;

  for (const file of toCheck) {
    if (!mdFiles.includes(file)) {
      errors.push(`${file}: not under People/ or missing`);
      continue;
    }
    const path = join(peopleDir, file);
    const content = readFileSync(path, "utf8");
    const { fm } = parseFrontmatter(content);
    if (!fm) {
      errors.push(`${file}: missing YAML frontmatter`);
      continue;
    }

    const wave = getOutreachWave(fm);
    if (wave === null) {
      errors.push(`${file}: missing outreach_wave (use integer 1–5 in YAML)`);
    } else if (!Number.isInteger(wave) || wave < 1 || wave > 5) {
      errors.push(`${file}: outreach_wave must be integer 1–5, got ${wave}`);
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
  console.error("people-outreach-wave: ok");
  process.exit(0);
}

console.error("Usage: node scripts/people-outreach-wave.mjs validate [files...]");
process.exit(1);
