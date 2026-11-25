"use client";

import * as React from "react";
import { Spinner, type SpinnerSize } from "./spinner.js";
import { useDesignSystem } from "../provider/use-design-system.js";
import { cn } from "../lib/cn.js";

/**
 * Visual layout variants for the Suspense loading fallback.
 */
export type SuspenseVariant =
  | "centered"
  | "fullPage"
  | "fullscreen"
  | "overlay"
  | "card"
  | "inline";

/**
 * Properties for the {@link SuspenseFallback} component.
 */
export interface SuspenseFallbackProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Layout presentation variant. Defaults to 'centered'.
   * - `centered`: Centered inside the parent container with comfortable min-height.
   * - `fullPage`: Fills the viewport/page height with comfortable padding.
   * - `fullscreen`: Fixed full-screen overlay with backdrop blur.
   * - `overlay`: Absolute overlay covering the relative parent container.
   * - `card`: Styled as an elevated/outlined card surface.
   * - `inline`: Compact inline indicator.
   */
  variant?: SuspenseVariant;

  /**
   * Size of the spinner. Defaults to 'lg' for centered/card/fullPage/fullscreen/overlay, 'sm' for inline.
   */
  size?: SpinnerSize;

  /**
   * Accessible screen-reader label. Defaults to DesignSystem context `labels.loading` or "Loading...".
   */
  label?: string;

  /**
   * Optional visible text message displayed beneath or beside the spinner.
   */
  text?: React.ReactNode;

  /**
   * Minimum height override for the fallback container (e.g. '240px', '50vh', '100%').
   */
  minHeight?: string | number;

  /**
   * Whether to wrap the spinner in the Sijil signature halo badge ring.
   * Defaults to `true` (except for the `'inline'` variant).
   */
  halo?: boolean;

  /**
   * Optional class name override for the spinner itself.
   */
  spinnerClassName?: string;
}

const variantClasses: Record<SuspenseVariant, string> = {
  centered: "flex w-full flex-col items-center justify-center gap-3 p-6 min-h-[200px] text-center",
  fullPage: "flex flex-1 w-full min-h-[60vh] flex-col items-center justify-center gap-4 p-6 text-center",
  fullscreen: "fixed inset-0 z-50 flex flex-col items-center justify-center gap-4 bg-background/80 backdrop-blur-sm p-6 text-center animate-in fade-in-0 duration-200",
  overlay: "absolute inset-0 z-20 flex flex-col items-center justify-center gap-3 bg-background/70 backdrop-blur-xs p-4 text-center rounded-[inherit] animate-in fade-in-0 duration-150",
  card: "flex w-full flex-col items-center justify-center gap-3 p-8 rounded-2xl bg-card/60 backdrop-blur-xs shadow-sm min-h-[220px] text-center",
  inline: "inline-flex items-center justify-center gap-2 py-1 px-2 text-sm text-muted-foreground",
};

const haloSizeClasses: Record<SpinnerSize, string> = {
  xs: "size-8 ring-4",
  sm: "size-9 ring-6",
  default: "size-10 ring-6",
  lg: "size-14 ring-8",
  xl: "size-16 ring-8",
};

/**
 * Sijil design system loading fallback component.
 *
 * Renders an accessible, brand-styled spinner with an optional halo ring
 * and descriptive text. Can be used standalone or as a fallback for React Suspense.
 */
