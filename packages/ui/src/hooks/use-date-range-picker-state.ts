"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import type { DateRange } from "react-day-picker";
import { DateRangeHelper } from "../lib/date-range-helper.js";

/**
 * Interface representing options for the useDateRangePickerState custom hook.
 */
export interface UseDateRangePickerStateOptions {
  /** Currently committed DateRange value */
  value: DateRange | undefined;
  /** Callback fired when DateRange selection is committed */
  onChange: (range: DateRange | undefined) => void;
}

/**
 * Custom hook to manage popover open state and pending vs committed date range selection logic.
 * Day clicks only stage a pending range; `onChange` runs after the picker closes.
 *
 * @param options - Hook configuration containing committed value and change handler.
 * @returns State properties and event handlers for managing date range popover UI.
 */
export function useDateRangePickerState({
  value,
  onChange,
}: UseDateRangePickerStateOptions) {
  const [open, setOpen] = useState(false);
  const [pendingRange, setPendingRange] = useState<DateRange | undefined>(value);
  const pendingRangeRef = useRef<DateRange | undefined>(value);
  const valueRef = useRef(value);
  valueRef.current = value;

  // Sync pending range when popover opens or committed value changes while open
  useEffect(() => {
    if (open) {
      pendingRangeRef.current = value;
      setPendingRange(value);
    }
  }, [open, value]);

  /**
   * Commits the pending range via `onChange` when it differs from the committed value.
   */
  const commitPendingRange = useCallback(() => {
    const finalized = DateRangeHelper.finalizeRange(pendingRangeRef.current);
    if (!finalized) {
      return;
    }

    const committed = valueRef.current;
    const hasChanged =
      finalized.from?.getTime() !== committed?.from?.getTime() ||
      finalized.to?.getTime() !== committed?.to?.getTime();

    if (hasChanged) {
      onChange(finalized);
    }
  }, [onChange]);

  /**
   * Popover open/close state change handler.
   * Closes first, then commits the pending range so consumers request after dismiss.
   *
   * @param isOpen - New popover visibility state boolean.
   */
  const handleOpenChange = useCallback(
    (isOpen: boolean) => {
      setOpen(isOpen);
      if (!isOpen) {
        commitPendingRange();
      }
    },
    [commitPendingRange]
  );

  /**
   * Action handler triggered when a day cell is clicked in the calendar component.
   * Updates the pending selection only; the picker stays open so the user can adjust.
   * Commits when the picker closes.
   *
   * @param day - The clicked Date instance or undefined.
   */
  const handleDayClick = useCallback((day: Date | undefined) => {
    const { range } = DateRangeHelper.handleRangeSelect(
      pendingRangeRef.current,
      day
    );
    pendingRangeRef.current = range;
    setPendingRange(range);
  }, []);

  return {
    open,
    setOpen,
    pendingRange,
    handleDayClick,
    handleOpenChange,
  };
}
