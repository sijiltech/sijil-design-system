"use client";

import * as React from "react";

/** Viewport width (px) below which the viewport is considered "mobile". */
const MOBILE_BREAKPOINT = 768;

/**
 * Tracks whether the viewport is narrower than the mobile breakpoint (768px).
 * Returns `false` during SSR and the first client render, then updates after
 * mount so server and client markup always match.
 *
 * @returns `true` when the viewport width is below the mobile breakpoint.
 */
export function useIsMobile(): boolean {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined);

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };
    mql.addEventListener("change", onChange);
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  return !!isMobile;
}
