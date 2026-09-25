/*
 * David Bunn: experience timeline and skills for /about (from résumé, June
 * 2026). The old portfolio profile object (tagline, summary, stat strip) was
 * removed on 2026-09-25: nothing rendered it, and the About copy in
 * content/site.ts is the source for the bio. Public contact is email +
 * LinkedIn only; no phone or home address per privacy.
 */

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
    title: "Senior Associate, then Manager",
    dates: "Jan 2016 to Apr 2021",
    bullets: [
      "Managed audit workstreams on a $25B+ market-cap e-commerce client's US GAAP integrated audit, as one of four managers on the engagement team.",
      "Worked across finance, IT, valuations, and tax to understand the systems and judgments behind the reported numbers.",
    ],
  },
];

/* Two halves, so the reader can tell what David brings from what he builds
   with. Reader feedback (2026-09-23): one flat grid with a "Training" box
   read as a confused mix of experience and stack. */
export const skillSets: { heading: string; marks?: boolean; groups: { label: string; items: string[] }[] }[] = [
  {
    heading: "What I bring",
    groups: [
  {
    label: "Business and finance",
    items: ["Strategy", "FP&A", "Financial modeling", "Operating processes", "Investment analysis", "Diligence and valuation"],
  },
  {
    label: "Credentials",
    items: ["California CPA (inactive)", "BIDA® Certified", "CFA Program Level I completed", "BCom Honours in Accounting Sciences"],
  },
    ],
  },
  {
    heading: "What I build with",
    marks: true,
    groups: [
  {
    label: "Data and software",
    items: ["Python", "SQL", "Power BI and Power Query", "Claude Code"],
  },
  {
    label: "AI and automation",
    items: ["Claude", "Copilot Studio", "Power Automate", "n8n"],
  },
  {
    label: "Platforms",
    items: ["Supabase", "Vercel", "GitHub"],
  },
    ],
  },
];
