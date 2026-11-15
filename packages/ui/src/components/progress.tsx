import * as React from "react";
import { cn } from "../lib/cn.js";

/**
 * Visual variant for the progress bar.
 */
export type ProgressVariant = "default" | "success" | "warning" | "destructive";

/**
 * Properties for the {@link Progress} component.
 */
export interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  /** The progress value between 0 and max. Defaults to 0. */
  value?: number;
  /** Maximum progress value. Defaults to 100. */
  max?: number;
  /** Semantic color variant. Defaults to 'default'. */
  variant?: ProgressVariant;
}

/**
 * Accessible progress bar displaying completion status of tasks, quotas, and balances.
 *
 * @param props - Component configuration properties.
 * @returns React element rendering the progress bar.
 */
function Progress({
  className,
  value = 0,
  max = 100,
  variant = "default",
  ...props
}: ProgressProps) {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));

  const getVariantClass = (v: ProgressVariant): string => {
    switch (v) {
      case "success":
        return "bg-success";
      case "warning":
        return "bg-warning";
      case "destructive":
        return "bg-destructive";
      case "default":
      default:
        return "bg-primary";
    }
  };

  return (
    <div
      data-slot="progress"
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={max}
      aria-valuenow={value}
      className={cn(
        "relative h-2 w-full overflow-hidden rounded-full bg-muted/60",
        className
      )}
      {...props}
    >
      <div
        data-slot="progress-indicator"
        className={cn(
          "h-full w-full flex-1 transition-all duration-300 ease-out",
          getVariantClass(variant)
        )}
        style={{ transform: `translateX(-${100 - percentage}%)` }}
      />
    </div>
  );
}

export { Progress };

