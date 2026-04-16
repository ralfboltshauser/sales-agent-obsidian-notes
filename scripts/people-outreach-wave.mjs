#!/usr/bin/env node
/**
 * Validates `outreach_wave` (1–5) on Person notes against scripts/outreach-waves.json.
 * `sync` writes/updates frontmatter from the JSON (source of truth for ordering).
 */
import { readFileSync, writeFileSync, readdirSync, existsSync } from "node:fs";
import { basename, dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const peopleDir = join(root, "People");
const wavesPath = join(__dirname, "outreach-waves.json");

function loadWaves() {
  const raw = readFileSync(wavesPath, "utf8");
  return JSON.parse(raw);
}

function parseFrontmatter(content) {
  const m = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!m) return { body: content, fm: null, raw: null };
  return { fm: m[1], body: content.slice(m[0].length), raw: m[0] };
}

function getOutreachWave(fm) {
  const line = fm.match(/^outreach_wave:\s*"?(\d+)"?\s*$/m);
  return line ? Number(line[1], 10) : null;
}

function setOutreachWave(fm, wave) {
  if (/^outreach_wave:\s*"?(\d+)"?\s*$/m.test(fm)) {
    return fm.replace(/^outreach_wave:\s*"?(\d+)"?\s*$/m, `outreach_wave: ${wave}`);
  }
  const status = fm.match(/^outreach_status:.*$/m);
  if (!status) {
    throw new Error("frontmatter missing outreach_status; cannot insert outreach_wave");
  }
  return fm.replace(
    /^outreach_status:.*$/m,
    (line) => `${line}\noutreach_wave: ${wave}`,
  );
}

function validate(targetFiles = null) {
  const waves = loadWaves();
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
    if (!fm) errors.push(`${file}: missing YAML frontmatter`);

    const expected = waves[file];
    if (expected === undefined) {
      errors.push(`${file}: not listed in scripts/outreach-waves.json`);
      continue;
    }
    if (typeof expected !== "number" || expected < 1 || expected > 5) {
      errors.push(`scripts/outreach-waves.json: invalid wave for ${file}`);
      continue;
    }

    const actual = getOutreachWave(fm);
    if (actual === null) errors.push(`${file}: missing outreach_wave (1–5)`);
    else if (actual !== expected) {
      errors.push(`${file}: outreach_wave is ${actual}, expected ${expected}`);
    }
  }

  if (!targetFiles?.length) {
    for (const key of Object.keys(waves)) {
      if (!mdFiles.includes(key)) {
        errors.push(`scripts/outreach-waves.json: ${key} has no matching file in People/`);
      }
    }
    for (const file of mdFiles) {
      if (waves[file] === undefined) {
        errors.push(`${file}: missing entry in scripts/outreach-waves.json`);
      }
    }
  }

  return errors;
}

function sync() {
  const waves = loadWaves();
  for (const [file, wave] of Object.entries(waves)) {
    const path = join(peopleDir, file);
    if (!existsSync(path)) throw new Error(`Missing People/${file}`);
    const content = readFileSync(path, "utf8");
    const { fm, body, raw } = parseFrontmatter(content);
    if (!fm) throw new Error(`People/${file}: missing frontmatter`);
    const nextFm = setOutreachWave(fm, wave);
    if (nextFm === fm && getOutreachWave(fm) === wave) continue;
    const nextRaw = `---\n${nextFm}\n---`;
    writeFileSync(path, `${nextRaw}${body}`, "utf8");
  }
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

if (cmd === "sync") {
  sync();
  const errors = validate();
  if (errors.length) {
    console.error(errors.join("\n"));
    process.exit(1);
  }
  console.error("people-outreach-wave: synced and validated");
  process.exit(0);
}

console.error('Usage: node scripts/people-outreach-wave.mjs validate [files...] | sync');
process.exit(1);
