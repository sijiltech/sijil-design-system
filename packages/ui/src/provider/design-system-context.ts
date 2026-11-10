import { createContext } from "react";

import { defaultDesignSystemLabels, type DesignSystemLabels } from "./labels.js";

/** Values shared with every component through {@link DesignSystemProvider}. */
export interface DesignSystemContextValue {
  /** Translated internal strings (accessibility labels, empty states). */
  labels: DesignSystemLabels;
  /** BCP 47 locale tag used for locale-aware formatting (numbers, dates). */
  locale: string;
  /**
   * Whether the touch-first "shell" layout is active (narrow viewport or native
   * WebView). Components that render into portals cannot rely on the `shell:`
   * Tailwind variant (it needs an ancestor class), so they read this flag.
   */
  shell: boolean;
}

/** Defaults make every component usable without a provider. */
export const defaultDesignSystemContext: DesignSystemContextValue = {
  labels: defaultDesignSystemLabels,
  locale: "en",
  shell: false,
};

/** React context carrying {@link DesignSystemContextValue}. */
export const DesignSystemContext = createContext<DesignSystemContextValue>(
  defaultDesignSystemContext,
);

