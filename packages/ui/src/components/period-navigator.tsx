import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "../lib/cn.js";
import { groupCardClassName, groupSurfaceClassName, type GroupVariant } from "../lib/group-variant.js";
import { Popover, PopoverTrigger, PopoverContent } from "./popover.js";

/**
 * Properties for the {@link PeriodNavigator} component.
 */
export interface PeriodNavigatorProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Surface treatment. Defaults to a raised surface. */
  variant?: GroupVariant | "surface";
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
  popoverAlign?: React.ComponentProps<typeof PopoverContent>["align"];
  /** Optional controlled state for closing the popover after selection. */
  popoverOpen?: boolean;
  onPopoverOpenChange?: (open: boolean) => void;
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
  popoverAlign = "center",
  popoverOpen,
  onPopoverOpenChange,
  onLabelClick,
  ariaLabelPrev = "Previous",
  ariaLabelNext = "Next",
  className,
  variant = "surface",
  ...props
}: PeriodNavigatorProps) {
  const iconBtnClass =
    "inline-flex my-auto size-8 shell:size-9 items-center justify-center bg-card text-muted-foreground transition-colors cursor-pointer disabled:pointer-events-none";

  const labelBtnClass =
    "inline-flex h-8 my-auto min-w-[118px] cursor-pointer items-center justify-center gap-1.5 px-2.5 text-sm font-medium text-foreground tabular-nums transition-colors shell:h-9 shell:flex-1";

  const onSurface = variant === "surface";
  const controlClassName = onSurface ? "rounded-md hover:bg-muted" : "rounded-xl hover:surface-tint hover:text-hover-text";
  const arrowClassName = cn(iconBtnClass, controlClassName, onSurface ? "disabled:opacity-50" : "disabled:opacity-40");

  const renderLabelTrigger = () => (
    <button
      type="button"
      onClick={onLabelClick}
      className={cn(labelBtnClass, controlClassName, !onSurface && "bg-card")}
      aria-label={periodLabel}
    >
      {icon && <span className="shrink-0 flex items-center" aria-hidden="true">{icon}</span>}
      <span>{periodLabel}</span>
    </button>
  );

  return (
    <div
      data-slot="period-navigator"
      data-variant={variant}
      className={cn(
        "inline-flex items-center gap-1 shell:w-full shell:items-center select-none",
        variant === "card" && groupCardClassName,
        onSurface && [groupSurfaceClassName, "gap-0"],
        className
      )}
      {...props}
    >
      <button
        type="button"
        className={arrowClassName}
        aria-label={ariaLabelPrev}
        onClick={onPrev}
        disabled={prevDisabled}
      >
        <ChevronLeft className="size-4 rtl:rotate-180" aria-hidden="true" />
      </button>

      {popoverContent ? (
        <Popover open={popoverOpen} onOpenChange={onPopoverOpenChange}>
          <PopoverTrigger asChild>{renderLabelTrigger()}</PopoverTrigger>
          <PopoverContent align={popoverAlign} className="w-auto p-0">
            {popoverContent}
          </PopoverContent>
        </Popover>
      ) : (
        renderLabelTrigger()
      )}

      <button
        type="button"
        className={arrowClassName}
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

