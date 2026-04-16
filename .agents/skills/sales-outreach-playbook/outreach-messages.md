# Outreach messages (reference)

**Goal:** produce **sendable** drafts that respect your positioning and the vault’s template pattern.

## Where templates live

- **`Outreach Templates/`** — canonical copy; `message_body` with `{{placeholders}}`.
- **`Outreach Sends/`** — one note per send/thread; link **`people`**, and **required** **`template:`** → at least one **`Outreach Templates/`** note (repo check: `pnpm run validate:outreach-sends`). Put the **sendable** text in **`subject`** (optional) and **`body`** (optional) in YAML so it shows in Obsidian **Properties**—that is the per-recipient final copy; the template keeps `{{placeholders}}`.

## Writing rules

1. **Pick template** by `Personas` → `outreach_messages` / linked templates (e.g. Search Firm Owner initial email).
2. **Replace every `{{}}`** — firm name, first name, personalization line, your name, calendar or reply CTA.
3. **One hypothesis** — what you believe about _their_ motion; offer an easy “wrong” exit.
4. **Short** — partners skim; respect retained-search tone (signal > volume).
5. **Draft in `Outreach Sends/`** — set **`template:`** to a multi-line wikilink list pointing at the template you used; fill **`subject`** / **`body`** when the draft is ready (email); keep `sent_at` null until sent. Never leave **`template: []`**.

## Personalization sources (priority)

1. Company site / team / mandates geography
2. Person **`notes`**, **`personalization_hooks`**, **`pain_context`**
3. Recent news only if **specific** to the hypothesis

## Done when

- Draft is in **`Outreach Sends/`** with **`template:`** → **`Outreach Templates/…`**, **`subject`** / **`body`** holding what you will send, and linked from **`People.outreach_sends`**.
- Person remains or moves to **`To Contact`** until send, then update per [execute-and-log.md](execute-and-log.md).
