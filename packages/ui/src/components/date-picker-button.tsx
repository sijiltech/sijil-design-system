"use client";

import * as React from "react";
import { CalendarDays, ChevronDownIcon } from "lucide-react";
import { cn } from "../lib/cn.js";
import { useDesignSystem } from "../provider/use-design-system.js";

/**
 * Properties for the DatePickerButton component.
 */
export interface DatePickerButtonProps extends React.ComponentPropsWithoutRef<"button"> {
  /** The formatted date range or label text to show */
  label: React.ReactNode;
  /** Optional icon element to display (e.g., Calendar icon) */
  icon?: React.ReactNode;
  /** Whether to hide the trailing chevron down arrow. Defaults to false. */
  hideChevron?: boolean;
}

/**
 * DatePickerButton renders a premium, fully rounded pill trigger button for date ranges and calendars.
 * Conforms to the project's styling guidelines and design system.
 */
export const DatePickerButton = React.forwardRef<HTMLButtonElement, DatePickerButtonProps>(
  ({ label, icon, hideChevron = false, className, type = "button", ...props }, ref) => {
    const { shell: useShell } = useDesignSystem();
    return (
      <button
        ref={ref}
        type={type}
        className={cn(
          "inline-flex items-center justify-center h-auto min-h-10 gap-1.5 rounded-xl bg-card px-4 py-2 text-sm font-medium text-foreground shadow-xs transition-all hover:bg-muted focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring cursor-pointer select-none active:scale-[0.98]",
          useShell && "w-full min-h-11 px-3.5",
          className
        )}
        {...props}
      >
        <div className={cn("flex min-w-0 items-center gap-2", useShell && "w-full")}>
          {icon ? (
            <span className="shrink-0 flex items-center">{icon}</span>
          ) : (
            useShell && <CalendarDays className="size-4 shrink-0 text-muted-foreground" />
          )}
          <span className={cn("truncate", useShell && "flex-1 text-start")}>{label}</span>
          {!hideChevron && <ChevronDownIcon className="size-4 shrink-0 text-foreground/70" />}
        </div>
      </button>
    );
  }
);

DatePickerButton.displayName = "DatePickerButton";
