# Prospecting (reference)

**Goal:** fill the top of the funnel with **ICP-shaped companies** and eventually **People**, without duplicates.

## Inputs

- Active **`ICPs/`** note(s) — who you sell to.
- **`Personas/`** — roles you message; use to infer titles and angles.
- **`Companies/`** — accounts; link `icps`, `people` when populated.

## Workflow

1. **List gaps** — In Bases (`People` / `Companies`), find companies linked to the ICP that have **zero People** or weak coverage of target personas.
2. **Dedupe** — Before creating a company, search `Companies/` by name + domain; reuse the note if it exists.
3. **Source** — Prefer explicit `source` / notes on the Company (where the lead came from).
4. **Create `Company`** — Match existing frontmatter patterns (`type`, `fileClass`, relations). Link **`icps`** to the ICP.
5. **Research People** — From site, LinkedIn, directories: add **`People/`** notes with `companies`, `personas`, `company_icp`, **`outreach_wave`**, **`outreach_status: "To Research"`** until enriched enough to move to **`To Contact`**.
6. **Re-run the daily loop** — [meeting-booking-workflow](../../../.notes/sales/meeting-booking-workflow.md).

## Quality bar (short)

- One **sharp hypothesis** per account (why them, why now) — store in Company or Person `notes` / `personalization_hooks` when relevant.
- Do not add People without a **believable channel** (email or LinkedIn path) unless explicitly tracking for later.

## When to stop prospecting

Return to step 1 of the loop when at least one **Person** is ready for outreach (see [qualify.md](qualify.md)).
