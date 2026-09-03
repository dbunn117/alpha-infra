import { MotionProvider } from "@/components/motion/motion-provider";
import { ChapterFolio } from "@/components/chapter-folio";
import { Hero } from "@/components/hero";
import { InkPeak } from "@/components/ink-diagram/ink-peak";
import { ProofPlate } from "@/components/proof-plate";
import { FitLedger } from "@/components/fit-ledger";
import { ServicesSection } from "@/components/services-section";
import { ProcessRail } from "@/components/process-rail";
import { PrinciplesLedger } from "@/components/principles-ledger";
import { AboutBlock } from "@/components/about-block";
import { Testimonials } from "@/components/testimonials";
import { Faq } from "@/components/faq";
import { FinalCta } from "@/components/final-cta";

/*
 * Chaptered editorial: an Ink title page and peak, then a paper sheet folds
 * over and the rest reads as chapters. The MotionProvider lives here, not in
 * the layout, so inner pages ship no animation runtime.
 */
export default function HomePage() {
  return (
    <MotionProvider>
      <ChapterFolio />
      <div data-ground="ink" className="-mt-16 bg-background text-foreground">
        <Hero />
        <InkPeak />
      </div>
      <ProofPlate />
      <FitLedger />
      <ServicesSection />
      <ProcessRail />
      <PrinciplesLedger />
      <AboutBlock />
      <Testimonials />
      <Faq />
      <FinalCta />
    </MotionProvider>
  );
}
