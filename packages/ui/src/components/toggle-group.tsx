import * as React from "react";
import type { VariantProps } from "class-variance-authority";
import { cn } from "../lib/cn.js";
import type { toggleVariants } from "./toggle.js";
import { ToggleGroupContext } from "./toggle-group-context.js";

/**
 * Properties for the {@link ToggleGroup} component.
 */
export interface ToggleGroupProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange">,
    VariantProps<typeof toggleVariants> {
  /** Selection mode: 'single' allows one item; 'multiple' allows several items. */
  type?: "single" | "multiple";
  /** Controlled value. */
  value?: string | string[];
  /** Default value for uncontrolled usage. */
  defaultValue?: string | string[];
  /** Callback fired when selection changes. */
  onValueChange?: (value: string | string[]) => void;
  /** Whether the toggle group is disabled. */
  disabled?: boolean;
}

/**
 * Container component grouping a set of two-state toggle buttons.
 *
 * @param props - Component configuration properties.
 * @returns React element rendering the toggle group.
 */
function ToggleGroup({
  className,
  variant,
  size,
  type = "single",
  value: controlledValue,
  defaultValue,
  onValueChange,
  disabled = false,
  children,
  ...props
}: ToggleGroupProps) {
  const [internalValue, setInternalValue] = React.useState<string | string[]>(
    defaultValue ?? (type === "multiple" ? [] : "")
  );

  const isControlled = controlledValue !== undefined;
  const currentValue = isControlled ? controlledValue : internalValue;

  const handleItemToggle = React.useCallback(
    (itemValue: string) => {
      if (type === "single") {
        const next = currentValue === itemValue ? "" : itemValue;
        if (!isControlled) setInternalValue(next);
        onValueChange?.(next);
      } else {
        const arr = Array.isArray(currentValue) ? [...currentValue] : [];
        const index = arr.indexOf(itemValue);
        if (index > -1) {
          arr.splice(index, 1);
        } else {
          arr.push(itemValue);
        }
        if (!isControlled) setInternalValue(arr);
        onValueChange?.(arr);
      }
    },
    [type, currentValue, isControlled, onValueChange]
  );

  const contextValue = React.useMemo(
    () => ({
      value: currentValue,
      type,
      onItemToggle: handleItemToggle,
      variant,
      size,
      disabled,
    }),
    [currentValue, type, handleItemToggle, variant, size, disabled]
  );

  return (
    <ToggleGroupContext.Provider value={contextValue}>
      <div
        data-slot="toggle-group"
        role="group"
        className={cn("inline-flex items-center gap-1", className)}
        {...props}
      >
        {children}
      </div>
    </ToggleGroupContext.Provider>
  );
}

export { ToggleGroup };

