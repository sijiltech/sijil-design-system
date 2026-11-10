"use client";

import * as React from "react";
import { cn } from "../lib/cn.js";

/**
 * Interface representing the props for the ScreenHeader component.
 */
export interface ScreenHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The main title text of the screen.
   */
  title: string;
  /**
   * Optional description text to be displayed below the title.
   */
  description?: string;
  /**
   * Optional elements to display next to the title (like badges, status indicators, etc.).
   */
  children?: React.ReactNode;
  /**
   * Optional className customizer for the h1 title element.
   */
  titleClassName?: string;
  /**
   * Optional element rendered above the title (e.g. a mobile back link).
   */
  eyebrow?: React.ReactNode;
}

/**
 * ScreenHeader is a reusable component for displaying a screen's title and description.
 * It supports standard layouts with optional badges/status dots next to the title.
 * Inside the mobile shell the title uses one large-title style on every tab.
 *
 * @param props - Component properties.
 * @returns The rendered ScreenHeader.
 */
export function ScreenHeader({
  title,
  description,
  children,
  className,
  titleClassName,
  eyebrow,
  ...props
}: ScreenHeaderProps) {
  return (
    <div className={cn("space-y-1.5 shell:space-y-1", className)} {...props}>
      {eyebrow}
      <div className="flex items-center gap-2 shell:flex-wrap shell:gap-y-1">
        <h1
          className={cn(
            "text-2xl font-bold tracking-tight text-foreground py-3 shell:py-0 shell:text-2xl shell:leading-tight",
            titleClassName,
          )}
        >
          {title}
        </h1>
        {children}
      </div>
      {description && (
        <p className="max-w-3xl text-sm text-muted-foreground">
          {description}
        </p>
      )}
    </div>
  );
}
