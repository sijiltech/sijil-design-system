import * as React from "react";

/**
 * Context value interface for the RadioGroup compound components.
 */
export interface RadioGroupContextValue {
  /** Currently selected value in the radio group. */
  value?: string;
  /** Name attribute shared across all radio items in the group. */
  name?: string;
  /** Callback triggered when a radio item is selected. */
  onValueChange?: (value: string) => void;
  /** Whether the entire radio group is disabled. */
  disabled?: boolean;
}

export const RadioGroupContext = React.createContext<RadioGroupContextValue | null>(null);

