/*
 * Site-wide content + config. Homepage section copy is transcribed verbatim
 * from the copy deck (docs/website-copy-and-names.md). Config values read from
 * environment variables with sensible, clearly-marked fallbacks.
 *
 * Repositioned 2026-09-14 around Opportunity AI vs Productivity AI (see
 * ~/Downloads/alpha-infra-content-repositioning-prompt.md and the Claude Code
 * plan file for that session). Citations older than the standing 90-day rule
 * are used here under a one-time exception David granted for this pass.
 */

export const site = {
  name: "Alpha Infra",
  legalName: "Alpha Infra LLC",
  tagline: "Opportunity AI for lean teams making high-value decisions.",
  description:
    "Alpha Infra builds Opportunity AI systems for lean teams making high-value decisions, connecting the tools you already run, applying your judgment, and surfacing the customer, market, asset, or margin opportunity worth acting on next.",
  founder: "David Bunn",
  // Config: override via env (.env.local). See .env.example.
  ownerEmail: process.env.OWNER_EMAIL ?? "david@alphainfra.us",
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
  eyebrow: "Opportunity AI for lean teams",
  headline: "Build what your business couldn't build until now.",
  subhead:
    "Lean teams make high-value decisions with data spread across too many systems. A live view of what to do next used to take more people than most businesses could justify. Now it can be built for yours, and it's yours to keep.",
  /* the two built examples used to sit in the subhead; the live view beside
     it and the proof section now carry them */
  demoLink: { label: "See the real Entec system behind this example", href: "/work#entec" },
  primaryCta: "Find the first opportunity worth building",
  secondaryCta: "See how it works",
  ctaNote:
    "30 minutes. We name the opportunity, check the data is there to build it, and decide if it's worth doing. If it isn't, I'll say so.",
} as const;

/*
 * Hero diagram: the looping ink animation beside the headline.
 */
export const inkPeak = {
  sources: [
    { id: "crm", label: "CRM" },
    { id: "sheets", label: "Spreadsheets" },
    { id: "email", label: "Email" },
    { id: "accounting", label: "Accounting" },
  ],
  systemLabel: "One decision system",
  /* The three rows inside the system plate: what it does with the signals,
     in the opportunity framing (read, judge, rank), not productivity work */
  actions: ["Reads every signal", "Applies your rules", "Ranks what matters"],
  annotation: "built around your rules",
} as const;

/*
 * Opportunity vs Productivity AI: the core distinction the site is built
 * around. Sits right after the hero. Citations shown with real dates;
 * McKinsey and BCG only here per the brief's own restraint against
 * overloading the homepage with evidence.
 */
