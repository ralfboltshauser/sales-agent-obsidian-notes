# Customer lifecycle & CS (reference)

**Goal:** track **sold / onboarding / success / renewal** without breaking the outbound **`outreach_status`** model.

## Principle

- **`outreach_status`** = conversation motion through **meeting** (and exits).
- **Customer / CS** = separate axis so enums stay honest.

## Recommended pattern (until you add schema)

1. **Freeze or park outreach** — e.g. **`Meeting held`** or **`Nurture`** on the Person when they become a customer, if you do not want more outbound there.
2. **Account truth on `Companies/`** — use `notes`, `status` (if present on Company file class), renewal, health, onboarding checklist.
3. **Touchpoints** — optional `Outreach Sends` or meeting notes for QBRs/check-ins; label in `notes` as CS, not cold outbound.

## When you add a real field (schema change)

Add a second Select on **`Person`** or **`Company`** (e.g. **`relationship_stage`** or **`account_stage`**) via [extend-sales-obsidian-vault](../extend-sales-obsidian-vault/SKILL.md): `Prospect` → `Customer` → `Expansion` → `At risk` → `Churned`.

## Handoff checklist

- [ ] Who owns the account post-sale (name in Company or note).
- [ ] Success criteria / dates documented.
- [ ] Champion + economic buyer still linked on **`People`**.
