import { Chapter } from "@/components/chapter";
import { launchClip } from "@/content/site";
import { asset } from "@/lib/asset";

/*
 * The 30-second clip, directly under the hero: what Opportunity AI is and
 * how David works, in the site's own words and design. Native controls, no
 * autoplay, no mute, no loop; the poster (the Opportunity AI panel) shows
 * until pressed. The 16:9 frame is reserved so nothing shifts. Nothing above
 * the fold is parked at opacity 0, so this section uses no Reveal: it can
 * sit inside the first screen on tall displays. Assets live in
 * public/media/alpha-infra-clip/ and go through asset() for the basePath.
 */
export function LaunchClip() {
  return (
    <Chapter id="clip" title="Clip" tight>
      <div className="container-page">
        <figure className="mx-auto max-w-5xl">
          <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 pb-4">
            <p className="eyebrow">{launchClip.eyebrow}</p>
            <p className="caption">{launchClip.meta}</p>
          </div>
          <div className="surface surface-raised overflow-hidden">
            <div className="aspect-video w-full bg-secondary">
              <video
                className="h-full w-full"
                controls
                playsInline
                preload="metadata"
                poster={asset(launchClip.poster)}
                aria-label={launchClip.label}
              >
                <source src={asset(launchClip.video)} type="video/mp4" />
                Your browser can&rsquo;t play this video here.{" "}
                <a href={asset(launchClip.video)} className="link-draw text-primary">
                  Download the clip (MP4, 3.5 MB)
                </a>
                .
              </video>
            </div>
          </div>
          <figcaption className="caption mt-3">{launchClip.caption}</figcaption>
        </figure>
      </div>
    </Chapter>
  );
}
