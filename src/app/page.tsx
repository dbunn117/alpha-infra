import { Hero } from "@/components/hero";
import { FitCheck } from "@/components/fit-check";
import { ServicesSection } from "@/components/services-section";
import { HowItWorks } from "@/components/how-it-works";
import { ToolsStrip } from "@/components/tools-strip";
import { AboutBlock } from "@/components/about-block";
import { Testimonials } from "@/components/testimonials";
import { Faq } from "@/components/faq";
import { FinalCta } from "@/components/final-cta";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { problem } from "@/content/site";

export default function HomePage() {
  return (
    <>
      <Hero />

      {/* Problem / Point of view */}
      <section id="pov" className="section scroll-mt-16">
        <div className="container-page">
          <Reveal>
            <div className="mx-auto max-w-3xl text-center">
              <SectionHeading
                eyebrow="The shift"
                heading={problem.heading}
                align="center"
              />
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                {problem.body}
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <FitCheck />
      <ServicesSection />
      <HowItWorks />
      <ToolsStrip />
      <AboutBlock />
      <Testimonials />
      <Faq />
      <FinalCta />
    </>
  );
}
