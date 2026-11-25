"use client";

import * as React from "react";
import { Loader2, RotateCw } from "lucide-react";
import { cn } from "../lib/cn.js";

export type PullToRefreshPhase = "idle" | "pulling" | "armed" | "refreshing";

export interface PullToRefreshIndicatorProps {
  /** Current gesture phase (drives icon animation). */
  phase: PullToRefreshPhase;
  labels?: {
    refreshing?: string;
    releaseToRefresh?: string;
    pullToRefresh?: string;
  };
}

/**
 * Floating pull-to-refresh indicator disc that slides down with swipe gestures.
 */
export const PullToRefreshIndicator = React.forwardRef<
  HTMLDivElement,
  PullToRefreshIndicatorProps
>(function PullToRefreshIndicator({ phase, labels }, ref) {
  const defaultLabels = {
    refreshing: "Refreshing...",
    releaseToRefresh: "Release to refresh",
    pullToRefresh: "Pull down to refresh",
    ...labels,
  };

  const label =
    phase === "refreshing"
      ? defaultLabels.refreshing
      : phase === "armed"
        ? defaultLabels.releaseToRefresh
        : defaultLabels.pullToRefresh;

  return (
    <div
      ref={ref}
      data-animate="false"
      aria-hidden={phase === "idle"}
      className="pointer-events-none absolute inset-x-0 top-[env(safe-area-inset-top)] z-40 flex justify-center data-[animate=true]:transition-transform data-[animate=true]:duration-300 data-[animate=true]:ease-out"
      style={{ transform: "translateY(calc(var(--ptr-y, 0px) - 3rem))" }}
    >
      <div
        className={cn(
          "flex size-10 items-center justify-center rounded-full bg-card shadow-lg transition-colors",
          phase === "armed" || phase === "refreshing"
            ? "text-primary shadow-primary/20"
            : "text-muted-foreground",
        )}
        style={{ opacity: "calc(0.35 + var(--ptr-progress, 0) * 0.65)" }}
      >
        {phase === "refreshing" ? (
          <Loader2 className="size-5 animate-spin" strokeWidth={2.5} />
        ) : (
          <RotateCw
            className="size-5"
            strokeWidth={2.5}
            style={{ transform: "rotate(calc(var(--ptr-progress, 0) * 300deg))" }}
          />
        )}
      </div>
      <span role="status" aria-live="polite" className="sr-only">{phase === "idle" ? "" : label}</span>
    </div>
  );
});

