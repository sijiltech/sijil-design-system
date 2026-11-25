import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import {
  Button,
  Checkbox,
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldTitle,
  Input,
  Label,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
  Switch,
} from "@sijil/ui";

const meta = { title: "Components/Form Controls" } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

export const TextInput: Story = {
  render: () => (
    <div className="grid max-w-sm gap-2">
      <Label htmlFor="employee-name">Employee name</Label>
      <Input id="employee-name" placeholder="e.g. Maya Ali" autoComplete="name" />
    </div>
  ),
};

export const CheckboxAndSwitch: Story = {
  render: () => (
    <div className="grid gap-4">
      <div className="flex items-center gap-2">
        <Checkbox id="weekly-summary" defaultChecked />
        <Label htmlFor="weekly-summary">Include a weekly summary</Label>
      </div>
      <div className="flex items-center gap-2">
        <Switch id="email-alerts" />
        <Label htmlFor="email-alerts">Email alerts</Label>
      </div>
    </div>
  ),
};

export const GroupedSelect: Story = {
  render: () => (
    <div className="grid max-w-xs gap-2">
      <Label htmlFor="department">Department</Label>
      <Select>
        <SelectTrigger id="department" className="w-full">
          <SelectValue placeholder="Select a department" />
        </SelectTrigger>
        <SelectContent align="start" className="max-h-56">
          <SelectGroup>
            <SelectLabel>Product</SelectLabel>
            <SelectItem value="design">Design</SelectItem>
            <SelectItem value="engineering">Engineering</SelectItem>
            <SelectItem value="support">Support</SelectItem>
          </SelectGroup>
          <SelectSeparator />
          <SelectGroup>
            <SelectLabel>Operations</SelectLabel>
            <SelectItem value="finance">Finance</SelectItem>
            <SelectItem value="legal">Legal</SelectItem>
            <SelectItem value="people">People</SelectItem>
            <SelectItem value="sales">Sales</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  ),
};

export const FieldValidation: Story = {
  render: function FieldValidation() {
    const [email, setEmail] = React.useState("");
    const [showError, setShowError] = React.useState(false);
    const invalid = showError && !email.includes("@");

    return (
      <form
        className="max-w-sm"
        noValidate
        onSubmit={(event) => {
          event.preventDefault();
          setShowError(true);
        }}
      >
        <FieldSet>
          <FieldLegend>Contact preferences</FieldLegend>
          <FieldGroup>
            <Field data-invalid={invalid || undefined}>
              <FieldLabel htmlFor="contact-email">Work email</FieldLabel>
              <FieldContent>
                <Input
                  id="contact-email"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  aria-invalid={invalid}
                  aria-describedby={invalid ? "email-description email-error" : "email-description"}
                />
                <FieldDescription id="email-description">Used for account notifications.</FieldDescription>
                {invalid && <FieldError id="email-error">Enter a valid work email.</FieldError>}
              </FieldContent>
            </Field>
            <FieldSeparator>Notifications</FieldSeparator>
            <Field orientation="horizontal">
              <Checkbox aria-labelledby="field-summary-title" defaultChecked />
              <FieldContent>
                <FieldTitle id="field-summary-title">Weekly summary</FieldTitle>
                <FieldDescription>Receive a digest every Monday.</FieldDescription>
              </FieldContent>
            </Field>
            <Button asChild className="w-fit">
              <button type="submit">Validate preferences</button>
            </Button>
          </FieldGroup>
        </FieldSet>
      </form>
    );
  },
};
