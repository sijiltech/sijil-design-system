"use client";

import * as React from "react";
import { addMonths, addYears, startOfMonth, startOfWeek, startOfYear, endOfWeek } from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "../lib/cn.js";
import { CalendarLocaleContext } from "../provider/calendar-locale-context.js";
import { useDesignSystem } from "../provider/use-design-system.js";
import { Button } from "./button.js";
import { Calendar } from "./calendar.js";

export type DatePickerPrecision = "day" | "month" | "year";

export interface CalendarDatePickerProps extends Omit<React.ComponentProps<"div">, "onSelect"> {
  value: Date;
  onSelect: (date: Date) => void;
  precision?: DatePickerPrecision;
  highlightWeek?: boolean;
  isMonthDisabled?: (year: number, month: number) => boolean;
  isYearDisabled?: (year: number) => boolean;
  labels?: {
    previous?: string;
    next?: string;
    chooseMonth?: string;
    chooseYear?: string;
  };
}

/** Date picker panel that drills from years to months to days and selects at the requested precision. */
export function CalendarDatePicker({
  value, onSelect, precision = "day", highlightWeek = false,
  isMonthDisabled, isYearDisabled, labels, className, ...props
}: CalendarDatePickerProps) {
  const { locale: language } = useDesignSystem();
  const { locale, numerals } = React.useContext(CalendarLocaleContext);
  const languageTag = locale?.code ?? language;
  const format = (date: Date, options: Intl.DateTimeFormatOptions) =>
    new Intl.DateTimeFormat(languageTag, { calendar: "gregory", numberingSystem: numerals, ...options }).format(date);
  const [navigation, setNavigation] = React.useState<{ view: DatePickerPrecision; date: Date }>();
  const view = navigation?.view ?? precision;
  const date = navigation?.date ?? value;
  const year = date.getFullYear();
  const firstYear = year - (year % 12);
  const changePeriod = (step: number) => {
    const next = view === "day" ? addMonths(date, step) : addYears(date, step * (view === "year" ? 12 : 1));
    setNavigation({ view, date: next });
  };

  const selectPeriod = (selected: Date, level: "year" | "month") => {
    if (precision === level) {
      onSelect(selected);
      return;
    }
    setNavigation({ view: level === "year" ? "month" : "day", date: selected });
  };

  const title = view === "year"
    ? [firstYear, firstYear + 11].map((item) => format(addYears(startOfYear(date), item - year), { year: "numeric" })).join(" – ")
    : format(date, view === "month" ? { year: "numeric" } : { month: "long", year: "numeric" });
  const dates = view === "year"
    ? Array.from({ length: 12 }, (_, index) => addYears(startOfYear(date), firstYear + index - year))
    : Array.from({ length: 12 }, (_, index) => addMonths(startOfYear(date), index));
  const selectedWeek = {
    from: startOfWeek(value, { locale }),
    to: endOfWeek(value, { locale }),
  };

  return (
    <div data-slot="calendar-date-picker" data-view={view} className={cn("w-72 max-w-full rounded-xl border bg-popover p-3 text-popover-foreground", className)} {...props}>
      <div className="mb-3 flex items-center justify-between gap-2">
        <div className="flex gap-1">
          <Button type="button" variant="outline" size="icon-sm" aria-label={labels?.previous ?? "Previous period"} onClick={() => changePeriod(-1)}>
            <ChevronLeft aria-hidden="true" className="rtl:rotate-180" />
          </Button>
          <Button type="button" variant="outline" size="icon-sm" aria-label={labels?.next ?? "Next period"} onClick={() => changePeriod(1)}>
            <ChevronRight aria-hidden="true" className="rtl:rotate-180" />
          </Button>
        </div>
        {view === "year" ? <span className="text-sm font-semibold" aria-live="polite">{title}</span> : (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            aria-label={view === "day" ? labels?.chooseMonth ?? "Choose month" : labels?.chooseYear ?? "Choose year"}
            onClick={() => setNavigation({ view: view === "day" ? "month" : "year", date })}
          >
            {title}
          </Button>
        )}
      </div>
      {view === "day" ? (
        <Calendar
          className="mx-auto p-0"
          classNames={{ month_caption: "hidden" }}
          hideNavigation
          mode="single"
          month={date}
          selected={value}
          onSelect={(day) => day && onSelect(day)}
          disabled={(day) => Boolean(isYearDisabled?.(day.getFullYear()) || isMonthDisabled?.(day.getFullYear(), day.getMonth()))}
          modifiers={highlightWeek ? { selectedWeek } : undefined}
          modifiersClassNames={highlightWeek ? { selectedWeek: "rounded-md bg-accent" } : undefined}
        />
      ) : (
        <div className={cn("grid gap-2", view === "year" ? "grid-cols-4" : "grid-cols-3")}>
          {dates.map((item) => {
            const itemYear = item.getFullYear();
            const isYear = view === "year";
            const selected = itemYear === value.getFullYear() && (isYear || item.getMonth() === value.getMonth());
            return (
              <Button
                key={item.getTime()}
                type="button"
                variant={selected ? "default" : "ghost"}
                size="sm"
                className="px-1"
                aria-pressed={selected}
                disabled={isYearDisabled?.(itemYear) || (!isYear && isMonthDisabled?.(itemYear, item.getMonth()))}
                onClick={() => selectPeriod(isYear ? item : startOfMonth(item), view)}
              >
                {format(item, isYear ? { year: "numeric" } : { month: "short" })}
              </Button>
            );
          })}
        </div>
      )}
    </div>
  );
}
