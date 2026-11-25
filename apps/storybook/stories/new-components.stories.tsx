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
  type GroupVariant,
} from "@sijil/ui";
import {
  ChartDefs,
  ChartLegends,
  ChartCard,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@sijil/ui/chart";
import { BarChart, Bar, XAxis, YAxis } from "recharts";
import {
  BarChart3,
  Calendar,
  CalendarCheck,
  CalendarClock,
  ClipboardList,
  Clock,
  Columns3,
  FileCheck,
  FileText,
  LayoutDashboard,
  ListTodo,
  MonitorPlay,
  Palmtree,
  Parasol,
  Scale,
  ScrollText,
  ShieldCheck,
  ShieldUser,
  UserCog,
  Users,
} from "lucide-react";
import { usePreviewTheme } from "../.storybook/preview-theme";

const meta: Meta = {
  title: "Components/Extended Ecosystem",
  parameters: {
    layout: "padded",
  },
};

export default meta;
type Story = StoryObj;

export const ThemeAndLanguageToggles: Story = {
  render: function ThemeAndLanguageToggles() {
    const { theme, cycleTheme } = usePreviewTheme();
    const [locale, setLocale] = React.useState<"ar" | "en">("en");
    return (
      <div className="space-y-6 max-w-xl">
        <div className="p-4 rounded-2xl bg-card space-y-4">
          <h3 className="font-semibold text-foreground">Theme & Language Toggles</h3>
          <p className="text-sm text-muted-foreground">
            Switch between Light, Dark, and Dark-Blue themes, and toggle between Arabic & English.
          </p>
          <div className="flex items-center gap-3">
            <ModeToggle currentTheme={theme.value} onToggle={cycleTheme} />
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
          showLanguageSwitcher={false}
          showModeToggle={false}
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
        <div className="flex items-center gap-2">
          <h3 className="font-semibold text-foreground">Sortable Table with Column Visibility</h3>
          <TableColumnFilter
            title="Columns"
            columns={columns.map((c) => ({
              id: c.id,
              label: c.label,
              isVisible: c.isVisible,
              toggleVisibility: () => toggleCol(c.id),
            }))}
          />
        </div>

        <div className="rounded-2xl bg-card overflow-hidden">
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

export const CustomColumnFilter: Story = {
  render: function CustomColumnFilter() {
    const [showHours, setShowHours] = React.useState(true);

    return (
      <div className="max-w-md space-y-2">
        <div className="flex justify-end">
          <TableColumnFilter
            title="Columns"
            side="bottom"
            align="end"
            trigger={
              <Button variant="outline" size="sm">
                <Columns3 aria-hidden="true" /> Visible columns
              </Button>
            }
            columns={[
              { id: "employee", label: "Employee", isVisible: true, canHide: false, toggleVisibility: () => {} },
              { id: "hours", label: "Logged hours", isVisible: showHours, toggleVisibility: () => setShowHours(!showHours) },
            ]}
          />
        </div>
        <p className="text-sm text-muted-foreground" role="status">
          Visible columns: Employee{showHours && ", Logged hours"}
        </p>
      </div>
    );
  },
};

const departmentOptions = [
  { id: "engineering", label: "Engineering", color: "var(--color-info)" },
  { id: "design", label: "Product Design", color: "var(--color-success)" },
  { id: "hr", label: "Human Resources", color: "var(--color-warning)" },
  { id: "finance", label: "Finance & Accounting", color: "var(--color-danger)" },
];

type GroupExampleArgs = {
  collapsibleVariant: GroupVariant;
  buttonGroupVariant: GroupVariant;
};

export const CollapsibleAndGroups: StoryObj<GroupExampleArgs> = {
  name: "Collapsible and Groups (Card)",
  args: { collapsibleVariant: "card", buttonGroupVariant: "card" },
  argTypes: {
    collapsibleVariant: { name: "Collapsible variant", control: "inline-radio", options: ["plain", "card"] },
    buttonGroupVariant: { name: "Button Group variant", control: "inline-radio", options: ["plain", "card"] },
  },
  render: ({ collapsibleVariant, buttonGroupVariant }) => (
    <div className="space-y-6 max-w-xl">
      <CollapsibleCard
        variant={collapsibleVariant}
        title="Leave Balance & Allocations"
        description="Employee annual leaves and remaining vacation days."
      >
        <p className="text-sm text-foreground">
          Annual Leave: 21 days remaining out of 30 days granted.
        </p>
      </CollapsibleCard>

      <div className="space-y-2">
        <h4 className="text-sm font-semibold text-foreground">Button Group</h4>
        <ButtonGroup variant={buttonGroupVariant}>
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
          options={departmentOptions}
          defaultValue={[departmentOptions[1], departmentOptions[3]]}
        />
      </div>
    </div>
  ),
};

export const PlainCollapsibleAndGroups: StoryObj<GroupExampleArgs> = {
  ...CollapsibleAndGroups,
  name: "Collapsible and Groups (Plain)",
  args: { collapsibleVariant: "plain", buttonGroupVariant: "plain" },
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
              <ChartTooltip content={<ChartTooltipContent />} />
              <ChartLegend content={<ChartLegendContent />} />
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
        title: "Attendance",
        url: "#attendance",
        icon: CalendarClock,
        items: [
          { title: "Chart", url: "#attendance", icon: BarChart3, isActive: true },
          { title: "Employees charts", url: "#attendance-employees-log", icon: Users },
          { title: "Sheet", url: "#attendance-my", icon: CalendarCheck },
          { title: "Employees sheets", url: "#attendance-employees-sheets", icon: ClipboardList },
        ],
      },
      {
        title: "Time off",
        url: "#time-off",
        icon: Parasol,
        items: [
          { title: "Overview", url: "#time-off", icon: LayoutDashboard },
          { title: "My requests", url: "#time-off-my", icon: FileText },
          { title: "My holidays", url: "#time-off-my-holidays", icon: Palmtree },
          { title: "Employee requests", url: "#time-off-employee-requests", icon: FileCheck },
        ],
      },
      {
        title: "Session tracker",
        url: "#tracker",
        icon: ScrollText,
        items: [
          { title: "My activity", url: "#tracker-my", icon: Clock },
        ],
      },
      {
        title: "Team monitor",
        url: "#team",
        icon: Users,
        items: [
          { title: "Users", url: "#team", icon: Users },
          { title: "Apps", url: "#team-apps", icon: MonitorPlay },
          { title: "Tasks", url: "#team-tasks", icon: ListTodo },
        ],
      },
      {
        title: "Administration",
        url: "#administration",
        icon: ShieldUser,
        items: [
          { title: "Employees", url: "#administration-employees", icon: UserCog },
          { title: "Attendance policies", url: "#administration-attendance-policies", icon: Scale },
          { title: "Work schedules", url: "#administration-work-schedules", icon: Calendar },
          { title: "Holidays", url: "#administration-holidays", icon: Palmtree },
          { title: "Step-up demo", url: "#step-up-demo", icon: ShieldCheck },
        ],
      },
    ];

    return (
      <div className="h-[550px] rounded-2xl overflow-hidden flex bg-background">
        <SidebarProvider defaultOpen={true}>
          <Sidebar collapsible="icon" className="max-w-[var(--sidebar-width)]">
            <SidebarHeader>
              <TeamSwitcher
                brand={{
                  name: "Sijil HR",
                  subtitle: "Enterprise Suite",
                  logoSrc: new URL("./assets/sijil-logo.svg", import.meta.url).href,
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
          <div className="flex-1 p-6 bg-card m-2 rounded-2xl">
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

