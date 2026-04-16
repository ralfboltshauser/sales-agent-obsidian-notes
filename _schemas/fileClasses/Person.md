---
icon: user-round
fields:
  - name: name
    id: person-name
    type: Input
    options: {}
  - name: notion_title
    id: person-notion-title
    type: Input
    options: {}
  - name: outreach_status
    id: person-outreach-status
    type: Select
    options:
      sourceType: ValuesList
      valuesList:
        To Research: To Research
        Unqualified: Unqualified
        To Contact: To Contact
        Contacted: Contacted
        Follow-up due: Follow-up due
        Awaiting reply: Awaiting reply
        Replied: Replied
        Meeting booked: Meeting booked
        Meeting held: Meeting held
        Nurture: Nurture
        "Not interested": "Not interested"
        "Do not contact": "Do not contact"
  - name: outreach_wave
    id: person-outreach-wave
    type: Select
    options:
      sourceType: ValuesList
      valuesList:
        "1": "1 — Economic buyer / owner first"
        "2": "2 — Key partner or champion"
        "3": "3 — Partner / consultant coverage"
        "4": "4 — Broad consultant / BD reality"
        "5": "5 — Sourcing & user-level depth"
  - name: buying_role
    id: person-buying-role
    type: Select
    options:
      sourceType: ValuesList
      valuesList:
        Champion: Champion
        Decision Maker: Decision Maker
        Influencer: Influencer
        User: User
  - name: department
    id: person-department
    type: Select
    options:
      sourceType: ValuesList
      valuesList:
        Founder: Founder
        Operations: Operations
        Sales: Sales
  - name: seniority
    id: person-seniority
    type: Select
    options:
      sourceType: ValuesList
      valuesList:
        Director: Director
        IC: IC
        Owner: Owner
        VP/Head: VP/Head
  - name: warmth
    id: person-warmth
    type: Select
    options:
      sourceType: ValuesList
      valuesList:
        Cold: Cold
        Warm: Warm
  - name: preferred_channel
    id: person-preferred-channel
    type: Select
    options:
      sourceType: ValuesList
      valuesList:
        Email: Email
        LinkedIn: LinkedIn
        Phone: Phone
        Warm Intro: Warm Intro
  - name: email
    id: person-email
    type: Input
    options: {}
  - name: phone
    id: person-phone
    type: Input
    options: {}
  - name: linkedin
    id: person-linkedin
    type: Input
    options: {}
  - name: last_contacted
    id: person-last-contacted
    type: Date
    options: {}
  - name: next_step_date
    id: person-next-step-date
    type: Date
    options: {}
  - name: companies
    id: person-companies
    type: MultiFile
    options: {}
  - name: personas
    id: person-personas
    type: MultiFile
    options: {}
  - name: outreach_sends
    id: person-outreach-sends
    type: MultiFile
    options: {}
  - name: company_icp
    id: person-company-icp
    type: MultiFile
    options: {}
  - name: conversations
    id: person-conversations
    type: MultiFile
    options: {}
---

# Person

FileClass for exported person notes.

**`outreach_status`:** ordered funnel + exits. Canonical strings and order live in `_schemas/allowlists/person-outreach-status.json` (enforced by `pnpm run validate:outreach-status`).
