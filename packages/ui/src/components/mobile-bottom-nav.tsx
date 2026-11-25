"use client";

import * as React from "react";
import { type LucideIcon } from "lucide-react";
import { cn } from "../lib/cn.js";

export interface MobileTabItem {
  id: string;
  label: string;
  icon: LucideIcon;
  url?: string;
  isActive?: boolean;
  onClick?: () => void;
}

export interface MobileBottomNavProps extends React.ComponentProps<"nav"> {
  tabs: MobileTabItem[];
  renderLink?: (props: {
    tab: MobileTabItem;
    children: React.ReactNode;
    className?: string;
  }) => React.ReactNode;
}

/**
 * Mobile application bottom tab bar.
 * Uses accent pill highlight on the active tab and supports custom link components.
 */
export function MobileBottomNav({
  tabs,
  renderLink,
  className,
  ...props
}: MobileBottomNavProps) {
  if (!tabs || tabs.length === 0) return null;

  return (
    <nav
      aria-label="Mobile Navigation"
      className={cn(
        "fixed inset-x-0 bottom-0 z-40 rounded-t-2xl bg-card/95 backdrop-blur-md pb-[env(safe-area-inset-bottom)] shadow-[0_-4px_16px_-8px_rgba(0,0,0,0.1)] transition-colors",
        className,
      )}
      {...props}
    >
      <ul
        className="grid h-16"
        style={{ gridTemplateColumns: `repeat(${tabs.length}, minmax(0, 1fr))` }}
      >
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const active = !!tab.isActive;

          const inner = (
            <>
              <span
                className={cn(
                  "flex h-8 w-14 items-center justify-center rounded-full transition-colors duration-200",
                  active
                    ? "bg-sidebar-accent text-sidebar-accent-foreground shadow-xs"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                <Icon
                  className="size-[22px]"
                  strokeWidth={active ? 2.25 : 1.75}
                  aria-hidden="true"
                />
              </span>
              <span
                className={cn(
                  "text-[10px] font-medium transition-colors duration-200 truncate max-w-full px-1",
                  active ? "text-foreground font-semibold" : "text-muted-foreground",
                )}
              >
                {tab.label}
              </span>
            </>
          );

          return (
            <li key={tab.id} className="min-w-0">
              {renderLink ? (
                renderLink({
                  tab,
                  className:
                    "flex h-full flex-col items-center justify-center gap-1 px-0.5 select-none [-webkit-tap-highlight-color:transparent] cursor-pointer",
                  children: inner,
                })
              ) : (
                <button
                  type="button"
                  onClick={tab.onClick}
                  aria-current={active ? "page" : undefined}
                  className="flex h-full w-full flex-col items-center justify-center gap-1 px-0.5 select-none [-webkit-tap-highlight-color:transparent] cursor-pointer"
                >
                  {inner}
                </button>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

