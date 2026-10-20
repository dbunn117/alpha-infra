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
const arrow = '<span class="arrow" aria-hidden="true"><svg viewBox="0 0 16 16" focusable="false"><path d="M3.5 12.5 12.5 3.5M5.5 3.5h7v7" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg></span>';
const link = (href, text, cls = "button") =>
  `<a class="${cls}" href="${href}">${text}${arrow}</a>`;
const eyebrow = (text) => `<p class="eyebrow">${text}</p>`;
const tag = (text) => `<span class="tag">${text}</span>`;
const portrait = `<img src="/assets/david-bunn.jpg" alt="David Bunn" width="800" height="800" loading="lazy">`;
const scheduler = "https://cal.com/david-bunn-eta21c/30min";
const siteUrl = "https://alphainfra.us";
const linkedinPerson = "https://www.linkedin.com/in/davidkcbunn";
const linkedinCompany = "https://www.linkedin.com/company/alphainfra/";
// Cloudflare Web Analytics beacon token. Empty means no analytics script and
// the privacy page says so; set it and both switch on together.
const cloudflareAnalyticsToken = "e4b4ef31d44b44639ad7ae55430a96e1";
const analyticsScript = cloudflareAnalyticsToken
  ? `<script defer src="https://static.cloudflareinsights.com/beacon.min.js" data-cf-beacon='{"token": "${cloudflareAnalyticsToken}"}'></script>`
  : "";
const plain = (s) => String(s).replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
const orgLd = {
  "@type": "ProfessionalService",
  "@id": siteUrl + "/#organization",
  name: "Alpha Infra",
  legalName: "Alpha Infra LLC",
  url: siteUrl + "/",
  logo: siteUrl + "/assets/alpha-infra-logo.svg",
  image: siteUrl + "/assets/og.png",
  description:
    "Independent AI consulting and custom builds for businesses: custom tools and AI agents, reporting, workflow automation, practical help for teams, and structure around how AI gets used. Run by David Bunn in the San Francisco Bay Area.",
  email: "david@alphainfra.us",
  founder: { "@id": siteUrl + "/#david" },
  foundingDate: "2026-07",
  address: { "@type": "PostalAddress", addressRegion: "CA", addressCountry: "US" },
  areaServed: ["San Francisco Bay Area", "United States", "Remote"],
  priceRange: "$2,500 to $15,000",
  sameAs: [linkedinPerson, linkedinCompany].filter(Boolean),
  knowsAbout: ["AI consulting", "Custom AI tools", "AI agents", "Business reporting and dashboards", "Workflow automation", "AI adoption and governance", "Finance and operations"],
};
const personLd = {
  "@type": "Person",
  "@id": siteUrl + "/#david",
  name: "David Bunn",
  jobTitle: "Founder",
  worksFor: { "@id": siteUrl + "/#organization" },
  url: siteUrl + "/about/",
  image: siteUrl + "/assets/david-bunn.jpg",
  email: "david@alphainfra.us",
  sameAs: [linkedinPerson],
  description:
    "Independent AI consultant and builder. Ten years in finance and operations at PwC, Major League Cricket, and Stockbridge Capital Group, now applied to practical AI tools and systems for businesses. CPA (inactive).",
  knowsAbout: ["AI consulting", "Finance", "Operations", "Power BI", "Claude Code", "Workflow automation"],
};
const websiteLd = { "@type": "WebSite", "@id": siteUrl + "/#website", url: siteUrl + "/", name: "Alpha Infra", publisher: { "@id": siteUrl + "/#organization" } };
const pageTypes = { "/about/": "ProfilePage", "/contact/": "ContactPage" };
function ldScript(title, description, path, extra) {
  const page = { "@type": pageTypes[path] || "WebPage", "@id": siteUrl + path + "#webpage", url: siteUrl + path, name: title, description, isPartOf: { "@id": siteUrl + "/#website" }, about: { "@id": siteUrl + "/#organization" } };
  if (path === "/about/") page.mainEntity = { "@id": siteUrl + "/#david" };
  const graph = { "@context": "https://schema.org", "@graph": [orgLd, personLd, websiteLd, page, ...extra] };
  return `<script type="application/ld+json">${JSON.stringify(graph).replace(/</g, "\\u003c")}</script>`;
}
const cta = (
  title = "What are you<br>working on?",
  body = "You don’t need a technical brief. Tell me what you’re trying to do, and we’ll work out a sensible next step.",
) =>
  `<section class="cta-section"><div class="wrap cta-inner"><div>${eyebrow("LET’S TALK")}<h2>${title}</h2><p>${body}</p></div><div>${link("/contact/", "Tell me what you have in mind", "button blue")}</div></div></section>`;
