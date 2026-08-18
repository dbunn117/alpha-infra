import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { EntecCaseStudy } from "@/components/entec-case-study";
import { AssetMapDemo } from "@/components/asset-map-demo";
import { ProjectsSection } from "@/components/projects-section";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Real systems built and shipped — a client case study, an interactive demo, and a catalogue of professional and personal AI work.",
  alternates: { canonical: "/work" },
};

export default function WorkPage() {
  return (
    <>
      <PageHero
        eyebrow="Work"
        title="Real systems, built and shipped."
        subhead="A mix of client engagements and personal builds. The through-line: turning messy, disconnected data into something people actually use every day."
      />

      <EntecCaseStudy />
      <AssetMapDemo />
      <ProjectsSection />
    </>
  );
}
