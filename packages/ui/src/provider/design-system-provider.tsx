"use client";

import * as React from "react";

import { DirectionProvider } from "../components/direction.js";
import {
  DesignSystemContext,
  defaultDesignSystemContext,
  type DesignSystemContextValue,
} from "./design-system-context.js";
import type { DesignSystemLabels } from "./labels.js";

/** Props of {@link DesignSystemProvider}. */
export interface DesignSystemProviderProps {
  children: React.ReactNode;
  /** Reading direction, forwarded to Radix primitives. Defaults to `ltr`. */
  direction?: "ltr" | "rtl";
  /** BCP 47 locale tag for locale-aware formatting. Defaults to `en`. */
  locale?: string;
  /** Overrides for the internal strings; missing keys fall back to English. */
  labels?: Partial<DesignSystemLabels>;
  /** Enables the touch-first shell layout for portal-rendered components. */
  shell?: boolean;
}

/**
 * Supplies direction, locale, translated labels and shell state to every
 * design-system component below it. Mount it once, near the application root
 * (it is a Client Component; place it inside your i18n/theme providers).
 *
 * @param props - Provider configuration.
 * @returns The provider tree wrapping `children`.
 */
export function DesignSystemProvider({
  children,
  direction = "ltr",
  locale = defaultDesignSystemContext.locale,
  labels,
  shell = defaultDesignSystemContext.shell,
}: DesignSystemProviderProps) {
  const value = React.useMemo<DesignSystemContextValue>(
    () => ({
      locale,
      shell,
      labels: { ...defaultDesignSystemContext.labels, ...labels },
    }),
    [locale, shell, labels],
  );

  return (
    <DesignSystemContext.Provider value={value}>
      <DirectionProvider direction={direction}>{children}</DirectionProvider>
    </DesignSystemContext.Provider>
  );
}

