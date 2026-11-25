import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import {
  ActionButtons,
  Button,
  ButtonGroup,
  Field,
  FieldGroup,
  FieldLabel,
  FiltersContainer,
  Input,
  MultiTabs,
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PeriodNavigator,
  RadioGroup,
  RadioGroupItem,
  SegmentedControl,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  ToggleGroup,
  ToggleGroupItem,
  type GroupVariant,
} from "@sijil/ui";

const meta = { title: "Components/Group Variants" } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

function CompareVariants({ render }: { render: (variant: GroupVariant) => React.ReactNode }) {
  return (
    <div className="grid max-w-3xl items-start gap-8 sm:grid-cols-2">
      <section className="min-w-0 space-y-4" aria-label="Plain">
        <h2 className="text-sm font-semibold">Plain</h2>
        {render("plain")}
      </section>
      <section className="min-w-0 space-y-4" aria-label="Card">
        <h2 className="text-sm font-semibold">Card</h2>
        {render("card")}
      </section>
    </div>
  );
}

function ActionExample({ variant }: { variant: GroupVariant }) {
  const [decision, setDecision] = React.useState("");
  return (
    <div className="space-y-2">
      <ActionButtons variant={variant} onApprove={() => setDecision("Approved")} onRefuse={() => setDecision("Refused")} />
      {decision && <p className="text-sm" role="status">{decision}</p>}
    </div>
  );
}

export const Buttons: Story = {
  render: () => (
    <CompareVariants render={(variant) => (
      <>
        <ButtonGroup variant={variant} aria-label="Report period">
          <Button size="sm">Day</Button>
          <Button size="sm">Week</Button>
          <Button size="sm">Month</Button>
        </ButtonGroup>
        <div>
          <ToggleGroup variant={variant} itemVariant="outline" type="single" defaultValue="list" aria-label="View">
            <ToggleGroupItem value="list">List</ToggleGroupItem>
            <ToggleGroupItem value="grid">Grid</ToggleGroupItem>
          </ToggleGroup>
        </div>
        <ActionExample variant={variant} />
      </>
    )} />
  ),
};

function TabExamples({ variant }: { variant: GroupVariant }) {
  const [view, setView] = React.useState("month");

  return (
    <>
      <Tabs variant={variant} defaultValue="pending">
        <TabsList variant="line" aria-label="Request status">
          <TabsTrigger variant="line" value="pending">Pending</TabsTrigger>
          <TabsTrigger variant="line" value="approved">Approved</TabsTrigger>
        </TabsList>
        <TabsContent value="pending" className="bg-card p-3 text-sm">Two pending requests.</TabsContent>
        <TabsContent value="approved" className="bg-card p-3 text-sm">Four approved requests.</TabsContent>
      </Tabs>
      <MultiTabs
        variant={variant}
        selectedTab={view}
        action={setView}
        list={[{ value: "week", label: "Week" }, { value: "month", label: "Month" }]}
      />
    </>
  );
}

export const TabGroups: Story = {
  name: "Tabs and MultiTabs",
  render: () => <CompareVariants render={(variant) => <TabExamples variant={variant} />} />,
};

function SelectionExamples({ variant }: { variant: GroupVariant }) {
  const [selected, setSelected] = React.useState<"all" | "mine">("all");

  return (
    <>
      <SegmentedControl
        variant={variant}
        ariaLabel="Request scope"
        value={selected}
        onChange={setSelected}
        options={[{ value: "all", label: "All requests" }, { value: "mine", label: "My requests" }]}
      />
      <RadioGroup variant={variant} defaultValue="weekly" aria-label="Summary frequency" className="w-fit">
        <label className="flex items-center gap-2 text-sm"><RadioGroupItem value="weekly" />Weekly</label>
        <label className="flex items-center gap-2 text-sm"><RadioGroupItem value="monthly" />Monthly</label>
      </RadioGroup>
    </>
  );
}

export const Selection: Story = {
  render: () => <CompareVariants render={(variant) => <SelectionExamples variant={variant} />} />,
};

function NavigationExamples({ variant }: { variant: GroupVariant }) {
  const [month, setMonth] = React.useState(10);
  const [page, setPage] = React.useState(1);

  return (
    <>
      <PeriodNavigator
        variant={variant}
        periodLabel={new Intl.DateTimeFormat("en", { month: "long", year: "numeric" }).format(new Date(2026, month))}
        onPrev={() => setMonth((value) => value - 1)}
        onNext={() => setMonth((value) => value + 1)}
      />
      <Pagination variant={variant} className="mx-0 justify-start">
        <PaginationContent>
          {[1, 2, 3].map((number) => (
            <PaginationItem key={number}>
              <PaginationLink href="#" isActive={page === number} onClick={(event) => {
                event.preventDefault();
                setPage(number);
              }}>{number}</PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext href="#" onClick={(event) => {
              event.preventDefault();
              setPage((value) => Math.min(value + 1, 3));
            }} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </>
  );
}

export const Navigation: Story = {
  render: () => <CompareVariants render={(variant) => <NavigationExamples variant={variant} />} />,
};

function FieldExamples({ variant }: { variant: GroupVariant }) {
  const id = React.useId();
  return (
    <>
      <FiltersContainer variant={variant}>
        <Input aria-label="Filter by employee" placeholder="Filter by employee" className="min-w-32 flex-1" />
        <Button>Apply</Button>
      </FiltersContainer>
      <FieldGroup variant={variant}>
        <Field>
          <FieldLabel htmlFor={id}>Employee name</FieldLabel>
          <Input id={id} placeholder="e.g. Maya Ali" />
        </Field>
      </FieldGroup>
    </>
  );
}

export const FiltersAndFields: Story = {
  render: () => <CompareVariants render={(variant) => <FieldExamples variant={variant} />} />,
};
