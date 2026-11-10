/**
 * `@sijil/ui/families`: design-family registry and the semantic token contract.
 * Framework-free and React-free; safe to import from Server Components,
 * Storybook configuration and build scripts.
 */
export {
  DEFAULT_DESIGN_FAMILY,
  DESIGN_FAMILY_ATTRIBUTE,
  designFamilies,
  type DesignFamilyId,
} from "./families/registry.js";
export type { DesignFamilyDefinition, DesignThemeDefinition } from "./families/design-family.js";
export {
  COLOR_TOKENS,
  FAMILY_TOKENS,
  INTERACTIVE_TOKENS,
  SHADOW_TOKENS,
  STATUS_TOKENS,
  STRUCTURAL_TOKENS,
  THEMED_TOKENS,
  type DesignToken,
} from "./tokens/contract.js";

