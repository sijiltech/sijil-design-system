import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { XIcon } from "lucide-react";
import {
  Button,
  cn,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
  Input,
  Label,
} from "@sijil/ui";
import { dialogBackdropClassName, dialogCloseIconClassName, dialogSurfaceClassName } from "../../../packages/ui/src/components/dialog";

type DialogStoryArgs = {
  title: string;
  description: string;
  showCloseButton: boolean;
  modal: boolean;
  width: "standard" | "wide";
};

const meta: Meta<DialogStoryArgs> = {
  title: "Components/Dialog",
  component: Dialog,
  tags: ["autodocs"],
  subcomponents: {
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
    DialogClose,
    DialogOverlay,
    DialogPortal,
  },
  args: {
    title: "Confirm leave request",
    description: "Review your request before sending it to your manager.",
    showCloseButton: true,
    modal: true,
    width: "standard",
  },
  argTypes: {
    title: { control: "text", description: "Text rendered by DialogTitle as the dialog's accessible name." },
    description: { control: "text", description: "Supporting text rendered by DialogDescription." },
    showCloseButton: { control: "boolean", description: "Shows the close icon provided by DialogContent." },
    modal: { control: "boolean", description: "Makes the background unavailable while the dialog is open." },
    width: {
      control: "inline-radio",
      options: ["standard", "wide"],
      description: "Applies a width class to DialogContent at the small breakpoint and above.",
    },
  },
  parameters: {
    docs: {
      description: {
        component: [
          "The Canvas shows the parts of the Dialog inline. Open the live examples to test focus, the backdrop, and dismissal.",
          "DialogTrigger opens the window, and DialogContent handles the portal and overlay.",
          "Compose the content with DialogHeader, DialogTitle, DialogDescription and DialogFooter.",
          "Wrap dismissal actions with DialogClose. For a form, control `open` and `onOpenChange` on Dialog and close it after handling the submission.",
        ].join("\n\n"),
      },
    },
  },
};

export default meta;
type Story = StoryObj<DialogStoryArgs>;

function InlineDialog({
  title,
  description,
  showCloseButton,
  width,
  children,
  className,
}: Omit<DialogStoryArgs, "modal"> & {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Dialog>
      <div className={cn("rounded-3xl bg-foreground/5 p-3", width === "wide" ? "max-w-2xl" : "max-w-lg")}>
        <div
          data-slot="dialog-content"
          data-preview="dialog"
          className={cn(dialogSurfaceClassName, "relative w-full", className)}
        >
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>
          {children}
          {showCloseButton && (
            <span data-slot="dialog-close" className={dialogCloseIconClassName} aria-hidden="true">
              <XIcon />
            </span>
          )}
        </div>
      </div>
    </Dialog>
  );
}

function RequestDetails() {
  return (
    <dl className="grid gap-1 rounded-xl bg-foreground/5 p-3 text-sm">
      <dt className="font-medium">Requested period</dt>
      <dd className="text-muted-foreground">November 15–17, 2026</dd>
    </dl>
  );
}

function RequestActions({ preview = false }: { preview?: boolean }) {
  return (
    <DialogFooter>
      {preview ? (
        <>
          <Button asChild variant="outline"><span>Cancel</span></Button>
          <Button asChild variant="primary"><span>Submit request</span></Button>
        </>
      ) : (
        <>
          <DialogClose asChild><Button variant="outline">Cancel</Button></DialogClose>
          <DialogClose asChild><Button variant="primary">Submit request</Button></DialogClose>
        </>
      )}
    </DialogFooter>
  );
}

export const Anatomy: Story = {
  render: ({ title, description, showCloseButton, width }) => (
    <div className="grid gap-6 xl:grid-cols-[minmax(0,42rem)_minmax(0,1fr)]">
      <section className="space-y-2" aria-label="Complete preview">
        <h2 className="text-sm font-semibold">Complete preview</h2>
        <InlineDialog title={title} description={description} showCloseButton={showCloseButton} width={width}>
          <RequestDetails />
          <RequestActions preview />
        </InlineDialog>
      </section>
      <Dialog>
        <div className="grid content-start gap-4">
          <section className="space-y-2" aria-label="Title and description">
            <h2 className="text-sm font-semibold">Title and description</h2>
            <DialogHeader className="rounded-2xl bg-card p-4">
              <DialogTitle>{title}</DialogTitle>
              <DialogDescription>{description}</DialogDescription>
            </DialogHeader>
          </section>
          <section className="space-y-2" aria-label="Body">
            <h2 className="text-sm font-semibold">Body</h2>
            <RequestDetails />
          </section>
          <section className="space-y-2" aria-label="Footer actions">
            <h2 className="text-sm font-semibold">Footer actions</h2>
            <div className="rounded-xl bg-foreground/5 p-3">
              <RequestActions preview />
            </div>
          </section>
          <section className="space-y-2" aria-label="Backdrop">
            <h2 className="text-sm font-semibold">Backdrop</h2>
            <div className="relative isolate overflow-hidden rounded-2xl bg-card p-4 text-sm">
              <p>Page behind the dialog</p>
              <div data-slot="dialog-overlay" className={cn("pointer-events-none absolute inset-0", dialogBackdropClassName)} />
            </div>
          </section>
          {showCloseButton && (
            <section className="space-y-2" aria-label="Close icon">
              <h2 className="text-sm font-semibold">Close icon</h2>
              <div className="relative h-12 w-12 rounded-xl bg-card">
                <span className={dialogCloseIconClassName} aria-hidden="true"><XIcon /></span>
              </div>
            </section>
          )}
        </div>
      </Dialog>
    </div>
  ),
};