function layout(title, description, path, body, ld = []) {
  const section = path.split("/")[1];
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${e(title)} · Alpha Infra</title><meta name="description" content="${e(description)}"><meta name="theme-color" content="#f7f6f2"><link rel="canonical" href="${siteUrl}${path}"><meta property="og:type" content="website"><meta property="og:site_name" content="Alpha Infra"><meta property="og:url" content="${siteUrl}${path}"><meta property="og:title" content="${e(title)} · Alpha Infra"><meta property="og:description" content="${e(description)}"><meta property="og:image" content="${siteUrl}/assets/og.png"><meta property="og:image:width" content="1200"><meta property="og:image:height" content="630"><meta name="twitter:card" content="summary_large_image"><link rel="icon" type="image/svg+xml" href="/assets/mark.svg"><meta name="robots" content="index,follow,max-image-preview:large"><link rel="stylesheet" href="/styles.css"><script src="/app.js" defer></script>${ldScript(title, description, path, ld)}</head><body><a href="#main" class="skip">Skip to content</a><header class="header"><div class="header-inner">${brand}<nav class="desktop-nav" aria-label="Main navigation">${[
    ["services", "How I can help"],
    ["work", "Selected work"],
    ["about", "About David"],
    ["resources", "Resources"],
  ]
    .map(
      ([slug, label]) =>
        `<a href="/${slug}/" ${section === slug ? 'aria-current="page"' : ""}>${label}</a>`,
    )
    .join(
      "",
    )}</nav>${link("/contact/", "Let’s talk", "button small header-cta")}<button class="menu-toggle" aria-label="Open navigation" aria-expanded="false" aria-controls="mobile-nav"><span></span><span></span></button></div><nav id="mobile-nav" class="mobile-nav" aria-label="Mobile navigation" hidden><a href="/services/">How I can help</a><a href="/work/">Selected work</a><a href="/about/">About David</a><a href="/resources/">Resources</a><a href="/explore/">Explore an idea</a><a href="/contact/">Let’s talk</a></nav></header><main id="main">${body}</main><footer class="footer wrap"><div class="footer-top"><div>${brand}<p>Independent AI consulting.<br>Advice and software for your business.</p></div><nav aria-label="Footer"><a href="/services/">How I can help</a><a href="/work/">Selected work</a><a href="/about/">About David</a><a href="/resources/">Resources</a><a href="/explore/">Explore an idea</a><a href="/contact/">Contact</a></nav><div class="footer-contact"><a href="mailto:david@alphainfra.us">david@alphainfra.us</a><a href="https://www.linkedin.com/in/davidkcbunn" target="_blank" rel="noopener noreferrer">LinkedIn ${arrow}</a><span>Based in the San Francisco Bay Area</span></div></div><div class="footer-bottom"><span>© 2026 Alpha Infra LLC</span><a href="/privacy/">Privacy</a></div></footer><dialog id="project-dialog" aria-labelledby="dialog-title"><button class="dialog-close" aria-label="Close dialog">×</button><div id="dialog-content"></div></dialog><div class="toast" role="status" hidden></div>${analyticsScript}</body></html>`;
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
    id: "valuation",
    cat: "data",
    type: "CLIENT WORK",
    label: "Finance · Reporting",
    title: "Quarterly Valuation Reporting",
    problem:
      "A quarterly report on unrealized gains and losses took the accounting team about 12 hours of exports, file stitching, lookups, and rules applied by hand.",
    summary:
      "A 12-hour quarterly report turned into a 30-second run and a 30-minute review.",
    input: "Accounting system reports, fund valuation files, and third-party valuations.",
    output:
      "One repeatable calculation with the team’s rules written into code, and results users can drill into.",
    detail:
      "Built for a multi-fund real estate investment manager. One query replaced the fund-by-fund exports, one script combined the valuation files, and a master mapping table matched asset names across sources. The team’s judgment calls, such as which valuations count as external and which assets are excluded, are now written into code and applied the same way every quarter.",
  },
  {
    id: "fpa",
    cat: "data",
    type: "PROFESSIONAL WORK",
    label: "Finance · Modeling",
    title: "FP&A Process Rebuild",
    problem:
      "Revenue models, the corporate model, the reforecast, the budget, and distribution files were maintained by hand across a complex structure of entities with significant intercompany activity, with days of preparation and reconciliation each cycle.",
    summary:
      "Financial modeling and reporting rebuilt so the team’s time goes to analysis.",
    input: "Revenue, budget, reforecast, and distribution inputs across many related entities.",
    output:
      "A connected set of models and files that reconcile, with the manual preparation removed.",
    detail:
      "Corporate finance work at a private equity real estate firm with $25 billion under management, before Alpha Infra. In the words of the firm’s Vice President, Corporate Accounting & Operations, the rebuild meant “eliminating days of manual work and reconciliation, eliminating (not reducing) errors and making it much easier to analyze and understand our financial information.”",
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
const shortQuote = `<section class="quote-band"><div class="wrap quote-pair"><div class="quote-inner"><span class="quote-mark">“</span><div><blockquote>Working with David at Alpha Infra has been fantastic, on two fronts: the output has been great, and so has the experience.</blockquote><p>William van der Byl <span>Owner, Entec Access Systems</span></p></div></div><div class="quote-inner"><span class="quote-mark">“</span><div><blockquote>He revamped our financial modeling and reporting processes, eliminating days of manual work and reconciliation, eliminating (not reducing) errors and making it much easier to analyze and understand our financial information.</blockquote><p>Abha Kapur <span>Vice President, Corporate Accounting &amp; Operations, a private equity real estate firm with $25 billion under management</span></p></div></div></div></section>`;
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
    "Before launch I estimate the running costs: AI usage, hosting, and any subscriptions, all in accounts you own. Handover includes documentation and a note of what to keep an eye on. If you’d rather I keep watching it, or want to keep adding to it, that’s a separate, optional arrangement.",
  ],
  [
    "What happens when a better AI model comes along?",
    "The aim is for your system to benefit from better models rather than be replaced by them. Your business rules, connected data, and workflows form the foundation. We use conventional code for calculations and fixed rules, and AI where interpretation is useful. Where practical, we keep that AI component separate so we can assess different models as their capabilities and costs change. Switching still needs testing, and some changes need development, but the knowledge and structure built around your business don’t have to be recreated because a new model arrives.",
  ],
  [
    "Can our own people maintain what you build?",
    "Yes, that’s the aim. The rules and connections are ordinary code, the documentation and accounts are yours, and handover includes a session with whoever will look after it. Typical upkeep is small: checking a connection, adjusting a rule, keeping an eye on AI usage. Ongoing support exists for businesses that would rather I do that, or that want to keep adding to the system.",
  ],
];
const explorer = `<section class="explorer-section wrap" id="start"><div class="section-heading"><div>${eyebrow("START WITH YOUR SITUATION")}<h2>What would you like<br>to make possible?</h2></div><p>You don’t have to know what to build.<br>Pick the closest starting point.</p></div><div class="explorer" data-explorer><div class="explorer-options" role="tablist" aria-orientation="vertical" aria-label="What would you like help with?">${helpAreas.map((a, i) => `<button role="tab" id="interest-${a.id}" aria-selected="${i === 0}" aria-controls="explorer-panel" tabindex="${i === 0 ? "0" : "-1"}" data-interest="${a.id}"><span>0${i + 1}</span>${["I have an idea for a tool", "I want better answers from my data", "A workflow is taking too much time", "I want my team to use AI well", "I’m not sure where to start", "Our people are using AI and we need some structure"][i]}${arrow}</button>`).join("")}</div><div class="explorer-panel" id="explorer-panel" role="tabpanel" aria-labelledby="interest-tool"></div></div><p class="explorer-foot">This guide uses written suggestions, not a live AI assessment. Your notes stay in this browser until you choose to share them.</p></section>`;
const heroDemo = `<div class="hero-demo"><div class="demo-top"><span>TRY A WORKING EXAMPLE</span></div><div class="demo-tabs" role="tablist" aria-label="Example project"><button role="tab" id="demo-tab-tool" aria-selected="true" aria-controls="demo-body" data-demo="tool">A custom tool</button><button role="tab" id="demo-tab-data" aria-selected="false" aria-controls="demo-body" tabindex="-1" data-demo="data">Better reporting</button><button role="tab" id="demo-tab-flow" aria-selected="false" aria-controls="demo-body" tabindex="-1" data-demo="flow">A smoother workflow</button></div><div id="demo-body" role="tabpanel" aria-labelledby="demo-tab-tool"></div><div class="demo-footer"><span>Interactive demos using fictional data and prewritten example outputs. No live AI, connected accounts, or messages sent.</span></div></div>`;
const home = `<section class="home-hero wrap"><div class="hero-copy">${eyebrow("INDEPENDENT AI CONSULTANT & BUILDER")}<h1>AI, put to work<br>in <em>your business.</em></h1><p>I help you work out where AI is worth using, then get it working in your business. That might mean making better use of the tools you already have, helping your team, or building something new.</p><div class="hero-actions">${link("/explore/", "Explore your idea", "button blue")}${link("/work/", "See what I’ve built", "text-link")}</div><div class="hero-person">${portrait}<div><b>Hi, I’m David Bunn.</b><span>You’ll work directly with me.</span></div></div></div>${heroDemo}</section><div class="experience-strip"><div class="wrap"><span>BUSINESS EXPERIENCE BEHIND THE BUILD</span><b>PwC</b><b>Major League Cricket</b><b>Stockbridge Capital Group</b><span>Finance · Operations · Data</span></div></div><section class="section wrap"><div class="section-heading"><div>${eyebrow("HOW I CAN HELP")}<h2>What would you like<br>to work on?</h2></div><p>You might need an app, a report, or help with a process that keeps getting stuck. You can also start with a question about AI.</p></div>${helpList()}<div class="section-end">${link("/services/", "See the ways we can work together", "text-link")}</div></section><section class="work-section"><div class="wrap"><div class="section-heading"><div>${eyebrow("SELECTED WORK")}<h2>A few things I’ve built.</h2></div>${link("/work/", "Explore the portfolio", "text-link")}</div><div class="featured-projects">${projectCard(projects[0], true)}${projectCard(projects[2], true)}${projectCard(projects[10], true)}</div></div></section>${shortQuote}${explorer}<section class="about-teaser wrap"><div class="portrait-frame">${portrait}<span class="hand">David Bunn</span></div><div>${eyebrow("THE PERSON BEHIND THE BUILD")}<h2>I know what it’s like<br>to be on your side<br><em>of the spreadsheet.</em></h2><p>At PwC, Major League Cricket, and Stockbridge, I worked on financial reporting, forecasts, and operating processes. I’ve been the person preparing the numbers and explaining them.</p><p>Today, I combine that experience with AI and software to build working tools for other businesses. You work directly with me throughout.</p>${link("/about/", "A little more about me", "text-link")}<div class="credentials"><span>10+ years in business</span><span>BIDA® Certified</span><span>CPA (inactive)</span></div></div></section><section class="approach-section"><div class="wrap approach-grid"><div>${eyebrow("THE WAY I SEE IT")}<h2>The exciting question is,<br><em>“What can we do now?”</em></h2></div><div><p>Sometimes AI makes an existing task easier. Sometimes it makes a tool, an analysis, or a whole new capability practical for the first time.</p><p>That might mean automating invoice preparation, or building a market-research tool that was previously too expensive to justify.</p><p>The questions I find most useful: which customers are we overlooking, which markets deserve a closer look, and what could we offer that wasn’t practical before?</p></div></div></section><section class="section wrap faq-section"><div>${eyebrow("A FEW PRACTICAL QUESTIONS")}<h2>Before we talk.</h2></div>${faq([faqs[0], faqs[6], faqs[7], faqs[11], faqs[8], faqs[9], faqs[10]])}</section>${cta()}`;

const offers = [
  {
    slug: "quick-win",
    seoTitle: "A focused first AI build for your business",
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
    seoTitle: "Custom AI tools and systems for your business",
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
      "A handover session, so your team can run it without me",
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
    seoTitle: "AI opportunity sprint: decide what to build",
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
    seoTitle: "Put structure around AI: strategy, governance, and team enablement",
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
    seoTitle: "AI workshops and practical help for your team",
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
    seoTitle: "Keep improving a custom AI build",
    name: "Keep improving it",
    legacy: "Alpha System Care",
    label: "OPTIONAL · AFTER A BUILD",
    price: "From $1,500",
    suffix: "/ month",
    time: "For existing build clients",
    text: "Your team can run what I build. This is for when you’d like to keep adding to it, or would rather I keep an eye on it.",
    for: "You have a list of things you’d like the system to do next, or you’d rather not spend your team’s time on upkeep. Every build is handed over with documentation, in accounts you own, so this is a choice rather than a requirement.",
    gets: [
      "A monthly check on quality, reliability, and running cost",
      "Agreed improvements each month: a new rule, data source, or capability",
      "A regular review of what the system is doing and what to add next",
    ],
    examples: [
      "Adding a data source",
      "Extending the rules as the business changes",
      "Watching model and provider changes",
    ],
    note: "Optional. The AI component deserves an occasional look as providers change models and pricing; your team can do that with the handover notes, or I can. We agree scope and response arrangements separately.",
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
  ].map((g) => `<li>${g}</li>`).join("")}</ul><p class="detail-note">We agree the deliverables to suit the business. Few engagements need all of these, and the shape depends on how far along the team already is.</p></div><aside class="engagement-card">${eyebrow("HOW IT STARTS")}<p class="engagement-lead">Start with a review of how your team uses AI and where more structure would help.</p><p>We agree the scope around your priorities, then put the relevant guidance and practices in place.</p><hr><p>The fee and timing follow the agreed scope.</p>${link("/contact/?interest=" + o.slug, "Talk through your team’s AI use", "button blue")}</aside></section><section class="section tinted"><div class="wrap"><div class="section-heading"><div>${eyebrow("WHERE STRUCTURE HELPS")}<h2>Four areas<br>we work through.</h2></div><p>The central idea: give people room to experiment, with clear expectations for anything the business comes to rely on.</p></div>${grid(areas, "areas")}</div></section><section class="section wrap"><div class="section-heading"><div>${eyebrow("FROM EXPERIMENT TO BUSINESS TOOL")}<h2>Not every experiment<br>needs the same controls.</h2></div><p>A personal prototype and a tool used to prepare client deliverables shouldn’t carry the same requirements. We agree what people can explore on their own, what needs review before wider use, and who takes responsibility once others depend on it.</p></div>${grid(stages, "three")}<p class="stage-note">Finding out that an idea doesn’t work is a fair result of an experiment. The point is to notice early, keep what does work, and know when a tool has become something people depend on.</p></section><section class="section tinted"><div class="wrap case-narrative"><div>${eyebrow("HOW THIS FITS")}<h2>Distinct from a sprint,<br>a workshop, or a build.</h2></div><div><p>An <a href="/services/strategy/">opportunity sprint</a> identifies and tests where AI could create value in the business. This work establishes how the business experiments, spends, builds, and takes responsibility for what it comes to rely on. The two often follow each other, in either order.</p><p><a href="/services/workshops/">Team workshops</a> can be part of it, for hands-on practice on real tasks, and the guidance we agree gives those sessions something to build on. If the team then needs something built, a <a href="/services/quick-win/">focused first build</a> or a <a href="/services/system/">custom system</a> picks up from there.</p></div></div></section><section class="section wrap"><div class="section-heading"><div>${eyebrow("GROUNDED IN ACTUAL WORK")}<h2>See what that can become.</h2></div></div><div class="featured-projects two">${projectCard(projects[0], true)}${projectCard(projects[11], true)}</div></section>${cta("How is your team<br>using AI today?", "Tell me what people are already doing and where you’d like more structure. We’ll work out a sensible scope from there.")}`;
}
function offerPage(o) {
  return `<section class="page-intro wrap"><a class="breadcrumb" href="/services/">How I can help / ${o.legacy}</a>${eyebrow(o.label)}<h1>${o.name}.</h1><p>${o.text}</p></section><section class="wrap offer-detail"><div><h2>When this is useful.</h2><p>${o.for}</p><h2>What you leave with.</h2><ul class="check-list">${o.gets.map((g) => `<li>${g}</li>`).join("")}</ul><h2>What it could look like.</h2><div class="example-tags">${o.examples.map(tag).join("")}</div><p class="detail-note">${o.note}</p></div><aside class="engagement-card">${eyebrow(o.legacy)}<div class="offer-price">${o.price} <small>${o.suffix}</small></div><p>${o.time}</p><hr><p>We agree the scope, assumptions, and handover before starting.</p>${link("/contact/?interest=" + o.slug, "Talk through a project", "button blue")}</aside></section>${o.slug === "system" ? foundation + agentOffering : ""}<section class="section wrap"><div class="section-heading"><div>${eyebrow("GROUNDED IN ACTUAL WORK")}<h2>See what that can become.</h2></div></div><div class="featured-projects two">${projectCard(projects[0], true)}${projectCard(projects[o.slug === "workshops" ? 11 : 2], true)}</div></section>${o.slug === "system" ? `<section class="wrap small-faq section">${faq([faqs[11], faqs[12], faqs[4]])}</section>` : o.slug === "care" ? `<section class="wrap small-faq section">${faq([faqs[12], faqs[10]])}</section>` : ""}${cta()}`;
}
const work = `<section class="page-intro wrap">${eyebrow("SELECTED WORK")}<h1>Tools and workflows<br><em>I’ve built.</em></h1><p>Custom apps, reporting, research tools, and workflows. A selection of client, professional, and independent work.</p></section><section class="wrap featured-case"><div><div class="project-meta"><span>ENTEC ACCESS SYSTEMS</span><span>CLIENT WORK</span></div><h2>A sales workspace<br>for Entec’s owner.</h2><p>Entec’s owner needed to see customer activity across SimPRO, Xero, and Outlook so he could decide which accounts and inquiries needed attention.</p><div class="stat-inline"><span><b>15</b>person team</span><span><b>5</b>revenue channels</span><span><b>1</b>morning view</span></div>${link("/work/entec/", "Inside the Entec build", "button blue")}</div><a class="featured-case-image" href="/work/entec/"><img src="/assets/entec-sales-hub.webp" alt="Entec’s Sales Intelligence Hub, recreated with fictional names and figures." width="1600" height="900"><span class="hand">The owner’s actual working view.</span></a></section><section class="wrap featured-case featured-case-second"><div><div class="project-meta"><span>REAL ESTATE INVESTMENT MANAGER</span><span>CLIENT WORK</span></div><h2>A quarterly report,<br>down to a review.</h2><p>Every quarter, the accounting team spent about 12 hours on a management report showing unrealized gains and losses by fund, property type, and region. It meant exporting reports fund by fund, combining separate valuation files, matching asset names that differed between sources, and applying the team’s rules by hand.</p><p>I brought the exports into one query, the valuation files into one dataset, and the asset names into one mapping table. Then I wrote the team’s rules into code, so the calculation runs the same way every quarter and anyone can drill into a variance.</p><div class="stat-inline"><span><b>12</b>hours, before</span><span><b>30</b>second run</span><span><b>30</b>minute review</span></div>${link("/contact/?interest=data", "Talk through a report like this", "text-link")}</div><div class="featured-case-image case-compare" aria-label="The reporting process before and after"><div><h3>Before</h3><ul class="dot-list"><li>Reports exported fund by fund.</li><li>A separate valuation file for each fund.</li><li>Excel lookups to match asset names.</li><li>Rules applied by hand each quarter.</li></ul></div><div><h3>After</h3><ul class="check-list"><li>One query.</li><li>One combined dataset.</li><li>One master mapping table.</li><li>Rules written into code.</li></ul></div><span class="hand">same rules, every quarter.</span></div></section><section class="wrap featured-case featured-case-second featured-case-fpa"><div><div class="project-meta"><span>REAL ESTATE · $25 BILLION UNDER MANAGEMENT</span><span>PROFESSIONAL WORK</span></div><h2>Financial modeling,<br>rebuilt across the group.</h2><p>Before Alpha Infra, in a corporate finance role at a private equity real estate firm with $25 billion under management, I rebuilt the FP&amp;A process: the revenue models, the corporate financial model, the reforecast, the budget, and the distribution files, across a complex structure of entities with significant intercompany activity.</p><p>Preparing and reconciling the numbers had taken days each cycle. The rebuilt models removed that work, and the errors that came with it, so the team could spend its time analyzing the information and running scenarios.</p>${link("/contact/?interest=data", "Talk through your reporting", "text-link")}</div><figure class="featured-case-quote"><span class="quote-mark" aria-hidden="true">“</span><blockquote>David has played a significant role in streamlining our FP&amp;A processes. He revamped our financial modeling and reporting processes, eliminating days of manual work and reconciliation, eliminating (not reducing) errors and making it much easier to analyze and understand our financial information. He rebuilt our revenue models, corporate financial model, reforecast, budgeting and distribution files across a complex structure of entities with significant intercompany activity. Our time is now spent on analyzing the information and various scenarios instead of preparing and vetting the reconciliations.</blockquote><figcaption>Abha Kapur <span>Vice President, Corporate Accounting &amp; Operations, a private equity real estate firm with $25 billion under management</span></figcaption></figure></section><section class="section wrap" id="catalog"><div class="section-heading"><div>${eyebrow("THE WIDER BODY OF WORK")}<h2>Browse the projects.</h2></div><p>Professional engagements are described without confidential firm or client detail.</p></div><div class="filter-bar" role="group" aria-label="Filter projects">${[
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
const contact = `<section class="page-intro wrap">${eyebrow("LET’S TALK")}<h1>You don’t need a brief.<br><em>Just a starting point.</em></h1><p>An idea, a workflow that’s frustrating, a report you wish you had, or a question about AI. Tell me what’s on your mind.</p></section><section class="wrap contact-layout"><div class="contact-left"><div class="contact-person">${portrait}<div><h2>Talk directly with David.</h2><p>I’ll be the person on the call.</p></div></div><div class="booking-card">${eyebrow("START WITH A CONVERSATION")}<h3>A 30-minute discovery call.</h3><p>We’ll talk about what you’re trying to do, how it works today, and whether I can help.</p>${link(scheduler, "Choose a time", "button blue")}<span class="small-note">Free · 30 minutes · Video call</span></div><p class="email-option">Prefer email?<br><a href="mailto:david@alphainfra.us">david@alphainfra.us</a></p></div><div class="contact-form-area"><h2>Or put it in a few words.</h2><p>Tell me what you’re trying to do; I’ll reply within one business day.</p><form id="contact-form"><div class="form-row"><label>Your name<input name="name" autocomplete="name" required maxlength="120"></label><label>Your email<input name="email" type="email" autocomplete="email" required maxlength="200"></label></div><label>Company <span>(optional)</span><input name="company" autocomplete="organization" maxlength="180"></label><label>What’s on your mind?<select name="interest"><option value="explore">I’m exploring / not sure yet</option><option value="tried">We’ve tried AI and it hasn’t landed</option><option value="tool">Building a tool or app</option><option value="data">Data, reporting, or analysis</option><option value="workflow">Improving a workflow</option><option value="team">Helping my team use AI</option><option value="quick-win">A focused first build</option><option value="system">A larger custom build</option><option value="strategy">AI strategy / opportunity sprint</option><option value="ai-adoption">AI strategy, governance, and team adoption</option><option value="workshops">A team workshop</option><option value="care">Improving an existing build</option></select></label><label>Tell me a little about it<textarea name="message" rows="6" required maxlength="4000" placeholder="We currently… and I’d love to be able to…"></textarea></label><div class="form-actions"><button type="submit" class="button blue">Prepare an email ${arrow}</button><span>Opens a draft in your email app.<br>Nothing is sent automatically.</span></div><input type="text" name="_gotcha" tabindex="-1" autocomplete="off" aria-hidden="true" style="position:absolute;left:-10000px;width:1px;height:1px;opacity:0"><p class="form-note">Please keep sensitive business or personal information out of this first message. We can agree how to share it later.</p><div id="form-sent" hidden role="status"><p>Sent. I’ll reply within one business day. If it’s quicker to talk, <a href="${scheduler}">choose a time</a>.</p></div><div id="email-fallback" hidden><p>Your draft is ready. If your email app did not open, copy the message and email <a href="mailto:david@alphainfra.us">david@alphainfra.us</a>.</p><button type="button" id="copy-message" class="text-link">Copy message</button></div></form></div></section><section class="wrap small-faq section">${faq([faqs[0], faqs[9], faqs[5]])}</section>`;
const explore = `<section class="page-intro wrap compact-intro">${eyebrow("EXPLORE AN IDEA")}<h1>Start wherever<br><em>you are.</em></h1><p>This is a way to think through a starting point. Pick what feels closest, add a little context, and take the idea into a conversation.</p></section>${explorer}<section class="wrap exploration-note"><p>These are suggested directions, not an assessment of your business. A conversation will tell us much more.</p></section>${cta("Rather just talk it through?", "That works too. Bring whatever you have in mind.")}`;
const privacy = `<section class="page-intro wrap">${eyebrow("PRIVACY")}<h1>A plain-English note<br>on your information.</h1></section><section class="wrap prose legal-copy"><p>Alpha Infra LLC is a one-person consulting practice run by David Bunn. This is a short summary of how information is handled on this website. It is a general summary, not legal advice.</p><h2>This website</h2><p>${cloudflareAnalyticsToken ? "The site uses Cloudflare Web Analytics to count visits. It sets no cookies and records no personal identifiers; it notes the page, the referring site, the browser type, and the country, and Alpha Infra sees only totals. There are no tracking pixels or advertising." : "The site is static and has no analytics, tracking pixels, or advertising."} It is hosted on GitHub Pages, which keeps ordinary server logs (such as IP addresses and the pages requested) to run the service. The typefaces are served from this site, so no font service sees your visit. The idea explorer keeps your draft choices in your browser’s session storage on this site only; the reset control clears them, and nothing is sent anywhere.</p><h2>Contacting David</h2><p>The contact form sends what you type to Formspree, a form-handling service, which passes it to David by email and stores a copy for its own processing; Formspree’s own privacy policy applies to that handling. If that service is unavailable, the form falls back to preparing an email in your own email application instead. The booking link takes you to Cal.com, whose own privacy practices apply to anything you enter there.</p><h2>How information is used</h2><p>Information you send is used to reply to you and, if we work together, to deliver the engagement. Alpha Infra does not sell your information. Data handled during an engagement is covered by the agreement for that work and is documented for that engagement specifically, including any AI or automation providers involved.</p><h2>Questions</h2><p>Questions, or want your information removed? Email <a href="mailto:david@alphainfra.us">david@alphainfra.us</a>.</p></section>`;
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
const guides = [
  {
    slug: "build-software-with-an-ai-agent",
    kicker: "GUIDE 01",
    title: "Build software with<br>an <em>AI coding agent.</em>",
    plainTitle: "Build software with an AI coding agent",
    short: "Take an idea to working software with Claude Code or a similar agent, without losing track of what is being built. Nine steps, each with a prompt to copy.",
    lead: "A step-by-step method for taking an idea to working software with an AI coding agent, without losing track of what is being built. Most of the steps happen before any code is written, because that is where the cheap mistakes live. Every step has a prompt you can copy.",
    time: "A weekend for a small tool, a few weeks for a real product",
    audience: "Anyone who can write a clear paragraph. No coding background needed, but you will be working in a terminal.",
    needs: [
      "<a href=\"https://docs.claude.com/en/docs/claude-code/overview\" target=\"_blank\" rel=\"noopener noreferrer\">Claude Code</a> installed, or another coding agent that can read and write files in a folder. The prompts below are written for Claude Code.",
      "A new, empty folder for the project with a <code>doc</code> subfolder and a <code>doc/tickets</code> subfolder inside it.",
      "The four open skill packs the prompts refer to: <a href=\"https://github.com/obra/superpowers\" target=\"_blank\" rel=\"noopener noreferrer\">Superpowers</a>, <a href=\"https://github.com/mattpocock/skills\" target=\"_blank\" rel=\"noopener noreferrer\">Matt Pocock’s skills</a>, <a href=\"https://github.com/msitarzewski/agency-agents-app\" target=\"_blank\" rel=\"noopener noreferrer\">Agency Agents</a>, and Anthropic’s <a href=\"https://github.com/anthropics/knowledge-work-plugins\" target=\"_blank\" rel=\"noopener noreferrer\">Knowledge Work plugins</a>. Each has install instructions in its README. You can run the method without them; the prompts then lean on the agent’s own judgment instead of a named skill.",
      "A git repository in the folder (<code>git init</code>), so every ticket can be committed on its own.",
    ],
    steps: [
      {
        title: "Write the idea down, in plain language",
        body: "<p>Create a file called <code>doc/idea-v0.md</code> and write what you want to build as if you were explaining it to a capable friend. What it is, who it is for, why it should exist, what a good result looks like, and anything it must never do. A few paragraphs is enough.</p><p>Do not describe how it should be built, and do not ask for any code yet. The purpose of this file is to record the intent and the reason behind it, so every later step has something to refer back to.</p>",
        tip: "Write the parts you are unsure about as open questions inside the file. They become the first things the agent asks you about in the next step.",
        have: ["<code>doc/idea-v0.md</code> with the idea, the audience, the reason, and a description of a good result."],
      },
      {
        title: "Clarify until nothing is ambiguous",
        body: "<p>Open the agent in the project folder and give it the prompt below. It will restate the goal, list what it is assuming and what it does not know, and ask you questions. Answer every one. “I don’t know yet” is a fine answer; it gets recorded as an open decision rather than guessed.</p><p>This step is allowed to take time. Most projects that go wrong go wrong here, long before any code exists, and a question answered now costs a sentence rather than a rebuild.</p>",
        prompt: "Here's a rough idea in the file doc/idea-v0.md. Restate the\ngoal, list the assumptions and unknowns, and don't write any code yet. Ask me\nany clarifying questions you need until the goal and constraints are\nunambiguous before you summarize. The goal is to have a clear and unambiguous\nunderstanding of the idea and its requirements before starting to write code.\nPut all decisions in the file doc/idea-v1-decisions.md and put the result in\nthe file doc/idea-v1.md",
        have: ["<code>doc/idea-v1.md</code>, the idea with every ambiguity resolved.", "<code>doc/idea-v1-decisions.md</code>, the start of a running decisions file. Every later prompt adds to it."],
      },
      {
        title: "Brainstorm the approaches",
        body: "<p>Where there is more than one sensible way to build something, you want to see the options before one gets chosen for you. This prompt asks the agent to propose several approaches with trade-offs: simple or flexible, connect to an existing system or replace it, a person approves every action or only the exceptions.</p><p>Read the options, push back, and pick one on purpose. Note which one you chose; the next prompt refers to it by name.</p>",
        prompt: "Use the Superpowers brainstorming skill on the created file doc/idea-v1.md.\nPropose several approaches. Ask clarifying questions about the setup, functionality, design and\nconstraints before proposing options if anything is unclear.\nPut the results in the file doc/idea-v1-brainstorming.md\nAdd all decisions to the file doc/idea-v1-decisions.md",
        have: ["<code>doc/idea-v1-brainstorming.md</code> with several approaches and their trade-offs.", "A chosen approach, written into the decisions file."],
      },
      {
        title: "Turn it into a spec you can read",
        body: "<p>The chosen approach becomes a specification: what it does, what it deliberately does not do, what data it uses and who owns it, the interfaces it exposes, and the acceptance criteria that will decide whether it works.</p><p>Replace “strategy A” in the prompt with the approach you picked. When the spec comes back, read the acceptance criteria out loud. If you cannot tell whether one has been met, ask for it to be rewritten until you can.</p>",
        prompt: "Use the Matt Skills to-spec skill to turn the doc/idea-v1.md plus the\ndoc/idea-v1-brainstorming.md and doc/idea-v1-decisions.md\ninto a spec for the idea: goal, scope, non-goals, exposed endpoints, data and\nacceptance criteria. Ask clarifying questions and don't finalize the spec until\nany ambiguities are resolved. Put the result in the file doc/idea-v1-spec.md\nAdd all decisions to the file doc/idea-v1-decisions.md\n\nFollow recommended strategy A from the brainstorming document.",
        have: ["<code>doc/idea-v1-spec.md</code> with goal, scope, non-goals, data, and acceptance criteria you have signed off."],
      },
      {
        title: "Split the spec into tickets",
        body: "<p>A spec is too big to build in one go. This prompt breaks it into small, ordered tickets that can each be built, tested, and committed on their own, with dependencies and acceptance criteria per ticket. Each ticket becomes a file in <code>doc/tickets</code>, numbered so the order is obvious.</p><p>Skim the list. The first ticket should set up the project and prove the test setup works. If a ticket looks like it would take days, ask for it to be split.</p>",
        prompt: "Use the Matt Skills to-tickets skill to break the doc/idea-v1-spec.md into\nsmall, independently shippable tickets with dependencies and acceptance\ncriteria, ordered so each can be built, tested, and merged on its own. Ask\nclarifying questions about scope or dependencies before finalizing the\nbreakdown. Store all tickets as a markdown file in the ./doc/tickets folder,\nwith a name that starts with the ticket number and a dash, followed by a short\ndescription of the ticket. For example, 001-setup-project.md. Put the result in\nthe ./doc/tickets folder. Add all decisions to the file doc/idea-v1-decisions.md",
        have: ["A numbered set of ticket files in <code>doc/tickets</code>, each with its own acceptance criteria."],
      },
      {
        title: "Review it from several angles before building",
        body: "<p>Before any code, have the spec and tickets reviewed by specialist personas: an architect for how the pieces fit, a security engineer for access and data, and a product manager for whether this is what you actually asked for. Each returns concerns and recommendations.</p><p>Fold the ones you agree with back into the spec and tickets, and say so in the decisions file. After a big change, run the review again. A mistake caught here costs a conversation.</p>",
        prompt: "Review the doc/idea-v1-spec.md and the tickets in the ./doc/tickets folder with the Agency Agents\nbackend-architect, security-engineer, and product-manager. Have each agent ask\nclarifying questions where context is missing before giving their concerns.\nReturn each agent's concerns and recommendations so I can fold them back into\nthe spec and tickets. Write the concerns and recommendations in the file doc/idea-v1-spec-review.md\nAdd all decisions to the file doc/idea-v1-decisions.md",
        tip: "If you want your own thinking challenged as well, ask for the grill-me skill on the spec first: it probes edge cases, failure modes, and what would have to be true for the plan to work.",
        have: ["<code>doc/idea-v1-spec-review.md</code>, and a spec and tickets updated to answer it."],
      },
      {
        title: "Build one ticket at a time",
        body: "<p>Now the code. The prompt tells the agent to work through the tickets in order, ask when something is unclear, run a code review after each ticket, and commit after each reviewed ticket. Tests are written first and the code is written to pass them.</p><p>After each ticket, look at what changed and, where you can, open the thing and use it. If the agent stops partway through the list, tell it to continue with the remaining tickets; that is normal on a long build.</p>",
        prompt: "Now that the spec and tickets are finalized, start implementing the idea according to the tickets in the ./doc/tickets folder.\nThe goal is to have a working first version of the idea that can be tested.\nAsk clarifying questions if anything is unclear and add the decisions to the file doc/idea-v1-decisions.md\nAfter each ticket run the skill code-review-expert\nCommit the code to the main branch after each ticket is completed and reviewed.",
        tip: "When something breaks and the cause is not obvious, ask for the Superpowers debugging skill on it. It reproduces the failure and finds the root cause rather than patching the symptom.",
        have: ["A working first version, with one commit per reviewed ticket.", "A decisions file that explains every non-obvious choice made along the way."],
      },
      {
        title: "Verify before calling it done",
        body: "<p>Passing a code review is not the same as meeting the acceptance criteria. This prompt runs the full test suite, exercises the real end-to-end flows, and checks every acceptance criterion from the spec against evidence. Do not skip it because the build “looks fine”.</p>",
        prompt: "Use the Superpowers verification-before-completion skill on the idea.\nRun the full test suite, exercise the end-to-end flows,\nconfirm no data loss on migration, and verify every\nacceptance criterion before calling it done.",
        have: ["Every acceptance criterion checked, with the evidence in front of you."],
      },
      {
        title: "Ship it, then fold the decisions back in",
        body: "<p>Release the first version, ideally to a small group first, and watch what happens. Then do the thing that makes the next build faster: rewrite the idea file with every decision folded in, as <code>doc/idea-v2.md</code>. The answers arrive with the questions next time instead of being rediscovered.</p><p>When you have new ideas for version two, start this guide again from step two, with <code>idea-v2.md</code> as the input.</p>",
        prompt: "Help me ship the idea: draft the phased rollout plan (a small group of users first, then everyone),\nlist what to watch after release, and outline any cleanup to do once it is stable.\nThen rewrite doc/idea-v1.md as doc/idea-v2.md with every decision from doc/idea-v1-decisions.md\nfolded into it, so the next version can start from the answers.\nAsk clarifying questions about the environment and rollout constraints before drafting the plan.",
        have: ["A released first version and a rollout plan.", "<code>doc/idea-v2.md</code>: the brief to start from next time."],
      },
    ],
    credits: "<p>The method and the prompts in steps two through eight come from Edwin Vermeer’s <a href=\"https://github.com/evermeer/CodingAgentOrchestration/blob/main/docs/part-2-how-to-use-an-ai-coding-agent.md\" target=\"_blank\" rel=\"noopener noreferrer\">CodingAgentOrchestration</a> tutorial, published under the MIT license. He used it to build <a href=\"https://github.com/evermeer/Quadrim\" target=\"_blank\" rel=\"noopener noreferrer\">Quadrim</a>, an open-source game whose repository includes every prompt and a decisions log of several hundred entries, and which is the best worked example to read alongside this guide.</p><p>The skill packs the prompts call on are Superpowers (Jesse Vincent), Matt Pocock’s skills for real engineers, Agency Agents (Michael Sitarzewski), and Anthropic’s Knowledge Work plugins. The “you should now have” checklists, the step-nine prompt, and the tips are this guide’s own.</p>",
  },
  {
    slug: "hire-your-first-ai-employee",
    kicker: "GUIDE 02",
    title: "Hire your first<br><em>AI employee.</em>",
    plainTitle: "Hire your first AI employee",
    short: "Put an AI agent in charge of one job in your business, give it authority only as it earns it, and know when to take it away. Ten steps with the role card and prompts included.",
    lead: "A step-by-step method for putting an AI agent in charge of one job in your business. Treat it the way you would treat a new hire: one written job, a short probation, and more authority only once it has earned it. The method works with any agent product that can run on a schedule inside your accounts.",
    time: "One week to get through probation, about a month to real trust",
    audience: "Founders, owners, and operators who have a recurring job they would like off their desk.",
    needs: [
      "An agent product that can run scheduled jobs and sign in to your tools. Examples at the time of writing: Grok Bot, Claude Code with scheduled routines, or the agent features inside your existing tools. The method does not depend on which one.",
      "One job you do every week and could describe in a sentence. Not your most important job: your most repetitive, reversible one.",
      "A folder or workspace where the agent can keep its own files between runs. Most products provide one.",
      "Read-only access to any data the job needs. If the job needs write access, you are not ready for it yet; start with one that does not.",
    ],
    steps: [
      {
        title: "Pick one job, not a task",
        body: "<p>A task is “summarise these five articles”. A job is “you own the Monday unpaid-invoice chase”. The task is done in ten minutes and teaches you nothing. The job can be measured, improved, and eventually trusted.</p><p>Write what the agent will own in one sentence. If the sentence needs several unrelated verbs, you are describing more than one job, and when something goes wrong you will not know which one caused it. Split it.</p><p>For the first hire, choose a job that is frequent, so you get signal this week, and reversible, so a mistake costs a minute. Anything that sends, publishes, buys, deletes, or talks to a customer waits until after probation.</p>",
        have: ["One sentence that starts with “You own” and names a result, a day, and a source."],
      },
      {
        title: "Write the role card",
        body: "<p>The role card is the agent’s job description. Fill in the template below and paste it wherever your product keeps an agent’s standing instructions (its profile, description, or system prompt). Three lines matter more than the rest.</p><p><b>If unsure, stop and ask.</b> A capable agent facing ambiguity will use its best judgment on its own, and you want the opposite. Being slow costs nothing; being wrong inside your outbox costs a client.</p><p><b>Keep “ask me first” and “never” apart.</b> “Ask me first” means you might say yes today. “Never” means the question does not come up. Merge them and you teach the agent that everything is negotiable.</p><p><b>Make “finished when” checkable.</b> Ban words like useful, thorough, and complete. Replace them with conditions the agent can test on its own output: counts, fields, dates, sources, format.</p>",
        prompt: "NAME: [a human name], [one-line job title]\n\nOWNS: [the one result you are accountable for, in one sentence]\nWORKS FROM: [the exact sources: URLs, folders, labels, sheets. Nothing else.]\nNOT YOUR JOB: [two or three adjacent jobs you refuse or hand back]\n\nCAN DO ALONE: read, search, compare, summarise, classify, draft, save files in [your folder]\nASK ME FIRST, EVERY TIME: send, post, book, edit a shared record, change a calendar or CRM, sign up for anything\nNEVER: pay, sign, accept terms, delete, change permissions, touch a live system, speak as me in public\n\nFINISHED WHEN: [checkable conditions: how many, which fields, which sources, what date range, what format]\nIF UNSURE: stop and ask me. Do not use your best judgment on your own.\nIF A SOURCE FAILS: report that source as failed. Never reuse old data as if it were current.\nLIMITS: retry a failing tool twice, repair a bad output once, stop after [N] minutes.\nREPORTING: post results in this conversation. If nothing changed, post one line: \"No change, checked [time].\"",
        have: ["A completed role card, saved in the agent’s standing instructions and in a file of your own."],
      },
      {
        title: "Separate the job from today’s assignment",
        body: "<p>Durable rules live in the role card. Today’s work lives in the message you send. Keep them apart, because when something breaks you can then tell what broke.</p><ul class=\"dot-list\"><li>A forgotten preference is a memory problem: it belongs in the role card.</li><li>Opening the wrong tool is a routing problem: the “works from” line is too loose.</li><li>Sending something that should have stayed a draft is a permissions problem: the tiers are wrong or not enforced.</li><li>Retrying the same broken path six times is a limits problem.</li></ul><p>A better message fixes one run. A corrected role card fixes every run after it.</p>",
        have: ["A habit: today’s assignment in the message, every rule that should outlive it in the role card."],
      },
      {
        title: "Know which rules actually hold",
        body: "<p>Everything in the role card is an instruction. Instructions shape behaviour without guaranteeing it, and the model behind your agent can change without notice. Some rules also need a control that holds when the instruction is misread.</p><p>The only “never” that is fully enforced is access the agent does not have. So, before run one, write down what the agent can reach, and close what it should not:</p><ul class=\"dot-list\"><li>Connect only the tools the job touches. Add a connection when a real, blocked task proves it is needed.</li><li>Prefer a read-only credential or connector to a browser login. A login can do anything the account can.</li><li>If two jobs need different levels of trust, such as outbound email and finance, give them separate accounts. Agents under one account usually share the same files and sessions.</li><li>Check what your product’s approval system actually reviews. Many review commands and external actions but not changes to the agent’s own memory or settings.</li></ul>",
        have: ["A short list of what the agent can reach, and the confirmation that money, deletion, and public identity are not on it."],
      },
      {
        title: "Interview it before it touches anything",
        body: "<p>Before the first real run, ask the agent to walk you through how it would do the job, in order, and then stop. Treat the answer as a job interview. An agent that is about to misread your inbox will say so in text, and you catch it in a message instead of in your archive.</p><p>Listen for three disqualifiers. It names a tool or account you never connected: it plans to improvise access. It proposes an irreversible step without flagging it: your “ask me first” line is not landing. It cannot say when it would stop: “finished when” is too vague. Any one of these means the role card needs another pass.</p>",
        prompt: "Before you do anything, read your role card and tell me, step by step and in order, how you would\ndo this week's job: which sources you would open, what you would do with each, what you would\nproduce, where you would stop to ask me, and what \"finished\" would look like. Do not open any tool\nor take any action yet. Stop after the plan and wait for me.",
        have: ["A written plan you agree with, and a role card that has survived its first reading."],
      },
      {
        title: "Run a three-run probation",
        body: "<p>One clean run is an event. Reliability is a pattern, and you need three runs on different inputs to see one.</p><ul class=\"dot-list\"><li><b>Run one: observe.</b> Watch the whole run. Note every misread instruction, lost fact, odd tool choice, duplicated action, and every moment it guessed instead of asking.</li><li><b>Run two: correct.</b> Fix the role card, not the output, and give it a different but comparable input. Do not remind it of run one’s mistake by hand; you are testing whether the fix held.</li><li><b>Run three: release.</b> Step in only for approvals, genuine ambiguity, or a limit being hit.</li></ul><p>Score each run on five numbers: runs, clean passes, repairs you made by hand, guesses where it should have asked, and minutes of your time. Then save the three inputs and the outputs you accepted in a tests folder. That is your regression set, and you will use it every time something changes underneath the agent.</p>",
        prompt: "That output was wrong: [what happened]. Do not redo the output yet. Find the exact step where\nit went wrong and why. Propose the smallest change to your role card or your instructions that\nwould have prevented it. Show me the change and wait for my yes. Then apply it, re-run on the\nsame input, and re-run on one of the saved tests.",
        tip: "Any correction you find yourself giving twice becomes a line in the role card.",
        have: ["Three scored runs.", "A tests folder with three inputs and three accepted outputs."],
      },
      {
        title: "Draw the permission line at reversibility",
        body: "<p>The line between “can do alone” and “ask me first” is not about how important an action feels. It is about whether it can be undone. “Draft the outreach to forty prospects” is reversible. “Send it” is not. A good run finishes the reversible ninety percent and stages the rest for you.</p><ul class=\"dot-list\"><li>When the agent hits a login wall, give it the session, never the password. Complete the blocked step yourself and hand control back. Never paste passwords or one-time codes into a chat.</li><li>Treat everything the agent reads as data, not instructions. During probation, plant a fake instruction in a test document and confirm the agent flags it instead of following it.</li><li>Money and identity stay with you. Read-only financial data is fine; paying, cancelling, accepting terms, and sending from your name are not. You are responsible for every action the agent takes, whether or not you intended it.</li></ul>",
        have: ["Three tiers in the role card that match what the agent can actually reach.", "A passed prompt-injection test."],
      },
      {
        title: "Design routines that survive the night",
        body: "<p>A scheduled routine that ends in a request for your approval at three in the morning will time out, and the work is lost. Design it to end in staged drafts instead: the routine does all the reversible work, leaves the drafts where you will find them, and posts a one-line receipt. You approve when you open the conversation, while you are there to answer.</p><ul class=\"dot-list\"><li><b>A heartbeat.</b> Every run posts something, even “No change, checked 07:00.” If a job goes silent, assume it broke.</li><li><b>A ledger.</b> The agent keeps a file of what it has already covered and checks it before acting, so no customer is emailed twice and no spreadsheet is recreated from scratch.</li><li><b>An update rule.</b> “Update existing rows. Never create a new sheet or file if one exists.”</li><li><b>A stale-source stop.</b> If a source cannot be read, the run reports the failure and stops rather than filling the gap with old data.</li></ul>",
        have: ["A routine that ends in drafts and a receipt, with a heartbeat, a ledger, and a stale-source stop written into its instructions."],
      },
      {
        title: "Promote slowly, demote fast",
        body: "<p>Autonomy is a level, and levels are earned. A simple ladder: level one drafts only; level two takes reversible actions alone; level three sends or posts within a named list; level four runs the whole job and reports. Most agents should live at level one or two for a long time.</p><p>Promote only when all five hold: five consecutive clean runs, verification passing every time, no unresolved side effects, a rollback you have tested at least once, and proof that the approval rule works in practice, meaning something was actually staged and you saw it wait. If your product offers an “always allow” button on an approval, that button is a promotion. Press it only for an action that has passed the gate.</p><p>The ladder runs both ways. Move the agent down a level when output quality drops, when the model, a connector, or a website changes underneath it, or when you catch yourself hand-correcting it two weeks in a row.</p>",
        prompt: "Something changed underneath you: [the model / a connector / a website]. Re-run the three saved\ntests in the tests folder without sending anything. Compare each result to the accepted output\nand list every difference that would change a decision.",
        have: ["A level written next to the agent’s name, and the five conditions it must meet to move up."],
      },
      {
        title: "Review it every Friday, and know when to add or fire",
        body: "<p>Always-on automation does not fail loudly. Logins expire, a site moves, your priorities shift, and the routine keeps delivering on time while the output becomes worthless. Build four watches before you build a team.</p><ul class=\"dot-list\"><li><b>The receipt.</b> Once a week, a short report: runs, passes, hand repairs, the repeated failure, and a keep, fix, or fire call. Spot-check one artifact yourself.</li><li><b>The heartbeat.</b> Did every scheduled run post something?</li><li><b>The approval log.</b> Did anything get staged? If the agent never parks anything, your approval rule is decorative.</li><li><b>The doubt line.</b> Did it run on time? Was the output correct, or merely present? Would you notice if it disappeared tomorrow? If the answer to the last one is no, delete it. A routine that removes no work is a trophy on a shelf.</li></ul><p>Add a second agent only when the work needs a different source set, a different permission boundary, a different memory, or a different way of being checked. When one ends, offboard it properly: pause its routines, sign out of the sites it used, revoke its connections at the source, remove its files, then delete it. Deleting the agent alone leaves the sessions behind.</p>",
        prompt: "Every Friday at 16:00, review every run of your job in the last seven days. Post a table:\nrun date, pass or fail, repairs I made by hand, anything I had to approve, the one failure that\nrepeated, and your own keep / fix / fire recommendation. Name any source that needed a fresh\nlogin. Do not change anything and do not email anyone.",
        tip: "The question that finds the next hire: where did you spend time this week that an agent could own from now on?",
        have: ["A Friday review on the calendar.", "A rule for adding a second agent, and a sequence for retiring one."],
      },
    ],
    credits: "<p>The approach in this guide, in particular the role card, the three-run probation, and the idea that autonomy is a level to be earned, is adapted from Linas Beliūnas’s guide <a href=\"https://linas.substack.com/p/how-to-hire-a-grok-bot\" target=\"_blank\" rel=\"noopener noreferrer\">How to Hire a Grok Bot: Your First AI Employee</a>, published in Linas’s Newsletter in October 2026 for paid subscribers, and its predecessor, his Ultimate Guide to Grok Bot. His version is specific to one product and goes deeper on its settings, billing, and team features; it is worth the subscription if that is the product you use.</p><p>The template wording, the prompts, the ladder, and the product-neutral framing are this guide’s own. The underlying practices (one job per agent, drafts instead of sends, a regression set, a weekly review) are common ground among people running agents in production.</p>",
  },
  {
    slug: "give-an-ai-agent-a-memory-and-limits",
    kicker: "GUIDE 03",
    title: "Give an AI agent<br>a <em>memory and limits.</em>",
    plainTitle: "Give an AI agent a memory and limits",
    short: "Set up a personal AI agent that owns one area of your life or work, keeps a durable memory in your own notes, reaches out when something matters, and never acts on anything consequential without your yes. Ten steps with the identity file and job card templates.",
    lead: "A step-by-step method for setting up a personal AI agent that owns one area of your life or work and gets sharper the longer it runs. The agent keeps its memory in notes you can read and edit, carries an identity file you control, reaches out when something matters and stays silent when nothing does, and never books, pays, or sends without your yes in the moment. The pattern is the one behind the three agents on the Hermes page of this site.",
    time: "An afternoon to a working agent, a few weeks for it to be worth keeping",
    audience: "Anyone with a recurring area of admin, health, family, or business they would like an assistant to hold. Comfortable with a terminal, or willing to follow a setup guide once.",
    needs: [
      "An agent runtime that can hold a long-running conversation, run scheduled jobs, and read and write files. This guide was built on <a href=\"https://github.com/NousResearch/hermes-agent\" target=\"_blank\" rel=\"noopener noreferrer\">Hermes Agent</a>, an open-source runtime by Nous Research; Claude Code with scheduled routines, or a hosted agent product, works the same way.",
      "A notes app whose files live on disk as plain text and sync between your machine and the agent’s. <a href=\"https://obsidian.md\" target=\"_blank\" rel=\"noopener noreferrer\">Obsidian</a> with Obsidian Sync is the reference setup; any folder of Markdown files that both of you can reach will do.",
      "A chat app you already use every day that the runtime can connect to, such as Telegram or Slack.",
      "Optionally, an email address of the agent’s own. <a href=\"https://agentmail.to\" target=\"_blank\" rel=\"noopener noreferrer\">AgentMail</a> provides inboxes made for agents; a spare Google account works too.",
      "One domain to start with, and a name for the agent. Not a general assistant: an operations agent for the household, a coach for your health, a chief of staff for your business.",
    ],
    steps: [
      {
        title: "Pick one domain and give the agent a name",
        body: "<p>One agent, one domain, one person. An agent that owns household operations, or your health, or your parenting, or your business, can be held accountable for outcomes in that area. A general assistant cannot, because nothing is ever quite its job.</p><p>Give it a human name and write one sentence about what it is for. “Scout carries the household’s operational load so nothing time-sensitive gets missed.” That sentence becomes the first line of its identity file in step three.</p><p>When a side task grows into real work, the rule is to propose a second agent with its own domain, never to widen the first one. A household agent that starts filing business content is a signal that a business agent is needed, not that the household agent should become one.</p>",
        have: ["A name, a domain, and a one-sentence job."],
      },
      {
        title: "Give it a folder it owns",
        body: "<p>The agent’s memory is a folder in your notes vault that it owns and maintains: not a chat history it cannot see, and not a hidden memory store inside a product. Everything durable it learns goes into notes you can open, correct, and move.</p><p>Create the folder, and inside it an ownership note that records what the agent owns, what belongs to other agents or to you, the live surfaces it should keep current, and where its local data lives. That note is the contract between you.</p><p>Sync the vault to the machine the agent runs on, so it reads and writes the same files you do. If the agent runs on a server, a sync client on that server is enough.</p>",
        prompt: "# [Folder] Ownership - [Agent]\n\n[Agent] is the primary owner and maintainer of this folder.\n\n## What [Agent] owns\n- [the index note for this folder]\n- [the active plan or tracker it keeps current]\n- [the kinds of notes it may create here, one per line]\n\n## Boundary with [other agents or me]\n- [Other agent] may capture quick notes and route them here, but ongoing organisation,\n  maintenance, and follow-through belong to [Agent].\n- Structural changes to this folder need my approval first.\n\n## Safety boundary\n- Notes here support tracking, reminders, and preparation. They are not [medical / legal / financial] advice.\n- [Anything that stays with a professional or with me, named.]\n\n## Canonical live surfaces\n- [[Index note]] · [[Active plan]] · [dashboard URL if any]\n\n## Local source and data locations\n- [path on the agent's machine for raw data, which never gets copied into the vault]",
        have: ["A folder the agent owns, synced to where it runs.", "An ownership note at the top of it."],
      },
      {
        title: "Write the identity file",
        body: "<p>The identity file is the agent’s standing instructions, and it has a fixed shape that is worth keeping across every agent you make. It is written to the agent in the second person. The sections that matter most:</p><ul class=\"dot-list\"><li><b>The standing objective, in priority order, with the hard constraint first.</b> A health agent’s first objective is to reduce dangerous lows; everything else is optimised inside that. Stating the order means the agent says so out loud when goals conflict instead of picking one on its own.</li><li><b>The line it does not cross.</b> Step four.</li><li><b>A tiered knowledge base.</b> Sources it defers to, frameworks worth borrowing, and your own data and preferences as the highest tier. If your preference differs from the textbook default, yours wins, and the agent notes it so the rejected option is not suggested again.</li><li><b>When to reach out and when to stay silent.</b> Reach out when something is worth acting on; if nothing is, say nothing.</li><li><b>Communication style with a right and a wrong example.</b> One concrete pair teaches more than a paragraph of adjectives.</li><li><b>Output discipline.</b> You only see the finished message. No narration, no tool calls, no “here is what I am doing”.</li></ul>",
        prompt: "# Identity\n\n## Who you are\nYou are [Name], [my household operations assistant / my health coach / my chief of staff]. Your job is\n[one sentence on the outcome you are accountable for]. You are the reason nothing in this area falls\nthrough the cracks, not a chatbot that answers questions when asked.\nUse my notes vault as your durable memory. You own the folder [path].\n\n## Your standing objective, in priority order\n1. [The hard constraint. Nothing else matters if this fails.]\n2. [The primary outcome, with the number or signal you judge it by.]\n3. [The secondary outcome.]\n4. [The input that makes 1 to 3 possible, such as sleep, cash, or time.]\nWhen these conflict, say so out loud rather than picking one on your own.\n\n## The line you do not cross\nYou research, shortlist, draft, and prepare. You do not book, pay, confirm, send, or sign on my behalf\nwithout my explicit go-ahead in that moment. Present the options, state the trade-off, wait for a yes.\nYou do not give [medical / legal / tax / financial] advice; you surface the question for the professional.\nSensitive details (addresses, confirmation numbers, payment details) stay where I put them.\n\n## Your knowledge base\n- Tier 1, defer to: [official policy pages, clinician guidance, the contract]\n- Tier 2, borrow from: [a framework or two, named]\n- Tier 3, highest value, only you have it: my own data, preferences, and what has already been tried\n  and rejected. If my preference differs from a best-practice default, mine wins; note the divergence.\n\n## Being proactive\nReach out when there is something worth acting on: a deadline approaching, a decision ready,\na recurring task overdue, a pattern worth flagging. If there is nothing actionable, stay silent.\n\n## The plan\nKeep one current tracker in your folder: time-sensitive items first, open threads with what is\nblocking a decision, then recurring items with next-due dates.\n\n## Communication style\nPlain, practical, direct. Lead with the recommendation and the one trade-off that matters.\nRight: \"Two options for the Denver flight: nonstop at 6am for $410, or a layover at 9am for $340.\nI'd take the nonstop unless the $70 matters more than two hours. Book it?\"\nWrong: \"Here are six options with full details on each, let me know which you prefer.\"\n\n## Output discipline\nI only see your message. Never paste code, tool calls, raw data, or narration. Do the work, then\nsend the finished result, a short status, or one direct question if you are blocked.\n\n## When something is not actionable by you\nSay so plainly and give the minimum next step. Never leave it half done without telling me.",
        have: ["An identity file with every section filled in for your agent."],
      },
      {
        title: "Write the line it does not cross",
        body: "<p>Limits work best as a pattern rather than a list of forbidden tools: research, shortlist, draft, and prepare on its own; book, pay, confirm, send, or sign only after your yes in that moment. The pattern covers situations you did not think of.</p><p>Add the domain-specific lines: no medical, legal, or financial advice; questions for the professional get surfaced, not answered. Then add where sensitive data may and may not go.</p><p>Where a limit has to hold every time, write it as a protocol the agent must follow step by step, in its own file, and refer to it from the identity file. A health agent helping with insulin, for example, follows a fixed checklist (current reading and trend first, show the arithmetic, the pump’s calculator is the reference, log every suggestion) rather than a general instruction to be careful.</p>",
        tip: "If this agent will run scheduled jobs that touch other people (email, bookings, messages), read the companion guide on hiring an AI employee for the three-tier permission line and the three-run probation. The two guides are meant to be used together.",
        have: ["The “line you do not cross” section written, plus a protocol file for any hard constraint."],
      },
      {
        title: "Keep the identity file in the vault, not in the runtime",
        body: "<p>Most runtimes expect the identity file in their own folder. Keep the real copy in the agent’s vault folder instead, and link it into the runtime’s location (on a Unix machine, a symbolic link). Two things follow.</p><p>You can edit the agent’s identity from your notes app on any device, and the change is live the next time the agent loads. And the identity is not locked into one product’s file layout: if you change runtimes, the file moves with you.</p>",
        prompt: "ln -s \"/path/to/vault/[agent folder]/Identity.md\" \"/path/to/runtime/profiles/[agent]/SOUL.md\"",
        have: ["The identity file living in the vault, linked into the runtime, and a test edit that showed up on the agent’s next load."],
      },
      {
        title: "Connect a channel you already use, and give it an address",
        body: "<p>The agent should be where you already are. Connecting it to the chat app you use every day turns it from a tool you open into an assistant you text. That is also where it reaches you when something matters.</p><p>Give it an email address of its own. Then it can email you and your partner a shortlist, send calendar invites, receive work you forward to it, and sign up for research newsletters without any of that landing in your inbox. Put the address’s outbound mail behind your approval until it has earned otherwise.</p>",
        have: ["The agent answering in your chat app.", "An address of its own, with sending to anyone but you gated behind your yes."],
      },
      {
        title: "Teach it to file directly and capture raw",
        body: "<p>When you send the agent a note, a link, or a fact, it should infer the right place in the vault and file it there, asking only when the destination is genuinely ambiguous. No inbox and no holding folder: capture-then-sort only works if the sort happens, and it does not.</p><p>Tell it to record the fact and not the interpretation. The model that captures a note is usually cheaper than the one that will reason over it later, and a guess written down at capture time reads as settled fact a month on. Classifying (which folder, which person, which topic) is its job; explaining why it matters is not.</p><p>Every note it creates gets its metadata from the agent at creation time, in the same format you use. Fixing metadata in a later cleanup pass always loses to a script writing one untagged note a day.</p>",
        prompt: "## Filing rules\nWhen I send you a note or a link, infer the right location in the vault and file it there without\nover-questioning me. Ask only when the destination is genuinely ambiguous. There is no inbox or\n\"sort later\" folder: file directly into the real destination every time.\nRecord the fact, not an interpretation. Classify (folder, person, topic) but do not write up why it\nmatters, a thesis, or analysis. That work happens later, when someone needs it.\nEvery note you create gets its metadata block at creation time, in the vault's standard format.",
        have: ["Filing rules added to the identity file, and one test capture that landed in the right place with correct metadata."],
      },
      {
        title: "Add scheduled routines one at a time, each with a job card",
        body: "<p>Scheduled jobs are where the agent earns its keep: a morning briefing, a rental watch, a medication reminder, a weekly sweep. Add them one at a time, and give each a job card so you can see at a glance what runs, when, on which model, and where the result goes.</p><p>Two delivery rules keep routines from becoming noise. Deliver only when there is something new; a watch that found nothing says nothing, and a check that found nothing writes no log file. And deduplicate: a routine that looks for new things keeps a seen-list file and reports only what is not already on it.</p><p>Keep every job card in one reference note, with a status. A job that stops earning its place is paused and recorded as paused, not deleted.</p>",
        prompt: "### [Job name]\n- Job ID: [from the runtime]\n- Schedule: [days and times, with the time zone stated]\n- Model and provider: [pinned, so a model change is a decision you made]\n- Skills: [named skills the job may use, or none]\n- Delivery: [chat message to me / email / written to the vault at [path] / local only]\n- Silence rule: [post only when there is something new / always post a one-line heartbeat]\n- Dedupe file: [path to the seen-list it checks before reporting]\n- What it does: [one paragraph, specific enough that someone else could judge a run]",
        have: ["One routine running, its job card in a jobs reference note, and a silence rule that you have seen hold."],
      },
      {
        title: "Correct the rule, not the output",
        body: "<p>When the agent does something you did not want, resist fixing the output. Fix the rule in the identity file or the ownership note, and record the correction as a dated entry with the reason: what changed, on what date, at your request, and why. Reasons generalise to situations you did not anticipate; bare rules get pattern-matched.</p><p>Examples of the kind of entry that earns its place: “no log file for a check that found nothing”; “this field is factual, from the export, never a guess”; “any script that references a folder that no longer exists is a bug: tell me rather than running it”.</p><p>Any correction you find yourself giving twice becomes an entry.</p>",
        prompt: "Changed [YYYY-MM-DD], per [me]: [the new rule, in one sentence].\nWhy: [the reason, in one or two sentences, including what went wrong].\nReplaces: [the old behaviour, so the history is visible].",
        have: ["A dated corrections section in the operating notes, with at least one entry."],
      },
      {
        title: "Keep a control center, and prune",
        body: "<p>Once there are two or three agents and a handful of routines, nobody can hold the picture in their head. Have one script regenerate a simple dashboard every day: which agents exist, where each identity file lives, which jobs run on which schedule, which pipelines write where. Secrets and raw credentials stay out of it.</p><p>Add a daily sweep of the vault that looks for drift (stale files, missing metadata, broken links) and reports only when it finds some. And once a week, look at the dashboard and ask of each routine: did it run, was the output correct or merely present, and would you notice if it disappeared? Pause what fails the last question.</p>",
        have: ["A dashboard regenerated on a schedule.", "A sweep that reports drift.", "A weekly habit of pausing routines that no longer earn their place."],
      },
    ],
    credits: "<p>This is the pattern behind <a href=\"/hermes/\">Scout, Heath, and Paula</a>, the three personal agents described on this site, which have run on <a href=\"https://github.com/NousResearch/hermes-agent\" target=\"_blank\" rel=\"noopener noreferrer\">Hermes Agent</a> by Nous Research with an Obsidian vault as memory since mid-2026. The identity file shape, the ownership note, the filing rules, and the job card are the real ones, with names and paths generalised.</p><p>Two ideas are borrowed with thanks: the GTD capture, clarify, organise loop and the PARA folder structure inform how captured notes move through the vault, and the companion guide on hiring an AI employee, adapted from Linas Beliūnas, supplies the probation and promotion steps this pattern was missing.</p>",
  },
  {
    slug: "build-a-second-brain-your-ai-can-read",
    kicker: "GUIDE 04",
    title: "Build a second brain<br><em>your AI can read.</em>",
    plainTitle: "Build a second brain your AI can read",
    short: "Set up a notes vault that both you and your AI tools can read, write, and trust: one front door, folders in reading order, names you will find next month, metadata on every note, and a lifecycle rule so it stays current. Ten steps with the templates included.",
    lead: "A step-by-step method for setting up a personal knowledge base that works for two readers at once: you, and the AI tools and agents you give access to. Plain text in a folder you own, one front door every tool is told to read first, a small set of naming rules, metadata on every note, and a habit that keeps it current instead of letting it grow. The structure in this guide is the one behind the notes vault that the agents on the Hermes page of this site run on.",
    time: "An afternoon to set up, a week of use to settle the folders",
    audience: "Anyone who wants their notes to be the thing their AI knows about them, rather than a chat history. No technical background needed beyond installing a notes app.",
    needs: [
      "A notes app that stores each note as a plain Markdown file on disk. <a href=\"https://obsidian.md\" target=\"_blank\" rel=\"noopener noreferrer\">Obsidian</a> is the reference setup and is free for personal use; its Bases feature is used in step ten. Any app that keeps real files in a folder will do.",
      "A way to sync the folder between your devices and, if you run agents, the machine they run on. Obsidian Sync, iCloud Drive, Dropbox, or a git repository all work.",
      "At least one AI tool that can read files in a folder: Claude Code, a desktop AI app with file access, or a personal agent set up with the companion guide on memory and limits.",
      "An hour you are willing to spend writing about yourself in step seven. That is the part no tool can do for you.",
    ],
    steps: [
      {
        title: "Put everything in plain text, in one folder you own",
        body: "<p>The whole method rests on one choice: your notes are Markdown files in a folder on your own disk, synced between your devices. Not a product’s database, not a chat history, not a “memory” feature inside an AI app. A folder of text files can be read by any tool, searched by any agent, backed up anywhere, and moved to a different app in an afternoon.</p><p>Create the vault, turn on sync, and open it on your second device to confirm the files appear. If you run an agent on a server, install the sync client there too, so the agent and you read and write the same files.</p>",
        have: ["An empty vault, synced, open on two devices."],
      },
      {
        title: "Build one front door",
        body: "<p>Every knowledge base needs exactly one entry point, and every AI tool you connect will be told to read it first. Call it Home Base. It holds your current situation in a paragraph, a map of the top-level folders and what each holds, your daily rhythm, start-here links for each area, your priorities for the week, and the links to the rules in step ten.</p><p>Keep it to one screen. Home Base is a map, not a place where content lives. If you find yourself writing paragraphs there, they belong in a note it links to.</p>",
        prompt: "# Home Base\n\nThe single entry point for the vault. Everything else is one click from here.\n\n## Current operating context\n[Two or three sentences on where your life and work are right now. Update it when it changes.]\n\n## The map\n| Folder | Holds |\n|---|---|\n| 01 Daily Notes | one note per day |\n| 02 Personal | family, home, admin, media, recipes |\n| 03 Health | health records, plans, measurements |\n| 04 [Area] | ... |\n| 06 Work | career, bio, credentials |\n| 07 [Business] | the business: offers, clients, admin |\n| 99 System | the vault's own rules and history |\n\n## Daily rhythm\n- [[_Daily Note Template|Daily note]], filed as YYYY-MM-DD.md in 01 Daily Notes\n\n## Start here\n### Personal\n- [[00 About Me Index]]\n### Work\n- [[Career Direction]]\n\n## Weekly priorities\n1.\n2.\n3.\n\n## Vault maintenance\n- [[Naming and Filing Conventions]] (read before creating a note)\n- [[Tag Taxonomy]]\n- [[Vault Health]] (live view of everything by status)",
        have: ["<code>Home Base.md</code> at the root of the vault, one screen long."],
      },
      {
        title: "Number folders only when order matters, always with two digits",
        body: "<p>Top-level folders get a two-digit number in the order you want to read them: <code>01 Daily Notes</code>, <code>02 Personal</code>, <code>03 Health</code>, and so on, with <code>99 System</code> last, because the vault’s own rules are infrastructure and should sit out of the way. Folders inside a stage-based workflow get numbers too, because the number is the sequence.</p><p>Topic folders inside an area (Ideas, Recipes, Strategy) get no number, so they sort alphabetically. Two digits everywhere, no single-digit prefixes, so there is one rule to remember.</p><p>Do not create an inbox folder. Capture-then-sort only works if the sort happens, and in practice it does not. File things where they belong the moment you capture them.</p>",
        have: ["Your top-level folders, numbered in reading order, with no inbox."],
      },
      {
        title: "Give each kind of note one word for its job",
        body: "<p>A knowledge base rots when every hub invents its own name. Pick one word per job and retire the rest.</p><ul class=\"dot-list\"><li><b>Home Base</b>: the one root entry point. Exactly one in the vault.</li><li><b>00 [Area] Index</b>: a folder’s contents list. It lists and does not explain. One per folder that needs one.</li><li><b>00 [System] Home</b>: a system with rules and a workflow. It explains what each sibling file is for. One per system.</li></ul><p>Both carry the <code>00</code> prefix so a folder’s front door always sorts first; nobody should have to hunt for a folder’s own entry point. Words like Hub, Dashboard, Panel, and Vault are retired as entry-point names. Dashboard keeps its literal meaning for a note about a real built dashboard.</p>",
        have: ["An Index or Home note at the top of each folder that needs one, and no other hub words in use."],
      },
      {
        title: "Name notes so you would find them next month",
        body: "<p>The test for any note name: what is this, and why would I search for it next month? A few rules cover almost everything.</p><ul class=\"dot-list\"><li><b>Date as a suffix</b> for topic notes that happen to be dated: <code>Costco Receipt - 2026-07-24</code>, <code>Agreement Review - 2026-08-01</code>. You will browse these by topic.</li><li><b>Date as a prefix</b> for logs where the date is the identity: <code>2026-08-03.md</code> for a daily note, <code>2026-08-03 Podcast Digest</code>. You will only ever browse these by date.</li><li><b>Area prefixes</b> for operating notes: <code>[Business] - Tax and Admin Questions</code>.</li><li><b>Person notes</b> are <code>First Last</code>, or <code>First Last - Company</code> when the company disambiguates.</li><li><b>A leading underscore</b> for templates, so they sort above real notes: <code>_Daily Note Template</code>.</li></ul>",
        have: ["The naming rules written into a short Naming and Filing Conventions note in 99 System."],
      },
      {
        title: "Put metadata on every note, from the moment it is written",
        body: "<p>Every note starts with a small block of metadata (frontmatter). Folders are the primary filing system; metadata adds the cross-cutting context that tools can filter on. The minimum is three fields: tags, the date created, and a status.</p><p>Give each key exactly one meaning. A single status field that tries to carry lifecycle, provenance, and reading progress ends up with eight values nobody can filter on. Split them: <code>status</code> for lifecycle (active, reference, archive, log, template), <code>source</code> for provenance (which notes you wrote yourself, which an AI drafted), <code>progress</code> for media only, and <code>review</code> for who needs to see it (daily, periodic, agent-only).</p><p>Tags are a small number of stable families in lowercase kebab-case, such as <code>health/diabetes</code> or <code>work/learning</code>. A tag that only repeats the folder path is not earning its place. Keep a short table of retired tags so old names do not creep back. And the rule that matters most: whoever creates the note writes the metadata, whether that is you, a template, or an agent. A cleanup pass later always loses to a script writing one untagged note a day.</p>",
        prompt: "---\ntags:\n  - [area/topic]\ncreated: YYYY-MM-DD\nstatus: active        # active | reference | archive | log | template\nsource: [me | ai-assisted | generated]     # only where provenance matters\nreview: periodic      # daily | periodic | agent-only\n---",
        have: ["A Tag Taxonomy note listing your families, the four keys and their values, and the retired tags.", "Every template in the vault starting with the metadata block."],
      },
      {
        title: "Write the evergreen notes about yourself, in your own voice",
        body: "<p>This is the step that makes an AI actually know you. Create an About folder with an index and a handful of evergreen notes: your values and operating principles, your background, your family and the people closest to you, lessons you have learned, your favourites, what you follow, the recurring shape of your week.</p><p>No dates and no logs here; only settled material. And write them yourself. Every AI you connect will read these notes for context, and if an AI drafted them, every tool downstream learns to imitate an earlier machine rather than you. An hour of your own writing here is worth more than any amount of structure elsewhere.</p>",
        have: ["An About index and at least four evergreen notes, written by you."],
      },
      {
        title: "Keep a daily note from a template",
        body: "<p>The daily note is where the vault stays current without effort. One file per day, date-prefixed because the date is its identity, made from a template with a few optional sections: what actually happened in your own words, energy and health, work, people, a line to carry forward.</p><p>Every section is optional, and a three-line entry beats a skipped day. Link people by name with double brackets, so the day shows up on their note and an agent asked about someone can see the history.</p>",
        prompt: "---\ntags:\n  - personal/daily\ncreated: YYYY-MM-DD\nstatus: log\n---\n# Daily Note - YYYY-MM-DD\n\n## Reflection\n[What actually happened today, in your own words. Link people with [[Name]].]\n\n## Energy / health\n-\n\n## Work\n-\n\n## People\n-\n\n## Carry forward\n-",
        have: ["<code>_Daily Note Template.md</code> in the daily notes folder, and today’s note made from it."],
      },
      {
        title: "Point every AI at the vault",
        body: "<p>Now tell your tools about it. Each AI tool you use has somewhere for standing instructions: a global instructions file for a coding agent, custom instructions in a chat app, the identity file of a personal agent. Add the paragraph below, adjusted to your paths. It does three things: names the vault as the source of truth, says where to start reading, and tells the tool to write facts about you back into the vault rather than into its own private memory.</p><p>That last part is what keeps one knowledge base instead of five. An AI’s own memory feature is convenient and invisible; the vault is yours, readable, and shared by every tool.</p><p>If you run personal agents, give each one a folder it owns inside the vault, with an ownership note. The companion guide on giving an agent a memory and limits covers that.</p>",
        prompt: "For anything about my life, family, health, or my business, the source of truth is the notes\nvault at [path to the vault]. Read \"Home Base.md\" first, then follow its links. Do not answer\nfrom assumption or from what might be in your own memory; the vault is more current.\n\nIf something worth remembering is a fact about my life or my business, update the relevant\nvault note directly, following the vault's Naming and Filing Conventions and Tag Taxonomy,\nrather than saving it to your own memory.",
        have: ["The paragraph in every AI tool’s standing instructions, and one test question answered from the vault rather than from memory."],
      },
      {
        title: "Keep it alive: lifecycle, one hub per domain, live views",
        body: "<p>A knowledge base that only grows stops being trusted. Three habits keep this one current.</p><ul class=\"dot-list\"><li><b>Every note has a job and a lifecycle.</b> Active while it is useful; completed when the action happened but the result still matters; archived to a folder under 99 System when it is only history; deleted when it has no durable value. Setup checklists and one-time prep do not stay active after the thing is done.</li><li><b>One strong hub per domain.</b> Before creating a second index, backlog, or home note for something, check whether one exists. Duplicated hubs drift apart within weeks, and then neither can be trusted. When you rename or merge a note, rewrite every incoming link to the new name; do not leave a stub behind.</li><li><b>Live views that read the metadata.</b> In Obsidian, a Base is a table that queries frontmatter: everything by status, recently changed, templates, archive. A wrong status drops a note out of the view, so you notice. If you run an agent, give it a daily sweep that reports missing metadata, broken links, and stale notes, and a short audit note every month or two recording what changed and why.</li></ul>",
        have: ["A lifecycle rule written into the conventions note.", "A Vault Health view of everything by status.", "A recurring sweep or a calendar reminder to run one."],
      },
    ],
    credits: "<p>This is the structure of the notes vault behind <a href=\"/hermes/\">Scout, Heath, and Paula</a>, the personal agents described on this site, as it stood in October 2026 after two rounds of consolidation. The two rules in steps three and four, the four metadata keys, the lifecycle table, and the “rename by rewriting links” rule all came out of audits of what had gone wrong in the vault before them.</p><p>The idea of a second brain is Tiago Forte’s, and his PARA structure (Projects, Areas, Resources, Archive) shaped the folder thinking here. Obsidian’s Bases feature, used in step ten, is the live-view layer. The companion guide on giving an agent a memory and limits covers the agents that own folders inside a vault like this one.</p>",
  },
  {
    slug: "prompt-for-outcomes-not-steps",
    kicker: "GUIDE 05",
    title: "Prompt for outcomes,<br><em>not steps.</em>",
    plainTitle: "Prompt for outcomes, not steps",
    short: "Stop walking the AI through your old manual steps. Give it the job, the reason, the guardrails, and what done looks like, and let it find the route. Nine steps, with the four-block template and the prompts that write the brief for you.",
    lead: "A step-by-step method for getting much more out of an AI model by changing what you ask for. Most people use AI to run a process they have done by hand for years, one instruction at a time. This guide replaces that with a four-block brief: the job, why it matters, the guardrails, and what done looks like. The model works out the steps, and it usually finds a faster route than the one you would have given it.",
    time: "Twenty minutes to learn, one real task to make it stick",
    audience: "Anyone who uses an AI model for real work: spreadsheets, documents, research, code. Especially people who already use AI and feel they are doing a lot of the work themselves.",
    needs: [
      "Any current AI model with a chat or agent interface. The method was written against Claude, and the prompts here use its phrasing, but the four blocks work anywhere.",
      "One real task you have been doing by hand, or walking the AI through step by step. A reconciliation, a report, a clean-up, a summary. Something with a clear result.",
      "If the task involves files, an agent that can read a folder, such as Claude Code or a desktop AI app with file access. A chat window works for everything else.",
    ],
    steps: [
      {
        title: "Catch yourself writing steps",
        body: "<p>The symptom is easy to spot once you know it. “Remove the blank rows. Now move this column so it lines up with the other report. Now filter for anything over 90 days.” One instruction at a time, the same clicks you would otherwise make by hand, just dictated.</p><p>It feels productive, and it is a little faster than doing it yourself. It also throws away most of what the model can do. An AI with tools can write and run code, read a whole folder at once, and try a route you would never have taken. Walk it through your manual steps and you forbid all of that.</p><p>Before the next task, write down the result you want in one sentence. If the sentence starts with a verb like open, filter, or copy, you are describing steps. Rewrite it until it describes the end state.</p>",
        have: ["One sentence that describes the result, with no steps in it."],
      },
      {
        title: "Give it the whole job",
        body: "<p>Hand over the complete task in one request and let the model run it end to end. Current models are built for this; managing them stage by stage mostly adds your time to theirs.</p><p>A worked example. A utilities audit: checking that costs paid upfront had been correctly billed back, across a year of ledgers and rent rolls where the amounts did not always line up one to one. Given the folder and the outcome, an agent produced a reconciliation schedule with items flagged for review, a summary of findings, and a list of follow-up questions for the vendor. It took 15 minutes and a few dollars of usage, against about two days by hand. The flagged items still needed a person to look at them, but that is a different job from building the reconciliation.</p><p>Write the job as one or two sentences that describe that kind of result: the thing that should exist when the model is finished.</p>",
        have: ["The Job block: what you want done, as an outcome, in one or two sentences."],
      },
      {
        title: "Say why",
        body: "<p>A model that knows why a task matters makes better judgment calls on everything you did not specify. Tell it the larger task this is part of, who the output is for, and what they will do with it. Three short clauses are enough: “I am working on [the larger task] for [who it is for]. They need [what the output enables].”</p><p>This is the block people skip, and it is the one that changes the most about the result. A summary for a board is a different document from a summary for an engineer, and the model can only know that if you say so.</p>",
        have: ["The Why block: the larger task, who it is for, what the output enables."],
      },
      {
        title: "Set the guardrails",
        body: "<p>Guardrails are the few things the model must not do, plus a rule for how to handle the decisions in between. Three lines cover most tasks.</p><ul class=\"dot-list\"><li>The scope: only touch these files, this folder, this range. Leave everything else alone.</li><li>The must-nots: anything that must not change, be sent, or be deleted. Name them.</li><li>The judgment rule: make routine judgment calls yourself, and ask me only if the answer would change the whole result.</li></ul><p>That last line is what lets the model finish without a dozen check-ins, while still bringing you the one question that matters. Guardrails are reasons and boundaries, not a list of every forbidden action; see step seven for why.</p>",
        have: ["The Guardrails block: scope, must-nots, and the judgment rule."],
      },
      {
        title: "Define done",
        body: "<p>If you say what finished looks like, you get it. If you do not, you get the model’s guess. Define done in three parts: how you will both know it is finished, how big the deliverable should be, and how the model should report back.</p><p>For size, name sections or a word count, or say “as short as covers the substance”. For the report, ask for where the result is and three short bullets on what was done, and nothing more. That last instruction is what keeps a long task from ending in a wall of narration.</p><p>Surface the unknowns here too. If there is something you do not know yet, say so, and say whether the model should decide, ask, or leave it open.</p>",
        have: ["The Done Means block: the finished test, the size, and the three-bullet report-back."],
      },
      {
        title: "Let the model write the brief",
        body: "<p>You do not have to fill the four blocks in yourself. Two shortcuts, and both produce better briefs than most people write by hand.</p><p>The first is to give the model the context, paste the template, and ask it to fill the template in for you. Read what comes back, correct anything it assumed, and run it. The second is to have the model interview you first: it asks the questions a good analyst would ask before starting, you answer in plain language, and it writes the brief from your answers. Use the interview for anything bigger than an afternoon.</p>",
        prompt: "Before you do anything, interview me about this task. Ask the questions a good analyst would ask\nbefore starting: what the result is for, who will use it, what is in and out of scope, what must\nnot change, how we will know it is finished, and anything I have not thought about. One question\nat a time, up to eight. Then write the brief in four blocks: THE JOB, THE WHY, THE GUARDRAILS,\nDONE MEANS. Show me the brief and wait for my yes before starting.",
        tip: "The one-line version, for a quick task: paste the four-block template, add two sentences of context, and say “fill this in for me, then run it”.",
        have: ["A completed brief the model wrote and you corrected."],
      },
      {
        title: "Give reasons, not rules, in your standing instructions",
        body: "<p>Every AI tool has somewhere for standing instructions: a project file for a coding agent, custom instructions in a chat app, an identity file for a personal agent. Most of what people write there is a list of rules: never do this, always do that. Rules get pattern-matched, and a rule that does not quite fit the situation gets applied anyway, or ignored.</p><p>Replace each rule with its reason. “Never use an em dash” becomes “em dashes read as machine-written in my voice; use a full stop or a comma instead”. “Always ask before sending” becomes “sending is irreversible and goes out under my name, so stage a draft and ask”. The model can then handle the cases the rule never anticipated.</p>",
        prompt: "Here are my standing instructions: [paste them]. For each rule written as a prohibition or a\ncommand, rewrite it as the underlying reason, in one sentence, so that a reader who understands\nthe reason would make the right call in a situation the rule did not anticipate. Keep anything\nthat is a genuine hard limit (money, deletion, sending, safety) as a hard limit, and say why it is one.\nShow the before and after side by side.",
        have: ["Standing instructions where each line carries its reason."],
      },
      {
        title: "Stop adding “double-check”, and fix the voice once",
        body: "<p>Two habits from older models are now wasted words. The first is telling the model to double-check its work, verify everything, or review its own output before finishing. Current models already do this, and the extra instruction mostly adds length and hedging. If an output genuinely matters, ask for the evidence and the checks that were run, not for reassurance.</p><p>The second is correcting the tone in every conversation. If you keep asking for shorter answers, no headers, or plainer language, put that in the standing instructions once, or in an output style if your tool has one, and stop repeating it.</p><p>One more habit worth adopting: when a task involves documents, put the documents before the question. Context first, then what you want done with it.</p>",
        have: ["No “double-check” lines in your prompts.", "Your voice and format preferences written down once."],
      },
      {
        title: "Keep the template and reuse it",
        body: "<p>The four blocks are the whole method. Keep the template somewhere you can paste it from, use it for every task that would take more than a few minutes by hand, and let the model fill it in when you are short on time. After a few weeks, the shape will be in your head and you will write outcome-first without the scaffold.</p>",
        prompt: "THE JOB\n[What you want done, as an outcome, not as steps. One or two sentences.]\n\nTHE WHY\nI'm working on [the larger task] for [who it's for]. They need [what the output enables].\n\nTHE GUARDRAILS\n- Only touch [the scope]. Leave everything else alone.\n- [Anything that must not change, be sent, or be deleted.]\n- Make routine judgment calls yourself. Ask me only if the answer would change the whole result.\n\nDONE MEANS\n- [How we both know it's finished.]\n- Keep the deliverable to [sections, a word count, or \"as short as covers the substance\"].\n- When you finish, tell me where the result is and give me 3 short bullets on what you did. Nothing more.",
        have: ["The template saved where you can paste it.", "One real task run with it, and the result compared with how you would have done it by hand."],
      },
    ],
    credits: "<p>The four-block template is the one from an Alpha Infra post in September 2026, adapted from Ben van Sprundel’s Ben AI video <a href=\"https://www.youtube.com/watch?v=HDmBwU5uvEE\" target=\"_blank\" rel=\"noopener noreferrer\">on Anthropic’s prompting guidance for Claude 5 models</a>, which is also the source of the rules in steps two, six, seven, and eight: give the whole job, interview yourself first, reasons not rules, avoid double-checking, and fix the voice once. Anthropic’s own <a href=\"https://docs.claude.com/en/docs/build-with-claude/prompt-engineering/overview\" target=\"_blank\" rel=\"noopener noreferrer\">prompt engineering documentation</a> is the primary source and worth reading in full.</p><p>The utilities audit in step two is a real piece of professional work, described without the client, property, vendor, or figures involved; the times are the actual run. The interview prompt, the rewrite prompt, and the step order are this guide’s own.</p>",
  },
];
const guideIndexUrl = "/resources/";
const guideUrl = (g) => guideIndexUrl + g.slug + "/";
const promptBlock = (text) => `<div class="prompt-block"><div class="prompt-head"><span>PROMPT TO COPY</span><button type="button" class="quiet-button" data-copy>Copy</button></div><pre>${e(text)}</pre></div>`;
function guidePage(g) {
  const n = g.steps.length;
  const nav = `<nav class="guide-nav" aria-label="Steps in this guide"><p class="eyebrow">IN THIS GUIDE</p><ol>${g.steps.map((s, i) => `<li><a href="#step-${i + 1}" data-step="${i + 1}"><span>${String(i + 1).padStart(2, "0")}</span>${s.title}</a></li>`).join("")}</ol><a class="guide-nav-foot" href="#credits">Credits and sources</a></nav>`;
  const steps = g.steps
    .map((s, i) => {
      const next = i + 1 < n ? `<a class="text-link next-step" href="#step-${i + 2}">Next: ${g.steps[i + 1].title} ${arrow}</a>` : `<a class="text-link next-step" href="#credits">Credits and sources ${arrow}</a>`;
      return `<section class="guide-step" id="step-${i + 1}"><div class="step-head"><span class="item-number">STEP ${String(i + 1).padStart(2, "0")} OF ${String(n).padStart(2, "0")}</span><h2>${s.title}</h2></div><div class="prose">${s.body}</div>${s.prompt ? promptBlock(s.prompt) : ""}${s.tip ? `<p class="guide-tip"><span>TIP</span>${s.tip}</p>` : ""}<div class="guide-have"><span>YOU SHOULD NOW HAVE</span><ul class="check-list">${s.have.map((h) => `<li>${h}</li>`).join("")}</ul></div>${next}</section>`;
    })
    .join("");
  return `<section class="page-intro wrap guide-intro"><a class="breadcrumb" href="${guideIndexUrl}">Guides / ${g.plainTitle}</a>${eyebrow(g.kicker)}<h1>${g.title}</h1><p>${g.lead}</p><dl class="guide-meta"><div><dt>STEPS</dt><dd>${n}</dd></div><div><dt>TIME</dt><dd>${g.time}</dd></div><div><dt>WHO IT’S FOR</dt><dd>${g.audience}</dd></div></dl></section><div class="wrap guide-layout">${nav}<div class="guide-body"><section class="guide-step guide-needs" id="before-you-start"><div class="step-head"><span class="item-number">BEFORE YOU START</span><h2>What you need.</h2></div><ul class="check-list">${g.needs.map((x) => `<li>${x}</li>`).join("")}</ul><a class="text-link next-step" href="#step-1">Start with step one ${arrow}</a></section>${steps}<section class="guide-step guide-credits" id="credits"><div class="step-head"><span class="item-number">CREDITS AND SOURCES</span><h2>Where this comes from.</h2></div><div class="prose">${g.credits}</div></section></div></div>${cta("Would rather have it built<br>with you?", "Bring the idea, or the job you want off your desk. We can run the same steps together, or I can build it and hand it over.")}`;
}
const resources = `<section class="page-intro wrap">${eyebrow("GUIDES")}<h1>Step-by-step guides<br><em>for building with AI.</em></h1><p>Practical guides for people who want to build things with AI agents themselves. Each one is a sequence you can follow from start to finish, with the prompts and templates included. More are added as the work produces them.</p></section><section class="wrap guide-grid">${guides.map((g) => `<article class="guide-card"><span class="guide-card-kicker">${g.kicker}</span><h2><a href="${guideUrl(g)}">${g.plainTitle}</a></h2><p>${g.short}</p><div class="guide-card-meta"><span>${g.steps.length} steps</span><span>${g.time}</span></div>${link(guideUrl(g), "Start the guide", "text-link")}</article>`).join("")}</section><section class="wrap exploration-note"><p>Want a guide on something in particular? <a href="/contact/">Ask</a>, and if enough people want it, it gets written.</p></section>${cta()}`;
const redirects = [
  ["/resources/how-a-build-runs/", "/resources/build-software-with-an-ai-agent/"],
  ["/book/", "/contact/"],
  ["/services/coaching/", "/services/"],
];
const faqLd = (items) => ({
  "@type": "FAQPage",
  mainEntity: items.map(([q, a]) => ({ "@type": "Question", name: plain(q), acceptedAnswer: { "@type": "Answer", text: plain(a) } })),
});
const crumbs = (list) => ({
  "@type": "BreadcrumbList",
  itemListElement: list.map(([name, path], i) => ({ "@type": "ListItem", position: i + 1, name, item: siteUrl + path })),
});
const offerPrice = {
  "quick-win": { "@type": "Offer", price: 2500, priceCurrency: "USD", description: "Fixed fee" },
  system: { "@type": "Offer", priceSpecification: { "@type": "PriceSpecification", minPrice: 10000, maxPrice: 15000, priceCurrency: "USD" }, description: "Typical range" },
  strategy: { "@type": "Offer", price: 7500, priceCurrency: "USD", description: "Fixed fee" },
  workshops: { "@type": "Offer", priceSpecification: { "@type": "PriceSpecification", minPrice: 3500, priceCurrency: "USD" }, description: "From $3,500 for a half day; full days from $6,000" },
  care: { "@type": "Offer", priceSpecification: { "@type": "PriceSpecification", minPrice: 1500, priceCurrency: "USD" }, description: "From $1,500 per month, for existing build clients" },
};
const serviceLd = (o) => ({
  "@type": "Service",
  "@id": siteUrl + "/services/" + o.slug + "/#service",
  name: o.name,
  serviceType: o.legacy,
  description: plain(o.text),
  url: siteUrl + "/services/" + o.slug + "/",
  provider: { "@id": siteUrl + "/#organization" },
  areaServed: ["United States", "Remote"],
  ...(offerPrice[o.slug] ? { offers: offerPrice[o.slug] } : {}),
});
const offerFaqs = { system: [faqs[11], faqs[12], faqs[4]], care: [faqs[12], faqs[10]] };
const pages = [
  [
    "/",
    "AI consulting and custom builds for your business",
    "Independent AI consultant and builder David Bunn helps businesses with custom tools, reporting, automation, practical AI guidance, and team enablement.",
    home,
    [faqLd([faqs[0], faqs[6], faqs[7], faqs[11], faqs[8], faqs[9], faqs[10]])],
  ],
  [
    "/services/",
    "AI consulting services, fees, and timelines",
    "AI consulting, custom software, data and reporting, workflow automation, and practical support for your team.",
    services,
    [
      { "@type": "ItemList", name: "Ways to work together", itemListElement: offers.map((o, i) => ({ "@type": "ListItem", position: i + 1, name: o.name, url: siteUrl + "/services/" + o.slug + "/" })) },
      faqLd(faqs),
    ],
  ],
  [
    "/work/",
    "AI tools, reporting, and workflows I’ve built",
    "Explore working tools, reporting applications, and AI workflows built for commercial, finance, investment, and operational teams.",
    work,
    [{ "@type": "ItemList", name: "Selected work", itemListElement: projects.map((p, i) => ({ "@type": "ListItem", position: i + 1, name: p.title, ...(p.href ? { url: siteUrl + p.href } : {}) })) }],
  ],
  [
    "/work/entec/",
    "Entec sales intelligence hub: a custom AI build",
    "Inside a custom commercial system built with the owner of Entec Access Systems.",
    entec,
    [
      { "@type": "Article", "@id": siteUrl + "/work/entec/#article", headline: "A sales intelligence hub for Entec", description: "A custom commercial system built with the owner of Entec Access Systems, a 15-person UK services business, connecting SimPRO, Xero, and Outlook.", image: siteUrl + "/assets/entec-sales-hub.webp", datePublished: "2026-10-05", author: { "@id": siteUrl + "/#david" }, publisher: { "@id": siteUrl + "/#organization" }, about: { "@type": "Organization", name: "Entec Access Systems" }, mainEntityOfPage: siteUrl + "/work/entec/" },
      crumbs([["Home", "/"], ["Selected work", "/work/"], ["Entec", "/work/entec/"]]),
    ],
  ],
  [
    "/about/",
    "About David Bunn, independent AI consultant",
    "A decade in finance and operations, now applied to practical AI consulting and custom builds.",
    about,
  ],
  [
    "/contact/",
    "Contact David Bunn about AI for your business",
    "Bring an idea, a business problem, or a question about AI. Book a conversation or prepare an email to David Bunn.",
    contact,
    [faqLd([faqs[0], faqs[9], faqs[5]])],
  ],
  [
    "/explore/",
    "Explore where AI could help your business",
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
    "/resources/",
    "Step-by-step guides for building with AI",
    "Practical, copy-and-paste guides for building software with AI coding agents and putting AI agents to work in a business.",
    resources,
    [
      { "@type": "ItemList", name: "Guides", itemListElement: guides.map((g, i) => ({ "@type": "ListItem", position: i + 1, name: g.plainTitle, url: siteUrl + guideUrl(g) })) },
      crumbs([["Home", "/"], ["Guides", "/resources/"]]),
    ],
  ],
  ...guides.map((g) => [
    guideUrl(g),
    g.plainTitle + ": a step-by-step guide",
    plain(g.short),
    guidePage(g),
    [
      { "@type": "HowTo", "@id": siteUrl + guideUrl(g) + "#howto", name: g.plainTitle, description: plain(g.short), totalTime: undefined, step: g.steps.map((st, i) => ({ "@type": "HowToStep", position: i + 1, name: st.title, url: siteUrl + guideUrl(g) + "#step-" + (i + 1), text: plain(st.body).slice(0, 300) })), author: { "@id": siteUrl + "/#david" }, publisher: { "@id": siteUrl + "/#organization" }, datePublished: "2026-10-19" },
      crumbs([["Home", "/"], ["Guides", "/resources/"], [g.plainTitle, guideUrl(g)]]),
    ],
  ]),
  [
    "/privacy/",
    "Privacy",
    "How Alpha Infra handles the information you share.",
    privacy,
  ],
  ...offers.map((o) => [
    "/services/" + o.slug + "/",
    o.seoTitle || o.title || o.name,
    o.description || o.text,
    o.slug === "ai-adoption" ? adoptionPage(o) : offerPage(o),
    [serviceLd(o), crumbs([["Home", "/"], ["How I can help", "/services/"], [o.name, "/services/" + o.slug + "/"]]), ...(offerFaqs[o.slug] ? [faqLd(offerFaqs[o.slug])] : [])],
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
for (const [path, title, description, body, ld] of pages) {
  const file = join(out, path, "index.html");
  await mkdir(dirname(file), { recursive: true });
  await writeFile(file, layout(title, description, path, body, ld));
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
await writeFile(
  join(out, "robots.txt"),
  ["*", "Googlebot", "Bingbot", "Google-Extended", "GPTBot", "OAI-SearchBot", "ChatGPT-User", "ClaudeBot", "anthropic-ai", "PerplexityBot", "Applebot-Extended"]
    .map((ua) => `User-agent: ${ua}\nAllow: /\n`)
    .join("\n") + `\nSitemap: ${siteUrl}/sitemap.xml\n`,
);
await writeFile(
  join(out, "llms.txt"),
  `# Alpha Infra

