"use client";

import * as React from "react";
import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";
import { cn } from "../lib/cn.js";
import { TableHead } from "./table.js";

export type SimpleSortDirection = "asc" | "desc" | null;

/**
 * Properties for generic or TanStack Column sortable header.
 */
export interface SortableTableHeadProps
  extends Omit<React.ComponentPropsWithoutRef<"th">, "key" | "title" | "align"> {
  title?: React.ReactNode;
  children?: React.ReactNode;
  /** TanStack Table Column instance, if using @tanstack/react-table. */
  column?: {
    getIsSorted: () => false | "asc" | "desc";
    toggleSorting: (desc?: boolean) => void;
    clearSorting?: () => void;
  };
  /** Simple sorting key matching (when not using TanStack). */
  currentSortKey?: string | null;
  sortUpKey?: string | null;
  sortDownKey?: string | null;
  onSort?: (nextKey: any) => void;
  /** Alignment of content inside the header cell. Defaults to 'center'. */
  align?: "start" | "center" | "end";
}

/**
 * Sortable table header cell with interactive sort indicators (ArrowUp / ArrowDown).
 * Supports both standalone sort key handlers and TanStack React Table columns.
 */
export function SortableTableHead({
  className,
  title,
  children,
  column,
  currentSortKey,
  sortUpKey,
  sortDownKey,
  onSort,
  align = "center",
  ...props
}: SortableTableHeadProps) {
  const isTanStack = Boolean(column);
  const tanStackSorted = column ? column.getIsSorted() : false;

  const isUp = isTanStack
    ? tanStackSorted === "asc"
    : Boolean(sortUpKey && currentSortKey === sortUpKey);
  const isDown = isTanStack
    ? tanStackSorted === "desc"
    : Boolean(sortDownKey && currentSortKey === sortDownKey);
  const isSorted = isUp || isDown;

  const handleClick = (e: React.MouseEvent) => {
    if (isTanStack && column) {
      if (tanStackSorted === "desc") {
        if (column.clearSorting) {
          column.clearSorting();
        } else {
          column.toggleSorting(false);
        }
      } else {
        column.toggleSorting(tanStackSorted === "asc");
      }
    } else if (onSort) {
      if (currentSortKey === sortUpKey && sortDownKey) {
        onSort(sortDownKey);
      } else if (sortUpKey) {
        onSort(sortUpKey);
      }
    }
  };

  const alignClass =
    align === "start"
      ? "justify-start text-start"
      : align === "end"
        ? "justify-end text-end"
        : "justify-center text-center";

  return (
    <TableHead
      className={cn(
        "cursor-pointer select-none transition-colors hover:bg-muted/50",
        align === "center" && "text-center",
        align === "end" && "text-end",
        align === "start" && "text-start",
        className,
      )}
      onClick={handleClick}
      {...props}
    >
      <div className={cn("inline-flex items-center gap-1.5", alignClass)}>
        <span>{title ?? children}</span>
        <span className="inline-flex items-center text-muted-foreground shrink-0">
          {isUp ? (
            <ArrowUp className="size-3.5 text-foreground transition-transform" />
          ) : isDown ? (
            <ArrowDown className="size-3.5 text-foreground transition-transform" />
          ) : (
            <ArrowUpDown className="size-3 opacity-30 hover:opacity-100 transition-opacity" />
          )}
        </span>
      </div>
    </TableHead>
  );
}

/**
 * Lightweight sortable header for flex-tables or custom div-based tables.
 */
export function SortableFlexTableHead({
  column,
  children,
  className,
  onClick,
  showUnsortedIndicator = true,
}: {
  column?: {
    getIsSorted: () => false | "asc" | "desc";
    toggleSorting: (desc?: boolean) => void;
    clearSorting?: () => void;
  };
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  /** Show a neutral indicator before the column is sorted. */
  showUnsortedIndicator?: boolean;
}) {
  const isSorted = column ? column.getIsSorted() : false;
  const iconClassName = showUnsortedIndicator ? "size-3.5 ms-1" : "size-4 ms-2";

  const handleClick = () => {
    if (onClick) {
      onClick();
      return;
    }
    if (column) {
      if (isSorted === "desc") {
        column.clearSorting ? column.clearSorting() : column.toggleSorting(false);
      } else {
        column.toggleSorting(isSorted === "asc");
      }
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      className={cn(
        "flex items-center justify-center gap-1.5 cursor-pointer select-none text-sm font-medium transition-colors hover:text-foreground",
        !showUnsortedIndicator && "gap-2 font-normal",
        className,
      )}
      onClick={handleClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleClick();
        }
      }}
    >
      {children}
      {isSorted === "asc" && <ArrowUp aria-hidden="true" className={cn(iconClassName, "text-foreground")} />}
      {isSorted === "desc" && <ArrowDown aria-hidden="true" className={cn(iconClassName, "text-foreground")} />}
      {showUnsortedIndicator && !isSorted && <ArrowUpDown aria-hidden="true" className="size-3 ms-1 opacity-30" />}
    </div>
  );
}
