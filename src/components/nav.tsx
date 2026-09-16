"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { nav } from "@/content/site";
import { Wordmark } from "@/components/wordmark";
import { ThemeToggle } from "@/components/theme-toggle";
import { BookACallButton } from "@/components/book-a-call-button";
import { cn } from "@/lib/utils";

/* Sticky header: blurred paper strip, current page underlined, animated
   mobile menu that overlays the page rather than pushing it. */
export function Nav() {
  const [open, setOpen] = React.useState(false);
  const pathname = usePathname();
  const toggleRef = React.useRef<HTMLButtonElement>(null);

  // Lock body scroll while the mobile menu is open; Escape closes it and
  // returns focus to the button that opened it.
  React.useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const current = (href: string) =>
    pathname === href || pathname === `${href}/` ? "page" : undefined;

  return (
    <header className="site-nav sticky top-0 z-50 text-foreground">
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <Wordmark />

        {/* Desktop nav */}
        <nav className="hidden items-center gap-6 md:flex" aria-label="Primary">
          {nav.links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={current(link.href)}
              className="link-draw py-1 text-sm font-medium text-foreground/80 transition-colors duration-150 hover:text-foreground aria-[current=page]:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <div className="hidden md:block">
            <BookACallButton size="sm" />
          </div>
          <button
            ref={toggleRef}
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex size-10 items-center justify-center rounded-lg border border-border text-foreground md:hidden"
          >
            <span className="grid size-5 place-items-center [&>svg]:col-start-1 [&>svg]:row-start-1">
              <Menu
                className={cn(
                  "size-5 transition-[opacity,transform] duration-300 ease-out-soft",
                  open ? "rotate-90 scale-75 opacity-0" : "rotate-0 opacity-100"
                )}
                aria-hidden
              />
              <X
                className={cn(
                  "size-5 transition-[opacity,transform] duration-300 ease-out-soft",
                  open ? "rotate-0 opacity-100" : "-rotate-90 scale-75 opacity-0"
                )}
                aria-hidden
              />
            </span>
          </button>
        </div>
      </div>

      {/* Backdrop: veils the page behind the open menu so the hero's own
          buttons don't compete with it. Click closes. */}
      <div
        aria-hidden
        onClick={() => setOpen(false)}
        className={cn(
          "fixed inset-0 top-16 z-[-1] bg-background/80 backdrop-blur-sm transition-opacity duration-300 ease-out-soft md:hidden",
          open ? "opacity-100" : "pointer-events-none opacity-0"
        )}
      />

      {/* Mobile menu overlays the page (absolute) so opening it never grows
          the header; grid-rows animates the reveal without touching `height`. */}
      <div
        id="mobile-menu"
        inert={!open}
        className={cn(
          "absolute inset-x-0 top-full grid transition-[grid-template-rows,opacity] duration-300 ease-out-soft md:hidden",
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        )}
      >
        <div className="min-h-0 overflow-hidden">
          <nav
            aria-label="Primary"
            className="container-page flex flex-col gap-1 border-y border-border bg-background py-4 shadow-elev-2"
          >
            {nav.links.map((link, i) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={current(link.href)}
                onClick={() => setOpen(false)}
                style={{ transitionDelay: open ? `${60 + i * 40}ms` : "0ms" }}
                className={cn(
                  "rounded-lg px-3 py-3 text-base font-medium text-foreground transition-[opacity,transform,background-color] duration-300 ease-out-soft hover:bg-muted",
                  open ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
                )}
              >
                {link.label}
              </Link>
            ))}
            <div
              className={cn(
                "px-1 pt-2 transition-[opacity,transform] duration-300 ease-out-soft",
                open ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
              )}
              style={{ transitionDelay: open ? `${60 + nav.links.length * 40}ms` : "0ms" }}
              onClick={() => setOpen(false)}
            >
              <BookACallButton size="md" className="w-full" />
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
