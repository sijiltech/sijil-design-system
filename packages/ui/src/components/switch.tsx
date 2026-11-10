"use client";

import * as React from "react";
import { cn } from "../lib/cn.js";

interface SwitchProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
}

const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(
  ({ className, checked, onCheckedChange, ...props }, ref) => {
    return (
      <label className="relative inline-flex items-center cursor-pointer outline-none">
        <input
          type="checkbox"
          className="sr-only peer"
          ref={ref}
          checked={checked}
          onChange={(e) => onCheckedChange?.(e.target.checked)}
          {...props}
        />
        <div
          className={cn(
            "w-10 h-6 bg-muted rounded-full transition-all duration-200 ease-in-out hover:shadow-md",
            "peer-focus-visible:ring-2 peer-focus-visible:ring-ring peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-background",
            "peer-checked:bg-primary ",
            "after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all after:duration-200",
            "peer-checked:after:translate-x-4 rtl:peer-checked:after:-translate-x-4",
            "shadow-sm",
            className
          )}
        />
      </label>
    );
  }
);

Switch.displayName = "Switch";

export { Switch };
