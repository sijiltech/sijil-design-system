import * as React from "react";
import type { VariantProps } from "class-variance-authority";
import type { GroupVariant } from "../lib/group-variant.js";
import type { toggleVariants } from "./toggle.js";

/**
 * Context value for the ToggleGroup compound components.
 */
export interface ToggleGroupContextValue extends VariantProps<typeof toggleVariants> {
  groupVariant?: GroupVariant;
  /** Selected values array or single string. */
  value?: string | string[];
  /** Selection type: 'single' | 'multiple'. */
  type?: "single" | "multiple";
  /** Selection change callback. */
  onItemToggle?: (itemValue: string) => void;
  /** Whether the group is disabled. */
  disabled?: boolean;
}

export const ToggleGroupContext = React.createContext<ToggleGroupContextValue | null>(null);

