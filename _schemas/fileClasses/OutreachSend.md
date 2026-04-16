---
icon: send
fields:
  - name: name
    id: outreach-send-name
    type: Input
    options: {}
  - name: channel
    id: outreach-send-channel
    type: Select
    options:
      sourceType: ValuesList
      valuesList:
        Email: Email
  - name: step
    id: outreach-send-step
    type: Select
    options:
      sourceType: ValuesList
      valuesList:
        Initial Outreach: Initial Outreach
  - name: reply_status
    id: outreach-send-reply-status
    type: Select
    options:
      sourceType: ValuesList
      valuesList:
        No Reply Yet: No Reply Yet
  - name: replied
    id: outreach-send-replied
    type: Boolean
    options: {}
  - name: positive_reply
    id: outreach-send-positive-reply
    type: Boolean
    options: {}
  - name: sent_at
    id: outreach-send-sent-at
    type: Date
    options: {}
  - name: responded_at
    id: outreach-send-responded-at
    type: Date
    options: {}
  - name: people
    id: outreach-send-people
    type: MultiFile
    options: {}
  - name: message
    id: outreach-send-message
    type: MultiFile
    options: {}
  - name: thread_url
    id: outreach-send-thread-url
    type: Input
    options: {}
---

# OutreachSend

FileClass for exported outreach send notes.
