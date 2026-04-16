# Outreach send — sent and reply fields

**`sent_at`:** when the message went out. `null` = not sent yet.

**`responded_at`:** when you logged that they replied (or any inbound worth tracking). `null` = no reply logged.

Do **not** add parallel booleans (`sent`, `replied`, `positive_reply`) or a duplicate “reply status” select that only mirrors those dates — it will drift. If you need sentiment or outcome later, add something like **`reply_outcome`** (select) that cannot be inferred from timestamps alone.

Enforced in git: `pnpm run validate:outreach-send-fields` ([scripts/outreach-send-fields.mjs](../../scripts/outreach-send-fields.mjs)).
