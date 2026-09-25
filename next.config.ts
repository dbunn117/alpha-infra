import type { NextConfig } from "next";

/*
 * When GITHUB_PAGES=true (set only in the Pages deploy workflow), build a
 * static export. The base path comes from NEXT_PUBLIC_BASE_PATH so the same
 * config serves the custom domain at the root (empty, the default since the
 * site moved to alphainfra.us on 2026-09-25) or a project subpath such as
 * "/alpha-infra" on username.github.io. Local `npm run dev` / `npm run
 * build` are unaffected and keep the full server (including the contact API).
 */
const isPages = process.env.GITHUB_PAGES === "true";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = isPages
  ? {
      output: "export",
      ...(basePath ? { basePath } : {}),
      trailingSlash: true,
      images: { unoptimized: true },
    }
  : {};

export default nextConfig;
