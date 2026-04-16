#!/usr/bin/env node
/**
 * Validates `outreach_status` on every People/*.md against the ordered allowlist
 * in _schemas/allowlists/person-outreach-status.json (must match Person file class).
 */
import { readFileSync, readdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const peopleDir = join(root, "People");
const allowPath = join(root, "_schemas", "allowlists", "person-outreach-status.json");

const { outreach_status: ALLOWED } = JSON.parse(readFileSync(allowPath, "utf8"));
const allowedSet = new Set(ALLOWED);

function parseFrontmatter(content) {
  const m = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!m) return { fm: null };
  return { fm: m[1] };
}

function getOutreachStatus(fm) {
  const line = fm.match(/^outreach_status:\s*"?([^"\n]+)"?\s*$/m);
  return line ? line[1].trim() : null;
}

function validate(targetFiles = null) {
  const mdFiles = readdirSync(peopleDir).filter((f) => f.endsWith(".md"));
  const errors = [];

  const toCheck =
    targetFiles?.length > 0
      ? [...new Set(targetFiles.map((p) => p.split("/").pop()).filter((f) => f.endsWith(".md")))]
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

    const status = getOutreachStatus(fm);
    if (status === null) {
      errors.push(`${file}: missing outreach_status`);
    } else if (!allowedSet.has(status)) {
      errors.push(`${file}: invalid outreach_status "${status}" (allowed: ${ALLOWED.join(", ")})`);
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
  console.error("person-outreach-status: ok");
  process.exit(0);
}

console.error("Usage: node scripts/person-outreach-status.mjs validate [files...]");
process.exit(1);
