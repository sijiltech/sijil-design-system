import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { Button } from "@sijil/ui";

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  args: {
    variant: "default",
    size: "default",
    disabled: false,
    noShimmer: true,
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "toolbar", "destructive", "outline", "bordered", "secondary", "ghost", "link"],
    },
    size: {
      control: "select",
      options: ["default", "xs", "sm", "lg", "icon", "icon-sm", "icon-lg"],
    },
    type: {
      control: "select",
      options: ["", "success", "warning", "destructive", "submit"],
    },
    disabled: { control: "boolean" },
    fullWidth: { control: "boolean" },
    noShimmer: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    children: "Button",
  },
};

export const Variants: Story = {
  render: (args) => (
    <div className="flex flex-wrap items-center gap-4">
      <Button {...args} variant="default">Default</Button>
      <Button {...args} variant="secondary">Secondary</Button>
      <Button {...args} variant="outline">Outline</Button>
      <Button {...args} variant="destructive">Destructive</Button>
      <Button {...args} variant="ghost">Ghost</Button>
      <Button {...args} variant="link">Link</Button>
    </div>
  ),
};

export const SemanticActions: Story = {
  render: (args) => (
    <div className="flex flex-wrap items-center gap-4">
      <Button {...args} type="success">Approve Request</Button>
      <Button {...args} type="warning">Pending Notice</Button>
      <Button {...args} type="submit">Submit Form</Button>
      <Button {...args} type="destructive">Refuse Request</Button>
    </div>
  ),
};

export const BorderedActions: Story = {
  render: (args) => (
    <div className="grid w-32 gap-2">
      <Button {...args} variant="bordered" size="xs" type="success" fullWidth>Request</Button>
      <Button {...args} variant="bordered" size="xs" type="warning" fullWidth>Edit</Button>
      <Button {...args} variant="bordered" size="xs" fullWidth disabled>Unavailable</Button>
    </div>
  ),
};

export const Sizes: Story = {
  render: (args) => (
    <div className="flex flex-wrap items-center gap-4">
      <Button {...args} size="xs">Extra Small</Button>
      <Button {...args} size="sm">Small</Button>
      <Button {...args} size="default">Default</Button>
      <Button {...args} size="lg">Large</Button>
    </div>
  ),
};
