/** A selectable theme (color mode) of a design family. */
export interface DesignThemeDefinition {
  /** Stable id, also used as the class name applied to `<html>`. */
  readonly id: string;
  /** Human readable name (Storybook toolbar, docs). */
  readonly label: string;
  /** Whether Tailwind's `dark:` variant should be active for this theme. */
  readonly dark: boolean;
}

/** Describes one design family (a coherent set of tokens + slot styles). */
export interface DesignFamilyDefinition {
  /** Stable id, used as the value of the `data-ds-family` attribute. */
  readonly id: string;
  /** Human readable name. */
  readonly label: string;
  /** Themes shipped by the family. The first one is the default. */
  readonly themes: readonly DesignThemeDefinition[];
}

