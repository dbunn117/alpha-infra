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
 *   Leadership AI Sprint) and two extensions for build clients (Team AI Build
 *   Day, Alpha System Care). Coaching is kept as an unlisted page and offered
 *   privately to existing clients. Every door opens with a buyer-pain line.
 */

export type ServiceGroup = "Front door" | "Extension" | "Private";

export type Service = {
  slug: string;
  order: string; // "01".."06"
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
  /* At-a-glance strip: what goes in, what sets it off, what comes out (flagship) */
  glance?: { input: string; trigger: string; output: string };
  /* "The reality today" cost box: the manual version, in the buyer's facts (flagship) */
  reality?: { heading: string; items: string[] };
  /* "What it's made of": the layers, foundation first (flagship) */
  layers?: {
    heading: string;
    intro: string;
    items: { name: string; title: string; body: string; points: string[] }[];
  };
  /* A typical engagement, week by week (flagship) */
  timeline?: { heading: string; intro: string; steps: { when: string; title: string; body: string }[] };
  /* Tools the system reads and writes back into (flagship) */
  connects?: { heading: string; note: string; tools: { name: string; icon?: string }[] };
  /* Worked examples at one price (Quick Win) */
  examples?: { heading: string; intro: string; items: { title: string; body: string; tools: string }[] };
  /* "Why most AI projects stall" ledger (flagship only) */
  stalls?: {
    heading: string;
    intro: string;
    items: { fail: string; body: string; counter: string }[];
    source: { label: string; href: string };
  };
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
    pain: "the same manual job eats hours every week and you'd like proof before committing to anything bigger.",
    tagline:
      "One repetitive workflow, automated inside the tools you already use, live in two to three weeks. Then we measure what it saved over 30 days.",
    bestFor: "owners who want proof on one workflow before a bigger decision.",
    priceDisplay: "$2,500 fixed",
    highlights: [
      "One workflow, one team, your existing software",
      "Live in two to three weeks, measured for 30 days",
      "The fee comes off an Alpha System if you go on to build one",
    ],
    examples: {
      heading: "What a Quick Win looks like",
      intro:
        "Six shapes it tends to take, across finance, operations, and sales. All the same price, and each one comes with the number we'll measure it by.",
      items: [
        {
          title: "Invoice capture and coding",
          body: "Invoices arrive in a shared mailbox, get read, coded, and matched, and land in the accounting package queued for someone to approve.",
          tools: "Inbox · Xero or QuickBooks · measured in hours and errors",
        },
        {
          title: "Month-end document chase",
          body: "The requests, reminders, and collection that month-end waits on, tracked in one place and chased without a person doing the chasing.",
          tools: "Inbox · Shared drive · measured in days to close",
        },
        {
          title: "Management pack first draft",
          body: "The numbers pulled from the accounting package and the commentary drafted in your house style, so the team edits instead of starting from a blank page.",
          tools: "Accounting · Spreadsheets · measured in hours",
        },
        {
          title: "Enquiry triage and quote routing",
          body: "Every inbound enquiry tagged, summarised, and routed to the right person with a draft reply, so nothing waits past your quote deadline.",
          tools: "Inbox · CRM · measured in turnaround time",
        },
        {
          title: "Contract and lease intake",
          body: "Key terms pulled out of the documents that arrive by email, filed where they belong, with renewals and deadlines flagged before they get missed.",
          tools: "Inbox · Shared drive · measured in hours and misses",
        },
        {
          title: "The Monday digest",
          body: "One page every Monday stitched from three tools: what moved, what's late, what needs a decision.",
          tools: "Any three tools · measured in hours",
        },
      ],
    },
    h1: "One workflow, automated and measured, in three weeks.",
    subhead:
      "A fixed-fee automation for one high-volume manual process, built in the software you already use and measured against a number we agree up front. If the discovery call doesn't turn up a workflow worth doing, there's no fee.",
    problemHeading: "The problem",
    problem:
      "The problem is usually the same. Someone on your team is re-keying quotes, chasing the same emails, or moving numbers between a spreadsheet and the accounting package every week. You don't need a strategy for that. You need it fixed, and a number that shows it worked.",
    whatHeading: "What I do",
    what:
      "We pick one process on the discovery call and agree how we'll measure it: hours, turnaround time, or errors. I build the automation inside your existing tools, usually with Claude and n8n or Power Automate, as a skill, an agent, or a workflow your team actually uses. It goes live in two to three weeks with one handoff session and two weeks of support, and at 30 days we read the number together. It's the smallest version of what I build at full scale. Working software, not a slide deck.",
    whatYouGet: [
      "One workflow automated, with the measure agreed before we start",
      "Built in your existing software, at most two tools, no new subscriptions",
      "One clear input and output, with sensible handling for the exceptions",
      "One handoff session with your team, plus two weeks of support",
      "A 30-day read of the number: hours, turnaround, or errors removed",
      "An honest view of what's worth building next, if anything",
    ],
    howItWorks: [
      {
        title: "Pick the workflow",
        body: "On the discovery call we find the manual process that's costing the most and agree how we'll measure the change.",
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
      "Owners and small teams who want a low-risk, fixed-fee start and a real result to point to before going further.",
    pricing:
      "$2,500 fixed. The scope is deliberately tight: one workflow, one team, at most two tools, your existing software, one defined input and output, one handoff session, two weeks of support. No custom interface and no historical data migration. If the discovery call doesn't find a workflow worth doing, there's no fee. If it leads to an Alpha System within 90 days, the $2,500 comes off.",
    ctaLine: "Let's find the first workflow.",
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
    pain: "your team spends its day moving information between a CRM, spreadsheets, an accounting package, and an inbox, and you can name the number that suffers for it.",
    tagline:
      "My flagship build. I connect the tools you already run, write down how the business decides, and build the AI-native system that does the recurring work your team still does by hand. Scoped to one number at a time, so it has a finish line.",
    bestFor: "finance, operations, and owner-led teams whose work lives in three or more tools.",
    priceDisplay: "From $7,500",
    mostPopular: true,
    chip: "Flagship",
    highlights: [
      "One number, named up front, so the build has a finish line",
      "An AI-native system that does the recurring work inside your tools",
      "Your operating memory, written down, yours to keep",
    ],
    glance: {
      input:
        "Your CRM, spreadsheets, accounting package, and inbox, plus public feeds where they matter. Nothing migrates; it reads what you already run.",
      trigger:
        "Every morning, and the moment something happens: an invoice arrives, an enquiry lands, an account goes quiet, a deadline passes.",
      output:
        "The recurring work done: numbers posted, replies drafted, documents filed, exceptions held for a person to approve. And the number, read every month.",
    },
    reality: {
      heading: "The week, by hand",
      items: [
        "Three systems that don't talk: jobs or deals in one, the money in another, the conversations in email",
        "Month-end built from exports and a spreadsheet, then checked by the person who built it",
        "The same numbers keyed twice, in two tools, by two people",
        "Enquiries and requests waiting on whoever gets to the inbox first",
        "The whole picture living in one person's head, rebuilt from memory every week",
      ],
    },
    layers: {
      heading: "What it's made of",
      intro:
        "One system, five layers, foundation first. Each one is useful on its own and makes the next one possible. The two layers underneath, the operating memory and the connections to your tools, are effectively the company's brain. Everything after that is built on them, so the next workflow starts from there rather than from scratch.",
      items: [
        {
          name: "01 · Operating memory",
          title: "The system understands the business.",
          body: "Your rules, definitions, and judgment, written down. What counts as a key account, when a quote is late, who gets called first, the strategy and the people. I keep it as plain-text files (I use Obsidian) that you and any AI can read, so it stays yours and doesn't lock you into a vendor.",
          points: ["Definitions and rules", "Strategy, team, and roles", "Decisions, and why they were made"],
        },
        {
          name: "02 · Connections",
          title: "It reads the tools you already run.",
          body: "Secure connectors to your CRM, job or project system, accounting package, inbox, and the public feeds that matter, set up in your accounts under your credentials. Nothing migrates.",
          points: ["CRM and job systems", "Accounting", "Email, calendar, documents, public feeds"],
        },
        {
          name: "03 · Intelligence",
          title: "It reads everything and works out what needs doing.",
          body: "Your data plus the operating memory, read by AI every morning and whenever something happens. It knows which invoice is due, which enquiry is waiting, which account has gone quiet, and shows its evidence for each.",
          points: ["Knows what's due and what's waiting", "Alerts for the events you defined", "Evidence shown for every call it makes"],
        },
        {
          name: "04 · Work",
          title: "It does the work, with your approval where it matters.",
          body: "Numbers posted, invoices coded, follow-ups drafted, documents filed, reports assembled, records updated. Each with a human approval wherever you decided one is needed, and written back into the tools you already use.",
          points: ["Posting, coding, filing, drafting", "Recurring reports and packs", "Approvals before anything changes a record"],
        },
        {
          name: "05 · The number",
          title: "It is measured, and it grows.",
          body: "The number we named, read every month against its baseline. Once the foundation is running, the next workflow or the next number is a change to the same system rather than a new project.",
          points: ["Monthly read against the baseline", "The next number on the same foundation", "Alpha System Care keeps it current"],
        },
      ],
    },
    timeline: {
      heading: "A typical engagement",
      intro:
        "Usually six weeks to go-live, then 30 days of measurement. Eight working sessions, about an hour of your time each. The rest is mine. Smaller scopes go faster; bigger ones add build weeks, not process.",
      steps: [
        { when: "Week 0", title: "Discovery call", body: "Thirty minutes to name the number worth moving and check the data is there to move it." },
        { when: "Week 1", title: "Name the number, trace the data", body: "Interviews, tool access, the current-state map, and the baseline we'll measure against." },
        { when: "Week 2", title: "Operating memory and connections", body: "Your rules and definitions written down, your tools connected in your accounts." },
        { when: "Weeks 3 to 5", title: "Build and test", body: "Weekly working sessions with you. Definitions get corrected by real use, which is the point." },
        { when: "Week 6", title: "Go live", body: "Live data, your team using it, ownership handed over." },
        { when: "Weeks 7 to 10", title: "Measure and tune", body: "Thirty days reading the number together, then Care if you want it looked after." },
      ],
    },
    connects: {
      heading: "Reads the tools you already run",
      note: "and writes back into them. Set up in your accounts, under your credentials.",
      tools: [
        { name: "Xero", icon: "xero" },
        { name: "QuickBooks", icon: "quickbooks" },
        { name: "HubSpot", icon: "hubspot" },
        { name: "Salesforce" },
        { name: "Pipedrive" },
        { name: "SimPRO" },
        { name: "Microsoft 365" },
        { name: "Google Workspace" },
        { name: "n8n", icon: "n8n" },
        { name: "Zapier", icon: "zapier" },
        { name: "Make", icon: "make" },
        { name: "Slack" },
        { name: "Notion", icon: "notion" },
        { name: "Airtable", icon: "airtable" },
        { name: "Claude", icon: "claude" },
      ],
    },
    trust: [
      "It runs in your accounts, under your credentials. The tools, the AI subscriptions, and the automation platform are set up in your name, so nothing depends on mine",
      "Anything the AI matched or suggested is marked as AI-made. It's never blended in as if a person did it",
      "Every flag shows its evidence, so you can check the call in a few seconds",
      "Anything that changes a system of record waits for a human approval you've defined",
      "Decisions and rule changes get recorded, so you can always see why the system did what it did",
      "When it isn't sure, it says so and escalates rather than guessing",
    ],
    stalls: {
      heading: "Why most AI projects stall, and why this one is built not to.",
      intro:
        "Eight in ten people say AI makes them personally more productive. Only 37 percent of organisations can point to any effect on profit, and that number hasn't moved in a year. That gap isn't the technology. It's five decisions that get skipped. I've made each of these mistakes at least once, which is why the Alpha System is built around not repeating them.",
      items: [
        {
          fail: "It started with the tool, not the number.",
          body: "'Let's use AI' is a project with no finish line. Nobody can say what moved, so nobody defends it when the pilot budget runs out.",
          counter: "We name one number before anything gets built, and the whole engagement exists to move it.",
        },
        {
          fail: "AI was layered onto the old workflow.",
          body: "A chatbot bolted onto a process designed for spreadsheets saves minutes and changes nothing. The organisations that see profit from AI redesign the work around it, nearly three-quarters of them, against a quarter of everyone else.",
          counter: "We trace the data and the decisions behind the number, then rebuild that flow, not the whole business.",
        },
        {
          fail: "Nobody wrote down how the business actually decides.",
          body: "What counts as a key account, when a quote is late, which customer gets a call first. If that lives only in the owner's head, the AI guesses, and the owner stops trusting it.",
          counter: "Your operating memory: your rules, definitions, and judgment written down, so the system works the way you would, and you keep it.",
        },
        {
          fail: "The owner was not in the room.",
          body: "Delegated to IT or a vendor, the build drifts toward what's easy to demo rather than what changes the number. In the builds I've done, the definitions have changed at least once part-way through, because the owner was there to correct them.",
          counter: "Eight working sessions with you, not a spec handed over once.",
        },
        {
          fail: "It went live and nobody measured or stayed.",
          body: "Without a number being measured and someone close by when the business changes, the system stops being used.",
          counter: "We go live, we watch the number for 30 days, and Alpha System Care keeps it honest after that.",
        },
      ],
      source: {
        label: "McKinsey Global Survey, \"The state of AI in 2026: On the road to ROI,\" 25 August 2026. 1,719 respondents in 97 countries, fielded 4 May to 8 June 2026.",
        href: "https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai",
      },
    },
    h1: "One AI-native system that does the work your team still does by hand.",
    subhead:
      "I connect the tools you already run, write down how the business decides, and build the layer that does the recurring work: reconciling, drafting, filing, chasing, reporting, with your approvals wherever they matter. Scoped to one number at a time, so it has a finish line.",
    problemHeading: "The problem",
    problem:
      "Most owners I speak to can name the number that's hurting: accounts leaving without anyone noticing, quotes going out too slowly, margin nobody can see until quarter end. The data to move it already exists. The problem is that it's split across a CRM, a spreadsheet, an accounting package, and an inbox, so nobody sees the whole picture in time to act, and the number gets managed from memory and last month's report.",
    whatHeading: "What The Alpha System is",
    what:
      "It isn't a dashboard and it isn't a data integration project. It's software, built for your business, that does the recurring work your team does by hand today: reading what arrives in the inbox, posting the numbers, drafting the replies, filing the documents, assembling the pack, and holding anything uncertain for a person to approve. We start by naming the one number you want to move, so the first phase has a finish line. Then I connect the tools you already run and write down your operating memory, your rules, definitions, and judgment, so the AI works the way you would rather than the way a template would. Every workflow after the first is built on that same foundation.",
    whatYouGet: [
      "One business number with its baseline, agreed before we build anything",
      "A current-state map of the workflow and the data behind the number",
      "A working system connected to a defined set of your existing tools, no rip-and-replace",
      "Decision rules and the human approvals the system must ask for, written down",
      "The recurring work done inside your tools, with a visible queue of what it did and what it's holding for a person",
      "Your operating memory: the rules, definitions, and judgment the system runs on, yours to keep",
      "Documentation and a proper handover. You own the system outright",
      "30 days of measurement and tuning after go-live, reading the number together",
    ],
    howItWorks: [
      {
        title: "Name the number",
        body: "We agree the one outcome this engagement exists to move, what's constraining it today, and how we'll know it moved.",
      },
      {
        title: "Trace the data",
        body: "I map where the data that predicts and drives that outcome lives, how the work actually happens, and which decisions change the number. I assess the right stack, working inside the systems you already run wherever it makes sense.",
      },
      {
        title: "Build",
        body: "I connect and synthesize that data with AI into one live system, and write down your operating memory so it runs on your judgment, not a template's.",
      },
      {
        title: "Test",
        body: "I test it on real scenarios and real data before you have to rely on it day to day.",
      },
      {
        title: "Go live and measure",
        body: "I connect it to your live data, get your team using it for real, and we watch the number for 30 days. You own it outright. If you're comfortable with tools like Claude Code, I can set you up to maintain simple changes yourself. Build clients can then move onto Alpha System Care.",
      },
    ],
    whoItsFor:
      "Finance, operations, and owner-led teams whose work lives in three or more tools, who want the recurring load taken off people, and who can name the number they'd measure it by.",
    pricing:
      "From $7,500, typically $10,000 to $15,000 depending on how many tools we connect and how much judgment we write down. If you'd rather tie my fee to the result, I'm happy to price against the number instead. A Quick Win or Sprint fee comes off if the build starts within 90 days. Alpha System Care is available afterwards, to build clients only.",
    ctaLine: "Ready to name the number?",
  },
  {
    slug: "strategy",
    order: "03",
    group: "Front door",
    role: "Decide",
    listed: true,
    name: "Leadership AI Sprint",
    icon: "Compass",
    eyebrow: "Decide",
    pain: "everyone in the business is using AI in their own way, nobody owns it, and you don't know what to build first.",
    tagline:
      "Two weeks with your leadership team. We rank the use cases by benefit, cost, feasibility, and risk, make the build, buy, or do-nothing calls, set the rules for review and sensitive data, and you leave with a 90-day roadmap and one working prototype.",
    bestFor: "leadership teams who want decisions and a prototype rather than a deck.",
    priceDisplay: "$7,500 fixed",
    highlights: [
      "Ranked use cases with benefit, cost, feasibility, and risk",
      "Build, buy, or do-nothing decisions and a 90-day roadmap",
      "One working prototype, and half the fee credited to a build",
    ],
    h1: "Decide where AI belongs, what to build, and how to run it.",
    subhead:
      "Two weeks with your leadership team that end in decisions rather than a deck: a ranked list of use cases, the calls on what to build and what to buy, rules for review and sensitive data, a 90-day roadmap, and one prototype you can put in front of the team.",
    problemHeading: "The problem",
    problem:
      "Three-quarters of small businesses already use AI. Only 14 percent have it running in core operations. In most companies it lives in individual browser tabs, useful, uneven, and unowned. The leadership team feels the pressure to do something but can't agree what, so decisions get made tool by tool, or not at all. A strategy deck isn't a decision either.",
    whatHeading: "What the sprint is",
    what:
      "I work with your leadership team for two weeks. Week one is interviews and a look at your systems and data: where the hours go, where the errors and delays are, what the numbers say. Week two is a working session where we rank the candidate use cases by expected benefit, cost, feasibility, and risk, make the build, buy, or do-nothing call on each, and write the rules for human review, accountability, and sensitive data. You leave with a 90-day roadmap your team owns and a working prototype of the first item on it, so the plan is already real by the time I leave.",
    whatYouGet: [
      "A ranked portfolio of AI use cases specific to your business",
      "Expected benefit, cost, feasibility, and risk for each",
      "Build, buy, or do-nothing decisions, with the reasoning written down",
      "The data and systems constraints that shape what's possible",
      "Human-review, accountability, and acceptable-use rules that fit a business your size",
      "A 90-day implementation roadmap, sequenced and owned",
      "One working prototype or validated proof of the first item",
    ],
    howItWorks: [
      {
        title: "Interview",
        body: "Leadership and the people doing the work: where the hours, errors, and delays actually are.",
      },
      {
        title: "Rank",
        body: "Candidate use cases scored on benefit, cost, feasibility, and risk, in the open.",
      },
      {
        title: "Decide",
        body: "Build, buy, or do nothing on each, plus the review and data rules the business will hold to.",
      },
      {
        title: "Prototype",
        body: "The first item on the roadmap, working, so the plan starts real.",
      },
      {
        title: "Roadmap",
        body: "Ninety days, sequenced, with owners, handed to your team.",
      },
    ],
    whoItsFor:
      "Leadership teams of owner-led businesses who want a plan they can actually lead from, and would rather see a prototype than a deck.",
    pricing:
      "$7,500 fixed, two weeks. Half is credited toward an Alpha System build started within 90 days.",
    ctaLine: "Get the plan you can lead from.",
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
    pain: "your team uses AI, but the quality is uneven, nobody has been trained, and the rules for sensitive data are unwritten.",
    tagline:
      "A working day with 4 to 8 people. We redesign two or three of your real workflows, build one reusable agent from your own material, write the team's rules for accuracy and sensitive data, and finish with owners, next actions, and a short playbook. I come back 30 days later to see what stuck.",
    bestFor: "teams that already have a system or a workflow worth building around.",
    priceDisplay: "Half-day from $3,500 · Full day from $6,000",
    h1: "A day your team leaves with working tools, not notes.",
    subhead:
      "This isn't a training course. It's a working day where 4 to 8 people redesign their own workflows, build one reusable agent from company material, and write the rules they'll hold themselves to. Everyone leaves with something running and a name next to what happens next.",
    problemHeading: "The problem",
    problem:
      "Seven in ten small-business owners say their people need more training to use AI well, and most of that training comes from YouTube. Generic sessions don't stick. People nod along and go back to the old way by Thursday. What sticks is building something real, with your own work, alongside someone who's done it before.",
    whatHeading: "What the day is",
    what:
      "I shape the day around two or three workflows your team actually runs. We redesign them in the room: fewer steps, clearer handoffs, people reviewing the exceptions instead of pushing paper. Then we build one reusable agent or skill from your own documents and data, and write the team's rules for accuracy, review, and sensitive data. The day ends with named owners and next actions. I come back 30 days later to see what stuck and fix what didn't.",
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
    pain: "the system is live and you want it to stay accurate, current, and improving as the business changes, without it depending on you remembering to check.",
    tagline:
      "For build clients only. Every month I check output quality and reliability, watch cost and usage, update rules and models as things change, work through the exceptions your team flagged, and report against your number. Capped at a handful of clients so each one gets real attention.",
    bestFor: "owners who want the system looked after by the person who built it.",
    priceDisplay: "From $1,500/mo · build clients only",
    chip: "Build clients only",
    h1: "Keep the system honest, current, and improving.",
    subhead:
      "AI systems drift. Rules go stale, a vendor changes a model, the business changes shape. Care is the monthly routine that catches it, reports against the number we built the system to move, and keeps improving it. Only for clients whose system I built.",
    problemHeading: "The problem",
    problem:
      "A system is most at risk in the months after launch. Definitions change, a supplier renames a field, a model update changes an answer, and nobody notices until the owner stops trusting the output. Only 14 percent of small businesses say AI is properly embedded in how they operate, and unmaintained systems are a big part of why.",
    whatHeading: "What Care is",
    what:
      "A monthly routine, run by the person who built the system. I review output quality and reliability, watch cost and usage (token spend in plain numbers), update rules and models as the business or the vendors change, work through the exceptions your team flagged, and send a one-page report against the number. Each month includes an allowance for small improvements, and each quarter we sit down and decide what's worth building next. The upper tier adds a monthly working session with you.",
    whatYouGet: [
      "Monthly reliability and output-quality review",
      "Cost and usage monitoring, with token and vendor spend in plain numbers",
      "Rule, prompt, and model updates as the business and the vendors change",
      "A monthly report against the number the system was built to move",
      "Staff feedback and exception review",
      "A small monthly improvement allowance",
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
      "$1,500 to $4,000 per month depending on the number of systems and response expectations. Offered only after an Alpha System build, and capped at a handful of clients so each gets real attention. The upper tier adds the monthly owner working session.",
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
