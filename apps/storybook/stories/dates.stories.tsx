import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { addDays, addMonths, addYears, format } from "date-fns";
import { ar } from "date-fns/locale";
import { CalendarDays } from "lucide-react";
import type { DateRange } from "react-day-picker";
import { DatePickerButton, PeriodNavigator, Popover, PopoverContent, PopoverTrigger, useDirection } from "@sijil/ui";
import { Calendar, CalendarDayButton, CalendarLocaleProvider } from "@sijil/ui/calendar";
import { CalendarDatePicker, DatePickerFields, DateRangePicker, type DatePickerPrecision } from "@sijil/ui/date-picker";

const meta = { title: "Components/Date Controls" } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

const sampleDate = new Date(2026, 10, 15);

export const SingleDate: Story = {
  name: "Calendar",
  render: function SingleDate() {
    const [date, setDate] = React.useState<Date | undefined>(sampleDate);

    return (
      <div className="w-fit space-y-3">
        <Calendar
          className="bg-card"
          mode="single"
          defaultMonth={sampleDate}
          selected={date}
          onSelect={setDate}
          showWeekNumber
          components={{ DayButton: CalendarDayButton }}
        />
        <p className="text-sm" role="status">{date ? format(date, "PPP") : "Choose a date"}</p>
      </div>
    );
  },
};

export const LocalizedCalendar: Story = {
  name: "Calendar Locale Provider",
  render: () => (
    <CalendarLocaleProvider locale={ar} numerals="arab">
      <Calendar className="w-fit bg-card" defaultMonth={sampleDate} dir="rtl" />
    </CalendarLocaleProvider>
  ),
};

export const CalendarTrigger: Story = {
  name: "Date Picker Button",
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <DatePickerButton label="View calendar" icon={<CalendarDays className="size-4" />} />
      </PopoverTrigger>
      <PopoverContent align="start" className="w-auto p-0">
        <Calendar defaultMonth={sampleDate} />
      </PopoverContent>
    </Popover>
  ),
};

export const RequestDates: Story = {
  name: "Date Range Picker",
  render: function RequestDates() {
    const [range, setRange] = React.useState<DateRange | undefined>();

    const label = range?.from
      ? [range.from, range.to].filter((date): date is Date => date !== undefined)
          .map((date) => format(date, "MMM d")).join(" – ")
      : "Select leave dates";

    return (
      <div className="space-y-2">
        <DateRangePicker
          value={range}
          onChange={setRange}
          label={label}
          icon={<CalendarDays className="size-4" />}
        />
        <p className="text-sm text-muted-foreground">Close the calendar to apply the selection.</p>
      </div>
    );
  },
};

export const CustomCalendarPicker: Story = {
  name: "Calendar Date Picker",
  render: function CustomCalendarPicker() {
    const rtl = useDirection() === "rtl";
    const [value, setValue] = React.useState(sampleDate);
    const [view, setView] = React.useState<"week" | DatePickerPrecision>("month");
    const [open, setOpen] = React.useState(false);
    const precision = view === "week" ? "day" : view;
    const label = new Intl.DateTimeFormat(rtl ? "ar" : "en", {
      calendar: "gregory",
      year: "numeric",
      month: precision === "year" ? undefined : "long",
      day: precision === "day" ? "numeric" : undefined,
    }).format(value);
    const move = (step: number) => setValue((date) => {
      if (view === "year") return addYears(date, step);
      if (view === "month") return addMonths(date, step);
      return addDays(date, view === "week" ? step * 7 : step);
    });

    return (
      <CalendarLocaleProvider locale={rtl ? ar : undefined} numerals={rtl ? "arab" : undefined}>
        <div className="flex max-w-md flex-wrap items-center gap-3">
          <label className="flex items-center gap-2 text-sm">
            {rtl ? "الفترة" : "Period"}
            <select
              className="rounded-md border bg-card p-2"
              value={view}
              onChange={(event) => setView(event.target.value as typeof view)}
            >
              <option value="day">{rtl ? "يوم" : "Day"}</option>
              <option value="week">{rtl ? "أسبوع" : "Week"}</option>
              <option value="month">{rtl ? "شهر" : "Month"}</option>
              <option value="year">{rtl ? "سنة" : "Year"}</option>
            </select>
          </label>
          <PeriodNavigator
            periodLabel={label}
            ariaLabelPrev={rtl ? "الفترة السابقة" : "Previous period"}
            ariaLabelNext={rtl ? "الفترة التالية" : "Next period"}
            prevDisabled={view === "month" && value.getFullYear() === 2026 && value.getMonth() === 1}
            onPrev={() => move(-1)}
            onNext={() => move(1)}
            popoverOpen={open}
            onPopoverOpenChange={setOpen}
            popoverContent={
              <CalendarDatePicker
                value={value}
                precision={precision}
                highlightWeek={view === "week"}
                isMonthDisabled={(year, month) => year === 2026 && month === 0}
                isYearDisabled={(year) => year === 2025}
                labels={rtl ? { previous: "السابق", next: "التالي", chooseMonth: "اختيار الشهر", chooseYear: "اختيار السنة" } : undefined}
                onSelect={(date) => {
                  setValue(date);
                  setOpen(false);
                }}
              />
            }
          />
        </div>
      </CalendarLocaleProvider>
    );
  },
};

export const LeaveDateFields: Story = {
  name: "Date Fields · Leave Form",
  render: function LeaveDateFields() {
    const rtl = useDirection() === "rtl";
    const [rangeMode, setRangeMode] = React.useState(true);
    const [date, setDate] = React.useState<Date>();
    const [range, setRange] = React.useState<DateRange>();
    const common = { required: true, placeholder: rtl ? "اختر التاريخ" : "Pick a date" };

    return (
      <CalendarLocaleProvider locale={rtl ? ar : undefined} numerals={rtl ? "arab" : undefined}>
        <div className="max-w-sm space-y-4">
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={rangeMode} onChange={(event) => setRangeMode(event.target.checked)} />
            {rtl ? "اختيار فترة" : "Select a date range"}
          </label>
          {rangeMode ? (
            <DatePickerFields
              {...common}
              mode="range"
              label={rtl ? "التواريخ" : "Dates"}
              fromLabel={rtl ? "من" : "From"}
              toLabel={rtl ? "إلى" : "To"}
              value={range}
              onChange={setRange}
            />
          ) : (
            <DatePickerFields {...common} label={rtl ? "التاريخ" : "Date"} value={date} onChange={setDate} />
          )}
        </div>
      </CalendarLocaleProvider>
    );
  },
};
