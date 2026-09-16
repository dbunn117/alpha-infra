/*
 * Catalogue of David's AI work. Professional projects are confidential
 * (described, no external links) and grouped by the kind of value they
 * demonstrate. Personal projects link out where public; `image` points at a
 * screenshot in /public/shots (degrades to a placeholder if absent).
 * `internalHref` links to an on-page section or another route (e.g. the
 * Hermes detail page).
 */

export type Project = {
  title: string;
  blurb: string;
  tools: string[];
  tag: string;
  icon: string; // lucide icon name
  href?: string; // external live link
  internalHref?: string; // on-page anchor or another route
  image?: string; // /shots/*.png
  linkLabel?: string;
  group?: string; // see PROFESSIONAL_PROJECT_GROUPS
};

export const PROFESSIONAL_PROJECT_GROUPS: { label: string }[] = [
  { label: "Decision and opportunity systems" },
  { label: "Workflow and knowledge infrastructure" },
];

export const professionalProjects: Project[] = [
  {
    title: "Market Selection Tool",
    tag: "Investment strategy",
    icon: "Globe2",
    group: "Decision and opportunity systems",
    blurb:
      "Weights and scores macro-economic and demographic data into a market scorecard, then uses AI to write the narrative behind the trends: nationally, by market, and by property sector.",
    tools: ["Claude Code", "Macro-economic data", "Python", "Agentic analysis"],
  },
  {
    title: "Business Review & Lookback Apps",
    tag: "Interactive apps",
    icon: "BarChart3",
    group: "Decision and opportunity systems",
    blurb:
      "Lets portfolio managers compare each asset's actual performance against its underwriting model, spot outperformers and underperformers at a glance, and drill into what's actually driving that performance: interactive and visual instead of a static variance report.",
    tools: ["Claude Code", "Interactive apps"],
  },
  {
    title: "Asset Map Explorer",
    tag: "Real estate · BI",
    icon: "Map",
    group: "Decision and opportunity systems",
    blurb:
      "An interactive map of an entire real-estate portfolio: resize market bubbles by metrics like square footage or rent PSF and drill into tenant detail.",
    tools: ["Claude Code", "Leaflet", "Interactive apps"],
  },
  {
    title: "Deal-Flow Reporting",
    tag: "Capital markets · BI",
    icon: "TrendingUp",
    group: "Decision and opportunity systems",
    blurb:
      "Feeds hundreds of weekly \"call for offers\" emails into a Power Automate workflow and a shared database, then charts deal volume by region and property type in Power BI, giving capital-markets teams a read on recent activity before deciding when to bring a new deal to market.",
    tools: ["Power Automate", "Power BI", "SharePoint"],
  },
  {
    title: "Variance Analysis Tool",
    tag: "Accounting · month-end",
    icon: "Calculator",
    group: "Decision and opportunity systems",
    blurb:
      "Takes raw general-ledger extracts for about 50 properties and does the math and the logic in a web app: investigation thresholds by property and by account, a clear view of which ones need an explanation, and AI-drafted commentary for each flagged account from the GL detail. The team reviews and edits, edits persist, and the final variance package exports.",
    tools: ["Claude Code", "Claude API", "Interactive apps"],
  },
  {
    title: "Dynamic Financial Modeling",
    tag: "Financial modeling",
    icon: "Calculator",
    group: "Decision and opportunity systems",
    blurb:
      "Financial models rebuilt in Claude Code: stakeholders explore scenarios and get answers in real time, instead of waiting days for an update.",
    tools: ["Claude Code", "Financial modeling", "Interactive apps"],
  },
  {
    title: "Due-Diligence Drafting System",
    tag: "Investor relations · diligence",
    icon: "ClipboardCheck",
    group: "Workflow and knowledge infrastructure",
    blurb:
      "About 4,000 past question-and-answer pairs ingested and tagged by fund, date, client, and more. When a new questionnaire arrives, the system drafts the answers from precedent, with three years of history side by side, so investor relations reviews and edits instead of starting from a blank page.",
    tools: ["Claude Code", "Semantic search", "Investor relations"],
  },
  {
    title: "Doc Ingestion → Queryable Database",
    tag: "Data pipeline",
    icon: "FileStack",
    group: "Workflow and knowledge infrastructure",
    blurb:
      "Ingests documents like sales and lease comps and extracts the data with AI, pushing it into a database that's queryable by an AI or agent built on top.",
    tools: ["AI extraction", "Power Automate"],
  },
  {
    title: "Shared-Inbox Triage Automation",
    tag: "Email automation",
    icon: "Inbox",
    group: "Workflow and knowledge infrastructure",
    blurb:
      "Routes high-volume shared-inbox mail through Power Automate workflows, rule-based where the pattern is clear, AI-classified where judgment is needed, so the right item reaches the right person automatically.",
    tools: ["Power Automate", "AI classification", "Copilot Studio"],
  },
  {
    title: "Accounts-Payable Automation",
    tag: "Finance automation",
    icon: "Receipt",
    group: "Workflow and knowledge infrastructure",
    blurb:
      "Ingests invoices from a shared mailbox, extracts and validates the details, and automates the weekly wire-request package: a manual process turned scheduled run.",
    tools: ["AI extraction", "Power Automate"],
  },
  {
    title: "AI Resource Hub",
    tag: "AI education",
    icon: "BookOpen",
    group: "Workflow and knowledge infrastructure",
    blurb:
      "An internal hub for staying current on AI, with the latest news pulled in automatically on a scheduled Codex run, alongside curated learning paths, prompt techniques, thought leaders, and research.",
    tools: ["Codex", "Scheduled automation", "Knowledge base"],
  },
];

