/*
 * Alpha Infra's offerings. Single source of truth: drives the homepage
 * offering cards, the /services overview, and each dedicated /services/[slug]
 * page. One flagship build (proven on Entec Access Systems) plus a fast entry
 * point are featured first; training, coaching, and strategy are positioned
 * as where the relationship goes next, not competing first-purchase options.
 */

export type ServiceGroup =
  | "Build & Deliver"
  | "Training & Coaching"
  | "Strategic Partnership";

export type Service = {
  slug: string;
  order: string; // "01".."05"
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
  /* Up to three deliverables surfaced on the homepage card (flagship only) */
  highlights?: string[];
  howItWorks: { title: string; body: string }[];
  whoItsFor: string;
  pricing: string;
  ctaLine: string;
};

export const SERVICES: Service[] = [
  {
    slug: "system",
    order: "01",
    group: "Build & Deliver",
    name: "The Alpha System",
    icon: "LineChart",
    eyebrow: "Build & Deliver",
    tagline:
      "My flagship build. We name the one number you want to move, find the data that drives it across your CRM, ops, finance, and email, and I build a live system that tells you what to do next to move it.",
    bestFor: "owners who can name the one number they want to move, and whose data to move it lives in three or more tools.",
    priceDisplay: "Starting at $5,000",
    mostPopular: true,
    highlights: [
      "One outcome, named up front, with the number we're moving",
      "A live system that tells you what to do next",
      "Your operating memory, written down and yours to keep",
    ],
    h1: "Pick the number that matters. I\u00a0build the system that moves it.",
    subhead:
      "One outcome per engagement. We start with the constraint, not the tools, then connect and synthesize the data behind it into one live system built around your decisions. It's the approach that took Entec Access Systems from three disconnected tools to a system that keeps recurring revenue recurring.",
    problemHeading: "The problem",
    problem:
      "Most owners can name the number that's hurting: accounts quietly leaving, quotes going out too slowly, margin nobody can see until quarter end. The data to move it already exists, but it's split across a CRM, a spreadsheet, an accounting package, and an inbox, so nobody sees the whole picture in time to act. You end up managing the number from memory and last month's report.",
    whatHeading: "What The Alpha System is",
    what:
      "Not a dashboard, and not a data integration project. We start by naming the one outcome you want to move and what would have to be true to move it. Then I trace the data that predicts and drives that outcome, wherever it lives, and use AI to connect and synthesize it into one live system that tells you what to do next: who to call, what to quote, what to fix. Underneath it sits your operating memory: your rules, definitions, and judgment written down so the AI works the way you would, not the way a template would. That's how Entec's owner got a system that flags which accounts have gone quiet before they leave.",
    whatYouGet: [
      "One outcome, named up front, with the number we're moving and how we'll measure it",
      "The data behind that outcome connected from the tools you already run, no rip-and-replace",
      "A live system that tells you what to do next, not a report you have to interpret",
      "Your operating memory: the rules, definitions, and judgment the system runs on, written down and yours to keep",
      "Every AI-made match or suggestion clearly marked as AI-made, never blended in as if a person did it",
      "A short walkthrough so your team uses it with confidence from day one",
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
        body: "I check it against real scenarios and real data before you ever rely on it day to day.",
      },
      {
        title: "Go live and measure",
        body: "I connect it to your live data, get your team using it for real, and we watch the number. You own it outright. If you're comfortable with tools like Claude Code, I can set you up to maintain simple changes yourself, or I stay on with optional ongoing maintenance from $500/mo, which also keeps the operating memory current as the business changes.",
      },
    ],
    whoItsFor:
      "Owners who can name the one number they want to move and are tired of managing it from memory, especially when the data to move it is spread across tools and nobody has the full picture in time to act.",
    pricing:
      "Starting at $5,000, depending on the number of systems and complexity. Optional maintenance from $500/mo. Ask about value-based pricing tied to the number we move.",
    ctaLine: "Ready to name the number?",
  },
  {
    slug: "quick-win",
    order: "02",
    group: "Build & Deliver",
    name: "Quick Win",
    icon: "Rocket",
    eyebrow: "Build & Deliver",
    tagline:
      "A fast, practical first step. We pick one high-volume, manual process and automate it with AI, typically live within 2–3 weeks of our first call.",
    bestFor: "small teams who want a real win before committing to a bigger build.",
    priceDisplay: "Starting at $1,500",
    isEntry: true,
    h1: "Your first real AI win, typically live in 2–3 weeks.",
    subhead:
      "A fast, practical automation for one high-volume, manual process, typically live within 2–3 weeks, so you have a working result before committing to anything bigger.",
    problemHeading: "The problem",
    problem:
      "You're curious about AI but not ready to commit to a full system yet. Meanwhile the same manual, repetitive task eats hours every week. You don't need a strategy deck. You need one clear, working win.",
    whatHeading: "What I do",
    what:
      "We pick one high-volume, currently-manual process and make it dramatically faster with AI: a skill, agent, or automation your team actually uses, typically live within 2–3 weeks. It's the smallest version of what I build at the bigger scale: real, working software, not a slide deck.",
    whatYouGet: [
      "One painful, repetitive process automated with AI",
      "A working skill, agent, or automation your team uses immediately",
      "A clear sense of where AI can help next",
    ],
    howItWorks: [
      {
        title: "Pick a target",
        body: "I find the highest-value manual process worth automating first.",
      },
      {
        title: "Build",
        body: "I build the automation and get it working in your real workflow.",
      },
      {
        title: "Hand off",
        body: "I make sure your team can run it, and knows what's next.",
      },
    ],
    whoItsFor:
      "Small teams who want a practical, low-risk start, and a real result they can point to before going further.",
    pricing:
      "Starting at $1,500 for a single automation; larger sprints run $2,500–$5,000.",
    ctaLine: "Let's get you a first win.",
  },
  {
    slug: "workshops",
    order: "03",
    group: "Training & Coaching",
    name: "Small-Group Workshops",
    icon: "Users",
    eyebrow: "Training & Coaching",
    tagline:
      "A hands-on half-day or full-day for 4–8 people. I cover the fundamentals and best practices, then build reusable agents, skills, and skill files together, around the work your team actually does.",
    bestFor: "teams that learn by building.",
    priceDisplay: "Half-day from $3,500 · Full-day from $6,000",
    h1: "A team that builds with AI, not just talks about it.",
    subhead:
      "A hands-on half-day or full-day for 4–8 people. I cover the fundamentals and best practices, then build reusable agents, skills, and tools together, around the work your team actually does.",
    problemHeading: "The problem",
    problem:
      "Generic AI training doesn't stick. People sit through slides, nod along, and go back to doing everything the old way by Thursday. Real capability comes from building something real, with your own work, alongside someone who's done it before.",
    whatHeading: "What I do",
    what:
      "I run a focused, hands-on workshop for your team. I start with the fundamentals and best practices (enough to be dangerous), then spend the bulk of the time building reusable solutions together: agents, skills, and skill files aimed at a specific workload your team cares about. Everyone leaves having built something, and knowing how to build the next one.",
    whatYouGet: [
      "A half-day or full-day session for ~4–8 people, on-site or virtual",
      "Fundamentals and best practices, taught practically",
      "Reusable agents, skills, and skill files your team builds during the session",
      "The confidence and method to keep building after I leave",
      "Optional 30–90 days of follow-up “office hours” to lock in adoption",
    ],
    howItWorks: [
      {
        title: "Tailor",
        body: "I pick the workload and shape the day around your team's real work.",
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
    order: "04",
    group: "Training & Coaching",
    name: "1:1 Coaching",
    icon: "UserRound",
    eyebrow: "Training & Coaching",
    tagline:
      "Personalized coaching for how you work. For executives using AI as a strategy and thought partner, or for analysts getting more from AI while keeping every output accurate and trustworthy. Fundamentals, best practices, and the habits that matter.",
    bestFor: "individuals who want to level up fast.",
    priceDisplay: "Sessions from $350 · Packages from $1,500/mo",
    h1: "Get dramatically more out of AI, personally.",
    subhead:
      "One-on-one coaching tailored to how you work. Whether you're an executive using AI as a thought partner or an analyst getting more from it while keeping every output accurate, I meet you where you are.",
    problemHeading: "The problem",
    problem:
      "You use AI, but you suspect you're getting a fraction of what it can do. Generic tips don't fit your actual role, and it's hard to tell good output from confident-but-wrong output. You want to level up fast, with someone who tailors it to you.",
    whatHeading: "What I do",
    what:
      "Personalized coaching built around your role and goals. Two common profiles: senior executives use AI as a genuine strategy and thought partner: pressure-testing decisions, drafting, synthesizing, thinking out loud with a capable second mind. Analysts and individual contributors get far more from AI while keeping outputs accurate and trustworthy, with the verification habits that matter. I cover fundamentals, best practices, terminology, and prompt/agent design, only the parts you need.",
    whatYouGet: [
      "Coaching tailored to your role, tools, and goals",
      "Fundamentals and best practices without the jargon",
      "Practical prompt, agent, and verification techniques you'll use daily",
      "A faster, more confident, more accurate way of working with AI",
    ],
    howItWorks: [
      {
        title: "Calibrate",
        body: "I figure out your role, your goals, and where AI can help most.",
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
      "Individuals, from the C-suite to analysts, who want to level up their own AI skills quickly.",
    pricing:
      "Sessions from $350 (60–90 min). Monthly packages from $1,500/mo (multiple sessions plus async support).",
    ctaLine: "Level up how you work with AI.",
  },
  {
    slug: "strategy",
    order: "05",
    group: "Strategic Partnership",
    name: "AI Strategy",
    icon: "Compass",
    eyebrow: "Strategic Partnership",
    tagline:
      "I help your leadership team think through how AI reshapes your business, where it creates advantage, where it threatens the current model, and co-build a phased roadmap for adapting to a new world of work.",
    bestFor: "leadership teams planning the next few years.",
    priceDisplay: "Custom (book a call)",
    isHighEnd: true,
    h1: "A clear AI strategy for a fast-changing world.",
    subhead:
      "I help your leadership team think through how AI reshapes your business, where it creates advantage, where it threatens the model, and co-build a phased roadmap for the road ahead.",
    problemHeading: "The problem",
    problem:
      "AI is changing your industry faster than any strategy cycle was built for. Leadership teams feel the pressure but lack a shared, clear-eyed view of what it actually means for their business: where the advantage is, where the threat is, and what to do first. Reacting tool-by-tool isn't a strategy. You need a plan you can lead from.",
    whatHeading: "What I do",
    what:
      "I work directly with your leadership team to think through how AI impacts your business strategy: where it creates durable advantage, where it undermines the current model, and how roles and the organization should evolve. Together I build a phased roadmap for adapting to a new world of work: sequenced, realistic, and owned by your team, not handed down from a consultant.",
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
      "Leadership teams planning the next few years, who want a strategy they can actually lead from.",
    pricing:
      "Custom multi-week engagement, typically $15,000–$40,000, with an optional ongoing advisory retainer. Book a call and I'll scope it together.",
    ctaLine: "Build the plan for what's coming.",
  },
];

export const SERVICE_GROUPS: ServiceGroup[] = [
  "Build & Deliver",
  "Training & Coaching",
  "Strategic Partnership",
];

export function getService(slug: string): Service | undefined {
  return SERVICES.find((s) => s.slug === slug);
}

export function servicesByGroup(group: ServiceGroup): Service[] {
  return SERVICES.filter((s) => s.group === group);
}
