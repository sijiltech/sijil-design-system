import type { ComponentProps } from "react";
import { cn } from "../lib/cn.js";

export interface ScreenFrameProps extends ComponentProps<"div"> {
  width?: "contained" | "full";
}

/** Centers the screen in its shell. ScreenContainer supplies the page padding. */
export function ScreenFrame({ width = "contained", className, ...props }: ScreenFrameProps) {
  return (
    <div
      data-slot="screen-frame"
      className={cn("w-full", width === "contained" && "mx-auto max-w-[1450px]", className)}
      {...props}
    />
  );
}
