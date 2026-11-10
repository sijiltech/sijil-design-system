"use client";

import React from "react";
import type { DateRange } from "react-day-picker";
import { Popover, PopoverContent, PopoverTrigger } from "./popover.js";
import { Calendar } from "./calendar.js";
import { DatePickerButton } from "./date-picker-button.js";
import { useDateRangePickerState } from "../hooks/use-date-range-picker-state.js";
import { useDesignSystem } from "../provider/use-design-system.js";
import { cn } from "../lib/cn.js";

/**
 * Interface representing properties for the DateRangePicker component.
 */
export interface DateRangePickerProps {
  /** Currently committed DateRange */
  value: DateRange | undefined;
  /** Callback fired when DateRange is committed */
  onChange: (range: DateRange | undefined) => void;
  /** Label text or node rendered inside trigger button */
  label: React.ReactNode;
  /** Optional icon rendered inside trigger button */
  icon?: React.ReactNode;
  /** Alignment of popover dropdown content */
  align?: "start" | "center" | "end";
  /** Number of calendar months to display simultaneously */
  numberOfMonths?: number;
  /** Optional custom styling class name for trigger button */
  className?: string;
  /** Whether chevron icon should be hidden on trigger button */
  hideChevron?: boolean;
}

/**
 * DateRangePicker component providing a two-step date range selection popover UI.
 * Handles single day selection, complete range selection, and pending state without premature closing.
 *
 * @param props - Component properties.
 * @returns Date range picker trigger and popover JSX element.
 */
export function DateRangePicker({
  value,
  onChange,
  label,
  icon,
  align = "start",
  numberOfMonths = 1,
  className,
  hideChevron = false,
}: DateRangePickerProps) {
  const { open, pendingRange, handleDayClick, handleOpenChange } =
    useDateRangePickerState({
      value,
      onChange,
    });
  const { shell: useShell } = useDesignSystem();

  return (
    <Popover open={open} onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild>
        <DatePickerButton
          label={label}
          icon={icon}
          hideChevron={hideChevron}
          className={className}
        />
      </PopoverTrigger>
      <PopoverContent
        className={cn("w-auto p-0", useShell && "w-(--radix-popover-trigger-width) rounded-2xl")}
        align={align}
      >
        <Calendar
          className={cn(
            useShell &&
              "w-full! [--cell-size:min(calc(var(--spacing)*10),calc((var(--radix-popover-trigger-width)_-_var(--spacing)*6)/7))]",
          )}
          mode="range"
          selected={pendingRange}
          onSelect={(_, selectedDay) => handleDayClick(selectedDay)}
          numberOfMonths={numberOfMonths}
        />
      </PopoverContent>
    </Popover>
  );
}
