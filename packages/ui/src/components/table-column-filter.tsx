"use client";

import * as React from "react";
import { Check, Settings2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./dropdown-menu.js";
import { cn } from "../lib/cn.js";

export interface ColumnFilterItem {
  id: string;
  label: string;
  isVisible: boolean;
  canHide?: boolean;
  toggleVisibility: () => void;
}

export interface TableColumnFilterProps {
  /** Optional custom trigger element. Defaults to an icon-only settings button. */
  trigger?: React.ReactNode;
  /** List of column descriptors or TanStack Table columns. */
  columns: Array<
    | ColumnFilterItem
    | {
        id: string;
        getCanHide?: () => boolean;
        getIsVisible?: () => boolean;
        toggleVisibility?: (value?: boolean) => void;
      }
  >;
  /** Title header inside the dropdown. Defaults to "Toggle columns". */
  title?: string;
  /** Classes applied to the default trigger. Style a custom trigger directly. */
  className?: string;
  /** Preferred side for the menu relative to the trigger. Defaults to "bottom". */
  side?: React.ComponentProps<typeof DropdownMenuContent>["side"];
  /** Menu alignment along the preferred side. Defaults to "start". */
  align?: React.ComponentProps<typeof DropdownMenuContent>["align"];
}

/**
 * Dropdown filter to toggle visibility of table columns.
 * Supports both custom column arrays and TanStack React Table Column objects.
 */
export function TableColumnFilter({
  trigger,
  columns,
  title = "Toggle columns",
  className,
  side = "bottom",
  align = "start",
}: TableColumnFilterProps) {
  const filterableColumns = React.useMemo(() => {
    return columns.filter((col) => {
      if ("canHide" in col) return col.canHide !== false;
      if ("getCanHide" in col && typeof col.getCanHide === "function") {
        return col.getCanHide();
      }
      return true;
    });
  }, [columns]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {trigger ?? (
          <button
            type="button"
            aria-label={title || "Toggle columns"}
            className={cn(
              "inline-flex size-6 shrink-0 cursor-pointer items-center justify-center rounded-xl text-muted-foreground [box-shadow:none]! transition-colors hover:surface-tint hover:text-hover-text focus-visible:ring-2 focus-visible:ring-ring",
              className,
            )}
          >
            <Settings2 className="size-4" aria-hidden="true" />
          </button>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent
        side={side}
        align={align}
        className="w-56 max-h-80 overflow-y-auto p-1.5 shadow-lg"
      >
        {title && (
          <>
            <DropdownMenuLabel className="text-xs font-semibold px-2 py-1.5 text-muted-foreground">
              {title}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
          </>
        )}
        <div className="space-y-0.5">
          {filterableColumns.map((col) => {
            const isVisible =
              "isVisible" in col
                ? col.isVisible
                : typeof col.getIsVisible === "function"
                  ? col.getIsVisible()
                  : true;

            const label =
              "label" in col && col.label
                ? col.label
                : col.id
                    .replace(/_/g, " ")
                    .replace(/([A-Z])/g, " $1")
                    .trim();

            return (
              <DropdownMenuItem
                key={col.id}
                role="menuitemcheckbox"
                aria-checked={isVisible}
                onSelect={(event) => {
                  event.preventDefault();
                  col.toggleVisibility?.();
                }}
                className="cursor-pointer gap-2.5"
              >
                <span
                  aria-hidden="true"
                  className={cn(
                    "flex size-[15px] shrink-0 items-center justify-center rounded-lg transition-colors",
                    isVisible ? "bg-primary" : "bg-input",
                  )}
                >
                  {isVisible && <Check className="size-2.5 text-primary-foreground" strokeWidth={3} />}
                </span>
                <span className="truncate text-foreground">{label}</span>
              </DropdownMenuItem>
            );
          })}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

