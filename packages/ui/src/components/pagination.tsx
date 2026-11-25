import * as React from "react";
import { cn } from "../lib/cn.js";
import { groupCardClassName, type GroupVariant } from "../lib/group-variant.js";

/**
 * Properties for the {@link Pagination} component.
 */
export interface PaginationProps extends React.ComponentProps<"nav"> {
  variant?: GroupVariant;
}

/**
 * Accessible navigation container for paginating tables, lists, and search results.
 *
 * @param props - Component configuration properties.
 * @returns React element rendering the pagination navigation landmark.
 */
function Pagination({ className, variant = "plain", ...props }: PaginationProps) {
  return (
    <nav
      role="navigation"
      aria-label="pagination"
      data-slot="pagination"
      data-variant={variant}
      className={cn("mx-auto flex justify-center", variant === "card" ? [groupCardClassName, "w-fit"] : "w-full", className)}
      {...props}
    />
  );
}

export { Pagination };

