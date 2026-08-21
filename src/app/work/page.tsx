import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { EntecCaseStudy } from "@/components/entec-case-study";
import { ProjectsSection } from "@/components/projects-section";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Real systems built and shipped — a client case study and a catalogue of professional and personal AI work.",
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
      {/*
       * TODO: once the real Entec walkthrough video is recorded (see
       * "Today's Priority Actions" shot list in the vault case-study note),
       * embed it here, right after the case study.
       */}
      <ProjectsSection />
    </>
  );
}
