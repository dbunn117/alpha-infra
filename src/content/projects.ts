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
      "Financial models rebuilt in Claude Code instead of spreadsheets — stakeholders explore scenarios and get answers in real time instead of waiting days for the model to be updated, in a format that's far more visual and easier to digest than a grid of cells.",
    tools: ["Claude Code", "Financial modeling", "Interactive apps"],
  },
  {
    title: "Asset Map Dashboard",
    tag: "Real estate · BI",
    icon: "Map",
    blurb:
      "An interactive map of an entire real-estate portfolio — resize market bubbles by metrics like square footage or rent PSF and drill into tenant detail.",
    tools: ["Geospatial viz", "Power BI", "Interactive dashboards"],
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
    tag: "Investor relations · diligence",
    icon: "ClipboardCheck",
    blurb:
      "Surfaces how the team answered the same due-diligence questions before, so investor relations can draft responses to new questionnaires from precedent instead of a blank page.",
    tools: ["Claude Code", "Semantic search", "Investor relations"],
  },
  {
    title: "Shared-Inbox Triage Automation",
    tag: "Email automation",
    icon: "Inbox",
    blurb:
      "Mostly rules-based Power Automate flows that read, classify, and route high-volume shared-inbox mail — with AI steps where a prompt decides what a message actually is, so the right item reaches the right person.",
    tools: ["Power Automate", "AI classification", "Copilot Studio"],
  },
  {
    title: "Doc Ingestion → Database → Live Dashboard",
    tag: "Data pipeline · BI",
    icon: "FileStack",
    blurb:
      "Ingests documents like sales and lease comps, extracts the data with AI, and refreshes a live deal-volume dashboard as new comps land.",
    tools: ["AI extraction", "Power BI", "Power Automate"],
  },
  {
    title: "Accounts-Payable Automation",
    tag: "Finance automation",
    icon: "Receipt",
    blurb:
      "Ingests invoices from a shared mailbox, extracts and validates the details, and automates the weekly wire-request package — a manual process turned scheduled run.",
    tools: ["AI extraction", "Power Automate"],
  },
  {
    title: "Business Review & Lookback Apps",
    tag: "Interactive dashboards",
    icon: "BarChart3",
    blurb:
      "Lets portfolio managers compare each asset's actual performance against its underwriting model — interactive and visual instead of a static variance report.",
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
    title: "PitchMap",
    tag: "Sports market intelligence",
    icon: "Globe2",
    blurb:
      "Scores and ranks US markets for cricket business opportunity — blending Census, business-pattern, and OpenStreetMap data into audience, commercial, and infrastructure-gap signals.",
    tools: ["Python", "Census & public data", "OpenStreetMap", "Interactive maps"],
    href: "https://dbunn117.github.io/pitchmap/",
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
