/*
 * Catalogue of David's AI work. Professional projects are confidential
 * (described, no external links). Personal projects link out where public;
 * `image` points at a screenshot in /public/shots (degrades to a placeholder
 * if absent). `internalHref` links to an on-page section (the flagship demo).
 */

export type Project = {
  title: string;
  blurb: string;
  tools: string[];
  tag: string;
  icon: string; // lucide icon name
  href?: string; // external live link
  internalHref?: string; // on-page anchor (e.g. the interactive demo)
  image?: string; // /shots/*.png
  linkLabel?: string;
  group?: string; // personal projects only - see PERSONAL_PROJECT_GROUPS
};

export const professionalProjects: Project[] = [
  {
    title: "Market Selection Tool",
    tag: "Investment strategy",
    icon: "Globe2",
    blurb:
      "Weights and scores macro-economic and demographic data into a market scorecard, then uses AI to write the narrative behind the trends: nationally, by market, and by property sector.",
    tools: ["Claude Code", "Macro-economic data", "Python", "Agentic analysis"],
  },
  {
    title: "Dynamic Financial Modeling",
    tag: "Financial modeling",
    icon: "Calculator",
    blurb:
      "Financial models rebuilt in Claude Code: stakeholders explore scenarios and get answers in real time, instead of waiting days for an update.",
    tools: ["Claude Code", "Financial modeling", "Interactive apps"],
  },
  {
    title: "Asset Map Explorer",
    tag: "Real estate · BI",
    icon: "Map",
    blurb:
      "An interactive map of an entire real-estate portfolio: resize market bubbles by metrics like square footage or rent PSF and drill into tenant detail.",
    tools: ["Claude Code", "Leaflet", "Interactive apps"],
  },
  {
    title: "AI Resource Hub",
    tag: "AI education",
    icon: "BookOpen",
    blurb:
      "An internal hub for staying current on AI, with the latest news pulled in automatically on a scheduled Codex run, alongside curated learning paths, prompt techniques, thought leaders, and research.",
    tools: ["Codex", "Scheduled automation", "Knowledge base"],
  },
  {
    title: "Deal-Flow Reporting",
    tag: "Capital markets · BI",
    icon: "TrendingUp",
    blurb:
      "Feeds hundreds of weekly \"call for offers\" emails into a Power Automate workflow and a shared database, then charts deal volume by region and property type in Power BI, giving capital-markets teams a read on recent activity before deciding when to bring a new deal to market.",
    tools: ["Power Automate", "Power BI", "SharePoint"],
  },
  {
    title: "Due-Diligence Drafting System",
    tag: "Investor relations · diligence",
    icon: "ClipboardCheck",
    blurb:
      "About 4,000 past question-and-answer pairs ingested and tagged by fund, date, client, and more. When a new questionnaire arrives, the system drafts the answers from precedent, with three years of history side by side, so investor relations reviews and edits instead of starting from a blank page.",
    tools: ["Claude Code", "Semantic search", "Investor relations"],
  },
  {
    title: "Variance Analysis Tool",
    tag: "Accounting · month-end",
    icon: "Calculator",
    blurb:
      "Takes raw general-ledger extracts for about 50 properties and does the math and the logic in a web app: investigation thresholds by property and by account, a clear view of which ones need an explanation, and AI-drafted commentary for each flagged account from the GL detail. The team reviews and edits, edits persist, and the final variance package exports.",
    tools: ["Claude Code", "Claude API", "Interactive apps"],
  },
  {
    title: "Shared-Inbox Triage Automation",
    tag: "Email automation",
    icon: "Inbox",
    blurb:
      "Routes high-volume shared-inbox mail through Power Automate workflows, rule-based where the pattern is clear, AI-classified where judgment is needed, so the right item reaches the right person automatically.",
    tools: ["Power Automate", "AI classification", "Copilot Studio"],
  },
  {
    title: "Doc Ingestion → Queryable Database",
    tag: "Data pipeline",
    icon: "FileStack",
    blurb:
      "Ingests documents like sales and lease comps and extracts the data with AI, pushing it into a database that's queryable by an AI or agent built on top.",
    tools: ["AI extraction", "Power Automate"],
  },
  {
    title: "Accounts-Payable Automation",
    tag: "Finance automation",
    icon: "Receipt",
    blurb:
      "Ingests invoices from a shared mailbox, extracts and validates the details, and automates the weekly wire-request package: a manual process turned scheduled run.",
    tools: ["AI extraction", "Power Automate"],
  },
  {
    title: "Business Review & Lookback Apps",
    tag: "Interactive apps",
    icon: "BarChart3",
    blurb:
      "Lets portfolio managers compare each asset's actual performance against its underwriting model, spot outperformers and underperformers at a glance, and drill into what's actually driving that performance: interactive and visual instead of a static variance report.",
    tools: ["Claude Code", "Interactive apps"],
  },
];

