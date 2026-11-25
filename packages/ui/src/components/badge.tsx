import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "../lib/cn.js"

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-lg px-2 py-0.5 text-sm font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 transition-all duration-200 overflow-hidden shadow-xs",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground [a&]:hover:bg-primary/90",
        secondary:
          "bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90",
        destructive:
          "bg-destructive text-white [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "bg-foreground/5 text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground",
        success:
          "bg-success text-white [a&]:hover:bg-success/90",
        warning:
          "bg-warning text-white [a&]:hover:bg-warning/90",
        info:
          "bg-info text-white [a&]:hover:bg-info/90",
        subtle:
          "bg-foreground/10 text-foreground",
        "success-subtle":
          "bg-success-light text-success-text",
        "warning-subtle":
          "bg-warning-light text-warning-text",
        "destructive-subtle":
          "bg-danger-light text-danger-text",
        "info-subtle":
          "bg-info-light text-info",
      },
      bordered: {
        true: "border border-current",
      },
    },
    compoundVariants: [
      {
        variant: "success-subtle",
        bordered: true,
        class: "border-emerald-500/30 bg-emerald-500/10 text-emerald-600",
      },
      {
        variant: "warning-subtle",
        bordered: true,
        class: "border-amber-500/30 bg-amber-500/10 text-amber-600",
      },
      { variant: "destructive-subtle", bordered: true, class: "border-danger-border" },
    ],
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({
  className,
  variant,
  bordered,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "span"

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant, bordered }), className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
