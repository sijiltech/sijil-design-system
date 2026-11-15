"use client";

import * as React from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "./card.js";
import { Button } from "./button.js";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./collapsible.js";
import { cn } from "../lib/cn.js";

export interface CollapsibleCardProps {
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

  const handleOpenChange = (nextOpen: boolean) => {
    if (propOpen === undefined) {
      setUncontrolledOpen(nextOpen);
    }
    onOpenChange?.(nextOpen);
  };

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={handleOpenChange}
      className={cn("w-full", className)}
    >
      <Card className="overflow-hidden transition-all duration-200">
        <div
          className={cn(
            "flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 sm:p-5 select-none",
            headerClassName,
          )}
        >
          <div className="flex items-center gap-2.5 min-w-0">
            <CollapsibleTrigger asChild>
              <Button
                variant="ghost"
                size="icon-sm"
                className="size-7 shrink-0 cursor-pointer text-muted-foreground hover:text-foreground"
                aria-label={isOpen ? "Collapse" : "Expand"}
              >
                <ChevronDown
                  className={cn(
                    "size-4 transition-transform duration-200",
                    isOpen ? "rotate-0" : "-rotate-90 rtl:rotate-90",
                  )}
                />
              </Button>
            </CollapsibleTrigger>
            <div className="space-y-0.5 truncate">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-sm sm:text-base text-foreground truncate">
                  {title}
                </span>
                {badge}
              </div>
              {description && (
                <p className="text-xs text-muted-foreground truncate">{description}</p>
              )}
            </div>
          </div>

          {actions && <div className="flex items-center gap-2 shrink-0">{actions}</div>}
        </div>

        <CollapsibleContent className="transition-all duration-200 data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
          <CardContent className={cn("pt-0 px-4 sm:px-5 pb-5", contentClassName)}>
            {children}
          </CardContent>
        </CollapsibleContent>
      </Card>
    </Collapsible>
  );
}

