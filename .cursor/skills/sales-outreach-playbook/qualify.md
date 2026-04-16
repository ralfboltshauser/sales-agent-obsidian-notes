# Qualify (reference)

**Goal:** decide **next `outreach_status`** and whether to spend outbound calories here.

## Allowlist

All `outreach_status` values must match `_schemas/allowlists/person-outreach-status.json` (see [person-outreach-state-machine](../../../.notes/sales/person-outreach-state-machine.md) for transitions).

## Fast decisions

| Situation                                               | Typical status                              |
| ------------------------------------------------------- | ------------------------------------------- |
| Missing fit, wrong person, no message worth sending yet | **`Unqualified`** or stay **`To Research`** |
| Fit OK, channel + angle ready, in outbound queue        | **`To Contact`**                            |
| First touch sent                                        | **`Contacted`**                             |
| You owe another touch                                   | **`Follow-up due`**                         |
| You sent; waiting on them                               | **`Awaiting reply`**                        |
| They replied                                            | **`Replied`**                               |
| Call scheduled / done                                   | **`Meeting booked`** / **`Meeting held`**   |
| Timing wrong, relationship worth keeping                | **`Nurture`**                               |
| Soft no                                                 | **`Not interested`**                        |
| Opt-out / never                                         | **`Do not contact`**                        |

## Qualification checklist (before `To Contact`)

- [ ] Person matches a linked **`Personas/`** for this motion.
- [ ] **Company** linked and matches **`company_icp` / ICP**.
- [ ] **`outreach_wave`** reflects priority (1 = owner/economic buyer first in this vault).
- [ ] At least one **personalization hook** (site, role, mandate, geography—not generic praise).
- [ ] **Channel** realistic (`preferred_channel`).

If any critical item is missing, stay **`To Research`** or mark **`Unqualified`**.

## After qualify

Move to [outreach-messages.md](outreach-messages.md) when status is **`To Contact`** or **`Follow-up due`**.
