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
  SidebarBrand,
  SidebarProvider,
  Accordion,
  Tabs,
  TabsList,
  TabsTrigger,
  ToggleGroup,
  ToggleGroupItem,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  type AccordionProps,
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
    expect(btn).toHaveClass("btn-shimmer");
    expect(btn).toHaveAttribute("data-next-theme", "dark");
    fireEvent.click(btn);
    expect(screen.getByTestId("resolved").textContent).toBe("dark");
    expect(btn).toHaveAttribute("data-next-theme", "dark-blue");

    fireEvent.click(btn);
    expect(screen.getByTestId("resolved").textContent).toBe("dark-blue");
    expect(btn).toHaveAttribute("data-next-theme", "light");

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
    expect(btn).toHaveClass("btn-shimmer");
    expect(btn.textContent).toContain("العربية");

    fireEvent.click(btn);
    expect(handleLocaleChange).toHaveBeenCalledWith("ar");
  });
});

describe("Sortable Table Components", () => {
  it("toggles a column from the keyboard while keeping the menu open", () => {
    function ColumnMenu() {
      const [isVisible, setIsVisible] = React.useState(true);
      return (
        <TableColumnFilter
          columns={[{ id: "name", label: "Employee name", isVisible, toggleVisibility: () => setIsVisible(!isVisible) }]}
        />
      );
    }

    render(<ColumnMenu />);
    fireEvent.keyDown(screen.getByRole("button", { name: "Toggle columns" }), { key: "Enter" });

    const item = screen.getByRole("menuitemcheckbox", { name: "Employee name" });
    expect(item).toHaveAttribute("aria-checked", "true");
    fireEvent.keyDown(item, { key: "Enter" });
    expect(screen.getByRole("menuitemcheckbox", { name: "Employee name" })).toHaveAttribute("aria-checked", "false");
    expect(screen.getByRole("menu")).toBeVisible();
  });

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

describe("Sidebar branding", () => {
  it("uses the supplied logo, falls back when it fails and toggles without a logo", () => {
    const { container, rerender } = render(
      <SidebarProvider>
        <SidebarBrand brand={{ name: "Sijil", logoSrc: "/sijil.svg", logoIcon: <span>Logo mark</span> }} />
      </SidebarProvider>,
    );
    const trigger = screen.getByRole("button", { name: "Toggle Sidebar" });
    const logo = container.querySelector("img");
    expect(logo).toHaveAttribute("src", "/sijil.svg");

    fireEvent.error(logo!);
    expect(container.querySelector("img")).not.toBeInTheDocument();
    expect(screen.getByText("Logo mark")).toBeInTheDocument();

    rerender(<SidebarProvider><SidebarBrand brand={{ name: "Sijil" }} /></SidebarProvider>);
    expect(trigger.querySelector('[data-slot="sidebar-brand-toggle-icon"]')).not.toHaveClass("hidden");
    expect(trigger).toHaveAttribute("aria-expanded", "true");
    fireEvent.click(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "false");
  });
});

describe("Collapsible & Group Controls", () => {
  it("combines a plain tabs surface with the line variant", () => {
    render(
      <Tabs variant="plain" defaultValue="pending">
        <TabsList variant="line" aria-label="Request status">
          <TabsTrigger variant="line" value="pending">Pending</TabsTrigger>
          <TabsTrigger variant="line" value="approved">Approved</TabsTrigger>
        </TabsList>
      </Tabs>,
    );
    const list = screen.getByRole("tablist", { name: "Request status" });
    expect(list).toHaveAttribute("data-variant", "plain");
    expect(list).toHaveClass("w-full");
    expect(list).not.toHaveClass("bg-foreground/5");
    expect(screen.getByRole("tab", { name: "Pending" })).toHaveClass(
      "data-[state=active]:underline",
      "data-[state=active]:bg-foreground/10",
    );
  });

  it("supports outlined toggle items with either a legacy or explicit surface", () => {
    const { rerender } = render(
      <ToggleGroup variant="outline">
        <ToggleGroupItem value="grid">Grid</ToggleGroupItem>
      </ToggleGroup>,
    );
    expect(screen.getByRole("group")).toHaveAttribute("data-variant", "card");
    expect(screen.getByRole("radio", { name: "Grid" })).toHaveClass("bg-foreground/5");

    rerender(
      <ToggleGroup variant="plain" itemVariant="outline">
        <ToggleGroupItem value="grid">Grid</ToggleGroupItem>
      </ToggleGroup>,
    );
    expect(screen.getByRole("group")).toHaveAttribute("data-variant", "plain");
    const item = screen.getByRole("radio", { name: "Grid" });
    expect(item).toHaveClass("bg-foreground/5");
    fireEvent.click(item);
    expect(item).toBeChecked();
  });

  it("supports plain and card accordions while preserving dismissal", () => {
    function Example({ variant }: Pick<AccordionProps, "variant">) {
      return (
        <Accordion type="single" collapsible defaultValue="notice" variant={variant}>
          <AccordionItem value="notice" data-testid="notice">
            <AccordionTrigger>Notice period</AccordionTrigger>
            <AccordionContent>Allow at least one week.</AccordionContent>
          </AccordionItem>
        </Accordion>
      );
    }

    const { rerender } = render(<Example />);
    const item = screen.getByTestId("notice");
    expect(item).not.toHaveClass("bg-card");

    rerender(<Example variant="card" />);
    expect(item).toHaveClass("bg-card", "rounded-2xl");
    const trigger = screen.getByRole("button", { name: "Notice period" });
    expect(trigger).toHaveAttribute("aria-expanded", "true");

    fireEvent.click(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "false");
  });

  it("renders CollapsibleCard and toggles open state", () => {
    render(
      <CollapsibleCard title="Summary Card" description="Details" defaultOpen={true}>
        <div data-testid="card-body">Content Inside</div>
      </CollapsibleCard>,
    );

    expect(screen.getByText("Summary Card")).toBeDefined();
    expect(screen.getByTestId("card-body")).toBeDefined();
  });

  it("toggles the collapsible card from the title and description while keeping actions independent", () => {
    const onAction = vi.fn();
    const onOpenChange = vi.fn();
    render(
      <CollapsibleCard
        title="Leave balance"
        description="Available days"
        actions={<button type="button" onClick={onAction}>Edit balance</button>}
        onOpenChange={onOpenChange}
      >
        21 days remaining
      </CollapsibleCard>,
    );

    const trigger = screen.getByRole("button", { name: "Leave balance" });
    expect(trigger).toHaveAttribute("aria-expanded", "true");
    fireEvent.click(screen.getByText("Leave balance"));
    expect(trigger).toHaveAttribute("aria-expanded", "false");

    fireEvent.click(screen.getByRole("button", { name: "Edit balance" }));
    expect(onAction).toHaveBeenCalledOnce();
    expect(onOpenChange).toHaveBeenCalledTimes(1);
    expect(trigger).toHaveAttribute("aria-expanded", "false");

    fireEvent.click(screen.getByText("Available days"));
    expect(trigger).toHaveAttribute("aria-expanded", "true");
    expect(onOpenChange).toHaveBeenLastCalledWith(true);
  });

  it("can switch a collapsible card to a plain surface without resetting its open state", () => {
    const { container, rerender } = render(
      <CollapsibleCard title="Leave balance">21 days remaining</CollapsibleCard>,
    );

    expect(container.querySelector('[data-slot="card"]')).toBeInTheDocument();
    const trigger = screen.getByRole("button", { name: "Leave balance" });
    fireEvent.click(trigger);

    rerender(<CollapsibleCard title="Leave balance" variant="plain">21 days remaining</CollapsibleCard>);
    expect(container.querySelector('[data-slot="card"]')).not.toBeInTheDocument();
    expect(container.querySelector('[data-slot="collapsible-card-surface"]')).toHaveClass("bg-transparent", "shadow-none");
    expect(trigger).toHaveAttribute("aria-expanded", "false");

    fireEvent.click(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "true");
  });

  it("keeps a flat collapsible card on the card surface without tinting the trigger", () => {
    const { container } = render(
      <CollapsibleCard title="Leave balance" variant="flat">21 days remaining</CollapsibleCard>,
    );

    expect(container.querySelector('[data-slot="card"]')).toBeInTheDocument();
    expect(container.querySelector('[data-variant="flat"]')).toBeInTheDocument();
    expect(container.querySelector('[data-slot="collapsible-card-header"]')).not.toHaveClass("bg-foreground/5");
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

