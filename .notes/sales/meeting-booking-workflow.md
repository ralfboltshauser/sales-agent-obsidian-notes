---
title: "Meeting booking — daily loop"
---

# Meeting booking — daily loop

Priority: **people → companies without people → new companies.** After each action, go back to step 1.

## Text loop (always readable)

1. **Person ready?** — Someone in your current ICP targeting who needs first touch or follow-up → work them (send, book, log) → **go to 1**
2. **Else, empty company?** — ICP-listed company with no People → pick persona fit, enrich, add People → **go to 1**
3. **Else, add targets?** — Research new ICP-fit companies, create Company, link ICP → **go to 1**
4. **Else** — Stop or do admin (refresh ICP, lists, messaging).

## Chart (Mermaid)

Use Reading view or a Mermaid-capable preview. Labels are one line each (no HTML, no markdown inside nodes).

```mermaid
flowchart TB
  S([Start])
  S --> Q1{ICP person needs contact or follow-up?}
  Q1 -->|Yes| A1[Outreach: send, book, log note]
  A1 --> S
  Q1 -->|No| Q2{ICP company has zero People?}
  Q2 -->|Yes| A2[Company: personas, enrich, add People]
  A2 --> S
  Q2 -->|No| Q3{Add new ICP-fit companies?}
  Q3 -->|Yes| A3[Research: new Company, link ICP]
  A3 --> S
  Q3 -->|No| Z([Stop or refine ICP])
```

## Tweak later

Define “needs contact” with your fields (`outreach_status`, `next_step_date`, `outreach_wave`, Bases, etc.).
