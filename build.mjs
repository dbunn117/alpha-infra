import { mkdir, writeFile, copyFile, cp } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
const root = dirname(fileURLToPath(import.meta.url));
const out = join(root, "site");
const e = (s) =>
  String(s).replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ],
  );
const brand = `<a class="brand" href="/" aria-label="Alpha Infra home"><img class="brand-logo" src="/assets/alpha-infra-logo.svg" alt="" width="344" height="96"></a>`;
const arrow = '<span aria-hidden="true">↗</span>';
const link = (href, text, cls = "button") =>
  `<a class="${cls}" href="${href}">${text}${arrow}</a>`;
const eyebrow = (text) => `<p class="eyebrow">${text}</p>`;
const tag = (text) => `<span class="tag">${text}</span>`;
const portrait = `<img src="/assets/david-bunn.jpg" alt="David Bunn" width="800" height="800" loading="lazy">`;
const scheduler = "https://cal.com/david-bunn-eta21c/30min";
const siteUrl = "https://alphainfra.us";
const cta = (
  title = "What are you<br>working on?",
  body = "You don’t need a technical brief. Tell me what you’re trying to do, and we’ll work out a sensible next step.",
) =>
  `<section class="cta-section"><div class="wrap cta-inner"><div>${eyebrow("LET’S TALK")}<h2>${title}</h2><p>${body}</p></div><div>${link("/contact/", "Tell me what you have in mind", "button blue")}</div></div></section>`;
