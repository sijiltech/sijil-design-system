import type { DesignFamilyDefinition } from "./design-family.js";

/**
 * The initial design family: the visual identity of the Sijil HR application
 * (navy brand color, soft shadows, rounded surfaces, light / dark / dark-blue).
 */
export const sijilFamily = {
  id: "sijil",
  label: "Sijil",
  themes: [
    { id: "light", label: "Light", dark: false },
    { id: "dark", label: "Dark", dark: true },
    { id: "dark-blue", label: "Dark blue", dark: true },
  ],
} as const satisfies DesignFamilyDefinition;

