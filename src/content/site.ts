/*
 * Site-wide content + config. Homepage section copy is transcribed verbatim
 * from the copy deck (docs/website-copy-and-names.md). Config values read from
 * environment variables with sensible, clearly-marked fallbacks.
 */

export const site = {
  name: "Alpha Infra",
  legalName: "Alpha Infra LLC",
  tagline: "AI systems for finance, operations, and owner-led teams.",
  description:
    "AI-native systems for finance, operations, and owner-led teams: the things you'd have built years ago if you'd had the people, the budget, or the technology. Built for your business, and yours to keep.",
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
  eyebrow: "For finance, operations, and owner-led teams",
  headline: "Build what your business couldn't build before.",
  subhead:
    "Not automation of what you do today. The things you'd have done years ago if you'd had the people, the budget, or the technology. Three I've built: a sales system that reads every job, invoice, and email, then flags the customers at risk and the prospects worth winning, a month-end variance pack that drafts its own commentary, a diligence system that drafts the answers to a new questionnaire from every answer you've given before. Built for your business, and yours to keep.",
  primaryCta: "Book a discovery call",
  secondaryCta: "See how I help",
  ctaNote:
    "30 minutes. We find the thing worth building first and check the data is there to build it. If it isn't, I'll say so.",
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
      body: "Every morning it reads across every account: last touchpoint, spend this year against last, open jobs. Triggers built around customer satisfaction, and priority rules for the key accounts, flag a customer at risk before they go quiet, while there's still time to keep them.",
    },
    {
      title: "Wins more of what comes in",
      body: "Every inbound enquiry is tracked from the moment it lands, routed for a quote inside a 48-hour target, and assessed for what it could become. The ones that look like high-value clients get flagged, so the owner's selling time goes on converting the right ones.",
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
      body: "Reads SimPRO, Xero, and Outlook every morning. Triggers built around customer satisfaction, and priority rules for key accounts, flag a customer at risk before they go quiet. Every inbound enquiry is tracked, assessed, and flagged when it could become a high-value client, so the owner converts more of the right ones. Live at Entec Access Systems since July 2026.",
      tools: "SimPRO · Xero · Outlook · Claude Code · n8n",
      href: "/work",
      schematic: {
        inputs: [{ lines: ["SimPRO"] }, { lines: ["Xero"] }, { lines: ["Outlook"] }],
        plate: {
          title: "Sales system",
          rows: ["Watches every account", "Prioritises key customers", "Scores each new enquiry"],
        },
        outputs: [{ lines: ["Customer", "at risk"] }, { lines: ["High-value", "prospect"] }],
        annotation: "built on the owner's own rules",
      },
    },
    {
      title: "Variance analysis for a 50-property portfolio",
      body: "Takes raw general-ledger extracts for about 50 properties, applies the investigation thresholds by property and by account, and drafts the commentary for every flagged account from the GL detail. The accounting team reviews, edits, and exports the package. Every edit persists.",
      tools: "Claude Code · Claude API · Web app",
      href: "/work",
      schematic: {
        inputs: [{ lines: ["GL extracts", "50 properties"] }],
        plate: {
          title: "Variance tool",
          rows: ["Applies the thresholds", "Flags property and account", "Drafts the commentary"],
        },
        outputs: [{ lines: ["Team reviews", "and edits"] }, { lines: ["Package", "exported"] }],
        annotation: "every edit persists",
      },
    },
    {
      title: "Due-diligence drafting system for investor relations",
      body: "About 4,000 past question-and-answer pairs ingested and tagged by fund, date, client, and more. A new questionnaire comes in, and the system drafts the answers from precedent, with three years of history side by side, so the team reviews instead of starting from a blank page.",
      tools: "Claude Code · Semantic search · Tagging",
      href: "/work",
      schematic: {
        inputs: [{ lines: ["About 4,000", "Q&A pairs"] }],
        plate: {
          title: "Diligence system",
          rows: ["Tags by fund, date, client", "Matches each new question", "Drafts from precedent"],
        },
        outputs: [{ lines: ["Answers drafted", "for the new DDQ"] }, { lines: ["Team reviews,", "history beside it"] }],
        annotation: "three years of answers",
      },
    },
  ],
  link: { label: "See the work catalogue", href: "/work" },
} as const;

/*
 * The three levels: where a business is with AI and what comes next. Each
 * level names the offer that gets you there. Drawn as a staircase in
 * components/levels-ladder.tsx.
 */
