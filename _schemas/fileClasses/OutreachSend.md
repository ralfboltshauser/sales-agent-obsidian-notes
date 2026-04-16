---
icon: send
fields:
  - name: name
    id: outreach-send-name
    type: Input
    options: {}
  - name: channel
    id: outreach-send-channel
    type: Select
    options:
      sourceType: ValuesList
      valuesList:
        Email: Email
  - name: step
    id: outreach-send-step
    type: Select
    options:
      sourceType: ValuesList
      valuesList:
        Initial Outreach: Initial Outreach
  - name: reply_status
    id: outreach-send-reply-status
    type: Select
    options:
      sourceType: ValuesList
      valuesList:
        No Reply Yet: No Reply Yet
  - name: replied
    id: outreach-send-replied
    type: Boolean
    options: {}
  - name: positive_reply
    id: outreach-send-positive-reply
    type: Boolean
    options: {}
  - name: sent_at
    id: outreach-send-sent-at
    type: Date
    options: {}
  - name: responded_at
    id: outreach-send-responded-at
    type: Date
    options: {}
  - name: people
    id: outreach-send-people
    type: MultiFile
    options: {}
  - name: template
    id: outreach-send-template
    type: MultiFile
    options: {}
  - name: subject
    id: outreach-send-subject
    type: Input
    options: {}
  - name: body
    id: outreach-send-body
    type: Input
    options: {}
  - name: thread_url
    id: outreach-send-thread-url
    type: Input
    options: {}
---

# OutreachSend

FileClass for exported outreach send notes.

**`template`:** must include at least one wikilink under **`Outreach Templates/`** (canonical pattern with `{{placeholders}}`). Enforced by `pnpm run validate:outreach-sends`.

**`subject`** (optional) and **`body`** (optional): the **concrete copy for this send**—what you paste into the client (email subject line and message body). For **`channel: Email`**, fill these when the draft is ready; leave empty while still iterating. The linked template is the source pattern, not the per-recipient final text.

**Buttons + `sent_at`:** see **`_views/Outreach Queue dashboard`** and the **Quick actions** section on send notes (`Templates/outreach/mark-sent-at-today.md` + **Templater** template hotkey).
