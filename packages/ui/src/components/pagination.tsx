import * as React from "react";
import { cn } from "../lib/cn.js";

/**
 * Properties for the {@link Pagination} component.
 */
export interface PaginationProps extends React.ComponentProps<"nav"> {}

/**
 * Accessible navigation container for paginating tables, lists, and search results.
 *
 * @param props - Component configuration properties.
 * @returns React element rendering the pagination navigation landmark.
 */
function Pagination({ className, ...props }: PaginationProps) {
  return (
    <nav
      role="navigation"
      aria-label="pagination"
      data-slot="pagination"
      className={cn("mx-auto flex w-full justify-center", className)}
      {...props}
    />
  );
}

export { Pagination };

