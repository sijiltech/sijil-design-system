import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { Badge } from "@sijil/ui";

const meta: Meta<typeof Badge> = {
  title: "Components/Badge",
  component: Badge,
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "secondary", "destructive", "outline"],
    },
  },
};

export default meta;

export const Variants: StoryObj = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      <Badge variant="default">Active</Badge>
      <Badge variant="secondary">Pending Review</Badge>
      <Badge variant="outline">On Leave</Badge>
      <Badge variant="destructive">Terminated</Badge>
    </div>
  ),
};
