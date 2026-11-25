import type { ComponentProps } from "react";
import { cn } from "../lib/cn.js";
import { groupCardClassName, type GroupVariant } from "../lib/group-variant.js";

export interface FiltersContainerProps extends ComponentProps<"div"> {
  variant?: GroupVariant;
}

/** Wrapping row for filters that stacks inside the mobile shell. */
export function FiltersContainer({ className, variant = "plain", ...props }: FiltersContainerProps) {
  return (
    <div
      data-slot="filters-container"
      data-variant={variant}
      className={cn(
        "mb-5 flex flex-row flex-wrap justify-between gap-3 shell:mb-1 shell:flex-col shell:flex-nowrap shell:gap-2.5",
        variant === "card" && groupCardClassName,
        className,
      )}
      {...props}
    />
  );
}
