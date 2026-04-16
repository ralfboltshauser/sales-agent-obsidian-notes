---
name: edit-sales-obsidian-vault-notes
description: Day-to-day work inside this sales-agent Obsidian vault—adding notes in existing folders, editing frontmatter and relations, Metadata Menu and Linter behavior, wikilinks, People outreach_wave and outreach_status (must match the ordered allowlist), ICP child pages. Use when creating or updating individual pages or property values without changing file classes, new entity folders, or repo validators. For schema/tooling changes, use the extend-sales-obsidian-vault skill instead.
---

# Edit notes in the sales-agent Obsidian vault

## When to use this skill vs `extend-sales-obsidian-vault`

| Situation                                                                                | Use this skill | Use [extend-sales-obsidian-vault](../extend-sales-obsidian-vault/SKILL.md) |
| ---------------------------------------------------------------------------------------- | -------------- | -------------------------------------------------------------------------- |
| New person / company / template in an **existing** folder                                | Yes            | —                                                                          |
| Change field values, links, body                                                         | Yes            | —                                                                          |
| New **entity type**, new folder “table”, rename properties everywhere, new git validator | —              | Yes                                                                        |

Vault map and git hooks: [README.md](../../README.md).

Outbound process (research → message → log): [sales-outreach-playbook](../sales-outreach-playbook/SKILL.md).

---

## Plugins to rely on

- **Metadata Menu** — edit `fileClass` notes via the class UI; keeps keys aligned with `_schemas/fileClasses/`.
- **Obsidian Linter** — on save: YAML key sort, multi-line arrays for configured relation keys (see `.obsidian/plugins/obsidian-linter/data.json`). Prefer saving in Obsidian so layout stays consistent.

---

## Add a new note (existing entity type)

1. **Folder** — Put the file in the correct top-level folder (`People/`, `Companies/`, `ICPs/`, …). Do not invent a new folder without the extend skill.
2. **Template** — Duplicate a similar note in that folder and strip/replace values (fastest way to match conventions).
3. **Frontmatter minimum**
   - `title` — display title.
   - `type` — string matching the folder name (e.g. `"People"`, `"Outreach Templates"`).
   - `fileClass` — Metadata Menu class (`Person`, `Company`, …) matching that folder.
   - Export fields (`notion_id`, `notion_url`, `exported_at`, …) — **optional** for vault-native rows; omit or set `null` if unused.
4. **Filenames** — Existing rows often use `<slug>--<id>.md`. New notes can follow the same pattern for consistency; the body/link targets depend on the **path**, not only the title.
5. **Body** — After `---`, optional `# Title` and sections (e.g. “Linked Records” with bullet wikilinks) for navigation; not validated by `validate:people`, but useful in graph and Bases.

---

## Update properties (values, not schema)

- **Select / status fields** — Use allowed labels only (see Metadata Menu or the same field on a sibling note). `outreach_wave` for People is **1–5** (integer); repo check fails if missing or out of range. `outreach_status` must be one of the strings in `_schemas/allowlists/person-outreach-status.json` (same order as the Person file class dropdown).
- **`Outreach Sends`** — YAML **`message:`** must include at least one `[[Outreach Templates/…]]` wikilink (`pnpm run validate:outreach-sends`).
- **`MultiFile` relations** — YAML list of wikilinks, usually one item per line, e.g. `- "[[Companies/some-slug--id|Label]]"`. Match path + display text style used in sibling notes.
- **Empty relations** — Use `[]` on one line or omit the key if that matches neighbors (stay consistent within the folder).
- **ICP “child” docs** — Create the file under `ICPs/<parent-icp-folder>/`. On the **parent ICP**, add the child to `offer_documents` (wikilink list). Optionally mirror links in the note body (“Linked Records”).

---

## People-specific checklist

Every `People/*.md` must have `outreach_wave: <1–5>` in frontmatter. Labels in the Person file class should match the wave meaning you assign.

---

## Before commit (git)

If you edit markdown outside Obsidian or bulk-edit, run **`pnpm run check`** at the vault root so Prettier, markdownlint, and `validate:people` pass before pushing.