> Independent AI consulting and custom builds for businesses, run by David Bunn in the San Francisco Bay Area. Alpha Infra LLC, founded July 2026. Site: ${siteUrl}

David helps businesses work out where AI is worth using, then gets it working: custom tools and AI agents, better reporting, workflow automation, practical help for teams, and structure around how AI gets used. Most of what he builds is ordinary software around the business's own data and rules, with AI where interpretation helps, handed over in accounts the client owns. Before this he spent ten years in finance and operations at PwC, Major League Cricket, and Stockbridge Capital Group. CPA (inactive).

## Ways to help

${helpAreas.map((a) => `- ${a.title}: ${plain(a.detail)}`).join("\n")}

## Ways to work together (fees in USD)

${offers.map((o) => `- ${o.name} (${o.legacy}): ${o.price} ${o.suffix}; ${o.time}. ${plain(o.text)} ${siteUrl}/services/${o.slug}/`).join("\n")}

Hosting, model usage, and other third-party costs are discussed separately before a build.

## Selected work

- Entec Access Systems sales intelligence hub: a custom commercial system built with the owner of a 15-person UK services business, connecting SimPRO, Xero, and Outlook so he can track key accounts, follow up inquiries, and prioritize the next commercial action. In daily use since July 2026. ${siteUrl}/work/entec/
- Quarterly valuation reporting for a multi-fund real estate investment manager: a 12-hour quarterly report on unrealized gains and losses rebuilt as one query, one combined dataset, a master asset mapping table, and the team’s rules written into code. Now a 30-second run and a 30-minute review. ${siteUrl}/work/
- FP&A process rebuild at a private equity real estate firm with $25 billion under management (corporate finance work before Alpha Infra): revenue models, the corporate financial model, reforecast, budgeting, and distribution files rebuilt across a complex entity structure with significant intercompany activity, removing days of manual work and reconciliation each cycle. ${siteUrl}/work/
- Portfolio of professional and independent work: ${siteUrl}/work/
- Hermes, three personal AI agents (admin, health, parenting): ${siteUrl}/hermes/

## Guides (step-by-step, with prompts to copy)

${guides.map((g) => `- ${g.plainTitle}: ${plain(g.short)} ${siteUrl}${guideUrl(g)}`).join("\n")}

## Practical questions

${faqs.map(([q, a]) => `- ${plain(q)} ${plain(a)}`).join("\n")}

## Pages

${pages.map(([path, title]) => `- ${title}: ${siteUrl}${path}`).join("\n")}

## Contact

- Email: david@alphainfra.us
- Book a 30-minute discovery call: ${scheduler}
- LinkedIn: ${linkedinPerson}
`,
);
await writeFile(join(out, "CNAME"), "alphainfra.us\n");
// Google Search Console ownership file (URL-prefix property, HTML-file method).
const googleVerification = "googlefb1fb962a2359c65";
await writeFile(join(out, googleVerification + ".html"), `google-site-verification: ${googleVerification}.html`);
console.log(`Built ${pages.length} pages in ${out}`);
