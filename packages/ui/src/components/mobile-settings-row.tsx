"use client";

import * as React from "react";
import { ChevronRight, type LucideIcon } from "lucide-react";
import { cn } from "../lib/cn.js";

export interface MobileSettingsRowProps {
  icon: LucideIcon;
  label: string;
  href?: string;
  onClick?: () => void;
  tone?: "default" | "destructive";
  badge?: React.ReactNode;
  /** A preference control rendered below the label in a noninteractive row. */
  control?: React.ReactNode;
  className?: string;
  renderLink?: (props: {
    href: string;
    children: React.ReactNode;
    className?: string;
  }) => React.ReactNode;
}

/**
 * Mobile settings list item with icon tile, label, optional badge, and chevron indicator.
 */
export function MobileSettingsRow({
  icon: Icon,
  label,
  href,
  onClick,
  tone = "default",
  badge,
  control,
  className,
  renderLink,
}: MobileSettingsRowProps) {
  const destructive = tone === "destructive";
  const rowClasses = cn(
    "flex w-full min-h-14 items-center gap-3 px-4 py-3 text-start rounded-xl bg-card transition-colors hover:surface-tint active:surface-tint select-none cursor-pointer",
    className,
  );

  const inner = (
    <>
      <span
        className={cn(
          "flex size-9 shrink-0 items-center justify-center rounded-xl",
          destructive
            ? "bg-destructive/10 text-destructive"
            : "bg-sidebar-accent text-sidebar-accent-foreground",
        )}
      >
        <Icon className="size-[18px]" aria-hidden="true" />
      </span>
      <span
        className={cn(
          "min-w-0 flex-1 truncate text-[15px] font-medium text-foreground",
          destructive && "text-destructive font-semibold",
        )}
      >
        {label}
      </span>
      {badge && <div className="shrink-0">{badge}</div>}
      {href && (
        <ChevronRight
          className="size-4 shrink-0 text-muted-foreground rtl:rotate-180"
          aria-hidden="true"
        />
      )}
    </>
  );

  if (control != null) {
    return (
      <div className={cn("flex flex-col gap-2.5 px-4 py-3.5", className)}>
        <div className="flex items-center gap-3">{inner}</div>
        {control}
      </div>
    );
  }

  if (href && renderLink) {
    return renderLink({ href, className: rowClasses, children: inner });
  }

  if (href) {
    return (
      <a href={href} className={rowClasses}>
        {inner}
      </a>
    );
  }

  return (
    <button type="button" onClick={onClick} className={rowClasses}>
      {inner}
    </button>
  );
}

export function MobileSettingsSection({
  title,
  children,
  className,
}: {
  title?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("space-y-1.5", className)}>
      {title && (
        <div className="px-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          {title}
        </div>
      )}
      <div className="grid gap-1 rounded-2xl bg-foreground/5 p-1">
        {children}
      </div>
    </div>
  );
}

