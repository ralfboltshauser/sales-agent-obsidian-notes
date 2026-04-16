---
icon: target
fields:
  - name: name
    id: icp-name
    type: Input
    options: {}
  - name: status
    id: icp-status
    type: Select
    options:
      sourceType: ValuesList
      valuesList:
        Interviewing: Interviewing
  - name: priority
    id: icp-priority
    type: Select
    options:
      sourceType: ValuesList
      valuesList:
        P1: P1
  - name: stage
    id: icp-stage
    type: Select
    options:
      sourceType: ValuesList
      valuesList:
        Established: Established
  - name: primary_buyer
    id: icp-primary-buyer
    type: Select
    options:
      sourceType: ValuesList
      valuesList:
        Owner/GM: Owner/GM
  - name: company_size
    id: icp-company-size
    type: Select
    options:
      sourceType: ValuesList
      valuesList:
        11-50: 11-50
  - name: evidence_score
    id: icp-evidence-score
    type: Number
    options: {}
  - name: gtm_motion
    id: icp-gtm-motion
    type: Select
    options:
      sourceType: ValuesList
      valuesList:
        LinkedIn/Email: LinkedIn/Email
  - name: price_range
    id: icp-price-range
    type: Select
    options:
      sourceType: ValuesList
      valuesList:
        3k-10k/mo: 3k-10k/mo
  - name: segment
    id: icp-segment
    type: Select
    options:
      sourceType: ValuesList
      valuesList:
        Agency/Service: Agency/Service
  - name: industry
    id: icp-industry
    type: Multi
    options:
      sourceType: ValuesList
      valuesList:
        Professional Services: Professional Services
  - name: companies
    id: icp-companies
    type: MultiFile
    options: {}
  - name: personas
    id: icp-personas
    type: MultiFile
    options: {}
  - name: conversations
    id: icp-conversations
    type: MultiFile
    options: {}
---

# ICP

FileClass for exported ICP notes.
