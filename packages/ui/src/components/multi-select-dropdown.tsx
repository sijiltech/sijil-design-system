"use client";

import * as React from "react";
import { Command as CommandPrimitive } from "cmdk";
import { Plus, X } from "lucide-react";
import { cn } from "../lib/cn.js";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "./command.js";
import { Badge } from "./badge.js";
import { Popover, PopoverAnchor, PopoverContent } from "./popover.js";
import { useDesignSystem } from "../provider/use-design-system.js";

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
  /** Inline editing shows an add control and opens choices above overflow containers. */
  variant?: "field" | "inline";
  labels?: { add?: string; remove?: (label: string) => string; empty?: string };
}

/** Searchable multi-select with removable chips and keyboard navigation. */
export function MultiSelectDropdown({
  placeholder = "Select options...",
  searchPlaceholder = "Search...",
  options = [],
  value: propValue,
  defaultValue = [],
  onChange,
  className,
  variant = "field",
  labels,
}: MultiSelectDropdownProps) {
  const { labels: systemLabels } = useDesignSystem();
  const inputRef = React.useRef<HTMLInputElement>(null);
  const fieldRef = React.useRef<HTMLDivElement>(null);
  const addRef = React.useRef<HTMLButtonElement>(null);
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState<MultiSelectOption[]>(defaultValue);
  const [inputValue, setInputValue] = React.useState("");

  const inline = variant === "inline";
  const currentSelected = propValue ?? selected;
  const selectedIds = new Set(currentSelected.map((option) => String(option.id)));
  const selectables = options.filter((option) => !selectedIds.has(String(option.id)));
  const addLabel = labels?.add ?? "Add option";

  const commit = (next: MultiSelectOption[]) => {
    if (propValue === undefined) setSelected(next);
    onChange?.(next);
  };

  const handleSelect = (option: MultiSelectOption) => {
    if (selectedIds.has(String(option.id))) return;
    commit([...currentSelected, option]);
    setInputValue("");
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const input = inputRef.current;
    if (event.target !== input) return;

    if ((event.key === "Delete" || event.key === "Backspace") && input.value === "" && currentSelected.length > 0) {
      event.preventDefault();
      commit(currentSelected.slice(0, -1));
    }

    if (event.key === "Escape") {
      input.blur();
      setOpen(false);
    }
  };

  const field = (
    <div
      ref={fieldRef}
      data-slot="multi-select-field"
      className={cn(
        "group rounded-xl text-sm has-focus-visible:ring-2 has-focus-visible:ring-ring",
        inline ? "min-h-7" : "bg-card px-3 py-1.5 transition-colors hover:surface-tint",
      )}
      onClick={() => inputRef.current?.focus()}
    >
      <div className="flex min-w-0 flex-wrap items-center gap-1.5">
        {currentSelected.map((option) => (
          <Badge
            key={option.id}
            variant={option.badgeVariant ?? "secondary"}
            className="gap-1 px-2 py-0.5 text-xs font-normal"
            style={option.color ? { backgroundColor: option.color, color: "#ffffff" } : undefined}
          >
            <span>{option.label}</span>
            <button
              type="button"
              aria-label={labels?.remove?.(option.label) ?? `Remove ${option.label}`}
              className="rounded-full cursor-pointer hover:surface-tint focus-visible:ring-2 focus-visible:ring-current"
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") event.stopPropagation();
              }}
              onMouseDown={(event) => event.preventDefault()}
              onClick={(event) => {
                event.stopPropagation();
                commit(currentSelected.filter((selectedOption) => String(selectedOption.id) !== String(option.id)));
              }}
            >
              <X className="size-3" aria-hidden="true" />
            </button>
          </Badge>
        ))}
        {inline && !open && selectables.length > 0 && (
          <button
            ref={addRef}
            type="button"
            aria-label={addLabel}
            title={addLabel}
            className="inline-flex size-6 shrink-0 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
            onClick={(event) => {
              event.stopPropagation();
              inputRef.current?.focus();
            }}
          >
            <Plus className="size-4" aria-hidden="true" />
          </button>
        )}
        <CommandPrimitive.Input
          ref={inputRef}
          aria-expanded={open && (inline || selectables.length > 0)}
          tabIndex={inline && !open ? -1 : undefined}
          value={inputValue}
          onValueChange={setInputValue}
          onBlur={inline ? undefined : () => setOpen(false)}
          onFocus={() => setOpen(true)}
          placeholder={inline ? searchPlaceholder : currentSelected.length === 0 ? placeholder : undefined}
          className={cn(
            "h-7 min-w-24 flex-1 bg-transparent text-sm outline-hidden placeholder:text-muted-foreground",
            inline && !open && "sr-only",
          )}
        />
      </div>
    </div>
  );

  const choices = (
    <CommandList className="max-h-60 overflow-auto p-1">
      {inline && <CommandEmpty>{labels?.empty ?? systemLabels.noResults}</CommandEmpty>}
      <CommandGroup>
        {selectables.map((option) => (
          <CommandItem
            key={option.id}
            value={String(option.id)}
            keywords={[option.label]}
            onMouseDown={(event) => event.preventDefault()}
            onSelect={() => handleSelect(option)}
            className="cursor-pointer rounded-lg px-2 py-1.5 text-sm data-[selected=true]:bg-transparent data-[selected=true]:surface-tint data-[selected=true]:text-hover-text"
          >
            {option.label}
          </CommandItem>
        ))}
      </CommandGroup>
    </CommandList>
  );

  return (
    <Command
      label={searchPlaceholder}
      onKeyDown={handleKeyDown}
      data-slot="multi-select-dropdown"
      data-variant={variant}
      className={cn("relative h-auto w-full overflow-visible bg-transparent", !inline && "min-w-[240px]", className)}
    >
      {inline ? (
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverAnchor asChild>{field}</PopoverAnchor>
          <PopoverContent
            aria-label={addLabel}
            align="start"
            className="w-(--radix-popover-trigger-width) min-w-40 p-0"
            onOpenAutoFocus={(event) => event.preventDefault()}
            onCloseAutoFocus={(event) => {
              event.preventDefault();
              if (document.activeElement === document.body) addRef.current?.focus();
            }}
            onInteractOutside={(event) => {
              if (event.target instanceof Node && fieldRef.current?.contains(event.target)) event.preventDefault();
            }}
          >
            {choices}
          </PopoverContent>
        </Popover>
      ) : (
        <>
          {field}
          {open && selectables.length > 0 && (
            <div data-slot="multi-select-options" className="absolute inset-x-0 top-full z-50 mt-1 w-full rounded-xl bg-popover text-popover-foreground shadow-md outline-hidden animate-in fade-in-0 zoom-in-95">
              {choices}
            </div>
          )}
        </>
      )}
    </Command>
  );
}

