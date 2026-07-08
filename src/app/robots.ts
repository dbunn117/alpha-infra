import type { MetadataRoute } from "next";
import { site } from "@/content/site";

// Required for `output: export` (GitHub Pages build); no-op otherwise.
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  const base = site.siteUrl.replace(/\/$/, "");
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${base}/sitemap.xml`,
  };
}
