/*
 * Site-wide content + config. Homepage section copy is transcribed verbatim
 * from the copy deck (docs/website-copy-and-names.md). Config values read from
 * environment variables with sensible, clearly-marked fallbacks.
 */

export const site = {
  name: "North Alpha",
  tagline: "Your true north for AI advantage.",
  description:
    "Practical AI strategy, audits, coaching, and hands-on enablement for small businesses, teams, and the professionals who run them.",
  founder: "David Bunn",
  // Config — override via env (.env.local). See .env.example.
  ownerEmail: process.env.OWNER_EMAIL ?? "davibunn@gmail.com",
  linkedin:
    process.env.NEXT_PUBLIC_LINKEDIN_URL ??
    "https://www.linkedin.com/in/davidkcbunn",
  bookingUrl: process.env.NEXT_PUBLIC_BOOKING_URL ?? "",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "https://northalpha.ai",
} as const;

export const nav = {
  links: [
    { label: "Services", href: "/services" },
    { label: "Pricing", href: "/#pricing" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
} as const;

export const hero = {
  eyebrow: "Humans + AI, redesigned around judgment",
  headline: "Put your people where judgment matters. Let AI handle the rest.",
  subhead:
    "Practical AI strategy, audits, coaching, and hands-on enablement for small businesses, teams, and the professionals who run them. We help you find the real wins, redesign the workflow around them, and build the tools to make it stick.",
  primaryCta: "Book a discovery call",
  secondaryCta: "See how we help",
  stats: [
    { value: "Weeks, not quarters", label: "to first working automation" },
    { value: "4–8", label: "people per workshop, hands-on" },
    { value: "1", label: "partner, start to finish" },
  ],
} as const;

export const problem = {
  heading: "Most teams are drowning in work AI could already be doing.",
  body: "Repetitive, manual, high-volume tasks quietly eat your team's best hours — the exact hours you'd rather spend on judgment, relationships, and decisions. The winners in this shift aren't the ones with the most tools. They're the ones who redesign how work flows: people move into the high-judgment, critical roles, and AI agents carry the repeatable load. That's the whole game, and it's what we do with you.",
} as const;

export const offerings = {
  heading: "Start where you are. Grow as far as you want.",
  intro:
    "Seven ways to work together — from a fast first win to a full strategy for the road ahead, plus the builds that make it real.",
} as const;

export const howItWorks = {
  heading: 'A clear path from "where do we start?" to "this is running."',
  steps: [
    {
      order: "01",
      title: "Discover",
      body: "We learn how your team really works and where AI creates the most value, fastest.",
    },
    {
      order: "02",
      title: "Redesign",
      body: "We map the target-state workflow: people on judgment, agents on the repeatable load.",
    },
    {
      order: "03",
      title: "Build",
      body: "We build the agents, skills, and automations — or teach your team to build them.",
    },
    {
      order: "04",
      title: "Enable & adapt",
      body: "We coach, hand off, and stay close through follow-up so adoption actually sticks.",
    },
  ],
} as const;

export const pricing = {
  heading: "Transparent pricing. Real outcomes.",
  intro:
    "Start small and tactical or go all-in on strategy — every engagement is designed to lead to the next. Prices below are starting points; audits and strategy are scoped to your team.",
  // Each row references a service slug for name/price/highlight; blurb is the
  // pricing-specific line from the copy deck.
  rows: [
    {
      slug: "enablement",
      blurb:
        "One high-volume process, automated — or a session teaching your team to build it.",
    },
    {
      slug: "workshops",
      blurb: "Hands-on, up to ~8 people, building reusable tools together.",
    },
    {
      slug: "coaching",
      blurb: "Tailored to executives or analysts.",
    },
    {
      slug: "audit",
      blurb: "Fixed-scope workflow audit and redesign plan.",
    },
    {
      slug: "strategy",
      blurb: "Leadership engagement + phased roadmap; optional ongoing advisory.",
    },
    {
      slug: "dashboards",
      blurb:
        "A live, interactive dashboard wired to your data; optional maintenance from $500/mo.",
    },
    {
      slug: "data",
      blurb: "Uncover, organize, and analyze your hidden data to drive growth.",
    },
  ],
  footnote:
    'Ask about value-based pricing (fees tied to the savings we create) and adding 30–90 days of follow-up "office hours" to any workshop or build.',
} as const;

export const aboutBlock = {
  heading: "One partner, from first win to full strategy.",
  body: "I'm David Bunn — a finance and operations leader who spent a decade at PwC, a venture-backed startup, and a real estate private equity firm before AI changed what a small team could do. Today my day job is the work North Alpha does: building AI-powered reporting workflows that cut manual effort by 80%, LLM-driven analysis tools, and interactive dashboards that leaders actually open. I'm BIDA®-certified in business intelligence and a (currently inactive) CPA. My belief is simple: AI is at its best when it frees people to do the high-judgment work only they can do. Whether you need a single automation, a team that can build its own, or a strategy for the years ahead, you work directly with me — not a handoff to junior staff.",
  credibility: [
    "10+ years in finance & operations",
    "PwC",
    "Major League Cricket (early employee)",
    "Private equity",
    "BIDA® Certified",
    "CPA (inactive)",
  ],
} as const;

export const tools = {
  eyebrow: "Tools & platforms",
  heading: "Built with the right tools for the job.",
  intro:
    "Vendor-agnostic and hands-on — we build with the AI models and automation platforms that fit your stack, not a single favorite.",
  groups: [
    { label: "AI & LLMs", items: ["Claude", "ChatGPT", "Claude Code", "Gemini"] },
    { label: "Automation", items: ["Copilot Studio", "Power Automate", "n8n"] },
    { label: "Data & BI", items: ["Power BI", "Python", "SQL", "Power Query"] },
  ],
} as const;

export const socialProof = {
  heading: "What people say after working together.",
  note: "Placeholder cards — real testimonials will be added as they're collected.",
} as const;

export const finalCta = {
  heading: "Ready to find your first AI win?",
  subhead:
    "Book a 30-minute discovery call, or send a note and I'll get back to you. No pressure, no jargon — just a clear next step.",
  primaryCta: "Book a discovery call",
  secondaryCta: "Send a message",
} as const;

export const contact = {
  heading: "Tell me what you're working on.",
  interests: [
    "Team Enablement",
    "Workshop",
    "1:1 Coaching",
    "AI Audit",
    "AI Strategy",
    "Not sure yet",
  ],
  button: "Send message",
  success: "Thanks — your message is in. I'll reply within one business day.",
} as const;

export const aboutPage = {
  eyebrow: "About North Alpha",
  h1: "I help teams put people where judgment matters — and let AI do the rest.",
  subhead:
    "North Alpha is a one-person AI consulting practice run by David Bunn. You work directly with me, start to finish.",
  sections: [
    {
      heading: "My background",
      body: "I've spent over a decade at the intersection of finance, operations, and data. I trained as an auditor at PwC — where I led US GAAP integrated audits for a $25B+ market-cap client and was consistently rated Tier 1 — then helped build a venture-backed startup from the ground up as one of its first employees, supporting a $120M Series A. Along the way I've owned financial models, redesigned reporting from source systems to the boardroom, and learned how real organizations actually make decisions.",
    },
    {
      heading: "Where AI comes in",
      body: "For the last few years my work has centered on innovation: driving AI projects, reimagining how work flows, and replacing manual processes with scalable systems. In practice that has meant building AI-powered reporting workflows that cut manual data work by ~80%, an LLM-driven market-diligence tool that gives investment teams instant competitive assessments, and dynamic, interactive dashboards that let teams drill from the big picture down to a single asset. I'm BIDA®-certified in business intelligence and analysis, a CPA (currently inactive), and I've completed Level I of the CFA program.",
    },
    {
      heading: "Why North Alpha",
      body: "I started North Alpha because I kept seeing the same thing: capable teams buried in repetitive work, sitting on data they never use, making today's decisions on last week's numbers. The technology to fix that is finally here — but tools alone don't change anything. It takes someone who understands both the technology and how a business actually runs to redesign the work around it. That's the gap I fill.",
    },
    {
      heading: "How I work",
      body: "Direct, practical, and honest. No jargon, no junior-staff handoffs, no boiling the ocean. We find a real win, build it, and let it lead to the next one. My north star is simple: use AI to free your people for the high-judgment work only they can do.",
    },
  ],
  ctaLine: "Let's find your first win.",
} as const;

export const footer = {
  tagline: "Your true north for AI advantage.",
  links: [
    { label: "Services", href: "/services" },
    { label: "Pricing", href: "/#pricing" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
} as const;
