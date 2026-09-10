import { ChapterFolio } from "@/components/chapter-folio";
import { Hero } from "@/components/hero";
import { ProofStrip } from "@/components/proof-strip";
import { FitLedger } from "@/components/fit-ledger";
import { ServicesSection } from "@/components/services-section";
import { ProcessSection } from "@/components/process-section";
import { PrinciplesLedger } from "@/components/principles-ledger";
import { AboutBlock } from "@/components/about-block";
import { Testimonials } from "@/components/testimonials";
import { Faq } from "@/components/faq";
import { FinalCta } from "@/components/final-cta";

/*
 * Chaptered homepage: hero with the looping diagram, proof, fit, offerings,
 * process, principles, about, FAQ, close. The margin folio ticks chapters
 * off as they are read.
 */
export default function HomePage() {
  return (
    <>
      <ChapterFolio />
      <Hero />
      <ProofStrip />
      <FitLedger />
      <ServicesSection />
      <ProcessSection />
      <PrinciplesLedger />
      <AboutBlock />
      <Testimonials />
      <Faq />
      <FinalCta />
    </>
  );
}
