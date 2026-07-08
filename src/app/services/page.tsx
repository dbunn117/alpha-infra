import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { ServicesSection } from "@/components/services-section";
import { FinalCta } from "@/components/final-cta";
import { offerings } from "@/content/site";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Seven ways to work with North Alpha — from a fast first win to a full AI strategy, plus the builds that make it real.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Offerings"
        title={offerings.heading}
        subhead={offerings.intro}
      />
      <ServicesSection withHeading={false} />
      <FinalCta />
    </>
  );
}
