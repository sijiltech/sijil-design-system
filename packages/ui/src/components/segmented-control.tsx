"use client";

import * as React from "react";

import { cn } from "../lib/cn.js";
import { groupCardClassName, groupSelectionClassName, type GroupVariant } from "../lib/group-variant.js";

export interface SegmentedControlOption<T extends string> {
  value: T;
  label: React.ReactNode;
  icon?: React.ReactNode;
}

export interface SegmentedControlProps<T extends string> {
  variant?: GroupVariant | "surface";
  options: SegmentedControlOption<T>[];
  value: T;
  onChange: (value: T) => void;
  /** Accessible name for the radio group. */
  ariaLabel: string;
  className?: string;
  disabled?: boolean;
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
  variant = "surface",
  disabled = false,
}: SegmentedControlProps<T>) {
  const onSurface = variant === "surface";

  return (
    <div
      role="radiogroup"
      data-slot="segmented-control"
      data-variant={variant}
      aria-label={ariaLabel}
      className={cn("grid gap-1", variant === "card" && groupCardClassName, onSurface && "gap-0.5 rounded-lg bg-background p-0.5", className)}
      style={{ gridTemplateColumns: `repeat(${options.length}, minmax(0, 1fr))` }}
    >
      {options.map((option) => {
        const active = option.value === value;
        return (
          <button
            key={option.value}
            type="button"
            disabled={disabled}
            role="radio"
            aria-checked={active}
            onClick={() => onChange(option.value)}
            className={cn(
              "flex h-8 min-w-0 items-center justify-center gap-1 px-2 text-[13px] transition-colors focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring select-none",
              onSurface ? "rounded-md" : "rounded-xl hover:surface-tint hover:text-hover-text",
              active
                ? [variant === "surface" ? "bg-card text-foreground shadow-sm dark:bg-muted" : groupSelectionClassName[variant], "font-semibold"]
                : ["font-medium text-muted-foreground", onSurface ? "active:bg-hover-bg" : "active:surface-tint"],
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
