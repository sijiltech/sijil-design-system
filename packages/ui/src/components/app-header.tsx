"use client";

import * as React from "react";
import { SidebarTrigger } from "./sidebar.js";
import { LanguageSwitcher } from "./language-switcher.js";
import { ModeToggle } from "./mode-toggle.js";
import { cn } from "../lib/cn.js";

export interface AppHeaderProps extends Omit<React.ComponentProps<"header">, "title"> {
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  showSidebarTrigger?: boolean;
  showLanguageSwitcher?: boolean;
  showModeToggle?: boolean;
  actions?: React.ReactNode;
  maxWidth?: string;
}

/**
 * Top application header component for desktop shells.
 * Provides sidebar toggle trigger, titles, and theme & language toggles.
 */
export function AppHeader({
  title,
  subtitle,
  showSidebarTrigger = true,
  showLanguageSwitcher = true,
  showModeToggle = true,
  actions,
  maxWidth = "max-w-[1450px]",
  className,
  ...props
}: AppHeaderProps) {
  return (
    <header
      className={cn(
        "w-full p-2.5 sm:p-6 rounded-b-2xl flex items-center gap-2 mx-auto border-separator bg-card text-card-foreground shadow-none",
        maxWidth,
        className,
      )}
      {...props}
    >
      <div className="flex w-full items-center justify-between gap-2 sm:gap-4">
        <div className="flex min-w-0 items-center gap-1.5 sm:gap-2">
          {showSidebarTrigger && <SidebarTrigger className="md:hidden" />}
          {(title || subtitle) && (
            <div className="flex flex-col text-start leading-tight min-w-0">
              {title && (
                <span className="text-xs sm:text-sm font-semibold truncate text-foreground">
                  {title}
                </span>
              )}
              {subtitle && (
                <span className="hidden sm:inline-block text-xs text-muted-foreground truncate">
                  {subtitle}
                </span>
              )}
            </div>
          )}
        </div>

        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {actions}
          {showLanguageSwitcher && <LanguageSwitcher />}
          {showModeToggle && <ModeToggle />}
        </div>
      </div>
    </header>
  );
}
