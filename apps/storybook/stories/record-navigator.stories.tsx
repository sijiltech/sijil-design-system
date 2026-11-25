import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import {
  Badge, Button, Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle,
  DialogTrigger, RecordNavigator, ScreenContainer, useDirection,
} from "@sijil/ui";

const meta = { title: "Components/Record Navigator" } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

const employees = [
  { name: "Maya Ali", nameAr: "مايا علي", team: "People Operations", teamAr: "شؤون الموظفين", id: "HR-101" },
  { name: "Leila Saleh", nameAr: "ليلى صالح", team: "Finance", teamAr: "المالية", id: "HR-102" },
  { name: "Omar Hassan", nameAr: "عمر حسن", team: "Operations", teamAr: "العمليات", id: "HR-103" },
];

export const EmployeeDetails: Story = {
  name: "Employee Details",
  render: function EmployeeDetails() {
    const rtl = useDirection() === "rtl";
    const [position, setPosition] = React.useState(1);
    const employee = employees[position - 1];
    const nameAt = (index: number) => employees[index]?.[rtl ? "nameAr" : "name"];

    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">{rtl ? "عرض تفاصيل الموظف" : "View employee details"}</Button>
        </DialogTrigger>
        <DialogContent className="max-w-lg p-0">
          <ScreenContainer className="gap-5 p-6">
            <div className="flex justify-center">
              <RecordNavigator
                position={position}
                total={employees.length}
                onPositionChange={setPosition}
                previousName={nameAt(position - 2)}
                nextName={nameAt(position)}
                locale={rtl ? "ar-EG" : "en"}
                aria-label={rtl ? "التنقل بين الموظفين" : "Employee navigation"}
                labels={rtl ? { previous: "السابق", next: "التالي", jump: "انتقل إلى رقم الموظف في القائمة" } : undefined}
              />
            </div>
            <DialogHeader>
              <DialogTitle>{nameAt(position - 1)}</DialogTitle>
              <DialogDescription>{rtl ? employee.teamAr : employee.team}</DialogDescription>
            </DialogHeader>
            <Badge variant="secondary" className="w-fit">{employee.id}</Badge>
          </ScreenContainer>
        </DialogContent>
      </Dialog>
    );
  },
};
