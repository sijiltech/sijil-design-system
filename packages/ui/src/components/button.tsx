import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "../lib/cn.js"

const buttonVariants = cva(
  "inline-flex items-center cursor-pointer justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-150 ease-out active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default:
          // "bg-primary text-primary-foreground shadow-md shadow-primary-glow/40 hover:bg-primary/90! hover:shadow-lg hover:shadow-primary-glow hover:translate-y-[-2px] hover:scale-[1.02] active:scale-[0.98] active:translate-y-0 transition-all duration-300 ease-out btn-shimmer",
          "inline-flex items-center h-full gap-1.5 rounded-md bg-card shadow-sm rounded-xl overflow-hidden px-3 text-sm font-medium text-foreground transition-colors hover:bg-card/10 cursor-pointer active:scale-[0.99] active:translate-y-0 transition-all duration-300 ease-out",
        destructive:
          "bg-destructive text-white shadow-sm hover:bg-destructive-hover! hover:shadow-md transition-all duration-300 ease-out btn-shimmer",
        outline:
          "bg-background shadow-[0px_0px_2px_0.05px]  hover:bg-gradient-to-br hover:from-muted-100 hover:to-muted-200 transition-all duration-300",
        secondary:
          "bg-secondary shadow-sm text-secondary-foreground hover:bg-secondary-hover! hover:shadow-md hover:translate-y-[-1px] hover:scale-[1.01] active:scale-[0.98] active:translate-y-0 transition-all duration-300 ease-out",
        ghost:
          "hover:bg-muted hover:text-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        xs: "h-7 px-2 has-[>svg]:px-1.5",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
        "icon-sm": "size-8",
        "icon-lg": "size-10",
      },
      btnType: {
        success: "",
        warning: "",
        default: "",
        submit: ""
      },
      noShimmer: {
        true: "",
        false: "",
      },
    },
    compoundVariants: [
      // Shimmer effect applies by default unless noShimmer is true
      {
        variant: "default",
        noShimmer: false,
        class: "btn-shimmer",
      },
      // Success types
      {
        variant: "default",
        btnType: "success",
        class: "bg-success text-white hover:bg-success/90! shadow-md shadow-success/20 hover:shadow-lg hover:shadow-success/40",
      },
      {
        variant: "outline",
        btnType: "success",
        class: "text-success hover:bg-success-light border-success hover:text-success-text dark:hover:text-success-text",
      },
      {
        variant: "secondary",
        btnType: "success",
        class: "bg-success-light text-success-text hover:bg-success-light/80 border border-success-border/20",
      },
      {
        variant: "ghost",
        btnType: "success",
        class: "text-success hover:bg-success-light hover:text-success-text dark:hover:text-success-text",
      },
      {
        variant: "link",
        btnType: "success",
        class: "text-success hover:text-success/80",
      },
      // Warning types
      {
        variant: "default",
        btnType: "warning",
        class: "bg-warning text-white hover:bg-warning/90! shadow-md shadow-warning/20 hover:shadow-lg hover:shadow-warning/40",
      },
      {
        variant: "outline",
        btnType: "warning",
        class: "text-warning border-warning hover:bg-warning-light hover:text-warning-text dark:hover:text-warning-text",
      },
      {
        variant: "secondary",
        btnType: "warning",
        class: "bg-warning-light text-warning-text hover:bg-primary border border-warning-border/20",
      },
      {
        variant: "ghost",
        btnType: "warning",
        class: "text-warning hover:bg-warning-light hover:text-warning-text dark:hover:text-warning-text",
      },
      {
        variant: "link",
        btnType: "warning",
        class: "text-warning hover:text-warning/80",
      },
      // default types
      {
        variant: "default",
        btnType: "default",
        class: "bg-warning text-white hover:bg-warning/90! shadow-md shadow-warning/20 hover:shadow-lg hover:shadow-warning/40",
      },
      {
        variant: "outline",
        btnType: "warning",
        class: "text-warning border-warning hover:bg-warning-light hover:text-warning-text dark:hover:text-warning-text",
      },
      {
        variant: "secondary",
        btnType: "warning",
        class: "bg-warning-light text-warning-text hover:bg-primary border border-warning-border/20",
      },
      {
        variant: "ghost",
        btnType: "warning",
        class: "text-warning hover:bg-warning-light hover:text-warning-text dark:hover:text-warning-text",
      },
      {
        variant: "link",
        btnType: "warning",
        class: "text-warning hover:text-warning/80",
      },
      //submit 
      {
        variant: "default",
        btnType: "submit",
        class: "bg-foreground text-background hover:bg-foreground/90! shadow-md shadow-primary-glow/20 hover:shadow-lg hover:shadow-primary-glow/40",
      },
      {
        variant: "outline",
        btnType: "submit",
        class: "text-primary border-primary hover:bg-primary-light hover:text-primary-text dark:hover:text-primary-text",
      },
      {
        variant: "secondary",
        btnType: "submit",
        class: "bg-primary-light text-primary-text hover:bg-primary border border-primary-border/20",
      },
      {
        variant: "ghost",
        btnType: "submit",
        class: "text-primary hover:bg-primary-light hover:text-primary-text dark:hover:text-primary-text",
      },
      {
        variant: "link",
        btnType: "submit",
        class: "text-primary hover:text-primary/80",
      },
    ],
    defaultVariants: {
      variant: "default",
      size: "default",
      noShimmer: false,
    },
  }
)

/**
 * A highly customizable and premium Button component.
 * Supports different visual variants, sizes, and polymorphic rendering via Radix Slot.
 * Includes smooth micro-animations and custom hover states (e.g. shimmer glow).
 *
 * @param props - The properties for the Button component.
 * @param props.className - Additional CSS classes to merge.
 * @param props.variant - The visual variant style of the button (default, destructive, outline, etc.).
 * @param props.size - The size of the button (default, xs, sm, lg, icon, icon-sm, icon-lg).
 * @param props.type - The functional/semantic type of the button (success, warning, submit, reset, button).
 * @param props.asChild - If true, renders the child component directly instead of a button element.
 * @param props.noShimmer - If true, disables the premium shimmer effect on the default variant.
 * @returns A React button or polymorphic slot component.
 */
function Button({
  className,
  variant,
  size,
  type,
  asChild = false,
  noShimmer,
  ...props
}: Omit<React.ComponentProps<"button">, "type"> &
  Omit<VariantProps<typeof buttonVariants>, "btnType"> & {
    asChild?: boolean
    type?: "success" | "warning" | "submit" | "reset" | "button" | "",
    noShimmer?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  const isStyleType = type === "success" || type === "warning" || type === "submit"
  const btnType = isStyleType ? type : undefined
  const htmlType = isStyleType ? "button" : (type as React.ComponentProps<"button">["type"])

  return (
    <Comp
      data-slot="button"
      type={htmlType}
      className={cn(buttonVariants({ variant, size, btnType, className, noShimmer: !!noShimmer }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
