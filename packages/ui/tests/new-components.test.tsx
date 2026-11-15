import { render, screen, fireEvent, act } from "@testing-library/react";
import * as React from "react";
import { describe, expect, it, vi } from "vitest";

import {
  ThemeProvider,
  useTheme,
  ModeToggle,
  LanguageSwitcher,
  SortableTableHead,
  SortableFlexTableHead,
  TableColumnFilter,
  ChartDefs,
  ChartLegends,
  ButtonGroup,
  CollapsibleCard,
  AppHeader,
  MultiSelectDropdown,
  Table,
  TableHeader,
  TableRow,
} from "../src/index.js";

describe("Theme System & Toggles", () => {
  it("cycles themes properly via useTheme and ModeToggle", () => {
    function TestConsumer() {
      const { theme, resolvedTheme, toggleTheme } = useTheme();
      return (
        <div>
          <span data-testid="theme">{theme}</span>
          <span data-testid="resolved">{resolvedTheme}</span>
          <ModeToggle data-testid="toggle-btn" />
        </div>
      );
    }

    render(
      <ThemeProvider defaultTheme="light">
        <TestConsumer />
      </ThemeProvider>,
    );

    expect(screen.getByTestId("resolved").textContent).toBe("light");

    const btn = screen.getByTestId("toggle-btn");
    fireEvent.click(btn);
    expect(screen.getByTestId("resolved").textContent).toBe("dark");

    fireEvent.click(btn);
    expect(screen.getByTestId("resolved").textContent).toBe("dark-blue");

    fireEvent.click(btn);
    expect(screen.getByTestId("resolved").textContent).toBe("light");
  });

  it("handles language switching with callback", () => {
    const handleLocaleChange = vi.fn();
    render(
      <LanguageSwitcher
        currentLocale="en"
        onLocaleChange={handleLocaleChange}
        data-testid="lang-btn"
      />,
    );

    const btn = screen.getByTestId("lang-btn");
    expect(btn.textContent).toContain("العربية");

    fireEvent.click(btn);
    expect(handleLocaleChange).toHaveBeenCalledWith("ar");
  });
});

describe("Sortable Table Components", () => {
  it("renders SortableTableHead and handles simple sorting", () => {
    const onSort = vi.fn();
    render(
      <Table>
        <TableHeader>
          <TableRow>
            <SortableTableHead
              title="Date"
              currentSortKey="date-asc"
              sortUpKey="date-asc"
              sortDownKey="date-desc"
              onSort={onSort}
              data-testid="sort-head"
            />
          </TableRow>
        </TableHeader>
      </Table>,
    );

    const head = screen.getByTestId("sort-head");
    expect(head.textContent).toContain("Date");

    fireEvent.click(head);
    expect(onSort).toHaveBeenCalledWith("date-desc");
  });

  it("renders SortableFlexTableHead and toggles TanStack-like column", () => {
    const toggleSorting = vi.fn();
    const column = {
      getIsSorted: () => "asc" as const,
      toggleSorting,
      clearSorting: vi.fn(),
    };

    render(
      <SortableFlexTableHead column={column}>
        Status
      </SortableFlexTableHead>,
    );

    const text = screen.getByText("Status");
    fireEvent.click(text);
    expect(toggleSorting).toHaveBeenCalledWith(true);
  });
});

describe("Collapsible & Group Controls", () => {
  it("renders CollapsibleCard and toggles open state", () => {
    render(
      <CollapsibleCard title="Summary Card" description="Details" defaultOpen={true}>
        <div data-testid="card-body">Content Inside</div>
      </CollapsibleCard>,
    );

    expect(screen.getByText("Summary Card")).toBeDefined();
    expect(screen.getByTestId("card-body")).toBeDefined();
  });

  it("renders ButtonGroup with horizontal orientation", () => {
    render(
      <ButtonGroup data-testid="btn-group">
        <button>First</button>
        <button>Second</button>
      </ButtonGroup>,
    );

    const group = screen.getByTestId("btn-group");
    expect(group.getAttribute("data-orientation")).toBe("horizontal");
  });
});

describe("Chart Elements", () => {
  it("renders ChartDefs SVG patterns", () => {
    const { container } = render(
      <svg>
        <ChartDefs />
      </svg>,
    );

    expect(container.querySelector("#diagonalHatch")).toBeDefined();
    expect(container.querySelector("#diagonalHatchOvertime")).toBeDefined();
  });

  it("renders ChartLegends and toggles expandable items", () => {
    render(
      <ChartLegends
        title="Custom Legend"
        items={[
          { label: "Present", color: "#16a34a", type: "solid" },
          { label: "Absent", color: "#dc2626", type: "bordered" },
        ]}
      />,
    );

    expect(screen.getByText("Custom Legend")).toBeDefined();
    fireEvent.click(screen.getByText("Custom Legend"));
    expect(screen.getByText("Present")).toBeDefined();
    expect(screen.getByText("Absent")).toBeDefined();
  });
});

