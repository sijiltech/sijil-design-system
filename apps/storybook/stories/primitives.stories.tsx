import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
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
  PaginationEllipsis,
  PeriodNavigator,
  ActionButtons,
  ApproveButton,
  RefuseButton,
  Badge,
} from "@sijil/ui";

const meta: Meta = {
  title: "Primitives/Form & Navigation",
  parameters: {
    layout: "padded",
  },
};

export default meta;

export const TextareaInput: StoryObj = {
  render: () => (
    <div className="max-w-md space-y-2">
      <label className="text-xs font-semibold text-muted-foreground uppercase">
        Leave Request Description
      </label>
      <Textarea placeholder="Add a note or reason for your request..." />
    </div>
  ),
};

export const ProgressBars: StoryObj = {
  render: () => (
    <div className="max-w-md space-y-4">
      <div>
        <span className="text-xs text-muted-foreground mb-1 block">Default (60%)</span>
        <Progress value={60} />
      </div>
      <div>
        <span className="text-xs text-muted-foreground mb-1 block">Success Variant (85%)</span>
        <Progress value={85} variant="success" />
      </div>
      <div>
        <span className="text-xs text-muted-foreground mb-1 block">Warning Variant (40%)</span>
        <Progress value={40} variant="warning" />
      </div>
      <div>
        <span className="text-xs text-muted-foreground mb-1 block">Destructive Variant (15%)</span>
        <Progress value={15} variant="destructive" />
      </div>
    </div>
  ),
};

export const Spinners: StoryObj = {
  render: () => (
    <div className="flex items-center gap-4">
      <Spinner size="xs" />
      <Spinner size="sm" />
      <Spinner size="default" />
      <Spinner size="lg" />
      <Spinner size="xl" />
    </div>
  ),
};

export const RadioButtons: StoryObj = {
  render: () => (
    <div className="max-w-xs space-y-3">
      <label className="text-xs font-semibold text-muted-foreground uppercase">
        Leave Duration
      </label>
      <RadioGroup defaultValue="full">
        <label className="flex items-center gap-2.5 text-sm font-medium cursor-pointer">
          <RadioGroupItem value="full" />
          <span>Full Day (8 Hours)</span>
        </label>
        <label className="flex items-center gap-2.5 text-sm font-medium cursor-pointer">
          <RadioGroupItem value="half-1" />
          <span>First Half (4 Hours)</span>
        </label>
        <label className="flex items-center gap-2.5 text-sm font-medium cursor-pointer">
          <RadioGroupItem value="half-2" />
          <span>Second Half (4 Hours)</span>
        </label>
      </RadioGroup>
    </div>
  ),
};

export const RangeSlider: StoryObj = {
  render: () => {
    const [val, setVal] = React.useState(25);
    return (
      <div className="max-w-sm space-y-2">
        <div className="flex justify-between text-xs font-semibold">
          <span>Weekly Target:</span>
          <span className="tabular-nums font-bold text-primary">{val} hrs</span>
        </div>
        <Slider min={0} max={40} value={val} onValueChange={setVal} />
      </div>
    );
  },
};

export const Toggles: StoryObj = {
  render: () => (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Toggle variant="outline">On-Site</Toggle>
        <Toggle variant="outline" defaultPressed>
          Remote
        </Toggle>
      </div>

      <ToggleGroup type="single" defaultValue="month">
        <ToggleGroupItem value="day">Day</ToggleGroupItem>
        <ToggleGroupItem value="week">Week</ToggleGroupItem>
        <ToggleGroupItem value="month">Month</ToggleGroupItem>
        <ToggleGroupItem value="year">Year</ToggleGroupItem>
      </ToggleGroup>
    </div>
  ),
};

export const ScrollContainer: StoryObj = {
  render: () => (
    <ScrollArea maxHeight={140} className="w-80 rounded-xl border border-border/70 p-3 bg-card">
      <div className="space-y-2 text-xs text-muted-foreground">
        <p>Log entry 1: User signed in via Keycloak</p>
        <p>Log entry 2: Attendance sheet calculated for November</p>
        <p>Log entry 3: Leave request #409 approved by manager</p>
        <p>Log entry 4: Biometric punch received from Terminal A</p>
        <p>Log entry 5: Overtime balance updated (+2.5 hrs)</p>
        <p>Log entry 6: Policy cache refreshed successfully</p>
      </div>
    </ScrollArea>
  ),
};

export const PaginationControls: StoryObj = {
  render: () => (
    <div className="max-w-md">
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#" isActive>
              2
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">3</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  ),
};

export const NavigationAndActionButtons: StoryObj = {
  render: () => {
    const [period, setPeriod] = React.useState("November 2026");

    return (
      <div className="space-y-4">
        <PeriodNavigator
          periodLabel={period}
          onPrev={() => setPeriod("October 2026")}
          onNext={() => setPeriod("December 2026")}
        />

        <div className="flex items-center gap-3">
          <ApproveButton label="Approve" />
          <RefuseButton label="Refuse" />
          <ActionButtons
            onApprove={() => alert("Approved")}
            onRefuse={() => alert("Refused")}
          />
        </div>
      </div>
    );
  },
};

export const StatusBadges: StoryObj = {
  render: () => (
    <div className="flex flex-wrap gap-2.5">
      <Badge variant="success">Active (Success)</Badge>
      <Badge variant="warning">Pending (Warning)</Badge>
      <Badge variant="destructive">Terminated (Danger)</Badge>
      <Badge variant="info">On Leave (Info)</Badge>
      <Badge variant="success-subtle">Present (Subtle)</Badge>
      <Badge variant="warning-subtle">Late Arrival (Subtle)</Badge>
      <Badge variant="destructive-subtle">Absent (Subtle)</Badge>
      <Badge variant="info-subtle">Official Holiday (Subtle)</Badge>
    </div>
  ),
};

