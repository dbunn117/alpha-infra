import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { ServicesSection } from "@/components/services-section";
import { FinalCta } from "@/components/final-cta";
import { offerings } from "@/content/site";

export const metadata: Metadata = {
  title: "Services",
  description:
    "A custom AI system or a fast quick win to start — training, coaching, and strategy as the relationship grows.",
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
