import * as React from "react";
import { cn } from "../lib/cn.js";

export interface EmptyStateProps extends React.ComponentProps<"div"> {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
}

export function EmptyState({
  title,
  description,
  icon,
  action,
  className,
  ...props
}: EmptyStateProps) {
  return (
    <div
      data-slot="empty-state"
      className={cn(
        "flex flex-col items-center justify-center text-center p-8 rounded-xl border border-dashed border-input/80 bg-card/45 backdrop-blur-xs min-h-[200px] transition-all duration-300 hover:border-input/100 hover:bg-card/70 animate-[card-enter_0.5s_ease-out]",
        className
      )}
      {...props}
    >
      {icon && (
        <div className="flex items-center justify-center size-12 rounded-full bg-muted/60 text-muted-foreground mb-4 ring-8 ring-muted/20">
          {icon}
        </div>
      )}
      <h3 className="font-semibold text-base text-foreground leading-none tracking-tight mb-2">
        {title}
      </h3>
      {description && (
        <p className="text-sm text-muted-foreground max-w-sm mb-1 leading-relaxed">
          {description}
        </p>
      )}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}
