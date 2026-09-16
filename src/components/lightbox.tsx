"use client";

import * as React from "react";
import { Maximize2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

/*
 * Click-to-enlarge for a screenshot. The thumbnail is a real button (keyboard
 * reachable, labelled); the dialog handles focus trapping, Escape, and focus
 * return. The large image is the same asset, so nothing extra loads.
 */
export function Lightbox({
  src,
  alt,
  title,
  className,
}: {
  src: string;
  alt: string;
  title: string;
  className?: string;
}) {
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={`Enlarge: ${title}`}
        className={cn("group relative block w-full cursor-zoom-in text-left", className)}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={alt} className="block w-full" />
        <span className="pointer-events-none absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-md border border-border bg-background/90 px-2.5 py-1 text-xs font-medium text-foreground shadow-elev-1 backdrop-blur-sm transition-opacity duration-200 group-hover:opacity-100 sm:opacity-0">
          <Maximize2 className="size-3.5" aria-hidden />
          Enlarge
        </span>
      </button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-h-[94svh] w-[min(96vw,1400px)] overflow-auto p-2 sm:max-w-[1400px] sm:p-3" showCloseButton>
          <DialogTitle className="sr-only">{title}</DialogTitle>
          <DialogDescription className="sr-only">{alt}</DialogDescription>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={src} alt={alt} className="block w-full" />
        </DialogContent>
      </Dialog>
    </>
  );
}
