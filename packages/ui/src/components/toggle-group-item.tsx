import * as React from "react";
import type { VariantProps } from "class-variance-authority";
import { cn } from "../lib/cn.js";
import { toggleVariants } from "./toggle.js";
import { ToggleGroupContext } from "./toggle-group-context.js";

/**
 * Properties for the {@link ToggleGroupItem} component.
 */
export interface ToggleGroupItemProps
  extends React.ComponentProps<"button">,
    VariantProps<typeof toggleVariants> {
  /** Value identifying this item within the group. */
  value: string;
}

/**
 * An individual toggle button within a {@link ToggleGroup}.
 *
 * @param props - Component configuration properties.
 * @returns React element rendering the toggle item.
 */
function ToggleGroupItem({
  className,
  value,
  variant,
  size,
  disabled: itemDisabled,
  ...props
}: ToggleGroupItemProps) {
  const context = React.useContext(ToggleGroupContext);

  const isChecked = Array.isArray(context?.value)
    ? context.value.includes(value)
    : context?.value === value;

  const isDisabled = itemDisabled || context?.disabled;

  return (
    <button
      type="button"
      role={context?.type === "single" ? "radio" : "checkbox"}
      aria-checked={isChecked}
      data-state={isChecked ? "on" : "off"}
      data-slot="toggle-group-item"
      disabled={isDisabled}
      onClick={() => {
        if (!isDisabled) {
          context?.onItemToggle?.(value);
        }
      }}
      className={cn(
        toggleVariants({
          variant: variant ?? context?.variant,
          size: size ?? context?.size,
        }),
        isChecked && "bg-muted text-foreground font-semibold shadow-2xs",
        className
      )}
      {...props}
    />
  );
}

export { ToggleGroupItem };

