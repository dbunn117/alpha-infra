/*
 * Alpha Infra's offerings. Single source of truth: drives the homepage
 * offering cards, the /services overview, each /services/[slug] page, the
 * homepage Process section (SERVICES[1].howItWorks, the flagship), the
 * JSON-LD offer list, and the sitemap.
 *
 * Architecture (decided 2026-09-09, grounded in Goldman Sachs 10KSB Voices
 * Mar 2026, Thryv Apr 2026, McKinsey Aug 2026 and consultant pricing guides;
 * see the vault note "Alpha Infra - Offer Architecture Research - 2026-09-09"):
 *   three front doors (Start: Quick Win, Build: The Alpha System, Decide:
 *   AI Opportunity Sprint) and two extensions for build clients (Team AI Build
 *   Day, Alpha System Care). Coaching is kept as an unlisted page and offered
 *   privately to existing clients. Every door opens with a buyer-pain line.
 */

export type ServiceGroup = "Front door" | "Extension" | "Private";

export type Service = {
  slug: string;
  order: string; // "01".."06": data order only. Never shown: the numbers read as a sequence, and the three ways to start are alternatives (David, 2026-09-23)
  group: ServiceGroup;
  /** one-word role shown on the card caption: Start, Build, Decide, Extend */
  role: string;
  /** false: page still builds (keeps the URL) but nothing links to it */
  listed: boolean;
  name: string;
  /** lucide-react icon name */
  icon: string;
  eyebrow: string;
  /** "Start here if" line: the buyer pain this door answers */
  pain: string;
  /** short one-liner used on homepage/overview cards */
  tagline: string;
  bestFor: string;
  /** display string used on cards + pricing ladder */
  priceDisplay: string;
  /* the three-cell scan line and the path-finder choice (front doors only) */
  scan?: { outcome: string; time: string; choice: string };
  mostPopular?: boolean;
  /** chip label on the card, e.g. "Flagship", "Build clients only" */
  chip?: string;

  // Dedicated service-page copy
  h1: string;
  subhead: string;
  problemHeading: string;
  problem: string;
  whatHeading: string;
  what: string;
  whatYouGet: string[];
  /* Up to three deliverables surfaced on the homepage card */
  highlights?: string[];
  /* "How it earns trust" list (flagship) */
  trust?: string[];
  /* At-a-glance strip: the signals in, the judgment applied, what comes out (flagship) */
  glance?: { signals: string; judgment: string; output: string };
  /* "What it's made of": the layers, foundation first (flagship) */
  layers?: {
    heading: string;
    intro: string;
    items: { name: string; title: string; body: string; points: string[] }[];
  };
  /* A typical engagement, week by week (flagship) */
  timeline?: { heading: string; intro: string; steps: { when: string; title: string; body: string }[] };
  /* Worked examples at one price (Quick Win) */
  examples?: { heading: string; intro: string; items: { title: string; body: string; tools: string }[] };
  /* Short "why projects stall" note (flagship only) */
  stallsNote?: { heading: string; body: string };
  howItWorks: { title: string; body: string }[];
  whoItsFor: string;
  pricing: string;
  ctaLine: string;
};

