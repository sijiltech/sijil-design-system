import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  Button,
} from "@sijil/ui";

const meta: Meta = {
  title: "Components/Dialog",
};

export default meta;

export const Interactive: StoryObj = {
  render: () => {
    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button>Open Modal Dialog</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Leave Request</DialogTitle>
            <DialogDescription>
              Are you sure you want to submit your annual leave request for 3 consecutive working days?
            </DialogDescription>
          </DialogHeader>
          <div className="py-4 text-sm">
            <div className="font-medium text-foreground">Requested Period:</div>
            <div className="text-muted-foreground">Nov 15, 2026 - Nov 18, 2026</div>
          </div>
          <DialogFooter>
            <Button variant="outline">Cancel</Button>
            <Button type="submit">Submit Request</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  },
};
