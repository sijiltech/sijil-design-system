import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { Button } from "@sijil/ui";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@sijil/ui/command";

const meta = { title: "Components/Command" } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

function SearchItems({ onSelect }: { onSelect: (item: string) => void }) {
  return (
    <>
      <CommandInput placeholder="Search pages and actions..." />
      <CommandList>
        <CommandEmpty>No matching commands.</CommandEmpty>
        <CommandGroup heading="Pages">
          <CommandItem onSelect={() => onSelect("Dashboard")}>Dashboard</CommandItem>
          <CommandItem onSelect={() => onSelect("Leave requests")}>Leave requests</CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Actions">
          <CommandItem onSelect={() => onSelect("New request")}>
            New request<CommandShortcut>↵</CommandShortcut>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </>
  );
}

export const InlineSearch: Story = {
  render: function InlineSearch() {
    const [selection, setSelection] = React.useState("");
    return (
      <div className="max-w-md space-y-2">
        <Command label="Search commands" className="shadow-sm">
          <SearchItems onSelect={setSelection} />
        </Command>
        {selection && <p className="text-sm" role="status">Selected {selection}.</p>}
      </div>
    );
  },
};

export const PaletteDialog: Story = {
  name: "Command Dialog",
  render: function PaletteDialog() {
    const [open, setOpen] = React.useState(false);
    const [selection, setSelection] = React.useState("");

    return (
      <div className="space-y-2">
        <Button onClick={() => setOpen(true)}>Open command palette</Button>
        {selection && <p className="text-sm" role="status">Selected {selection}.</p>}
        <CommandDialog open={open} onOpenChange={setOpen}>
          <SearchItems onSelect={(value) => {
            setSelection(value);
            setOpen(false);
          }} />
        </CommandDialog>
      </div>
    );
  },
};
