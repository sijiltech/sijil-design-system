"use client";

import * as React from "react";
import { cn } from "../lib/cn.js";
import { groupCardClassName, type GroupVariant } from "../lib/group-variant.js";
import type { ToggleProps } from "./toggle.js";
import { ToggleGroupContext } from "./toggle-group-context.js";

/**
 * Properties for the {@link ToggleGroup} component.
 */
export interface ToggleGroupProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange">,
    Pick<ToggleProps, "size"> {
  /** Group surface or the legacy toggle item style. */
  variant?: GroupVariant | ToggleProps["variant"];
  /** Item style for use with an explicit group surface. */
  itemVariant?: ToggleProps["variant"];
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
  itemVariant,
  size,
  type = "single",
  value: controlledValue,
  defaultValue,
  onValueChange,
  disabled = false,
  children,
  ...props
}: ToggleGroupProps) {
  const isGroupVariant = variant === "plain" || variant === "card";
  const groupVariant = isGroupVariant ? variant : "card";
  const toggleVariant = itemVariant === undefined && !isGroupVariant ? variant : itemVariant;
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
      variant: toggleVariant,
      groupVariant,
      size,
      disabled,
    }),
    [currentValue, type, handleItemToggle, toggleVariant, groupVariant, size, disabled]
  );

  return (
    <ToggleGroupContext.Provider value={contextValue}>
      <div
        data-slot="toggle-group"
        data-variant={groupVariant}
        role="group"
        className={cn("inline-flex items-center gap-1", groupVariant === "card" && groupCardClassName, className)}
        {...props}
      >
        {children}
      </div>
    </ToggleGroupContext.Provider>
  );
}

export { ToggleGroup };