export function professionalProjectsByGroup(group: string): Project[] {
  return professionalProjects.filter((p) => p.group === group);
}

/*
 * Lab: independent, curated to three. Scout, Heath, Paula, and Podcast OS
 * live behind the Hermes detail page (/hermes) rather than as full entries
 * here; the personal CRM project is dropped from the public catalogue.
 */
export const personalProjects: Project[] = [
  {
    title: "PitchMap",
    tag: "Sports market intelligence",
    icon: "Globe2",
    blurb:
      "Scores and ranks US markets for cricket business opportunity, blending Census, business-pattern, and OpenStreetMap data into audience, commercial, and infrastructure-gap signals.",
    tools: ["Python", "Census & public data", "OpenStreetMap", "Interactive maps"],
    href: "https://dbunn117.github.io/pitchmap/",
  },
  {
    title: "Hermes",
    tag: "Personal agent platform",
    icon: "Compass",
    blurb:
      "Four personal agents sharing one pattern: durable memory in Obsidian, proactive outreach, and approval before anything consequential happens. Scout runs admin, Heath coaches health, Paula coaches parenting, and Podcast OS keeps me current on my shows.",
    tools: ["Hermes Agent", "Obsidian", "Google Workspace"],
    internalHref: "/hermes",
    linkLabel: "See the Hermes agents",
  },
  {
    title: "CricFan AI",
    tag: "Sports analytics",
    icon: "Trophy",
    blurb:
      "AI-powered cricket stats and analytics on ball-by-ball Cricsheet data: ask natural-language stat questions and get answers, powered by Claude. Built with Next.js and Supabase.",
    tools: ["Next.js", "Supabase", "Claude", "Cricsheet"],
    href: "https://cricfanai-web.vercel.app",
  },
];

/* The four Hermes agents: shown on /hermes, not the main Work catalogue. */
export const hermesAgents: Project[] = [
  {
    title: "Scout",
    tag: "Admin & operations agent",
    icon: "Compass",
    blurb:
      "Carries my household's operational load: researches and shortlists travel, appointments, and renewals, then waits for my yes before it books or pays. Handles routine calls, triages its own inbox, and sends a daily sports briefing, with its own email address and Google Workspace.",
    tools: ["Hermes Agent", "Google Workspace", "AgentMail"],
  },
  {
    title: "Heath",
    tag: "Health agent",
    icon: "Activity",
    blurb:
      "My health coach, not a dashboard. Pulls Glooko, WHOOP, and DEXA data into one picture, holds an actual point of view on what to do next, and reaches out proactively when something's worth acting on. It won't touch insulin dosing (that stays with my endocrinologist), but it'll build the evidence case for that conversation.",
    tools: ["Hermes Agent", "WHOOP API", "Glooko"],
    href: "https://dbunn117.github.io/health-dashboard/",
  },
  {
    title: "Paula",
    tag: "Parenting agent",
    icon: "Baby",
    blurb:
      "A parenting coach for our toddlers, not a search engine for activity ideas. It has opinions about what to try next, tracks whether it worked, and keeps a living playbook of scripts and activities that gets sharper as it learns what actually works for each kid individually.",
    tools: ["Hermes Agent", "Obsidian", "Telegram"],
  },
  {
    title: "Podcast OS",
    tag: "Personal digest",
    icon: "Podcast",
    blurb:
      "Pulls RSS history for my favorite shows (All-In, Prof G Markets, Diary of a CEO, and more), summarizes each episode, and flags what's actually relevant to me or Alpha Infra: always current, never a backlog.",
    tools: ["Python", "RSS", "Static site"],
    href: "https://dbunn117.github.io/podcast-digest/",
  },
];
