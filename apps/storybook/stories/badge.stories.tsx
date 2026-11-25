import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { Badge } from "@sijil/ui";

const meta: Meta<typeof Badge> = {
  title: "Components/Badge",
  component: Badge,
  args: {
    variant: "default",
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "secondary", "destructive", "outline", "success", "warning", "info", "subtle", "success-subtle", "warning-subtle", "destructive-subtle", "info-subtle"],
    },
    bordered: { control: "boolean" },
  },
};

export default meta;

export const Default: StoryObj<typeof Badge> = {
  args: {
    children: "Badge",
  },
};

export const Variants: StoryObj<typeof Badge> = {
  render: (args) => (
    <div className="flex flex-wrap gap-3">
      <Badge {...args} variant="default">Active</Badge>
      <Badge {...args} variant="secondary">Pending Review</Badge>
      <Badge {...args} variant="outline">On Leave</Badge>
      <Badge {...args} variant="destructive">Terminated</Badge>
    </div>
  ),
};

export const BorderedStatuses: StoryObj<typeof Badge> = {
  render: (args) => (
    <div className="flex flex-wrap gap-3">
      <Badge {...args} variant="warning-subtle" bordered>Estimation</Badge>
      <Badge {...args} variant="success-subtle" bordered>Finalized</Badge>
    </div>
  ),
};
