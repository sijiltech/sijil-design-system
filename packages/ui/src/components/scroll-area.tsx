import * as React from "react";
import { cn } from "../lib/cn.js";

/**
 * Properties for the {@link ScrollArea} component.
 */
export interface ScrollAreaProps extends React.ComponentProps<"div"> {
  /** Optional max height style or class. */
  maxHeight?: string | number;
}

/**
 * Customized scrollable container with slim, styled scrollbars matching the Sijil theme.
 *
 * @param props - Component configuration properties.
 * @returns React element rendering the scroll area.
 */
function ScrollArea({
  className,
  children,
  maxHeight,
  style,
  ...props
}: ScrollAreaProps) {
  return (
    <div
      data-slot="scroll-area"
      className={cn(
        "relative overflow-auto rounded-2xl scrollbar-thin scrollbar-thumb-muted-foreground/20 hover:scrollbar-thumb-muted-foreground/40",
        className
      )}
      style={{
        maxHeight,
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  );
}

export { ScrollArea };

