import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "../lib/cn.js"
import { controlSurfaceClassName } from "../lib/group-variant.js"

const buttonStyles = cva(
  "inline-flex items-center cursor-pointer justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-medium transition-all duration-150 ease-out active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40",
  {
    variants: {
      variant: {
        default: "bg-card text-card-foreground hover:surface-tint hover:text-hover-text",
        primary: "bg-primary text-primary-foreground hover:bg-primary-hover",
        header: "bg-card text-card-foreground shadow-md hover:surface-tint hover:text-hover-text motion-reduce:transition-none [--button-shimmer-highlight:color-mix(in_srgb,currentColor_24%,transparent)]",
        toolbar: `${controlSurfaceClassName} text-foreground shadow-sm transition-colors hover:bg-muted`,
        destructive: "bg-destructive text-white hover:bg-destructive-hover",
        outline: "bg-card text-card-foreground hover:surface-tint hover:text-hover-text",
        // The soft outline follows the action text color through currentColor.
        bordered: "rounded-lg bg-background shadow-[0px_0px_2px_0.05px] duration-300 enabled:hover:bg-hover-bg enabled:hover:border-hover-border focus-visible:border-ring",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary-hover",
        ghost: "hover:surface-tint hover:text-hover-text",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        xs: "h-7 px-2 has-[>svg]:px-1.5",
        sm: "h-8 gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 px-6 has-[>svg]:px-4",
        icon: "size-9",
        "icon-sm": "size-8",
        "icon-lg": "size-10",
      },
      fullWidth: {
        true: "w-full",
      },
      btnType: {
        success: "",
        warning: "",
        destructive: "",
        default: "",
        submit: ""
      },
      noShimmer: {
        true: "",
        false: "",
      },
    },
    compoundVariants: [
      {
        variant: "toolbar",
        size: "default",
        class: "h-auto min-h-(--control-h-lg) self-stretch gap-1.5 px-3 py-0 shell:min-h-11 shell:px-4",
      },
      { variant: "bordered", btnType: "default", class: "border-input text-foreground disabled:cursor-not-allowed disabled:font-bold disabled:text-muted-foreground" },
      { variant: "bordered", btnType: "success", class: "border-success text-success" },
      { variant: "bordered", btnType: "warning", class: "border-warning text-warning" },
      { variant: "bordered", btnType: "destructive", class: "border-danger-border text-destructive" },
      {
        variant: ["default", "destructive", "header"],
        noShimmer: false,
        class: "btn-shimmer",
      },
      // Success types
      {
        variant: "default",
        btnType: "success",
        class: "bg-success text-white hover:bg-success/90! hover:text-white shadow-md shadow-success/20 hover:shadow-lg hover:shadow-success/40",
      },
      {
        variant: "outline",
        btnType: "success",
        class: "text-success hover:bg-success-light hover:text-success-text dark:hover:text-success-text",
      },
      {
        variant: "secondary",
        btnType: "success",
        class: "bg-success-light text-success-text hover:bg-success-light/80",
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
        class: "bg-warning text-white hover:bg-warning/90! hover:text-white shadow-md shadow-warning/20 hover:shadow-lg hover:shadow-warning/40",
      },
      {
        variant: "outline",
        btnType: "warning",
        class: "text-warning hover:bg-warning-light hover:text-warning-text dark:hover:text-warning-text",
      },
      {
        variant: "secondary",
        btnType: "warning",
        class: "bg-warning-light text-warning-text hover:bg-warning-light/80",
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
      // Destructive types
      {
        variant: "default",
        btnType: "destructive",
        class: "bg-destructive text-white hover:bg-destructive-hover! hover:text-white shadow-md shadow-destructive/20 hover:shadow-lg hover:shadow-destructive/40",
      },
      {
        variant: "outline",
        btnType: "destructive",
        class: "text-destructive hover:bg-danger-light hover:text-danger-text dark:hover:text-danger-text",
      },
      {
        variant: "secondary",
        btnType: "destructive",
        class: "bg-danger-light text-danger-text hover:bg-danger-light/80",
      },
      {
        variant: "ghost",
        btnType: "destructive",
        class: "text-destructive hover:bg-danger-light hover:text-danger-text dark:hover:text-danger-text",
      },
      {
        variant: "link",
        btnType: "destructive",
        class: "text-destructive hover:text-destructive/80",
      },
      //submit 
      {
        variant: "default",
        btnType: "submit",
        class: "bg-foreground text-background hover:bg-foreground/90! hover:text-background shadow-md shadow-primary-glow/20 hover:shadow-lg hover:shadow-primary-glow/40",
      },
      {
        variant: "outline",
        btnType: "submit",
        class: "text-primary",
      },
      {
        variant: "secondary",
        btnType: "submit",
        class: "bg-primary-light text-primary-text hover:bg-primary",
      },
      {
        variant: "ghost",
        btnType: "submit",
        class: "text-primary",
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
      btnType: "default",
    },
  }
)

const buttonVariants = (props?: Parameters<typeof buttonStyles>[0]) =>
  buttonStyles({ ...props, noShimmer: props?.noShimmer ?? (props?.variant !== "header") })

/**
 * A highly customizable and premium Button component.
 * Supports different visual variants, sizes, and polymorphic rendering via Radix Slot.
 * Includes shared neutral hover styling and optional shimmer.
 *
 * @param props - The properties for the Button component.
 * @param props.className - Additional CSS classes to merge.
 * @param props.variant - The visual variant style of the button (default, destructive, outline, etc.).
 * @param props.size - The size of the button (default, xs, sm, lg, icon, icon-sm, icon-lg).
 * @param props.fullWidth - Whether the button fills its container.
 * @param props.type - The functional/semantic type of the button (success, warning, submit, reset, button).
 * @param props.asChild - If true, renders the child component directly instead of a button element.
 * @param props.noShimmer - Header buttons shimmer by default. Set to false to enable shimmer on default and destructive buttons.
 * @returns A React button or polymorphic slot component.
 */
type ButtonProps = Omit<React.ComponentProps<"button">, "type"> &
  Omit<VariantProps<typeof buttonVariants>, "btnType"> & {
    asChild?: boolean
    type?: "success" | "warning" | "destructive" | "submit" | "reset" | "button" | ""
    noShimmer?: boolean
  }

function Button({
  className,
  variant,
  size,
  fullWidth,
  type,
  asChild = false,
  noShimmer,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button"

  const isStyleType = type === "success" || type === "warning" || type === "destructive" || type === "submit"
  const btnType = isStyleType ? type : undefined
  const htmlType = isStyleType ? "button" : (type as React.ComponentProps<"button">["type"])

  return (
    <Comp
      data-slot="button"
      type={htmlType}
      className={cn(buttonVariants({ variant, size, fullWidth, btnType, className, noShimmer }))}
      {...props}
    />
  )
}

export { Button, buttonVariants, type ButtonProps }
