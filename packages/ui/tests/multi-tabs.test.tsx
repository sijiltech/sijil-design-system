import * as React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { MultiTabs } from "../src/index.js";

describe("MultiTabs component", () => {
  const tabs = [
    { value: "all", label: "All" },
    { value: "active", label: "Active" },
    { value: "archived", label: "Archived", disabled: true },
  ];

  it("renders all tab items", () => {
    render(<MultiTabs list={tabs} selectedTab="all" action={vi.fn()} />);
    expect(screen.getByRole("button", { name: "All" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Active" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Archived" })).toBeDisabled();
  });

  it("marks active tab with data-active", () => {
    render(<MultiTabs list={tabs} selectedTab="active" action={vi.fn()} />);
    const activeTab = screen.getByRole("button", { name: "Active" });
    expect(activeTab).toHaveAttribute("data-active", "true");
  });

  it("calls action on click", () => {
    const onSelect = vi.fn();
    render(<MultiTabs list={tabs} selectedTab="all" action={onSelect} />);
    fireEvent.click(screen.getByRole("button", { name: "Active" }));
    expect(onSelect).toHaveBeenCalledWith("active");
  });
});

