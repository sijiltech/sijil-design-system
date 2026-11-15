import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/cn.js";

const toggleVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium hover:bg-muted hover:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] outline-none disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 transition-all duration-150 cursor-pointer select-none",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        outline:
          "border border-input bg-transparent shadow-xs hover:bg-accent hover:text-accent-foreground",
      },
      size: {
        default: "h-9 px-3 min-w-9",
        sm: "h-8 px-2 min-w-8 text-xs",
        lg: "h-10 px-4 min-w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

/**
 * Properties for the {@link Toggle} component.
 */
export interface ToggleProps
  extends React.ComponentProps<"button">,
    VariantProps<typeof toggleVariants> {
  /** Controlled pressed state. */
  pressed?: boolean;
  /** Default pressed state for uncontrolled usage. */
  defaultPressed?: boolean;
  /** Callback fired when pressed state changes. */
  onPressedChange?: (pressed: boolean) => void;
}

/**
 * A two-state button that can be either on or off.
 *
 * @param props - Component configuration properties.
 * @returns React element rendering the toggle button.
 */
function Toggle({
  className,
  pressed: controlledPressed,
  defaultPressed = false,
  onPressedChange,
  variant,
  size,
  ...props
}: ToggleProps) {
  const [internalPressed, setInternalPressed] = React.useState<boolean>(defaultPressed);
  const isControlled = controlledPressed !== undefined;
  const isPressed = isControlled ? controlledPressed : internalPressed;

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    props.onClick?.(e);
    if (!isControlled) {
      setInternalPressed(!isPressed);
    }
    onPressedChange?.(!isPressed);
  };

  return (
    <button
      type="button"
      data-slot="toggle"
      aria-pressed={isPressed}
      data-state={isPressed ? "on" : "off"}
      onClick={handleClick}
      className={cn(
        toggleVariants({ variant, size }),
        isPressed && "bg-muted text-foreground font-semibold shadow-2xs",
        className
      )}
      {...props}
    />
  );
}

export { Toggle, toggleVariants };

