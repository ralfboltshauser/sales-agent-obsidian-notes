---
title: "Vault Views"
---

# Vault Views

Starter Obsidian Bases for the exported sales vault live here.

## `Sales Agent.base`

- Open **`Sales Agent.base`** in Obsidian.
- Switch between the per-type views for ICPs, companies, people, personas, and outreach sends.

## `Outreach Queue.base`

Focused on **`Outreach Sends/`** only:

**You cannot put [Buttons](https://github.com/shabegom/buttons) blocks inside a `.base` file** (Bases are YAML, not Markdown). Use **`_views/Outreach Queue dashboard`** instead: it **embeds** this base (`![[Outreach Queue.base#…]]`) and hosts the **parent** “Mark sent · today” button. Each send note’s **Quick actions** has an inline reference `button-outreach-mark-sent` (in backticks per the Buttons plugin) so the same command runs while **that send** is the active file.

| View                        | What it shows                                                                                                                          |
| --------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| **Ready to send**           | `sent_at` empty and **`subject`** + **`body`** filled. Table shows **Body** (after **Subject**) so you can read or copy from the base. |
| **Unsent — still drafting** | `sent_at` empty but subject/body not both filled yet. **Body** column shown (often empty).                                             |
| **Sent log**                | `sent_at` set. **Body** + **Sent timing** (`sent_at.relative()`) for follow-up spacing.                                                |

### “Open mail” column (`mailto:` formula)

`Outreach Queue.base` defines Bases **formulas** that build a **`mailto:`** link from:

1. **To:** first linked **Person** (`people[0]` → `email` on that note), or else the address from **`thread_url`** when it starts with `mailto:`.
2. **Subject / body:** from the send’s **`subject`** and **`body`**, with basic percent-encoding (spaces, newlines, `&`, `#`, `?`, `%`, `=`).

The table column **Open mail** is `link(..., "Send")` and should open your default mail app (needs **Obsidian 1.9.3+** where [`link()` supports external URLs](https://obsidian.md/changelog/2025-06-26-desktop-v1-9-3/)). **Limits:** only the **first** person in **`people`**; encoding is **not** full `encodeURIComponent` (unusual Unicode or extra characters may need a manual tweak in the draft). Very long bodies can exceed some clients’ URL limits.

### Marking a send as sent

**`Outreach Queue`** tables include a **Sent at** column on **Ready to send** and **Unsent — still drafting** so you can set the date from the base.

On **current Obsidian** (Bases), many property types—including **Date**—can be updated **inline in the table**: click the **Sent at** cell for that row, then pick **today** in the date control (exactly **one** vs **two** steps depends on the picker UI; there is usually no separate “now” chip).

If inline edit does not respond on your build, open the note (click the send name) and set **`sent_at`** in **Properties** the same way.

That field is the **single source of truth** for when the message went out. Then update the linked **Person** per the playbook (e.g. **`next_step_date`**, **`outreach_status`**, **`last_contacted`**) for follow-up timing.

There is no separate `sentAt` camelCase property—the vault uses YAML **`sent_at`** (Metadata Menu: **Sent at**).
