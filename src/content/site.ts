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
    "AI-native systems that do the work your team still does by hand. I connect the tools you already run, write down how the business decides, and build the layer that does the recurring work, for finance, operations, and owner-led teams.",
  founder: "David Bunn",
  // Config: override via env (.env.local). See .env.example.
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
  eyebrow: "For finance, operations, and owner-led teams still doing by hand what software should do",
  headline: "The AI system that does the work your team still does by hand.",
  subhead:
    "Most teams I speak to run on a CRM, a few spreadsheets, an accounting package, and an inbox, with people moving information between them all day. I connect what you already run into one AI-native system that does that work, with your rules and your approvals built in.",
  primaryCta: "Book a discovery call",
  secondaryCta: "See how I help",
  ctaNote:
    "30 minutes. We find the work worth taking off your team first and check the data is there to do it. If it isn't, I'll say so.",
  stats: [
    { value: "$25B+", label: "market-cap audit client at PwC" },
    { value: "10+ yrs", label: "in finance, operations & data before AI" },
    { value: "Jul 2026", label: "system live in daily use at Entec Access Systems" },
  ],
} as const;

/*
 * Hero diagram: the looping ink animation beside the headline. The
 * annotation is hero.stats[2].
 */
export const inkPeak = {
  sources: [
    { id: "crm", label: "CRM" },
    { id: "sheets", label: "Spreadsheets" },
    { id: "email", label: "Email" },
    { id: "accounting", label: "Accounting" },
  ],
  systemLabel: "One running system",
  /* The three rows inside the system plate: work it does, not advice */
  actions: ["Posts the numbers", "Drafts the replies", "Flags the exceptions"],
  annotation: "in daily use since Jul 2026",
} as const;

/*
 * Homepage proof plate (first paper chapter after the peak). Pillars are
 * shared with the /work case study. TODO(David): fill `metric` with one
 * before/after number from Entec (quote turnaround, accounts recovered, or
 * hours saved per week); it renders nothing while null. `image` is the
 * blurred screenshot in public/ (account names and figures pixelated),
 * referenced through asset().
 */
export const proof = {
  client: "Entec Access Systems",
  eyebrow: "Live at Entec Access Systems since July 2026",
  heading: "A system built to drive revenue, not just show it to him.",
  context:
    "Entec is a 15-person access-systems business in the UK, 20 years old. SimPRO for jobs and quotes, Xero for the money, Outlook for everything else. None of it talked to each other, so accounts went quiet without anyone noticing and enquiries sat waiting for a quote.",
  built: "Built with Claude Code and n8n, in his accounts, over eight working sessions with the owner.",
  pillars: [
    {
      title: "Keeps recurring revenue recurring",
      body: "Every morning it reads across every account, last touchpoint, spend this year against last, whether they've gone quiet, and tells him who to call and why. Before a customer he could have kept walks.",
    },
    {
      title: "Wins more of what comes in",
      body: "Every enquiry gets flagged the moment it lands and routed for a quote inside a 48-hour target. That work used to go to whoever answered first.",
    },
    {
      title: "A real pipeline for what's next",
      body: "The businesses he wants to win next live in the system, with the public tenders and signals that say when to call, instead of in a notebook.",
    },
  ],
  /*
   * Left null until Bylo signs off a figure; renders nothing while null.
   * Preferred metric: recurring revenue recovered from accounts the
   * system flagged as gone quiet (the outcome the flagship promises).
   * Fallbacks, in order: (2) quote turnaround, e.g. "Every enquiry quoted
   * inside 48 hours, down from N days"; (3) hours per week the owner no
   * longer spends piecing the picture together by hand.
   */
  metric: null as null | { value: string; label: string },
  // e.g. { value: "£42,000", label: "recurring revenue recovered from accounts that had gone quiet" }
  image: {
    src: "/entec-sales-hub.webp",
    alt: "Entec's Sales Intelligence Hub: five sales channels on one dashboard, with today's priority actions ranked across key accounts, inbound enquiries, public tenders, and target list, plus an ask-anything panel over the live data. Account names and figures blurred.",
  } as null | { src: string; alt: string },
  link: { label: "Read the case study", href: "/work" },
} as const;

/*
 * Homepage proof strip: three things I've built, chosen for range (a
 * services business's sales system, finance operations, PE investor
 * relations). Entec is one of three, not the whole story. The full catalogue
 * lives on /work.
 */
