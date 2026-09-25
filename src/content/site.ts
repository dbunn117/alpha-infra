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
    { label: "Portfolio", href: "/work" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
} as const;

export const hero = {
  eyebrow: "Opportunity AI for lean teams",
  headline: "Build what your business couldn't build until now.",
  subhead:
    "Lean teams make high-value decisions with data spread across too many systems. A live view of what to do next used to require resources most businesses couldn't justify. Now it can be built for yours, and it's yours to keep.",
  /* the two built examples used to sit in the subhead; the live view beside
     it and the proof section now carry them */
  demoLink: { label: "See the real Entec system behind this example", href: "/work#entec" },
  primaryCta: "Find the first opportunity worth building",
  secondaryCta: "See how it works",
  ctaNote:
    "Bring the outcome you'd like to move. We'll talk through how it works today and where the information lives, and you'll leave knowing what I'd build first.",
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
 * The idea: one comparison between two models of AI. It answers "what was
 * fundamentally different about what I just saw?" after the hero and the
 * proof. Productivity AI starts with a task; Opportunity AI watches the
 * signals behind an outcome and surfaces the next action. The Opportunity
 * side ends in a visible output, which reuses the hero's illustrative
 * Northgate account so the two agree. No survey figures: the site's own
 * systems are the evidence (removed 2026-09-17).
 */
export const positioning = {
  eyebrow: "The idea",
  heading: "The real opportunity is seeing what to do next.",
  intro:
    "Productivity AI starts with a task. An Alpha System watches the signals behind an important outcome, applies the way your business thinks, and brings the right action to the surface.",
  productivity: {
    label: "Productivity AI",
    prompt: "Draft this customer email.",
    flow: ["One prompt", "One task", "Faster output"],
    points: ["Starts when someone prompts it", "Improves one task", "Produces a faster first draft"],
    verdict: "Useful efficiency",
  },
  bridge: "From a faster task to better business visibility",
  opportunity: {
    label: "Opportunity AI",
    prompt: "Which customer needs attention, and why?",
    sources: ["CRM", "Email", "Finance", "Operations"],
    rules: "Your rules",
    output: {
      label: "Ranked opportunity",
      title: "Northgate needs attention",
      evidence: "Invoicing 18% behind pace",
      action: "Next action: call the account",
      caption: "Illustrative",
    },
    annotation: "this is where value moves",
    points: [
      "Reads signals across your systems",
      "Applies your operating rules",
      "Ranks what deserves attention",
      "Carries the next action into the work",
    ],
    verdict: "A capability the business didn't have before",
  },
  note: "The advantage isn't the model. It's your data, connected, and the judgment you bring to it.",
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
    "Entec is a 15-person access-systems business in the UK, 20 years old. SimPRO for jobs and quotes, Xero for the money, Outlook for everything else. None of it talked to each other, so accounts went quiet without anyone noticing and inquiries sat waiting for a quote.",
  channels: {
    heading: "One morning view across five revenue channels",
    body: "The system brings key customers, inbound inquiries, target accounts, installation-to-service leads, and public opportunities into one view. Each morning it ranks the actions that matter using rules defined with the owner, from overdue quotes and falling customer spend to service-conversion leads and approaching tender deadlines.",
  },
  built: "Built with Claude Code and n8n, in his accounts, over eight working sessions with the owner.",
  pillars: [
    {
      title: "Protects recurring revenue",
      body: "Job, quote, invoice, and relevant email activity are read together. Owner-defined triggers surface key accounts that need attention: a completed job awaiting feedback, falling spend, an unusually quiet relationship, or an overdue next step. The evidence and recommended action appear together.",
    },
    {
      title: "Converts inbound demand",
      body: "Every inbound inquiry is filtered, structured, and followed from the first email through response, quote, and outcome. The system tracks response and quote times against Entec's targets, flags potentially valuable or repeat customers, and shows where the next action is overdue.",
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
   * Fallbacks, in order: (2) quote turnaround, e.g. "Every inquiry quoted
   * inside 48 hours, down from N days"; (3) hours per week the owner no
   * longer spends piecing the picture together by hand.
   */
  metric: null as null | { value: string; label: string },
  // e.g. { value: "£42,000", label: "recurring revenue recovered from accounts that had gone quiet" }
  image: {
    src: "/entec-sales-hub.webp",
    alt: "Entec's Sales Intelligence Hub: five sales channels on one dashboard, with today's priority actions ranked across key accounts, inbound inquiries, public tenders, and target list, plus an ask-anything panel over the live data. Account names and figures blurred.",
  } as null | { src: string; alt: string },
  /* Bylo's own words, from the voice note he sent on 2026-09-23 for use on
     the website (transcript in the vault: Entec Access Systems - Case Study).
     Lightly tidied from speech with his blanket OK for edits; "sales" became
     "sales motion" at David's call. */
  testimonial: {
    quote:
      "Working with David at Alpha Infra has been fantastic, on two fronts: the output has been great, and so has the experience. I can now track our top 35 customers in much more detail and depth, we understand the ROI on our Google advertising spend, and we have a custom-built CRM. It's a great foundation for our sales motion, and I would highly recommend working with him.",
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
    "Two of the things I've built: one for an operating business, one for an investment team. The rest are in the portfolio.",
  items: [
    {
      title: "A revenue intelligence system for a 15-person services business",
      summary: "Jobs, quotes, invoices, email, and public tenders read together. Every morning it ranks what needs the owner's attention, with the evidence.",
      body: "Connects SimPRO jobs and quotes, Xero invoices and payments, Outlook correspondence, and public tender feeds across five sales channels. Every morning it applies the owner's rules to rank the accounts, inquiries, service-conversion leads, target relationships, and tenders that need attention, showing what changed, why it matters, and the next action.",
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
      title: "A market scorecard for an investment team",
      summary: "Demand, supply, valuation, and macro signals weighted into a score for every market and sector, with the findings written alongside.",
      body: "Weights demand, supply, valuation, and macro signals into a score for every market, by sector, then writes the findings behind the ranking. Built for a real-estate team, and the same shape fits any set of markets an investment team has to choose between.",
      tools: "Market and macro data · Claude Code · Python",
      href: "/work",
      /* rendered as the live scorecard demo (market-scorecard.tsx) instead of
         the schematic, which stays here as the reduced/no-JS fallback */
      demo: "scorecard",
      /* The shape of the real tool, at pattern level: four signal families
         in, one scoring model, and the views the team works from. No vendors,
         formulas, market names, or figures (Stockbridge confidentiality). */
      schematic: {
        inputs: [{ lines: ["Demand growth"] }, { lines: ["Supply pressure"] }, { lines: ["Valuation trend"] }, { lines: ["Macro momentum"] }],
        plate: {
          title: "Scoring model",
          rows: ["Weights the signals", "Scores every market", "Ranks top to bottom"],
        },
        outputs: [{ lines: ["Summary", "scorecard"] }, { lines: ["Deep dive", "per market"] }, { lines: ["Written", "findings"] }],
        annotation: "ranked, with the reasons shown",
      },
    },
  ],
  link: { label: "See the full portfolio", href: "/work" },
} as const;

/* Homepage, straight after the hero: the problems people bring, in their
   own words, each paired with what gets built and what it is measured in.
   Every row restates a Quick Win example or a proof piece; no new claims.
   Added 2026-09-25 after two readers asked who the site is for and what to
   bring (see the vault: Website Feedback - 2026-09-23). */
export const problems = {
  eyebrow: "Sound familiar?",
  heading: "The problems people bring me.",
  intro:
    "Usually an owner, CFO, COO, or investment lead in a team where nobody can watch everything. Recent examples run from a 15-person services business to an investment team.",
  columns: { problem: "The problem, as people say it", built: "What gets built", measure: "Measured in" },
  rows: [
    { problem: "We find out a key account has gone quiet months too late.", built: "At-risk customer watchlist", measure: "accounts acted on before they lapse" },
    { problem: "Good inquiries sit in the inbox and get quoted late.", built: "High-value inquiry watch", measure: "response and quote time" },
    { problem: "We only really see the cash position when the month closes.", built: "Cash-pressure early warning", measure: "days of warning" },
    { problem: "Nobody is chasing the service and renewal work in our installed base.", built: "Installed-base opportunity finder", measure: "qualified opportunities found" },
    { problem: "Which of our markets deserves the next hour of analyst time?", built: "Market scorecard", measure: "ranked, with the reasons shown" },
    { problem: "Which assets are off their underwriting, and why?", built: "Portfolio exception brief", measure: "time to identify material exceptions" },
  ],
  note: "bring one of these to the first call",
  link: { label: "Six examples in full, with the fee", href: "/services#examples" },
} as const;

export const offerings = {
  heading: "Three ways to start. Two ways to extend what works.",
  intro:
    "One capability, one number, or a plan for what to build first. Each is a fixed engagement that ends with a handover, and each opens with the situation it's for. The only ongoing option is Care, further down, and that's yours to add later. If you start small and go on to a build, the first fee comes off the second.",
  /* the homepage shows the heading and this one line; the full intro is on /services */
  compactIntro:
    "Each is a fixed engagement that ends with a handover. The only ongoing option is Care, and that comes after a build.",
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
      question: "Who owns the system once it's built?",
      answer:
        "You do, all of it: the system, the code, the rules we captured, and everything it produces. I build in accounts you control, so there's nothing to hand back at the end. It was yours from day one. I keep my general methods and templates, and I won't resell your system or reuse it for anyone else.",
    },
    {
      featured: true,
      question: "What happens to my data?",
      answer:
        "Your data stays in the systems you already use. What I build reads only what it needs, through connections you own and can switch off. Some of it does pass through AI or automation providers while the system runs, so before go-live I give you a plain summary of what's sent, where it goes, how long it's kept, and how to revoke access. It's used for your system and nothing else, and anything I hold myself I'll return or delete when you ask.",
    },
    {
      question: "Will my data be used to train AI models?",
      answer:
        "No. The systems I build use commercial AI services from providers like Anthropic and OpenAI, and both state that data sent that way isn't used to train their models by default. I never use one client's data to build another client's system. How long a provider keeps data is a separate question from training, so that's covered in the data summary you get before go-live.",
    },
    {
      featured: true,
      question: "How much of the system is actually AI?",
      answer:
        "Less than you might expect. Anything rules-based or math-based, the calculations, the matching, the thresholds you set, is built with deterministic code, so it gives the same answer every time and you can check the working. I use AI only in the pieces that need judgment, like reading an inbound inquiry or drafting the reason an account was flagged, and whatever it produces is labeled as AI-made. Anything consequential waits for a person to approve it. When it does get a judgment wrong, that becomes a rule to tighten, which is part of the 30 days after go-live.",
    },
    {
      question: "Do we have to change the software we use?",
      answer:
        "No. I build around what you already run: your CRM, your accounting package, your inbox, your spreadsheets. Nothing gets migrated. The system itself needs somewhere to live, usually a few accounts in your name, and I set those up with you. If a tool you use is holding you back, I'll tell you what I'd change, and the choice stays yours.",
    },
    {
      question: "What does it cost to run once it's live?",
      answer:
        "There are running costs, mostly the AI and automation services the system uses, and they're billed to you directly. I estimate them before we start, you approve them before go-live, and I don't add a markup. You can set a spending limit with the provider so there are no surprises. If you take Care, I watch them for you each month.",
    },
    {
      featured: true,
      question: "What happens on the first call?",
      answer:
        "We start with the outcome you'd like to move: the customers, margins, or decisions where you suspect something is being missed or handled too late. I'll ask how that works today, who's involved, where the information lives, and what would change if you could see it clearly. From there it's usually possible to name the first opportunity worth building and which way of starting fits it. You'll leave knowing what I'd build first and roughly what it would cost.",
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
    "Bring the outcome you'd like to move. We'll talk through how it's handled today, where the information lives, and what would change if you could see it clearly. You'll leave knowing what I'd build first and roughly what it would cost.",
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
  body: "I'll reply personally within one business day. From there we'll set up a conversation about the outcome you'd like to move: how it's handled today, where the information lives, and what I'd build first. There's nothing to prepare, and you don't need to provide system access.",
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
        "In corporate finance at Stockbridge, I spent about six months developing a Power BI dashboard for the CFO. It brought the firm's financial and operating picture into one place: revenue and expenses against plan, cash and distribution projections, hiring, acquisitions and sales, assets under management, investor concentration, and more. From the company-level summary, the CFO could drill into a business unit, fund, asset, account, or underlying general-ledger detail.",
        "Building it properly required far more than making charts. The data had to be mapped, reconciled, and modeled, the definitions had to be agreed, and every view had to survive questions from people who understood the numbers.",
        "Then Claude Code arrived. I tried using it to build a similar way of exploring financial data and had a useful interactive first version within days. It wasn't a like-for-like replacement for the production dashboard, since the data still needed validation, controls, and testing, but it changed my sense of what one person could afford to build. Something that had previously required a specialist platform and a long project could now be explored in a day.",
        "The second moment came with roughly 700MB of macroeconomic and demographic Excel data. Within hours, Claude Code produced a first pass of the charts, analysis, key takeaways, and narrative behind the trends. Those outputs still needed to be checked, but instead of spending a week assembling the initial view, I could immediately start asking the more valuable question: which markets deserved attention, and why?",
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
      body: ["I start with the outcome, not the tool. We agree what's worth moving, trace the signals behind it, and capture the judgment the system needs to apply. Early on we check that the data is there to build on and that the opportunity is worth the scope. I use ordinary code for calculations and other exact work, and AI where interpretation is genuinely needed. I test the system on real cases, show the evidence behind its calls, and keep a person in control of consequential actions. I build in accounts you control, document the rules, and hand over the working system. You work with me throughout; there's no team to hand you off to."],
    },
  ],
  ctaLine: "Let's find the first opportunity worth building.",
} as const;

export const workCta = {
  heading: "See a decision your team should be able to make better?",
  subhead:
    "The first conversation is about the outcome you'd like to move, how it's handled today, and what I'd build first.",
  primaryCta: "Find the first opportunity worth building",
} as const;

export const footer = {
  tagline: "Opportunity AI for lean teams making high-value decisions.",
  links: [
    { label: "Services", href: "/services" },
    { label: "Portfolio", href: "/work" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
} as const;
