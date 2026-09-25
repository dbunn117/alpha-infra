import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { asset } from "@/lib/asset";

/*
 * The Entec engagement film: 46 seconds cut from the working calls, sitting
 * directly after the case study as its moving proof. Native controls, no
 * autoplay, no mute, no loop: the owner's voice and the music are the point.
 * The 16:9 frame is reserved up front so nothing shifts when the poster or
 * the video arrives. Assets live in public/media/entec-case-study/ and go
 * through asset() so the GitHub Pages basePath is honoured.
 */
const FILM = {
  video: "/media/entec-case-study/entec-sales-intelligence-case-study-web.mp4",
  poster: "/media/entec-case-study/entec-sales-intelligence-case-study-poster.webp",
  captions: "/media/entec-case-study/entec-sales-intelligence-case-study.vtt",
} as const;

export function EntecCaseStudyVideo() {
  return (
    <section id="entec-film" className="section scroll-mt-16 border-b border-border">
      <div className="container-page">
        <SectionHeading
          eyebrow="Engagement film"
          heading="From working sessions to a system the owner can use."
          intro="A 46-second look at how the Entec Sales Intelligence Hub moved from discovery, through owner feedback, to a working decision system."
        />

        <Reveal as="figure" delay={0.08} className="mt-10">
          <div className="surface surface-raised overflow-hidden">
            <div className="dark aspect-video w-full bg-background">
              <video
                className="h-full w-full"
                controls
                playsInline
                preload="metadata"
                poster={asset(FILM.poster)}
                aria-label="Entec Access Systems engagement film: from working sessions to a system the owner can use"
              >
                <source src={asset(FILM.video)} type="video/mp4" />
                <track kind="captions" src={asset(FILM.captions)} srcLang="en" label="English" default />
                Your browser can&rsquo;t play this video here.{" "}
                <a href={asset(FILM.video)} className="link-draw text-primary">
                  Download the film (MP4, 4.5 MB)
                </a>
                .
              </video>
            </div>
          </div>
          <figcaption className="caption mt-3">
            46 seconds · sound on · captions available in the player
          </figcaption>
        </Reveal>
      </div>
    </section>
  );
}