export const positioning = {
  eyebrow: "The idea",
  heading: "Productivity is useful. Opportunity creates advantage.",
  paragraphs: [
    "Productivity AI helps someone complete an existing task faster: draft the email, summarize the document, prepare the first version. Opportunity AI gives the business a capability it didn't have: read every account, connect every relevant signal, identify what deserves attention, and show the evidence behind the next action.",
    "It doesn't just draft the email faster. It identifies the customer worth emailing.",
    "It doesn't just produce the report faster. It shows which market, account, or margin deserves attention.",
    "It doesn't replace the person making the decision. It makes sure that person sees the opportunity while there's still time to act.",
  ],
  note: "The advantage isn't the model. It's your data, connected, and the judgment you bring to it.",
  /* Survey evidence (McKinsey 25 Aug 2026, BCG 31 Aug 2026) was removed on
     2026-09-17: the site's own systems are the evidence, and the 90-day
     citation rule made the figures a maintenance cost for little return. */
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
  heading: "A system built to drive revenue, not just report it.",
  context:
    "Entec is a 15-person access-systems business in the UK, 20 years old. SimPRO for jobs and quotes, Xero for the money, Outlook for everything else. None of it talked to each other, so accounts went quiet without anyone noticing and enquiries sat waiting for a quote.",
  channels: {
    heading: "One morning view across five revenue channels",
    body: "The system brings key customers, inbound enquiries, target accounts, installation-to-service leads, and public opportunities into one view. Each morning it ranks the actions that matter using rules defined with the owner, from overdue quotes and falling customer spend to service-conversion leads and approaching tender deadlines.",
  },
  built: "Built with Claude Code and n8n, in his accounts, over eight working sessions with the owner.",
  pillars: [
    {
      title: "Protects recurring revenue",
      body: "Job, quote, invoice, and relevant email activity are read together. Owner-defined triggers surface key accounts that need attention: a completed job awaiting feedback, falling spend, an unusually quiet relationship, or an overdue next step. The evidence and recommended action appear together.",
    },
    {
      title: "Converts inbound demand",
      body: "Every inbound enquiry is filtered, structured, and followed from the first email through response, quote, and outcome. The system tracks response and quote times against Entec's targets, flags potentially valuable or repeat customers, and shows where the next action is overdue.",
    },
    {
      title: "Builds the next revenue pipeline",
      body: "Completed installations become service-conversion leads. Target accounts carry their contacts, last touch, current status, and next action. Public tender feeds are scanned and ranked for relevance, so promising opportunities enter the pipeline before someone has to go looking for them.",
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
  /* Drafted for Bylo to read, edit, and approve (vault: Entec Access Systems
     - Case Study). Not signed off; David accepted the risk while the site
     has no real traffic. */
  testimonial: {
    quote:
      "It's already caught accounts I would otherwise have missed. Now I can open one view each morning and see what needs attention, rather than piecing it together across separate systems.",
    name: "William van der Byl, Owner, Entec Access Systems",
  },
  link: { label: "Read the case study", href: "/work" },
} as const;

/*
 * Homepage proof strip: two contrasting examples, chosen to show breadth
 * without a two-market headline: an operating business (Entec) and an
 * investment/portfolio tool (the Market Selection Tool, built at
 * Stockbridge Capital Group). The full catalogue lives on /work.
 */
export const proofStrip = {
  eyebrow: "Proof",
  heading: "Real systems, built and shipped.",
  intro:
    "Two of the things I've built: one for an operating business, one for an investment team. The rest are in the work catalogue.",
  items: [
    {
      title: "A revenue intelligence system for a 15-person services business",
      summary: "Jobs, quotes, invoices, email, and public tenders read together. Every morning it ranks what needs the owner's attention, with the evidence.",
      body: "Connects SimPRO jobs and quotes, Xero invoices and payments, Outlook correspondence, and public tender feeds across five sales channels. Every morning it applies the owner's rules to rank the accounts, enquiries, service-conversion leads, target relationships, and tenders that need attention, showing what changed, why it matters, and the next action.",
      tools: "SimPRO · Xero · Outlook · Public tenders · Claude Code · n8n",
      href: "/work",
      schematic: {
        inputs: [{ lines: ["SimPRO"] }, { lines: ["Xero"] }, { lines: ["Outlook"] }, { lines: ["Public", "tenders"] }],
        plate: {
          title: "Sales system",
          rows: ["Monitors five channels", "Ranks today's priorities", "Shows evidence, next step"],
        },
        outputs: [{ lines: ["Priority", "action"] }, { lines: ["Evidence", "shown"] }],
        annotation: "built on the owner's own rules",
      },
    },
    {
      title: "A market scorecard for a real-estate investment team",
      summary: "Macro and demographic data weighted into a score for every market, with the narrative behind the trend drafted alongside.",
      body: "Weights macro-economic and demographic data into a score for every market, then drafts the narrative behind the trend, nationally, by market, and by property sector. The investment team gets a ranked read on where to look next.",
      tools: "Macro-economic data · Demographic data · Claude Code · Python",
      href: "/work",
      /* rendered as the live scorecard demo (market-scorecard.tsx) instead of
         the schematic, which stays here as the reduced/no-JS fallback */
      demo: "scorecard",
      schematic: {
        inputs: [{ lines: ["Macro-economic", "data"] }, { lines: ["Demographic", "data"] }],
        plate: {
          title: "Market scorecard",
          rows: ["Weights the signals", "Scores every market", "Drafts the narrative"],
        },
        outputs: [{ lines: ["Ranked", "scorecard"] }, { lines: ["Narrative", "by market"] }],
        annotation: "ranked, with the reasons shown",
      },
    },
  ],
  link: { label: "See the work catalogue", href: "/work" },
} as const;

export const offerings = {
  heading: "Three ways to start. Two ways to extend what works.",
  intro:
    "One capability, one number, or a plan for what to build first. Each one opens with the situation it's for. If you start small and go on to a build, the first fee comes off the second.",
  examplesHeading: "What a Quick Win can look like",
  examplesIntro:
    "Six examples of a tightly scoped first capability, across operating, finance, and investment work. All the same fixed fee, with the measure agreed before I build.",
  extensionsHeading: "Once there's a system",
  extensionsIntro:
    "Two things keep it paying: a working day that takes what we built to the whole team, and someone looking after the system every month. Both need something already built, a Quick Win counts.",
  footnote:
    "Fixed fees wherever I can. On builds I'm happy to tie my fee to the number instead. Coaching I do privately with existing clients.",
} as const;

/* The steps themselves live on the flagship service (getService("system").howItWorks
   in content/services.ts) so the homepage and the offer page never drift. */
export const howItWorks = {
  eyebrow: "Building The Alpha System",
  heading: 'A clear path from "where do I start?" to "this is running."',
  intro: "The path for a full build. Quick Win runs a simpler version of it, over two to three weeks.",
} as const;

export const fitCheck = {
  eyebrow: "Is this you?",
  heading: "Built for lean teams making high-value decisions.",
  intro:
    "Usually, the person accountable for the result is close to the work: an owner, partner, CFO, COO, finance or operations leader, or investment lead.",
  forYou: [
    {
      title: "Your data is split across systems that don't talk to each other.",
      body: "CRM, spreadsheets, email, accounting, job or portfolio systems. Someone is piecing the real picture together from exports, or nobody is.",
    },
    {
      title: "Opportunities or risks get missed because nobody can watch everything.",
      body: "There's more worth monitoring than the team has hours for, so the things that matter surface late, or not at all.",
    },
    {
      title: "You can name the number this would move.",
      body: "Revenue, margin, retention, turnaround, or investment conviction. If you can name it, I can build toward it.",
    },
    {
      title: "You're close enough to the work to define the rules yourself.",
      body: "The person accountable for the result needs to be in the room, defining what counts as a key account, a late quote, a market worth a second look.",
    },
    {
      title: "You want something built around how you actually operate, not a generic subscription.",
      body: "Off-the-shelf software makes you bend your process to fit the tool. You'd rather have it the other way round.",
    },
  ],
  notForYou: [
    "You want an off-the-shelf SaaS subscription, not something built around your workflow.",
    "You need a large enterprise rollout with a formal procurement or RFP process.",
    "You already have an in-house data or engineering team that owns this.",
    "You're looking for a slide deck and a roadmap, not working software.",
    "You need someone embedded in your team full time. Every engagement here is a defined, project-based build.",
  ],
} as const;

export const faq = {
  eyebrow: "FAQ",
  heading: "Common questions.",
  intro:
    "Straight answers on ownership, data, and how I work. Still not sure? Send a note and ask me directly.",
  items: [
    {
      featured: true,
      question: "Who owns the system and everything it produces?",
      answer:
        "You do. The system, the code, the rules we wrote down, and everything it produces are yours when the engagement ends. I keep my general methods and templates. I don't resell your system or reuse it as a template for anyone else.",
    },
    {
      featured: true,
      question: "What happens to my data?",
      answer:
        "It's used for your engagement and nothing else, and it never gets mixed with another client's. Your source data stays in the systems you already use, and the system reads only what's needed, through connections you own. Some selected data may be processed by the AI or automation providers I use to build it; before launch I document what's sent, where it's processed, how long it's retained, and how to revoke access. Anything I hold directly, I return or delete on request.",
    },
    {
      question: "Do you train AI models on my data?",
      answer:
        "No. I never use one client's data to build another client's system. When a system uses a commercial AI API, I document the provider and its data settings: Anthropic and OpenAI both state that commercial API inputs and outputs aren't used to train their models by default. Training and retention are separate questions, so how long data is kept is documented as part of each system's design.",
    },
    {
      featured: true,
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
      question: "What about ongoing software or API costs?",
      answer:
        "Any AI or automation costs the system runs on are yours, not mine. I estimate them up front, you approve them before go-live, and Care, if you take it, keeps an eye on them every month. I don't mark them up.",
    },
    {
      featured: true,
      question: "What happens on the discovery call?",
      answer:
        "Thirty minutes. You tell me what eats the week. I ask where the data lives and whether it's there to do the work. If it's a fit, I'll tell you which of the three ways to start makes sense and what it costs. If it isn't, I'll say so, and you've lost half an hour.",
    },
  ],
} as const;

export const aboutBlock = {
  heading: "The business comes before the technology.",
  body: [
    "I spent more than a decade in finance and operations, at PwC, Major League Cricket, and a real estate private equity firm, working close to the decisions that move revenue, margin, and capital.",
    "When AI made it possible for one person to build real software, I began turning the data, rules, and judgment behind those decisions into working systems: market-selection and portfolio tools, interactive financial models, diligence workflows, and the sales intelligence system now used daily by a 15-person UK business.",
    "The common thread is turning scattered information into a live view of what deserves attention and what to do next. You work with me directly, from the first conversation to the handover.",
  ],
  credibility: ["PwC", "Major League Cricket", "Private equity", "BIDA® Certified", "CPA (inactive)"],
  proofPoints: [
    { value: "10+ years", label: "Inside finance, operations, and data" },
    { value: "35+ funds", label: "Revenue projections and decision reporting in private equity" },
    { value: "15-person team", label: "Running a sales intelligence system I built, in daily use" },
  ],
  ctaLine: "More about David and Alpha Infra",
} as const;

export const socialProof = {
  heading: "What people say after working together.",
  note: "Placeholder cards: real testimonials will be added as they're collected.",
} as const;

export const finalCta = {
  heading: "Ready to name the opportunity?",
  subhead:
    "Bring the outcome you'd like to move. Together we'll name the opportunity, check the data is there to build it, and decide if it's worth doing. If it isn't, I'll say so.",
  primaryCta: "Find the first opportunity worth building",
  secondaryCta: "Send a message",
} as const;

export const contact = {
  heading: "What should the business be able to see or do?",
  prompt:
    "A rough description is enough. If you can, tell me the outcome that matters, what gets missed or decided too late today, and where the relevant data may live. You don't need to know which service fits.",
  note: "Please don't include confidential, financial, or personal data in this first message. We can agree on a secure way to share anything sensitive later.",
  interests: [
    "Quick Win",
    "The Alpha System",
    "AI Opportunity Sprint",
    "Team AI Build Day",
    "Not sure yet",
  ],
  button: "Send message",
  success: "Thanks, your message is in. I'll reply within one business day.",
} as const;

export const contactNext = {
  heading: "What happens next?",
  body: "I'll reply personally within one business day. If there appears to be something worth exploring, we'll arrange a 30-minute conversation to name the outcome, check whether the relevant data exists, and decide whether anything is worth building. There's nothing to prepare, and you don't need to provide system access. If I don't think the opportunity justifies the work, I'll say so.",
} as const;

export const aboutPage = {
  eyebrow: "About Alpha Infra",
  h1: "Finance and operations first. AI second. The order matters.",
  subhead:
    "I spent more than a decade in finance and operations learning where the numbers come from, what moves them, and how decisions actually get made. Today I build systems that connect those signals, apply the business's judgment, and surface opportunities worth acting on. You work with me directly, from the first conversation to the handover.",
  sections: [
    {
      heading: "Where I come from",
      body: ["I trained in audit at PwC in Johannesburg, then moved to San Francisco and managed workstreams on the US GAAP integrated audit for a $25B+ e-commerce client. Audit taught me to walk into an unfamiliar business, follow the numbers back to their source, and work out what actually drives them. At Major League Cricket, I was one of the first finance hires. I helped build the finance function and supported a $120M Series A through fundraising due diligence. That put me closer to the operating reality of a lean team: decisions couldn't wait for another department or a perfect system. Then at Stockbridge, a real estate private equity firm, I owned revenue projections across more than 35 funds and rebuilt reporting from source systems through to what the CFO and Executive Committee saw. The questions were rarely just \"What is the number?\" They were \"What changed, why, and where should we focus next?\""],
    },
    {
      heading: "Where AI came in",
      body: [
        "The turning point came from rebuilding something I already knew intimately.",
        "In corporate finance at Stockbridge, I spent six to nine months developing a Power BI dashboard for the CFO. It brought the firm's financial and operating picture into one place: revenue and expenses against plan, cash and distribution projections, hiring, acquisitions and sales, assets under management, investor concentration, and more. From the company-level summary, the CFO could drill into a business unit, fund, asset, account, or underlying general-ledger detail.",
        "Building it properly required far more than making charts. The data had to be mapped, reconciled, and modelled, the definitions had to be agreed, and every view had to survive questions from people who understood the numbers.",
        "Then Claude Code arrived. I tried using it to build a similar way of exploring financial data and had a useful interactive first version within hours. It wasn't a like-for-like replacement for the production dashboard, since the data still needed validation, controls, and testing, but it changed my sense of what one person could afford to build. Something that had previously required a specialist platform and a long project could now be explored in a day.",
        "The second moment came with roughly 700MB of macroeconomic and demographic Excel data. In about 10 to 15 minutes, Claude Code produced a first pass of the charts, analysis, key takeaways, and narrative behind the trends. Those outputs still needed to be checked, but instead of spending a week assembling the initial view, I could immediately start asking the more valuable question: which markets deserved attention, and why?",
        "That was when the larger opportunity became clear to me. AI wasn't only a faster way to produce the same dashboard or report. It dramatically lowered the cost of turning a business question into a working decision tool. Capabilities that previously required an analyst team, a specialist developer, or a long internal project had become practical for much leaner teams.",
        "That conviction is what led me to start building these systems full time: connecting a business's data and judgment so it can see, decide, and act in ways it couldn't justify building before.",
      ],
    },
    {
      heading: "Why I started Alpha Infra",
      body: ["Productivity gains from AI are useful, but what convinced me to start Alpha Infra was the possibility of something larger: building capabilities a lean team could never previously justify staffing or commissioning. The signals behind an important decision often already exist. They sit in job records, accounting data, email, spreadsheets, or public sources. What's missing is a system that keeps the relevant picture current, applies the business's rules, and shows an opportunity or risk while there's still time to act. That's what I mean by Opportunity AI: not just producing the old report faster, but giving a business a new way to see, decide, and act. I build toward one measurable outcome at a time."],
    },
    {
      heading: "The name",
      body: ["Alpha is the finance word for outperformance. I like the idea that advantage is earned through better decisions and consistent work, not luck. Infra is the structure that makes AI useful to a business: connected data, clear definitions, decision rules, checks, approvals, and a record of how the business works. The model matters, but that business-specific structure is what makes a system worth relying on."],
    },
    {
      heading: "How I work",
      body: ["I start with the outcome, not the tool. We agree what's worth moving, trace the signals behind it, and write down the judgment the system needs to apply. If the data isn't there, or the opportunity isn't worth building at the proposed scope, I'll say so before we start. I use ordinary code for calculations and other exact work, and AI where interpretation is genuinely needed. I test the system on real cases, show the evidence behind its calls, and keep a person in control of consequential actions. I build in accounts you control, document the rules, and hand over the working system. You work with me throughout; there's no team to hand you off to."],
    },
  ],
  ctaLine: "Let's find the first opportunity worth building.",
} as const;

export const workCta = {
  heading: "See a decision your team should be able to make better?",
  subhead:
    "The first conversation is about the outcome, the signals behind it, and whether there's something worth building. If there isn't, I'll say so.",
  primaryCta: "Find the first opportunity worth building",
} as const;

export const footer = {
  tagline: "Opportunity AI for lean teams making high-value decisions.",
  links: [
    { label: "Services", href: "/services" },
    { label: "Work", href: "/work" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
} as const;
