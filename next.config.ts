import type { NextConfig } from "next";

/*
 * When GITHUB_PAGES=true (set only in the Pages deploy workflow), build a
 * static export served from a project subpath. Local `npm run dev` / `npm run
 * build` are unaffected and keep the full server (including the contact API).
 */
const isPages = process.env.GITHUB_PAGES === "true";
const repo = "north-alpha";

const nextConfig: NextConfig = isPages
  ? {
      output: "export",
      basePath: `/${repo}`,
      trailingSlash: true,
      images: { unoptimized: true },
    }
  : {};

export default nextConfig;