export const SERVICES: Service[] = [
  {
    slug: "quick-win",
    order: "01",
    group: "Front door",
    role: "Start",
    listed: true,
    name: "Quick Win",
    icon: "Rocket",
    eyebrow: "Start",
    pain: "there's one opportunity, risk, or decision your team can't reliably see today, and you want proof before anything bigger.",
    tagline:
      "One valuable capability, built in two to three weeks, then measured for 30 days. The smallest version of what I build at full scale.",
    bestFor: "lean teams with one valuable blind spot and the data to see it.",
    priceDisplay: "$2,500 fixed",
    scan: { outcome: "One measured capability", time: "2 to 3 weeks", choice: "We know the one capability we need" },
    highlights: [
      "One capability, live in two to three weeks",
      "Measured for 30 days",
      "Fee comes off a later build",
    ],
    examples: {
      heading: "What a Quick Win can look like",
      intro:
        "Six examples of a tightly scoped first capability, across operating, finance, and investment work. Each turns signals the team already has into something it couldn't reliably see or act on before. All the same fixed fee, with the measure agreed before I build.",
      items: [
        {
          title: "Cash-pressure early warning",
          body: "Bank balances, receivables, payables, and near-term commitments brought into one daily view, with the dates and exceptions most likely to create pressure flagged before they become surprises.",
          tools: "Bank feed · Accounting · measured in days of warning",
        },
        {
          title: "At-risk customer watchlist",
          body: "Activity, spend, and contact history read together to surface accounts showing early signs of drift, with the evidence and next action attached.",
          tools: "CRM · Accounting · measured in accounts acted on before lapse",
        },
        {
          title: "High-value inquiry watch",
          body: "Every inbound inquiry assessed for urgency, fit, and potential value, with strong opportunities and overdue responses or quotes pushed to the top.",
          tools: "Inbox · CRM or job system · measured in response or quote time",
        },
        {
          title: "Installed-base opportunity finder",
          body: "Completed jobs and existing customers scanned for service, renewal, cross-sell, or follow-on opportunities that nobody is systematically looking for.",
          tools: "Job system · Accounting · measured in qualified opportunities found",
        },
        {
          title: "Asset or portfolio exception brief",
          body: "Every asset compared with its budget, underwriting, or operating plan, with the few that deserve attention surfaced alongside the reason and supporting evidence.",
          tools: "Portfolio data · Budget or model · measured in time to identify material exceptions",
        },
        {
          title: "Market, tender, or commercial-signal monitor",
          body: "Defined markets, tender feeds, or commercial signals watched continuously, with relevant changes ranked and explained while there's still time to act.",
          tools: "Public data feeds · measured in relevant opportunities caught",
        },
      ],
    },
    h1: "One valuable capability, live in two to three weeks, then measured for 30 days.",
    subhead:
      "A fixed-fee first build for one opportunity, risk, or decision your team can't reliably see today. We agree the outcome and measure up front, build the smallest useful version, and test it on live work. If I don't believe it can create value at this scope, I'll tell you before we start.",
    problemHeading: "The problem",
    problem:
      "Lean teams rarely lack data. They lack the time and systems to watch all of it. A customer starts to drift, cash pressure forms, an asset moves off plan, or a tender appears, and the signal surfaces late because someone would have had to join the data by hand. A Quick Win builds the smallest useful capability that catches one of those signals in time to act. You may not need a strategy or a major implementation. You need one valuable blind spot removed, and a number that shows whether it helped.",
    whatHeading: "What I do",
    what:
      "We choose one outcome and one observable measure: days of warning, response time, accounts acted on, exceptions surfaced, or qualified opportunities found. I connect no more than two data sources, capture the rules that matter, and build a working capability on your live data. It goes live in two to three weeks, with one handoff session and two weeks of support. At 30 days, we review what changed and whether anything larger is worth building. The system and its documentation are yours to keep.",
    whatYouGet: [
      "One live capability built around one defined outcome",
      "Up to two data sources, using your real data",
      "The rules, measures, and exceptions documented",
      "Sensible handling when the data is incomplete or uncertain",
      "One handoff session and two weeks of support",
      "A 30-day review against the measure agreed up front",
      "The working system and documentation, yours to keep",
    ],
    howItWorks: [
      {
        title: "Pick the thing",
        body: "On the discovery call we find the one thing worth building first and agree how we'll measure the change.",
      },
      {
        title: "Build",
        body: "I build it inside your real tools and test it on real cases before you have to rely on it.",
      },
      {
        title: "Hand off",
        body: "One session so your team runs it with confidence, then two weeks of support.",
      },
      {
        title: "Measure",
        body: "At 30 days we look at the number together and decide whether there's a next step.",
      },
    ],
    whoItsFor:
      "Lean teams with one valuable blind spot, accessible data, and someone close enough to the work to know what actually matters. If the outcome depends on several connected systems, decisions, or teams, it's probably an Alpha System instead.",
    pricing:
      "$2,500 fixed. That covers one capability, one team, up to two systems, one defined outcome, one handoff session, two weeks of support, and the 30-day review. No historical data migration. If I don't think a useful result fits this scope, I'll tell you before we start. If you move to an Alpha System within 90 days, the full $2,500 is credited.",
    ctaLine: "Let's find the first capability worth building.",
  },
  {
    slug: "system",
    order: "02",
    group: "Front door",
    role: "Build",
    listed: true,
    name: "The Alpha System",
    icon: "LineChart",
    eyebrow: "Build",
    pain: "an important outcome depends on signals scattered across the business, and nobody can watch all of them.",
    tagline:
      "My flagship build. A live decision system for one high-value outcome. It connects the relevant signals, applies your operating judgment, surfaces what deserves attention, and carries the next action into the work.",
    bestFor: "teams where an important outcome depends on signals scattered across the business.",
    priceDisplay: "$10,000 to $15,000 typical",
    scan: { outcome: "One live decision system", time: "About 6 weeks to go live", choice: "A high-value outcome depends on scattered signals" },
    mostPopular: true,
    chip: "Flagship",
    highlights: [
      "One outcome and its measure, named up front",
      "Opportunities and risks prioritized with the evidence behind them",
      "The next action put in front of the person who owns the decision",
    ],
    glance: {
      signals:
        "Your CRM, spreadsheets, accounting package, inbox, and the public feeds that matter. Built around the systems you already use wherever that makes sense, with no unnecessary migration.",
      judgment:
        "Your definitions, priorities, and decision rules: what matters, what can wait, and when a person needs to decide.",
      output:
        "A ranked opportunity, risk, or exception, with the evidence and next action attached. Where appropriate, the system drafts, routes, or updates the work, with your approval before anything consequential happens.",
    },
    layers: {
      heading: "What it's made of",
      intro:
        "One system, five layers, built in this order. Together they turn scattered data into a continuous loop: understand the business, read the signals, identify what matters, carry it into action, and measure what changed.",
      items: [
        {
          name: "01 · Operating memory",
          title: "The system understands how your business decides.",
          body: "Your definitions, priorities, and judgment, captured: what counts as a key account, when an exception matters, which opportunities deserve attention, and when a person must decide. This becomes portable, readable documentation that you own, not knowledge trapped inside a vendor platform.",
          points: ["Definitions and decision rules", "Priorities, roles, and approval boundaries", "Important decisions and why they were made"],
        },
        {
          name: "02 · Connected signals",
          title: "It keeps the relevant picture current.",
          body: "Secure connections bring together the operating, financial, and external signals behind the outcome. The system reads what it needs from the software you already use, in accounts you control, without an unnecessary migration.",
          points: ["CRM, job, project, and portfolio systems", "Accounting, email, and documents", "Relevant internal and public data feeds"],
        },
        {
          name: "03 · Opportunity intelligence",
          title: "It identifies what deserves attention.",
          body: "The system reads current signals through the rules and judgment in your operating memory. It identifies opportunities, risks, and exceptions, ranks them by importance, and shows the evidence behind every call it makes.",
          points: ["Important changes detected as they happen", "Opportunities and risks ranked by your priorities", "Evidence and uncertainty shown clearly"],
        },
        {
          name: "04 · Action loop",
          title: "It carries the decision into the work.",
          body: "Once something deserves attention, the system puts the next action in front of the right person. Where appropriate, it can draft the response, create the follow-up, route the exception, or update the record, with human approval wherever you decide it matters.",
          points: ["A clear owner and next action", "Drafting, routing, and record updates", "Human approval before consequential changes"],
        },
        {
          name: "05 · Measurement",
          title: "It shows whether the outcome moved.",
          body: "The measure agreed at the start is tracked against its baseline after go-live. We use real results to refine the rules, improve the system, and decide whether another capability is worth adding to the same foundation.",
          points: ["Thirty-day measurement against the baseline", "Rules refined through real use", "The next capability built on the same foundation"],
        },
      ],
    },
    timeline: {
      heading: "A typical engagement",
      intro:
        "Most Alpha Systems go live within six weeks. They then run on live data for 30 days while we measure the agreed outcome, tune the rules, and confirm that the system is earning its place. Your involvement is usually six to eight working sessions of about an hour each. The rest is mine.",
      steps: [
        { when: "Week 0 · Fit check", title: "Name the opportunity", body: "A 30-minute conversation to identify the outcome worth moving and confirm that the necessary data exists." },
        { when: "Weeks 1 to 2 · Foundation", title: "Define the outcome and connect the signals", body: "We establish the baseline, map the decisions behind it, capture the important rules, and connect the relevant data. The rules come out of our conversations, so there's nothing for you to write up." },
        { when: "Weeks 3 to 5 · Build and test", title: "Build on real cases", body: "I build the working system and test it against representative scenarios and edge cases. Weekly working sessions let us correct the judgment as the system takes shape." },
        { when: "By week 6 · Go live", title: "Put it into daily use", body: "The system moves onto live data, your team begins using it, and the ownership, documentation, and approval boundaries are handed over." },
        { when: "Following 30 days · Prove and tune", title: "Measure what changed", body: "The system is already live. I monitor its quality, refine the rules, and read the agreed measure against its baseline. At the end, we decide whether to maintain it, extend it, or stop there." },
      ],
    },
    trust: [
      "Calculations, thresholds, permissions, and exact matching are handled with ordinary deterministic code, not left to an AI model",
      "AI is reserved for work that genuinely requires interpretation: extracting meaning, classifying, summarizing, ranking, and drafting",
      "Before go-live, those AI judgments are tested against representative real cases and known edge cases. The same tests are rerun whenever the model, prompt, rules, or data connections change",
      "Every AI-generated match, recommendation, or summary is clearly identified and shows the evidence behind it",
      "When the system is uncertain, it escalates rather than guesses. Anything consequential waits for the human approval you defined",
      "The system runs in accounts you control, and decisions, approvals, and rule changes remain traceable",
    ],
    stallsNote: {
      heading: "Why most AI projects stall",
      body: "AI projects stall when they start with a tool, bolt AI onto an old workflow, or leave the business's judgment implicit. The Alpha System starts with one measurable outcome, captures the rules behind the decision, and redesigns only the part of the workflow required to move it. The person accountable stays involved while it's built, then it runs on live data and is measured for 30 days after go-live.",
    },
    h1: "One live decision system, built to see what your business couldn't see before.",
    subhead:
      "It connects the signals behind one high-value outcome, applies your operating judgment, and continuously surfaces the opportunity, risk, or exception that matters next, with the evidence and action attached. Built in your accounts, owned by you, and measured against a baseline agreed before we start.",
    problemHeading: "The problem",
    problem:
      "The person accountable for an outcome can usually name what's going wrong: customers drifting, quotes moving too slowly, margin appearing too late, an asset moving off plan, or an opportunity noticed after the window has closed. The signals already exist, but one lives in the operating system, another in the financial data, and another in email or a spreadsheet. Nobody can hold the complete picture in view continuously, so the decision gets made from memory or last month's report.",
    whatHeading: "What The Alpha System is",
    what:
      "It isn't a dashboard and it isn't a data integration project. It's a live decision system, built for your business, that connects the relevant signals, applies the judgment you'd apply, and puts what deserves attention in front of the person who owns the decision, with the evidence behind it. We start by naming the one outcome you want to move, so the first phase has a finish line. Then I connect the systems that carry the relevant signals and capture your operating memory, your rules, definitions, and judgment, so the system works the way you would rather than the way a template would. Every workflow after the first is built on that same foundation.",
    whatYouGet: [
      "One business outcome with its baseline, agreed before we build anything",
      "A current-state map of the workflow and the data behind the outcome",
      "A working system connected to a defined set of your existing tools, no rip-and-replace",
      "Decision rules and the human approvals the system must ask for, written down",
      "The recurring work done inside your tools, with a visible queue of what it did and what it's holding for a person",
      "Your operating memory: the rules, definitions, and judgment the system runs on, yours to keep",
      "Documentation and a proper handover. You own the system outright",
      "30 days of measurement and tuning after go-live, reading the number together",
    ],
    howItWorks: [
      {
        title: "Name the opportunity",
        body: "We agree the one outcome this engagement exists to move, what's constraining it today, and how we'll know it moved.",
      },
      {
        title: "Trace the data",
        body: "I map where the data that predicts and drives that outcome lives, how the work actually happens, and which decisions change the number. I assess the right stack, working inside the systems you already run wherever it makes sense.",
      },
      {
        title: "Capture the rules",
        body: "Your operating memory: the definitions, judgment, and rules the business runs on. We talk them through on a call and I turn the conversation into the rules the system follows, so there's nothing for you to document.",
      },
      {
        title: "Build and test",
        body: "I connect the data, build the system on top of it, and test it on real scenarios and real data before you have to rely on it day to day.",
      },
      {
        title: "Go live and measure",
        body: "I connect it to your live data, get your team using it for real, and we watch the number for 30 days. You own it outright. If you're comfortable with tools like Claude Code, I can set you up to maintain simple changes yourself. Build clients can then move onto Alpha System Care.",
      },
    ],
    whoItsFor:
      "A fit when one measurable outcome depends on several signals, rules, and actions spread across the business, and the person accountable can work with me to define the judgment behind it. If the need is one tightly defined capability using no more than two systems, start with a Quick Win instead. If several capabilities need to work together around the same outcome, that's an Alpha System.",
    pricing:
      "Typical engagement: $10,000 to $15,000. Focused systems start at $7,500. Final scope depends on the systems being connected, the amount of business judgment being captured, and the actions the system needs to support. A Quick Win or Sprint fee comes off if the build starts within 90 days. Alpha System Care is available afterward, to build clients only.",
    ctaLine: "Ready to name the opportunity?",
  },
  {
    slug: "strategy",
    order: "03",
    group: "Front door",
    role: "Decide",
    listed: true,
    name: "AI Opportunity Sprint",
    icon: "Compass",
    eyebrow: "Decide",
    pain: "several AI opportunities look plausible, different people are advocating different tools, and nobody has a shared basis for deciding what deserves investment.",
    tagline:
      "A two-week decision sprint: rank the opportunities, make the build, buy, or not-now calls, and leave with a 90-day roadmap and one prototype.",
    bestFor: "lean leadership teams with more AI opportunities than a way to choose between them.",
    priceDisplay: "$7,500 fixed",
    scan: { outcome: "A ranked roadmap and one prototype", time: "2 weeks", choice: "We have several plausible AI opportunities" },
    highlights: [
      "Opportunities ranked by value, feasibility, cost, and risk",
      "A 90-day roadmap and one prototype",
      "Half the fee credited to a build",
    ],
    h1: "Decide where AI can create an advantage, and what to build first.",
    subhead:
      "A two-week decision sprint for lean leadership teams with more possible AI ideas than capacity to pursue them. You leave with a ranked opportunity portfolio, build, buy, or not-now decisions, practical guardrails, a 90-day roadmap, and one prototype that makes the first opportunity tangible.",
    problemHeading: "The problem",
    problem:
      "Most teams don't lack AI ideas. They lack a reliable way to distinguish a productivity improvement from a genuinely valuable new capability, and either from a distraction. Use cases arrive tool by tool. The expected value is rarely tested, the necessary data is discovered too late, and nobody makes an explicit build, buy, or not-now decision. The result is a collection of pilots that never moves a business outcome, or a leadership team that keeps waiting for the answer to become clearer.",
    whatHeading: "What the sprint is",
    what:
      "During week one, I interview the people accountable for the outcomes and the people closest to the work. We identify where revenue, margin, risk, or decision quality is constrained, then turn those problems into specific opportunities, each with an owner, a value hypothesis, a possible measure, and the data it would require. During week two, we rank those opportunities by potential value, feasibility, cost, and risk. Together we make the build, buy, not-now, or do-nothing call on each, select the first opportunity to test, and establish practical rules for human review, accountability, and sensitive data. I build a small prototype using representative data to test the most important assumption. It's evidence for the decision, not a production system. You leave with a 90-day roadmap your team can lead.",
    whatYouGet: [
      "A ranked portfolio of opportunities tied to business outcomes",
      "A value hypothesis and proposed measure for each shortlisted opportunity",
      "Build, buy, not-now, or do-nothing decisions, with the reasoning recorded",
      "Data readiness, dependencies, and constraints for the leading options",
      "Practical rules for human review, accountability, and sensitive information",
      "A 90-day roadmap with sequence, owners, and decision points",
      "One prototype using representative data to test the most important assumption",
      "Success criteria for deciding whether that prototype should become a real build",
    ],
    howItWorks: [
      {
        title: "Find the value",
        body: "Identify the outcomes worth moving. Interviews with the people accountable for the result and closest to the work: where revenue, margin, risk, time, or decision quality is being constrained.",
      },
      {
        title: "Frame the opportunities",
        body: "Turn problems into testable use cases. Define the capability, owner, value hypothesis, measure, required data, and important risks for each candidate.",
      },
      {
        title: "Make the calls",
        body: "Build, buy, wait, or do nothing. Rank the opportunities openly and make an explicit decision on each, rather than leaving a list of undifferentiated ideas.",
      },
      {
        title: "Test the first one",
        body: "Prototype the critical assumption. Build enough, using representative data, to learn whether the first opportunity deserves a production investment.",
      },
      {
        title: "Assign the roadmap",
        body: "Put decisions, owners, and dates behind it. Leave with a 90-day sequence your team owns, including the next decision point for every item.",
      },
    ],
    whoItsFor:
      "Lean leadership teams with several plausible AI opportunities, limited capacity to pursue them, and no shared method for deciding what deserves investment. If you already know the capability, the outcome, the required data, and how you'll measure it, skip the Sprint and start with a Quick Win or Alpha System instead.",
    pricing:
      "$7,500 fixed, two weeks. Half is credited toward an Alpha System build started within 90 days.",
    ctaLine: "Choose the first opportunity worth building.",
  },
  {
    slug: "workshops",
    order: "04",
    group: "Extension",
    role: "Extend",
    listed: true,
    name: "Team AI Build Day",
    icon: "Users",
    eyebrow: "Extension",
    pain: "your team uses AI, but unevenly, untrained, and without rules.",
    tagline:
      "A working day with 4 to 8 people. Two or three of your real workflows redesigned, one reusable agent built, the team's rules written. I come back 30 days later to see what stuck.",
    bestFor: "teams that already have a system or a workflow worth building around.",
    priceDisplay: "Half-day from $3,500 · Full day from $6,000",
    h1: "A day your team leaves with working tools, not notes.",
    subhead:
      "This isn't a training course. It's a working day where 4 to 8 people redesign their own workflows, build one reusable agent from company material, and write the rules they'll hold themselves to. Everyone leaves with something running and a name next to what happens next.",
    problemHeading: "The problem",
    problem:
      "Most teams have had some AI training, and most of it came from YouTube. Generic sessions don't stick. People nod along and go back to the old way by Thursday. What sticks is building something real, with your own work, alongside someone who's done it before.",
    whatHeading: "What the day is",
    what:
      "I shape the day around two or three workflows your team actually runs. We redesign them in the room: fewer steps, clearer handoffs, people reviewing the exceptions instead of pushing paper. Then we build one reusable agent or skill from your own documents and data, and write the team's rules for accuracy, review, and sensitive data. A half day covers one workflow and the agent build; a full day adds a second workflow and more time to get the team's rules right. The day ends with named owners and next actions. I come back 30 days later to see what stuck and fix what didn't.",
    whatYouGet: [
      "Two or three of your real workflows redesigned, in the room",
      "One reusable agent or skill built from your own material",
      "Team rules for accuracy, review, and sensitive data, written down",
      "Named owners and next actions for each workflow",
      "A concise internal playbook",
      "A 30-day follow-up clinic",
    ],
    howItWorks: [
      {
        title: "Tailor",
        body: "I pick the workflows with you and gather the material we'll build from.",
      },
      {
        title: "Redesign",
        body: "Each workflow rebuilt around AI in the room, with the people who run it.",
      },
      {
        title: "Build",
        body: "One reusable agent or skill, built together, from your documents and data.",
      },
      {
        title: "Sustain",
        body: "Owners, next actions, a playbook, and a clinic 30 days later.",
      },
    ],
    whoItsFor:
      "Teams of 4 to 8, usually alongside or after a build, who learn by doing and want to leave with working tools.",
    pricing:
      "Half-day from $3,500. Full day from $6,000. Up to 8 people, on-site on the Peninsula or virtual. Includes the 30-day clinic.",
    ctaLine: "Book a build day for the team.",
  },
  {
    slug: "care",
    order: "05",
    group: "Extension",
    role: "Extend",
    listed: true,
    name: "Alpha System Care",
    icon: "LifeBuoy",
    eyebrow: "Extension",
    pain: "the system is live and you want it kept accurate and improving without having to remember to check.",
    tagline:
      "For build clients only. Every month I check quality, cost, and reliability, update the rules as the business changes, work the exceptions, and report against your number.",
    bestFor: "owners who want the system looked after by the person who built it.",
    priceDisplay: "From $1,500/mo · build clients only",
    chip: "Build clients only",
    h1: "Keep the system honest, current, and improving.",
    subhead:
      "AI systems drift. Rules go stale, a vendor changes a model, the business changes shape. Care is the monthly routine that catches it, reports against the number we built the system to move, and keeps improving it. Only for clients whose system I built.",
    problemHeading: "The problem",
    problem:
      "A system is most at risk in the months after launch. Definitions change, a supplier renames a field, a model update changes an answer, and nobody notices until the owner stops trusting the output. Most AI projects don't fail at launch. They fade.",
    whatHeading: "What Care is",
    what:
      "A monthly routine, run by the person who built the system. I review output quality and reliability, watch cost and usage (token spend in plain numbers), update rules and models as the business or the vendors change, work through the exceptions your team flagged, and send a one-page report against the number. Each month includes a monthly improvement scope agreed with you in advance, and each quarter we sit down and decide what's worth building next. The upper tier adds a monthly working session with you.",
    whatYouGet: [
      "Monthly reliability and output-quality review",
      "Cost and usage monitoring, with token and vendor spend in plain numbers",
      "Rule, prompt, and model updates as the business and the vendors change",
      "A monthly report against the number the system was built to move",
      "Staff feedback and exception review",
      "A monthly improvement scope, agreed with you in advance",
      "A quarterly opportunity-planning session",
      "Upper tier: a monthly working session with the owner and opportunity triage",
    ],
    howItWorks: [
      {
        title: "Monitor",
        body: "Quality, reliability, cost, and usage, checked every month.",
      },
      {
        title: "Report",
        body: "One page against the named number, plus what changed and why.",
      },
      {
        title: "Improve",
        body: "Rules and models updated, exceptions resolved, the allowance spent on what matters.",
      },
      {
        title: "Plan",
        body: "A quarterly session on what's worth building next.",
      },
    ],
    whoItsFor:
      "Clients whose Alpha System is live and who want it maintained and improved by the person who built it.",
    pricing:
      "$1,500 to $4,000 per month depending on the number of systems and a monthly improvement scope agreed in advance. Offered only after an Alpha System build, and capped at a handful of clients so each gets real attention. The upper tier adds the monthly owner working session.",
    ctaLine: "Talk about Care for your system.",
  },
  {
    slug: "coaching",
    order: "06",
    group: "Private",
    role: "Private",
    listed: false,
    name: "1:1 Coaching",
    icon: "UserRound",
    eyebrow: "For existing clients",
    pain: "you use AI every day and suspect you're getting a fraction of what it can do.",
    tagline:
      "Personal coaching for how you work with AI, offered privately to existing clients. Fundamentals, verification habits, and prompt and agent design, only the parts you need.",
    bestFor: "owners and executives inside a current engagement.",
    priceDisplay: "Sessions from $350",
    h1: "Get dramatically more out of AI, personally.",
    subhead:
      "One-on-one coaching tailored to how you work, offered to clients I'm already building with. Whether you use AI as a thought partner or need every output to be accurate, I meet you where you are.",
    problemHeading: "The problem",
    problem:
      "You use AI, but you suspect you're getting a fraction of what it can do. Generic tips don't fit your actual role, and it's hard to tell good output from confident-but-wrong output.",
    whatHeading: "What I do",
    what:
      "Personal coaching built around your role and goals: using AI as a genuine strategy and thought partner, keeping outputs accurate with the verification habits that matter, and designing the prompts and agents you'll actually use. Available inside Alpha System Care or as standalone sessions for existing clients.",
    whatYouGet: [
      "Coaching tailored to your role, tools, and goals",
      "Practical prompt, agent, and verification techniques you'll use daily",
      "A faster, more confident, more accurate way of working with AI",
    ],
    howItWorks: [
      {
        title: "Calibrate",
        body: "Your role, your goals, and where AI can help most.",
      },
      {
        title: "Coach",
        body: "Working sessions on real tasks from your actual work.",
      },
      {
        title: "Reinforce",
        body: "Async support between sessions so it sticks.",
      },
    ],
    whoItsFor: "Owners and executives inside a current Alpha Infra engagement.",
    pricing:
      "Sessions from $350 (60 to 90 minutes), for existing clients. Included in the upper tier of Alpha System Care.",
    ctaLine: "Ask about coaching inside your engagement.",
  },
];

export const SERVICE_GROUPS: ServiceGroup[] = ["Front door", "Extension", "Private"];

export const LISTED_SERVICES = SERVICES.filter((s) => s.listed);

export function getService(slug: string): Service | undefined {
  return SERVICES.find((s) => s.slug === slug);
}

export function servicesByGroup(group: ServiceGroup): Service[] {
  return SERVICES.filter((s) => s.group === group && s.listed);
}
