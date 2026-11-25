import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import {
  BarChart3,
  Calendar,
  CalendarCheck,
  CalendarClock,
  ClipboardList,
  Clock,
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
import {
  NavMain,
  NavUser,
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
  TeamSwitcher,
} from "@sijil/ui";

const meta = { title: "Components/Sidebar" } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

export const WithMenuGroups: Story = {
  render: function WithMenuGroups() {
    const [message, setMessage] = React.useState("Select a sidebar item.");
    const [active, setActive] = React.useState("Overview");

    const select = (title: string) => (event: React.MouseEvent) => {
      event.preventDefault();
      setActive(title);
      setMessage(`${title} selected.`);
    };

    return (
      <div className="relative max-w-4xl rounded-2xl bg-foreground/5 [transform:translateZ(0)]">
        <SidebarProvider className="min-h-96 overflow-hidden rounded-2xl">
          <Sidebar collapsible="icon" className="max-w-[var(--sidebar-width)]">
            <SidebarHeader>
              <TeamSwitcher
                brand={{
                  name: "Sijil HR",
                  subtitle: "People workspace",
                  logoSrc: new URL("./assets/sijil-logo.svg", import.meta.url).href,
                }}
              />
            </SidebarHeader>
            <SidebarContent>
              <NavMain
                items={[
                  {
                    title: "Attendance",
                    url: "#attendance",
                    icon: CalendarClock,
                    isActive: active === "Chart" || active === "Employees charts" || active === "Sheet" || active === "Employees sheets",
                    items: [
                      { title: "Chart", url: "#attendance", icon: BarChart3, isActive: active === "Chart" },
                      { title: "Employees charts", url: "#attendance-employees-log", icon: Users, isActive: active === "Employees charts" },
                      { title: "Sheet", url: "#attendance-my", icon: CalendarCheck, isActive: active === "Sheet" },
                      { title: "Employees sheets", url: "#attendance-employees-sheets", icon: ClipboardList, isActive: active === "Employees sheets" },
                    ],
                  },
                  {
                    title: "Time off",
                    url: "#time-off",
                    icon: Parasol,
                    isActive: active === "Overview" || active === "My requests" || active === "My holidays" || active === "Employee requests",
                    items: [
                      { title: "Overview", url: "#time-off", icon: LayoutDashboard, isActive: active === "Overview" },
                      { title: "My requests", url: "#time-off-my", icon: FileText, isActive: active === "My requests" },
                      { title: "My holidays", url: "#time-off-my-holidays", icon: Palmtree, isActive: active === "My holidays" },
                      { title: "Employee requests", url: "#time-off-employee-requests", icon: FileCheck, isActive: active === "Employee requests" },
                    ],
                  },
                  {
                    title: "Session tracker",
                    url: "#tracker",
                    icon: ScrollText,
                    isActive: active === "My activity",
                    items: [
                      { title: "My activity", url: "#tracker-my", icon: Clock, isActive: active === "My activity" },
                    ],
                  },
                  {
                    title: "Team monitor",
                    url: "#team",
                    icon: Users,
                    isActive: active === "Users" || active === "Apps" || active === "Tasks",
                    items: [
                      { title: "Users", url: "#team", icon: Users, isActive: active === "Users" },
                      { title: "Apps", url: "#team-apps", icon: MonitorPlay, isActive: active === "Apps" },
                      { title: "Tasks", url: "#team-tasks", icon: ListTodo, isActive: active === "Tasks" },
                    ],
                  },
                  {
                    title: "Administration",
                    url: "#administration",
                    icon: ShieldUser,
                    isActive: active === "Employees" || active === "Attendance policies" || active === "Work schedules" || active === "Holidays" || active === "Step-up demo",
                    items: [
                      { title: "Employees", url: "#administration-employees", icon: UserCog, isActive: active === "Employees" },
                      { title: "Attendance policies", url: "#administration-attendance-policies", icon: Scale, isActive: active === "Attendance policies" },
                      { title: "Work schedules", url: "#administration-work-schedules", icon: Calendar, isActive: active === "Work schedules" },
                      { title: "Holidays", url: "#administration-holidays", icon: Palmtree, isActive: active === "Holidays" },
                      { title: "Step-up demo", url: "#step-up-demo", icon: ShieldCheck, isActive: active === "Step-up demo" },
                    ],
                  },
                ]}
                renderLink={({ href, children, className }) => (
                  <a
                    href={href}
                    className={className}
                    onClick={select(
                      href === "#attendance" ? "Chart"
                        : href === "#attendance-employees-log" ? "Employees charts"
                          : href === "#attendance-my" ? "Sheet"
                            : href === "#attendance-employees-sheets" ? "Employees sheets"
                              : href === "#time-off-my" ? "My requests"
                                : href === "#time-off-my-holidays" ? "My holidays"
                                  : href === "#time-off-employee-requests" ? "Employee requests"
                                    : href === "#tracker-my" ? "My activity"
                                      : href === "#team-apps" ? "Apps"
                                        : href === "#team-tasks" ? "Tasks"
                                          : href === "#team" ? "Users"
                                            : href === "#administration-employees" ? "Employees"
                                              : href === "#administration-attendance-policies" ? "Attendance policies"
                                                : href === "#administration-work-schedules" ? "Work schedules"
                                                  : href === "#administration-holidays" ? "Holidays"
                                                    : href === "#step-up-demo" ? "Step-up demo"
                                                      : "Overview",
                    )}
                  >
                    {children}
                  </a>
                )}
              />
            </SidebarContent>
            <SidebarFooter>
              <NavUser
                user={{ name: "Dimo Admin", email: "dimo@sijil.com", initials: "DA" }}
                labels={{ profile: "Profile", settings: "Manage account", logout: "Sign out" }}
                onSettingsClick={() => setMessage("Manage account selected.")}
                onLogoutClick={() => setMessage("Sign out selected.")}
              />
            </SidebarFooter>
          </Sidebar>
          <SidebarInset className="min-w-0 bg-background p-4">
            <SidebarTrigger />
            <p className="mt-4 text-sm" role="status">{message}</p>
          </SidebarInset>
        </SidebarProvider>
      </div>
    );
  },
};
