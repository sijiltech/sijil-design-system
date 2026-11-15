import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "../lib/cn.js";
import { Popover, PopoverTrigger, PopoverContent } from "./popover.js";

/**
 * Properties for the {@link PeriodNavigator} component.
 */
export interface PeriodNavigatorProps extends React.HTMLAttributes<HTMLDivElement> {
  /** The text string representing the active period (e.g. "November 2026"). */
  periodLabel: string;
  /** Action handler invoked when previous button is clicked. */
  onPrev: () => void;
  /** Action handler invoked when next button is clicked. */
  onNext: () => void;
  /** Optional icon rendered alongside the period label. */
  icon?: React.ReactNode;
  /** Whether the previous button is disabled. Defaults to false. */
  prevDisabled?: boolean;
  /** Whether the next button is disabled. Defaults to false. */
  nextDisabled?: boolean;
  /** Optional interactive popover content (e.g. date picker) rendered on label click. */
  popoverContent?: React.ReactNode;
  /** Optional direct click handler for the period label if not using popover content. */
  onLabelClick?: () => void;
  /** Accessible label for the previous button. Defaults to "Previous". */
  ariaLabelPrev?: string;
  /** Accessible label for the next button. Defaults to "Next". */
  ariaLabelNext?: string;
}

/**
 * Period navigation control for cycling through time periods (months, weeks, days) with an optional date picker popover.
 *
 * @param props - Component configuration properties.
 * @returns React element rendering the period navigator.
 */
function PeriodNavigator({
  periodLabel,
  onPrev,
  onNext,
  icon,
  prevDisabled = false,
  nextDisabled = false,
  popoverContent,
  onLabelClick,
  ariaLabelPrev = "Previous",
  ariaLabelNext = "Next",
  className,
  ...props
}: PeriodNavigatorProps) {
  const iconBtnClass =
    "inline-flex my-auto size-8 shell:size-9 items-center justify-center rounded-md bg-card text-muted-foreground transition-colors hover:bg-muted cursor-pointer disabled:pointer-events-none disabled:opacity-40";

  const labelBtnClass =
    "inline-flex h-8 my-auto min-w-[118px] cursor-pointer items-center justify-center gap-1.5 rounded-md px-2.5 text-sm font-medium text-foreground tabular-nums transition-colors hover:bg-muted shell:h-9 shell:flex-1";

  const renderLabelTrigger = () => (
    <button
      type="button"
      onClick={onLabelClick}
      className={labelBtnClass}
      aria-label={periodLabel}
    >
      {icon && <span className="shrink-0 flex items-center" aria-hidden="true">{icon}</span>}
      <span>{periodLabel}</span>
    </button>
  );

  return (
    <div
      data-slot="period-navigator"
      className={cn(
        "inline-flex items-center bg-card shadow-sm rounded-xl p-1 shell:w-full shell:items-center select-none border border-border/50",
        className
      )}
      {...props}
    >
      <button
        type="button"
        className={iconBtnClass}
        aria-label={ariaLabelPrev}
        onClick={onPrev}
        disabled={prevDisabled}
      >
        <ChevronLeft className="size-4 rtl:rotate-180" aria-hidden="true" />
      </button>

      {popoverContent ? (
        <Popover>
          <PopoverTrigger asChild>{renderLabelTrigger()}</PopoverTrigger>
          <PopoverContent align="center" className="w-auto p-0">
            {popoverContent}
          </PopoverContent>
        </Popover>
      ) : (
        renderLabelTrigger()
      )}

      <button
        type="button"
        className={iconBtnClass}
        aria-label={ariaLabelNext}
        onClick={onNext}
        disabled={nextDisabled}
      >
        <ChevronRight className="size-4 rtl:rotate-180" aria-hidden="true" />
      </button>
    </div>
  );
}

export { PeriodNavigator };