export const proofStrip = {
  eyebrow: "Proof",
  heading: "Real systems, built and shipped.",
  intro:
    "Three of the things I've built. The rest are in the work catalogue.",
  items: [
    {
      title: "A sales system for a 15-person services business",
      body: "Reads SimPRO, Xero, and Outlook every morning, flags accounts going quiet, routes every enquiry for a quote inside 48 hours, and holds the target list. Live at Entec Access Systems since July 2026.",
      tools: "SimPRO · Xero · Outlook · Claude Code · n8n",
      image: true,
      href: "/work",
    },
    {
      title: "Accounts-payable automation for a finance team",
      body: "Invoices arrive in a shared mailbox, get read and validated by AI, and the weekly wire-request package assembles itself. A manual process turned into a scheduled run.",
      tools: "AI extraction · Power Automate",
      image: false,
      href: "/work",
    },
    {
      title: "Due-diligence app for investor relations",
      body: "Surfaces how the team answered the same diligence questions before, with a side-by-side view of how an answer has shifted over three years, so new responses start from precedent instead of a blank page.",
      tools: "Claude Code · Semantic search",
      image: false,
      href: "/work",
    },
  ],
  link: { label: "See the work catalogue", href: "/work" },
} as const;

export const principles = {
  eyebrow: "How I think about AI",
  heading: "Seven things I believe about AI in a business.",
  intro:
    "Not hype and not theory. This is how I actually think when I'm building.",
  items: [
    {
      order: "01",
      title: "Your data is a competitive advantage, if you use it.",
      body: "Most businesses collect far more data than they act on. It sits in a CRM, a spreadsheet, and an inbox and nobody looks at it until quarter end. AI is what finally makes it cheap enough to turn that data into decisions while they still matter.",
    },
    {
      order: "02",
      title: "Static artifacts are on their way out.",
      body: "A PDF or slide deck is stale the moment it's exported. Live dashboards and interactive models that update as the underlying data does are replacing the static report, so the answer is always current, not just the one from last month's review.",
    },
    {
      order: "03",
      title: "AI has a jagged edge.",
      body: "It's brilliant at some things and unreliable at others. The advantage goes to whoever designs the system that knows which is which, not whoever adopts the most tools.",
    },
    {
      order: "04",
      title: "It does the grunt work and the strategy.",
      body: "Deterministic automation handles the repeatable load. But AI beat the best chess player alive; it can reason strategically too, if it knows the rules of your business. I use it for both, with your judgment always in the loop, never replaced by it.",
    },
    {
      order: "05",
      title: "Think of AI spend like headcount, not software.",
      body: "Managing token and compute cost well is becoming a real competitive differentiator. The businesses that win will budget for AI the way they budget for people, not as a line item to minimize.",
    },
    {
      order: "06",
      title: "The benchmark is 10x, not 10%.",
      body: "If your team can process 10 quotes a day, AI should get you to 100, not 11. That's the order of magnitude I design for.",
    },
    {
      order: "07",
      title: "This is a CEO decision, not an IT ticket.",
      body: "AI strategy shapes how the business competes. It belongs with the person who owns that outcome, not buried in a tooling request.",
    },
  ],
} as const;

export const offerings = {
  heading: "Three ways to start.",
  intro:
    "One workflow, one number, or a plan for what to build first. Each one opens with the situation it's for. If you start small and go on to a build, the first fee comes off the second.",
  examplesHeading: "What a Quick Win usually looks like",
  examplesIntro:
    "Six shapes it tends to take, across finance, operations, and sales. All the same price, and each one comes with the number we'll measure it by.",
  extensionsHeading: "Once there's a system",
  extensionsIntro:
    "Two things keep it paying: a working day with your team, and someone looking after the system every month. Both are for build clients.",
  footnote:
    "Fixed fees wherever I can. On builds I'm happy to tie my fee to the number instead. Coaching I do privately with existing clients.",
} as const;

/* The steps themselves live on the flagship service (getService("system").howItWorks
   in content/services.ts) so the homepage and the offer page never drift. */
export const howItWorks = {
  heading: 'A clear path from "where do I start?" to "this is running."',
} as const;

