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

// A small, honest demonstration of three kinds of build.
let demoType = "tool";
let processed = false;
const doneTasks = new Set();
let reportMetric = "Revenue";
function renderDemo() {
  const el = $("#demo-body");
  if (!el) return;
  $$("[data-demo]").forEach((b) => {
    const active = b.dataset.demo === demoType;
    b.setAttribute("aria-selected", String(active));
    b.tabIndex = active ? 0 : -1;
  });
  el.setAttribute("aria-labelledby", "demo-tab-" + demoType);
  if (demoType === "tool")
    el.innerHTML = `<p class="demo-question">“Could we bring our<br>customer follow-up together?”</p><div class="demo-preview"><div class="preview-title"><b>Today’s customer view</b><span>ILLUSTRATIVE</span></div><div class="demo-stats"><div><small>Key accounts</small><b>35</b></div><div><small>To follow up</small><b id="followup-count">${3 - doneTasks.size}</b></div><div><small>New inquiries</small><b>8</b></div></div>${[
      ["Northgate", "Review account activity"],
      ["Hillcrest", "Prepare a service quote"],
      ["Marlow", "Follow up an inquiry"],
    ]
      .map(
        ([name, task], i) =>
          `<div class="demo-task ${doneTasks.has(i) ? "done" : ""}"><button class="demo-check" aria-label="Mark ${name} follow-up complete" aria-pressed="${doneTasks.has(i)}" data-task="${i}">${doneTasks.has(i) ? "✓" : ""}</button><span class="task-name">${name}</span><small>${task}</small></div>`,
      )
      .join("")}</div>`;
  if (demoType === "data") {
    const values =
      reportMetric === "Revenue" ? [62, 74, 66, 89, 94] : [35, 41, 39, 47, 51];
    el.innerHTML = `<p class="demo-question">“Could we explore the numbers<br>instead of waiting for a report?”</p><div class="demo-preview"><div class="preview-title"><b>A business view you can explore</b><span>ILLUSTRATIVE · $000</span></div><div class="mini-bars">${values.map((v) => `<div class="mini-bar" style="--h:${v * 0.8}%"><small>${v}</small></div>`).join("")}</div><div class="mini-bar-labels"><span>May</span><span>Jun</span><span>Jul</span><span>Aug</span><span>Sep</span></div><div class="demo-controls"><label for="report-metric">Change the view</label><select id="report-metric"><option ${reportMetric === "Revenue" ? "selected" : ""}>Revenue</option><option ${reportMetric === "Expenses" ? "selected" : ""}>Expenses</option></select></div></div>`;
  }
  if (demoType === "flow")
    el.innerHTML = `<p class="demo-question">“Could the inbox do<br>a little more of the work?”</p><div class="demo-preview"><div class="preview-title"><b>Shared inbox</b><span>ILLUSTRATIVE</span></div><div class="flow-demo">${[
      ["Invoice from supplier", "Finance"],
      ["New customer inquiry", "Sales"],
      ["Site visit request", "Operations"],
    ]
      .map(
        ([s, t]) =>
          `<div class="flow-demo-row"><b>${s}</b><span>${processed ? t : "Unsorted"}</span></div>`,
      )
      .join(
        "",
      )}</div><div class="demo-controls"><span class="demo-result" role="status">${processed ? "3 messages categorized for review." : "Try sorting these sample messages."}</span><button class="run-demo" id="run-demo">${processed ? "Reset example" : "Sort the inbox"}</button></div></div>`;
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
  const t = e.target.closest("[data-task]");
  if (t) {
    const i = Number(t.dataset.task);
    doneTasks.has(i) ? doneTasks.delete(i) : doneTasks.add(i);
    renderDemo();
    $(`[data-task="${i}"]`)?.focus({ preventScroll: true });
  }
  if (e.target.closest("#run-demo")) {
    processed = !processed;
    renderDemo();
    $("#run-demo")?.focus({ preventScroll: true });
  }
});
$("#demo-body")?.addEventListener("change", (e) => {
  if (e.target.id === "report-metric") {
    reportMetric = e.target.value;
    renderDemo();
    $("#report-metric")?.focus({ preventScroll: true });
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
      "Practical sessions around real tasks, better ways to check results, and reusable approaches the team can keep using.",
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
        `<p class="eyebrow">${escapeHTML(p.type)} · ${escapeHTML(p.label)}</p><h2 id="dialog-title">${escapeHTML(p.title)}</h2><p>${escapeHTML(p.detail)}</p><div class="dialog-fact"><h3>The starting material</h3><p>${escapeHTML(p.input)}</p></div><div class="dialog-fact"><h3>What got built</h3><p>${escapeHTML(p.output)}</p></div><div class="dialog-actions">${p.external ? `<a href="${escapeHTML(p.external)}" class="button" target="_blank" rel="noopener noreferrer">Explore the project <span aria-hidden="true">↗</span></a>` : ""}<a href="/contact/?interest=${interest}" class="button blue">Talk about something similar <span aria-hidden="true">↗</span></a></div>`,
      );
    } catch {
      toast("The project details could not load. Please try again.");
    }
  }
  if (e.target.closest("[data-enlarge]"))
    showDialog(
      '<h2 id="dialog-title" class="sr-only">Entec Sales Intelligence Hub</h2><img src="/assets/entec-sales-hub.webp" alt="Entec’s Sales Intelligence Hub, with names and figures blurred.">',
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
    text: "The hub filters incoming inquiries and records their details, then tracks progress through response, quote, and outcome. The system tracks timing against Entec’s targets and highlights where a valuable inquiry may need attention.",
    heading: "A promising inquiry is waiting on a quote.",
    signal:
      "The hub compares response and quote timing with Entec’s own targets.",
    action: "The team can see who needs to act and what is outstanding.",
  },
  pipeline: {
    title: "Find another conversation worth having.",
    text: "Completed installations become possible service-conversion leads. Target accounts carry contacts, status, last touch, and next actions. Public tenders are scanned and ranked for relevance.",
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
contactForm?.addEventListener("submit", (e) => {
  e.preventDefault();
  if (!contactForm.reportValidity()) return;
  const data = new FormData(contactForm);
  preparedMessage = `Hi David,\n\n${data.get("message")}\n\nName: ${data.get("name")}\nEmail: ${data.get("email")}${data.get("company") ? "\nCompany: " + data.get("company") : ""}\nInterest: ${contactForm.elements.interest.selectedOptions[0].textContent}`;
  $("#email-fallback").hidden = false;
  location.href = `mailto:david@alphainfra.us?subject=${encodeURIComponent("An idea for my business")}&body=${encodeURIComponent(preparedMessage)}`;
});
$("#copy-message")?.addEventListener("click", () => copyText(preparedMessage));
