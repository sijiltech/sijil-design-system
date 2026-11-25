import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { PaginationNext, RecordNavigator, SelectionPopover } from "../src/index.js";
import { DatePeriodNavigator } from "../src/date-picker.js";

describe("Shared HR controls", () => {
  it("closes the period picker after selecting an enabled month", () => {
    const onSelect = vi.fn();

    render(
      <DatePeriodNavigator
        periodLabel="Current period"
        onPrev={vi.fn()}
        onNext={vi.fn()}
        picker={{
          value: new Date(2026, 0, 1),
          precision: "month",
          isMonthDisabled: (_, month) => month === 1,
          onSelect,
        }}
      />,
    );

    const trigger = screen.getByRole("button", { name: "Current period" });
    fireEvent.click(trigger);
    expect(screen.getByRole("button", { name: "Feb" })).toBeDisabled();
    fireEvent.click(screen.getByRole("button", { name: "Mar" }));
    expect(onSelect).toHaveBeenCalledWith(new Date(2026, 2, 1));
    expect(trigger).toHaveAttribute("aria-expanded", "false");
  });

  it("accepts Arabic numerals and keeps off-list records navigable by their position", () => {
    const onPositionChange = vi.fn();
    render(
      <RecordNavigator
        position={0}
        total={4}
        clampPosition
        previousDisabled
        nextDisabled
        locale="ar"
        onPositionChange={onPositionChange}
      />,
    );

    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "١" } });
    fireEvent.blur(input);
    fireEvent.change(input, { target: { value: "٩" } });
    fireEvent.blur(input);

    expect(onPositionChange.mock.calls).toEqual([[1], [4]]);
    expect(screen.getByRole("button", { name: "Previous" })).toBeDisabled();
  });

  it("keeps the minimum selection while permitting a different row to replace it", () => {
    const onSelect = vi.fn();
    const onToggle = vi.fn();
    render(
      <SelectionPopover
        title="Employees"
        options={[{ id: "1", label: "First" }, { id: "2", label: "Second" }]}
        selectedIds={["1"]}
        minSelected={1}
        search=""
        onSearchChange={vi.fn()}
        searchPlaceholder="Search employees"
        clearSearchLabel="Clear search"
        emptyMessage="No results"
        open
        onOpenChange={vi.fn()}
        onSelect={onSelect}
        onToggle={onToggle}
      />,
    );

    expect(screen.getByRole("checkbox", { name: "First" })).toBeDisabled();
    fireEvent.click(screen.getByRole("button", { name: "Second" }));
    fireEvent.click(screen.getByRole("checkbox", { name: "Second" }));
    expect(onSelect).toHaveBeenCalledWith("2");
    expect(onToggle).toHaveBeenCalledWith("2");
  });

  it("supports action-based pagination with a native disabled button", () => {
    const onClick = vi.fn();
    const { rerender } = render(<PaginationNext asButton iconOnly disabled onClick={onClick} />);
    const button = screen.getByRole("button", { name: "Go to next page" });

    fireEvent.click(button);
    expect(onClick).not.toHaveBeenCalled();

    rerender(<PaginationNext asButton iconOnly onClick={onClick} />);
    fireEvent.click(button);
    expect(onClick).toHaveBeenCalledOnce();
  });
});

