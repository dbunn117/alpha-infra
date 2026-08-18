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
      "A zero-to-one tool that blends macro-economic data with LLMs to give investment teams instant competitive assessments and strategic roadmaps when evaluating new markets to acquire in.",
    tools: ["LLMs", "Macro-economic data", "Python", "Agentic analysis"],
  },
  {
    title: "Dynamic Financial Modeling",
    tag: "Financial modeling",
    icon: "Calculator",
    blurb:
      "Financial models rebuilt in Claude Code instead of spreadsheets — dynamic, visually rich, and interactive. Stakeholders explore scenarios and drill into the drivers instead of squinting at a static grid of cells, so the model becomes something people actually engage with.",
    tools: ["Claude Code", "Financial modeling", "Interactive apps"],
  },
  {
    title: "Asset Map Dashboard",
    tag: "Real estate · BI",
    icon: "Map",
    blurb:
      "A dynamic, interactive map of an entire real-estate portfolio. Plot every owned asset across markets, resize market bubbles on the fly by metrics like square footage and rent PSF, and drill into asset-manager and tenant detail.",
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
      "Coordinated third-party vendors and internal business users to build a web application supporting the acquisitions process — from data cleansing through a front-end app that speeds up diligence.",
    tools: ["Claude Code", "Data cleansing", "Front-end app"],
  },
  {
    title: "Shared-Inbox Triage Agent",
    tag: "Agentic ops",
    icon: "Inbox",
    blurb:
      "An agent that triages high-volume shared inboxes — reading, classifying, and routing (or auto-actioning) incoming mail so the right item reaches the right person instead of piling up in a queue.",
    tools: ["Claude", "Copilot Studio", "Power Automate"],
  },
  {
    title: "Doc Ingestion → Database → Live Dashboard",
    tag: "Data pipeline · BI",
    icon: "FileStack",
    blurb:
      "A pipeline that ingests documents — sales and lease comps, or any structured doc — extracts the data with AI, writes it to a database, and refreshes a live visualization. Powers deal-volume analysis by region and property type, updated as new comps land.",
    tools: ["AI extraction", "SQL", "Power BI", "Power Automate"],
  },
  {
    title: "Accounts-Payable Automation",
    tag: "Finance automation",
    icon: "Receipt",
    blurb:
      "An AP workflow that ingests invoices from a shared mailbox, extracts and validates the details, and automates the weekly wire-request package sent to the third-party administrator — turning a manual, error-prone process into a reliable scheduled run.",
    tools: ["AI extraction", "Power Automate", "n8n"],
  },
  {
    title: "Business Review & Lookback Apps",
    tag: "Interactive dashboards",
    icon: "BarChart3",
    blurb:
      "Highly dynamic, interactive business-review and lookback apps that give leadership real-time visibility into the key drivers of performance — slice by segment, drill into detail, and see what's actually moving the numbers, not a static monthly deck.",
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
