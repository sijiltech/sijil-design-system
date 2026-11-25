import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  type AccordionProps,
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  Button,
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@sijil/ui";

const meta = { title: "Components/Navigation and Disclosure" } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

export const BreadcrumbTrail: Story = {
  name: "Breadcrumb",
  render: () => (
    <div id="requests" className="space-y-4">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem><BreadcrumbLink href="#requests">Requests</BreadcrumbLink></BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem><BreadcrumbEllipsis /></BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem><BreadcrumbPage>Annual leave</BreadcrumbPage></BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  ),
};

export const RequestTabs: Story = {
  name: "Tabs",
  render: () => (
    <Tabs defaultValue="pending" className="max-w-md">
      <TabsList aria-label="Request status">
        <TabsTrigger value="pending">Pending</TabsTrigger>
        <TabsTrigger value="approved">Approved</TabsTrigger>
      </TabsList>
      <TabsContent value="pending" className="bg-card p-4">Two requests awaiting review.</TabsContent>
      <TabsContent value="approved" className="bg-card p-4">Four requests approved this month.</TabsContent>
    </Tabs>
  ),
};

function LeavePolicyAccordion({ variant }: Pick<AccordionProps, "variant">) {
  return (
    <Accordion type="single" collapsible defaultValue="notice" variant={variant} className="max-w-md">
      <AccordionItem value="notice">
        <AccordionTrigger>How much notice should I give?</AccordionTrigger>
        <AccordionContent>Submit planned leave at least one week in advance.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="balance">
        <AccordionTrigger>Where can I see my balance?</AccordionTrigger>
        <AccordionContent>Open the Leave Balance section of your profile.</AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

export const PolicyAccordion: Story = {
  name: "Accordion (Plain)",
  render: () => <LeavePolicyAccordion variant="plain" />,
};

export const CardAccordion: Story = {
  name: "Accordion (Card)",
  render: () => <LeavePolicyAccordion variant="card" />,
};

export const AdditionalDetails: Story = {
  name: "Collapsible",
  render: () => (
    <Collapsible className="max-w-md space-y-2">
      <CollapsibleTrigger asChild><Button variant="outline">Request notes</Button></CollapsibleTrigger>
      <CollapsibleContent className="bg-card p-4 text-sm">
        A team member will cover urgent requests during the leave period.
      </CollapsibleContent>
    </Collapsible>
  ),
};
