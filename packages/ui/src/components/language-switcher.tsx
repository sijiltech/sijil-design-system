"use client";

import * as React from "react";
import { Languages } from "lucide-react";
import { Button, type ButtonProps } from "./button.js";
import { cn } from "../lib/cn.js";
import { useDesignSystem } from "../provider/use-design-system.js";

export type AppLanguage = "ar" | "en";

export interface LanguageSwitcherProps extends Omit<ButtonProps, "onClick"> {
  /** The current active language tag ("ar" | "en"). Defaults to design system locale. */
  currentLocale?: string;
  /** Callback invoked when the user clicks the switcher to change language. */
  onLocaleChange?: (targetLocale: AppLanguage) => void | Promise<void>;
  /** Optional custom labels dictionary. */
  labels?: {
    ar?: string;
    en?: string;
  };
}

/**
 * A toggle button that switches between English and Arabic.
 * Displays the target language native name (the language it will switch to)
 * and an accessible globe/languages icon.
 */
export function LanguageSwitcher({
  currentLocale: propLocale,
  onLocaleChange,
  labels,
  className,
  variant = "header",
  size = "default",
  ...props
}: LanguageSwitcherProps) {
  const { locale: dsLocale } = useDesignSystem();
  const activeLocale = (propLocale ?? dsLocale ?? "en").toLowerCase();
  const isArabic = activeLocale.startsWith("ar");

  const targetLocale: AppLanguage = isArabic ? "en" : "ar";
  const targetLabel =
    targetLocale === "ar"
      ? labels?.ar ?? "العربية"
      : labels?.en ?? "English";

  const [isPending, startTransition] = React.useTransition();

  const handleToggle = () => {
    if (onLocaleChange) {
      startTransition(() => {
        void onLocaleChange(targetLocale);
      });
    }
  };

  return (
    <Button
      variant={variant}
      size={size}
      disabled={isPending || props.disabled}
      onClick={handleToggle}
      className={cn(
        "relative shadow-xs h-9 px-2.5 sm:px-3 text-xs sm:text-sm gap-1.5 shrink-0 select-none cursor-pointer",
        className,
      )}
      aria-label={targetLabel}
      title={targetLabel}
      {...props}
    >
      <Languages className="size-4 shrink-0 transition-transform duration-200" aria-hidden="true" />
      <span className="font-medium">{targetLabel}</span>
    </Button>
  );
}

export { LanguageSwitcher as LanguageToggle };

