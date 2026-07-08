/*
 * All seven North Alpha offerings. Single source of truth: drives the homepage
 * offering cards, the /services overview, and each dedicated /services/[slug]
 * page. Copy is transcribed verbatim from the copy deck
 * (docs/website-copy-and-names.md).
 */

export type ServiceGroup = "Advisory & Enablement" | "Build & Deliver";

export type Service = {
  slug: string;
  order: string; // "01".."07"
  group: ServiceGroup;
  name: string;
  /** lucide-react icon name */
  icon: string;
  eyebrow: string;
  /** short one-liner used on homepage/overview cards */
  tagline: string;
  bestFor: string;
  /** display string used on cards + pricing ladder */
  priceDisplay: string;
  mostPopular?: boolean;
  isEntry?: boolean;
  isHighEnd?: boolean;

  // Dedicated service-page copy
  h1: string;
  subhead: string;
  problemHeading: string;
  problem: string;
  whatHeading: string;
  what: string;
  whatYouGet: string[];
  howItWorks: { title: string; body: string }[];
  whoItsFor: string;
  pricing: string;
  ctaLine: string;
};

export const SERVICES: Service[] = [
  {
    slug: "enablement",
    order: "01",
    group: "Advisory & Enablement",
    name: "Team Enablement",
    icon: "Rocket",
    eyebrow: "Advisory & Enablement",
    tagline:
      "Get a fast, practical start with ChatGPT or Claude. We build a skill, agent, or automation for one high-volume, manual process — or run a session that shows your team how to build it themselves.",
    bestFor: "small teams who want a real win in weeks.",
    priceDisplay: "Starting at $1,500",
    isEntry: true,
    h1: "Your first real AI win — in weeks, not quarters.",
    subhead:
      "A fast, practical start with ChatGPT or Claude. We take one high-volume, manual process and automate it — or show your team how to build it themselves.",
    problemHeading: "The problem",
    problem:
      "Your team is curious about AI but stuck at the starting line. Everyone's heard it can help; nobody has time to figure out where or how. Meanwhile the same manual, repetitive task eats hours every week. You don't need a strategy deck yet — you need one clear win that proves the point.",
    whatHeading: "What we do",
    what:
      "We pick one high-volume, currently-manual process and make it dramatically faster with AI. Two ways to work: we build it — we create the skill, agent, or automation for you — or we teach it — a hands-on session where we build it with your team so they can do the next one themselves. Most clients do a bit of both.",
    whatYouGet: [
      "One painful, repetitive process automated or streamlined with AI",
      "A working skill, agent, or automation your team actually uses",
      "The know-how to extend it — so the value keeps compounding",
      "A clear sense of where AI can help next",
    ],
    howItWorks: [
      {
        title: "Pick a target",
        body: "We find a high-volume, manual process worth automating first.",
      },
      {
        title: "Build or teach",
        body: "We build the solution, or build it with your team live.",
      },
      {
        title: "Roll out",
        body: "We make sure it works in the real workflow and people adopt it.",
      },
    ],
    whoItsFor:
      "Small teams who want a practical, low-risk start — and a real result they can point to.",
    pricing:
      "Starting at $1,500 for a single enablement session; build-a-solution sprints run $2,500–$5,000.",
    ctaLine: "Let's get you a first win.",
  },
  {
    slug: "workshops",
    order: "02",
    group: "Advisory & Enablement",
    name: "Small-Group Workshops",
    icon: "Users",
    eyebrow: "Advisory & Enablement",
    tagline:
      "A hands-on half-day or full-day for 4–8 people. We cover the fundamentals and best practices, then build reusable agents, skills, and skill files together — around the work your team actually does.",
    bestFor: "teams that learn by building.",
    priceDisplay: "Half-day from $3,500 · Full-day from $6,000",
    mostPopular: true,
    h1: "A team that builds with AI — not just talks about it.",
    subhead:
      "A hands-on half-day or full-day for 4–8 people. We cover the fundamentals and best practices, then build reusable agents, skills, and tools together — around the work your team actually does.",
    problemHeading: "The problem",
    problem:
      "Generic AI training doesn't stick. People sit through slides, nod along, and go back to doing everything the old way by Thursday. Real capability comes from building something real, with your own work, alongside someone who's done it before.",
    whatHeading: "What we do",
    what:
      "We run a focused, hands-on workshop for your team. We start with the fundamentals and best practices — enough to be dangerous — then spend the bulk of the time building reusable solutions together: agents, skills, and skill files aimed at a specific workload your team cares about. Everyone leaves having built something, and knowing how to build the next one.",
    whatYouGet: [
      "A half-day or full-day session for ~4–8 people, on-site or virtual",
      "Fundamentals and best practices, taught practically",
      "Reusable agents, skills, and skill files your team builds during the session",
      "The confidence and method to keep building after we leave",
      "Optional 30–90 days of follow-up “office hours” to lock in adoption",
    ],
    howItWorks: [
      {
        title: "Tailor",
        body: "We pick the workload and shape the day around your team's real work.",
      },
      {
        title: "Teach",
        body: "Fundamentals and best practices, fast and hands-on.",
      },
      {
        title: "Build",
        body: "The team builds reusable solutions together, with guidance.",
      },
      {
        title: "Sustain",
        body: "Optional follow-up office hours keep the momentum going.",
      },
    ],
    whoItsFor:
      "Teams of 4–8 who learn by doing and want to leave with working tools, not just notes.",
    pricing:
      "Half-day from $3,500 · Full-day from $6,000 (up to ~8 people). Per-person options and follow-up office hours available.",
    ctaLine: "Turn your team into builders.",
  },
  {
    slug: "coaching",
    order: "03",
    group: "Advisory & Enablement",
    name: "1:1 Coaching",
    icon: "UserRound",
    eyebrow: "Advisory & Enablement",
    tagline:
      "Personalized coaching for how you work. For executives using AI as a strategy and thought partner, or for analysts getting more from AI while keeping every output accurate and trustworthy. Fundamentals, best practices, and the habits that matter.",
    bestFor: "individuals who want to level up fast.",
    priceDisplay: "Sessions from $350 · Packages from $1,500/mo",
    h1: "Get dramatically more out of AI — personally.",
    subhead:
      "One-on-one coaching tailored to how you work. Whether you're an executive using AI as a thought partner or an analyst getting more from it while keeping every output accurate, we meet you where you are.",
    problemHeading: "The problem",
    problem:
      "You use AI, but you suspect you're getting a fraction of what it can do. Generic tips don't fit your actual role, and it's hard to tell good output from confident-but-wrong output. You want to level up fast — with someone who tailors it to you.",
    whatHeading: "What we do",
    what:
      "Personalized coaching built around your role and goals. Two common profiles: Senior executives — use AI as a genuine strategy and thought partner: pressure-testing decisions, drafting, synthesizing, thinking out loud with a capable second mind. Analysts and individual contributors — get far more from AI while keeping outputs accurate and trustworthy, with the verification habits that matter. We cover fundamentals, best practices, terminology, and prompt/agent design — only the parts you need.",
    whatYouGet: [
      "Coaching tailored to your role, tools, and goals",
      "Fundamentals and best practices without the jargon",
      "Practical prompt, agent, and verification techniques you'll use daily",
      "A faster, more confident, more accurate way of working with AI",
    ],
    howItWorks: [
      {
        title: "Calibrate",
        body: "We figure out your role, your goals, and where AI can help most.",
      },
      {
        title: "Coach",
        body: "Working sessions focused on real tasks from your actual work.",
      },
      {
        title: "Reinforce",
        body: "Async support between sessions to keep it sticking.",
      },
    ],
    whoItsFor:
      "Individuals — from the C-suite to analysts — who want to level up their own AI skills quickly.",
    pricing:
      "Sessions from $350 (60–90 min). Monthly packages from $1,500/mo (multiple sessions plus async support).",
    ctaLine: "Level up how you work with AI.",
  },
  {
    slug: "audit",
    order: "04",
    group: "Advisory & Enablement",
    name: "AI Audit",
    icon: "ClipboardCheck",
    eyebrow: "Advisory & Enablement",
    tagline:
      "We map how work actually gets done — using an AI agent to interview your people about their processes — then recommend how to redesign those workflows for a future where humans hold the critical, high-judgment roles and agents handle the rest.",
    bestFor: "teams ready to redesign, not just experiment.",
    priceDisplay: "Custom — book a call",
    h1: "Know exactly what to redesign — and why.",
    subhead:
      "We map how work actually gets done, then show you how to redesign it for a future where your people hold the high-judgment roles and AI agents handle the rest.",
    problemHeading: "The problem",
    problem:
      "You know AI should change how your team works — but “somewhere” isn't a plan. Without a clear map of your current workflows and where AI genuinely fits, you risk automating the wrong things, missing the big wins, and unsettling your team. You need a grounded, prioritized redesign, not guesswork.",
    whatHeading: "What we do",
    what:
      "We come in and map how work really happens — including using an AI agent to interview your people about their day-to-day processes and workflows, so we capture the real picture, not the org-chart version. Then we show you how to redesign those workflows for the future: humans in the critical, high-judgment roles; AI agents carrying the repeatable load. You get a clear before-and-after with the quick wins called out.",
    whatYouGet: [
      "A current-state map of how work actually gets done",
      "Prioritized recommendations to redesign workflows around AI",
      "A target-state operating model: people on judgment, agents on the rest",
      "Quick wins flagged for immediate impact",
      "A natural on-ramp to building it (see Data Activation, Live Dashboards, Enablement)",
    ],
    howItWorks: [
      {
        title: "Interview",
        body: "An AI agent (plus us) interviews your team about how work really flows.",
      },
      {
        title: "Map",
        body: "We document the current state and where the friction and value are.",
      },
      {
        title: "Redesign",
        body: "We recommend the target-state workflows and the roles humans should own.",
      },
      {
        title: "Prioritize",
        body: "We sequence it, starting with the quick wins.",
      },
    ],
    whoItsFor:
      "Teams and orgs ready to redesign how they work — not just experiment at the edges.",
    pricing:
      "Custom, scoped to team size and number of workflows. Most audits start around $8,000. Book a call and we'll scope it together.",
    ctaLine: "Find out exactly what to change.",
  },
  {
    slug: "strategy",
    order: "05",
    group: "Advisory & Enablement",
    name: "AI Strategy",
    icon: "Compass",
    eyebrow: "Advisory & Enablement",
    tagline:
      "We help your leadership team think through how AI reshapes your business — where it creates advantage, where it threatens the current model — and co-build a phased roadmap for adapting to a new world of work.",
    bestFor: "leadership teams planning the next few years.",
    priceDisplay: "Custom — book a call",
    isHighEnd: true,
    h1: "A clear AI strategy for a fast-changing world.",
    subhead:
      "We help your leadership team think through how AI reshapes your business — where it creates advantage, where it threatens the model — and co-build a phased roadmap for the road ahead.",
    problemHeading: "The problem",
    problem:
      "AI is changing your industry faster than any strategy cycle was built for. Leadership teams feel the pressure but lack a shared, clear-eyed view of what it actually means for their business — where the advantage is, where the threat is, and what to do first. Reacting tool-by-tool isn't a strategy. You need a plan you can lead from.",
    whatHeading: "What we do",
    what:
      "We work directly with your leadership team to think through how AI impacts your business strategy — where it creates durable advantage, where it undermines the current model, and how roles and the organization should evolve. Together we build a phased roadmap for adapting to a new world of work: sequenced, realistic, and owned by your team, not handed down from a consultant.",
    whatYouGet: [
      "Executive working sessions that build shared understanding and conviction",
      "An AI opportunity-and-threat map specific to your business",
      "A phased adoption roadmap: what to do now, next, and later",
      "A point of view on how roles and the org evolve as AI takes on more",
      "Optional ongoing advisory as the landscape (and your plan) moves",
    ],
    howItWorks: [
      {
        title: "Align",
        body: "Working sessions to build a shared, honest view across leadership.",
      },
      {
        title: "Map",
        body: "Where AI creates advantage and where it threatens your model.",
      },
      {
        title: "Roadmap",
        body: "A phased, sequenced plan your team owns.",
      },
      {
        title: "Advise",
        body: "Optional ongoing advisory to keep the plan current.",
      },
    ],
    whoItsFor:
      "Leadership teams planning the next few years — who want a strategy they can actually lead from.",
    pricing:
      "Custom multi-week engagement, typically $15,000–$40,000, with an optional ongoing advisory retainer. Book a call and we'll scope it together.",
    ctaLine: "Build the plan for what's coming.",
  },
  {
    slug: "dashboards",
    order: "06",
    group: "Build & Deliver",
    name: "Live Dashboards",
    icon: "LineChart",
    eyebrow: "Build & Deliver",
    tagline:
      "Highly interactive, dynamic dashboards that give you real-time visibility into what actually drives your business. We pull from the systems you already use into one always-current view you can filter, drill into, and act on — not another report that's stale by the time you read it.",
    bestFor:
      "owners and teams who want to see the business clearly, in real time.",
    priceDisplay: "Starting at $5,000",
    h1: "See your business clearly — in real time.",
    subhead:
      "Interactive, always-current dashboards that pull from the tools you already use, so the numbers that matter are one click away — not buried in a spreadsheet someone updates on Fridays.",
    problemHeading: "The problem",
    problem:
      "Most teams run on stale, scattered data. Key numbers live in five different tools, reports are out of date the moment they're sent, and by the time you spot a problem, it's already last month's problem. You end up making today's decisions on last week's picture.",
    whatHeading: "What we build",
    what:
      "A single, live view of your business that's genuinely interactive — filter by segment, drill into the detail, compare periods, and watch the metrics update in real time. We connect it to your existing systems (CRM, finance, ops, marketing, whatever you run on), design around the decisions you actually make, and hand you something your whole team will open every morning.",
    whatYouGet: [
      "A live, hosted dashboard wired to your real data sources",
      "The KPIs and views your team needs, designed around your decisions — not a generic template",
      "Interactivity built in: filters, drill-downs, segments, period-over-period",
      "A short walkthrough so your team can use it with confidence",
      "Optional ongoing maintenance and iteration as your needs change",
    ],
    howItWorks: [
      {
        title: "Scope",
        body: "We agree on the decisions the dashboard should support and the metrics that drive them.",
      },
      {
        title: "Connect",
        body: "We wire up your data sources and get the numbers flowing cleanly.",
      },
      {
        title: "Build",
        body: "We design and build the interactive dashboard, then refine it with you.",
      },
      {
        title: "Handover",
        body: "We walk your team through it; optional maintenance keeps it sharp.",
      },
    ],
    whoItsFor:
      "Owners and teams who want to stop guessing and start seeing — especially if your data is spread across tools and no one has the full picture in one place.",
    pricing:
      "Starting at $5,000, depending on the number of data sources and complexity. Optional maintenance from $500/mo. Real-time pipelines and AI-driven features scope up from there.",
    ctaLine: "Ready to see your business in real time?",
  },
  {
    slug: "data",
    order: "07",
    group: "Build & Deliver",
    name: "Data Activation",
    icon: "Database",
    eyebrow: "Build & Deliver",
    tagline:
      "Most businesses are sitting on troves of data they don't realize is valuable. We use AI to uncover it, organize and clean it, and analyze it — turning hidden data into insight and action that drives revenue and profitability. Find it, understand it, put it to work.",
    bestFor: "businesses ready to turn data they already have into growth.",
    priceDisplay: "Custom — book a call",
    h1: "You're sitting on data worth more than you think.",
    subhead:
      "Most businesses have troves of data they never use. We use AI to uncover it, organize it, and analyze it — turning what you already have into revenue and profitability growth.",
    problemHeading: "The problem",
    problem:
      "Every business generates data — sales, customers, operations, support, marketing. Most of it sits unused in systems no one connects, in formats no one cleans, answering questions no one gets around to asking. It's one of the most valuable assets you own, and it's almost certainly underworked.",
    whatHeading: "What we do",
    what:
      "We treat your data as the asset it is. Using AI, we find the valuable data hiding across your systems, organize and clean it into something usable, and analyze it to surface what's actually driving — or draining — your revenue and profit. Then we translate that into clear, prioritized actions. Not a 40-page report; a short list of moves worth making.",
    whatYouGet: [
      "A map of the valuable, underused data across your business",
      "An organized, cleaned dataset you can keep using",
      "AI-driven analysis that surfaces real patterns, risks, and opportunities",
      "Prioritized, revenue-focused recommendations — what to do, and why it matters",
      "A clear path to keep watching it (pairs naturally with Live Dashboards)",
    ],
    howItWorks: [
      {
        title: "Discover",
        body: "We find the valuable data you're not using and where it lives.",
      },
      {
        title: "Organize",
        body: "We clean and structure it into something AI and your team can work with.",
      },
      {
        title: "Analyze",
        body: "We use AI to surface the patterns that move revenue and profit.",
      },
      {
        title: "Activate",
        body: "We hand you prioritized actions — and, if you want, a live dashboard to track them.",
      },
    ],
    whoItsFor:
      "Businesses ready to turn data they already have into growth — especially if you suspect there's value in your numbers but have never had the time or tools to dig it out.",
    pricing:
      "Custom — scoped to your data volume, how much cleaning it needs, and the depth of analysis. Most engagements start around $10,000. Book a call and we'll scope it together.",
    ctaLine: "Let's find the value hiding in your data.",
  },
];

export const SERVICE_GROUPS: ServiceGroup[] = [
  "Advisory & Enablement",
  "Build & Deliver",
];

export function getService(slug: string): Service | undefined {
  return SERVICES.find((s) => s.slug === slug);
}

export function servicesByGroup(group: ServiceGroup): Service[] {
  return SERVICES.filter((s) => s.group === group);
}
