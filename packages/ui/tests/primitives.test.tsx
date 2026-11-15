import * as React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import {
  Textarea,
  Progress,
  Spinner,
  RadioGroup,
  RadioGroupItem,
  Slider,
  Toggle,
  ToggleGroup,
  ToggleGroupItem,
  ScrollArea,
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PeriodNavigator,
  ActionButtons,
  ApproveButton,
  RefuseButton,
  Badge,
} from "../src/index.js";

describe("Style Library Primitives Suite", () => {
  describe("Textarea", () => {
    it("renders textarea with placeholder and accepts input", () => {
      const handleChange = vi.fn();
      render(
        <Textarea
          placeholder="Enter comments..."
          onChange={handleChange}
        />
      );
      const input = screen.getByPlaceholderText("Enter comments...");
      expect(input).toBeInTheDocument();
      fireEvent.change(input, { target: { value: "Approved leave request" } });
      expect(handleChange).toHaveBeenCalledTimes(1);
    });
  });

  describe("Progress", () => {
    it("renders progressbar with correct accessibility attributes and value", () => {
      render(<Progress value={45} max={100} variant="success" />);
      const progress = screen.getByRole("progressbar");
      expect(progress).toHaveAttribute("aria-valuenow", "45");
      expect(progress).toHaveAttribute("aria-valuemax", "100");
    });
  });

  describe("Spinner", () => {
    it("renders spinner with accessible label", () => {
      render(<Spinner size="lg" label="Processing..." />);
      const spinner = screen.getByRole("status");
      expect(spinner).toHaveAttribute("aria-label", "Processing...");
    });
  });

  describe("RadioGroup & RadioGroupItem", () => {
    it("selects radio item on click and triggers onValueChange", () => {
      const onChange = vi.fn();
      render(
        <RadioGroup defaultValue="full" onValueChange={onChange}>
          <label>
            <RadioGroupItem value="full" /> Full Day
          </label>
          <label>
            <RadioGroupItem value="half" /> Half Day
          </label>
        </RadioGroup>
      );

      const items = screen.getAllByRole("radio");
      expect(items[0]).toHaveAttribute("aria-checked", "true");
      expect(items[1]).toHaveAttribute("aria-checked", "false");

      fireEvent.click(items[1]);
      expect(onChange).toHaveBeenCalledWith("half");
    });
  });

  describe("Slider", () => {
    it("renders range input slider and updates value", () => {
      const onChange = vi.fn();
      render(<Slider min={0} max={40} defaultValue={20} onValueChange={onChange} />);
      const slider = screen.getByRole("slider");
      expect(slider).toBeInTheDocument();
      fireEvent.change(slider, { target: { value: "30" } });
      expect(onChange).toHaveBeenCalledWith(30);
    });
  });

  describe("Toggle & ToggleGroup", () => {
    it("toggles pressed state on click", () => {
      const onToggle = vi.fn();
      render(<Toggle onPressedChange={onToggle}>Bold</Toggle>);
      const btn = screen.getByRole("button");
      expect(btn).toHaveAttribute("aria-pressed", "false");
      fireEvent.click(btn);
      expect(onToggle).toHaveBeenCalledWith(true);
    });

    it("ToggleGroup selects item in single mode", () => {
      const onChange = vi.fn();
      render(
        <ToggleGroup type="single" onValueChange={onChange}>
          <ToggleGroupItem value="day">Day</ToggleGroupItem>
          <ToggleGroupItem value="month">Month</ToggleGroupItem>
        </ToggleGroup>
      );

      const monthBtn = screen.getByText("Month");
      fireEvent.click(monthBtn);
      expect(onChange).toHaveBeenCalledWith("month");
    });
  });

  describe("ScrollArea", () => {
    it("renders container with scroll styling", () => {
      const { container } = render(
        <ScrollArea maxHeight={200}>
          <p>Long list of logs</p>
        </ScrollArea>
      );
      expect(container.firstChild).toHaveAttribute("data-slot", "scroll-area");
    });
  });

  describe("Pagination", () => {
    it("renders navigation and page links with active state", () => {
      render(
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" isActive>
                1
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">2</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      );

      expect(screen.getByRole("navigation")).toBeInTheDocument();
      const activeLink = screen.getByText("1");
      expect(activeLink).toHaveAttribute("aria-current", "page");
    });
  });

  describe("PeriodNavigator", () => {
    it("cycles periods via onPrev and onNext buttons", () => {
      const handlePrev = vi.fn();
      const handleNext = vi.fn();

      render(
        <PeriodNavigator
          periodLabel="November 2026"
          onPrev={handlePrev}
          onNext={handleNext}
        />
      );

      expect(screen.getByText("November 2026")).toBeInTheDocument();
      fireEvent.click(screen.getByLabelText("Previous"));
      expect(handlePrev).toHaveBeenCalledTimes(1);

      fireEvent.click(screen.getByLabelText("Next"));
      expect(handleNext).toHaveBeenCalledTimes(1);
    });
  });

  describe("ActionButtons & Semantic Badges", () => {
    it("renders ActionButtons and invokes handlers", () => {
      const onApprove = vi.fn();
      const onRefuse = vi.fn();

      render(
        <ActionButtons
          onApprove={onApprove}
          onRefuse={onRefuse}
          approveLabel="قبول"
          refuseLabel="رفض"
        />
      );

      fireEvent.click(screen.getByText("قبول"));
      expect(onApprove).toHaveBeenCalledTimes(1);

      fireEvent.click(screen.getByText("رفض"));
      expect(onRefuse).toHaveBeenCalledTimes(1);
    });

    it("renders new semantic status badge variants", () => {
      render(
        <div>
          <Badge variant="success">Active</Badge>
          <Badge variant="warning">Pending</Badge>
          <Badge variant="success-subtle">Approved</Badge>
        </div>
      );

      expect(screen.getByText("Active")).toHaveClass("bg-success");
      expect(screen.getByText("Pending")).toHaveClass("bg-warning");
      expect(screen.getByText("Approved")).toHaveClass("bg-success-light");
    });
  });
});

