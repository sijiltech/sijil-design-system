import type { DateRange } from "react-day-picker";

/**
 * Static helper class for managing date range selection calculations and states in date picker components.
 */
export class DateRangeHelper {
  /**
   * Calculates the next date range state when a day is clicked.
   * - If range is undefined or already fully selected (both from and to set), starts a new range from `selectedDay`.
   * - If only `from` is set, sets `to` to `selectedDay` (ordering `from` and `to` chronologically).
   *
   * @param current - Current in-progress DateRange state.
   * @param selectedDay - The day clicked by the user.
   * @returns Object with the next DateRange and boolean flag indicating if the range is complete.
   */
  static handleRangeSelect(
    current: DateRange | undefined,
    selectedDay: Date | undefined
  ): { range: DateRange | undefined; isComplete: boolean } {
    if (!selectedDay) {
      return { range: current, isComplete: false };
    }

    // Case 1: Range is uninitialized OR both `from` and `to` are already set.
    // Start a brand-new selection starting at `selectedDay`.
    if (!current || (Boolean(current.from) && Boolean(current.to))) {
      return {
        range: { from: selectedDay, to: undefined },
        isComplete: false,
      };
    }

    // Case 2: Only `from` is set. Selection of `to` completes the range.
    if (current.from && !current.to) {
      if (selectedDay < current.from) {
        return {
          range: { from: selectedDay, to: current.from },
          isComplete: true,
        };
      }
      return {
        range: { from: current.from, to: selectedDay },
        isComplete: true,
      };
    }

    return {
      range: { from: selectedDay, to: undefined },
      isComplete: false,
    };
  }

  /**
   * Finalizes an in-progress range when the date picker popover closes.
   * If `from` exists but `to` is missing, defaults `to` to equal `from` (single day range).
   *
   * @param current - Current pending DateRange state.
   * @returns Finalized DateRange or undefined.
   */
  static finalizeRange(current: DateRange | undefined): DateRange | undefined {
    if (!current?.from) return undefined;
    if (!current.to) {
      return { from: current.from, to: current.from };
    }
    return current;
  }
}