export const PERSONAL_PROJECT_GROUPS: { label: string; note?: string }[] = [
  { label: "Sports & market intelligence" },
  {
    label: "Hermes: personal agent platform",
    note: "Scout, Heath, and Paula each maintain their own folder in my Obsidian vault: durable memory that gives them context, builds history, and lets them get sharper over time instead of starting from zero every conversation. It's the same idea I'd bring to a business: a shared knowledge base that makes the whole system smarter as it goes, not just smart at launch.",
  },
];

export const personalProjects: Project[] = [
  {
    title: "CricFan AI",
    tag: "Sports analytics",
    icon: "Trophy",
    group: "Sports & market intelligence",
    blurb:
      "AI-powered cricket stats and analytics on ball-by-ball Cricsheet data: ask natural-language stat questions and get answers, powered by Claude. Built with Next.js and Supabase.",
    tools: ["Next.js", "Supabase", "Claude", "Cricsheet"],
    href: "https://cricfanai-web.vercel.app",
  },
  {
    title: "PitchMap",
    tag: "Sports market intelligence",
    icon: "Globe2",
    group: "Sports & market intelligence",
    blurb:
      "Scores and ranks US markets for cricket business opportunity, blending Census, business-pattern, and OpenStreetMap data into audience, commercial, and infrastructure-gap signals.",
    tools: ["Python", "Census & public data", "OpenStreetMap", "Interactive maps"],
    href: "https://dbunn117.github.io/pitchmap/",
  },
  {
    title: "Scout",
    tag: "Admin & operations agent",
    icon: "Compass",
    group: "Hermes: personal agent platform",
    blurb:
      "Carries my household's operational load: researches and shortlists travel, appointments, and renewals, then waits for my yes before it books or pays. Handles routine calls, triages its own inbox, and sends a daily sports briefing, with its own email address and Google Workspace.",
    tools: ["Hermes Agent", "Google Workspace", "AgentMail"],
  },
  {
    title: "Heath",
    tag: "Health agent",
    icon: "Activity",
    group: "Hermes: personal agent platform",
    blurb:
      "My health coach, not a dashboard. Pulls Glooko, WHOOP, and DEXA data into one picture, holds an actual point of view on what to do next, and reaches out proactively when something's worth acting on. It won't touch insulin dosing (that stays with my endocrinologist), but it'll build the evidence case for that conversation.",
    tools: ["Hermes Agent", "WHOOP API", "Glooko"],
    href: "https://dbunn117.github.io/health-dashboard/",
  },
  {
    title: "Paula",
    tag: "Parenting agent",
    icon: "Baby",
    group: "Hermes: personal agent platform",
    blurb:
      "A parenting coach for our toddlers, not a search engine for activity ideas. It has opinions about what to try next, tracks whether it worked, and keeps a living playbook of scripts and activities that gets sharper as it learns what actually works for each kid individually.",
    tools: ["Hermes Agent", "Obsidian", "Telegram"],
  },
  {
    title: "Podcast OS",
    tag: "Personal digest",
    icon: "Podcast",
    group: "Hermes: personal agent platform",
    blurb:
      "Pulls RSS history for my favorite shows (All-In, Prof G Markets, Diary of a CEO, and more), summarizes each episode, and flags what's actually relevant to me or Alpha Infra: always current, never a backlog.",
    tools: ["Python", "RSS", "Static site"],
    href: "https://dbunn117.github.io/podcast-digest/",
  },
  {
    title: "Personal CRM from LinkedIn",
    tag: "Personal agent",
    icon: "Users",
    group: "Hermes: personal agent platform",
    blurb:
      "A personal CRM built from my own LinkedIn connection data: structured, searchable, and enriched so I can actually work my network instead of scrolling it.",
    tools: ["Python", "LLMs", "Data enrichment"],
  },
];

export function personalProjectsByGroup(group: string): Project[] {
  return personalProjects.filter((p) => p.group === group);
}
