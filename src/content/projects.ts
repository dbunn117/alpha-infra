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
};

export const professionalProjects: Project[] = [
  {
    title: "Market Selection Tool",
    tag: "Investment strategy",
    icon: "Globe2",
    blurb:
      "Blends macro-economic data with LLMs to give investment teams instant competitive assessments when evaluating new markets to acquire in.",
    tools: ["LLMs", "Macro-economic data", "Python", "Agentic analysis"],
  },
  {
    title: "Dynamic Financial Modeling",
    tag: "Financial modeling",
    icon: "Calculator",
    blurb:
      "Financial models rebuilt in Claude Code instead of spreadsheets — interactive, so stakeholders explore scenarios instead of squinting at a grid of cells.",
    tools: ["Claude Code", "Financial modeling", "Interactive apps"],
  },
  {
    title: "Asset Map Dashboard",
    tag: "Real estate · BI",
    icon: "Map",
    blurb:
      "An interactive map of an entire real-estate portfolio — resize market bubbles by metrics like square footage or rent PSF and drill into tenant detail.",
    tools: ["Geospatial viz", "Power BI", "Interactive dashboards"],
    internalHref: "#asset-map",
    linkLabel: "Try the interactive demo",
  },
  {
    title: "AI Resource Hub & Automated Reporting",
    tag: "Workflow automation",
    icon: "Workflow",
    blurb:
      "Automated reporting workflows and an internal AI resource hub built with Claude Code and Copilot Studio — cutting manual data-extraction time by roughly 80% for capital-markets teams.",
    tools: ["Claude Code", "Copilot Studio", "Power Query"],
  },
  {
    title: "Acquisitions Due-Diligence App",
    tag: "Diligence · web app",
    icon: "ClipboardCheck",
    blurb:
      "A web app supporting the acquisitions process end-to-end — from data cleansing to a front end that speeds up diligence.",
    tools: ["Claude Code", "Data cleansing", "Front-end app"],
  },
  {
    title: "Shared-Inbox Triage Agent",
    tag: "Agentic ops",
    icon: "Inbox",
    blurb:
      "Triages high-volume shared inboxes — reads, classifies, and routes (or auto-actions) mail so the right item reaches the right person.",
    tools: ["Claude", "Copilot Studio", "Power Automate"],
  },
  {
    title: "Doc Ingestion → Database → Live Dashboard",
    tag: "Data pipeline · BI",
    icon: "FileStack",
    blurb:
      "Ingests documents like sales and lease comps, extracts the data with AI, and refreshes a live deal-volume dashboard as new comps land.",
    tools: ["AI extraction", "SQL", "Power BI", "Power Automate"],
  },
  {
    title: "Accounts-Payable Automation",
    tag: "Finance automation",
    icon: "Receipt",
    blurb:
      "Ingests invoices from a shared mailbox, extracts and validates the details, and automates the weekly wire-request package — a manual process turned scheduled run.",
    tools: ["AI extraction", "Power Automate", "n8n"],
  },
  {
    title: "Business Review & Lookback Apps",
    tag: "Interactive dashboards",
    icon: "BarChart3",
    blurb:
      "Interactive business-review apps that give leadership real-time visibility into performance — slice by segment instead of reading a static monthly deck.",
    tools: ["Interactive dashboards", "Power BI", "Data modeling"],
  },
];

export const personalProjects: Project[] = [
  {
    title: "CricFan AI",
    tag: "Sports analytics",
    icon: "Trophy",
    blurb:
      "AI-powered cricket stats and analytics on ball-by-ball Cricsheet data — ask natural-language stat questions and get answers, powered by Claude. Built with Next.js and Supabase.",
    tools: ["Next.js", "Supabase", "Claude", "Cricsheet"],
    href: "https://cricfanai-web.vercel.app",
  },
  {
    title: "Podcast OS",
    tag: "Personal dashboard",
    icon: "Podcast",
    blurb:
      "A daily podcast digest dashboard that pulls RSS history for my favorite shows (All-In, Prof G Markets, Diary of a CEO, and more) into one interactive, always-current view.",
    tools: ["Python", "RSS", "Static site"],
    href: "https://dbunn117.github.io/podcast-digest/",
  },
  {
    title: "Health Dashboard",
    tag: "Personal data",
    icon: "Activity",
    blurb:
      "A mobile-friendly dashboard that normalizes Dexcom G7 / Omnipod and WHOOP data into one live view — generated automatically by my personal Hermes agent from CSV exports and the WHOOP API.",
    tools: ["Python", "WHOOP API", "SQLite", "Hermes agent"],
    href: "https://dbunn117.github.io/health-dashboard/",
  },
  {
    title: "Rental Ranking App",
    tag: "Decision tool",
    icon: "Home",
    blurb:
      "A Next.js app that loads holiday-rental options from a CSV and lets you rate, sort, and compare them — turning a messy spreadsheet decision into a clean, rankable interface.",
    tools: ["Next.js", "TypeScript", "CSV"],
    href: "https://rental-ranking-app.vercel.app",
  },
  {
    title: "Data-Warehouse Financial Model",
    tag: "Finance tooling",
    icon: "Database",
    blurb:
      "A web-based financial model backed by a structured data warehouse — bringing spreadsheet-grade modeling into a maintainable, queryable app.",
    tools: ["JavaScript", "Data modeling", "Vercel"],
    href: "https://data-warehouse-financial-model.vercel.app",
  },
  {
    title: "Personal CRM from LinkedIn",
    tag: "Personal agent",
    icon: "Users",
    blurb:
      "A personal CRM built from my own LinkedIn connection data — structured, searchable, and enriched so I can actually work my network instead of scrolling it.",
    tools: ["Python", "LLMs", "Data enrichment"],
  },
  {
    title: "Hermes — Call Agent",
    tag: "Agent",
    icon: "PhoneCall",
    blurb:
      "A voice-capable agent in my personal Hermes setup that can place phone calls on my behalf — handling routine calls end-to-end so I don't have to.",
    tools: ["Voice AI", "Agents", "Automation"],
  },
  {
    title: "Hermes — Daily Sports Digest",
    tag: "Agent",
    icon: "Newspaper",
    blurb:
      "A Hermes agent that assembles and sends me a personalized sports digest every morning — the scores, storylines, and teams I care about, without the noise.",
    tools: ["Agents", "Scheduling", "Summarization"],
  },
];
