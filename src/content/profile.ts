/*
 * David Bunn — profile content (from résumé, June 2026). Single source for the
 * hero, about, experience timeline, and skills sections. Public contact is
 * email + LinkedIn only; no phone or home address per privacy.
 */

export const profile = {
  name: "David Bunn",
  role: "Business consultant who builds with AI",
  location: "San Francisco Bay Area",
  email: "davibunn@gmail.com",
  linkedin: "https://www.linkedin.com/in/davidkcbunn",
  github: "https://github.com/dbunn117",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "https://dbunn117.github.io/portfolio",

  tagline:
    "I help businesses solve the problems that actually move the needle — growth, operations, and the decisions leaders make — by building the AI tools to match. A decade across finance and operations keeps it grounded in how a business really runs.",

  summary:
    "I'm a business and operations consultant who builds. Across 9+ years in audit, high-growth operations, and private-equity innovation, I've learned how businesses actually make decisions — and lately I've spent my time building the AI tools that make those decisions faster and sharper. What energizes me most are the front-office problems: growth, strategy, competitive positioning, and the messy operational questions in between. My finance background — CPA, CFA-track, BIDA-certified — is the foundation that makes what I build trustworthy, but the work I love is helping a business see and act more clearly, not just close the books.",

  // Hero stat strip
  stats: [
    { value: "9+ yrs", label: "finance, audit & operations" },
    { value: "~80%", label: "manual reporting effort eliminated with AI" },
    { value: "$120M", label: "Series A supported at Major League Cricket" },
    { value: "$25B+", label: "market-cap audit client at PwC" },
  ],
} as const;

export type Experience = {
  company: string;
  location: string;
  title: string;
  dates: string;
  bullets: string[];
};

export const experience: Experience[] = [
  {
    company: "Stockbridge Capital Group",
    location: "San Francisco, CA",
    title: "Data & Innovation Associate (CTO Team)",
    dates: "Jan 2026 – Present",
    bullets: [
      "Built an AI Resource Hub and automated reporting workflows with Claude Code and Copilot Studio, cutting manual data-extraction time by ~80% for capital markets teams.",
      "Rebuilt financial models as dynamic, interactive apps in Claude Code — far more visual and explorable than static Excel workbooks, letting stakeholders test scenarios and drill into the drivers.",
      "Developed a zero-to-one Market Selection Tool leveraging macro-economic data and LLMs to give investment teams instant competitive assessments and strategic roadmaps for new acquisitions.",
      "Built a dynamic, interactive Asset Map Dashboard plotting all owned assets across markets — drill into asset-manager and tenant detail, and resize market bubbles on the fly by metrics like square footage and rent PSF.",
      "Built AI document-ingestion pipelines (sales/lease comps and other docs) that auto-write to a database and refresh live deal-volume dashboards by region and property type, plus agentic triage for high-volume shared inboxes.",
      "Automated accounts payable end-to-end — from shared-mailbox invoice ingestion to the weekly third-party wire-request package — and built dynamic business-review / lookback apps across Copilot Studio, Power Automate, and n8n.",
      "Key contact for the Acquisitions AI project, coordinating third-party vendors and internal users on data cleansing and front-end app development.",
    ],
  },
  {
    company: "Stockbridge Capital Group",
    location: "San Francisco, CA",
    title: "Finance Associate",
    dates: "May 2023 – Dec 2025",
    bullets: [
      "Owned complex revenue projections for a portfolio of 35+ funds and corporate expense forecasting — the “source of truth” for the CFO and Executive Committee.",
      "Redesigned end-to-end financial reporting flows, from source systems to board-ready presentations, using Power Query and AI tools.",
      "Prepared financial review materials for the Executive Committee and external shareholder meetings, distilling complex models into clear strategic narratives.",
    ],
  },
  {
    company: "Major League Cricket",
    location: "San Francisco, CA",
    title: "Senior Finance Manager",
    dates: "May 2021 – Apr 2023",
    bullets: [
      "Assisted in executing a $120M Series A funding round; led 10-year cash-flow forecasting and group financial-statement preparation across 12 entities.",
      "Scaled the finance function from the ground up, implementing company-wide procurement and approval frameworks through a period of high growth and ambiguity.",
      "Provided financial data and written strategic commentary for investor reporting packages.",
    ],
  },
  {
    company: "PricewaterhouseCoopers",
    location: "San Francisco & Johannesburg",
    title: "Manager / Senior Associate",
    dates: "Jan 2016 – Apr 2021",
    bullets: [
      "Led US GAAP integrated audits for a $25B+ market-cap e-commerce client; managed multi-disciplinary teams across IT, valuations, and tax.",
      "Consistently rated Tier 1 (“Exceeds Expectations”) for managing complex audit phases and budgets, reporting directly to Chief Accounting Officers.",
    ],
  },
];

export const skillGroups: { label: string; items: string[] }[] = [
  {
    label: "AI & LLM tools",
    items: ["Claude Code", "ChatGPT", "Codex", "Gemini", "Copilot Studio"],
  },
  {
    label: "Automation platforms",
    items: ["Copilot Studio", "Power Automate", "n8n"],
  },
  {
    label: "Data & BI",
    items: ["SQL", "Power BI (DAX)", "Power Query", "Python 3", "VBA"],
  },
  {
    label: "Systems",
    items: ["NetSuite", "Workday"],
  },
  {
    label: "Business & finance",
    items: [
      "Strategy & competitive analysis",
      "Operations & process design",
      "FP&A & modeling",
      "Diligence & valuation",
    ],
  },
];

export const credentials: string[] = [
  "BIDA® — Business Intelligence & Data Analyst (CFI)",
  "CPA — California (inactive)",
  "CFA Program — Level I completed",
  "BCom Honours, Accounting Sciences — University of Pretoria",
];
