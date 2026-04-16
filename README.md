# Sales-agent Obsidian vault — how it’s set up

This vault is **git-backed**, lives **only in this folder** (not the parent `sales-agent` tree), and uses **Metadata Menu** file classes plus **pnpm** checks so markdown stays consistent.

---

## Folder map

| Folder                  | Role                                           | `fileClass` (Metadata Menu) |
| ----------------------- | ---------------------------------------------- | --------------------------- |
| `People/`               | Contacts                                       | `Person`                    |
| `Companies/`            | Accounts                                       | `Company`                   |
| `Personas/`             | Buyer archetypes                               | `Persona`                   |
| `ICPs/`                 | ICP notes; can use subfolders for “child” docs | `ICP`                       |
| `Outreach Sends/`       | Sent threads / sends                           | `OutreachSend`              |
| `Outreach Templates/`   | Reusable copy (linked from personas / sends)   | `OutreachTemplate`          |
| `_schemas/fileClasses/` | **Source of truth** for property definitions   | —                           |
| `_views/`               | Bases (e.g. `Sales Agent.base`)                | —                           |
| `scripts/`              | Repo validators (e.g. People `outreach_wave`)  | —                           |

`INDEX.md` is the human entry point. Optional **child pages** under an ICP live in a subfolder, e.g. `ICPs/<icp-slug--id>/…` with wikilinks + `offer_documents` on the parent ICP.

---

## Tooling & linting (what runs where)

| Layer                          | What it does                                                                                                                                                                                         |
| ------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Prettier**                   | Formats all `**/*.md`.                                                                                                                                                                               |
| **markdownlint-cli2**          | Markdown rules; config: `.markdownlint-cli2.jsonc` (Obsidian-friendly: wikilinks, YAML, etc.).                                                                                                       |
| **Obsidian Linter** (plugin)   | YAML sort + array layout **inside Obsidian**; multi-line lists for relation keys are configured in `.obsidian/plugins/obsidian-linter/data.json` → `format-yaml-array` → `forceMultiLineArrayStyle`. |
| **`pnpm run validate:people`** | Every `People/*.md` must have `outreach_wave` integer **1–5** (`scripts/people-outreach-wave.mjs`).                                                                                                  |

### Commands

- `pnpm install` — installs dev deps + wires Husky (`prepare`).
- `pnpm run check` — **lint + Prettier check + validate:people** (run before push; also **pre-push** hook).
- `pnpm run fix` — format all markdown + lint auto-fix.
- **pre-commit:** `lint-staged` (Prettier + markdownlint on **staged** `*.md`) **then** full `validate:people`.

Bypass hooks: `git commit --no-verify` or `HUSKY=0` (use sparingly).

---

## Flow A — Change properties / schema (keep repo green)

Use this when you add fields, rename selects, or introduce new relation arrays.

1. **Edit the file class**  
   `_schemas/fileClasses/<Name>.md` — add/change `fields` (`Input`, `Select`, `MultiFile`, …). This drives Metadata Menu.

2. **YAML arrays (wikilink lists)**  
   If you add a new property that stores `[[links]]` as a multi-line list, add its key to **Obsidian Linter** → `forceMultiLineArrayStyle` in `.obsidian/plugins/obsidian-linter/data.json` so saves stay consistent.

3. **People-specific rules**  
   If `Person` gains new **required** frontmatter, extend `scripts/people-outreach-wave.mjs` (and `pnpm run check`) so commits cannot drift.

4. **markdownlint / Prettier**  
   If a new folder should be excluded, update `.markdownlint-cli2.jsonc` / `.prettierignore`.

5. **Bases (optional)**  
   For table columns in Obsidian Bases, update `_views/Sales Agent.base` (`properties` + view `order`).

6. **Verify**  
   `pnpm run check` → commit.

---

## Flow B — Add a new note (match existing structure)

1. **Pick the folder** that matches the entity (`People/`, `Companies/`, …). For a **new entity type**, add a folder + new file class in `_schemas/fileClasses/` first (Flow A).

2. **Frontmatter minimum (typical)**
   - `title`, `type` (usually the **folder name**, e.g. `"People"`, `"Outreach Templates"`).
   - `fileClass` matching Metadata Menu (`Person`, `Company`, …).
   - Export-style fields (`notion_id`, …) optional for vault-native notes.

3. **Relations**  
   Use wikilinks in `MultiFile` fields (`companies`, `personas`, `offer_documents`, …) exactly as in similar notes.

4. **People only**  
   Every `People/*.md` must include **`outreach_wave: 1`**–`5` (see `Person` file class labels).

5. **ICP child doc**  
   Put the file under `ICPs/<parent-icp-folder>/`, link from parent via `offer_documents` (and Linked Records / Notes if you want graph clarity).

6. **Check**  
   `pnpm run check`, then commit.

---

## Quick reference

- **Schema index:** `_schemas/README.md`
- **Cursor (agent) skill — extend schema / linting:** `.cursor/skills/extend-sales-obsidian-vault/SKILL.md`
- **Cursor (agent) skill — add/edit notes (no schema changes):** `.cursor/skills/edit-sales-obsidian-vault-notes/SKILL.md`
- **Outreach template ↔ Notion “Outreach Messages” mapping:** footer of `_schemas/fileClasses/OutreachTemplate.md`
- **Remote:** standalone GitHub repo for this directory only; `pnpm` + Husky are for **local + CI-free** quality gates.
