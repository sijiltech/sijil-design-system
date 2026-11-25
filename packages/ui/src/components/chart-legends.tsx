"use client";

import * as React from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "./button.js";
import { cn } from "../lib/cn.js";
import { Popover, PopoverContent, PopoverTrigger } from "./popover.js";

export type LegendType = "solid" | "bordered" | "bordered-dashed" | "hatched";

export interface ChartLegendItem {
  label: string;
  type?: LegendType;
  color?: string;
  bg?: string;
  border?: string;
  swatchClassName?: string;
}

export interface ChartLegendsProps extends React.ComponentProps<"div"> {
  items: ChartLegendItem[];
  title?: string;
  defaultOpen?: boolean;
  presentation?: "inline" | "popover" | "static";
  /** Supplementary note for the legend. */
  note?: React.ReactNode;
  itemsClassName?: string;
  itemClassName?: string;
  noteClassName?: string;
}

/**
 * Expandable chart legend widget with support for solid colors,
 * tinted swatches, and hatched SVG pattern indicators.
 */
export function ChartLegends({
  items,
  title = "Legend",
  defaultOpen = false,
  presentation = "inline",
  note,
  itemsClassName,
  itemClassName,
  noteClassName,
  className,
  ...props
}: ChartLegendsProps) {
  const [open, setOpen] = React.useState(defaultOpen);
  const id = React.useId();
  const isPopover = presentation === "popover";
  const trigger = (
    <Button
      type="button"
      variant="ghost"
      size="sm"
      aria-expanded={open}
      className="w-full justify-between gap-4 px-3 py-1.5 h-auto text-xs font-medium cursor-pointer"
      onClick={isPopover ? undefined : () => setOpen(!open)}
    >
      <span>{title}</span>
      {open ? <ChevronUp className="size-3.5 opacity-70" /> : <ChevronDown className="size-3.5 opacity-70" />}
    </Button>
  );

  const legendItems = (
    <div className={cn("text-xs", presentation !== "static" && "space-y-1.5", itemsClassName)}>
      {items.map((item, idx) => (
        <div key={idx} className={cn("flex items-center gap-2", itemClassName)}>
          {item.type === "bordered" || item.type === "bordered-dashed" ? (
            <div
              aria-hidden="true"
              className={cn("size-3 shrink-0 rounded-xs", item.swatchClassName)}
              style={{
                border: item.border ? "1.5px " + (item.type === "bordered-dashed" ? "dashed " : "solid ") + item.border : undefined,
                backgroundColor: item.bg ?? `color-mix(in srgb, ${item.border ?? item.color ?? "currentColor"} 45%, transparent)`,
              }}
            />
          ) : item.type === "hatched" ? (
            <svg width="14" height="12" aria-hidden="true" className={cn("shrink-0 rounded-xs", item.swatchClassName)}>
              <defs>
                <pattern
                  id={`${id}-hatch-${idx}`}
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
                fill={`url(#${id}-hatch-${idx})`}
                rx="2"
              />
            </svg>
          ) : (
            <div
              aria-hidden="true"
              className={cn("size-3 shrink-0 rounded-xs", item.swatchClassName)}
              style={{
                backgroundColor: item.color ?? "var(--primary)",
              }}
            />
          )}
          <span className="text-muted-foreground truncate">{item.label}</span>
        </div>
      ))}
    </div>
  );

  return (
    <div
      className={cn(presentation !== "static" && "rounded-xl bg-card/95 text-card-foreground shadow-sm backdrop-blur-xs", className)}
      {...props}
    >
      {presentation === "static" ? legendItems : isPopover ? (
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>{trigger}</PopoverTrigger>
          <PopoverContent side="top" align="end" className="w-72 rounded-xl bg-card/95 p-3 backdrop-blur-sm">
            {legendItems}
          </PopoverContent>
        </Popover>
      ) : (
        <>
          {trigger}
          {open && <div className="px-3 pb-2.5 pt-1">{legendItems}</div>}
        </>
      )}
      {note && <div className={noteClassName}>{note}</div>}
    </div>
  );
}

