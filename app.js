const $ = (s) => document.querySelector(s);
const $$ = (s) => Array.from(document.querySelectorAll(s));
const escapeHTML = (s) =>
  String(s).replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ],
  );
const menu = $(".menu-toggle");
menu?.addEventListener("click", () => {
  const open = menu.getAttribute("aria-expanded") !== "true";
  menu.setAttribute("aria-expanded", String(open));
  menu.setAttribute(
    "aria-label",
    open ? "Close navigation" : "Open navigation",
  );
  $("#mobile-nav").hidden = !open;
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && menu?.getAttribute("aria-expanded") === "true") {
    menu.click();
    menu.focus();
  }
});
const dialog = $("#project-dialog");
const closeDialog = () => dialog.close();
$(".dialog-close")?.addEventListener("click", closeDialog);
dialog?.addEventListener("click", (e) => {
  if (e.target !== dialog) return;
  const r = dialog.getBoundingClientRect();
  if (
    e.clientX < r.left ||
    e.clientX > r.right ||
    e.clientY < r.top ||
    e.clientY > r.bottom
  )
    closeDialog();
});
function showDialog(html, image = false) {
  dialog.classList.toggle("image-dialog", image);
  $("#dialog-content").innerHTML = html;
  if (!dialog.open) dialog.showModal();
  else $(".dialog-close").focus();
}
let toastTimeout;
function toast(text) {
  const el = $(".toast");
  clearTimeout(toastTimeout);
  el.textContent = text;
  el.hidden = false;
  toastTimeout = setTimeout(() => (el.hidden = true), 3500);
}
async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    toast("Copied. Ready to use in a conversation.");
    return true;
  } catch {
    showDialog(
      `<p class="eyebrow">YOUR DRAFT</p><h2 id="dialog-title">Copy your starting point.</h2><p>Select and copy the text below.</p><textarea class="draft-context" style="width:100%;min-height:260px" readonly aria-label="Draft to copy">${escapeHTML(text)}</textarea>`,
    );
    return false;
  }
}
function wireArrowTabs(container, selector, activate) {
  container?.addEventListener("keydown", (e) => {
    const list = $$(selector);
    const i = list.indexOf(e.target);
    if (
      i < 0 ||
      ![
        "ArrowLeft",
        "ArrowRight",
        "ArrowUp",
        "ArrowDown",
        "Home",
        "End",
      ].includes(e.key)
    )
      return;
    e.preventDefault();
    const next =
      e.key === "Home"
        ? 0
        : e.key === "End"
          ? list.length - 1
          : (i +
              (["ArrowRight", "ArrowDown"].includes(e.key)
                ? 1
                : list.length - 1)) %
            list.length;
    activate(list[next]);
    list[next].focus();
  });
}

