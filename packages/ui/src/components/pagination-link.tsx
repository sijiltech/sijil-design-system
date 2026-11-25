import * as React from "react";
import { cn } from "../lib/cn.js";
import { Button, buttonVariants, type ButtonProps } from "./button.js";

/**
 * Properties for the {@link PaginationLink} component.
 */
interface PaginationLinkCommonProps {
  size?: ButtonProps["size"];
  isActive?: boolean;
}

export type PaginationLinkProps = PaginationLinkCommonProps & (
  | (Omit<React.ComponentProps<"a">, "type"> & { asButton?: false })
  | (Omit<ButtonProps, "size" | "type" | "asChild"> & { asButton: true })
);

/**
 * Clickable page number link within {@link Pagination}.
 *
 * @param props - Component configuration properties.
 * @returns React element rendering the pagination link.
 */
function PaginationLink(props: PaginationLinkProps) {
  if (props.asButton) {
    const { asButton: _asButton, isActive = false, size = "icon", ...buttonProps } = props;
    return (
      <Button
        type="button"
        data-slot="pagination-link"
        aria-current={isActive ? "page" : undefined}
        data-active={isActive}
        variant={isActive ? "outline" : "ghost"}
        size={size}
        {...buttonProps}
      />
    );
  }

  const { asButton: _asButton, isActive = false, size = "icon", className, ...linkProps } = props;
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
        isActive && "bg-primary/10 text-primary font-bold shadow-2xs",
        className
      )}
      {...linkProps}
    />
  );
}

export { PaginationLink };

