---
title: "Vault Schemas"
---

# Vault Schemas

This folder contains the Obsidian-side schema layer for the Notion export.

- `_schemas/fileClasses/` defines `Metadata Menu` fileClasses.
- `_views/` contains starter `Bases` views over the exported notes.

`pnpm run validate:people` checks every `People/*.md` has `outreach_wave: 1`–`5` in YAML frontmatter (edit the note in Obsidian; no separate config file).

Vault layout, hooks, and workflows: [[README|Vault README]].