// Three interactive demonstrations. Fictional data, prewritten outputs, no live AI.
let demoType = "tool";
const demo = {
  tool: { view: null },
  data: { driver: null },
  flow: { sorted: false, open: null },
};
const money = (n) => (n < 0 ? "-" : "") + "$" + Math.abs(n).toLocaleString("en-US");
const kMoney = (n) => (n < 0 ? "-" : n > 0 ? "+" : "") + "$" + Math.abs(n) + "k";
const accounts = [
  {
    id: "brief",
    name: "Northgate Facilities",
    why: "Diamond account. Quote unanswered for 15 days, renewal due 31 Oct.",
    action: "Review account activity",
  },
  {
    id: "quote",
    name: "Hillcrest Retail",
    why: "Asked on 24 Sep for a quote to replace two door operators.",
    action: "Prepare a quote draft",
  },
  {
    id: "followup",
    name: "Marlow Clinics",
    why: "Maintenance options sent 20 Sep. No reply since.",
    action: "Draft a follow-up",
  },
];
const quoteLines = [
  ["Automatic door operator", 2, 1850],
  ["Installation labor, per hour", 6, 95],
  ["Site survey", 1, 180],
];
const drivers = [
  {
    id: "delayed",
    name: "Delayed projects",
    records: [
      ["Harbor Point fit-out", 30, 6, "Rescheduled to October at the client’s request."],
      ["Lakeside clinic doors", 18, 6, "Waiting on building control sign-off."],
    ],
  },
  {
    id: "parts",
    name: "Parts and repairs",
    records: [
      ["Marlow Clinics repairs", 14, 9, "Fewer call-outs than the same month last year."],
      ["Hillcrest Retail parts", 10, 6, "Replacement order moved into the open quote."],
    ],
  },
  {
    id: "contracts",
    name: "Service contracts",
    records: [
      ["Northgate renewal uplift", 12, 15, "Second site added at renewal."],
      ["Elm Street add-on", 4, 5, "Extra door covered from September."],
    ],
  },
  {
    id: "other",
    name: "All other work",
    records: [["Scheduled jobs on plan", 60, 60, "No variance."]],
  },
];
const messages = [
  {
    id: "hillcrest",
    from: "Hillcrest Retail, facilities",
    subject: "Elm Street door is sticking again",
    cat: "Service inquiry",
    dest: "Service desk",
    context:
      "Existing customer. Operators at Elm Street installed 2019; call-out in March for the same entrance. Quote 2043 for a replacement is still open.",
    draft:
      "Hi Dana,\n\nThanks for letting us know. Is this the same entrance we attended in March? If so, an engineer can look on Thursday morning or Friday afternoon.\n\nSince the replacement quote (2043) is still open, we can also talk through whether a repair makes sense in the meantime.\n\nSam",
    need: "Confirm which door and check engineer availability before this goes out.",
    status: "Ready for human review",
    kind: "ready",
  },
  {
    id: "invoice",
    from: "Keystone Parts Ltd",
    subject: "Invoice INV-7731, September parts",
    cat: "Supplier invoice",
    dest: "Finance",
    context:
      "Matches purchase order 1188 and the delivery note. $2,340, due 30 Oct.",
    draft: null,
    need: "The amount is above the $2,000 approval threshold, so payment waits for a manager’s approval. No reply is needed.",
    status: "Approval required",
    kind: "approval",
  },
  {
    id: "cedar",
    from: "Cedar Valley Dental (new contact)",
    subject: "Can you quote for access control at a new site?",
    cat: "New inquiry",
    dest: "Sales",
    context:
      "No previous record. Two comparable access control jobs for dental practices in the last year.",
    draft:
      "Hi Priya,\n\nThanks for getting in touch. We’ve done similar access control work for two dental practices recently, so this sounds like a good fit.\n\nTo put a quote together, could you let me know the site address, how many doors need control, and when you’d like it in place?\n\nSam",
    need: "Site address, number of doors, and timing are needed before a quote can be prepared.",
    status: "Needs information",
    kind: "ask",
  },
  {
    id: "marlow",
    from: "Marlow Clinics, practice manager",
    subject: "Engineer missed Tuesday’s appointment",
    cat: "Complaint",
    dest: "Operations manager",
    context:
      "Diamond-tier account. Two visits in the last 30 days. Tuesday’s job shows as rescheduled in the job system with no note.",
    draft:
      "Hi Jo,\n\nI’m sorry about Tuesday. I’m looking into what happened on our side and will come back to you today with a time that works.\n\nSam",
    need: "The job record has no explanation for the reschedule. Escalated so the operations manager can call before any reply goes out.",
    status: "Escalated",
    kind: "escalate",
  },
];
const title = (b, s) =>
  `<div class="preview-title"><b>${b}</b><span>${s}</span></div>`;
const bar = (label, back) =>
  `<div class="dm-bar"><button class="dm-back" data-back>← ${back}</button><span class="dm-label">${label}</span></div>`;
const facts = (rows) =>
  `<div class="dm-facts">${rows.map(([a, b]) => `<div><span>${a}</span><span>${b}</span></div>`).join("")}</div>`;
