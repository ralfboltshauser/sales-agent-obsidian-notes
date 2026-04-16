---
name: extend-sales-obsidian-vault
description: Extends or adjusts this sales-agent Obsidian vault’s “database” (folders + Metadata Menu file classes + YAML). Covers repo linting (Prettier, markdownlint-cli2, Husky), Obsidian Linter YAML rules, custom Node validators under scripts/, and Bases. Use when adding or renaming properties, new entity types/folders, new relation arrays, validators, or when the user asks how schema/linting fits together in this vault.
---

# Extend the sales-agent Obsidian vault

## Mental model

- **Folder** ≈ table (e.g. `People/`, `Companies/`). Notes are rows; YAML frontmatter is columns.
- **`_schemas/fileClasses/*.md`** = **source of truth** for property names and Metadata Menu editors (`fields` list). Not a separate database—Obsidian reads these markdown files.
- **`MultiFile` (and `Multi`)** = relations to other notes (usually wikilinks in YAML arrays).
- **Repo “lint”** = markdown consistency + **optional** custom scripts (today: `outreach_wave` on all Person files). It does **not** parse Metadata Menu types automatically.

Human overview: [README.md](../../README.md) at vault root.

---

## Metadata Menu field `type`s (this repo)

Use these strings under `fields[].type` in `_schemas/fileClasses/<Entity>.md` (copy an existing file class as a template):

| `type`      | Role                                                               |
| ----------- | ------------------------------------------------------------------ |
| `Input`     | Plain string                                                       |
| `Select`    | Single choice; `options.sourceType: ValuesList` + `valuesList` map |
| `Multi`     | Multi-value (see `ICP` file class)                                 |
| `MultiFile` | Links to other `.md` notes (wikilink lists in YAML)                |
| `Date`      | Dates                                                              |
| `Number`    | Numeric                                                            |
| `Boolean`   | true/false                                                         |

**IDs:** each field has stable `id: …` (Metadata Menu). Prefer not renaming IDs once notes depend on them.

---

## Linting and checks (what runs where)

| Layer                 | Config / entry                                | Scope                                                                                                      |
| --------------------- | --------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| **Prettier**          | `package.json`                                | All `**/*.md` (`format` / `format:check`)                                                                  |
| **markdownlint-cli2** | `.markdownlint-cli2.jsonc`                    | All `**/*.md`; ignores `node_modules`, `.git`, `.agents/**`, `.claude/**`                                  |
| **lint-staged**       | `package.json` + `.husky/pre-commit`          | On **commit**: Prettier + `markdownlint-cli2 --fix` for **staged** `*.md`, then `pnpm run validate:people` |
| **pre-push**          | `.husky/pre-push`                             | `pnpm run check` (full lint + format check + people validator)                                             |
| **Obsidian Linter**   | `.obsidian/plugins/obsidian-linter/data.json` | **Inside Obsidian only** (YAML sort, multi-line arrays for chosen keys, etc.)                              |
| **Custom validators** | `scripts/*.mjs` + `package.json` scripts      | Domain rules not covered by markdownlint (e.g. `scripts/people-outreach-wave.mjs`)                         |

**`pnpm run check`** = `lint` + `format:check` + `validate:people`. Run after schema/content edits before pushing.

**markdownlint** here extends `default: true` with Obsidian-friendly disables (e.g. `MD033`/`MD034` off for wikilinks/ bare URLs). See `.markdownlint-cli2.jsonc` for the exact set.

---

## Obsidian Linter: relation arrays

For new **YAML keys that hold wikilink lists** (`MultiFile`-style), add the key to `ruleConfigs.format-yaml-array.forceMultiLineArrayStyle` in `.obsidian/plugins/obsidian-linter/data.json` so saves stay multi-line and diffs stay readable. Existing keys include `companies`, `personas`, `offer_documents`, etc.—mirror that pattern.

If a new key should sort near the top of YAML, extend `yaml-key-sort.yamlKeyPrioritySortOrder` in the same file.

---

## Flow A — Adjust an existing “database” / properties

1. Edit `_schemas/fileClasses/<Entity>.md`: add/rename fields, update `Select` `valuesList`, etc.
2. If you added a **new multi-link property**: update **Obsidian Linter** `forceMultiLineArrayStyle` (and optionally key sort) as above.
3. If the rule must be **enforced in git**: extend or add a script under `scripts/`, expose it in `package.json`, and add it to `check` (and pre-commit if it should run on every commit).
4. Update **Bases** if columns should appear: `_views/Sales Agent.base` (properties + view order).
5. Run **`pnpm run check`**, fix markdown issues, commit.

**People `outreach_wave`:** enforced by `scripts/people-outreach-wave.mjs` (integer **1–5** in frontmatter, line `outreach_wave: N`). The `Person` file class `Select` labels must stay aligned with that numeric range.

**People `outreach_status`:** ordered allowlist in `_schemas/allowlists/person-outreach-status.json`, enforced by `scripts/person-outreach-status.mjs` (`pnpm run validate:outreach-status`). When adding or renaming a status, update **that JSON**, the **`Person` file class `valuesList` (same order)**, then run `pnpm run check`.

---

## Flow B — Add a new entity type (“new table”)

1. Add a **top-level folder** for notes (match naming style of existing folders).
2. Add **`_schemas/fileClasses/<NewEntity>.md`** with `fields` and correct `type`s; set `icon` if others do.
3. Ensure new notes use **`fileClass`** matching Metadata Menu’s class name and **`type`** in frontmatter consistent with sibling notes in that folder.
4. For **MultiFile** relations: add keys to **Obsidian Linter** `forceMultiLineArrayStyle` when needed; add **inverse** link fields on related file classes if the graph should be editable from both sides.
5. Optional: new **`scripts/<name>.mjs`** + `package.json` script + wire into `check` / `.husky/pre-commit`.
6. Optional: new **Bases** view or extend `Sales Agent.base`.
7. Document the folder in **[README.md](../../README.md)** folder map if it is a first-class entity.
8. **`pnpm run check`** → commit.

---

## Adding a custom validator (pattern)

Follow `scripts/people-outreach-wave.mjs`:

- Read only the notes you care about (e.g. one directory).
- Parse YAML frontmatter between first two `---` lines.
- **`validate` CLI**: exit `0` if ok, `1` with stderr messages if not.
- Register: `"validate:thing": "node scripts/thing.mjs validate"` then chain into `"check"`.

Prefer **small, explicit checks** over trying to infer types from file class markdown.

---

## Anti-patterns

- **Sidecar JSON** for fields that already live in YAML—this vault keeps waves and properties in note frontmatter unless you explicitly design otherwise.
- **Skipping Linter keys** for new wikilink arrays—produces noisy one-line YAML and harder reviews.
- **Relying only on Metadata Menu** for critical invariants—if git must stay green, add a script + `check`.

---

## See also

- [edit-sales-obsidian-vault-notes](../edit-sales-obsidian-vault-notes/SKILL.md) — add or edit individual notes and property values without changing schema or validators.