export const levels = {
  eyebrow: "Where you are",
  heading: "Three levels. Every business is on one of them.",
  intro:
    "Each level builds on the one below it. Most of the businesses I speak to are somewhere on the first, with a few tools in a few browser tabs. The value is in the second and third, and every engagement lays the first as it goes.",
  items: [
    {
      order: "1",
      title: "An AI-native team",
      subtitle: "The foundation",
      body: "People who use the tools well, with rules for accuracy and sensitive data written down. Every engagement builds this in for the people involved: a Quick Win trains the team on that workflow, the Alpha System writes your rules down as operating memory. The Build Day takes it to everyone else.",
      offer: { name: "Any of the three ways to start, then Team AI Build Day", slug: "workshops" },
      annotation: "built into every engagement",
    },
    {
      order: "2",
      title: "AI applications",
      subtitle: "Automation and intelligence",
      body: "Two kinds, and the difference matters. Productivity AI helps the same team handle more volume. Engineered AI is built into a process where a better signal changes an outcome: a customer kept, a quote won, a close that lands on time.",
      split: [
        { label: "Productivity AI", note: "same team, more volume" },
        { label: "Engineered AI", note: "a better signal changes the outcome" },
      ],
      offer: { name: "Quick Win, then The Alpha System", slug: "system" },
      annotation: "one workflow, then the system",
    },
    {
      order: "3",
      title: "Connected intelligence",
      subtitle: "All your data, one system",
      body: "Everything the business knows, inside and out, connected and read by AI as a whole. Patterns, risks, and opportunities a person wouldn't spot at scale. This is where the Alpha System ends up once the operating memory and the connections are in.",
      offer: { name: "The Alpha System with Care", slug: "care" },
      annotation: "kept alive month by month",
    },
  ],
  decideNote: "Not sure which level to build first? That's what the Leadership AI Sprint decides.",
  decideHref: "/services/strategy",
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
      title: "Static reports are on their way out.",
      body: "A PDF is stale the moment it's exported. The teams I work with are moving to live views and models that update as the data does, so the answer is the current one, not last month's.",
    },
    {
      order: "03",
      title: "AI has a jagged edge.",
      body: "It's brilliant at some things and unreliable at others, and the line moves every few months. The advantage goes to whoever builds the system that knows which is which, not whoever adopts the most tools.",
    },
    {
      order: "04",
      title: "It does the grunt work and the thinking.",
      body: "Plain automation carries the repeatable load. The models can reason too, if they know the rules of your business. I use them for both, with your judgment in the loop on anything that matters.",
    },
    {
      order: "05",
      title: "The models are a commodity. Your data and your process are not.",
      body: "Every major provider is racing to the same capabilities, and the leader changes every few months. Which model you pick matters less each year. What no vendor can sell you is your data, connected and clean, and the way your business actually decides. That's where the advantage sits, and it's what I build around.",
    },
    {
      order: "06",
      title: "The benchmark is 10x, not 10 percent.",
      body: "If your team can process ten quotes a day, the system should get you to a hundred, not eleven. That's the order of magnitude I design for, and it's why I start by naming the number.",
    },
    {
      order: "07",
      title: "This is an owner's decision, not an IT ticket.",
      body: "How the business uses AI shapes how it competes. It belongs with the person who owns that outcome, not in a tooling request.",
    },
  ],
} as const;

export const offerings = {
  heading: "Three ways to start.",
  intro:
    "One capability, one number, or a plan for what to build first. Each one opens with the situation it's for. If you start small and go on to a build, the first fee comes off the second.",
  examplesHeading: "What a Quick Win usually looks like",
  examplesIntro:
    "Six shapes it tends to take, across finance, operations, and sales. All the same price, and each one comes with the number we'll measure it by.",
  extensionsHeading: "Once there's a system",
  extensionsIntro:
    "Two things keep it paying: a working day that takes what we built to the whole team, and someone looking after the system every month. Both need something already built, a Quick Win counts.",
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
      body: "CRM, spreadsheets, email, accounting. None of them talk to each other, so someone is piecing the real picture together from exports, or nobody is.",
    },
    {
      title: "You know there's revenue or margin hiding in your data, but no time to dig it out.",
      body: "The answer to 'what should we focus on' is probably sitting in your systems already. You just don't have the tools or the hours to find it.",
    },
    {
      title: "There's a thing you'd build if you had the people.",
      body: "The report someone would make if they had a day a week. The flags nobody sets because nobody has time to watch. It's been on the list for years, and it's now a three-week build.",
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
        "You do. The system, the code, the rules we wrote down, and everything it produces are yours when the engagement ends. I keep my general methods and templates. I don't resell your system or reuse it as a template for anyone else.",
    },
    {
      question: "What happens to my data?",
      answer:
        "It's used for your engagement and nothing else, and it never gets mixed with another client's. The system runs in your accounts, under your credentials, so the data stays where it already lives. Anything I hold to build or maintain the system, I return or delete on request.",
    },
    {
      question: "Do you train AI models on my data?",
      answer:
        "No. The providers I build with, Anthropic and OpenAI among them, don't train on business data sent through their commercial APIs by default, and I never use one client's data to build another client's system.",
    },
    {
      question: "How accurate is the AI, and what happens when it gets something wrong?",
      answer:
        "It gets things wrong, and the system is built assuming it will. Anything the AI decided is shown as AI-made, never blended in as if a person did it. Anything that matters waits for a person to approve. Your team stays the final check, and the rules we wrote down are what it's checked against.",
    },
    {
      question: "Do I have to change the software we use?",
      answer:
        "No. I build inside what you already run: your CRM, your accounting package, your inbox, your spreadsheets. Nothing migrates. If something genuinely needs a new tool, I'll say so, and it will be one tool, not a platform.",
    },
    {
      question: "What happens on the discovery call?",
      answer:
        "Thirty minutes. You tell me what eats the week. I ask where the data lives and whether it's there to do the work. If it's a fit, I'll tell you which of the three ways to start makes sense and what it costs. If it isn't, I'll say so, and you've lost half an hour.",
    },
  ],
} as const;

