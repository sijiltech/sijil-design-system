"use client";

import * as React from "react";
import { Columns3, Check } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./dropdown-menu.js";
import { Button } from "./button.js";
import { cn } from "../lib/cn.js";

export interface ColumnFilterItem {
  id: string;
  label: string;
  isVisible: boolean;
  canHide?: boolean;
  toggleVisibility: () => void;
}

export interface TableColumnFilterProps {
  /** Optional custom trigger button element. Defaults to a standard Columns button. */
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
  className?: string;
  align?: "start" | "center" | "end";
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
  align = "end",
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
          <Button
            variant="outline"
            size="sm"
            className={cn("h-8 gap-1.5 px-3 text-xs", className)}
          >
            <Columns3 className="size-3.5" />
            <span>{title}</span>
          </Button>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent
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

            const handleToggle = (e: React.MouseEvent) => {
              e.preventDefault();
              if ("toggleVisibility" in col && typeof col.toggleVisibility === "function") {
                col.toggleVisibility();
              }
            };

            return (
              <DropdownMenuItem
                key={col.id}
                onClick={handleToggle}
                className="flex items-center justify-between cursor-pointer px-2 py-1.5 text-sm rounded-md"
              >
                <span className="capitalize truncate">{label}</span>
                <span
                  className={cn(
                    "flex size-4 items-center justify-center rounded border border-input transition-colors",
                    isVisible ? "bg-primary border-primary text-primary-foreground" : "opacity-40",
                  )}
                >
                  {isVisible && <Check className="size-3 stroke-[3]" />}
                </span>
              </DropdownMenuItem>
            );
          })}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

