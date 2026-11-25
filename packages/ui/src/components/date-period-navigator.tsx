"use client";

import { useState } from "react";
import { CalendarDatePicker, type CalendarDatePickerProps } from "./calendar-date-picker.js";
import { PeriodNavigator, type PeriodNavigatorProps } from "./period-navigator.js";

export interface DatePeriodNavigatorProps extends Omit<PeriodNavigatorProps, "popoverContent" | "popoverOpen" | "onPopoverOpenChange"> {
  picker: CalendarDatePickerProps;
}

/** Opens the calendar from the active period label and closes it after selection. */
export function DatePeriodNavigator({ picker, ...props }: DatePeriodNavigatorProps) {
  const [open, setOpen] = useState(false);

  return (
    <PeriodNavigator
      {...props}
      popoverOpen={open}
      onPopoverOpenChange={setOpen}
      popoverContent={(
        <CalendarDatePicker
          {...picker}
          onSelect={(date) => {
            picker.onSelect(date);
            setOpen(false);
          }}
        />
      )}
    />
  );
}
