import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { ProjectCard } from "@/components/project-card";
import { Reveal } from "@/components/reveal";
import { hermesAgents } from "@/content/projects";

export const metadata: Metadata = {
  title: "Hermes",
  description:
    "Four personal agents sharing one pattern: durable memory, proactive outreach, and approval before anything consequential happens.",
  alternates: { canonical: "/hermes" },
};

export default function HermesPage() {
  return (
    <>
      <PageHero
        eyebrow="Lab · Hermes"
        title="Four agents, one pattern."
        subhead="Scout, Heath, Paula, and Podcast OS each maintain their own folder in my Obsidian vault: durable memory that gives them context, builds history, and lets them get sharper over time instead of starting from zero every conversation. It's the same idea I'd bring to a business: a shared knowledge base that makes the whole system smarter as it goes, not just smart at launch."
      >
        <Link
          href="/work#work"
          className="inline-flex items-center gap-1 text-sm font-medium text-accent-bright hover:underline"
        >
          <ArrowLeft className="size-4" aria-hidden />
          Back to Work
        </Link>
      </PageHero>

      <div className="container-page pb-16 pt-6">
        <div className="grid gap-5 sm:grid-cols-2">
          {hermesAgents.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.04}>
              <ProjectCard project={p} variant="personal" />
            </Reveal>
          ))}
        </div>
      </div>
    </>
  );
}
