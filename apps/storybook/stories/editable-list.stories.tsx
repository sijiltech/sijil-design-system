import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import {
  MultiSelectDropdown,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  type MultiSelectOption,
  useDirection,
} from "@sijil/ui";

const meta = { title: "Components/Editable List", component: MultiSelectDropdown } satisfies Meta;
export default meta;
type Story = StoryObj;

const roles = [
  { id: "employee", en: "Employee", ar: "موظف" },
  { id: "manager", en: "Manager", ar: "مدير" },
  { id: "attendance", en: "Attendance Admin", ar: "مسؤول الحضور" },
  { id: "hr", en: "HR Admin", ar: "مسؤول الموارد البشرية" },
];

const employees = [
  { id: "maya", en: "Maya Ali", ar: "مايا علي" },
  { id: "omar", en: "Omar Hassan", ar: "عمر حسن" },
];

export const EmployeeRoles: Story = {
  name: "Employee Roles",
  render: function EmployeeRoles() {
    const language = useDirection() === "rtl" ? "ar" : "en";
    const arabic = language === "ar";
    const [assignedRoles, setAssignedRoles] = React.useState<Record<string, string[]>>({
      maya: ["employee", "manager"],
      omar: ["employee"],
    });
    const options: MultiSelectOption[] = roles.map((role) => ({ id: role.id, label: role[language] }));

    return (
      <div className="max-w-xl overflow-x-auto rounded-xl border bg-card">
        <Table className="min-w-80">
          <TableHeader>
            <TableRow>
              <TableHead scope="col">{arabic ? "الموظف" : "Employee"}</TableHead>
              <TableHead scope="col">{arabic ? "الأدوار" : "Roles"}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {employees.map((employee) => (
              <TableRow key={employee.id}>
                <TableCell>{employee[language]}</TableCell>
                <TableCell className="w-2/3">
                  <MultiSelectDropdown
                    variant="inline"
                    searchPlaceholder={arabic ? "ابحث عن دور" : "Search roles"}
                    options={options}
                    value={options.filter((role) => assignedRoles[employee.id].includes(String(role.id)))}
                    onChange={(selected) => setAssignedRoles((previous) => ({
                      ...previous,
                      [employee.id]: selected.map((role) => String(role.id)),
                    }))}
                    labels={{
                      add: arabic ? `إضافة دور إلى ${employee.ar}` : `Add role for ${employee.en}`,
                      remove: (role) => arabic ? `إزالة دور ${role}` : `Remove ${role}`,
                      empty: arabic ? "لا توجد أدوار مطابقة" : "No matching roles",
                    }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  },
};

