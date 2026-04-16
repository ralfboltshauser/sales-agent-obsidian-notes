import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { test } from "node:test";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const allowPath = join(__dirname, "..", "_schemas", "allowlists", "person-outreach-status.json");
const { outreach_status: ORDER } = JSON.parse(readFileSync(allowPath, "utf8"));

test("outreach_status allowlist: ordered funnel head matches Person workflow", () => {
  assert.equal(ORDER[0], "To Research");
  assert.equal(ORDER[1], "To Contact");
  assert.equal(ORDER[2], "Contacted");
});

test("outreach_status allowlist: no duplicates (validator set semantics)", () => {
  assert.equal(new Set(ORDER).size, ORDER.length);
});

test("outreach_status allowlist: includes terminal states", () => {
  assert(ORDER.includes("Not interested"));
  assert(ORDER.includes("Do not contact"));
});
