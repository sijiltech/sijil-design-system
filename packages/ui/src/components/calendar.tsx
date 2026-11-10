"use client"

import * as React from "react"
import { format } from "date-fns"
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "lucide-react"
import { DayButton, DayPicker, getDefaultClassNames } from "react-day-picker"

import { cn } from "../lib/cn.js"
import { CalendarLocaleContext } from "../provider/calendar-locale-context.js"
import { Button, buttonVariants } from "./button.js"
import { useDirection } from "./direction.js"

/**
 * Styled `react-day-picker` calendar. Direction comes from the design-system
 * direction provider; the date-fns locale and numerals come from
 * `CalendarLocaleProvider` (both can still be overridden through props).
 *
 * @param props - DayPicker props plus an optional `buttonVariant`.
 * @returns The calendar element.
 */
function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  captionLayout = "label",
  buttonVariant = "ghost",
  formatters,
  components,
  ...props
}: React.ComponentProps<typeof DayPicker> & {
  buttonVariant?: React.ComponentProps<typeof Button>["variant"]
}) {
  const { locale, numerals } = React.useContext(CalendarLocaleContext)
  const direction = useDirection()
  const defaultClassNames = getDefaultClassNames()

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      locale={locale}
      dir={direction}
      numerals={numerals}
      className={cn(
        "bg-background group/calendar p-3 [--cell-size:--spacing(8)] [[data-slot=card-content]_&]:bg-transparent [[data-slot=popover-content]_&]:bg-transparent",
        className
      )}
      captionLayout={captionLayout}
      formatters={{
        formatMonthDropdown: (date) => format(date, "MMM", { locale }),
        ...formatters,
      }}
      classNames={{
        root: cn("w-fit", defaultClassNames.root),
        months: cn(
          "flex gap-4 flex-col md:flex-row relative",
          defaultClassNames.months
        ),
        month: cn("flex flex-col w-full gap-4", defaultClassNames.month),
        nav: cn(
          "flex items-center gap-1 w-full absolute top-0 inset-x-0 justify-between",
          defaultClassNames.nav
        ),
        button_previous: cn(
          buttonVariants({ variant: buttonVariant }),
          "size-(--cell-size) aria-disabled:opacity-50 p-0 select-none",
          defaultClassNames.button_previous
        ),
        button_next: cn(
          buttonVariants({ variant: buttonVariant }),
          "size-(--cell-size) aria-disabled:opacity-50 p-0 select-none",
          defaultClassNames.button_next
        ),
        month_caption: cn(
          "flex items-center justify-center h-(--cell-size) w-full px-(--cell-size)",
          defaultClassNames.month_caption
        ),
        dropdowns: cn(
          "w-full flex items-center text-sm font-medium justify-center h-(--cell-size) gap-1.5",
          defaultClassNames.dropdowns
        ),
        dropdown_root: cn(
          "relative has-focus:border-ring border border-input shadow-xs has-focus:ring-ring/50 has-focus:ring-[3px] rounded-md",
          defaultClassNames.dropdown_root
        ),
        dropdown: cn(
          "absolute bg-popover inset-0 opacity-0",
          defaultClassNames.dropdown
        ),
        caption_label: cn(
          "select-none font-medium",
          captionLayout === "label"
            ? "text-sm"
            : "rounded-md ltr:pl-2 ltr:pr-1 rtl:pr-2 rtl:pl-1 flex items-center gap-1 text-sm h-8 [&>svg]:text-muted-foreground [&>svg]:size-3.5",
          defaultClassNames.caption_label
        ),
        table: "w-full border-collapse",
        weekdays: cn("flex", defaultClassNames.weekdays),
        weekday: cn(
          "text-muted-foreground rounded-md flex-1 font-normal text-[0.8rem] select-none",
          defaultClassNames.weekday
        ),
        week: cn("flex w-full mt-2", defaultClassNames.week),
        week_number_header: cn(
          "select-none w-(--cell-size)",
          defaultClassNames.week_number_header
        ),
        week_number: cn(
          "text-[0.8rem] select-none text-muted-foreground",
          defaultClassNames.week_number
        ),
        day: cn(
          "relative w-full h-full p-0 text-center ltr:[&:first-child[data-selected=true]_button]:rounded-l-md ltr:[&:last-child[data-selected=true]_button]:rounded-r-md rtl:[&:first-child[data-selected=true]_button]:rounded-r-md rtl:[&:last-child[data-selected=true]_button]:rounded-l-md group/day aspect-square select-none",
          defaultClassNames.day
        ),
        range_start: cn(
          "ltr:rounded-l-md rtl:rounded-r-md bg-primary/10 dark:bg-ring/40",
          defaultClassNames.range_start
        ),
        range_middle: cn(
          "rounded-none bg-primary/5 dark:bg-ring/20",
          defaultClassNames.range_middle
        ),
        range_end: cn(
          "ltr:rounded-r-md rtl:rounded-l-md bg-primary/10 dark:bg-ring/40",
          defaultClassNames.range_end
        ),
        today: cn(
          "bg-primary/10 text-foreground dark:bg-accent dark:text-accent-foreground rounded-md data-[selected=true]:rounded-none",
          defaultClassNames.today
        ),
        outside: cn(
          "text-muted-foreground aria-selected:text-muted-foreground",
          defaultClassNames.outside
        ),
        disabled: cn(
          "text-muted-foreground opacity-50",
          defaultClassNames.disabled
        ),
        hidden: cn("invisible", defaultClassNames.hidden),
        ...classNames,
      }}
      components={{
        Root: ({ className, rootRef, ...props }) => {
          return (
            <div
              data-slot="calendar"
              ref={rootRef as React.Ref<HTMLDivElement>}
              className={cn(className)}
              {...props}
            />
          )
        },
        Chevron: ({ className, orientation, ...props }) => {
          if (orientation === "left") {
            return (
              <ChevronLeftIcon className={cn("size-4 rtl:rotate-180", className)} {...props} />
            )
          }

          if (orientation === "right") {
            return (
              <ChevronRightIcon
                className={cn("size-4 rtl:rotate-180", className)}
                {...props}
              />
            )
          }

          return (
            <ChevronDownIcon className={cn("size-4", className)} {...props} />
          )
        },
        DayButton: CalendarDayButton,
        WeekNumber: ({ children, ...props }) => {
          return (
            <td {...props}>
              <div className="flex size-(--cell-size) items-center justify-center text-center">
                {children}
              </div>
            </td>
          )
        },
        ...components,
      }}
      {...props}
    />
  )
}

