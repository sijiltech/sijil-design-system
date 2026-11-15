import * as React from "react";
import { Circle } from "lucide-react";
import { cn } from "../lib/cn.js";
import { RadioGroupContext } from "./radio-group-context.js";

/**
 * Properties for the {@link RadioGroupItem} component.
 */
export interface RadioGroupItemProps extends Omit<React.ComponentProps<"button">, "onChange"> {
  /** Value string corresponding to this radio item. */
  value: string;
}

/**
 * An individual radio button item within a {@link RadioGroup}.
 *
 * @param props - RadioGroupItem configuration properties.
 * @returns React element rendering the radio item button.
 */
function RadioGroupItem({
  className,
  value,
  disabled: itemDisabled,
  ...props
}: RadioGroupItemProps) {
  const context = React.useContext(RadioGroupContext);
  const isChecked = context?.value === value;
  const isDisabled = itemDisabled || context?.disabled;

  return (
    <button
      type="button"
      role="radio"
      aria-checked={isChecked}
      disabled={isDisabled}
      data-slot="radio-group-item"
      data-state={isChecked ? "checked" : "unchecked"}
      onClick={() => {
        if (!isDisabled) {
          context?.onValueChange?.(value);
        }
      }}
      className={cn(
        "aspect-square size-4 shrink-0 rounded-full border border-input shadow-xs transition-[color,box-shadow] outline-none",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "disabled:cursor-not-allowed disabled:opacity-50",
        isChecked
          ? "border-primary bg-primary text-primary-foreground"
          : "bg-transparent text-transparent",
        className
      )}
      {...props}
    >
      <span className="flex items-center justify-center text-current">
        <Circle className="size-2 fill-current" aria-hidden="true" />
      </span>
    </button>
  );
}

export { RadioGroupItem };

