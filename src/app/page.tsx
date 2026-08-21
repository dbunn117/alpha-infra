import { Hero } from "@/components/hero";
import { Principles } from "@/components/principles";
import { FitCheck } from "@/components/fit-check";
import { ServicesSection } from "@/components/services-section";
import { HowItWorks } from "@/components/how-it-works";
import { ToolsStrip } from "@/components/tools-strip";
import { AboutBlock } from "@/components/about-block";
import { Testimonials } from "@/components/testimonials";
import { Faq } from "@/components/faq";
import { FinalCta } from "@/components/final-cta";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Principles />
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