function toolView() {
  const v = demo.tool.view;
  if (v === "brief")
    return `${bar("Account brief · sample data", "Back to accounts")}<div class="dm-detail"><b class="dm-title">Northgate Facilities</b>${facts([
      ["Recent work", "Service visit 2 Sep (job 4172), both entrances. No faults left open."],
      ["Correspondence", "18 Sep email: asked about extending maintenance to the Riverside site."],
      ["Outstanding", "Quote 2041 for Riverside, sent 22 Sep. No reply."],
      ["Why now", "Diamond-tier account, renewal due 31 Oct, and the open quote is 15 days old."],
    ])}<div class="dm-ai"><span class="dm-label">Suggested next step · example AI output</span>Call about quote 2041 this week, before the renewal conversation starts. Rules flagged the account; the summary was drafted from the job log and the email thread.</div><p class="dm-note">Sources: job records, email thread, quote log. Nothing is sent from this page.</p></div>`;
  if (v === "quote") {
    const total = quoteLines.reduce((s, [, q, p]) => s + q * p, 0);
    return `${bar("Draft quote · review required", "Back to accounts")}<div class="dm-detail"><b class="dm-title">Hillcrest Retail, Elm Street branch</b><p class="dm-note">Assembled from the 24 Sep inquiry (replace two door operators), the service history (operators installed 2019, last serviced in March), and the sample approved price list.</p><table class="dm-table"><tbody>${quoteLines
      .map(
        ([item, qty, price]) =>
          `<tr><td>${item}</td><td>${qty} × ${money(price)}</td><td>${money(qty * price)}</td></tr>`,
      )
      .join("")}<tr class="total"><td colspan="2">Draft total, before tax</td><td>${money(total)}</td></tr></tbody></table><div class="dm-flag">Missing before this can be issued: access hours (an after-hours rate may apply) and the model of the existing operators.</div><p class="dm-note">Prices from the sample price list; totals calculated by ordinary code. The draft is not issued or sent.</p></div>`;
  }
  if (v === "followup")
    return `${bar("Example draft · nothing is sent", "Back to accounts")}<div class="dm-detail"><b class="dm-title">Marlow Clinics, Jo Reynolds</b><p class="dm-note">Prepared from the latest inquiry and previous service history.</p><div class="dm-draft">Hi Jo,

Following up on the maintenance options I sent on 20 Sep for your three sites. You mentioned Riverside needs cover before November, so I’ve suggested starting there and adding the other two at the next service visit.

Happy to go through the pricing on a call this week if that helps.

Sam</div>${facts([["Grounded in", "Inquiry of 19 Sep (three sites), our reply of 20 Sep, and the Riverside service history."]])}<p class="dm-note">A person reads and edits this before anything goes out.</p></div>`;
  return `${title("Accounts needing attention", "SAMPLE DATA")}${accounts
    .map(
      (a) =>
        `<div class="dm-row"><div><b>${a.name}</b><small>${a.why}</small></div><button class="dm-action" data-account="${a.id}">${a.action}</button></div>`,
    )
    .join("")}<div class="dm-foot"><span>Rules pick the accounts from job, quote, and email records. AI prepares the brief or draft; you decide what happens.</span></div>`;
}
function dataView() {
  const sum = (f) => drivers.reduce((s, d) => s + d.records.reduce((t, r) => t + f(r), 0), 0);
  const plan = sum((r) => r[1]);
  const actual = sum((r) => r[2]);
  const variance = actual - plan;
  const pct = Math.round((variance / plan) * 100);
  const dVar = (d) => d.records.reduce((t, r) => t + r[2] - r[1], 0);
  const maxAbs = Math.max(...drivers.map((d) => Math.abs(dVar(d))));
  const d = drivers.find((x) => x.id === demo.data.driver);
  if (d)
    return `${bar("Driver detail · sample records", "Back to the overview")}<div class="dm-detail"><b class="dm-title">${d.name}: ${kMoney(dVar(d))} against plan</b><table class="dm-table"><thead><tr><th>Record</th><th>Plan</th><th>Actual</th><th>Variance</th></tr></thead><tbody>${d.records
      .map(
        ([name, p, a, note]) =>
          `<tr><td><b>${name}</b><small>${note}</small></td><td>${kMoney(p).replace("+", "")}</td><td>${kMoney(a).replace("+", "")}</td><td>${kMoney(a - p)}</td></tr>`,
      )
      .join("")}</tbody></table><p class="dm-note">Figures come from the sample job and invoice records. The note under each record is an example AI summary of the job notes.</p></div>`;
  const delayed = drivers[0];
  const parts = drivers[1];
  const contracts = drivers[2];
  return `${title("Revenue against plan, September", "SAMPLE DATA · $000")}<div class="demo-stats"><div><small>Plan</small><b>${kMoney(plan).replace("+", "")}</b></div><div><small>Actual</small><b>${kMoney(actual).replace("+", "")}</b></div><div><small>Variance</small><b>${kMoney(variance)} <span class="dm-pct">${pct}%</span></b></div></div><div class="dm-ai"><span class="dm-label">Example AI summary</span>Most of the shortfall comes from two delayed projects. ${delayed.records[0][0].split(" ")[0]} ${delayed.records[0][0].split(" ")[1]} and ${delayed.records[1][0].split(" ")[0]} account for ${kMoney(Math.abs(dVar(delayed))).replace("+", "")} of the ${kMoney(Math.abs(variance)).replace("+", "")} gap. ${parts.name} are ${kMoney(Math.abs(dVar(parts))).replace("+", "")} below plan, partly offset by ${kMoney(dVar(contracts))} from ${contracts.name.toLowerCase()}. <button class="dm-link" data-driver="delayed">See the two projects</button></div>${drivers
    .map((x) => {
      const v = dVar(x);
      return `<div class="dm-row"><div><b>${x.name}</b><span class="dm-vbar"><i style="width:${Math.round((Math.abs(v) / maxAbs) * 100)}%" class="${v < 0 ? "neg" : v > 0 ? "pos" : ""}"></i></span></div><span class="dm-num">${kMoney(v)}</span><button class="dm-action" data-driver="${x.id}">Inspect</button></div>`;
    })
    .join("")}<div class="dm-foot"><span>Sample data refreshed 6 Oct 2026, 07:00</span><span>Data connections supply an up-to-date view; AI helps explain it.</span></div>`;
}
function flowView() {
  const m = messages.find((x) => x.id === demo.flow.open);
  if (m)
    return `${bar("Sorted message · sample data", "Back to the inbox")}<div class="dm-detail"><b class="dm-title">${m.subject}</b><p class="dm-note">From ${m.from}</p>${facts([
      ["Category", `${m.cat} <span class="dm-chip">${m.dest}</span>`],
      ["Context", m.context],
    ])}${m.draft ? `<span class="dm-label">Example reply draft</span><div class="dm-draft">${m.draft}</div>` : ""}<div class="dm-flag ${m.kind}">${m.need}</div><p class="dm-note">Status: <b>${m.status}</b>. Nothing is sent from this page.</p></div>`;
  const sorted = demo.flow.sorted;
  return `${title("Shared inbox", "SAMPLE DATA")}${messages
    .map(
      (x) =>
        `<div class="dm-row"><div><b>${x.subject}</b><small>${x.from}</small></div><span class="dm-chip ${sorted ? x.kind : "unsorted"}">${sorted ? x.cat : "Unsorted"}</span>${sorted ? `<button class="dm-action" data-open="${x.id}">Open</button>` : ""}</div>`,
    )
    .join("")}<div class="demo-controls"><span class="demo-result" role="status">${sorted ? "4 messages sorted. Open one to see the context and the draft." : "Try sorting these sample messages."}</span><button class="run-demo" data-sort>${sorted ? "Reset example" : "Sort inbox"}</button></div>`;
}
function renderDemo(focusSel) {
  const el = $("#demo-body");
  if (!el) return;
  $$("[data-demo]").forEach((b) => {
    const active = b.dataset.demo === demoType;
    b.setAttribute("aria-selected", String(active));
    b.tabIndex = active ? 0 : -1;
  });
  el.setAttribute("aria-labelledby", "demo-tab-" + demoType);
  const question = {
    tool: "“Which customers need attention, and what should happen next?”",
    data: "“See what changed. Understand what’s driving it.”",
    flow: "“An inbox that knows who’s writing and why.”",
  }[demoType];
  const body = { tool: toolView, data: dataView, flow: flowView }[demoType]();
  el.innerHTML = `<p class="demo-question">${question}</p><div class="demo-preview">${body}</div>`;
  if (focusSel) el.querySelector(focusSel)?.focus({ preventScroll: true });
}
function selectDemo(button) {
  demoType = button.dataset.demo;
  renderDemo();
}
$$("[data-demo]").forEach((b) =>
  b.addEventListener("click", () => selectDemo(b)),
);
wireArrowTabs($(".demo-tabs"), "[data-demo]", selectDemo);
$("#demo-body")?.addEventListener("click", (e) => {
  const t = e.target.closest("button");
  if (!t) return;
  if (t.dataset.account) {
    demo.tool.view = t.dataset.account;
    renderDemo("[data-back]");
  } else if (t.dataset.driver) {
    demo.data.driver = t.dataset.driver;
    renderDemo("[data-back]");
  } else if (t.dataset.open) {
    demo.flow.open = t.dataset.open;
    renderDemo("[data-back]");
  } else if (t.hasAttribute("data-sort")) {
    demo.flow.sorted = !demo.flow.sorted;
    renderDemo("[data-sort]");
  } else if (t.hasAttribute("data-back")) {
    const back = {
      tool: () => {
        const sel = `[data-account="${demo.tool.view}"]`;
        demo.tool.view = null;
        return sel;
      },
      data: () => {
        const sel = `[data-driver="${demo.data.driver}"]:not(.dm-link)`;
        demo.data.driver = null;
        return sel;
      },
      flow: () => {
        const sel = `[data-open="${demo.flow.open}"]`;
        demo.flow.open = null;
        return sel;
      },
    }[demoType]();
    renderDemo(back);
  }
});
renderDemo();

