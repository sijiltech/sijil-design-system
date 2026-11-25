import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import type { ColumnDef } from "@tanstack/react-table";
import {
  SortableFlexTableHead,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@sijil/ui";
import { FlexTable } from "@sijil/ui/flex-table";

const meta = { title: "Components/Tables" } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

const rows = [
  { employee: "Maya Ali", days: 3 },
  { employee: "Leila Saleh", days: 1 },
  { employee: "Omar Hassan", days: 2 },
];

const columns: ColumnDef<(typeof rows)[number]>[] = [
  {
    accessorKey: "employee",
    header: ({ column }) => <SortableFlexTableHead column={column}>Employee</SortableFlexTableHead>,
  },
  {
    accessorKey: "days",
    header: ({ column }) => <SortableFlexTableHead column={column}>Days requested</SortableFlexTableHead>,
  },
];

export const RequestTotals: Story = {
  name: "Table",
  render: () => (
    <div className="max-w-xl rounded-2xl bg-card p-3">
      <Table>
        <TableCaption>Requested leave days this week</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead scope="col">Employee</TableHead>
            <TableHead scope="col" className="text-end">Days requested</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map(({ employee, days }) => (
            <TableRow key={employee}>
              <TableCell>{employee}</TableCell>
              <TableCell className="text-end">{days}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableHead scope="row">Total</TableHead>
            <TableCell className="text-end">{rows.reduce((total, row) => total + row.days, 0)}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  ),
};

export const SortableRequests: Story = {
  name: "FlexTable",
  render: () => (
    <div className="max-w-xl rounded-2xl bg-card p-3">
      <FlexTable columns={columns} data={rows} />
    </div>
  ),
};

export const EmptyFlexTable: Story = {
  render: () => (
    <div className="max-w-xl rounded-2xl bg-card p-3">
      <FlexTable columns={columns} data={[]} />
    </div>
  ),
};