function layout(title, description, path, body) {
  const section = path.split("/")[1];
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${e(title)} · Alpha Infra</title><meta name="description" content="${e(description)}"><meta name="theme-color" content="#f7f6f2"><link rel="canonical" href="${siteUrl}${path}"><meta property="og:type" content="website"><meta property="og:site_name" content="Alpha Infra"><meta property="og:url" content="${siteUrl}${path}"><meta property="og:title" content="${e(title)} · Alpha Infra"><meta property="og:description" content="${e(description)}"><meta property="og:image" content="${siteUrl}/assets/og.png"><meta property="og:image:width" content="1200"><meta property="og:image:height" content="630"><meta name="twitter:card" content="summary_large_image"><link rel="icon" type="image/svg+xml" href="/assets/mark.svg"><link rel="stylesheet" href="/styles.css"><script src="/app.js" defer></script></head><body><a href="#main" class="skip">Skip to content</a><header class="header"><div class="header-inner">${brand}<nav class="desktop-nav" aria-label="Main navigation">${[
    ["services", "How I can help"],
    ["work", "Selected work"],
    ["about", "About David"],
  ]
    .map(
      ([slug, label]) =>
        `<a href="/${slug}/" ${section === slug ? 'aria-current="page"' : ""}>${label}</a>`,
    )
    .join(
      "",
    )}</nav>${link("/contact/", "Let’s talk", "button small header-cta")}<button class="menu-toggle" aria-label="Open navigation" aria-expanded="false" aria-controls="mobile-nav"><span></span><span></span></button></div><nav id="mobile-nav" class="mobile-nav" aria-label="Mobile navigation" hidden><a href="/services/">How I can help</a><a href="/work/">Selected work</a><a href="/about/">About David</a><a href="/explore/">Explore an idea</a><a href="/contact/">Let’s talk</a></nav></header><main id="main">${body}</main><footer class="footer wrap"><div class="footer-top"><div>${brand}<p>Independent AI consulting.<br>Advice and software for your business.</p></div><nav aria-label="Footer"><a href="/services/">How I can help</a><a href="/work/">Selected work</a><a href="/about/">About David</a><a href="/explore/">Explore an idea</a><a href="/contact/">Contact</a></nav><div class="footer-contact"><a href="mailto:david@alphainfra.us">david@alphainfra.us</a><a href="https://www.linkedin.com/in/davidkcbunn" target="_blank" rel="noopener noreferrer">LinkedIn ${arrow}</a><span>Based in the San Francisco Bay Area</span></div></div><div class="footer-bottom"><span>© 2026 Alpha Infra LLC</span><a href="/privacy/">Privacy</a></div></footer><dialog id="project-dialog" aria-labelledby="dialog-title"><button class="dialog-close" aria-label="Close dialog">×</button><div id="dialog-content"></div></dialog><div class="toast" role="status" hidden></div></body></html>`;
}
const helpAreas = [
  {
    id: "tool",
    n: "01",
    title: "Build a useful tool",
    short: "Custom apps and AI agents built around the job you need done.",
    detail:
      "Internal apps and custom AI agents built around your work. An agent can use your information and connected tools to carry out a defined job, with limits on what it can do without approval. Interactive models and searchable knowledge tools fit here too.",
    example:
      "A customer workspace or a research agent that prepares account briefs for review.",
  },
  {
    id: "data",
    n: "02",
    title: "Make sense of your data",
    short: "Reporting you can explore. Answers you can trace.",
    detail:
      "Bring spreadsheets and systems into a clearer view. Build dashboards, automate reporting, explore markets, or give people a way to ask better questions of the numbers.",
    example: "A live management dashboard. A market scorecard. An asset map.",
  },
  {
    id: "workflow",
    n: "03",
    title: "Improve a workflow",
    short: "Less chasing, copying, sorting, and starting over.",
    detail:
      "Connect the steps between an inbox, a document, a database, and the person who needs to act. Use AI where interpretation helps, and ordinary code for the calculations, matching, and rules.",
    example:
      "Invoice processing. Inbox triage. Document extraction. Follow-up.",
  },
  {
    id: "team",
    n: "04",
    title: "Help your team use AI",
    short: "Build confidence on the work they actually do.",
    detail:
      "Working sessions on real tasks, reusable approaches, and guidance on choosing tools and checking outputs. Bring real tasks and leave with ways to handle them better.",
    example: "Team workshops. Reusable assistants. Better everyday habits.",
  },
  {
    id: "explore",
    n: "05",
    title: "Work out where to start",
    short: "Decide what to build, what to buy, and what can wait.",
    detail:
      "Sort through the ideas, examine the process, and decide what to build, what to buy, and what can wait. Maybe the team already uses ChatGPT, or an automation never quite stuck; that’s a fine place to start too. You don’t need the answer before we talk.",
    example: "A feasibility check. An AI roadmap. A first prototype.",
  },
  {
    id: "ai-adoption",
    n: "06",
    title: "Put structure around AI",
    short: "Give your team room to experiment, with clear budgets, responsibilities, and standards.",
    detail:
      "Help your team use AI with a practical approach to spending, tool access, company ownership, data quality, and review. Support useful experimentation, and establish what needs to happen before a prototype becomes a tool the business depends on.",
    example: "A review of current use. Spending guidelines. A checklist for moving a prototype into everyday use.",
    href: "/services/ai-adoption/",
  },
];
function helpList(full = false) {
  return `<div class="help-list">${helpAreas.map((a) => `<a class="help-row" href="${full ? `/explore/?interest=${a.id}` : a.href || `/services/#${a.id}`}"><span class="item-number">${a.n}</span><h3>${a.title}</h3><p>${full ? a.detail : a.short}</p><span class="round-arrow">${arrow}</span></a>`).join("")}</div>`;
}
const projects = [
  {
    id: "entec",
    cat: "tools",
    type: "CLIENT WORK",
    label: "Custom tools · Automation",
    title: "Entec Sales Intelligence Hub",
    problem:
      "Customer activity sat across SimPRO, Xero, and Outlook, with no single view of which accounts and inquiries needed attention.",
    summary:
      "Five revenue channels brought into one morning view for a 15-person services business.",
    input: "Jobs, quotes, invoices, email, and public tenders.",
    output:
      "A working hub that tracks key customers and inquiries, and prioritizes the next commercial action.",
    detail:
      "Built with the owner around the way Entec actually works. SimPRO, Xero, and Outlook contribute to a connected commercial picture, with reviewable AI interpretation and owner-defined rules.",
    href: "/work/entec/",
  },
  {
    id: "market",
    cat: "data",
    type: "PROFESSIONAL WORK",
    label: "Data & reporting",
    title: "Market Selection Tool",
    problem:
      "An analyst needs to compare more than 40 metros across property sectors and explain what is driving each one.",
    summary:
      "Macroeconomic and demographic signals turned into a market research scorecard.",
    input: "Macroeconomic and demographic data by market and property sector.",
    output:
      "Comparable scores and a written read of the trends worth investigating.",
    detail:
      "A tool for investment research that combines quantitative indicators with an explanation of what is driving the result. It helps an analyst decide where to look more closely.",
  },
  {
    id: "map",
    cat: "tools",
    type: "PROFESSIONAL WORK",
    label: "Custom tools · Data",
    title: "Asset Map Explorer",
    summary:
      "An interactive way to explore portfolio exposure, assets, and tenant detail.",
    input: "Portfolio, market, rent, and tenant data.",
    output:
      "A map that lets users move from a portfolio overview into specific assets.",
    detail:
      "Built to make portfolio questions easier to investigate across markets, with relevant asset and tenant detail available in context.",
  },
  {
    id: "variance",
    cat: "data",
    type: "PROFESSIONAL WORK",
    label: "Finance · Reporting",
    title: "Variance Analysis Tool",
    summary:
      "Monthly general-ledger data organized into the exceptions that need an explanation.",
    input: "General-ledger extracts for about 50 properties.",
    output: "A focused view of the variances to review during month-end.",
    detail:
      "An interactive application that brings the calculations and the explanatory work together, using AI interpretation where appropriate.",
  },
  {
    id: "diligence",
    cat: "tools",
    type: "PROFESSIONAL WORK",
    label: "Knowledge & research",
    title: "Due-Diligence Drafting System",
    summary:
      "Find prior answers when the next investor questionnaire arrives.",
    input: "About 4,000 historic question-and-answer pairs.",
    output: "Relevant prior responses to support a new draft.",
    detail:
      "Semantic search helps find useful precedent across differently worded questions. The resulting draft remains something the team reviews.",
  },
  {
    id: "inbox",
    cat: "workflow",
    type: "PROFESSIONAL WORK",
    label: "Workflow automation",
    title: "Shared-Inbox Triage",
    summary:
      "Incoming messages classified and routed to the people who should handle them.",
    input: "A high-volume shared inbox.",
    output: "Structured categories and routing within a repeatable workflow.",
    detail:
      "Built with Power Automate, AI classification, and Copilot Studio to reduce repetitive handling and make ownership clearer.",
  },
  {
    id: "dealflow",
    cat: "data",
    type: "PROFESSIONAL WORK",
    label: "Automation · Reporting",
    title: "Deal-Flow Reporting",
    summary:
      "Hundreds of weekly deal emails turned into a picture of market activity.",
    input: "Weekly call-for-offers emails.",
    output:
      "A shared database and Power BI reporting by region and property type.",
    detail:
      "Connects incoming deal information to a reporting workflow so the capital-markets team can investigate recent activity.",
  },
  {
    id: "models",
    cat: "tools",
    type: "PROFESSIONAL WORK",
    label: "Financial modeling",
    title: "Interactive Financial Models",
    summary:
      "Models stakeholders can explore themselves as assumptions change.",
    input: "Financial models and their underlying assumptions.",
    output:
      "Interactive applications for exploring scenarios and their drivers.",
    detail:
      "Rebuilds the experience of working with financial models so the conversation can happen around a live scenario.",
  },
  {
    id: "docs",
    cat: "workflow",
    type: "PROFESSIONAL WORK",
    label: "Document workflows",
    title: "Documents to a Queryable Database",
    summary:
      "Extract sales and lease details into a database the team can query.",
    input: "Documents including sales and lease comparables.",
    output: "Structured data in a queryable database.",
    detail:
      "AI extraction and automation connect document intake to a reusable data foundation.",
  },
  {
    id: "payables",
    cat: "workflow",
    type: "PROFESSIONAL WORK",
    label: "Finance automation",
    title: "Accounts-Payable Workflow",
    problem:
      "Invoices arrived in a shared mailbox, and a wire-request package had to be prepared from them every week.",
    summary:
      "Invoice intake, validation, and weekly wire-request preparation brought together.",
    input: "Invoices arriving through a shared mailbox.",
    output: "Extracted details and a prepared weekly wire-request package.",
    detail:
      "A scheduled workflow automates preparation. It does not replace the people responsible for review and payment approval.",
  },
  {
    id: "hub",
    cat: "team",
    type: "PROFESSIONAL WORK",
    label: "Team enablement",
    title: "AI Resource Hub",
    summary: "A place for a team to learn, explore, and keep up with AI.",
    problem: "A team wanted to learn and keep up with AI, and the useful material was scattered across links, chats, and newsletters.",
    input: "Curated learning paths, prompting approaches, news, and research.",
    output: "An internal resource hub with scheduled news updates.",
    detail:
      "Combines practical learning resources with current material to give a team a useful place to start.",
  },
  {
    id: "pitchmap",
    cat: "lab",
    type: "INDEPENDENT PROJECT",
    label: "Research · Public data",
    title: "PitchMap",
    summary:
      "US markets explored through the lens of cricket business opportunity.",
    input: "Census, business-pattern, and OpenStreetMap data.",
    output: "Audience, commercial, and infrastructure-gap signals by market.",
    detail:
      "An independent project for exploring how public data can inform a specific commercial question.",
    external: "https://dbunn117.github.io/pitchmap/",
  },
  {
    id: "hermes",
    cat: "lab",
    type: "INDEPENDENT PROJECT",
    label: "Custom AI agents",
    title: "Hermes",
    problem:
      "Agent patterns need a real, low-stakes place to be tested before they are used in client work.",
    summary:
      "Personal AI agents that retain context and bring work back for human approval.",
    input: "Personal knowledge and connected workflows.",
    output:
      "Agents for administration, health, and parenting.",
    detail:
      "A personal testing ground for patterns that may be useful in business: remembering context, surfacing useful information, and requiring approval for consequential actions.",
    external: "/hermes/",
  },
  {
    id: "cricfan",
    cat: "lab",
    type: "INDEPENDENT PROJECT",
    label: "Data · Conversational tools",
    title: "CricFan AI",
    summary: "Natural-language questions over ball-by-ball cricket data.",
    input: "Cricsheet cricket data.",
    output: "A conversational interface for cricket statistics and analysis.",
    detail: "An independent app built with Next.js, Supabase, and Claude.",
    external: "https://cricfanai-web.vercel.app",
  },
];
const marketArt = `<div class="market-art"><div class="artifact-label">MARKET RESEARCH <span>ILLUSTRATIVE</span></div><h4>Where to look next.</h4>${[
  ["Cedar Valley", 86],
  ["Northbank", 74],
  ["Lakehaven", 68],
]
  .map(
    ([n, v], i) =>
      `<div class="art-bar-row"><span>0${i + 1}</span><b>${n}</b><i style="--bar:${v}%"></i><strong>${v}</strong></div>`,
  )
  .join("")}<p>Signals weighted. Reasons visible.</p></div>`;
const workflowArt = `<div class="workflow-art"><div class="artifact-label">INVOICE PREPARATION <span>ILLUSTRATIVE</span></div><div class="mail-item"><span>✉</span><div><b>Invoice received</b><small>Supplier · amount · due date</small></div><i>01</i></div><div class="workflow-connector"></div><div class="mail-item"><span>✓</span><div><b>Extract & check</b><small>Details matched to your rules</small></div><i>02</i></div><div class="workflow-connector"></div><div class="mail-item final"><span>▤</span><div><b>Ready for review</b><small>A person approves the next step</small></div><i>03</i></div></div>`;
function projectCard(p, art = false) {
  return `<article class="project-card" data-category="${p.cat}">${art ? (p.id === "entec" ? `<div class="project-art entec-art"><img src="/assets/entec-sales-hub.webp" alt="Entec’s Sales Intelligence Hub, recreated with fictional names and figures." width="1600" height="900" loading="lazy"><span class="image-note hand">built around the business.</span></div>` : p.id === "hub" ? `<div class="project-art entec-art hub-shot"><img src="/assets/ai-resource-hub.webp" alt="An internal AI resource hub, recreated with fictional content: learning paths, shared prompt patterns, and a weekly news panel." width="1600" height="900" loading="lazy"></div>` : p.id === "market" ? `<div class="project-art entec-art market-shot"><img src="/assets/market-scorecard.webp" alt="A market scorecard, recreated with fictional markets: three signal families scored red, amber, or green, and an overall rank." width="1600" height="900" loading="lazy"></div>` : `<div class="project-art">${workflowArt}</div>`) : ""}<div class="project-card-content"><div class="project-meta"><span>${p.label}</span><span>${p.type}</span></div><h3>${p.title}</h3>${art && p.problem ? `<p class="project-problem"><b>The problem.</b> ${p.problem}</p><p><b>What changed.</b> ${p.output}</p>` : `<p>${p.summary}</p>`}${p.href ? link(p.href, "Read the story", "text-link") : `<button class="text-link" data-project="${p.id}">Explore the work ${arrow}</button>`}</div></article>`;
}
const shortQuote = `<section class="quote-band"><div class="wrap quote-inner"><span class="quote-mark">“</span><div><blockquote>Working with David at Alpha Infra has been fantastic, on two fronts: the output has been great, and so has the experience.</blockquote><p>William van der Byl <span>Owner, Entec Access Systems</span></p></div></div></section>`;
function faq(items) {
  return `<div class="faq-list">${items.map(([q, a]) => `<details><summary>${q}<span aria-hidden="true">+</span></summary><div>${a}</div></details>`).join("")}</div>`;
}
const faqs = [
  [
    "I have an idea, but no technical brief. Is that enough?",
    "Yes. A rough description of what you want to do, or of what’s frustrating today, is enough for a first conversation.",
  ],
  [
    "Do you advise, build, or both?",
    "Both. I can help work out what’s worth doing, build a working tool or workflow, and help the team use it. The right starting point depends on what you need.",
  ],
  [
    "Do you only work with finance and investment teams?",
    "No. That experience is part of how I approach a business, but the work also includes commercial systems, operational workflows, internal tools, and team enablement. Entec, a 15-person services business, is one example.",
  ],
  [
    "Does everything need to use AI?",
    "No. I use normal software for calculations, exact matching, and repeatable rules. AI is useful where interpretation, extraction, or language helps. We choose the approach that fits the job.",
  ],
  [
    "Who owns what you build?",
    "I hand over the code, documentation, and access you need to run the build. I aim to build in accounts you control. We agree third-party tools and any licensing dependencies in the scope.",
  ],
  [
    "What does a first conversation look like?",
    "We spend about 30 minutes on what you’re trying to do and how it works today, and we usually end with a sensible next step. There’s no charge and nothing formal to prepare.",
  ],
  [
    "We’ve tried AI and aren’t getting much out of it. Is that worth a conversation?",
    "Yes. Maybe the team uses ChatGPT, you have bought a few subscriptions, or an automation never quite stuck. We can look at what’s getting in the way and work out what’s worth changing. Often that’s a narrower first use, or a better fit with how the work actually happens.",
  ],
  [
    "Our team is already using AI. Can you help us put some structure around it?",
    "Yes. I can help you review current use, establish spending and tool guidelines, clarify ownership and responsibilities, and agree what needs checking before an experiment becomes part of everyday work. The aim is to support useful experimentation while making expectations clear. <a href=\"/services/ai-adoption/\">More on putting structure around AI</a>.",
  ],
  [
    "How will we know it’s useful?",
    "We agree what success looks like before the build starts: a number that should move, time that should come back, or a decision that should get easier. After handover we check against that measure, rather than a general sense that it helps.",
  ],
  [
    "What happens to our business data?",
    "It stays in your systems and accounts. A build reads what it needs through connections you control. If an AI or automation provider processes any of it, I document what is sent, where it is processed, and how long it is kept before the system goes live. I never use one client’s data to build another client’s system.",
  ],
  [
    "What will we need to maintain or pay for afterwards?",
    "Before launch I estimate the running costs: AI usage, hosting, and any subscriptions, all in accounts you own. Handover includes documentation and a note of what to keep an eye on. Ongoing support is a separate, optional arrangement with an agreed scope.",
  ],
  [
    "What happens when a better AI model comes along?",
    "The aim is for your system to benefit from better models rather than be replaced by them. Your business rules, connected data, and workflows form the foundation. We use conventional code for calculations and fixed rules, and AI where interpretation is useful. Where practical, we keep that AI component separate so we can assess different models as their capabilities and costs change. Switching still needs testing, and some changes need development, but the knowledge and structure built around your business don’t have to be recreated because a new model arrives.",
  ],
];
const explorer = `<section class="explorer-section wrap" id="start"><div class="section-heading"><div>${eyebrow("START WITH YOUR SITUATION")}<h2>What would you like<br>to make possible?</h2></div><p>You don’t have to know what to build.<br>Pick the closest starting point.</p></div><div class="explorer" data-explorer><div class="explorer-options" role="tablist" aria-orientation="vertical" aria-label="What would you like help with?">${helpAreas.map((a, i) => `<button role="tab" id="interest-${a.id}" aria-selected="${i === 0}" aria-controls="explorer-panel" tabindex="${i === 0 ? "0" : "-1"}" data-interest="${a.id}"><span>0${i + 1}</span>${["I have an idea for a tool", "I want better answers from my data", "A workflow is taking too much time", "I want my team to use AI well", "I’m not sure where to start", "Our people are using AI and we need some structure"][i]}${arrow}</button>`).join("")}</div><div class="explorer-panel" id="explorer-panel" role="tabpanel" aria-labelledby="interest-tool"></div></div><p class="explorer-foot">This guide uses written suggestions, not a live AI assessment. Your notes stay in this browser until you choose to share them.</p></section>`;
const heroDemo = `<div class="hero-demo"><div class="demo-top"><span>TRY A WORKING EXAMPLE</span></div><div class="demo-tabs" role="tablist" aria-label="Example project"><button role="tab" id="demo-tab-tool" aria-selected="true" aria-controls="demo-body" data-demo="tool">A custom tool</button><button role="tab" id="demo-tab-data" aria-selected="false" aria-controls="demo-body" tabindex="-1" data-demo="data">Better reporting</button><button role="tab" id="demo-tab-flow" aria-selected="false" aria-controls="demo-body" tabindex="-1" data-demo="flow">A smoother workflow</button></div><div id="demo-body" role="tabpanel" aria-labelledby="demo-tab-tool"></div><div class="demo-footer"><span>Interactive demos using fictional data and prewritten example outputs. No live AI, connected accounts, or messages sent.</span></div></div>`;
const home = `<section class="home-hero wrap"><div class="hero-copy">${eyebrow("INDEPENDENT AI CONSULTANT & BUILDER")}<h1>AI, put to work<br>in <em>your business.</em></h1><p>I help you work out where AI is worth using, then get it working in your business. That might mean making better use of the tools you already have, helping your team, or building something new.</p><div class="hero-actions">${link("/explore/", "Explore your idea", "button blue")}${link("/work/", "See what I’ve built", "text-link")}</div><div class="hero-person">${portrait}<div><b>Hi, I’m David Bunn.</b><span>You’ll work directly with me.</span></div></div></div>${heroDemo}</section><div class="experience-strip"><div class="wrap"><span>BUSINESS EXPERIENCE BEHIND THE BUILD</span><b>PwC</b><b>Major League Cricket</b><b>Stockbridge Capital Group</b><span>Finance · Operations · Data</span></div></div><section class="section wrap"><div class="section-heading"><div>${eyebrow("HOW I CAN HELP")}<h2>What would you like<br>to work on?</h2></div><p>You might need an app, a report, or help with a process that keeps getting stuck. You can also start with a question about AI.</p></div>${helpList()}<div class="section-end">${link("/services/", "See the ways we can work together", "text-link")}</div></section><section class="work-section"><div class="wrap"><div class="section-heading"><div>${eyebrow("SELECTED WORK")}<h2>A few things I’ve built.</h2></div>${link("/work/", "Explore the portfolio", "text-link")}</div><div class="featured-projects">${projectCard(projects[0], true)}${projectCard(projects[1], true)}${projectCard(projects[9], true)}</div></div></section>${shortQuote}${explorer}<section class="about-teaser wrap"><div class="portrait-frame">${portrait}<span class="hand">David Bunn</span></div><div>${eyebrow("THE PERSON BEHIND THE BUILD")}<h2>I know what it’s like<br>to be on your side<br><em>of the spreadsheet.</em></h2><p>At PwC, Major League Cricket, and Stockbridge, I worked on financial reporting, forecasts, and operating processes. I’ve been the person preparing the numbers and explaining them.</p><p>Today, I combine that experience with AI and software to build working tools for other businesses. You work directly with me throughout.</p>${link("/about/", "A little more about me", "text-link")}<div class="credentials"><span>10+ years in business</span><span>BIDA® Certified</span><span>CPA (inactive)</span></div></div></section><section class="approach-section"><div class="wrap approach-grid"><div>${eyebrow("THE WAY I SEE IT")}<h2>The exciting question is,<br><em>“What can we do now?”</em></h2></div><div><p>Sometimes AI makes an existing task easier. Sometimes it makes a tool, an analysis, or a whole new capability practical for the first time.</p><p>That might mean automating invoice preparation, or building a market-research tool that was previously too expensive to justify.</p><p>The questions I find most useful: which customers are we overlooking, which markets deserve a closer look, and what could we offer that wasn’t practical before?</p></div></div></section><section class="section wrap faq-section"><div>${eyebrow("A FEW PRACTICAL QUESTIONS")}<h2>Before we talk.</h2></div>${faq([faqs[0], faqs[6], faqs[7], faqs[11], faqs[8], faqs[9], faqs[10]])}</section>${cta()}`;

const offers = [
  {
    slug: "quick-win",
    name: "A focused first build",
    legacy: "Quick Win",
    label: "START SMALL",
    price: "$2,500",
    suffix: "fixed",
    time: "2 to 3 weeks to build",
    text: "One well-defined tool, report, or workflow. A useful first version to put into practice.",
    for: "You have a specific problem or idea, but don’t need to know the solution yet. We’ll agree a manageable first scope before the build begins.",
    gets: [
      "One agreed capability, built and handed over",
      "A clear measure of whether it is helping",
      "30 days of measurement after the build",
    ],
    examples: [
      "An account watchlist",
      "A focused reporting view",
      "A bounded document or inquiry workflow",
    ],
    note: "I credit the fee toward a later, larger build.",
  },
  {
    slug: "system",
    name: "A custom tool or system",
    legacy: "Custom builds",
    label: "CUSTOM BUILD",
    price: "$10,000 to $15,000",
    suffix: "typical",
    time: "Around 6 weeks for a typical system",
    text: "A custom app, AI agent, or connected workflow built around your business.",
    for: "You need more than a single improvement: an application or workflow that brings several moving parts together.",
    gets: [
      "A scoped build with working versions to review",
      "Data connections and business rules agreed together",
      "Testing, documentation, and handover in accounts you control",
    ],
    examples: [
      "A sales intelligence hub",
      "An interactive financial application",
      "A connected reporting or research system",
      "A custom AI agent for customer research",
    ],
    note: "A build can combine several data sources with analysis and recommended actions, as in the Entec hub. We agree scope and timing before work starts.",
  },
  {
    slug: "strategy",
    name: "An AI opportunity sprint",
    legacy: "AI Opportunity Sprint",
    label: "GET CLEAR",
    price: "$7,500",
    suffix: "fixed",
    time: "2 weeks",
    text: "Compare the strongest opportunities, test one with a prototype, and leave with a 90-day plan.",
    for: "There are several plausible ideas to compare, or you need a clearer basis for deciding where to invest time and money. One idea with an unclear solution usually starts with the free conversation or a focused first build.",
    gets: [
      "Opportunities ranked by value, feasibility, cost, and risk",
      "Build, buy, and not-now recommendations",
      "A 90-day roadmap and one prototype",
    ],
    examples: [
      "An AI roadmap you can act on",
      "A build-versus-buy decision",
      "A prototype to test an important assumption",
    ],
    note: "I credit half the sprint fee toward a later build. If the question is how the business should experiment, spend, and take responsibility for what gets built, see <a href=\"/services/ai-adoption/\">structure around AI</a>.",
  },
  {
    slug: "ai-adoption",
    name: "Structure around AI",
    legacy: "AI adoption support",
    label: "AI STRATEGY, GOVERNANCE & ENABLEMENT",
    title: "Put structure around AI",
    description:
      "AI strategy, governance, and team enablement: a practical approach to spending, tool access, company ownership, data quality, testing, and handover.",
    price: "Scoped together",
    suffix: "around your priorities",
    time: "Starts with a review of how your team uses AI",
    text: "Give your team room to experiment, with clear budgets, responsibilities, and standards.",
  },
  {
    slug: "workshops",
    name: "Practical help for your team",
    legacy: "Team workshops",
    label: "MAKE IT PART OF THE WORK",
    price: "From $3,500",
    suffix: "half-day",
    time: "Half-day or full-day sessions",
    text: "Hands-on sessions around real work, with approaches the team can keep using afterwards.",
    for: "People are experimenting with AI but would benefit from shared approaches, clearer judgment, and practical examples.",
    gets: [
      "Working sessions on your team’s real tasks",
      "Reusable prompts, workflows, or assistants appropriate to the session",
      "Guidance on checking outputs and handling information",
    ],
    examples: [
      "Reporting and analysis routines",
      "Research and writing workflows",
      "Making better use of a system already built",
    ],
    note: "Full-day sessions start at $6,000. We scope the audience, preparation, and deliverables together.",
  },
  {
    slug: "care",
    name: "Support after the build",
    legacy: "Alpha System Care",
    label: "KEEP IT USEFUL",
    price: "From $1,500",
    suffix: "/ month",
    time: "For existing build clients",
    text: "Keep a working system reliable as the data, tools, and business change.",
    for: "You have a system I built and want ongoing help maintaining and improving it.",
    gets: [
      "Checks on quality, reliability, and running cost",
      "Agreed changes to rules and handling of exceptions",
      "A regular review of how the system is performing",
    ],
    examples: [
      "Monitoring a live workflow",
      "Maintaining data connections",
      "Refining rules as the business evolves",
    ],
    note: "Optional ongoing support. We agree scope and response arrangements separately.",
  },
];
const offerCard = (o) =>
  `<article class="offer-card">${eyebrow(o.label)}<h3>${o.name}</h3><p>${o.text}</p><div class="offer-price">${o.price} <small>${o.suffix}</small></div><span class="offer-time">${o.time}</span>${link("/services/" + o.slug + "/", "See what’s included", "text-link")}</article>`;
const services = `<section class="page-intro wrap">${eyebrow("HOW I CAN HELP")}<h1>What I can help you<br><em>do with AI.</em></h1><p>Advice, custom tools, better reporting, automation, and practical help for your team. You can come with a clear idea or a feeling that there must be a better way.</p></section><section class="wrap service-areas">${helpAreas.map((a) => `<article id="${a.id}" class="service-area"><span class="item-number">${a.n}</span><div><h2>${a.title}</h2><p>${a.detail}</p><span class="example-line">${a.example}</span></div>${a.href ? link(a.href, "See the full service", "text-link") : link("/explore/?interest=" + a.id, "Explore a starting point", "text-link")}</article>`).join("")}</section><section class="section tinted"><div class="wrap"><div class="section-heading"><div>${eyebrow("WAYS TO WORK TOGETHER")}<h2>Projects, fees,<br>and timelines.</h2></div><p>The examples below give you a sense of scale. We’ll choose the format around your situation.</p></div><div class="offer-grid">${offers.map(offerCard).join("")}</div><p class="pricing-note">Fees in USD. We discuss hosting, model usage, and other third-party costs separately before the build.</p></div></section><section class="section wrap"><div class="section-heading"><div>${eyebrow("HOW THE WORK HAPPENS")}<h2>How we’ll work together.</h2></div><p>You work with me throughout. You review working versions as the project takes shape.</p></div><div class="process-grid">${[
  [
    "Understand",
    "The task, the people, the constraints, and what a useful result looks like.",
  ],
  [
    "Make it tangible",
    "A sketch or working version that lets us test the important assumptions.",
  ],
  [
    "Build & check",
    "Connect the pieces, test real cases, and make the behavior understandable.",
  ],
  [
    "Hand it over",
    "A working result, the documentation, and a team that knows how to use it.",
  ],
]
  .map(
    ([t, p], i) =>
      `<article><span>0${i + 1}</span><h3>${t}</h3><p>${p}</p></article>`,
  )
  .join(
    "",
  )}</div></section><section class="wrap faq-section section"><div>${eyebrow("PRACTICALITIES")}<h2>A few things<br>you might ask.</h2></div>${faq(faqs)}</section>${cta()}`;
const foundation = `<section class="section wrap foundation-section"><div class="case-narrative"><div>${eyebrow("WHAT YOU’RE INVESTING IN")}<h2>Built around your business,<br>with AI as one part of it.</h2></div><div><p>The most valuable part of a custom system often isn’t the AI. It’s getting the rules out of people’s heads and into a form the business can use, connecting information across your systems, and agreeing what matters, how it’s calculated, and what should happen next.</p><p>Most of that foundation is conventional software: data connections, calculations, business rules, and workflows. AI handles the parts that benefit from interpretation, such as extracting information, assessing relevance, or summarizing correspondence.</p><p>That separation matters. As models improve or pricing changes, we can evaluate and update the AI component without necessarily rebuilding the business logic and connections around it. Switching still needs testing, and some changes need development, but the knowledge and structure don’t have to be recreated because a new model arrived.</p><p>You’re investing in a system that captures how your business works, with AI as one adaptable part of it.</p></div></div><div class="foundation-grid"><div>${eyebrow("CONVENTIONAL SOFTWARE")}<h3>The business foundation</h3><ul class="dot-list">${["Connected business data.", "Documented rules and definitions.", "Repeatable calculations and workflows.", "Access controls and review steps."].map((t) => `<li>${t}</li>`).join("")}</ul></div><div>${eyebrow("AI, WITHIN AGREED LIMITS")}<h3>Where AI adds value</h3><ul class="dot-list">${["Extracting information from documents.", "Interpreting unstructured requests.", "Summarizing relevant context.", "Assessing relevance against agreed criteria."].map((t) => `<li>${t}</li>`).join("")}</ul></div></div><p class="foundation-note">These aren’t two separate systems. The foundation gives the AI its context, and conventional code decides what happens with what the AI produces. Both need testing: ordinary code is only as right as the rules we agreed.</p><p class="foundation-note">In the <a href="/work/entec/">Entec hub</a>, a better model might improve how the system interprets an inquiry or summarizes a customer conversation. It wouldn’t replace the work of connecting SimPRO, Xero, and Outlook, defining key accounts, or agreeing which follow-ups deserve attention.</p></section>`;
const agentOffering = `<section class="section tinted" id="custom-agents"><div class="wrap case-narrative"><div>${eyebrow("CUSTOM AI AGENTS")}<h2>An agent built around<br>a specific job.</h2></div><div><p>An agent could research prospective customers and prepare account briefs, or monitor incoming inquiries and draft the next step. I design the workflow around your information and tools, with clear boundaries on what it can do and when it needs your approval.</p><p>For example, a customer-research agent could check sources you approve, compare prospects against your criteria, and prepare a brief explaining why an account might be worth a conversation. You review the evidence before deciding who to contact. This is an example of a possible build, not a client case study.</p><p>Before launch, we test representative tasks and exceptions, including missing or conflicting information. Ordinary code handles exact calculations and fixed rules; AI handles interpretation where it helps. We agree access limits and approval steps, and keep a record of the agent’s actions so you can check what happened.</p><p>The point is to give a small team research coverage it couldn’t previously justify staffing, without handing over its commercial judgment.</p><button class="text-link" data-project="hermes">Explore Hermes, my independent agent project ${arrow}</button></div></div></section>`;
function adoptionPage(o) {
  const areas = [
    ["Direction and spending", "Clarify priorities, set experiment budgets and approval thresholds, and agree when to continue, stop, or expand a use case. Judge the result against the full cost, including software, staff time, and review."],
    ["People and experimentation", "Give people practical guidance, chances to learn, and a way to share what works. Establish who supports experiments and how a promising idea moves beyond one person’s desk."],
    ["Ownership and maintainability", "Set expectations for company-controlled accounts, code, access, documentation, and handover. Make sure a useful tool can be understood and maintained by someone other than the person who built it."],
    ["Data and reliability", "Identify appropriate data sources, assign responsibility for keeping them current, and agree how outputs get checked. Set testing and approval expectations in proportion to how the tool will be used."],
  ];
  const stages = [
    ["Explore", "A defined purpose, appropriate data, and an agreed budget."],
    ["Trial", "Test real examples with a limited group and a named owner."],
    ["Operate", "Agree access, documentation, checks, maintenance, and ongoing costs."],
  ];
  const grid = (items, cls) => `<div class="process-grid ${cls}">${items.map(([t, p], i) => `<article><span>0${i + 1}</span><h3>${t}</h3><p>${p}</p></article>`).join("")}</div>`;
  return `<section class="page-intro wrap"><a class="breadcrumb" href="/services/">How I can help / ${o.legacy}</a>${eyebrow(o.label)}<h1>Put structure<br><em>around AI.</em></h1><p>AI adoption involves more than choosing tools. Your team needs time and support to explore, a way to decide what’s worth pursuing, and clear expectations for anything the business comes to rely on.</p><p>I help you establish a practical approach to spending, tool access, company ownership, data quality, testing, and handover, so useful experiments can become tools the business can use and maintain.</p></section><section class="wrap offer-detail"><div><h2>When this is useful.</h2><ul class="dot-list">${[
    "People are using AI, but approaches and expectations vary across the team.",
    "You want to encourage experimentation without leaving spending open-ended.",
    "Employees are building tools, and you need clarity on ownership, access, and maintenance.",
    "You need a consistent approach to business data, checking outputs, and approving consequential actions.",
    "You want a plan for adoption that goes further than a list of tools or possible projects.",
  ].map((t) => `<li>${t}</li>`).join("")}</ul><h2>What we could put in place.</h2><ul class="check-list">${[
    "A review of existing AI tools, uses, and responsibilities",
    "A prioritized adoption plan",
    "Spending guidelines and approval thresholds",
    "Plain-English guidance on tools, data handling, and human review",
    "A checklist for moving a prototype into business use",
    "Ownership, documentation, and handover expectations",
    "A team enablement and review plan",
  ].map((g) => `<li>${g}</li>`).join("")}</ul><p class="detail-note">We agree the deliverables to suit the business. Few engagements need all of these, and the shape depends on how far along the team already is.</p></div><aside class="engagement-card">${eyebrow("HOW IT STARTS")}<p class="engagement-lead">Start with a review of how your team uses AI and where more structure would help.</p><p>We agree the scope around your priorities, then put the relevant guidance and practices in place.</p><hr><p>The fee and timing follow the agreed scope.</p>${link("/contact/?interest=" + o.slug, "Talk through your team’s AI use", "button blue")}</aside></section><section class="section tinted"><div class="wrap"><div class="section-heading"><div>${eyebrow("WHERE STRUCTURE HELPS")}<h2>Four areas<br>we work through.</h2></div><p>The central idea: give people room to experiment, with clear expectations for anything the business comes to rely on.</p></div>${grid(areas, "areas")}</div></section><section class="section wrap"><div class="section-heading"><div>${eyebrow("FROM EXPERIMENT TO BUSINESS TOOL")}<h2>Not every experiment<br>needs the same controls.</h2></div><p>A personal prototype and a tool used to prepare client deliverables shouldn’t carry the same requirements. We agree what people can explore on their own, what needs review before wider use, and who takes responsibility once others depend on it.</p></div>${grid(stages, "three")}<p class="stage-note">Finding out that an idea doesn’t work is a fair result of an experiment. The point is to notice early, keep what does work, and know when a tool has become something people depend on.</p></section><section class="section tinted"><div class="wrap case-narrative"><div>${eyebrow("HOW THIS FITS")}<h2>Distinct from a sprint,<br>a workshop, or a build.</h2></div><div><p>An <a href="/services/strategy/">opportunity sprint</a> identifies and tests where AI could create value in the business. This work establishes how the business experiments, spends, builds, and takes responsibility for what it comes to rely on. The two often follow each other, in either order.</p><p><a href="/services/workshops/">Team workshops</a> can be part of it, for hands-on practice on real tasks, and the guidance we agree gives those sessions something to build on. If the team then needs something built, a <a href="/services/quick-win/">focused first build</a> or a <a href="/services/system/">custom system</a> picks up from there.</p></div></div></section><section class="section wrap"><div class="section-heading"><div>${eyebrow("GROUNDED IN ACTUAL WORK")}<h2>See what that can become.</h2></div></div><div class="featured-projects two">${projectCard(projects[0], true)}${projectCard(projects[10], true)}</div></section>${cta("How is your team<br>using AI today?", "Tell me what people are already doing and where you’d like more structure. We’ll work out a sensible scope from there.")}`;
}
function offerPage(o) {
  return `<section class="page-intro wrap"><a class="breadcrumb" href="/services/">How I can help / ${o.legacy}</a>${eyebrow(o.label)}<h1>${o.name}.</h1><p>${o.text}</p></section><section class="wrap offer-detail"><div><h2>When this is useful.</h2><p>${o.for}</p><h2>What you leave with.</h2><ul class="check-list">${o.gets.map((g) => `<li>${g}</li>`).join("")}</ul><h2>What it could look like.</h2><div class="example-tags">${o.examples.map(tag).join("")}</div><p class="detail-note">${o.note}</p></div><aside class="engagement-card">${eyebrow(o.legacy)}<div class="offer-price">${o.price} <small>${o.suffix}</small></div><p>${o.time}</p><hr><p>We agree the scope, assumptions, and handover before starting.</p>${link("/contact/?interest=" + o.slug, "Talk through a project", "button blue")}</aside></section>${o.slug === "system" ? foundation + agentOffering : ""}<section class="section wrap"><div class="section-heading"><div>${eyebrow("GROUNDED IN ACTUAL WORK")}<h2>See what that can become.</h2></div></div><div class="featured-projects two">${projectCard(projects[0], true)}${projectCard(projects[o.slug === "workshops" ? 10 : 1], true)}</div></section>${o.slug === "system" ? `<section class="wrap small-faq section">${faq([faqs[11], faqs[3], faqs[4]])}</section>` : ""}${cta()}`;
}
const work = `<section class="page-intro wrap">${eyebrow("SELECTED WORK")}<h1>Tools and workflows<br><em>I’ve built.</em></h1><p>Custom apps, reporting, research tools, and workflows. A selection of client, professional, and independent work.</p></section><section class="wrap featured-case"><div><div class="project-meta"><span>ENTEC ACCESS SYSTEMS</span><span>CLIENT WORK</span></div><h2>A sales workspace<br>for Entec’s owner.</h2><p>Entec’s owner needed to see customer activity across SimPRO, Xero, and Outlook so he could decide which accounts and inquiries needed attention.</p><div class="stat-inline"><span><b>15</b>person team</span><span><b>5</b>revenue channels</span><span><b>1</b>morning view</span></div>${link("/work/entec/", "Inside the Entec build", "button blue")}</div><a class="featured-case-image" href="/work/entec/"><img src="/assets/entec-sales-hub.webp" alt="Entec’s Sales Intelligence Hub, recreated with fictional names and figures." width="1600" height="900"><span class="hand">The owner’s actual working view.</span></a></section><section class="section wrap" id="catalog"><div class="section-heading"><div>${eyebrow("THE WIDER BODY OF WORK")}<h2>Browse the projects.</h2></div><p>Professional engagements are described without confidential firm or client detail.</p></div><div class="filter-bar" role="group" aria-label="Filter projects">${[
  ["all", "All work"],
  ["tools", "Tools & apps"],
  ["data", "Data & reporting"],
  ["workflow", "Automation"],
  ["team", "Team enablement"],
  ["lab", "Independent projects"],
]
  .map(
    ([id, n], i) =>
      `<button data-filter="${id}" aria-pressed="${i === 0}">${n}</button>`,
  )
  .join(
    "",
  )}</div><p class="filter-count" role="status">${projects.length} projects</p><div class="catalog-grid">${projects.map((p) => projectCard(p)).join("")}</div></section>${cta("Have something in mind<br>for your business?")}`;
const entec = `<section class="page-intro wrap"><a class="breadcrumb" href="/work/">Selected work / Entec Access Systems</a>${eyebrow("CUSTOM TOOLS · DATA · AUTOMATION")}<h1>A sales intelligence hub<br><em>for Entec.</em></h1><p>A sales intelligence hub built with the owner of Entec Access Systems, a 15-person UK services business.</p><div class="case-facts">${tag("SimPRO + Xero + Outlook")}${tag("Five revenue channels")}${tag("In daily use since July 2026")}</div></section><figure class="case-hero wrap"><button class="image-enlarge" data-enlarge><img src="/assets/entec-sales-hub.webp" alt="Entec’s Sales Intelligence Hub, recreated with fictional names and figures." width="1600" height="900"><span>Enlarge the working view ${arrow}</span></button><figcaption>Recreated with fictional names and figures; the layout is the real one.</figcaption></figure><section class="section wrap case-narrative"><div>${eyebrow("THE STARTING POINT")}<h2>Customer information<br>across separate systems.</h2></div><div><p>Entec provides doors and access systems to retail, healthcare, education, and public-sector customers. Jobs and quotes lived in SimPRO, finances in Xero, and customer conversations in Outlook.</p><p>The brief was straightforward: connect the commercial picture so the owner could keep track of key accounts, follow up inquiries, and develop the next revenue opportunities.</p></div></section><section class="tinted section"><div class="wrap"><div class="section-heading"><div>${eyebrow("WHAT GOT BUILT")}<h2>Key accounts, inquiries,<br>and follow-up.</h2></div><span class="hand">Click through the working parts.</span></div><div class="case-tabs" role="tablist" aria-label="Entec capabilities"><button role="tab" id="case-tab-accounts" data-case="accounts" aria-selected="true" aria-controls="case-panel">Key accounts</button><button role="tab" id="case-tab-inquiries" data-case="inquiries" aria-selected="false" aria-controls="case-panel" tabindex="-1">Inbound inquiries</button><button role="tab" id="case-tab-pipeline" data-case="pipeline" aria-selected="false" aria-controls="case-panel" tabindex="-1">Next opportunities</button></div><div id="case-panel" role="tabpanel" aria-labelledby="case-tab-accounts"></div></div></section><section class="section wrap case-narrative"><div>${eyebrow("BUILT WITH THE OWNER")}<h2>The rules got better<br>through use.</h2></div><div><p>We built the system over eight working sessions between June and August 2026, and the definitions changed as the owner used it.</p><p>Key accounts initially meant the top 20 by spend. Later, the system adopted Entec’s own Diamond and Gold customer tiers because the owner’s judgment captured strategic importance that spend alone missed.</p><p>Ordinary code handles the syncing, calculations, thresholds, and exact matching, while AI extracts inquiry details, summarizes correspondence, and assesses relevance. Anything AI suggests stays marked as a suggestion, so the owner can check it.</p></div></section><section class="full-quote wrap"><blockquote>“Working with David at Alpha Infra has been fantastic, on two fronts: the output has been great, and so has the experience. I can now track our top 35 customers in much more detail and depth, we understand the ROI on our Google advertising spend, and we have a custom-built CRM. It’s a great foundation for our sales motion, and I would highly recommend working with him.”</blockquote><p>William van der Byl · Owner, Entec Access Systems</p></section>${cta("What would a useful system<br>look like in your business?")}`;
const about = `<section class="about-hero wrap"><div>${eyebrow("DAVID BUNN · FOUNDER, ALPHA INFRA")}<h1>A business person<br>who <em>builds.</em></h1><p>I’ve spent more than a decade working with the numbers, processes, and decisions behind a business. Now I use AI and software to help other people make their work better.</p><p>You work directly with me throughout the project.</p><div class="credentials">${tag("Finance & operations")}${tag("Data & software")}${tag("Practical AI")}</div></div><div class="portrait-frame">${portrait}<span class="hand">David Bunn</span></div></section><section class="section wrap story-section"><div>${eyebrow("HOW I GOT HERE")}<h2>My background<br>in finance and operations.</h2></div><div class="prose"><p>I trained in audit at PwC in Johannesburg, then moved to San Francisco. That work taught me to follow a number back to its source, understand the system behind it, and ask whether the explanation held up.</p><p>At Major League Cricket, I helped build the finance function as an early hire and supported a Series A through fundraising due diligence. At Stockbridge, I owned revenue projections across more than 35 funds and built reporting for senior management.</p><p>I’ve also run two small product businesses on Amazon. I know what it feels like to be the person responsible for the work, the decisions, and the outcome.</p></div></section><section class="breakthrough-section"><div class="wrap story-section"><div>${eyebrow("THE MOMENT IT CLICKED")}<h2>“I could actually<br><em>build this.”</em></h2></div><div class="prose"><p>At Stockbridge, I spent about six months developing a Power BI dashboard that let management explore the financial and operating picture, with drill-downs into individual funds and their assets and accounts.</p><p>When I later tried building a similar interactive experience with AI, I had a useful first version within days. The production work still needed validation, controls, and testing. But the economics of trying an idea had changed.</p><p>The same thing happened with 25 years of macroeconomic and demographic data across 40+ major metros: the initial charts, analysis, and narrative came together in hours. I could get to the useful questions much sooner.</p><p>That’s what drew me into building full time. A good idea could become something real without the project it once would have required.</p></div></div></section><section class="section wrap"><div class="section-heading"><div>${eyebrow("THE EXPERIENCE I BRING")}<h2>Finance, operations,<br>and then the build.</h2></div></div><div class="experience-grid">${[
  [
    "2026 to now",
    "Alpha Infra",
    "Independent AI consulting and custom builds. Ongoing AI and technology consulting for Stockbridge.",
  ],
  [
    "2023 to 2026",
    "Stockbridge Capital Group",
    "Corporate finance, followed by the CTO’s data and innovation team. Reporting, models, research tools, and workflow automation.",
  ],
  [
    "2021 to 2023",
    "Major League Cricket",
    "Early finance hire. Forecasting, financial reporting, operating controls, and fundraising support.",
  ],
  [
    "2016 to 2021",
    "PwC",
    "Audit in Johannesburg and San Francisco. Learning to understand the business behind the numbers.",
  ],
]
  .map(
    ([date, name, text]) =>
      `<article><span class="eyebrow">${date}</span><h3>${name}</h3><p>${text}</p></article>`,
  )
  .join(
    "",
  )}</div><div class="credential-note">BIDA® Certified · California CPA (inactive) · CFA Program Level I completed · BCom Honours in Accounting Sciences</div></section><section class="approach-section"><div class="wrap approach-grid"><div>${eyebrow("A POINT OF VIEW")}<h2>Make the work easier.<br>Make new things possible.</h2></div><div><p>I’m interested in both. A good automation removes a frustrating task, while a custom tool can give the business a capability it couldn’t previously justify building; I call that second kind “Opportunity AI”, and it’s the work I find most interesting. I’m happy to start with the smaller improvement if that’s what you need.</p><p>The method is plain: understand the job, choose the right tools, test the result, and make sure it’s something people will use.</p></div></div></section>${cta("Tell me what you’re<br>trying to do.")}`;
const contact = `<section class="page-intro wrap">${eyebrow("LET’S TALK")}<h1>You don’t need a brief.<br><em>Just a starting point.</em></h1><p>An idea, a workflow that’s frustrating, a report you wish you had, or a question about AI. Tell me what’s on your mind.</p></section><section class="wrap contact-layout"><div class="contact-left"><div class="contact-person">${portrait}<div><h2>Talk directly with David.</h2><p>I’ll be the person on the call.</p></div></div><div class="booking-card">${eyebrow("START WITH A CONVERSATION")}<h3>A 30-minute discovery call.</h3><p>We’ll talk about what you’re trying to do, how it works today, and whether I can help.</p>${link(scheduler, "Choose a time", "button blue")}<span class="small-note">Free · 30 minutes · Video call</span></div><p class="email-option">Prefer email?<br><a href="mailto:david@alphainfra.us">david@alphainfra.us</a></p></div><div class="contact-form-area"><h2>Or put it in a few words.</h2><p>Tell me what you’re trying to do; I’ll reply within one business day.</p><form id="contact-form"><div class="form-row"><label>Your name<input name="name" autocomplete="name" required maxlength="120"></label><label>Your email<input name="email" type="email" autocomplete="email" required maxlength="200"></label></div><label>Company <span>(optional)</span><input name="company" autocomplete="organization" maxlength="180"></label><label>What’s on your mind?<select name="interest"><option value="explore">I’m exploring / not sure yet</option><option value="tried">We’ve tried AI and it hasn’t landed</option><option value="tool">Building a tool or app</option><option value="data">Data, reporting, or analysis</option><option value="workflow">Improving a workflow</option><option value="team">Helping my team use AI</option><option value="quick-win">A focused first build</option><option value="system">A larger custom build</option><option value="strategy">AI strategy / opportunity sprint</option><option value="ai-adoption">AI strategy, governance, and team adoption</option><option value="workshops">A team workshop</option><option value="care">Support for an existing build</option></select></label><label>Tell me a little about it<textarea name="message" rows="6" required maxlength="4000" placeholder="We currently… and I’d love to be able to…"></textarea></label><div class="form-actions"><button type="submit" class="button blue">Prepare an email ${arrow}</button><span>Opens a draft in your email app.<br>Nothing is sent automatically.</span></div><input type="text" name="_gotcha" tabindex="-1" autocomplete="off" aria-hidden="true" style="position:absolute;left:-10000px;width:1px;height:1px;opacity:0"><p class="form-note">Please keep sensitive business or personal information out of this first message. We can agree how to share it later.</p><div id="form-sent" hidden role="status"><p>Sent. I’ll reply within one business day. If it’s quicker to talk, <a href="${scheduler}">choose a time</a>.</p></div><div id="email-fallback" hidden><p>Your draft is ready. If your email app did not open, copy the message and email <a href="mailto:david@alphainfra.us">david@alphainfra.us</a>.</p><button type="button" id="copy-message" class="text-link">Copy message</button></div></form></div></section><section class="wrap small-faq section">${faq([faqs[0], faqs[9], faqs[5]])}</section>`;
const explore = `<section class="page-intro wrap compact-intro">${eyebrow("EXPLORE AN IDEA")}<h1>Start wherever<br><em>you are.</em></h1><p>This is a way to think through a starting point. Pick what feels closest, add a little context, and take the idea into a conversation.</p></section>${explorer}<section class="wrap exploration-note"><p>These are suggested directions, not an assessment of your business. A conversation will tell us much more.</p></section>${cta("Rather just talk it through?", "That works too. Bring whatever you have in mind.")}`;
const privacy = `<section class="page-intro wrap">${eyebrow("PRIVACY")}<h1>A plain-English note<br>on your information.</h1></section><section class="wrap prose legal-copy"><p>Alpha Infra LLC is a one-person consulting practice run by David Bunn. This is a short summary of how information is handled on this website. It is a general summary, not legal advice.</p><h2>This website</h2><p>The site is static and has no analytics, tracking pixels, or advertising. It is hosted on GitHub Pages, which keeps ordinary server logs (such as IP addresses and the pages requested) to run the service. The typefaces are served from this site, so no font service sees your visit. The idea explorer keeps your draft choices in your browser’s session storage on this site only; the reset control clears them, and nothing is sent anywhere.</p><h2>Contacting David</h2><p>The contact form sends what you type to Formspree, a form-handling service, which passes it to David by email and stores a copy for its own processing; Formspree’s own privacy policy applies to that handling. If that service is unavailable, the form falls back to preparing an email in your own email application instead. The booking link takes you to Cal.com, whose own privacy practices apply to anything you enter there.</p><h2>How information is used</h2><p>Information you send is used to reply to you and, if we work together, to deliver the engagement. Alpha Infra does not sell your information. Data handled during an engagement is covered by the agreement for that work and is documented for that engagement specifically, including any AI or automation providers involved.</p><h2>Questions</h2><p>Questions, or want your information removed? Email <a href="mailto:david@alphainfra.us">david@alphainfra.us</a>.</p></section>`;
const hermesAgents = [
  ["Scout", "Admin and operations agent", "Carries my household’s operational load: researches and shortlists travel, appointments, and renewals, then waits for my yes before it books or pays. Handles routine calls, triages its own inbox, and sends a daily sports briefing, with its own email address and Google Workspace.", ["Hermes Agent", "Google Workspace", "AgentMail"], ""],
  ["Heath", "Health agent", "My health coach. Pulls Glooko, WHOOP, and DEXA data into one picture, holds an actual point of view on what to do next, and gets in touch on its own when something’s worth acting on. It won’t touch insulin dosing (that stays with my endocrinologist), but it will build the evidence case for that conversation.", ["Hermes Agent", "WHOOP API", "Glooko"], "https://dbunn117.github.io/health-dashboard/"],
  ["Paula", "Parenting agent", "A parenting coach for our toddlers. It has opinions about what to try next, tracks whether it worked, and keeps a living playbook of scripts and activities that gets sharper as it learns what works for each kid individually.", ["Hermes Agent", "Obsidian", "Telegram"], ""],
];
const hermes = `<section class="page-intro wrap"><a class="breadcrumb" href="/work/">Selected work / Hermes</a>${eyebrow("INDEPENDENT PROJECT · CUSTOM AI AGENTS")}<h1>Three agents,<br><em>one pattern.</em></h1><p>Scout, Heath, and Paula each keep their own folder in my Obsidian vault: durable memory that gives them context, builds history, and lets them get sharper over time instead of starting from zero every conversation. Anything consequential comes back to me for approval first. It’s the same idea I bring to a business: a shared knowledge base that makes the whole system smarter the longer it runs.</p></section><section class="wrap work-section"><div class="catalog-grid">${hermesAgents
  .map(
    ([name, role, text, tools, href]) =>
      `<article class="project-card"><div class="project-card-content"><div class="project-meta"><span>${role}</span><span>INDEPENDENT PROJECT</span></div><h3>${name}</h3><p>${text}</p><p class="small-note">${tools.join(" · ")}</p>${href ? `<a class="text-link" href="${href}" target="_blank" rel="noopener noreferrer">See it running ${arrow}</a>` : ""}</div></article>`,
  )
  .join("")}</div></section>${cta("Want an agent like this<br>for your business?", "The same pattern, built around your information and your approvals.")}`;
const redirects = [
  ["/book/", "/contact/"],
  ["/services/coaching/", "/services/"],
];
const pages = [
  [
    "/",
    "AI consulting and custom builds for your business",
    "Independent AI consultant and builder David Bunn helps businesses with custom tools, reporting, automation, practical AI guidance, and team enablement.",
    home,
  ],
  [
    "/services/",
    "How I can help",
    "AI consulting, custom software, data and reporting, workflow automation, and practical support for your team.",
    services,
  ],
  [
    "/work/",
    "Selected work",
    "Explore working tools, reporting applications, and AI workflows built for commercial, finance, investment, and operational teams.",
    work,
  ],
  [
    "/work/entec/",
    "Entec Sales Intelligence Hub",
    "Inside a custom commercial system built with the owner of Entec Access Systems.",
    entec,
  ],
  [
    "/about/",
    "Meet David Bunn",
    "A decade in finance and operations, now applied to practical AI consulting and custom builds.",
    about,
  ],
  [
    "/contact/",
    "Talk to David",
    "Bring an idea, a business problem, or a question about AI. Book a conversation or prepare an email to David Bunn.",
    contact,
  ],
  [
    "/explore/",
    "Explore an idea",
    "Find a starting point for a custom tool, reporting improvement, workflow, or practical AI engagement.",
    explore,
  ],
  [
    "/hermes/",
    "Hermes: three personal AI agents",
    "Three personal agents sharing one pattern: durable memory, proactive outreach, and approval before anything consequential happens.",
    hermes,
  ],
  [
    "/privacy/",
    "Privacy",
    "How Alpha Infra handles the information you share.",
    privacy,
  ],
  ...offers.map((o) => [
    "/services/" + o.slug + "/",
    o.title || o.name,
    o.description || o.text,
    o.slug === "ai-adoption" ? adoptionPage(o) : offerPage(o),
  ]),
];
await mkdir(join(out, "assets"), { recursive: true });
await Promise.all(
  ["david-bunn.jpg", "entec-sales-hub.webp", "alpha-infra-logo.svg", "margin-note.svg", "mark.svg", "og.png", "market-scorecard.webp", "ai-resource-hub.webp"].map((f) =>
    copyFile(join(root, "assets", f), join(out, "assets", f)),
  ),
);
await cp(join(root, "assets", "fonts"), join(out, "assets", "fonts"), { recursive: true });
await Promise.all(
  ["styles.css", "app.js"].map((f) => copyFile(join(root, f), join(out, f))),
);
await writeFile(join(out, "projects.json"), JSON.stringify(projects, null, 2));
for (const [path, title, description, body] of pages) {
  const file = join(out, path, "index.html");
  await mkdir(dirname(file), { recursive: true });
  await writeFile(file, layout(title, description, path, body));
}
await writeFile(
  join(out, "404.html"),
  layout(
    "Page not found",
    "Find your way back to Alpha Infra.",
    "/404/",
    `<section class="page-intro wrap">${eyebrow("404")}<h1>Let’s find a<br>better starting point.</h1><p>That page doesn’t exist, or it has moved.</p>${link("/", "Back to the homepage", "button blue")}</section>`,
  ),
);
for (const [from, to] of redirects) {
  const file = join(out, from, "index.html");
  await mkdir(dirname(file), { recursive: true });
  await writeFile(
    file,
    `<!doctype html><html lang="en" data-redirect><head><meta charset="utf-8"><title>Redirecting · Alpha Infra</title><meta name="description" content="This page has moved."><meta name="robots" content="noindex"><link rel="canonical" href="${siteUrl}${to}"><meta http-equiv="refresh" content="0;url=${to}"></head><body><h1>This page has moved</h1><p><a href="${to}">Continue to ${siteUrl}${to}</a></p></body></html>`,
  );
}
await writeFile(
  join(out, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${pages
    .map(([path]) => `  <url><loc>${siteUrl}${path}</loc></url>`)
    .join("\n")}\n</urlset>\n`,
);
await writeFile(join(out, "robots.txt"), `User-agent: *\nAllow: /\nSitemap: ${siteUrl}/sitemap.xml\n`);
await writeFile(join(out, "CNAME"), "alphainfra.us\n");
console.log(`Built ${pages.length} pages in ${out}`);
