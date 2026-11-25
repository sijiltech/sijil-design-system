"use client";

import * as React from "react";
import { CalendarDays } from "lucide-react";
import type { DateRange, Matcher } from "react-day-picker";
import { cn } from "../lib/cn.js";
import { useDesignSystem } from "../provider/use-design-system.js";
import { CalendarLocaleContext } from "../provider/calendar-locale-context.js";
import { Calendar } from "./calendar.js";
import { DatePickerButton } from "./date-picker-button.js";
import { Popover, PopoverContent, PopoverTrigger } from "./popover.js";

interface DatePickerFieldsBaseProps {
  label: string;
  placeholder?: string;
  hint?: React.ReactNode;
  required?: boolean;
  disabled?: boolean;
  disabledDates?: Matcher | Matcher[];
  className?: string;
}

export type DatePickerFieldsProps = DatePickerFieldsBaseProps & (
  | { mode?: "single"; value?: Date; onChange: (date: Date) => void }
  | { mode: "range"; value?: DateRange; onChange: (range: DateRange) => void; fromLabel?: string; toLabel?: string }
);

interface DateFieldProps {
  label: string;
  value?: Date;
  defaultMonth?: Date;
  onSelect: (date: Date) => void;
  disabled?: boolean;
  disabledDates: Matcher[];
  placeholder: string;
  showLabel?: boolean;
}

function DateField({ label, value, defaultMonth, onSelect, disabled, disabledDates, placeholder, showLabel }: DateFieldProps) {
  const { locale: language } = useDesignSystem();
  const { locale, numerals } = React.useContext(CalendarLocaleContext);
  const [open, setOpen] = React.useState(false);
  const text = value ? new Intl.DateTimeFormat(locale?.code ?? language, {
    calendar: "gregory",
    dateStyle: "medium",
    numberingSystem: numerals,
  }).format(value) : placeholder;

  return (
    <div className="min-w-0 space-y-1">
      {showLabel && <span className="block text-xs font-medium text-muted-foreground">{label}</span>}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <DatePickerButton
            disabled={disabled}
            aria-label={`${label}: ${text}`}
            label={text}
            icon={<CalendarDays className="size-4" aria-hidden="true" />}
            hideChevron
            className="w-full justify-start rounded-lg border border-input bg-background text-start font-normal shadow-none"
          />
        </PopoverTrigger>
        <PopoverContent align="start" className="w-auto p-0">
          <Calendar
            autoFocus
            mode="single"
            defaultMonth={value ?? defaultMonth}
            selected={value}
            disabled={disabledDates}
            onSelect={(date) => {
              if (date) {
                onSelect(date);
                setOpen(false);
              }
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}

/** Date field with either one calendar trigger or separate start and end triggers. */
export function DatePickerFields(props: DatePickerFieldsProps) {
  const { label, hint, required, className, disabled, placeholder = "Pick a date" } = props;
  const matchers = Array.isArray(props.disabledDates) ? props.disabledDates : props.disabledDates ? [props.disabledDates] : [];

  return (
    <fieldset data-slot="date-picker-fields" disabled={disabled} className={cn("min-w-0 space-y-1.5", className)}>
      <legend className="mb-1.5 text-sm font-medium">
        {label}{required && <span className="ms-1 text-destructive" aria-hidden="true">*</span>}
      </legend>
      {props.mode === "range" ? (
        <div className="grid grid-cols-2 gap-2.5">
          <DateField
            label={props.fromLabel ?? "From"}
            value={props.value?.from}
            defaultMonth={props.value?.to}
            disabled={disabled}
            disabledDates={props.value?.to ? [...matchers, { after: props.value.to }] : matchers}
            placeholder={placeholder}
            showLabel
            onSelect={(from) => props.onChange({ from, to: props.value?.to })}
          />
          <DateField
            label={props.toLabel ?? "To"}
            value={props.value?.to}
            defaultMonth={props.value?.from}
            disabled={disabled}
            disabledDates={props.value?.from ? [...matchers, { before: props.value.from }] : matchers}
            placeholder={placeholder}
            showLabel
            onSelect={(to) => props.onChange({ from: props.value?.from, to })}
          />
        </div>
      ) : (
        <DateField label={label} value={props.value} disabled={disabled} disabledDates={matchers} placeholder={placeholder} onSelect={props.onChange} />
      )}
      {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
    </fieldset>
  );
}
