---
title: "Vault Schemas"
---

# Vault Schemas

This folder contains the Obsidian-side schema layer for the Notion export.

- `_schemas/fileClasses/` defines `Metadata Menu` fileClasses.
- `_schemas/allowlists/` holds machine-readable allowlists referenced by validators (e.g. `person-outreach-status.json` for `People` → `outreach_status`).
- `_views/` contains starter `Bases` views over the exported notes.

`pnpm run validate:people` checks every `People/*.md` has `outreach_wave: 1`–`5` in YAML frontmatter (edit the note in Obsidian; no separate config file).

`pnpm run validate:outreach-status` checks `outreach_status` matches the ordered list in `_schemas/allowlists/person-outreach-status.json` (must match the `Person` file class select options).

`pnpm run validate:outreach-sends` checks every `Outreach Sends/*.md` has `template:` linking at least one `Outreach Templates/` note. Sendable copy is optional YAML **`subject`** / **`body`** on each send (see `OutreachSend` file class).

Vault layout, hooks, and workflows: [[README|Vault README]].