export const SuspenseFallback = React.forwardRef<HTMLDivElement, SuspenseFallbackProps>(
  (
    {
      variant = "centered",
      size,
      label,
      text,
      minHeight,
      halo,
      className,
      spinnerClassName,
      style,
      ...props
    },
    ref,
  ) => {
    const { labels } = useDesignSystem();
    const resolvedLabel = label ?? labels?.loading ?? "Loading...";
    const isInline = variant === "inline";
    const resolvedSize: SpinnerSize = size ?? (isInline ? "sm" : "lg");
    const showHalo = halo ?? !isInline;

    const mergedStyle: React.CSSProperties = {
      ...(minHeight !== undefined ? { minHeight } : {}),
      ...style,
    };

    if (isInline) {
      return (
        <div
          ref={ref}
          data-slot="suspense-fallback"
          data-variant={variant}
          aria-busy="true"
          className={cn(variantClasses.inline, className)}
          style={mergedStyle}
          {...props}
        >
          <Spinner
            size={resolvedSize}
            variant="primary"
            label={resolvedLabel}
            className={spinnerClassName}
          />
          {text && (
            <span data-slot="suspense-text" className="text-xs font-medium text-muted-foreground">
              {text}
            </span>
          )}
        </div>
      );
    }

    return (
      <div
        ref={ref}
        data-slot="suspense-fallback"
        data-variant={variant}
        aria-busy="true"
        className={cn(variantClasses[variant], className)}
        style={mergedStyle}
        {...props}
      >
        {showHalo ? (
          <div
            data-slot="suspense-halo"
            className={cn(
              "flex items-center justify-center rounded-full bg-primary/10 text-primary ring-8 ring-primary/5 transition-all duration-300",
              haloSizeClasses[resolvedSize],
            )}
          >
            <Spinner
              size={resolvedSize}
              variant="primary"
              label={resolvedLabel}
              className={spinnerClassName}
            />
          </div>
        ) : (
          <Spinner
            size={resolvedSize}
            variant="primary"
            label={resolvedLabel}
            className={spinnerClassName}
          />
        )}
        {text && (
          <p
            data-slot="suspense-text"
            className="text-sm font-medium text-muted-foreground animate-pulse tracking-tight select-none"
          >
            {text}
          </p>
        )}
      </div>
    );
  },
);

SuspenseFallback.displayName = "SuspenseFallback";

/**
 * Properties for the {@link Suspense} component.
 */
export interface SuspenseProps {
  /**
   * Children to suspend until ready.
   */
  children?: React.ReactNode;

  /**
   * Custom fallback element. If provided, replaces the default design system spinner fallback.
   */
  fallback?: React.ReactNode;

  /**
   * Layout presentation variant for the default fallback.
   * Defaults to 'centered'.
   */
  variant?: SuspenseVariant;

  /**
   * Size of the spinner in the default fallback. Defaults to 'lg'.
   */
  size?: SpinnerSize;

  /**
   * Accessible screen-reader label for the spinner.
   * Defaults to DesignSystem context `labels.loading` or "Loading...".
   */
  label?: string;

  /**
   * Optional visible text shown beneath the spinner (e.g. "جاري التحميل...").
   */
  text?: React.ReactNode;

  /**
   * Minimum height override for the fallback container.
   */
  minHeight?: string | number;

  /**
   * Whether to wrap the spinner in the Sijil branded halo ring.
   * Defaults to true (except for 'inline' variant).
   */
  halo?: boolean;

  /**
   * Optional class name applied to the fallback container.
   */
  className?: string;

  /**
   * Optional class name applied to the fallback container. Alias of `className`.
   */
  fallbackClassName?: string;

  /**
   * Optional class name applied to the spinner element inside the fallback.
   */
  spinnerClassName?: string;
}

/**
 * Sijil design system Suspense boundary.
 *
 * Wraps `React.Suspense` with an out-of-the-box themed loading spinner fallback
 * styled according to Sijil design system tokens.
 *
 * @example
 * ```tsx
 * // Default centered spinner
 * <Suspense>
 *   <AsyncTable />
 * </Suspense>
 *
 * // Full-page loading with custom text
 * <Suspense variant="fullPage" text="جاري تحميل الصفحة...">
 *   <PageContent />
 * </Suspense>
 *
 * // Custom fallback
 * <Suspense fallback={<CustomSkeleton />}>
 *   <AsyncCard />
 * </Suspense>
 * ```
 */
export function Suspense({
  children,
  fallback,
  variant = "centered",
  size,
  label,
  text,
  minHeight,
  halo,
  className,
  fallbackClassName,
  spinnerClassName,
}: SuspenseProps) {
  const resolvedFallback =
    fallback !== undefined ? (
      fallback
    ) : (
      <SuspenseFallback
        variant={variant}
        size={size}
        label={label}
        text={text}
        minHeight={minHeight}
        halo={halo}
        className={fallbackClassName ?? className}
        spinnerClassName={spinnerClassName}
      />
    );

  return <React.Suspense fallback={resolvedFallback}>{children}</React.Suspense>;
}

Suspense.displayName = "Suspense";

export { Suspense as LoadingSuspense, SuspenseFallback as LoadingFallback };
