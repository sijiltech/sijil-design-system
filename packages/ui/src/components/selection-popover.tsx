"use client";

import type { ReactNode } from "react";
import { Check, X } from "lucide-react";
import { cn } from "../lib/cn.js";
import { Button } from "./button.js";
import { Checkbox } from "./checkbox.js";
import { Input } from "./input.js";
import { Popover, PopoverContent, PopoverTrigger } from "./popover.js";

export interface SelectionPopoverOption {
  id: string;
  label: string;
  description?: ReactNode;
}

export interface SelectionPopoverProps {
  title: string;
  options: SelectionPopoverOption[];
  selectedIds: string[];
  search: string;
  onSearchChange: (search: string) => void;
  searchPlaceholder: string;
  emptyMessage: string;
  clearSearchLabel: string;
  icon?: ReactNode;
  summary?: ReactNode;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelect: (id: string) => void;
  onToggle?: (id: string) => void;
  onClear?: () => void;
  clearLabel?: string;
  minSelected?: number;
  bulkAction?: { label: string; onClick: () => void };
  className?: string;
}

/** Searchable selection popover with optional independent checkbox and bulk actions. */
export function SelectionPopover({
  title, options, selectedIds, search, onSearchChange, searchPlaceholder, emptyMessage,
  clearSearchLabel, icon, summary, open, onOpenChange, onSelect, onToggle, onClear,
  clearLabel, minSelected = 0, bulkAction, className,
}: SelectionPopoverProps) {
  return (
    <div className={cn("inline-flex min-w-0 items-center gap-1.5", className)}>
      <Popover open={open} onOpenChange={onOpenChange}>
        <PopoverTrigger asChild>
          <Button type="button" variant="outline" aria-label={title} className="h-10 min-w-0 max-w-64 bg-card px-3">
            {icon}
            {summary != null && <span className="truncate">{summary}</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent align="start" className="flex w-64 flex-col gap-2 p-2">
          <div className="relative">
            <Input
              aria-label={searchPlaceholder}
              className={cn("h-8 text-sm", search && "pe-8")}
              placeholder={searchPlaceholder}
              value={search}
              onChange={(event) => onSearchChange(event.target.value)}
            />
            {search && (
              <Button type="button" variant="ghost" size="icon-sm" aria-label={clearSearchLabel} className="absolute inset-y-0 end-0" onClick={() => onSearchChange("")}>
                <X aria-hidden="true" />
              </Button>
            )}
          </div>
          {bulkAction && (
            <div className="flex items-center justify-between gap-2 border-b border-separator px-2 text-xs text-muted-foreground">
              <span>{title}</span>
              <Button type="button" variant="ghost" size="sm" onClick={bulkAction.onClick}>
                {bulkAction.label}
              </Button>
            </div>
          )}
          <ul aria-label={title} className="max-h-56 space-y-0.5 overflow-y-auto">
            {options.map(({ id, label, description }) => {
              const selected = selectedIds.includes(id);
              return (
                <li key={id} className="flex items-center gap-2 rounded-lg px-2 hover:bg-muted">
                  {onToggle && (
                    <Checkbox aria-label={label} checked={selected} disabled={selected && selectedIds.length <= minSelected} onCheckedChange={() => onToggle(id)} />
                  )}
                  <Button
                    type="button"
                    variant="ghost"
                    aria-pressed={onToggle ? undefined : selected}
                    onClick={() => onSelect(id)}
                    className="h-auto min-w-0 flex-1 justify-start px-0 py-1.5 text-start shadow-none hover:bg-transparent"
                  >
                    <span className="grid min-w-0">
                      <span className="truncate">{label}</span>
                      {description && <span className="truncate text-xs text-muted-foreground">{description}</span>}
                    </span>
                    {!onToggle && selected && <Check aria-hidden="true" className="ms-auto" />}
                  </Button>
                </li>
              );
            })}
          </ul>
          {options.length === 0 && <p className="px-2 py-3 text-center text-sm text-muted-foreground">{emptyMessage}</p>}
        </PopoverContent>
      </Popover>
      {onClear && selectedIds.length > minSelected && (
        <Button type="button" variant="outline" size="icon" aria-label={clearLabel ?? "Clear selection"} className="size-10 shrink-0 bg-card" onClick={onClear}>
          <X aria-hidden="true" />
        </Button>
      )}
    </div>
  );
}

