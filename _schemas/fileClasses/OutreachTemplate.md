---
icon: mail
fields:
  - name: name
    id: outreach-template-name
    type: Input
    options: {}
  - name: notion_id
    id: outreach-template-notion-id
    type: Input
    options: {}
  - name: notion_url
    id: outreach-template-notion-url
    type: Input
    options: {}
  - name: exported_at
    id: outreach-template-exported-at
    type: Date
    options: {}
  - name: channel
    id: outreach-template-channel
    type: Select
    options:
      sourceType: ValuesList
      valuesList:
        Email: Email
        LinkedIn: LinkedIn
        WhatsApp: WhatsApp
        Call: Call
        In Person: In Person
        Multi-channel: Multi-channel
  - name: step
    id: outreach-template-step
    type: Select
    options:
      sourceType: ValuesList
      valuesList:
        Initial Outreach: Initial Outreach
        Follow-up 1: Follow-up 1
        Follow-up 2: Follow-up 2
        Breakup: Breakup
        Reply Bump: Reply Bump
  - name: status
    id: outreach-template-status
    type: Select
    options:
      sourceType: ValuesList
      valuesList:
        Draft: Draft
        Ready: Ready
        Testing: Testing
        Winning: Winning
        Retired: Retired
  - name: target_persona
    id: outreach-template-target-persona
    type: Input
    options: {}
  - name: hypothesis
    id: outreach-template-hypothesis
    type: Input
    options: {}
  - name: angle
    id: outreach-template-angle
    type: Input
    options: {}
  - name: cta
    id: outreach-template-cta
    type: Input
    options: {}
  - name: variant
    id: outreach-template-variant
    type: Input
    options: {}
  - name: notes
    id: outreach-template-notes
    type: Input
    options: {}
  - name: message_body
    id: outreach-template-message-body
    type: Input
    options: {}
  - name: personas
    id: outreach-template-personas
    type: MultiFile
    options: {}
  - name: outreach_messages
    id: outreach-template-outreach-messages
    type: MultiFile
    options: {}
  - name: outreach_sends
    id: outreach-template-outreach-sends
    type: MultiFile
    options: {}
  - name: icps
    id: outreach-template-icps
    type: MultiFile
    options: {}
---

# OutreachTemplate

Notes in **`Outreach Templates/`** follow this class. They mirror the **Notion “Outreach Messages”** database shape (for context only; the DB is empty and nothing is auto-synced from Notion).

**Notion database:** `34346cdd8a79805a929ae8021beabcb1` — [open in Notion](https://www.notion.so/34346cdd8a79805a929ae8021beabcb1).

**Property mapping (Notion → Obsidian YAML):**

| Notion                                                 | Obsidian field                                                   |
| ------------------------------------------------------ | ---------------------------------------------------------------- |
| Name                                                   | `title` / `name`                                                 |
| Message Body                                           | `message_body`                                                   |
| Hypothesis, Angle, CTA, Variant, Notes, Target Persona | same names (`target_persona`)                                    |
| Channel, Step, Status                                  | `channel`, `step`, `status` (select options aligned with Notion) |
| Personas (relation)                                    | `personas` (MultiFile → `Personas/`)                             |
| Sends (relation)                                       | `outreach_sends` (MultiFile → `Outreach Sends/`)                 |
| ICPs (relation)                                        | `icps` (MultiFile → `ICPs/`)                                     |
| Rollups (reply rate, counts, …)                        | not modeled here (stay in Notion)                                |

**Relations in the vault:** link **from** `Personas` → `outreach_messages` → these notes; link **from** `Outreach Sends` → `message` → these notes. Optional `outreach_messages` on a template is for other template notes (e.g. follow-up chain) in the same folder.
