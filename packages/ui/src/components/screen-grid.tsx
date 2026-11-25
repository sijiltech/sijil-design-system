import type { ComponentProps } from "react";
import { cn } from "../lib/cn.js";

const columns = {
  compact: "grid-cols-[repeat(auto-fit,minmax(min(100%,12rem),1fr))]",
  default: "grid-cols-[repeat(auto-fit,minmax(min(100%,16rem),1fr))]",
  wide: "grid-cols-[repeat(auto-fit,minmax(min(100%,24rem),1fr))]",
};

export interface ScreenGridProps extends ComponentProps<"div"> {
  /** Minimum item width when there is enough space for multiple columns. */
  itemSize?: keyof typeof columns;
}

/** Fits equal-width columns to the space available inside the screen. */
export function ScreenGrid({ itemSize = "default", className, ...props }: ScreenGridProps) {
  return (
    <div
      data-slot="screen-grid"
      className={cn("grid min-w-0 gap-4", columns[itemSize], className)}
      {...props}
    />
  );
}
