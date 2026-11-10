import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { EmptyState, Button } from "@sijil/ui";

const meta: Meta = {
  title: "Components/EmptyState",
};

export default meta;

export const Default: StoryObj = {
  render: () => (
    <EmptyState
      title="No Time-off Requests Found"
      description="You currently have no pending or archived leave requests for the selected period."
      action={<Button size="sm">Create New Request</Button>}
    />
  ),
};
