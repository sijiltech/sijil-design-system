/**
 * Semantic design-token contract.
 *
 * Every design family MUST define each of these CSS custom properties for every
 * theme it ships (light + dark variants). Components and the Tailwind theme
 * bridge (`styles/theme.css`) only ever reference these semantic names, never
 * raw values, which is what makes families swappable.
 *
 * The names intentionally match the CSS variable names without the leading
 * `--`. They are validated against each family stylesheet by the test suite.
 */

/** Surface, text and brand colors. */
export const COLOR_TOKENS = [
  "background",
  "foreground",
  "card",
  "card-foreground",
  "popover",
  "popover-foreground",
  "primary",
  "primary-hover",
  "primary-glow",
  "primary-foreground",
  "secondary",
  "secondary-hover",
  "secondary-foreground",
  "muted",
  "muted-foreground",
  "accent",
  "accent-foreground",
  "destructive",
  "destructive-hover",
  "border",
  "input",
  "ring",
  "sidebar",
  "sidebar-foreground",
  "sidebar-primary",
  "sidebar-primary-foreground",
  "sidebar-accent",
  "sidebar-accent-foreground",
  "sidebar-border",
  "sidebar-ring",
  "chart-1",
  "chart-2",
  "chart-3",
  "chart-4",
  "chart-5",
] as const;

/** Interactive-state colors (hover treatments shared by many controls). */
export const INTERACTIVE_TOKENS = ["hover-bg", "hover-border", "hover-text"] as const;

/** Status / feedback colors (each has light, border and text companions). */
export const STATUS_TOKENS = [
  "color-success",
  "color-success-light",
  "color-success-border",
  "color-success-text",
  "color-danger",
  "color-danger-light",
  "color-danger-border",
  "color-danger-text",
  "color-warning",
  "color-warning-light",
  "color-warning-border",
  "color-warning-text",
  "color-info",
  "color-info-light",
] as const;

/** Elevation scale. */
export const SHADOW_TOKENS = ["shadow-sm", "shadow-md", "shadow-lg", "shadow-xl"] as const;

/** Tokens that do not change between light and dark themes. */
export const STRUCTURAL_TOKENS = [
  "radius",
  "sidebar-width",
  "control-h-xs",
  "control-h-sm",
  "control-h-md",
  "control-h-lg",
  "ds-font-sans",
] as const;

/** Tokens that must be defined by each *theme* (light/dark variants). */
export const THEMED_TOKENS = [
  ...COLOR_TOKENS,
  ...INTERACTIVE_TOKENS,
  ...STATUS_TOKENS,
  ...SHADOW_TOKENS,
] as const;

/** Tokens that must be defined once per family. */
export const FAMILY_TOKENS = [...STRUCTURAL_TOKENS] as const;

/** Name of any semantic token (without the leading `--`). */
export type DesignToken =
  | (typeof THEMED_TOKENS)[number]
  | (typeof FAMILY_TOKENS)[number];

