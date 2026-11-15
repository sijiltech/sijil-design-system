"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./card.js";
import { Skeleton } from "./skeleton.js";
import { cn } from "../lib/cn.js";

export interface ChartCardProps extends Omit<React.ComponentProps<typeof Card>, "title"> {
  title?: React.ReactNode;
  description?: React.ReactNode;
  /** Right-aligned header controls (e.g. PeriodNavigator, DatePicker, FilterSelect). */
  actions?: React.ReactNode;
  isLoading?: boolean;
  children: React.ReactNode;
}

/**
 * Standard card container specifically designed for charts.
 * Unifies the header layout, actions toolbar, loading state, and chart padding.
 */
export function ChartCard({
  title,
  description,
  actions,
  isLoading = false,
  children,
  className,
  ...props
}: ChartCardProps) {
  return (
    <Card className={cn("overflow-hidden", className)} {...props}>
      {(title || description || actions) && (
        <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-4">
          <div className="space-y-1">
            {title && <CardTitle className="text-base font-semibold">{title}</CardTitle>}
            {description && (
              <CardDescription className="text-xs text-muted-foreground">
                {description}
              </CardDescription>
            )}
          </div>
          {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
        </CardHeader>
      )}
      <CardContent className="pt-0">
        {isLoading ? (
          <div className="flex h-72 w-full items-center justify-center">
            <Skeleton className="h-full w-full rounded-lg" />
          </div>
        ) : (
          children
        )}
      </CardContent>
    </Card>
  );
}
