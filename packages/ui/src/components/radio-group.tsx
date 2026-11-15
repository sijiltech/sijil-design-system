import * as React from "react";
import { cn } from "../lib/cn.js";
import { RadioGroupContext } from "./radio-group-context.js";

/**
 * Properties for the {@link RadioGroup} component.
 */
export interface RadioGroupProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  /** The controlled value of the selected radio item. */
  value?: string;
  /** The default uncontrolled value of the radio group. */
  defaultValue?: string;
  /** Event handler called when the selected radio item changes. */
  onValueChange?: (value: string) => void;
  /** Name attribute applied to nested input elements. */
  name?: string;
  /** Whether the radio group is disabled. Defaults to false. */
  disabled?: boolean;
}

/**
 * A set of checkable buttons (radio items) where only one button can be checked at a time.
 *
 * @param props - Component configuration properties.
 * @returns React element rendering the radio group container.
 */
function RadioGroup({
  className,
  value: controlledValue,
  defaultValue,
  onValueChange,
  name,
  disabled = false,
  children,
  ...props
}: RadioGroupProps) {
  const [internalValue, setInternalValue] = React.useState<string | undefined>(defaultValue);
  const isControlled = controlledValue !== undefined;
  const currentValue = isControlled ? controlledValue : internalValue;

  const handleValueChange = React.useCallback(
    (newValue: string) => {
      if (!isControlled) {
        setInternalValue(newValue);
      }
      onValueChange?.(newValue);
    },
    [isControlled, onValueChange]
  );

  const contextValue = React.useMemo(
    () => ({
      value: currentValue,
      name,
      onValueChange: handleValueChange,
      disabled,
    }),
    [currentValue, name, handleValueChange, disabled]
  );

  return (
    <RadioGroupContext.Provider value={contextValue}>
      <div
        data-slot="radio-group"
        role="radiogroup"
        className={cn("grid gap-2", className)}
        {...props}
      >
        {children}
      </div>
    </RadioGroupContext.Provider>
  );
}

export { RadioGroup };

