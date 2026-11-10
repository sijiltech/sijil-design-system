import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  CardAction,
  Button,
  Badge,
} from "@sijil/ui";

const meta: Meta = {
  title: "Components/Card",
};

export default meta;

export const Default: StoryObj = {
  render: () => (
    <div className="max-w-md">
      <Card>
        <CardHeader>
          <CardTitle>Employee Profile</CardTitle>
          <CardDescription>Department: Engineering</CardDescription>
          <CardAction>
            <Badge variant="secondary">Full Time</Badge>
          </CardAction>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Review detailed attendance metrics, leave balances, and scheduled shifts.
          </p>
        </CardContent>
        <CardFooter className="justify-between">
          <Button variant="ghost" size="sm">Cancel</Button>
          <Button size="sm">View History</Button>
        </CardFooter>
      </Card>
    </div>
  ),
};