function RequestDialog({ title, description, showCloseButton, modal, width }: DialogStoryArgs) {
  return (
    <div className="space-y-4">
      <InlineDialog title={title} description={description} showCloseButton={showCloseButton} width={width}>
        <RequestDetails />
        <RequestActions preview />
      </InlineDialog>
      <Dialog modal={modal}>
        <DialogTrigger asChild>
          <Button>Open request dialog</Button>
        </DialogTrigger>
        <DialogContent showCloseButton={showCloseButton} className={width === "wide" ? "sm:max-w-2xl" : undefined}>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>
          <RequestDetails />
          <RequestActions />
        </DialogContent>
      </Dialog>
    </div>
  );
}

export const Interactive: Story = {
  render: (args) => <RequestDialog {...args} />,
  parameters: {
    docs: {
      source: {
        code: `<Dialog>
  <DialogTrigger asChild>
    <Button>Open request dialog</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Confirm leave request</DialogTitle>
      <DialogDescription>Review your request before sending it.</DialogDescription>
    </DialogHeader>
    <DialogFooter>
      <DialogClose asChild><Button variant="outline">Cancel</Button></DialogClose>
    </DialogFooter>
  </DialogContent>
</Dialog>`,
      },
    },
  },
};

export const FooterDismissal: Story = {
  name: "Footer Dismissal",
  args: { showCloseButton: false },
  render: (args) => <RequestDialog {...args} />,
};

export const ControlledForm: Story = {
  name: "Controlled Form",
  args: {
    title: "Edit display name",
    description: "This name appears on your profile and leave requests.",
  },
  render: function ControlledForm({ title, description, showCloseButton, modal, width }) {
    const [open, setOpen] = React.useState(false);
    const [displayName, setDisplayName] = React.useState("Maya Ali");
    const nameId = React.useId();

    return (
      <div className="space-y-3">
        <InlineDialog title={title} description={description} showCloseButton={showCloseButton} width={width}>
          <div className="grid gap-2">
            <span className="text-sm font-medium">Display name</span>
            <Input readOnly tabIndex={-1} aria-label="Display name preview" value={displayName} />
          </div>
          <DialogFooter>
            <Button asChild variant="outline"><span>Cancel</span></Button>
            <Button asChild variant="primary"><span>Save changes</span></Button>
          </DialogFooter>
        </InlineDialog>
        <p className="text-sm" role="status">Display name: {displayName}</p>
        <Dialog open={open} onOpenChange={setOpen} modal={modal}>
          <DialogTrigger asChild>
            <Button>Edit profile</Button>
          </DialogTrigger>
          <DialogContent showCloseButton={showCloseButton} className={width === "wide" ? "sm:max-w-2xl" : undefined}>
            <DialogHeader>
              <DialogTitle>{title}</DialogTitle>
              <DialogDescription>{description}</DialogDescription>
            </DialogHeader>
            <form className="grid gap-4" onSubmit={(event) => {
              event.preventDefault();
              const value = String(new FormData(event.currentTarget).get("displayName") ?? "").trim();
              if (value) {
                setDisplayName(value);
                setOpen(false);
              }
            }}>
              <div className="grid gap-2">
                <Label htmlFor={nameId}>Display name</Label>
                <Input id={nameId} name="displayName" defaultValue={displayName} required />
              </div>
              <DialogFooter>
                <DialogClose asChild><Button variant="outline">Cancel</Button></DialogClose>
                <Button asChild variant="primary"><button type="submit">Save changes</button></Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    );
  },
};

const policyTitles = [
  "Eligibility", "Annual allowance", "Submitting a request", "Notice periods",
  "Manager approval", "Changing the dates", "Cancelling a request", "Public holidays",
  "Part-time schedules", "Carry-over requests", "Supporting documents", "Contacting the people team",
];

function PolicyTopics() {
  return (
    <ol className="grid list-decimal gap-3 ps-6 text-sm">
      {policyTitles.map((topic) => (
        <li key={topic} className="rounded-xl bg-foreground/5 p-4">{topic}</li>
      ))}
    </ol>
  );
}

export const LongContent: Story = {
  name: "Long Content",
  args: {
    title: "Leave policy",
    description: "Review the topics covered by the employee leave policy.",
    width: "wide",
  },
  render: ({ title, description, showCloseButton, modal, width }) => (
    <div className="space-y-4">
      <InlineDialog
        title={title}
        description={description}
        width={width}
        showCloseButton={showCloseButton}
        className="max-h-80"
      >
        <PolicyTopics />
        <DialogFooter><Button asChild><span>Done</span></Button></DialogFooter>
      </InlineDialog>
      <Dialog modal={modal}>
        <DialogTrigger asChild><Button>Read the leave policy</Button></DialogTrigger>
        <DialogContent showCloseButton={showCloseButton} className={width === "wide" ? "sm:max-w-2xl" : undefined}>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>
          <PolicyTopics />
          <DialogFooter>
            <DialogClose asChild><Button>Done</Button></DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  ),
};
