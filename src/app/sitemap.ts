import type { MetadataRoute } from "next";
import { SERVICES } from "@/content/services";
import { site } from "@/content/site";

// Required for `output: export` (GitHub Pages build); no-op otherwise.
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.siteUrl.replace(/\/$/, "");
  const staticRoutes = ["", "/services", "/about", "/contact", "/book", "/privacy"];

  const routes = [
    ...staticRoutes,
    ...SERVICES.map((s) => `/services/${s.slug}`),
  ];

  return routes.map((path) => ({
    url: `${base}${path}`,
    changeFrequency: "monthly",
    priority: path === "" ? 1 : 0.7,
  }));
}
