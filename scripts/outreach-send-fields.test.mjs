import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { unlinkSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { test } from "node:test";
import { fileURLToPath } from "node:url";

import { isAllowedDateYamlScalar, validateSendFrontmatter } from "./outreach-send-fields.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

test("isAllowedDateYamlScalar accepts null and common date shapes", () => {
  assert.equal(isAllowedDateYamlScalar("null"), true);
  assert.equal(isAllowedDateYamlScalar('"2026-04-15"'), true);
  assert.equal(isAllowedDateYamlScalar("2026-04-15"), true);
  assert.equal(isAllowedDateYamlScalar('"2026-04-16T09:27:53.670Z"'), true);
});

test("isAllowedDateYamlScalar rejects garbage", () => {
  assert.equal(isAllowedDateYamlScalar("yesterday"), false);
  assert.equal(isAllowedDateYamlScalar("true"), false);
});

test("validateSendFrontmatter passes minimal clean send", () => {
  const fm = `sent_at: null
responded_at: null
channel: "Email"
`;
  const err = validateSendFrontmatter(fm, "x.md");
  assert.deepEqual(err, []);
});

test("validateSendFrontmatter fails on legacy replied key", () => {
  const fm = `sent_at: null
replied: false
`;
  const err = validateSendFrontmatter(fm, "x.md");
  assert.equal(err.length, 1);
  assert.match(err[0], /forbidden key.*replied/i);
});

test("validateSendFrontmatter fails on invalid sent_at", () => {
  const fm = `sent_at: not-a-date
`;
  const err = validateSendFrontmatter(fm, "x.md");
  assert.equal(err.length, 1);
  assert.match(err[0], /sent_at/);
});

test("validate:outreach-send-fields passes on repository Outreach Sends", () => {
  const r = spawnSync("node", ["scripts/outreach-send-fields.mjs", "validate"], {
    cwd: root,
    encoding: "utf8",
  });
  assert.equal(r.status, 0, r.stderr || r.stdout);
});

test("validate:outreach-send-fields fails when replied is present", () => {
  const name = `_tmp-outreach-send-fields-${process.pid}.md`;
  const path = join(root, "Outreach Sends", name);
  writeFileSync(
    path,
    `---
title: tmp bad send
sent_at: null
responded_at: null
replied: true
---
`,
    "utf8",
  );
  try {
    const r = spawnSync("node", ["scripts/outreach-send-fields.mjs", "validate", name], {
      cwd: root,
      encoding: "utf8",
    });
    assert.notEqual(r.status, 0, "expected validator to reject replied");
    assert.match(r.stderr || r.stdout, /replied/i);
  } finally {
    try {
      unlinkSync(path);
    } catch {
      /* ignore */
    }
  }
});