export const aboutBlock = {
  heading: "One person, start to finish.",
  body: "I'm David Bunn. Ten years in finance and operations, at PwC, at a venture-backed startup, and at a real estate private equity firm, before the tools got good enough that one person could build real software. So I started building: reporting workflows, financial models as interactive apps, a diligence library, a variance tool, and a sales system now in daily use at a UK business. I'm a CPA (inactive) and BIDA certified. You work with me directly. There's nobody to hand you off to.",
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
    "I work inside the stack you already run wherever I can, and bring in a small number of proven tools where something new is genuinely needed.",
  groups: [
    { label: "AI & LLMs", items: ["Claude", "ChatGPT", "Claude Code", "Gemini"] },
    { label: "Automation", items: ["Copilot Studio", "Power Automate", "n8n"] },
    { label: "Data & BI", items: ["Power BI", "Python", "SQL", "Power Query"] },
    { label: "Hosting & code", items: ["Supabase", "Vercel", "GitHub"] },
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
  h1: "Finance and operations first. AI second. The order matters.",
  subhead:
    "Alpha Infra is me, David Bunn. A one-person practice, so you work with me from the first call to the handover. There's nobody to hand you off to.",
  sections: [
    {
      heading: "Where I come from",
      body: "I trained as a chartered accountant at PwC in Johannesburg, then moved to the San Francisco office and led US GAAP audits for a $25B+ e-commerce client. Audit teaches one thing well: how to walk into a business you've never seen and work out, fast, what actually drives the numbers. In 2021 I joined Major League Cricket as one of the first finance hires, built the finance function from nothing, and helped raise a $120M Series A across twelve entities. The cricket wasn't a coincidence. I played first-class cricket in South Africa before I ever opened a ledger. Then Stockbridge, a real estate private equity firm, where I owned the revenue projections across 35-plus funds and rebuilt the reporting from the source systems to the board pack.",
    },
    {
      heading: "Where AI came in",
      body: "At some point the tools got good enough that one person with a finance background could build real software. So I started building. At Stockbridge I moved onto the CTO's team and shipped: reporting workflows that cut the manual data work by about 80 percent, financial models rebuilt as interactive apps, a market selection tool that scores the macro data and writes the narrative, a diligence answer library, an accounts-payable run, a variance tool for the accounting team. All of it built with Claude Code, Copilot Studio, Power Automate, and n8n, inside the firm's own accounts. Then Entec, a 15-person access-systems business in the UK run by someone I've known since school, where I built the sales system that's on the Work page. That was the first time I'd built for an owner rather than a firm, and it's the one that convinced me to do this properly.",
    },
    {
      heading: "Why I started",
      body: "Every business I've worked in had the same shape. Good people, buried in repetitive work, sitting on data nobody had time to use, making this week's decisions on last month's numbers. For most of my career the fix was more people, or an expensive system that took a year to land. But that isn't true any more. One person who understands how the business runs, and can build, can now do what used to take a vendor and a project team. That's the gap Alpha Infra fills. I understand the finance and the operations because I've done them. I can build because I've been doing that too.",
    },
    {
      heading: "The name",
      body: "Alpha Infra spells A and I, which is a bonus, not the reason. The reason is the two words. Alpha is the finance word for outperformance: the return you earn above the benchmark, through discipline rather than luck. I like what it stands for, which is finding the way to be excellent at something and doing the work to stay there. It's also the name of a gym programme I did and really liked, so the word had already earned its place. Infra is what I believe about AI. On its own it's a clever tool. It only becomes useful to a business when there's structure around it: the connections to your data, the rules you decide by, the process, the checks, the memory of how you work. That structure is what I build. The model is the easy part.",
    },
    {
      heading: "How I work",
      body: "Directly. You get me, start to finish. I'll tell you on the first call if the data isn't there to do what you want, and I'd rather lose the job than build something that gets opened twice. I start small on purpose: one number, one workflow, a finish line. The next one gets built on the same foundation. I name the tools I use, because you should know what's running your business. And I write things down: the rules, the definitions, the way you decide. It's yours to keep when I'm done.",
    },
  ],
  ctaLine: "Let's find the first one worth doing.",
} as const;

export const footer = {
  tagline: "AI systems for finance, operations, and owner-led teams.",
  links: [
    { label: "Services", href: "/services" },
    { label: "Work", href: "/work" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
} as const;
