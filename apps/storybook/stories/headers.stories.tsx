import type { Meta, StoryObj } from "@storybook/react";
import { useGlobals } from "@storybook/preview-api";
import * as React from "react";
import { ArrowLeft, RefreshCw, Users } from "lucide-react";
import {
  AppHeader,
  Badge,
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  LanguageSwitcher,
  ModeToggle,
  ScreenContainer,
  ScreenFrame,
  ScreenHeader,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Sidebar,
  SidebarBrand,
  SidebarContent,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@sijil/ui";
import { usePreviewTheme } from "../.storybook/preview-theme";

const meta = {
  title: "Components/Headers",
  parameters: { screenPage: true },
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

export const Application: Story = {
  name: "App Header",
  parameters: { screenPage: false, showPreviewTheme: false },
  render: function Application() {
    const [globals, updateGlobals] = useGlobals();
    const { theme, cycleTheme } = usePreviewTheme();
    const arabic = globals.direction === "rtl";
    const title = arabic ? "سجل للموارد البشرية" : "Sijil HR";
    const employees = arabic ? "الموظفون" : "Employees";
    const description = arabic ? "إدارة سجلات الموظفين والصلاحيات." : "Manage employee records and access.";

    return (
      <div className="relative rounded-2xl [transform:translateZ(0)]">
        <SidebarProvider defaultOpen={false} className="min-h-96 overflow-hidden rounded-2xl border">
          <Sidebar collapsible="icon" className="h-full">
            <SidebarHeader>
              <SidebarBrand brand={{ name: title, logoSrc: new URL("./assets/sijil-logo.svg", import.meta.url).href }} />
            </SidebarHeader>
            <SidebarContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive>
                    <a href="#employees">
                      <Users aria-hidden="true" />
                      <span>{employees}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarContent>
          </Sidebar>
          <SidebarInset className="min-w-0">
            <ScreenFrame width="full" className="px-4 sm:px-6">
              <AppHeader
                title={title}
                subtitle={arabic ? "إدارة شؤون الموظفين" : "People operations"}
                maxWidth="max-w-none"
                className="rounded-none px-0 sm:px-0"
                showLanguageSwitcher={false}
                showModeToggle={false}
                actions={
                  <>
                    <LanguageSwitcher
                      currentLocale={arabic ? "ar" : "en"}
                      onLocaleChange={(locale) => updateGlobals({ direction: locale === "ar" ? "rtl" : "ltr" })}
                    />
                    <ModeToggle currentTheme={theme.value} onToggle={cycleTheme} />
                  </>
                }
              />
              <ScreenContainer className="px-0 shell:px-0">
                <ScreenHeader id="employees" title={employees} description={description} />
              </ScreenContainer>
            </ScreenFrame>
          </SidebarInset>
        </SidebarProvider>
      </div>
    );
  },
};

export const EmployeeAdministration: Story = {
  name: "Page Header · Employees",
  render: function EmployeeAdministration() {
    const [syncOption, setSyncOption] = React.useState("");

    return (
      <>
        <ScreenHeader
          title="Employees"
          description="Manage employee records and access."
          actions={
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button><RefreshCw aria-hidden="true" />Sync employees</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onSelect={() => setSyncOption("Apply dashboard roles")}>Apply dashboard roles</DropdownMenuItem>
                <DropdownMenuItem onSelect={() => setSyncOption("Apply Odoo roles")}>Apply Odoo roles</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          }
        />
        {syncOption && <p role="status" className="text-sm">{syncOption} selected.</p>}
      </>
    );
  },
};

export const LeaveRequests: Story = {
  name: "Page Header · Leave Requests",
  render: () => (
    <ScreenHeader
      title="My requests"
      actions={
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Request time off</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Request time off</DialogTitle>
              <DialogDescription>Choose the type of leave for your request.</DialogDescription>
            </DialogHeader>
            <Select>
              <SelectTrigger aria-label="Leave type"><SelectValue placeholder="Select leave type" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="annual">Annual leave</SelectItem>
                <SelectItem value="personal">Personal leave</SelectItem>
              </SelectContent>
            </Select>
          </DialogContent>
        </Dialog>
      }
    />
  ),
};

export const AttendanceSheet: Story = {
  name: "Page Header · Attendance Sheet",
  render: function AttendanceSheet() {
    const [employee, setEmployee] = React.useState("maya");

    return (
      <ScreenHeader
        title="Attendance sheet"
        actions={
          <Select value={employee} onValueChange={setEmployee}>
            <SelectTrigger aria-label="Employee" className="w-48"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="maya">Maya Ali</SelectItem>
              <SelectItem value="leila">Leila Saleh</SelectItem>
            </SelectContent>
          </Select>
        }
      >
        <Badge variant={employee === "maya" ? "success" : "warning"}>
          {employee === "maya" ? "Finalized" : "Estimation"}
        </Badge>
      </ScreenHeader>
    );
  },
};

export const MobileProfile: Story = {
  name: "Page Header · Mobile Profile",
  render: function MobileProfile() {
    const [showProfile, setShowProfile] = React.useState(true);

    return (
      <div className="app-shell-mobile">
        {showProfile ? (
          <ScreenHeader
            title="Profile"
            eyebrow={
              <Button variant="link" className="h-auto px-0" onClick={() => setShowProfile(false)}>
                <ArrowLeft aria-hidden="true" className="rtl:rotate-180" />
                Account
              </Button>
            }
          />
        ) : (
          <ScreenHeader title="Account" actions={<Button variant="outline" onClick={() => setShowProfile(true)}>Profile</Button>} />
        )}
      </div>
    );
  },
};
