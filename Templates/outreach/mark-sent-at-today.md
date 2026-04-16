---
description: Templater execution template — sets YAML sent_at on the active file (Outreach Sends only).
---

<%\*
const f = app.workspace.getActiveFile();
if (!f) {
new Notice("No active file.");
return;
}
if (!f.path.startsWith("Outreach Sends/")) {
new Notice("Active file must be under Outreach Sends/.");
return;
}
const day = tp.date.now("YYYY-MM-DD");
await app.fileManager.processFrontMatter(f, (yaml) => {
yaml.sent_at = day;
});
new Notice(`sent_at → ${day}`);
return "";
-%>
