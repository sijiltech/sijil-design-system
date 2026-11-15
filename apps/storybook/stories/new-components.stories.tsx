import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import {
  ModeToggle,
  LanguageSwitcher,
  SortableTableHead,
  TableColumnFilter,
  CollapsibleCard,
  ButtonGroup,
  ButtonGroupSeparator,
  ButtonGroupText,
  MultiSelectDropdown,
  AppHeader,
  NavMain,
  NavUser,
  TeamSwitcher,
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  Table,
  TableHeader,
  TableRow,
  TableCell,
  TableBody,
  Button,
} from "@sijil/ui";
import {
  ChartDefs,
  ChartLegends,
  ChartCard,
  ChartContainer,
  type ChartConfig,
} from "@sijil/ui/chart";
import { BarChart, Bar, XAxis, YAxis } from "recharts";
import { Home, Users, Calendar, Settings, FileText } from "lucide-react";

const meta: Meta = {
  title: "Components/Extended Ecosystem",
  parameters: {
    layout: "padded",
  },
};

export default meta;
type Story = StoryObj;

export const ThemeAndLanguageToggles: Story = {
  render: () => {
    const [locale, setLocale] = React.useState<"ar" | "en">("en");
    return (
      <div className="space-y-6 max-w-xl">
        <div className="p-4 rounded-xl border border-border bg-card space-y-4">
          <h3 className="font-semibold text-foreground">Theme & Language Toggles</h3>
          <p className="text-sm text-muted-foreground">
            Switch between Light, Dark, and Dark-Blue themes, and toggle between Arabic & English.
          </p>
          <div className="flex items-center gap-3">
            <ModeToggle />
            <LanguageSwitcher
              currentLocale={locale}
              onLocaleChange={(next) => setLocale(next)}
            />
          </div>
        </div>

        <AppHeader
          title="Sijil HR Platform"
          subtitle="Enterprise Human Resources Suite"
          showSidebarTrigger={false}
        />
      </div>
    );
  },
};

export const SortableTableDemo: Story = {
  render: () => {
    const [sort, setSort] = React.useState<string | null>("date-asc");
    const [columns, setColumns] = React.useState([
      { id: "name", label: "Employee Name", isVisible: true },
      { id: "date", label: "Date", isVisible: true },
      { id: "status", label: "Status", isVisible: true },
      { id: "hours", label: "Logged Hours", isVisible: true },
    ]);

    const toggleCol = (id: string) => {
      setColumns((cols) =>
        cols.map((c) => (c.id === id ? { ...c, isVisible: !c.isVisible } : c)),
      );
    };

    return (
      <div className="space-y-4 max-w-3xl">
        <div className="flex justify-between items-center">
          <h3 className="font-semibold text-foreground">Sortable Table with Column Visibility</h3>
          <TableColumnFilter
            columns={columns.map((c) => ({
              id: c.id,
              label: c.label,
              isVisible: c.isVisible,
              toggleVisibility: () => toggleCol(c.id),
            }))}
          />
        </div>

        <div className="rounded-xl border border-border bg-card overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                {columns.find((c) => c.id === "name")?.isVisible && (
                  <SortableTableHead
                    title="Employee Name"
                    currentSortKey={sort}
                    sortUpKey="name-asc"
                    sortDownKey="name-desc"
                    onSort={setSort}
                    align="start"
                  />
                )}
                {columns.find((c) => c.id === "date")?.isVisible && (
                  <SortableTableHead
                    title="Date"
                    currentSortKey={sort}
                    sortUpKey="date-asc"
                    sortDownKey="date-desc"
                    onSort={setSort}
                  />
                )}
                {columns.find((c) => c.id === "status")?.isVisible && (
                  <SortableTableHead
                    title="Status"
                    currentSortKey={sort}
                    sortUpKey="status-asc"
                    sortDownKey="status-desc"
                    onSort={setSort}
                  />
                )}
                {columns.find((c) => c.id === "hours")?.isVisible && (
                  <SortableTableHead
                    title="Hours"
                    currentSortKey={sort}
                    sortUpKey="hours-asc"
                    sortDownKey="hours-desc"
                    onSort={setSort}
                    align="end"
                  />
                )}
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                {columns.find((c) => c.id === "name")?.isVisible && (
                  <TableCell className="font-medium">Ahmed Al-Sijil</TableCell>
                )}
                {columns.find((c) => c.id === "date")?.isVisible && (
                  <TableCell className="text-center">2026-11-10</TableCell>
                )}
                {columns.find((c) => c.id === "status")?.isVisible && (
                  <TableCell className="text-center text-success font-medium">On Time</TableCell>
                )}
                {columns.find((c) => c.id === "hours")?.isVisible && (
                  <TableCell className="text-end">8.5 hrs</TableCell>
                )}
              </TableRow>
              <TableRow>
                {columns.find((c) => c.id === "name")?.isVisible && (
                  <TableCell className="font-medium">Sara Mansour</TableCell>
                )}
                {columns.find((c) => c.id === "date")?.isVisible && (
                  <TableCell className="text-center">2026-11-10</TableCell>
                )}
                {columns.find((c) => c.id === "status")?.isVisible && (
                  <TableCell className="text-center text-warning font-medium">Late (15m)</TableCell>
                )}
                {columns.find((c) => c.id === "hours")?.isVisible && (
                  <TableCell className="text-end">7.75 hrs</TableCell>
                )}
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    );
  },
};