const directions = {
  tool: {
    title: "Start with one job the tool should do.",
    intro:
      "An app, interactive model, or custom AI agent built around the way your business works. For an agent, we’ll also define what it can access and when it needs your approval.",
    examples: "A customer workspace · A research agent",
    question: "What do you wish the tool could do?",
    next: "Identify who will use it, what information it needs, and one task it should handle. Then test that task in a small working version.",
    related:
      "Related work: the Entec hub, interactive financial models, and the Asset Map Explorer.",
  },
  data: {
    title: "Start with the question you want answered.",
    intro:
      "We can turn scattered numbers into a clearer view, improve a reporting process, or build a way to explore the data yourself.",
    examples: "Management reporting · Market research · Portfolio maps · Financial analysis",
    question: "What is hard to see or answer today?",
    next: "Look at the question and a representative sample of the data. Then choose a useful view or analysis to build first.",
    related:
      "Related work: the Market Selection Tool, variance analysis, and deal-flow reporting.",
  },
  workflow: {
    title: "Find the part that keeps slowing you down.",
    intro:
      "Walk through a real task, see where the effort goes, and build a more useful way to move information from one step to the next.",
    examples: "Inbox triage · Invoice preparation",
    question: "Which task keeps coming back?",
    next: "Map one instance of the workflow, including its exceptions. Identify the first step worth simplifying and where a person should stay involved.",
    related:
      "Related work: shared-inbox triage, accounts payable, and document ingestion.",
  },
  team: {
    title: "Make AI useful in the work your team already does.",
    intro:
      "Sessions built around real tasks, better ways to check results, and reusable approaches the team can keep using.",
    examples: "Hands-on workshops · Reusable assistants",
    question: "What would you like the team to feel more confident doing?",
    next: "Choose a few representative tasks and understand the team’s starting point. Shape a session around actual work and clear takeaways.",
    related:
      "Related work: the AI Resource Hub and reusable workflows built for finance and operations.",
  },
  explore: {
    title: "Let’s work out where AI might help.",
    intro:
      "You don’t need to know which tool, service, or project you need. We can look at the business and work out where an experiment would be worthwhile.",
    examples: "Build or buy · A first experiment",
    question: "What has made you curious about AI?",
    next: "Talk through your situation, constraints, and ideas. Decide whether the next step is advice, an existing tool, a prototype, or a scoped project.",
    related:
      "You can explore the portfolio for examples, or come with something completely different.",
  },
  "ai-adoption": {
    title: "Give people room to experiment, with clear expectations.",
    intro:
      "Review how the team already uses AI, then agree practical guidance on spending, tool access, company ownership, data, and review, so a good experiment can become a tool the business can rely on.",
    examples: "Spending guidelines · A prototype-to-tool checklist · An adoption plan",
    question: "What are people already doing with AI, and what concerns you about it?",
    next: "Review current tools, uses, and responsibilities. Agree what people can explore on their own, what needs review before wider use, and where the spending limits sit.",
    related:
      "Related: team workshops for hands-on practice, and the opportunity sprint for deciding where AI could create value.",
  },
};
const storageKey = "alpha-infra-project-draft-v2";
let draft = { interest: "tool", notes: {} };
try {
  const saved = JSON.parse(sessionStorage.getItem(storageKey) || "null");
  if (saved && directions[saved.interest]) {
    draft.interest = saved.interest;
    if (saved.notes && typeof saved.notes === "object")
      for (const key of Object.keys(directions))
        if (typeof saved.notes[key] === "string")
          draft.notes[key] = saved.notes[key].slice(0, 2000);
  }
} catch {}
const query = new URLSearchParams(location.search);
if (directions[query.get("interest")]) draft.interest = query.get("interest");
function saveDraft() {
  try {
    sessionStorage.setItem(storageKey, JSON.stringify(draft));
  } catch {}
}
function renderExplorer() {
  if (!$("#explorer-panel")) return;
  const d = directions[draft.interest];
  $$("[data-interest]").forEach((b) => {
    const selected = b.dataset.interest === draft.interest;
    b.setAttribute("aria-selected", String(selected));
    b.tabIndex = selected ? 0 : -1;
  });
  $("#explorer-panel").setAttribute(
    "aria-labelledby",
    "interest-" + draft.interest,
  );
  $("#explorer-panel").innerHTML =
    `<p class="eyebrow">A POSSIBLE DIRECTION</p><h3>${d.title}</h3><p>${d.intro}</p><div class="suggestion-examples">${d.examples}</div><label for="idea-context">${d.question} <span>(optional)</span></label><textarea id="idea-context" maxlength="2000" placeholder="A sentence or two is plenty…">${escapeHTML(draft.notes[draft.interest] || "")}</textarea><div class="explorer-actions"><button class="button blue" id="prepare-idea">Shape a starting point <span aria-hidden="true">↗</span></button><button class="quiet-button" id="reset-idea">Start over</button></div>`;
}
function selectInterest(b) {
  draft.interest = b.dataset.interest;
  saveDraft();
  renderExplorer();
}
$$("[data-interest]").forEach((b) =>
  b.addEventListener("click", () => selectInterest(b)),
);
wireArrowTabs($(".explorer-options"), "[data-interest]", selectInterest);
$("#explorer-panel")?.addEventListener("input", (e) => {
  if (e.target.id === "idea-context") {
    draft.notes[draft.interest] = e.target.value;
    saveDraft();
  }
});
function startingText() {
  const d = directions[draft.interest];
  return `ALPHA INFRA · A STARTING POINT\n\n${d.title}\n\n${d.intro}\n\n${draft.notes[draft.interest] ? "My context:\n" + draft.notes[draft.interest] + "\n\n" : ""}A useful next step:\n${d.next}\n\nWe’ll need to discuss the work before agreeing a scope and price.\nhttps://alphainfra.us/contact/`;
}
$("#explorer-panel")?.addEventListener("click", (e) => {
  if (e.target.closest("#reset-idea")) {
    draft = { interest: "tool", notes: {} };
    saveDraft();
    renderExplorer();
    $("#interest-tool").focus({ preventScroll: true });
    toast("Your draft has been cleared.");
  }
  if (e.target.closest("#prepare-idea")) {
    const d = directions[draft.interest];
    showDialog(
      `<p class="eyebrow">YOUR STARTING POINT</p><h2 id="dialog-title">${d.title}</h2><p>${d.intro}</p>${draft.notes[draft.interest] ? `<h3>Your context</h3><p class="draft-context">${escapeHTML(draft.notes[draft.interest])}</p>` : ""}<div class="dialog-fact"><h3>A useful next step</h3><p>${d.next}</p></div><div class="dialog-fact"><h3>Something to explore</h3><p>${d.related}</p><a href="/work/" class="text-link">See the work <span aria-hidden="true">↗</span></a></div><div class="dialog-actions"><a href="/contact/?interest=${draft.interest}&draft=1" class="button blue">Talk this through with David <span aria-hidden="true">↗</span></a><button class="button" id="copy-idea">Copy this starting point</button></div><p class="small-note" style="margin-top:18px;font-size:11px">A suggested direction based on your selections. We’ll agree scope and cost after understanding the job.</p>`,
    );
  }
});
$("#dialog-content")?.addEventListener("click", (e) => {
  if (e.target.closest("#copy-idea")) copyText(startingText());
});
renderExplorer();

