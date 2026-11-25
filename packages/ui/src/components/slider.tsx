"use client";

import * as React from "react";
import { cn } from "../lib/cn.js";

/**
 * Properties for the {@link Slider} component.
 */
export interface SliderProps extends Omit<React.ComponentProps<"input">, "value" | "onChange"> {
  /** Numeric value of the slider. */
  value?: number;
  /** Default value for uncontrolled usage. Defaults to 0. */
  defaultValue?: number;
  /** Minimum slider value. Defaults to 0. */
  min?: number;
  /** Maximum slider value. Defaults to 100. */
  max?: number;
  /** Step increment. Defaults to 1. */
  step?: number;
  /** Callback fired when slider value changes. */
  onValueChange?: (value: number) => void;
}

/**
 * An input where the user selects a value from a given range along a horizontal track.
 *
 * @param props - Component configuration properties.
 * @returns React element rendering the slider.
 */
function Slider({
  className,
  value: controlledValue,
  defaultValue = 0,
  min = 0,
  max = 100,
  step = 1,
  disabled = false,
  onValueChange,
  ...props
}: SliderProps) {
  const [internalValue, setInternalValue] = React.useState<number>(defaultValue);
  const isControlled = controlledValue !== undefined;
  const currentValue = isControlled ? controlledValue : internalValue;

  const percentage = Math.min(100, Math.max(0, ((currentValue - min) / (max - min)) * 100));

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const num = Number(e.target.value);
    if (!isControlled) {
      setInternalValue(num);
    }
    onValueChange?.(num);
  };

  return (
    <div
      data-slot="slider"
      className={cn("relative flex w-full touch-none select-none items-center", className)}
    >
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        disabled={disabled}
        value={currentValue}
        onChange={handleChange}
        className={cn(
          "w-full h-2 bg-muted rounded-full appearance-none cursor-pointer outline-none transition-colors",
          "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          "disabled:cursor-not-allowed disabled:opacity-50",
          "[&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:size-4.5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:transition-transform [&::-webkit-slider-thumb]:hover:scale-110",
          "[&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:size-4.5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-primary [&::-moz-range-thumb]:shadow-md"
        )}
        style={{
          background: `linear-gradient(to right, var(--primary) ${percentage}%, var(--muted) ${percentage}%)`,
        }}
        {...props}
      />
    </div>
  );
}

export { Slider };

