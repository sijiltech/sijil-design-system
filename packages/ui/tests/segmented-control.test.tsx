import * as React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { axe } from "vitest-axe";

import { SegmentedControl } from "../src/index.js";

describe("SegmentedControl component", () => {
  const options = [
    { value: "grid", label: "Grid" },
    { value: "list", label: "List" },
  ];

  it("renders options with radio roles", () => {
    render(
      <SegmentedControl
        options={options}
        value="grid"
        onChange={vi.fn()}
        ariaLabel="View switcher"
      />
    );

    const radiogroup = screen.getByRole("radiogroup", { name: "View switcher" });
    expect(radiogroup).toBeInTheDocument();

    const gridOption = screen.getByRole("radio", { name: "Grid" });
    expect(gridOption).toHaveAttribute("aria-checked", "true");

    const listOption = screen.getByRole("radio", { name: "List" });
    expect(listOption).toHaveAttribute("aria-checked", "false");
  });

  it("triggers onChange with selected value", () => {
    const handleChange = vi.fn();
    render(
      <SegmentedControl
        options={options}
        value="grid"
        onChange={handleChange}
        ariaLabel="View switcher"
      />
    );

    fireEvent.click(screen.getByRole("radio", { name: "List" }));
    expect(handleChange).toHaveBeenCalledWith("list");
  });

  it("passes accessibility audit", async () => {
    const { container } = render(
      <SegmentedControl
        options={options}
        value="grid"
        onChange={vi.fn()}
        ariaLabel="View switcher"
      />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});

