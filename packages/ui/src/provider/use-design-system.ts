"use client";

import { useContext } from "react";

import {
  DesignSystemContext,
  type DesignSystemContextValue,
} from "./design-system-context.js";

/**
 * Reads the design-system context (labels, locale, shell flag).
 * Safe to call without a provider: sensible defaults are returned.
 *
 * @returns The current {@link DesignSystemContextValue}.
 */
export function useDesignSystem(): DesignSystemContextValue {
  return useContext(DesignSystemContext);
}