let projectData;
const projectInterest = (category) =>
  ({
    workflow: "workflow",
    data: "data",
    team: "team",
    tools: "tool",
    lab: "explore",
  })[category] || "explore";
async function loadProjects() {
  if (!projectData) {
    const response = await fetch("/projects.json");
    if (!response.ok) throw new Error("Project details unavailable");
    projectData = await response.json();
  }
  return projectData;
}
document.addEventListener("click", async (e) => {
  const button = e.target.closest("[data-project]");
  if (button) {
    try {
      const list = await loadProjects();
      const p = list.find((p) => p.id === button.dataset.project);
      if (!p) return;
      const interest = projectInterest(p.cat);
      showDialog(
        `<p class="eyebrow">${escapeHTML(p.type)} · ${escapeHTML(p.label)}</p><h2 id="dialog-title">${escapeHTML(p.title)}</h2><p>${escapeHTML(p.detail)}</p>${p.problem ? `<div class="dialog-fact"><h3>The problem</h3><p>${escapeHTML(p.problem)}</p></div>` : ""}<div class="dialog-fact"><h3>The starting material</h3><p>${escapeHTML(p.input)}</p></div><div class="dialog-fact"><h3>What got built</h3><p>${escapeHTML(p.output)}</p></div><div class="dialog-actions">${p.external ? `<a href="${escapeHTML(p.external)}" class="button" target="_blank" rel="noopener noreferrer">Explore the project <span aria-hidden="true">↗</span></a>` : ""}<a href="/contact/?interest=${interest}" class="button blue">Talk about something similar <span aria-hidden="true">↗</span></a></div>`,
      );
    } catch {
      toast("The project details could not load. Please try again.");
    }
  }
  if (e.target.closest("[data-enlarge]"))
    showDialog(
      '<h2 id="dialog-title" class="sr-only">Entec Sales Intelligence Hub</h2><img src="/assets/entec-sales-hub.webp" alt="Entec’s Sales Intelligence Hub, recreated with fictional names and figures.">',
      true,
    );
});
$$("[data-filter]").forEach((b) =>
  b.addEventListener("click", () => {
    const filter = b.dataset.filter;
    $$("[data-filter]").forEach((el) =>
      el.setAttribute("aria-pressed", String(el === b)),
    );
    let count = 0;
    $$(".catalog-grid [data-category]").forEach((card) => {
      card.hidden = filter !== "all" && card.dataset.category !== filter;
      if (!card.hidden) count++;
    });
    $(".filter-count").textContent =
      `${count} ${count === 1 ? "project" : "projects"}${filter === "all" ? "" : " · " + b.textContent}`;
  }),
);

