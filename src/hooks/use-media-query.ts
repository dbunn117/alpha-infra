"use client";

import * as React from "react";

/* Boolean media query via useSyncExternalStore. Server snapshot is the
   `initial` argument so prerendered markup is deterministic. */
export function useMediaQuery(query: string, initial = false): boolean {
  const subscribe = React.useCallback(
    (onChange: () => void) => {
      const mql = window.matchMedia(query);
      mql.addEventListener("change", onChange);
      return () => mql.removeEventListener("change", onChange);
    },
    [query]
  );
  const getSnapshot = React.useCallback(
    () => window.matchMedia(query).matches,
    [query]
  );
  return React.useSyncExternalStore(subscribe, getSnapshot, () => initial);
}
