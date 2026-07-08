import Link from "next/link";
import { finalCta } from "@/content/site";
import { BookACallButton } from "@/components/book-a-call-button";
import { cta } from "@/lib/cta";
import { cn } from "@/lib/utils";

export function FinalCta() {
  return (
    <section id="contact-cta" className="section scroll-mt-16">
      <div className="container-page">
        <div className="surface relative overflow-hidden px-6 py-16 text-center md:px-12 md:py-20">
          <div className="pointer-events-none absolute inset-0 hero-glow opacity-70" aria-hidden />
          <div className="relative mx-auto max-w-2xl">
            <h2 className="text-balance text-3xl font-semibold sm:text-4xl">
              {finalCta.heading}
            </h2>
            <p className="mx-auto mt-4 text-lg leading-relaxed text-muted-foreground">
              {finalCta.subhead}
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <BookACallButton label={finalCta.primaryCta} size="lg" />
              <Link
                href="/contact#message"
                className={cn(cta({ variant: "outline", size: "lg" }))}
              >
                {finalCta.secondaryCta}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
