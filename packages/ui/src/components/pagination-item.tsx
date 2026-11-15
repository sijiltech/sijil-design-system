import * as React from "react";
import { cn } from "../lib/cn.js";

/**
 * Properties for the {@link PaginationItem} component.
 */
export interface PaginationItemProps extends React.ComponentProps<"li"> {}

/**
 * Individual list item within {@link PaginationContent}.
 *
 * @param props - Component configuration properties.
 * @returns React element rendering the pagination list item.
 */
function PaginationItem({ className, ...props }: PaginationItemProps) {
  return <li data-slot="pagination-item" className={cn("", className)} {...props} />;
}

export { PaginationItem };