export const CollapsibleAndGroups: Story = {
  render: () => (
    <div className="space-y-6 max-w-xl">
      <CollapsibleCard
        title="Leave Balance & Allocations"
        description="Employee annual leaves and remaining vacation days."
      >
        <p className="text-sm text-foreground">
          Annual Leave: 21 days remaining out of 30 days granted.
        </p>
      </CollapsibleCard>

      <div className="space-y-2">
        <h4 className="text-sm font-semibold text-foreground">Button Group</h4>
        <ButtonGroup>
          <Button variant="outline" size="sm">Day</Button>
          <Button variant="outline" size="sm">Week</Button>
          <Button variant="outline" size="sm">Month</Button>
          <ButtonGroupSeparator />
          <ButtonGroupText>Year 2026</ButtonGroupText>
        </ButtonGroup>
      </div>

      <div className="space-y-2">
        <h4 className="text-sm font-semibold text-foreground">Multi-Select Dropdown with Badges</h4>
        <MultiSelectDropdown
          placeholder="Filter by departments..."
          options={[
            { id: "engineering", label: "Engineering", color: "#3b82f6" },
            { id: "design", label: "Product Design", color: "#10b981" },
            { id: "hr", label: "Human Resources", color: "#f59e0b" },
            { id: "finance", label: "Finance & Accounting", color: "#8b5cf6" },
          ]}
        />
      </div>
    </div>
  ),
};

export const ChartEcosystem: Story = {
  render: () => {
    const chartConfig: ChartConfig = {
      hours: { label: "Logged Hours", color: "var(--primary)" },
    };

    const data = [
      { day: "Sun", hours: 8 },
      { day: "Mon", hours: 8.5 },
      { day: "Tue", hours: 7.5 },
      { day: "Wed", hours: 9 },
      { day: "Thu", hours: 8 },
    ];

    return (
      <div className="max-w-2xl space-y-4">
        <ChartCard
          title="Weekly Attendance & Logged Hours"
          description="Daily tracked hours against policy targets"
          actions={<Button variant="outline" size="xs">Export CSV</Button>}
        >
          <ChartContainer config={chartConfig} className="h-64 w-full">
            <BarChart data={data}>
              <ChartDefs />
              <XAxis dataKey="day" stroke="var(--muted-foreground)" />
              <YAxis stroke="var(--muted-foreground)" />
              <Bar dataKey="hours" fill="url(#diagonalHatchOvertime)" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ChartContainer>

          <div className="mt-3 flex justify-end">
            <ChartLegends
              title="Chart Legend"
              items={[
                { label: "Standard Work", color: "var(--primary)", type: "solid" },
                { label: "Overtime Hatch", color: "var(--primary)", type: "hatched" },
                { label: "Late Exception", color: "var(--color-danger)", type: "bordered" },
              ]}
            />
          </div>
        </ChartCard>
      </div>
    );
  },
};

export const SidebarEcosystem: Story = {
  render: () => {
    const navItems = [
      {
        title: "Dashboard",
        url: "#",
        icon: Home,
        isActive: true,
      },
      {
        title: "Employees & Time Off",
        url: "#",
        icon: Users,
        items: [
          { title: "Attendance Sheets", url: "#", isActive: true },
          { title: "Time Off Requests", url: "#" },
          { title: "Public Holidays", url: "#" },
        ],
      },
      {
        title: "Calendar Schedule",
        url: "#",
        icon: Calendar,
      },
      {
        title: "Administration",
        url: "#",
        icon: Settings,
        items: [
          { title: "Attendance Policies", url: "#" },
          { title: "Work Shifts", url: "#" },
        ],
      },
    ];

    return (
      <div className="h-[550px] border border-border rounded-2xl overflow-hidden flex bg-background">
        <SidebarProvider defaultOpen={true}>
          <Sidebar collapsible="icon">
            <SidebarHeader>
              <TeamSwitcher
                brand={{
                  name: "Sijil HR",
                  subtitle: "Enterprise Suite",
                }}
              />
            </SidebarHeader>
            <SidebarContent>
              <NavMain items={navItems} />
            </SidebarContent>
            <SidebarFooter>
              <NavUser
                user={{
                  name: "Dimo Admin",
                  email: "dimo@sijil.com",
                  initials: "DA",
                }}
              />
            </SidebarFooter>
          </Sidebar>
          <div className="flex-1 p-6 bg-card m-2 rounded-xl border border-border">
            <h3 className="font-semibold text-lg text-foreground">Main App Workspace</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Collapsible sidebar navigation with sub-menus, brand header, and user footer.
            </p>
          </div>
        </SidebarProvider>
      </div>
    );
  },
};

