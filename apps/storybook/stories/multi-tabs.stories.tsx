import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { MultiTabs, type MultiTabItem } from "@sijil/ui";

const meta: Meta = {
  title: "Components/MultiTabs",
};

export default meta;

export const Switcher: StoryObj = {
  render: () => {
    const [selected, setSelected] = React.useState("overview");
    const items: MultiTabItem[] = [
      { value: "overview", label: "Overview" },
      { value: "calendar", label: "Monthly Calendar" },
      { value: "history", label: "Attendance Logs" },
      { value: "policies", label: "Policies", disabled: true },
    ];

    return (
      <div className="space-y-4">
        <MultiTabs
          list={items}
          selectedTab={selected}
          action={(val) => setSelected(String(val))}
        />
        <div className="p-4 rounded-xl bg-card border border-border text-sm">
          Active tab: <span className="font-semibold">{selected}</span>
        </div>
      </div>
    );
  },
};