const caseContent = {
  accounts: {
    title: "Keep the relationship in view.",
    text: "The hub brings job, quote, invoice, and relevant email activity into one account view. Owner-defined triggers identify accounts that may need attention: falling spend, a quiet relationship, an overdue next step, or a completed job awaiting feedback.",
    heading: "An important account has gone quiet.",
    signal: "Activity and spend sit beside the history of the relationship.",
    action:
      "The owner sees the reason for the flag and decides on the follow-up.",
  },
  inquiries: {
    title: "Make the next response visible.",
    text: "The hub filters incoming inquiries and records their details, then follows each one through response, quote, and outcome. It checks timing against Entec’s targets and flags a valuable inquiry that may be slipping.",
    heading: "A promising inquiry is waiting on a quote.",
    signal:
      "The hub compares response and quote timing with Entec’s own targets.",
    action: "The team can see who needs to act and what is outstanding.",
  },
  pipeline: {
    title: "Find another conversation worth having.",
    text: "Completed installations become possible service-conversion leads. Target accounts carry contacts, status, last touch, and next actions. The hub scans public tenders and ranks them for relevance.",
    heading: "A completed installation may need ongoing service.",
    signal: "The hub checks completed jobs against existing service agreements.",
    action: "The opportunity enters a reviewable list for the commercial team.",
  },
};
function renderCase(id) {
  if (!$("#case-panel")) return;
  const d = caseContent[id];
  $$("[data-case]").forEach((b) => {
    const selected = b.dataset.case === id;
    b.setAttribute("aria-selected", String(selected));
    b.tabIndex = selected ? 0 : -1;
  });
  $("#case-panel").setAttribute("aria-labelledby", "case-tab-" + id);
  $("#case-panel").innerHTML =
    `<div><h3>${d.title}</h3><p>${d.text}</p></div><div class="case-example"><span>HOW THE CAPABILITY WORKS</span><h4>${d.heading}</h4><p>${d.signal}</p><p class="case-action">${d.action}</p></div>`;
}
$$("[data-case]").forEach((b) =>
  b.addEventListener("click", () => renderCase(b.dataset.case)),
);
wireArrowTabs($(".case-tabs"), "[data-case]", (b) =>
  renderCase(b.dataset.case),
);
renderCase("accounts");

