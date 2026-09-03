import Link from "next/link";
import { finalCta } from "@/content/site";
import { BookACallButton } from "@/components/book-a-call-button";
import { Reveal } from "@/components/reveal";

/*
 * Colophon close: no card island. A hairline, one large Newsreader line, and
 * the call to action as a running line with the button set into it.
 */
export function FinalCta() {
  return (
    <section id="contact-cta" className="section scroll-mt-16">
      <div className="container-page">
        <Reveal>
          <div className="border-t border-border pt-12 md:pt-16">
            <h2 className="max-w-3xl text-balance font-heading text-4xl font-medium leading-[1.02] tracking-tight sm:text-5xl lg:text-6xl">
              {finalCta.heading}
            </h2>
            <p className="measure mt-6 text-pretty text-lg leading-relaxed text-muted-foreground">
              {finalCta.subhead}
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-4 text-lg">
              <BookACallButton label={finalCta.primaryCta} size="lg" />
              <span className="text-muted-foreground">or</span>
              <Link href="/contact#message" className="link-draw font-medium text-foreground">
                {finalCta.secondaryCta}
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
