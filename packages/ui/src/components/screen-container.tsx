import type { ComponentProps } from "react";
import { cn } from "../lib/cn.js";

/**
 * Vertical page stack with shared padding for feature screens.
 * Inside the mobile shell it switches to the app-wide gutter and rhythm
 * so every tab starts its title at the same offset.
 *
 * @param props - Native section props and optional className override.
 * @returns Screen section element.
 */
export function ScreenContainer({
  className,
  ...props
}: ComponentProps<"section">) {
  return (
    <section
      data-slot="screen-container"
      className={cn(
        "flex flex-col flex-1 gap-4 p-4 shell:gap-4 shell:px-4 shell:pt-3 shell:pb-6",
        className,
      )}
      {...props}
    />
  );
}