const contactForm = $("#contact-form");
let preparedMessage = "";
if (contactForm) {
  const select = contactForm.elements.interest;
  const requested = query.get("interest");
  if ([...select.options].some((o) => o.value === requested))
    select.value = requested;
  if (query.get("draft") === "1") {
    contactForm.elements.message.value =
      (draft.notes[draft.interest]
        ? draft.notes[draft.interest] + "\n\n"
        : "") +
      "I explored this possible direction: " +
      directions[draft.interest].title +
      "\n\n" +
      directions[draft.interest].next;
  }
}
// Set to the form service endpoint (for example a Formspree form URL) to send
// messages directly. Empty means the form prepares an email draft instead.
const FORM_ENDPOINT = "https://formspree.io/f/xljggbpy";
if (contactForm && FORM_ENDPOINT) {
  contactForm.querySelector(".form-actions button").innerHTML =
    'Send message <span aria-hidden="true">↗</span>';
  contactForm.querySelector(".form-actions > span").textContent =
    "Goes straight to David. Nothing else happens with it.";
}
function buildMessage(data) {
  return `Hi David,\n\n${data.get("message")}\n\nName: ${data.get("name")}\nEmail: ${data.get("email")}${data.get("company") ? "\nCompany: " + data.get("company") : ""}\nInterest: ${contactForm.elements.interest.selectedOptions[0].textContent}`;
}
function openMailDraft() {
  $("#email-fallback").hidden = false;
  location.href = `mailto:david@alphainfra.us?subject=${encodeURIComponent("An idea for my business")}&body=${encodeURIComponent(preparedMessage)}`;
}
contactForm?.addEventListener("submit", async (e) => {
  e.preventDefault();
  if (!contactForm.reportValidity()) return;
  const data = new FormData(contactForm);
  preparedMessage = buildMessage(data);
  if (!FORM_ENDPOINT) return openMailDraft();
  const button = contactForm.querySelector(".form-actions button");
  button.disabled = true;
  try {
    const res = await fetch(FORM_ENDPOINT, {
      method: "POST",
      headers: { Accept: "application/json" },
      body: data,
    });
    if (!res.ok) throw new Error(String(res.status));
    contactForm.querySelector(".form-row").hidden = true;
    [...contactForm.querySelectorAll("label, .form-actions, .form-note")].forEach((el) => (el.hidden = true));
    $("#form-sent").hidden = false;
  } catch {
    button.disabled = false;
    toast("The message could not be sent, so here is an email draft instead.");
    openMailDraft();
  }
});
$("#copy-message")?.addEventListener("click", () => copyText(preparedMessage));
