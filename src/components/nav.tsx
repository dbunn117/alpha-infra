"use client";

import * as React from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { nav } from "@/content/site";
import { Wordmark } from "@/components/wordmark";
import { ThemeToggle } from "@/components/theme-toggle";
import { BookACallButton } from "@/components/book-a-call-button";
import { cn } from "@/lib/utils";

export function Nav() {
  const [open, setOpen] = React.useState(false);

  // Lock body scroll while the mobile menu is open.
  React.useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <Wordmark />

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {nav.links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <div className="hidden md:block">
            <BookACallButton label="Book a call" size="sm" />
          </div>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="inline-flex size-10 items-center justify-center rounded-lg border border-border text-foreground md:hidden"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          "md:hidden",
          open ? "block" : "hidden"
        )}
      >
        <nav className="container-page flex flex-col gap-1 border-t border-border py-4">
          {nav.links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-3 text-base font-medium text-foreground transition-colors hover:bg-muted"
            >
              {link.label}
            </Link>
          ))}
          <div className="px-1 pt-2" onClick={() => setOpen(false)}>
            <BookACallButton
              label="Book a call"
              size="md"
              className="w-full"
            />
          </div>
        </nav>
      </div>
    </header>
  );
}
