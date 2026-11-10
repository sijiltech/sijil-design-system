import { createContext } from "react";
import type { Locale } from "date-fns";
import type { DayPickerProps } from "react-day-picker";

/**
 * Locale settings for the {@link Calendar}. Kept separate from the core
 * `DesignSystemProvider` so that the core entry point never depends on
 * `react-day-picker` / `date-fns`.
 */
export interface CalendarLocaleConfig {
  /** A `date-fns` locale object (e.g. `ar`, `enUS`). */
  locale?: Locale;
  /** Numeral system used for day numbers (e.g. `"arab"`). */
  numerals?: DayPickerProps["numerals"];
}

/** React context carrying {@link CalendarLocaleConfig}. */
export const CalendarLocaleContext = createContext<CalendarLocaleConfig>({});
