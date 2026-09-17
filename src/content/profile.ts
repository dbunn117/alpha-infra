/*
 * David Bunn: profile content (from résumé, June 2026). Single source for the
 * hero, about, experience timeline, and skills sections. Public contact is
 * email + LinkedIn only; no phone or home address per privacy.
 */

export const profile = {
  name: "David Bunn",
  role: "Business consultant who builds with AI",
  location: "San Francisco Bay Area",
  email: "david@alphainfra.us",
  linkedin: "https://www.linkedin.com/in/davidkcbunn",
  github: "https://github.com/dbunn117",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "https://dbunn117.github.io/portfolio",

  tagline:
    "I help businesses solve the problems that actually move the needle (growth, operations, and the decisions leaders make) by building the AI tools to match. A decade across finance and operations keeps it grounded in how a business really runs.",

  summary:
    "I'm a business and operations consultant who builds. Across 9+ years in audit, high-growth operations, and private-equity innovation, I've learned how businesses actually make decisions; lately I've spent my time building the AI tools that make those decisions faster and sharper. What energizes me most are the front-office problems: growth, strategy, competitive positioning, and the messy operational questions in between. My finance background (CPA, inactive; CFA Program underway; BIDA-certified) is the foundation that makes what I build trustworthy, but the work I love is helping a business see and act more clearly, not just close the books.",

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
    company: "Alpha Infra",
    location: "San Francisco Bay Area",
    title: "Founder",
    dates: "Aug 2026 to present",
    bullets: [
      "Build Opportunity AI systems for lean teams making high-value decisions.",
      "Built Entec Access Systems' five-channel sales intelligence hub, in daily use since July 2026.",
      "Provide ongoing AI and technology consulting for Stockbridge Capital Group.",
    ],
  },
  {
    company: "Stockbridge Capital Group",
    location: "San Francisco, CA",
    title: "Data & Innovation Associate, CTO Team",
    dates: "Jan 2026 to Jul 2026",
    bullets: [
      "Built a Market Selection Tool that scores macroeconomic and demographic data and drafts the narrative behind the trends, by market and property sector.",
      "Built an Asset Map Explorer for investigating portfolio exposure across markets and drilling into asset and tenant detail.",
      "Rebuilt financial models as interactive apps so stakeholders could test scenarios and explore the drivers rather than wait for a spreadsheet update.",
      "Built reporting and data workflows that reduced manual extraction work by about 80 percent for capital-markets teams.",
      "Developed systems for document ingestion, diligence, variance analysis, and accounts payable, using AI where interpretation was needed and code where the work was exact.",
    ],
  },
  {
    company: "Stockbridge Capital Group",
    location: "San Francisco, CA",
    title: "Finance Associate",
    dates: "May 2023 to Dec 2025",
    bullets: [
      "Owned revenue projections across more than 35 funds and corporate expense forecasting for the CFO and Executive Committee.",
      "Rebuilt reporting flows from source systems to CFO and Executive Committee materials.",
      "Turned complex financial models into clear explanations of what had changed and what deserved attention.",
    ],
  },
  {
    company: "Major League Cricket",
    location: "San Francisco, CA",
    title: "Senior Finance Manager",
    dates: "May 2021 to Apr 2023",
    bullets: [
      "Helped build the finance function as an early hire and supported a $120M Series A through fundraising due diligence.",
      "Led long-term cash-flow forecasting and group financial-statement preparation across 12 entities.",
      "Built operating controls and approval processes as the organization grew.",
    ],
  },
  {
    company: "PricewaterhouseCoopers",
    location: "San Francisco & Johannesburg",
    title: "Manager / Senior Associate",
    dates: "Jan 2016 to Apr 2021",
    bullets: [
      "Managed audit workstreams on a $25B+ market-cap e-commerce client's US GAAP integrated audit, as one of four managers on the engagement team.",
      "Worked across finance, IT, valuations, and tax to understand the systems and judgments behind the reported numbers.",
    ],
  },
];

export const skillGroups: { label: string; items: string[] }[] = [
  {
    label: "Business and finance",
    items: ["Strategy", "FP&A", "Financial modeling", "Operating processes", "Investment analysis", "Diligence and valuation"],
  },
  {
    label: "Data and software",
    items: ["Python", "SQL", "Power BI", "Power Query", "Claude Code"],
  },
  {
    label: "AI and automation",
    items: ["Claude", "Copilot Studio", "Power Automate", "n8n"],
  },
  {
    label: "Platforms",
    items: ["Supabase", "Vercel", "GitHub"],
  },
  {
    label: "Training",
    items: ["BIDA® Certified", "California CPA (inactive)", "CFA Program Level I completed", "BCom Honours in Accounting Sciences"],
  },
];
