---
icon: contact-round
fields:
  - name: name
    id: persona-name
    type: Input
    options: {}
  - name: buying_role
    id: persona-buying-role
    type: Select
    options:
      sourceType: ValuesList
      valuesList:
        Champion: Champion
        Decision Maker: Decision Maker
        Influencer: Influencer
        User: User
  - name: department
    id: persona-department
    type: Select
    options:
      sourceType: ValuesList
      valuesList:
        Operations: Operations
        Sales: Sales
  - name: seniority
    id: persona-seniority
    type: Select
    options:
      sourceType: ValuesList
      valuesList:
        IC: IC
        Owner: Owner
        VP/Head: VP/Head
  - name: preferred_channel
    id: persona-preferred-channel
    type: Select
    options:
      sourceType: ValuesList
      valuesList:
        Email: Email
        Multi-channel: Multi-channel
  - name: icps
    id: persona-icps
    type: MultiFile
    options: {}
  - name: people
    id: persona-people
    type: MultiFile
    options: {}
  - name: outreach_messages
    id: persona-outreach-messages
    type: MultiFile
    options: {}
  - name: conversations
    id: persona-conversations
    type: MultiFile
    options: {}
---

# Persona

FileClass for exported persona notes.
