import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { EntecCaseStudy } from "@/components/entec-case-study";
import { EntecCaseStudyVideo } from "@/components/entec-case-study-video";
import { MarketScorecard } from "@/components/market-scorecard";
import { ProjectsSection } from "@/components/projects-section";
import { Reveal } from "@/components/reveal";
import { BookACallButton } from "@/components/book-a-call-button";
import { workCta } from "@/content/site";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Real systems built and shipped: a client case study and a portfolio of professional and independent AI work.",
  alternates: { canonical: "/work" },
};

export default function WorkPage() {
  return (
    <>
      <PageHero
        eyebrow="Portfolio"
        title="Real systems, built and shipped."
        subhead="Selected client, professional, and independent work. The common thread is turning fragmented data and business judgment into systems people can actually use."
      />

      <EntecCaseStudy />
      <EntecCaseStudyVideo />

      {/* The investment side, live: re-weight the signals and watch the
          markets re-rank. Illustrative markets and figures. */}
      <section id="scorecard" className="section scroll-mt-16 border-b border-border">
        <div className="container-page grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <p className="eyebrow">Try one</p>
            <h2 className="text-balance font-heading text-3xl font-medium leading-[1.05] tracking-tight sm:text-4xl">
              A market scorecard you can re-weight.
            </h2>
            <p className="measure mt-5 text-lg leading-relaxed text-muted-foreground">
              The same shape as the tool built for an investment team: signals, weights the team sets, a ranked read of where to look next, and a line of narrative for the leader. Fictional markets, invented figures.
            </p>
          </div>
          <div className="lg:col-span-7">
            <Reveal>
              <div className="grain surface relative overflow-hidden p-5">
                <MarketScorecard />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <ProjectsSection />

      <section id="work-cta" className="section scroll-mt-16">
        <div className="container-page">
          <Reveal>
            <div className="border-t border-border pt-12 md:pt-16">
              <h2 className="max-w-3xl text-balance font-heading text-4xl font-medium leading-[1.02] tracking-tight sm:text-5xl lg:text-6xl">
                {workCta.heading}
              </h2>
              <p className="measure mt-6 text-pretty text-lg leading-relaxed text-muted-foreground">
                {workCta.subhead}
              </p>
              <div className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-4 text-lg">
                <BookACallButton label={workCta.primaryCta} size="lg" />
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
