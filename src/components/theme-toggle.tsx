"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

/*
 * Sun/Moon crossfade. The icon state is keyed to the html theme class in CSS
 * (`[html.dark_&]`), not to `dark:`, because inside the Ink-grounded nav the
 * `dark` variant is true even when the site theme is Paper. Keyed to CSS, the
 * server markup is stable and no mounted guard is needed for the visual.
 */
const ICON =
  "size-[18px] transition-[opacity,transform] duration-300 ease-out-soft";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time mount guard for the label only
  React.useEffect(() => setMounted(true), []);

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      aria-label={mounted ? `Switch to ${isDark ? "paper" : "ink"} theme` : "Toggle theme"}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="inline-flex size-10 items-center justify-center rounded-lg border border-border text-muted-foreground transition-[background-color,color,border-color] duration-150 hover:bg-muted hover:text-foreground"
    >
      <span className="grid size-[18px] place-items-center [&>svg]:col-start-1 [&>svg]:row-start-1">
        <Sun
          className={`${ICON} rotate-90 scale-75 opacity-0 [html.dark_&]:rotate-0 [html.dark_&]:scale-100 [html.dark_&]:opacity-100`}
          aria-hidden
        />
        <Moon
          className={`${ICON} rotate-0 scale-100 opacity-100 [html.dark_&]:-rotate-90 [html.dark_&]:scale-75 [html.dark_&]:opacity-0`}
          aria-hidden
        />
      </span>
    </button>
  );
}
