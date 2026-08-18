// Prefixes public asset paths with the deploy basePath (e.g. "/portfolio" on
// GitHub Pages). NEXT_PUBLIC_BASE_PATH is set in the Pages build; empty locally.
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function asset(path: string): string {
  return `${basePath}${path}`;
}
