import * as React from "react";
import { cn } from "../lib/cn.js";

/**
 * Properties for the {@link Textarea} component.
 */
export interface TextareaProps extends React.ComponentProps<"textarea"> {}

/**
 * Accessible multiline text input component styled to match Sijil design tokens.
 *
 * @param props - Textarea element props.
 * @returns React element rendering the textarea.
 */
function Textarea({ className, ...props }: TextareaProps) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "flex min-h-[80px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-xs placeholder:text-muted-foreground outline-none transition-[color,box-shadow]",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[4px] focus-visible:shadow-sm",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        "disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      )}
      {...props}
    />
  );
}

export { Textarea };

