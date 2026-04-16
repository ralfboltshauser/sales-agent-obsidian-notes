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

### Marking a send as sent

**`Outreach Queue`** tables include a **Sent at** column on **Ready to send** and **Unsent — still drafting** so you can set the date from the base.

On **current Obsidian** (Bases), many property types—including **Date**—can be updated **inline in the table**: click the **Sent at** cell for that row, then pick **today** in the date control (exactly **one** vs **two** steps depends on the picker UI; there is usually no separate “now” chip).

If inline edit does not respond on your build, open the note (click the send name) and set **`sent_at`** in **Properties** the same way.

That field is the **single source of truth** for when the message went out. Then update the linked **Person** per the playbook (e.g. **`next_step_date`**, **`outreach_status`**, **`last_contacted`**) for follow-up timing.

There is no separate `sentAt` camelCase property—the vault uses YAML **`sent_at`** (Metadata Menu: **Sent at**).
