import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  Button,
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
  Popover,
  PopoverAnchor,
  PopoverContent,
  PopoverTrigger,
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@sijil/ui";

const meta = { title: "Components/Overlays" } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

export const ConfirmAction: Story = {
  name: "Alert Dialog",
  render: function ConfirmAction() {
    const [removed, setRemoved] = React.useState(false);

    return (
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="destructive" disabled={removed}>Remove draft</Button>
        </AlertDialogTrigger>
        {removed && <p className="mt-2 text-sm" role="status">Draft removed.</p>}
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remove this draft?</AlertDialogTitle>
            <AlertDialogDescription>The unsent request will be deleted.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Keep draft</AlertDialogCancel>
            <AlertDialogAction onClick={() => setRemoved(true)}>Remove</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  },
};

export const DetailsSheet: Story = {
  name: "Sheet",
  render: () => (
    <Sheet>
      <SheetTrigger asChild><Button variant="outline">Open request details</Button></SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Leave request</SheetTitle>
          <SheetDescription>Review the request details.</SheetDescription>
        </SheetHeader>
        <dl className="grid gap-2 px-4 text-sm">
          <dt className="font-medium">Requested by</dt>
          <dd>Maya Ali</dd>
          <dt className="font-medium">Duration</dt>
          <dd>Three business days</dd>
        </dl>
        <SheetFooter>
          <SheetClose asChild><Button variant="outline">Done</Button></SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ),
};

export const AnchoredPopover: Story = {
  name: "Popover",
  render: () => (
    <Popover>
      <div className="flex items-center gap-3">
        <PopoverAnchor asChild><span className="rounded-xl bg-card px-3 py-2 text-sm">Annual leave</span></PopoverAnchor>
        <PopoverTrigger asChild><Button variant="outline">View balance</Button></PopoverTrigger>
      </div>
      <PopoverContent align="start">
        <p className="text-sm font-medium">12 days remaining</p>
        <p className="text-sm text-muted-foreground">Current annual leave balance.</p>
      </PopoverContent>
    </Popover>
  ),
};

export const HoverOrFocus: Story = {
  name: "Tooltip",
  render: () => (
    <div className="py-16">
      <Tooltip>
        <TooltipTrigger asChild><Button variant="outline">Pending approval</Button></TooltipTrigger>
        <TooltipContent sideOffset={8}>Your manager has not reviewed this request yet.</TooltipContent>
      </Tooltip>
    </div>
  ),
};

export const MenuWithOptions: Story = {
  name: "Dropdown Menu",
  render: function MenuWithOptions() {
    const [showArchived, setShowArchived] = React.useState(false);
    const [density, setDensity] = React.useState("comfortable");
    const [action, setAction] = React.useState("");

    return (
      <div className="space-y-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild><Button variant="outline">View options</Button></DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-56">
            <DropdownMenuLabel>Preferences</DropdownMenuLabel>
            <DropdownMenuGroup>
              <DropdownMenuCheckboxItem checked={showArchived} onCheckedChange={setShowArchived}>
                Show archived requests
              </DropdownMenuCheckboxItem>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>Row density</DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent>
                    <DropdownMenuRadioGroup value={density} onValueChange={setDensity}>
                      <DropdownMenuRadioItem value="comfortable">Comfortable</DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="compact">Compact</DropdownMenuRadioItem>
                    </DropdownMenuRadioGroup>
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onSelect={() => setAction("View refreshed.")}>
              Refresh view <DropdownMenuShortcut>↵</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <p className="text-sm text-muted-foreground" role="status">
          {density === "compact" ? "Compact" : "Comfortable"} rows · Archived {showArchived ? "shown" : "hidden"}. {action}
        </p>
      </div>
    );
  },
};
