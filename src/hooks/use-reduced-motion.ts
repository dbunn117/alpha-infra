"use client";

import * as React from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(onChange: () => void) {
  const mql = window.matchMedia(QUERY);
  mql.addEventListener("change", onChange);
  return () => mql.removeEventListener("change", onChange);
}

function getSnapshot() {
  if (window.matchMedia(QUERY).matches) return true;
  // Dev-only escape hatch so the verification loop can exercise the
  // reduced-motion branch without changing OS settings: append ?motion=reduced
  if (process.env.NODE_ENV !== "production") {
    return new URLSearchParams(window.location.search).get("motion") === "reduced";
  }
  return false;
}

function getServerSnapshot() {
  return false;
}

/* True when the user prefers reduced motion. Server snapshot is false, so the
   full-motion markup is what gets prerendered; CSS handles the static case. */
export function useReducedMotion(): boolean {
  return React.useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
