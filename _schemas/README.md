---
title: "Vault Schemas"
---

# Vault Schemas

This folder contains the Obsidian-side schema layer for the Notion export.

- `_schemas/fileClasses/` defines `Metadata Menu` fileClasses.
- `_views/` contains starter `Bases` views over the exported notes.

`pnpm run validate:people` checks every `People/*.md` has `outreach_wave` (1–5) matching `scripts/outreach-waves.json`. Run `pnpm run sync:people-waves` after editing that JSON to rewrite frontmatter.