function CalendarDayButton({
  className,
  day,
  modifiers,
  ...props
}: React.ComponentProps<typeof DayButton>) {
  const defaultClassNames = getDefaultClassNames()

  const ref = React.useRef<HTMLButtonElement>(null)
  React.useEffect(() => {
    if (modifiers.focused) ref.current?.focus()
  }, [modifiers.focused])

  return (
    <Button
      ref={ref}
      variant="ghost"
      // No size="icon" — avoids the compound variant that sets dark:bg-white
      data-day={format(day.date, "yyyy-MM-dd")}
      data-selected-single={
        modifiers.selected &&
        !modifiers.range_start &&
        !modifiers.range_end &&
        !modifiers.range_middle
      }
      data-range-start={modifiers.range_start}
      data-range-end={modifiers.range_end}
      data-range-middle={modifiers.range_middle}
      className={cn(
        // Manual size reset (replaces what size="icon" would have added)
        "h-auto px-0 py-0",
        // Selected / range — light: dark text on soft tint; dark modes: white text
        "data-[selected-single=true]:bg-primary/15 data-[selected-single=true]:text-foreground",
        "data-[selected-single=true]:hover:bg-primary/15 data-[selected-single=true]:hover:text-foreground",
        "dark:data-[selected-single=true]:bg-ring dark:data-[selected-single=true]:text-white",
        "dark:data-[selected-single=true]:hover:bg-ring dark:data-[selected-single=true]:hover:text-white",
        "data-[range-start=true]:bg-primary/15 data-[range-start=true]:text-foreground",
        "data-[range-start=true]:hover:bg-primary/15 data-[range-start=true]:hover:text-foreground",
        "dark:data-[range-start=true]:bg-ring dark:data-[range-start=true]:text-white",
        "dark:data-[range-start=true]:hover:bg-ring dark:data-[range-start=true]:hover:text-white",
        "data-[range-end=true]:bg-primary/15 data-[range-end=true]:text-foreground",
        "data-[range-end=true]:hover:bg-primary/15 data-[range-end=true]:hover:text-foreground",
        "dark:data-[range-end=true]:bg-ring dark:data-[range-end=true]:text-white",
        "dark:data-[range-end=true]:hover:bg-ring dark:data-[range-end=true]:hover:text-white",
        "data-[range-middle=true]:bg-primary/10 data-[range-middle=true]:text-foreground",
        "data-[range-middle=true]:hover:bg-primary/10 data-[range-middle=true]:hover:text-foreground",
        "dark:data-[range-middle=true]:bg-ring/30 dark:data-[range-middle=true]:text-white",
        "dark:data-[range-middle=true]:hover:bg-ring/30 dark:data-[range-middle=true]:hover:text-white",
        // Focus ring + hover
        "group-data-[focused=true]/day:border-ring group-data-[focused=true]/day:ring-ring/50",
        "hover:bg-secondary-hover hover:text-secondary-foreground",
        // Layout
        "flex aspect-square size-auto w-full min-w-(--cell-size) flex-col gap-1 leading-none font-normal",
        "group-data-[focused=true]/day:relative group-data-[focused=true]/day:z-10 group-data-[focused=true]/day:ring-[3px]",
        // Range rounding
        "data-[range-end=true]:rounded-md ltr:data-[range-end=true]:rounded-r-md rtl:data-[range-end=true]:rounded-l-md",
        "data-[range-middle=true]:rounded-none",
        "data-[range-start=true]:rounded-md ltr:data-[range-start=true]:rounded-l-md rtl:data-[range-start=true]:rounded-r-md",
        "[&>span]:text-sm [&>span]:opacity-70",
        defaultClassNames.day,
        className
      )}
      {...props}
    />
  )
}

export { Calendar, CalendarDayButton }
