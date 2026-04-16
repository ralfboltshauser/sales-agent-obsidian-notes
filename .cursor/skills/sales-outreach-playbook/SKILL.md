---
name: sales-outreach-playbook
description: Runs the sales-agent Obsidian outbound playbook—daily prioritization loop, prospecting, qualification, outreach drafting, follow-up discipline, status hygiene, and post-sale handoff framing. Use when the user wants to do sales work in the vault, research targets, write outreach, qualify leads, run the meeting loop, or says sales-outreach-playbook / outbound playbook.
---

# Sales outreach playbook (this vault)

## What this skill is

A **step router**: follow the **order** below. Each step has a **maintainable reference file** in this folder—edit those files to improve process; keep `SKILL.md` thin.

**Vault primitives:** `People/`, `Companies/`, `Personas/`, `ICPs/`, `Outreach Sends/`, `Outreach Templates/`, `_schemas/fileClasses/`, Bases in `_views/`.

## Before you touch notes

1. Read the **daily loop** (what to do first today): [meeting-booking-workflow](../../../.notes/sales/meeting-booking-workflow.md)
2. Keep **status transitions** honest: [person-outreach-state-machine](../../../.notes/sales/person-outreach-state-machine.md)
3. Obey repo checks after markdown edits: `pnpm run check` at vault root.

## Playbook steps (in order)

| Step                  | When                                                 | Reference                                                                     |
| --------------------- | ---------------------------------------------------- | ----------------------------------------------------------------------------- |
| **1. Prioritize**     | Start every session                                  | [meeting-booking-workflow](../../../.notes/sales/meeting-booking-workflow.md) |
| **2. Prospect**       | No person to work; need companies / targets          | [prospecting.md](prospecting.md)                                              |
| **3. Qualify**        | Person or company in view; decide fit & next status  | [qualify.md](qualify.md)                                                      |
| **4. Write outreach** | Person ready for first touch or follow-up            | [outreach-messages.md](outreach-messages.md)                                  |
| **5. Execute & log**  | Send, book, update YAML + `Outreach Sends`           | [execute-and-log.md](execute-and-log.md)                                      |
| **6. After the sale** | Customer success / lifecycle (not `outreach_status`) | [customer-lifecycle.md](customer-lifecycle.md)                                |

## Agent execution contract

When the user invokes this skill:

1. **State which playbook step** you are applying (1–6) and **why** (one sentence).
2. **Open only the reference** for that step (plus vault workflow/state machine when relevant).
3. **Prefer vault edits** (notes, links, statuses) over generic advice.
4. **Run `pnpm run check`** before committing if you changed markdown under the vault.

## See also

- [extend-sales-obsidian-vault](../extend-sales-obsidian-vault/SKILL.md) — schema, allowlists, validators, Linter.
- [edit-sales-obsidian-vault-notes](../edit-sales-obsidian-vault-notes/SKILL.md) — editing notes without schema changes.
