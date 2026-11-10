"use client";

import * as React from "react";
import { cn } from "../lib/cn.js";
import { useScrollActiveIntoView } from "../hooks/use-scroll-active-into-view.js";

/**
 * Interface representing an individual tab item.
 */
export interface MultiTabItem<T extends string | number = string | number> {
  /** Uniquely identifies the tab item */
  value: T;
  /** React node rendering as the label of the tab */
  label: React.ReactNode;
  /** Optional icon rendered before the label */
  icon?: React.ReactNode;
  /** Optional flag to disable the tab button */
  disabled?: boolean;
}

/**
 * Interface representing properties of the MultiTabs component.
 */
export interface MultiTabsProps<T extends string | number = string | number> {
  /** The list of tab items to render */
  list: MultiTabItem<T>[];
  /** The value of the currently selected active tab */
  selectedTab: T;
  /** Callback action handler triggered when a tab is selected */
  action: (value: T) => void;
  /** Optional additional class names for styling the container */
  className?: string;
}

/**
 * MultiTabs provides a styled segmented switcher or multitab navigator.
 * Accepts exactly `list`, `selectedTab`, and `action` props.
 *
 * @param props Properties configuring the MultiTabs component
 * @returns The rendered React element
 */
export function MultiTabs<T extends string | number = string | number>({
  list,
  selectedTab,
  action,
  className,
}: MultiTabsProps<T>) {
  const stripRef = React.useRef<HTMLDivElement>(null);
  useScrollActiveIntoView(stripRef, "[data-active=true]", selectedTab);

  return (
    <div ref={stripRef} className={cn("inline-flex max-w-full overflow-x-auto items-center justify-start rounded-xl bg-card p-1 shadow-xs text-sm gap-0.5 shrink-0", className)}>
      {list.map((item) => {
        const isActive = selectedTab === item.value;
        return (
          <button
            key={item.value}
            type="button"
            disabled={item.disabled}
            data-active={isActive}
            onClick={() => action(item.value)}
            className={cn(
              "cursor-pointer py-1.5 font-medium transition-all flex shrink-0 items-center justify-center disabled:opacity-50 disabled:pointer-events-none select-none rounded-lg px-3 sm:px-4 text-xs sm:text-sm gap-1.5 h-full whitespace-nowrap shell:grow shell:px-2.5 shell:text-[13px]",
              isActive
                ? "bg-muted text-foreground shadow-xs font-semibold"
                : "text-muted-foreground hover:bg-hover-bg hover:text-hover-text"
            )}
          >
            {item.icon && <span className="shrink-0 flex items-center">{item.icon}</span>}
            <span>{item.label}</span>
          </button>
        );
      })}
    </div>
  );
}
