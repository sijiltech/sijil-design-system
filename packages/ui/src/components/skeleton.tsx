import { cn } from "../lib/cn.js"

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn("animate-shimmer rounded-md", className)}
      {...props}
    />
  )
}

export { Skeleton }
