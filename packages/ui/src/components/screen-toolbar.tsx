import type { ComponentProps, ReactNode } from "react";
import { cn } from "../lib/cn.js";

export interface ScreenToolbarProps extends ComponentProps<"div"> {
  /** Controls aligned to the inline end, such as export or a view switcher. */
  actions?: ReactNode;
}

/** Wraps the start and end groups as space allows, with no outer margin. */
export function ScreenToolbar({ actions, children, className, ...props }: ScreenToolbarProps) {
  return (
    <div
      data-slot="screen-toolbar"
      className={cn("flex min-w-0 flex-wrap items-center gap-3", className)}
      {...props}
    >
      {children != null && (
        <div data-slot="screen-toolbar-controls" className="flex min-w-0 flex-[1_1_auto] flex-wrap items-center gap-2">
          {children}
        </div>
      )}
      {actions != null && (
        <div data-slot="screen-toolbar-actions" className="ms-auto flex min-w-0 flex-wrap items-center justify-end gap-2">
          {actions}
        </div>
      )}
    </div>
  );
}
