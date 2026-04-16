#!/usr/bin/env node
/**
 * Outreach Sends: DRY field rules — no legacy reply booleans / reply_status;
 * sent_at / responded_at must be null or a plausible date when present.
 */
import { readFileSync, readdirSync } from "node:fs";
import { basename, dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const sendsDir = join(__dirname, "..", "Outreach Sends");

const isMainModule = process.argv[1] && resolve(process.argv[1]) === resolve(__filename);

const FORBIDDEN_KEYS = ["replied", "positive_reply", "reply_status"];

function parseFrontmatter(content) {
  const m = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!m) return { fm: null };
  return { fm: m[1] };
}

/** `null`, `YYYY-MM-DD`, quoted date, or quoted ISO datetime (Obsidian / export). */
export function isAllowedDateYamlScalar(raw) {
  const s = String(raw).trim();
  if (s === "null") return true;
  let inner = s;
  if (s.length >= 2 && s.startsWith('"') && s.endsWith('"')) {
    inner = s.slice(1, -1);
  } else if (s.length >= 2 && s.startsWith("'") && s.endsWith("'")) {
    inner = s.slice(1, -1);
  }
  if (/^\d{4}-\d{2}-\d{2}$/.test(inner)) return true;
  if (/^\d{4}-\d{2}-\d{2}T[\d:.\-+Z]+$/i.test(inner)) return true;
  return false;
}

/**
 * @param {string} fm frontmatter body (between --- lines)
 * @param {string} file label for errors
 * @returns {string[]}
 */
export function validateSendFrontmatter(fm, file) {
  const errors = [];
  if (!fm) {
    errors.push(`${file}: missing YAML frontmatter`);
    return errors;
  }

  for (const key of FORBIDDEN_KEYS) {
    const re = new RegExp(`^${key}:\\s*`, "m");
    if (re.test(fm)) {
      errors.push(
        `${file}: forbidden key "${key}" (use responded_at for replies; see .notes/sales/outreach-send-and-reply-fields.md)`,
      );
    }
  }

  for (const key of ["sent_at", "responded_at"]) {
    const lineRe = new RegExp(`^${key}:\\s*(.+)\\s*$`, "m");
    const m = fm.match(lineRe);
    if (!m) continue;
    if (!isAllowedDateYamlScalar(m[1])) {
      errors.push(
        `${file}: ${key} must be null, YYYY-MM-DD, or ISO datetime string, got ${JSON.stringify(m[1].trim().slice(0, 80))}`,
      );
    }
  }

  return errors;
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
    errors.push(...validateSendFrontmatter(fm, file));
  }

  return errors;
}

if (isMainModule) {
  const cmd = process.argv[2];
  if (cmd === "validate") {
    const only = process.argv.slice(3).filter((a) => !a.startsWith("-"));
    const errors = validate(only);
    if (errors.length) {
      console.error(errors.join("\n"));
      process.exit(1);
    }
    console.error("outreach-send-fields: ok");
    process.exit(0);
  }

  console.error("Usage: node scripts/outreach-send-fields.mjs validate [files...]");
  process.exit(1);
}
