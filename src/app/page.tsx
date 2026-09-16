import { ChapterFolio } from "@/components/chapter-folio";
import { Hero } from "@/components/hero";
import { PositioningBlock } from "@/components/positioning-block";
import { ProofStrip } from "@/components/proof-strip";
import { ServicesSection } from "@/components/services-section";
import { ProcessSection } from "@/components/process-section";
import { AboutBlock } from "@/components/about-block";
import { Testimonials } from "@/components/testimonials";
import { Faq } from "@/components/faq";
import { FinalCta } from "@/components/final-cta";

/*
 * Chaptered homepage, in the order claim, demonstration, proof: the live
 * hero, real systems with the owner's quote, the Opportunity vs Productivity
 * idea, the offers in brief, process, a short founder section, four FAQs,
 * close. The fit ledger and the full offer detail live on /services. The
 * margin folio ticks chapters off as they are read.
 */
export default function HomePage() {
  return (
    <>
      <ChapterFolio />
      <Hero />
      <ProofStrip />
      <PositioningBlock />
      <ServicesSection compact />
      <ProcessSection />
      <AboutBlock />
      <Testimonials />
      <Faq featuredOnly />
      <FinalCta />
    </>
  );
}
