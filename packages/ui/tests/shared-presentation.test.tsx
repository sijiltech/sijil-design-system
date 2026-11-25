import * as React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { Globe } from "lucide-react";
import { expect, it, vi } from "vitest";

import { ChartLegends, MobileSettingsRow, ScrollArea } from "../src/index.js";

it("shows static chart items and their note without a disclosure control", () => {
  render(
    <ChartLegends
      presentation="static"
      items={[{ label: "Overtime", color: "blue", swatchClassName: "overtime-glow" }]}
      note="Includes weekend work"
    />,
  );
  expect(screen.getByText("Overtime")).toBeVisible();
  expect(screen.getByText("Includes weekend work")).toBeVisible();
  expect(screen.queryByRole("button")).not.toBeInTheDocument();
  expect(screen.getByText("Overtime").parentElement?.querySelector(".overtime-glow")).toBeInTheDocument();
});

it("allows a preference control without wrapping it in another button", () => {
  const changeLanguage = vi.fn();
  render(
    <MobileSettingsRow
      icon={Globe}
      label="Language"
      control={<button type="button" onClick={changeLanguage}>العربية</button>}
    />,
  );
  expect(screen.getByText("Language")).toBeVisible();
  const control = screen.getByRole("button", { name: "العربية" });
  expect(control.parentElement?.closest("button")).toBeNull();
  fireEvent.click(control);
  expect(changeLanguage).toHaveBeenCalledOnce();
});

it("forwards the ref to the element that reports its own scroll position", () => {
  const ref = React.createRef<HTMLDivElement>();
  const onScroll = vi.fn();
  const { container } = render(<ScrollArea ref={ref} onScroll={onScroll}>Allocations</ScrollArea>);
  expect(ref.current).toBe(container.querySelector('[data-slot="scroll-area"]'));
  fireEvent.scroll(ref.current!);
  expect(onScroll).toHaveBeenCalledOnce();
});

