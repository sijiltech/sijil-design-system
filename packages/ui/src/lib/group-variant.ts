/** Surface around a group of controls. */
export type GroupVariant = "plain" | "card";

export const controlSurfaceClassName = "rounded-xl bg-card";

export const groupSurfaceClassName = `${controlSurfaceClassName} p-1 shadow-sm`;

export const groupCardClassName = "rounded-2xl bg-foreground/5 p-1";

export const groupSelectionClassName = {
  plain: "bg-foreground/10 text-foreground",
  card: "bg-card text-card-foreground",
} satisfies Record<GroupVariant, string>;
