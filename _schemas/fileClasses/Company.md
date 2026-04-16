---
icon: building-2
fields:
  - name: name
    id: company-name
    type: Input
    options: {}
  - name: status
    id: company-status
    type: Select
    options:
      sourceType: ValuesList
      valuesList:
        Contacted: Contacted
        Ready to Contact: Ready to Contact
        Researching: Researching
  - name: priority
    id: company-priority
    type: Select
    options:
      sourceType: ValuesList
      valuesList:
        P1: P1
        P2: P2
  - name: stage
    id: company-stage
    type: Select
    options:
      sourceType: ValuesList
      valuesList:
        Established: Established
  - name: source
    id: company-source
    type: Select
    options:
      sourceType: ValuesList
      valuesList:
        Manual Research: Manual Research
        Referral: Referral
  - name: region
    id: company-region
    type: Select
    options:
      sourceType: ValuesList
      valuesList:
        Switzerland: Switzerland
  - name: website
    id: company-website
    type: Input
    options: {}
  - name: company_size
    id: company-company-size
    type: Select
    options:
      sourceType: ValuesList
      valuesList:
        2-10: 2-10
        11-50: 11-50
  - name: fit_score
    id: company-fit-score
    type: Number
    options: {}
  - name: last_contacted
    id: company-last-contacted
    type: Date
    options: {}
  - name: next_step_date
    id: company-next-step-date
    type: Date
    options: {}
  - name: next_step
    id: company-next-step
    type: Input
    options: {}
  - name: outcome
    id: company-outcome
    type: Input
    options: {}
  - name: estimated_mrr
    id: company-estimated-mrr
    type: Number
    options: {}
  - name: pain_signals
    id: company-pain-signals
    type: Input
    options: {}
  - name: offer_angle
    id: company-offer-angle
    type: Input
    options: {}
  - name: industry
    id: company-industry
    type: Multi
    options:
      sourceType: ValuesList
      valuesList:
        Professional Services: Professional Services
  - name: people
    id: company-people
    type: MultiFile
    options: {}
  - name: icps
    id: company-icps
    type: MultiFile
    options: {}
---

# Company

FileClass for exported company notes.
