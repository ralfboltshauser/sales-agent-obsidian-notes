---
title: "Person outreach — state machine"
---

# Person `outreach_status` — full state machine

Canonical strings and order: `_schemas/allowlists/person-outreach-status.json` (must match Metadata Menu on `Person`).

## Happy path (outbound → meeting)

`To Research` → `To Contact` → `Contacted` → (`Follow-up due` ↔ `Awaiting reply`)\* → `Replied` → `Meeting booked` → `Meeting held`

\*Many teams bounce between **Follow-up due** (you owe a touch) and **Awaiting reply** (ball in their court) several times.

## Early exit from research

`To Research` → **`Unqualified`** — poor ICP/persona fit, wrong person, or “not worth a first message” **before** a real first touch. (Different from **Not interested**, which is usually after some engagement.)

## Long arc / exits (from many states)

| State            | Meaning                                | Typical entry from                  |
| ---------------- | -------------------------------------- | ----------------------------------- |
| `Nurture`        | Right account/person, wrong timing     | Almost anywhere after some signal   |
| `Not interested` | Soft no / pass                         | After contact or meeting            |
| `Do not contact` | Hard stop (opt-out, never, compliance) | **Any** prior state (use sparingly) |

`Do not contact` is **terminal** in this model: no outbound transitions (override only with a clear policy, e.g. re-consent).

## Transition matrix (allowed moves)

Rows = **from**, cells = **to**. ✓ common / allowed, ~ rare / needs a reason, — usually avoid.

| From ↓ / To →      | To Research | Unqualified | To Contact | Contacted | Follow-up due | Awaiting reply | Replied | Meeting booked | Meeting held | Nurture | Not interested | Do not contact |
| ------------------ | ----------- | ----------- | ---------- | --------- | ------------- | -------------- | ------- | -------------- | ------------ | ------- | -------------- | -------------- |
| **To Research**    | —           | ✓           | ✓          | ~         | —             | —              | —       | —              | —            | ~       | ~              | ~              |
| **Unqualified**    | ~           | —           | ~          | —         | —             | —              | —       | —              | —            | —       | —              | ~              |
| **To Contact**     | ~           | ✓           | —          | ✓         | ~             | ~              | ~       | —              | —            | ~       | ~              | ~              |
| **Contacted**      | ~           | ~           | ~          | —         | ✓             | ✓              | ✓       | ~              | —            | ✓       | ✓              | ✓              |
| **Follow-up due**  | ~           | ~           | ~          | ✓         | —             | ✓              | ✓       | ~              | —            | ✓       | ✓              | ✓              |
| **Awaiting reply** | ~           | ~           | ~          | ~         | ✓             | —              | ✓       | ~              | —            | ✓       | ✓              | ✓              |
| **Replied**        | ~           | ~           | ~          | ~         | ✓             | ✓              | —       | ✓              | —            | ✓       | ✓              | ✓              |
| **Meeting booked** | ~           | ~           | ~          | ~         | ✓             | ~              | ~       | —              | ✓            | ✓       | ✓              | ✓              |
| **Meeting held**   | ~           | ~           | ~          | ~         | ✓             | ~              | ~       | ✓              | —            | ✓       | ✓              | ✓              |
| **Nurture**        | ✓           | ~           | ✓          | ~         | ~             | —              | ~       | ~              | —            | —       | ~              | ✓              |
| **Not interested** | ~           | —           | ~          | ~         | —             | —              | ~       | —              | —            | ~       | —              | ✓              |
| **Do not contact** | —           | —           | —          | —         | —             | —              | —       | —              | —            | —       | —              | —              |

Use **`next_step_date`**, **`Outreach Sends`**, and notes for _why_ a rare transition happened.

## Diagram (Mermaid)

Short node IDs; labels match vault strings.

```mermaid
stateDiagram-v2
  state "To Research" as TR
  state "Unqualified" as UQ
  state "To Contact" as TC
  state "Contacted" as CO
  state "Follow-up due" as FD
  state "Awaiting reply" as AR
  state "Replied" as RP
  state "Meeting booked" as MB
  state "Meeting held" as MH
  state "Nurture" as NU
  state "Not interested" as NI
  state "Do not contact" as DC

  [*] --> TR

  TR --> UQ: disqualify before first touch
  TR --> TC: ready to message

  TC --> UQ: deprioritize before send
  TC --> CO: first touch sent

  CO --> FD: owe another touch
  CO --> AR: ball in their court
  CO --> RP: they engaged
  CO --> NU: park
  CO --> NI: soft no
  CO --> DC: hard stop

  FD --> CO: sent follow-up
  FD --> AR: sent then wait
  FD --> RP
  FD --> NU
  FD --> NI
  FD --> DC

  AR --> FD: nudge owed
  AR --> RP
  AR --> NU
  AR --> NI
  AR --> DC

  RP --> MB: call scheduled
  RP --> FD: more touches before call
  RP --> AR: you replied wait again
  RP --> NU
  RP --> NI
  RP --> DC

  MB --> MH: call completed
  MB --> FD: reschedule chase
  MB --> NU
  MB --> NI
  MB --> DC

  MH --> MB: another meeting
  MH --> FD: commercial next step
  MH --> NU
  MH --> NI
  MH --> DC

  NU --> TR: re-qualify
  NU --> TC: reactivate
  NU --> DC

  NI --> DC: escalate stop
  NI --> NU: rare reopen

  DC --> [*]
```

If this chart does not render, use the **matrix** above; Obsidian Mermaid support varies by build/plugin.

## After `Meeting held` (outside this enum)

Deal stages (pilot, proposal, procurement, won/lost) are often a **separate field or linked note** so `outreach_status` stays about **motion to conversation**, not full CRM. Add later if you run the whole cycle in this vault.
