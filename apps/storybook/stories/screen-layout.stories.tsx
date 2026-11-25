import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { Bell, Home, LogOut, Settings } from "lucide-react";
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Input,
  MobileBottomNav,
  MobileSettingsRow,
  MobileSettingsSection,
  PullToRefreshIndicator,
  ScreenContainer,
  ScreenGrid,
  ScreenHeader,
  ScreenSection,
  ScreenToolbar,
  type PullToRefreshPhase,
} from "@sijil/ui";

const meta = { title: "Components/Screen Layout and Mobile" } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

export const FilterableScreen: Story = {
  name: "List page",
  parameters: { screenPage: true },
  render: function FilterableScreen() {
    const [filter, setFilter] = React.useState("");

    return (
      <>
        <ScreenHeader title="Leave requests" description="Track requests submitted by your team." />
        <ScreenSection aria-labelledby="requests-heading">
          <h2 id="requests-heading" className="font-semibold">Requests</h2>
          <ScreenToolbar actions={<Button variant="outline" onClick={() => setFilter("")}>Clear filter</Button>}>
            <Input
              aria-label="Filter requests by employee"
              placeholder="Filter by employee"
              value={filter}
              onChange={(event) => setFilter(event.target.value)}
              className="sm:max-w-xs"
            />
          </ScreenToolbar>
          <Card>
            <CardContent>
              <ul className="grid gap-2 text-sm" aria-label="Requests">
                {["Maya Ali — Annual leave", "Leila Saleh — Personal leave"]
                  .filter((item) => item.toLowerCase().includes(filter.toLowerCase()))
                  .map((item) => <li key={item}>{item}</li>)}
              </ul>
            </CardContent>
          </Card>
        </ScreenSection>
      </>
    );
  },
};

export const OverviewScreen: Story = {
  name: "Overview page",
  parameters: { screenPage: true },
  render: function OverviewScreen() {
    const [showTotals, setShowTotals] = React.useState(true);

    return (
      <>
        <ScreenHeader
          title="Attendance overview"
          description="Review attendance across the current period."
          actions={
            <Button variant="outline" onClick={() => setShowTotals(!showTotals)}>
              {showTotals ? "Hide summary" : "Show summary"}
            </Button>
          }
        />
        {showTotals && (
          <ScreenSection aria-labelledby="summary-heading">
            <h2 id="summary-heading" className="font-semibold">This week</h2>
            <ScreenGrid>
              {[
                { label: "Present", total: 48 },
                { label: "On leave", total: 4 },
                { label: "Absent", total: 2 },
              ].map(({ label, total }) => (
                <Card key={label}>
                  <CardHeader><CardTitle>{label}</CardTitle></CardHeader>
                  <CardContent className="text-2xl font-semibold tabular-nums">{total}</CardContent>
                </Card>
              ))}
            </ScreenGrid>
          </ScreenSection>
        )}
      </>
    );
  },
};

export const MobileSettings: Story = {
  name: "Mobile Bottom Nav and Settings",
  render: function MobileSettings() {
    const [activeTab, setActiveTab] = React.useState("settings");
    const [alerts, setAlerts] = React.useState(true);
    const [signedOut, setSignedOut] = React.useState(false);

    return (
      <div className="relative flex min-h-80 max-w-sm flex-col rounded-2xl bg-foreground/5">
        <ScreenContainer>
          <ScreenHeader title={activeTab === "home" ? "Home" : "Settings"} />
          {activeTab === "settings" ? (
            <MobileSettingsSection title="Account">
              <MobileSettingsRow
                icon={Bell}
                label="Notifications"
                onClick={() => setAlerts(!alerts)}
                badge={<Badge variant="secondary">{alerts ? "On" : "Off"}</Badge>}
              />
              <MobileSettingsRow icon={LogOut} label="Sign out" tone="destructive" onClick={() => setSignedOut(true)} />
            </MobileSettingsSection>
          ) : (
            <p className="text-sm">Your request overview.</p>
          )}
          {signedOut && <p role="status" className="text-sm">Signed out of the demo.</p>}
        </ScreenContainer>
        <MobileBottomNav
          aria-label="Mobile navigation"
          className="static"
          tabs={[
            { id: "home", label: "Home", icon: Home, isActive: activeTab === "home", onClick: () => setActiveTab("home") },
            { id: "settings", label: "Settings", icon: Settings, isActive: activeTab === "settings", onClick: () => setActiveTab("settings") },
          ]}
        />
      </div>
    );
  },
};

const refreshPhases = ["idle", "pulling", "armed", "refreshing"] as const;

export const RefreshIndicator: Story = {
  name: "Pull to Refresh Indicator",
  render: function RefreshIndicator() {
    const [phase, setPhase] = React.useState<PullToRefreshPhase>("pulling");
    const position = phase === "idle" ? "0px" : phase === "pulling" ? "54px" : "70px";
    const progress = phase === "idle" ? 0 : phase === "pulling" ? 0.6 : 1;

    return (
      <div className="max-w-sm space-y-3">
        <div className="flex flex-wrap gap-2" aria-label="Refresh phase">
          {refreshPhases.map((value) => (
            <Button
              key={value}
              size="sm"
              variant={phase === value ? "default" : "outline"}
              aria-pressed={phase === value}
              onClick={() => setPhase(value)}
            >
              {value}
            </Button>
          ))}
        </div>
        <div
          className="relative overflow-hidden rounded-2xl bg-card px-4 pb-4 pt-24"
          style={{ "--ptr-y": position, "--ptr-progress": progress } as React.CSSProperties}
        >
          <PullToRefreshIndicator phase={phase} />
          <p className="text-sm">Recent requests</p>
        </div>
      </div>
    );
  },
};