export const fitCheck = {
  eyebrow: "Is this you?",
  heading: "Who this is for.",
  intro:
    "Eight in ten people say AI makes them more productive. Only 37 percent of businesses can point to any effect on profit. The difference is a handful of decisions made before anything gets built, so I'm fussy about who I make them with.",
  forYou: [
    {
      title: "Your data lives in three or more places, and nobody has the full picture.",
      body: "CRM, spreadsheets, email, accounting. None of them talk to each other, so someone is piecing the real picture together by hand, or nobody is.",
    },
    {
      title: "You know there's revenue or margin hiding in your data, but no time to dig it out.",
      body: "The answer to 'what should we focus on' is probably sitting in your systems already. You just don't have the tools or the hours to find it.",
    },
    {
      title: "The same manual process eats hours every week.",
      body: "Someone on your team is doing by hand what software should be doing for them, and it's not going away on its own.",
    },
    {
      title: "You want something built around how you actually run your business, not a generic template.",
      body: "Off-the-shelf software makes you bend your process to fit the tool. You'd rather have it the other way round.",
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
    "Straight answers on ownership, data, and how I work. Still not sure? Book a call and ask me.",
  items: [
    {
      question: "Who owns the system and everything it produces?",
      answer:
        "You do, completely. The system, the code behind it, and everything it produces belong to you once the engagement is complete. I don't retain rights to it, resell it, or reuse it as a template for another client.",
    },
    {
      question: "What happens to my data, and is it secure?",
      answer:
        "Your data is used only for your engagement, never combined with another client's, and encrypted in transit and at rest. I keep only what's needed to build and maintain your system, and I'll delete or return anything else on request.",
    },
    {
      question: "Do you train AI models on my data?",
      answer:
        "No, never. The AI providers I build with (Anthropic's Claude, OpenAI, and others) don't train their models on business data sent through their commercial APIs by default, and I never use one client's data to build or improve another client's system.",
    },
    {
      question: "How accurate is the AI, and what happens when it gets something wrong?",
      answer:
        "Every system I build has review built in: AI-made matches and suggestions are always clearly marked as AI-made, never blended in as if a person made the call. You and your team stay the final check on anything that matters.",
    },
  ],
} as const;

export const aboutBlock = {
  heading: "One person, from first win to full strategy.",
  body: "I'm David Bunn. I spent a decade in finance and operations, at PwC, at a venture-backed startup, and at a real estate private equity firm, before AI changed what one person could build. My day job now is the same work Alpha Infra does: AI reporting workflows that cut manual effort by about 80%, LLM tools for analysis, and dashboards leaders actually open. I'm BIDA certified and a CPA (inactive). I think AI is at its best when it frees people up for the judgment work only they can do. You work with me directly. There's nobody to hand you off to.",
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
    "Vendor-agnostic and hands-on: I work inside your existing tech stack wherever it makes sense, and bring proven, modern tools where new infrastructure is needed.",
  groups: [
    { label: "AI & LLMs", items: ["Claude", "ChatGPT", "Claude Code", "Gemini"] },
    { label: "Automation", items: ["Copilot Studio", "Power Automate", "n8n"] },
    { label: "Data & BI", items: ["Power BI", "Python", "SQL", "Power Query"] },
    { label: "Infrastructure & Hosting", items: ["Supabase", "Vercel", "GitHub"] },
  ],
} as const;

export const socialProof = {
  heading: "What people say after working together.",
  note: "Placeholder cards: real testimonials will be added as they're collected.",
} as const;

export const finalCta = {
  heading: "Ready to name the number?",
  subhead:
    "Book a 30-minute call. We'll name the number worth moving and check the data is there to move it. Or send me a note and I'll reply within a business day. No pitch, no jargon.",
  primaryCta: "Book a discovery call",
  secondaryCta: "Send a message",
} as const;

export const contact = {
  heading: "Tell me what you're working on.",
  interests: [
    "Quick Win",
    "The Alpha System",
    "Leadership AI Sprint",
    "Team AI Build Day",
    "Not sure yet",
  ],
  button: "Send message",
  success: "Thanks, your message is in. I'll reply within one business day.",
} as const;

export const aboutPage = {
  eyebrow: "About Alpha Infra",
  h1: "I help teams put people where judgment matters, and let AI do the rest.",
  subhead:
    "Alpha Infra is a one-person AI consulting practice run by David Bunn. You work directly with me, start to finish.",
  sections: [
    {
      heading: "My background",
      body: "I've spent over a decade at the intersection of finance, operations, and data. I trained as an auditor at PwC, where I led US GAAP integrated audits for a $25B+ market-cap client and was consistently rated Tier 1, then helped build a venture-backed startup from the ground up as one of its first employees, supporting a $120M Series A. Along the way I've owned financial models, redesigned reporting from source systems to the boardroom, and learned how real organizations actually make decisions.",
    },
    {
      heading: "Where AI comes in",
      body: "For the last few years my work has centered on innovation: driving AI projects, reimagining how work flows, and replacing manual processes with scalable systems. In practice that has meant building AI-powered reporting workflows that cut manual data work by ~80%, an LLM-driven market-diligence tool that gives investment teams instant competitive assessments, and dynamic, interactive dashboards that let teams drill from the big picture down to a single asset. I'm BIDA®-certified in business intelligence and analysis, a CPA (currently inactive), and I've completed Level I of the CFA program.",
    },
    {
      heading: "Why Alpha Infra",
      body: "I started Alpha Infra because I kept seeing the same thing: capable teams buried in repetitive work, sitting on data they never use, making today's decisions on last week's numbers. The technology to fix that is finally here, but tools alone don't change anything. It takes someone who understands both the technology and how a business actually runs to redesign the work around it. That's the gap I fill.",
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
