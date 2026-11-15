import * as React from "react";
import { cn } from "../lib/cn.js";
import { buttonVariants, type ButtonProps } from "./button.js";

/**
 * Properties for the {@link PaginationLink} component.
 */
export interface PaginationLinkProps
  extends Omit<React.ComponentProps<"a">, "type">,
    Pick<ButtonProps, "size"> {
  /** Whether this link corresponds to the currently active page. */
  isActive?: boolean;
}

/**
 * Clickable page number link within {@link Pagination}.
 *
 * @param props - Component configuration properties.
 * @returns React element rendering the pagination link.
 */
function PaginationLink({
  className,
  isActive = false,
  size = "icon",
  ...props
}: PaginationLinkProps) {
  return (
    <a
      aria-current={isActive ? "page" : undefined}
      data-slot="pagination-link"
      data-active={isActive}
      className={cn(
        buttonVariants({
          variant: isActive ? "outline" : "ghost",
          size,
        }),
        isActive && "border-primary bg-primary/10 text-primary font-bold shadow-2xs",
        className
      )}
      {...props}
    />
  );
}

export { PaginationLink };

