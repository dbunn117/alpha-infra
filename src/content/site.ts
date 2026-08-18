/*
 * Site-wide content + config. Homepage section copy is transcribed verbatim
 * from the copy deck (docs/website-copy-and-names.md). Config values read from
 * environment variables with sensible, clearly-marked fallbacks.
 */

export const site = {
  name: "Alpha Infra",
  legalName: "Alpha Infra LLC",
  tagline: "AI foundations that drive meaningful growth.",
  description:
    "Custom AI systems that turn the data scattered across your business into revenue, insight, and better service — built for small and mid-sized businesses ready to move the needle.",
  founder: "David Bunn",
  // Config — override via env (.env.local). See .env.example.
  ownerEmail: process.env.OWNER_EMAIL ?? "davibunn@gmail.com",
  linkedin:
    process.env.NEXT_PUBLIC_LINKEDIN_URL ??
    "https://www.linkedin.com/in/davidkcbunn",
  bookingUrl: process.env.NEXT_PUBLIC_BOOKING_URL ?? "",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "https://alphainfra.ai",
} as const;

export const nav = {
  links: [
    { label: "Services", href: "/services" },
    { label: "Work", href: "/work" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
} as const;

export const hero = {
  eyebrow: "Practical AI systems for growing businesses",
  headline: "Unlock the value hiding in the systems you already run.",
  subhead:
    "I bring the data scattered across your CRM, ops, finance, and email into one cohesive AI system — built to help you serve customers better, grow revenue, and finally see what's really happening in your business.",
  primaryCta: "Book a discovery call",
  secondaryCta: "See how I help",
  stats: [
    { value: "$25B+", label: "market-cap audit client at PwC" },
    { value: "10+ yrs", label: "in finance, operations & data before AI" },
    { value: "Jul 2026", label: "system live in daily use at Entec Access Systems" },
  ],
} as const;

export const problem = {
  heading: "Most teams are drowning in work AI could already be doing.",
  body: "Repetitive, manual, high-volume tasks quietly eat your team's best hours — the exact hours you'd rather spend on judgment, relationships, and decisions. The winners in this shift aren't the ones with the most tools. They're the ones who redesign how work flows: people move into the high-judgment, critical roles, and AI agents carry the repeatable load. That's the whole game, and it's what I do with you.",
} as const;

export const offerings = {
  heading: "Start where you are. Grow as far as you want.",
  intro:
    "Two ways to start: a fast win, or the full system. As we work together, some clients bring me in to train their team or shape AI strategy at the leadership level.",
  footnote:
    'Ask about value-based pricing (fees tied to the savings I create) and adding 30–90 days of follow-up "office hours" to any workshop or build.',
} as const;

export const howItWorks = {
  heading: 'A clear path from "where do I start?" to "this is running."',
  steps: [
    {
      order: "01",
      title: "Discover",
      body: "I learn how your team really works and where AI creates the most value, fastest.",
    },
    {
      order: "02",
      title: "Redesign",
      body: "I map the target-state workflow: people on judgment, agents on the repeatable load.",
    },
    {
      order: "03",
      title: "Build",
      body: "I build the agents, skills, and automations — or teach your team to build them.",
    },
    {
      order: "04",
      title: "Enable & adapt",
      body: "I coach, hand off, and stay close through follow-up so adoption actually sticks.",
    },
  ],
} as const;

export const fitCheck = {
  eyebrow: "Is this you?",
  heading: "Who this is for.",
  intro:
    "I'm selective about the businesses I take on, because the work only pays off when it's a real fit.",
  forYou: [
    {
      title: "Your data lives in three or more places, and nobody has the full picture.",
      body: "CRM, spreadsheets, email, accounting software that don't talk to each other — you're piecing the real picture together by hand, or not seeing it at all.",
    },
    {
      title: "You know there's revenue or margin hiding in your data, but no time to dig it out.",
      body: "You suspect the answer to \"what should we focus on\" is already sitting in your systems somewhere. You just don't have the tools — or the hours — to find it.",
    },
    {
      title: "The same manual process eats hours every week.",
      body: "Someone on your team is doing by hand what software should be doing for them, and it's not going away on its own.",
    },
    {
      title: "You want something built around how you actually run your business — not a generic template.",
      body: "Off-the-shelf software makes you bend your workflow to fit the tool. You want the reverse.",
    },
    {
      title: "You're ready to build, not just get diagnosed.",
      body: "You don't need another slide deck telling you what's wrong. You need it fixed.",
    },
  ],
  notForYou: [
    "You want an off-the-shelf SaaS subscription, not something built around your workflow.",
    "You need a large enterprise rollout with a formal procurement or RFP process.",
    "You already have an in-house data or engineering team that owns this.",
    "You're looking for a slide deck and a roadmap, not working software.",
    "You're not the decision-maker and can't move without multi-stakeholder sign-off.",
  ],
} as const;

export const faq = {
  eyebrow: "FAQ",
  heading: "Common questions.",
  intro:
    "Straight answers on ownership, data, and how I work. Still unsure? Book a call and ask me directly.",
  items: [
    {
      question: "Who owns the system and everything it produces?",
      answer:
        "You do — completely. The system, the code behind it, and everything it produces belong to you once the engagement is complete. I don't retain rights to it, resell it, or reuse it as a template for another client.",
    },
    {
      question: "What happens to my data, and is it secure?",
      answer:
        "Your data is used only for your engagement, never combined with another client's, and encrypted in transit and at rest. I keep only what's needed to build and maintain your system, and I'll delete or return anything else on request.",
    },
    {
      question: "Do you train AI models on my data?",
      answer:
        "No — never. The AI providers I build with (Anthropic's Claude, OpenAI, and others) don't train their models on business data sent through their commercial APIs by default, and I never use one client's data to build or improve another client's system.",
    },
    {
      question: "How accurate is the AI, and what happens when it gets something wrong?",
      answer:
        "Every system I build has review built in — AI-made matches and suggestions are always clearly marked as AI-made, never blended in as if a person made the call. You and your team stay the final check on anything that matters.",
    },
  ],
} as const;

export const aboutBlock = {
  heading: "One partner, from first win to full strategy.",
  body: "I'm David Bunn — a finance and operations leader who spent a decade at PwC, a venture-backed startup, and a real estate private equity firm before AI changed what a small team could do. Today my day job is the work Alpha Infra does: building AI-powered reporting workflows that cut manual effort by 80%, LLM-driven analysis tools, and interactive dashboards that leaders actually open. I'm BIDA®-certified in business intelligence and a (currently inactive) CPA. My belief is simple: AI is at its best when it frees people to do the high-judgment work only they can do. Whether you need a single automation, a team that can build its own, or a strategy for the years ahead, you work directly with me — not a handoff to junior staff.",
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
    "Vendor-agnostic and hands-on — I build with the AI models and automation platforms that fit your stack, not a single favorite.",
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
    "Custom AI System",
    "Quick Win",
    "Workshop",
    "1:1 Coaching",
    "AI Strategy",
    "Not sure yet",
  ],
  button: "Send message",
  success: "Thanks — your message is in. I'll reply within one business day.",
} as const;

export const aboutPage = {
  eyebrow: "About Alpha Infra",
  h1: "I help teams put people where judgment matters — and let AI do the rest.",
  subhead:
    "Alpha Infra is a one-person AI consulting practice run by David Bunn. You work directly with me, start to finish.",
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
      heading: "Why Alpha Infra",
      body: "I started Alpha Infra because I kept seeing the same thing: capable teams buried in repetitive work, sitting on data they never use, making today's decisions on last week's numbers. The technology to fix that is finally here — but tools alone don't change anything. It takes someone who understands both the technology and how a business actually runs to redesign the work around it. That's the gap I fill.",
    },
    {
      heading: "How I work",
      body: "Direct, practical, and honest. No jargon, no junior-staff handoffs, no boiling the ocean. I find a real win, build it, and let it lead to the next one. My north star is simple: use AI to free your people for the high-judgment work only they can do.",
    },
  ],
  ctaLine: "Let's find your first win.",
} as const;

export const footer = {
  tagline: "AI foundations that drive meaningful growth.",
  links: [
    { label: "Services", href: "/services" },
    { label: "Work", href: "/work" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
} as const;
