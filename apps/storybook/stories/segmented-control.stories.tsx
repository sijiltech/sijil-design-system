import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { SegmentedControl } from "@sijil/ui";

const meta: Meta = {
  title: "Components/SegmentedControl",
};

export default meta;

export const ViewMode: StoryObj = {
  render: () => {
    const [mode, setMode] = React.useState<"day" | "week" | "month">("month");

    return (
      <div className="max-w-xs space-y-4">
        <SegmentedControl
          ariaLabel="Calendar view mode"
          value={mode}
          onChange={setMode}
          options={[
            { value: "day", label: "Day" },
            { value: "week", label: "Week" },
            { value: "month", label: "Month" },
          ]}
        />
        <div className="text-xs text-muted-foreground">Current selection: {mode}</div>
      </div>
    );
  },
};
