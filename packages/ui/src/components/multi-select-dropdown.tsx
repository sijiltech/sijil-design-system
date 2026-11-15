"use client";

import * as React from "react";
import { Command as CommandPrimitive } from "cmdk";
import { X, Check } from "lucide-react";
import { cn } from "../lib/cn.js";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "./command.js";
import { Badge } from "./badge.js";

export interface MultiSelectOption {
  id: string | number;
  label: string;
  color?: string;
  badgeVariant?: "default" | "secondary" | "destructive" | "outline" | "success" | "warning" | "info";
  [key: string]: any;
}

export interface MultiSelectDropdownProps {
  placeholder?: string;
  searchPlaceholder?: string;
  options: MultiSelectOption[];
  value?: MultiSelectOption[];
  defaultValue?: MultiSelectOption[];
  onChange?: (selected: MultiSelectOption[]) => void;
  className?: string;
  maxBadgeDisplay?: number;
}

/**
 * Premium searchable multi-select dropdown with tag chips and keyboard support.
 * Allows selecting multiple items with colored badges and easy keyboard deletion.
 */
export function MultiSelectDropdown({
  placeholder = "Select options...",
  searchPlaceholder = "Search...",
  options = [],
  value: propValue,
  defaultValue = [],
  onChange,
  className,
  maxBadgeDisplay,
}: MultiSelectDropdownProps) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState<MultiSelectOption[]>(defaultValue);
  const [inputValue, setInputValue] = React.useState("");

  const currentSelected = propValue ?? selected;

  const handleSelect = (option: MultiSelectOption) => {
    const next = [...currentSelected, option];
    if (!propValue) setSelected(next);
    onChange?.(next);
    setInputValue("");
  };

  const handleUnselect = (option: MultiSelectOption) => {
    const next = currentSelected.filter((s) => String(s.id) !== String(option.id));
    if (!propValue) setSelected(next);
    onChange?.(next);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const input = inputRef.current;
    if (input) {
      if ((e.key === "Delete" || e.key === "Backspace") && input.value === "") {
        if (currentSelected.length > 0) {
          const next = currentSelected.slice(0, -1);
          if (!propValue) setSelected(next);
          onChange?.(next);
        }
      }
      if (e.key === "Escape") {
        input.blur();
        setOpen(false);
      }
    }
  };

  const selectables = React.useMemo(() => {
    const selectedIds = new Set(currentSelected.map((s) => String(s.id)));
    return options.filter((option) => !selectedIds.has(String(option.id)));
  }, [options, currentSelected]);

  return (
    <Command
      onKeyDown={handleKeyDown}
      className={cn("overflow-visible bg-transparent w-full min-w-[240px]", className)}
    >
      <div
        className="group rounded-lg border border-input bg-card px-3 py-1.5 text-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-1 transition-all"
        onClick={() => inputRef.current?.focus()}
      >
        <div className="flex flex-wrap items-center gap-1.5">
          {currentSelected.map((option) => (
            <Badge
              key={option.id}
              variant={option.badgeVariant ?? "secondary"}
              className="gap-1 px-2 py-0.5 text-xs font-normal"
              style={
                option.color
                  ? { backgroundColor: option.color, color: "#ffffff" }
                  : undefined
              }
            >
              <span>{option.label}</span>
              <button
                type="button"
                className="rounded-full outline-hidden hover:opacity-80 cursor-pointer"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleUnselect(option);
                  }
                }}
                onMouseDown={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
                onClick={() => handleUnselect(option)}
              >
                <X className="size-3" />
                <span className="sr-only">Remove {option.label}</span>
              </button>
            </Badge>
          ))}

          <CommandPrimitive.Input
            ref={inputRef}
            value={inputValue}
            onValueChange={setInputValue}
            onBlur={() => setOpen(false)}
            onFocus={() => setOpen(true)}
            placeholder={currentSelected.length === 0 ? placeholder : undefined}
            className="flex-1 bg-transparent outline-hidden placeholder:text-muted-foreground text-sm min-w-[100px] h-7"
          />
        </div>
      </div>

      <div className="relative mt-1">
        {open && selectables.length > 0 && (
          <div className="absolute top-0 z-50 w-full rounded-md border border-border bg-popover text-popover-foreground shadow-md outline-hidden animate-in fade-in-0 zoom-in-95">
            <CommandList className="max-h-60 overflow-auto p-1">
              <CommandGroup>
                {selectables.map((option) => (
                  <CommandItem
                    key={option.id}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                    onSelect={() => handleSelect(option)}
                    className="cursor-pointer rounded-sm px-2 py-1.5 text-sm flex items-center justify-between"
                  >
                    <span>{option.label}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </div>
        )}
      </div>
    </Command>
  );
}

