import * as React from "react";
import { cn } from "../lib/cn.js";

/**
 * Properties for the {@link PaginationContent} component.
 */
export interface PaginationContentProps extends React.ComponentProps<"ul"> {}

/**
 * List container within {@link Pagination}.
 *
 * @param props - Component configuration properties.
 * @returns React element rendering the pagination list.
 */
function PaginationContent({ className, ...props }: PaginationContentProps) {
  return (
    <ul
      data-slot="pagination-content"
      className={cn("flex flex-row items-center gap-1", className)}
      {...props}
    />
  );
}

export { PaginationContent };

