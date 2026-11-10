"use client";

import { useEffect, type RefObject } from "react";

/**
 * Horizontally centers the active child of a scrollable strip whenever the
 * active key changes. Uses relative scrollLeft deltas, so it works in RTL.
 *
 * @param containerRef - Scrollable strip.
 * @param activeSelector - Selector matching the active child.
 * @param activeKey - Value whose change triggers re-centering.
 */
export function useScrollActiveIntoView(
  containerRef: RefObject<HTMLElement | null>,
  activeSelector: string,
  activeKey: unknown,
) {
  useEffect(() => {
    const container = containerRef.current;
    const active = container?.querySelector<HTMLElement>(activeSelector);
    if (!container || !active || container.scrollWidth <= container.clientWidth) return;

    const containerRect = container.getBoundingClientRect();
    const activeRect = active.getBoundingClientRect();
    const offset = activeRect.left - containerRect.left - (containerRect.width - activeRect.width) / 2;
    container.scrollLeft += offset;
  }, [containerRef, activeSelector, activeKey]);
}

export default useScrollActiveIntoView;
