"use client";

import * as React from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "./button.js";
import { cn } from "../lib/cn.js";

export type LegendType = "solid" | "bordered" | "hatched";

export interface ChartLegendItem {
  label: string;
  type?: LegendType;
  color?: string;
  bg?: string;
  border?: string;
}

export interface ChartLegendsProps extends React.ComponentProps<"div"> {
  items: ChartLegendItem[];
  title?: string;
  defaultOpen?: boolean;
}

/**
 * Expandable chart legend widget with support for solid colors,
 * bordered badges, and hatched SVG pattern indicators.
 */
export function ChartLegends({
  items,
  title = "Legend",
  defaultOpen = false,
  className,
  ...props
}: ChartLegendsProps) {
  const [open, setOpen] = React.useState(defaultOpen);

  return (
    <div
      className={cn(
        "rounded-lg border border-border bg-card/95 text-card-foreground shadow-sm backdrop-blur-xs transition-all",
        className,
      )}
      {...props}
    >
      <Button
        variant="ghost"
        size="sm"
        className="w-full flex items-center justify-between gap-4 px-3 py-1.5 h-auto text-xs font-medium cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        <span>{title}</span>
        {open ? (
          <ChevronUp className="size-3.5 opacity-70" />
        ) : (
          <ChevronDown className="size-3.5 opacity-70" />
        )}
      </Button>

      {open && (
        <div className="px-3 pb-2.5 pt-1 space-y-1.5 text-xs">
          {items.map((item, idx) => (
            <div key={idx} className="flex items-center gap-2">
              {item.type === "bordered" ? (
                <div
                  className="size-3 rounded-xs shrink-0"
                  style={{
                    backgroundColor: item.bg ?? "transparent",
                    border: `1.5px solid ${item.border ?? item.color ?? "currentColor"}`,
                  }}
                />
              ) : item.type === "hatched" ? (
                <svg width="14" height="12" className="rounded-xs shrink-0">
                  <defs>
                    <pattern
                      id={`chart-legend-hatch-${idx}`}
                      patternUnits="userSpaceOnUse"
                      width="4"
                      height="4"
                    >
                      <path
                        d="M-1,1 l2,-2 M0,4 l4,-4 M3,5 l2,-2"
                        stroke={item.color ?? "var(--primary)"}
                        strokeWidth="1"
                      />
                    </pattern>
                  </defs>
                  <rect
                    width="14"
                    height="12"
                    fill={`url(#chart-legend-hatch-${idx})`}
                    stroke={item.color ?? "var(--primary)"}
                    strokeWidth="1"
                    rx="2"
                  />
                </svg>
              ) : (
                <div
                  className="size-3 rounded-xs shrink-0"
                  style={{
                    backgroundColor: item.color ?? "var(--primary)",
                  }}
                />
              )}
              <span className="text-muted-foreground truncate">{item.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

