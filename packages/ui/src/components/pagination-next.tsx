import { ChevronRight } from "lucide-react";
import { cn } from "../lib/cn.js";
import { PaginationLink, type PaginationLinkProps } from "./pagination-link.js";

/**
 * Properties for the {@link PaginationNext} component.
 */
export type PaginationNextProps = PaginationLinkProps & {
  /** Optional label override. Defaults to "Next". */
  label?: string;
  iconOnly?: boolean;
};

/**
 * Next page button link in {@link Pagination}.
 *
 * @param props - Component configuration properties.
 * @returns React element rendering the next pagination link.
 */
function PaginationNext({
  className,
  label = "Next",
  iconOnly = false,
  size = "default",
  ...props
}: PaginationNextProps) {
  return (
    <PaginationLink
      aria-label="Go to next page"
      size={size}
      className={cn("gap-1 px-2.5", className)}
      {...props}
    >
      <span className={iconOnly ? "sr-only" : undefined}>{label}</span>
      <ChevronRight className="size-4 rtl:rotate-180" aria-hidden="true" />
    </PaginationLink>
  );
}

export { PaginationNext };

