"use client";

import * as React from "react";
import { Moon, Palette, Sun } from "lucide-react";
import { NEXT_THEME, useTheme, type ResolvedTheme } from "../provider/theme-provider.js";
import { Button, type ButtonProps } from "./button.js";
import { cn } from "../lib/cn.js";

export interface ModeToggleProps extends Omit<ButtonProps, "onClick"> {
  /** Optional theme override; if omitted, reads from ThemeProvider. */
  currentTheme?: ResolvedTheme;
  /** Optional click handler override. */
  onToggle?: () => void;
  /** Custom labels for accessibility. */
  labels?: {
    light?: string;
    dark?: string;
    "dark-blue"?: string;
    toggle?: string;
  };
}

/**
 * A theme toggle button that cycles between Light, Dark, and Dark-Blue themes.
 * Renders Sun, Moon, or Palette icons with smooth transitions.
 */
export function ModeToggle({
  currentTheme: propTheme,
  onToggle,
  labels,
  className,
  variant = "header",
  size = "default",
  ...props
}: ModeToggleProps) {
  const { resolvedTheme, toggleTheme } = useTheme();
  const activeTheme = propTheme ?? resolvedTheme;

  const nextTheme = NEXT_THEME[activeTheme];

  const defaultLabels = {
    light: "Light",
    dark: "Dark",
    "dark-blue": "Dark Blue",
    toggle: "Toggle theme",
    ...labels,
  };

  const handleToggle = () => {
    if (onToggle) {
      onToggle();
    } else {
      toggleTheme();
    }
  };

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleToggle}
      className={cn("relative cursor-pointer select-none", className)}
      aria-label={defaultLabels[nextTheme] || defaultLabels.toggle}
      title={defaultLabels[nextTheme] || defaultLabels.toggle}
      {...props}
      data-next-theme={nextTheme}
    >
      {nextTheme === "dark" && (
        <Moon className="size-4 shrink-0 transition-transform duration-200" />
      )}
      {nextTheme === "dark-blue" && (
        <Palette className="size-4 shrink-0 transition-transform duration-200" />
      )}
      {nextTheme === "light" && (
        <Sun className="size-4 shrink-0 transition-transform duration-200" />
      )}
      <span className="sr-only">{defaultLabels.toggle}</span>
    </Button>
  );
}

export { ModeToggle as ThemeToggle };

