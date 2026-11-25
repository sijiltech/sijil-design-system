"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "../lib/cn.js";
import { groupCardClassName } from "../lib/group-variant.js";
import { useDesignSystem } from "../provider/use-design-system.js";
import { Button } from "./button.js";

export interface RecordNavigatorProps extends React.ComponentProps<"nav"> {
  /** One-based position, or zero when the current record is outside the list. */
  position: number;
  total: number;
  onPositionChange?: (position: number) => void;
  onPrevious?: () => void;
  onNext?: () => void;
  previousDisabled?: boolean;
  nextDisabled?: boolean;
  clampPosition?: boolean;
  previousName?: string;
  nextName?: string;
  locale?: string;
  labels?: { previous?: string; next?: string; jump?: string };
}

function normalizePosition(value: string): string {
  return value
    .replace(/[٠-٩]/g, (digit) => String(digit.charCodeAt(0) - "٠".charCodeAt(0)))
    .replace(/[۰-۹]/g, (digit) => String(digit.charCodeAt(0) - "۰".charCodeAt(0)));
}

/** Moves between adjacent records or jumps to a typed position. */
export function RecordNavigator({
  position, total, onPositionChange, onPrevious, onNext, previousDisabled, nextDisabled, clampPosition = false,
  previousName, nextName, locale, labels, className, ...props
}: RecordNavigatorProps) {
  const { locale: defaultLocale } = useDesignSystem();
  const format = new Intl.NumberFormat(locale ?? defaultLocale, { useGrouping: false });
  const [draft, setDraft] = React.useState<string>();
  const commit = (value: string, relatedTarget: EventTarget | null) => {
    setDraft(undefined);
    if (relatedTarget instanceof HTMLElement && relatedTarget.hasAttribute("data-record-step")) return;
    if (!/^-?\d+$/.test(value) || total < 1) return;
    const entered = Number(value);
    if (!Number.isSafeInteger(entered)) return;
    const next = clampPosition ? Math.max(1, Math.min(total, entered)) : entered;
    if (next >= 1 && next <= total && next !== position) onPositionChange?.(next);
  };

  return (
    <nav
      aria-label="Record navigation"
      data-slot="record-navigator"
      className={cn("inline-flex max-w-full items-center gap-1", groupCardClassName, className)}
      {...props}
    >
      <Button
        type="button"
        data-record-step=""
        variant="ghost"
        size="sm"
        aria-label={previousName ? `${labels?.previous ?? "Previous"}: ${previousName}` : labels?.previous ?? "Previous"}
        disabled={previousDisabled ?? (total < 1 || position <= 1)}
        onClick={onPrevious ?? (() => onPositionChange?.(position - 1))}
      >
        <ChevronLeft aria-hidden="true" className="rtl:rotate-180" />
        {previousName && <span className="hidden max-w-24 truncate sm:inline">{previousName}</span>}
      </Button>
      <div className="flex shrink-0 items-center gap-1 rounded-lg bg-background px-2 text-sm font-semibold tabular-nums">
        <input
          type="text"
          inputMode="numeric"
          dir="ltr"
          disabled={total < 1 || !onPositionChange}
          value={draft ?? (total > 0 ? format.format(Math.max(1, position)) : "")}
          aria-label={labels?.jump ?? "Jump to record number"}
          className="min-w-8 rounded-md bg-transparent py-1 text-center focus-visible:outline-2 focus-visible:outline-ring"
          size={Math.max(2, String(total).length)}
          onChange={(event) => setDraft(event.target.value)}
          onBlur={(event) => commit(normalizePosition(event.currentTarget.value.trim()), event.relatedTarget)}
          onKeyDown={(event) => {
            if (event.key === "Escape") setDraft(undefined);
            if (event.key === "Enter") {
              event.preventDefault();
              event.currentTarget.blur();
            }
          }}
        />
        <span aria-hidden="true" className="text-muted-foreground">/</span>
        <span className="text-muted-foreground">{total > 0 ? format.format(total) : "—"}</span>
      </div>
      <Button
        type="button"
        data-record-step=""
        variant="ghost"
        size="sm"
        aria-label={nextName ? `${labels?.next ?? "Next"}: ${nextName}` : labels?.next ?? "Next"}
        disabled={nextDisabled ?? (position >= total)}
        onClick={onNext ?? (() => onPositionChange?.(position + 1))}
      >
        {nextName && <span className="hidden max-w-24 truncate sm:inline">{nextName}</span>}
        <ChevronRight aria-hidden="true" className="rtl:rotate-180" />
      </Button>
    </nav>
  );
}
