---
title: "Meeting booking — daily loop"
---

# Meeting booking — daily loop

Work **people → empty companies → new companies**, then repeat from the top.

```mermaid
flowchart TD
  START([Start session]) --> P

  P{Person in **active ICP** targeting<br/>needs initial outreach<br/>or follow-up?}

  P -->|Yes| DO_P[Work that person:<br/>send / book / log in note]
  DO_P --> START

  P -->|No| C{ICP company exists<br/>with **no People** linked?}

  C -->|Yes| DO_C[Pick company → match **Personas**<br/>enrich → add **People**]
  DO_C --> START

  C -->|No| R{Add **new** ICP-fit<br/>companies worth tracking?}

  R -->|Yes| DO_R[Research → create **Company**<br/>link to ICP / source]
  DO_R --> START

  R -->|No| END([Stop or admin:<br/>refresh ICP / lists / messaging])
```

**Tweak later:** define “active ICP” and “needs work” using your fields (`outreach_status`, `next_step_date`, `outreach_wave`, Bases view, etc.).
