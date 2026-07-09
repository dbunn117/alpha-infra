import { Hero } from "@/components/hero";
import { ServicesSection } from "@/components/services-section";
import { HowItWorks } from "@/components/how-it-works";
import { ToolsStrip } from "@/components/tools-strip";
import { PricingSection } from "@/components/pricing-section";
import { AboutBlock } from "@/components/about-block";
import { Testimonials } from "@/components/testimonials";
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

      <ServicesSection />
      <HowItWorks />
      <ToolsStrip />
      <PricingSection />
      <AboutBlock />
      <Testimonials />
      <FinalCta />
    </>
  );
}
