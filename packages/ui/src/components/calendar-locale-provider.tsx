"use client";

import * as React from "react";

import {
  CalendarLocaleContext,
  type CalendarLocaleConfig,
} from "../provider/calendar-locale-context.js";

/** Props of {@link CalendarLocaleProvider}. */
export interface CalendarLocaleProviderProps extends CalendarLocaleConfig {
  children: React.ReactNode;
}

/**
 * Configures the date-fns locale and numeral system used by every
 * {@link Calendar} (and `DateRangePicker`) below it.
 *
 * @param props - Locale configuration and children.
 * @returns The provider wrapping `children`.
 */
export function CalendarLocaleProvider({
  children,
  locale,
  numerals,
}: CalendarLocaleProviderProps) {
  const value = React.useMemo<CalendarLocaleConfig>(
    () => ({ locale, numerals }),
    [locale, numerals],
  );

  return (
    <CalendarLocaleContext.Provider value={value}>
      {children}
    </CalendarLocaleContext.Provider>
  );
}

