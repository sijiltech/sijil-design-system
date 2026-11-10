"use client";

import * as React from "react";

import { cn } from "../lib/cn.js";

export interface SegmentedControlOption<T extends string> {
  value: T;
  label: React.ReactNode;
  icon?: React.ReactNode;
}

export interface SegmentedControlProps<T extends string> {
  options: SegmentedControlOption<T>[];
  value: T;
  onChange: (value: T) => void;
  /** Accessible name for the radio group. */
  ariaLabel: string;
  className?: string;
}

/**
 * Full-width, equal-segment picker (iOS/Material style) for mutually exclusive choices.
 *
 * @param props - Options, current value, change handler.
 * @returns Radio-group segmented control.
 */
export function SegmentedControl<T extends string>({
  options,
  value,
  onChange,
  ariaLabel,
  className,
}: SegmentedControlProps<T>) {
  return (
    <div
      role="radiogroup"
      aria-label={ariaLabel}
      className={cn("grid gap-0.5 rounded-lg bg-background p-0.5", className)}
      style={{ gridTemplateColumns: `repeat(${options.length}, minmax(0, 1fr))` }}
    >
      {options.map((option) => {
        const active = option.value === value;
        return (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => onChange(option.value)}
            className={cn(
              "flex h-8 min-w-0 items-center justify-center gap-1 rounded-md px-2 text-[13px] transition-colors select-none",
              active
                ? "bg-card font-semibold text-foreground shadow-sm dark:bg-muted"
                : "font-medium text-muted-foreground active:bg-hover-bg",
            )}
          >
            {option.icon && (
              <span className="flex shrink-0 items-center [&_svg]:size-3.5">
                {option.icon}
              </span>
            )}
            <span className="truncate">{option.label}</span>
          </button>
        );
      })}
    </div>
  );
}
