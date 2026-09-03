/*
 * Runs `html` synchronously while the browser parses the page, before first
 * paint (Next guide: preventing flash before hydration). On the client the
 * script is re-typed to text/plain so React doesn't warn about rendering a
 * <script>; suppressHydrationWarning covers the type mismatch.
 */
export function InlineScript({ html }: { html: string }) {
  return (
    <script
      type={typeof window === "undefined" ? "text/javascript" : "text/plain"}
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
