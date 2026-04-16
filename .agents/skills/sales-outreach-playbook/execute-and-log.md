# Execute & log (reference)

**Goal:** reality matches the graph—**sends**, **dates**, and **`outreach_status`** tell the truth.

## On send

1. Update **`Outreach Sends/`** — keep **`template:`** linked to the **`Outreach Templates/`** note you used; set **`subject`** / **`body`** to the exact text that went out (when you want the vault to be the source of truth); set `sent_at`, `channel`, `step`, `thread_url` / mailto as appropriate.
2. Update **`People/`** — typically **`Contacted`** (or **`Awaiting reply`** if you treat “sent = waiting” immediately—pick one convention and stick to it).
3. Log **`last_contacted`** when you use that field; set **`next_step_date`** for the next nudge.

## On reply

- Move **`outreach_status`** toward **`Replied`** / **`Awaiting reply`** / **`Follow-up due`** per [person-outreach-state-machine](../../../.notes/sales/person-outreach-state-machine.md).
- Update **`Outreach Sends`** — `replied`, `reply_status`, `responded_at` when those exist.

## On meeting booked / held

- **`Meeting booked`** → **`Meeting held`** after the call.
- Capture outcomes in **Person or Send `notes`**; commercial next steps are **`Follow-up due`** unless you add a separate lifecycle field later (see [customer-lifecycle.md](customer-lifecycle.md)).

## Hygiene

- Never leave **`outreach_wave`** invalid (1–5); **`pnpm run validate:people`** enforces it.
- Never invent **`outreach_status`** strings; **`pnpm run validate:outreach-status`** enforces the allowlist.
