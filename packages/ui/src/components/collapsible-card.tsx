"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";
import { Card, CardContent } from "./card.js";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./collapsible.js";
import { cn } from "../lib/cn.js";
import type { GroupVariant } from "../lib/group-variant.js";

/** `card` tints the trigger. `flat` keeps that trigger on the card surface. `plain` drops the card. */
export type CollapsibleCardVariant = GroupVariant | "flat";

export interface CollapsibleCardProps {
  /** Surface around the header and content. Defaults to card. */
  variant?: CollapsibleCardVariant;
  title: React.ReactNode;
  description?: React.ReactNode;
  badge?: React.ReactNode;
  actions?: React.ReactNode;
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
  className?: string;
  headerClassName?: string;
  contentClassName?: string;
}

/**
 * Expandable/collapsible card container.
 * Features an interactive header with title, badges, actions, and smooth chevron rotation.
 */
export function CollapsibleCard({
  variant = "card",
  title,
  description,
  badge,
  actions,
  defaultOpen = true,
  open: propOpen,
  onOpenChange,
  children,
  className,
  headerClassName,
  contentClassName,
}: CollapsibleCardProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen);
  const isOpen = propOpen ?? uncontrolledOpen;
  const hasCard = variant !== "plain";
  const tintTrigger = variant === "card";
  const titleId = React.useId();
  const descriptionId = React.useId();

  const handleOpenChange = (nextOpen: boolean) => {
    if (propOpen === undefined) {
      setUncontrolledOpen(nextOpen);
    }
    onOpenChange?.(nextOpen);
  };

  return (
    <Collapsible
      data-variant={variant}
      open={isOpen}
      onOpenChange={handleOpenChange}
      className={cn("w-full", className)}
    >
      <Card
        data-slot={hasCard ? "card" : "collapsible-card-surface"}
        className={cn(
          "gap-3 overflow-hidden",
          hasCard ? "p-1" : "rounded-none bg-transparent p-0 text-foreground shadow-none",
        )}
      >
        <div
          data-slot="collapsible-card-header"
          className={cn(
            "relative isolate flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-xl px-3 py-2.5 select-none",
            tintTrigger && "bg-foreground/5",
            headerClassName,
          )}
        >
          <CollapsibleTrigger
            type="button"
            aria-labelledby={titleId}
            aria-describedby={description ? descriptionId : undefined}
            className="flex min-w-0 flex-1 cursor-pointer items-center gap-2.5 text-start after:absolute after:inset-0 after:rounded-xl hover:after:surface-tint focus-visible:outline-none focus-visible:after:ring-2 focus-visible:after:ring-inset focus-visible:after:ring-ring"
          >
            <span
              className={cn(
                "flex size-7 shrink-0 items-center justify-center rounded-xl text-muted-foreground",
                variant === "flat" ? "bg-foreground/5" : "bg-card",
              )}
            >
              <ChevronDown
                aria-hidden="true"
                className={cn(
                  "size-4 transition-transform duration-200",
                  isOpen ? "rotate-0" : "-rotate-90 rtl:rotate-90",
                )}
              />
            </span>
            <span className="min-w-0 space-y-0.5">
              <span className="flex items-center gap-2">
                <span id={titleId} className="truncate text-sm font-semibold text-foreground sm:text-base">
                  {title}
                </span>
                {badge}
              </span>
              {description && (
                <span id={descriptionId} className="block truncate text-xs text-muted-foreground">
                  {description}
                </span>
              )}
            </span>
          </CollapsibleTrigger>

          {actions && (
            <div className="pointer-events-none relative z-10 flex shrink-0 items-center gap-2 [&>*]:pointer-events-auto">
              {actions}
            </div>
          )}
        </div>

        <CollapsibleContent className="transition-all duration-200 data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
          <CardContent className={cn("px-3 pb-3 pt-1", contentClassName)}>
            {children}
          </CardContent>
        </CollapsibleContent>
      </Card>
    </Collapsible>
  );
}

