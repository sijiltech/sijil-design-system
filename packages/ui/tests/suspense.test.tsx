import * as React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import {
  Suspense,
  LoadingSuspense,
  SuspenseFallback,
  LoadingFallback,
  Spinner,
} from "../src/index.js";

// Helper component that throws a pending promise to trigger Suspense
function SuspendingComponent({
  promise,
  content = "Resolved Data",
}: {
  promise: Promise<unknown>;
  content?: string;
}) {
  let status = "pending";
  let result: unknown;

  const suspender = promise.then(
    (res) => {
      status = "success";
      result = res;
    },
    (err) => {
      status = "error";
      result = err;
    },
  );

  return function Inner() {
    if (status === "pending") {
      throw suspender;
    }
    if (status === "error") {
      throw result;
    }
    return <div>{content}</div>;
  };
}

describe("Suspense and SuspenseFallback Suite", () => {
  describe("SuspenseFallback", () => {
    it("renders default centered fallback with halo ring and accessible spinner", () => {
      const { container } = render(<SuspenseFallback />);

      const fallback = container.querySelector("[data-slot='suspense-fallback']");
      expect(fallback).toBeInTheDocument();
      expect(fallback).toHaveAttribute("data-variant", "centered");
      expect(fallback).toHaveAttribute("aria-busy", "true");

      // Halo ring container
      const halo = fallback?.querySelector("[data-slot='suspense-halo']");
      expect(halo).toBeInTheDocument();
      expect(halo?.className).toContain("ring-8");

      // Inner spinner with accessible role="status"
      const spinner = screen.getByRole("status");
      expect(spinner).toBeInTheDocument();
      expect(spinner).toHaveAttribute("data-slot", "spinner");
      expect(spinner).toHaveAttribute("aria-label", "Loading...");
    });

    it("renders optional text message when provided", () => {
      render(<SuspenseFallback text="جاري تحميل البيانات..." />);

      const textEl = screen.getByText("جاري تحميل البيانات...");
      expect(textEl).toBeInTheDocument();
      expect(textEl).toHaveAttribute("data-slot", "suspense-text");
    });

    it("supports different layout variants", () => {
      const { container, rerender } = render(<SuspenseFallback variant="fullscreen" />);
      let fallback = container.querySelector("[data-slot='suspense-fallback']");
      expect(fallback).toHaveAttribute("data-variant", "fullscreen");
      expect(fallback?.className).toContain("fixed inset-0");

      rerender(<SuspenseFallback variant="card" />);
      fallback = container.querySelector("[data-slot='suspense-fallback']");
      expect(fallback).toHaveAttribute("data-variant", "card");
      expect(fallback).toHaveClass("rounded-2xl", "bg-card/60");
      expect(fallback).not.toHaveClass("border");

      rerender(<SuspenseFallback variant="fullPage" />);
      fallback = container.querySelector("[data-slot='suspense-fallback']");
      expect(fallback).toHaveAttribute("data-variant", "fullPage");
      expect(fallback?.className).toContain("min-h-[60vh]");

      rerender(<SuspenseFallback variant="overlay" />);
      fallback = container.querySelector("[data-slot='suspense-fallback']");
      expect(fallback).toHaveAttribute("data-variant", "overlay");
      expect(fallback?.className).toContain("absolute inset-0");

      rerender(<SuspenseFallback variant="inline" text="Loading..." />);
      fallback = container.querySelector("[data-slot='suspense-fallback']");
      expect(fallback).toHaveAttribute("data-variant", "inline");
      expect(fallback?.className).toContain("inline-flex");
      // Inline variant does not have halo ring
      expect(fallback?.querySelector("[data-slot='suspense-halo']")).toBeNull();
    });

    it("respects halo={false} and minHeight prop", () => {
      const { container } = render(<SuspenseFallback halo={false} minHeight="350px" />);

      const fallback = container.querySelector("[data-slot='suspense-fallback']");
      expect(fallback?.querySelector("[data-slot='suspense-halo']")).toBeNull();
      expect(fallback).toHaveStyle({ minHeight: "350px" });
    });

    it("allows custom className and spinnerClassName", () => {
      const { container } = render(
        <SuspenseFallback
          className="custom-fallback-class"
          spinnerClassName="custom-spinner-class"
        />,
      );

      const fallback = container.querySelector("[data-slot='suspense-fallback']");
      expect(fallback?.className).toContain("custom-fallback-class");

      const spinner = screen.getByRole("status");
      expect(spinner.className).toContain("custom-spinner-class");
    });
  });

  describe("Suspense", () => {
    it("renders children when not suspended", () => {
      render(
        <Suspense>
          <div data-testid="child-content">Child Ready</div>
        </Suspense>,
      );

      expect(screen.getByTestId("child-content")).toBeInTheDocument();
      expect(screen.queryByRole("status")).toBeNull();
    });

    it("renders default loading spinner fallback when child suspends", () => {
      const pendingPromise = new Promise(() => {}); // never resolves
      const Suspending = SuspendingComponent({ promise: pendingPromise });

      const { container } = render(
        <Suspense text="جاري التحميل...">
          <Suspending />
        </Suspense>,
      );

      const fallback = container.querySelector("[data-slot='suspense-fallback']");
      expect(fallback).toBeInTheDocument();
      expect(screen.getByText("جاري التحميل...")).toBeInTheDocument();
      expect(screen.getByRole("status")).toBeInTheDocument();
      expect(screen.queryByText("Resolved Data")).toBeNull();
    });

    it("uses custom fallback when fallback prop is provided", () => {
      const pendingPromise = new Promise(() => {});
      const Suspending = SuspendingComponent({ promise: pendingPromise });

      render(
        <Suspense fallback={<div data-testid="custom-skeleton">Custom Skeleton</div>}>
          <Suspending />
        </Suspense>,
      );

      expect(screen.getByTestId("custom-skeleton")).toBeInTheDocument();
      expect(screen.queryByRole("status")).toBeNull();
    });

    it("aliases LoadingSuspense and LoadingFallback point to the same components", () => {
      expect(LoadingSuspense).toBe(Suspense);
      expect(LoadingFallback).toBe(SuspenseFallback);
    });
  });

  describe("Spinner variant enhancement", () => {
    it("renders primary variant correctly", () => {
      render(<Spinner variant="primary" label="Primary Spinner" />);
      const spinner = screen.getByRole("status");
      expect(spinner.className).toContain("text-primary");
      expect(spinner).toHaveAttribute("aria-label", "Primary Spinner");
    });
  });
});
