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
      options: ["default", "secondary", "destructive", "outline"],
    },
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
