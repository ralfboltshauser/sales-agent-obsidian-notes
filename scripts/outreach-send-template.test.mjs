import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { unlinkSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { test } from "node:test";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

test("validate:outreach-sends passes on repository Outreach Sends", () => {
  const r = spawnSync("node", ["scripts/outreach-send-template.mjs", "validate"], {
    cwd: root,
    encoding: "utf8",
  });
  assert.equal(r.status, 0, r.stderr || r.stdout);
});

test("validate:outreach-sends fails when template has no Outreach Templates wikilink", () => {
  const name = `_tmp-outreach-send-validator-${process.pid}.md`;
  const path = join(root, "Outreach Sends", name);
  writeFileSync(
    path,
    `---
title: tmp bad send
type: "Outreach Sends"
fileClass: "OutreachSend"
template:
  - "[[People/foo|Foo]]"
---
`,
    "utf8",
  );
  try {
    const r = spawnSync("node", ["scripts/outreach-send-template.mjs", "validate", name], {
      cwd: root,
      encoding: "utf8",
    });
    assert.notEqual(r.status, 0, "expected validator to reject bad template link");
    assert.match(r.stderr || r.stdout, /Outreach Templates/i);
  } finally {
    try {
      unlinkSync(path);
    } catch {
      /* ignore */
    }
  }
});
