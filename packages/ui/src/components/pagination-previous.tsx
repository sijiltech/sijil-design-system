import { ChevronLeft } from "lucide-react";
import { cn } from "../lib/cn.js";
import { PaginationLink, type PaginationLinkProps } from "./pagination-link.js";

/**
 * Properties for the {@link PaginationPrevious} component.
 */
export type PaginationPreviousProps = PaginationLinkProps & {
  /** Optional label override. Defaults to "Previous". */
  label?: string;
  iconOnly?: boolean;
};

/**
 * Previous page button link in {@link Pagination}.
 *
 * @param props - Component configuration properties.
 * @returns React element rendering the previous pagination link.
 */
function PaginationPrevious({
  className,
  label = "Previous",
  iconOnly = false,
  size = "default",
  ...props
}: PaginationPreviousProps) {
  return (
    <PaginationLink
      aria-label="Go to previous page"
      size={size}
      className={cn("gap-1 px-2.5", className)}
      {...props}
    >
      <ChevronLeft className="size-4 rtl:rotate-180" aria-hidden="true" />
      <span className={iconOnly ? "sr-only" : undefined}>{label}</span>
    </PaginationLink>
  );
}

export { PaginationPrevious };

