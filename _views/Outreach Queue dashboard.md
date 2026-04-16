---
title: Outreach queue dashboard
description: Embeds Outreach Queue.base views + parent button for Buttons plugin (sent_at).
---

# Outreach queue

Use the embedded tables like a **mail outbox**. **`sent_at`** is the send timestamp (see [[_views/README|Vault Views]]).

**One-click `sent_at`:** install **Templater**, point its template folder at this vault’s `Templates/` (or add `Templates` as an extra root), then in **Templater → Settings → Template hotkeys** assign a hotkey to **`outreach/mark-sent-at-today`**. The command palette entry (copy its **exact** label into the button below if the default does not match) is what the button runs on the **currently focused** send note.

```button
name Mark sent · today (`sent_at`)
type command
action Templater: Insert outreach/mark-sent-at-today
```

^button-outreach-mark-sent

If the button errors, open **Command palette**, search `Templater` + `mark-sent`, copy the **exact** command name, edit this note’s button `action` line to match, or use **Button Maker** (Buttons plugin).

---

## Ready to send

![[Outreach Queue.base#Ready to send]]

## Unsent — still drafting

![[Outreach Queue.base#Unsent — still drafting]]

## Sent log

![[Outreach Queue.base#Sent log]]
