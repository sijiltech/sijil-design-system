import * as React from "react";
import { Loader2 } from "lucide-react";
import { cn } from "../lib/cn.js";

/**
 * Size options for the Spinner component.
 */
export type SpinnerSize = "xs" | "sm" | "default" | "lg" | "xl";

/**
 * Properties for the {@link Spinner} component.
 */
export interface SpinnerProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Size variant. Defaults to 'default'. */
  size?: SpinnerSize;
  /** Accessible label for screen readers. Defaults to "Loading...". */
  label?: string;
}

/**
 * Animated loading indicator spinner.
 *
 * @param props - Component configuration properties.
 * @returns React element rendering the spinner.
 */
function Spinner({
  size = "default",
  label = "Loading...",
  className,
  ...props
}: SpinnerProps) {
  const sizeMap: Record<SpinnerSize, string> = {
    xs: "size-3",
    sm: "size-3.5",
    default: "size-4",
    lg: "size-6",
    xl: "size-8",
  };

  return (
    <span
      data-slot="spinner"
      role="status"
      aria-label={label}
      className={cn("inline-flex items-center justify-center text-muted-foreground", className)}
      {...props}
    >
      <Loader2 className={cn("animate-spin", sizeMap[size])} aria-hidden="true" />
      <span className="sr-only">{label}</span>
    </span>
  );
}

export { Spinner };

