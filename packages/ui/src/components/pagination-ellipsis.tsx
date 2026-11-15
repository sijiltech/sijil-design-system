import * as React from "react";
import { MoreHorizontal } from "lucide-react";
import { cn } from "../lib/cn.js";

/**
 * Ellipsis component indicating truncated page numbers within {@link Pagination}.
 *
 * @param props - Component configuration properties.
 * @returns React element rendering the pagination ellipsis.
 */
function PaginationEllipsis({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      aria-hidden="true"
      data-slot="pagination-ellipsis"
      className={cn("flex size-9 items-center justify-center text-muted-foreground", className)}
      {...props}
    >
      <MoreHorizontal className="size-4" aria-hidden="true" />
      <span className="sr-only">More pages</span>
    </span>
  );
}

export { PaginationEllipsis };

