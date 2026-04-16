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

| View                        | What it shows                                                                                                               |
| --------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| **Ready to send**           | `sent_at` is empty **and** both **`subject`** and **`body`** are filled (paste-ready email drafts).                         |
| **Unsent — still drafting** | `sent_at` empty but copy not complete yet—finish Properties first.                                                          |
| **Sent log**                | Anything with **`sent_at`** set, plus a **Sent timing** column (`sent_at.relative()`) so you can eyeball follow-up spacing. |

### Marking a send as sent (no plugin “button”)

Obsidian Bases tables are read-only for YAML. There is no built-in row action.

1. Open the send from the table (click the note).
2. In **Properties**, set **`sent_at`** to **today** (or the real send time). That field is your **single source of truth** for “when this went out.”
3. Update the linked **Person** per the playbook (e.g. **`next_step_date`**, **`outreach_status`**, **`last_contacted`**) so follow-ups are timed from the person record.

There is no separate `sentAt` camelCase property—the vault uses YAML **`sent_at`** (Metadata Menu: **Sent at**).
