import type { ComponentProps } from "react";
import { cn } from "../lib/cn.js";

/** Groups related content. Supply aria-labelledby when the section has a heading. */
export function ScreenSection({ className, ...props }: ComponentProps<"section">) {
  return (
    <section
      data-slot="screen-section"
      className={cn("flex min-w-0 flex-col gap-4", className)}
      {...props}
    />
  );
}
