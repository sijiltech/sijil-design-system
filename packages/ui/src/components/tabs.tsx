"use client"

import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "../lib/cn.js"
import { groupCardClassName, type GroupVariant } from "../lib/group-variant.js";

export type TabsProps = React.ComponentProps<typeof TabsPrimitive.Root> & {
  variant?: GroupVariant
}

const TabsVariantContext = React.createContext<GroupVariant>("card")

function Tabs({
  className,
  variant = "card",
  ...props
}: TabsProps) {
  return (
    <TabsVariantContext.Provider value={variant}>
      <TabsPrimitive.Root
        data-slot="tabs"
        data-variant={variant}
        className={cn("flex flex-col gap-2", className)}
        {...props}
      />
    </TabsVariantContext.Provider>
  )
}

const tabsListVariants = cva(
  "inline-flex h-9 items-center justify-center",
  {
    variants: {
      variant: {
        default: "w-fit gap-1 text-muted-foreground",
        line: "w-full justify-start gap-1",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface TabsListProps
  extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>,
    Omit<VariantProps<typeof tabsListVariants>, "variant"> {
  variant?: GroupVariant | VariantProps<typeof tabsListVariants>["variant"]
}

function TabsList({ className, variant, ...props }: TabsListProps) {
  const parentVariant = React.useContext(TabsVariantContext)
  const surface = variant === "plain" || variant === "card" ? variant : parentVariant
  const layout = variant === "line" || variant === null ? variant : "default"

  return (
    <TabsVariantContext.Provider value={surface}>
      <TabsPrimitive.List
        data-slot="tabs-list"
        data-variant={surface}
        className={cn(tabsListVariants({ variant: layout }), surface === "card" && [groupCardClassName, "p-[3px]"], className)}
        {...props}
      />
    </TabsVariantContext.Provider>
  )
}

const tabsTriggerVariants = cva(
  "inline-flex items-center justify-center gap-1.5 whitespace-nowrap text-sm font-medium transition-colors hover:surface-tint hover:text-hover-text focus-visible:outline-1 focus-visible:outline-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0 [&_svg]:pointer-events-none",
  {
    variants: {
      variant: {
        default:
          "h-full flex-1 rounded-xl px-2 py-1 text-muted-foreground data-[state=active]:font-semibold",
        line: "h-full flex-1 rounded-xl px-4 py-1 text-muted-foreground underline-offset-4 data-[state=active]:font-semibold data-[state=active]:underline",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface TabsTriggerProps
  extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>,
    VariantProps<typeof tabsTriggerVariants> {}

function TabsTrigger({ className, variant, ...props }: TabsTriggerProps) {
  const surface = React.useContext(TabsVariantContext)

  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(
        tabsTriggerVariants({ variant }),
        variant !== null && (surface === "card"
          ? "data-[state=active]:bg-card data-[state=active]:text-card-foreground"
          : "data-[state=active]:bg-foreground/10 data-[state=active]:text-foreground"),
        className
      )}
      {...props}
    />
  )
}

function TabsContent({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn("flex-1 rounded-2xl outline-none", className)}
      {...props}
    />
  )
}

export { Tabs, TabsList, TabsTrigger, TabsContent }
