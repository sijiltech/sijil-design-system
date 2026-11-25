import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, expect, it, vi } from "vitest";

import { MultiSelectDropdown } from "../src/index.js";

beforeEach(() => {
  vi.stubGlobal("ResizeObserver", class {
    observe() {}
    unobserve() {}
    disconnect() {}
  });
});

afterEach(() => vi.unstubAllGlobals());

it("adds and removes items from a table cell using the portalled inline editor", async () => {
  const user = userEvent.setup();
  const onChange = vi.fn();
  const employee = { id: "employee", label: "Employee" };
  const manager = { id: "manager", label: "Manager" };
  const attendance = { id: "attendance", label: "Attendance Admin" };

  render(
    <table>
      <tbody>
        <tr>
          <td>
            <MultiSelectDropdown
              variant="inline"
              options={[employee, manager, attendance]}
              defaultValue={[employee]}
              searchPlaceholder="Search roles"
              labels={{ add: "Add role" }}
              onChange={onChange}
            />
          </td>
        </tr>
      </tbody>
    </table>,
  );

  const cell = screen.getByRole("cell");
  await user.click(within(cell).getByRole("button", { name: "Add role" }));
  const choices = screen.getByRole("listbox");
  expect(cell).not.toContainElement(choices);

  const search = within(cell).getByRole("combobox", { name: "Search roles" });
  expect(search).toHaveFocus();
  await user.type(search, "man");
  expect(within(choices).queryByRole("option", { name: "Attendance Admin" })).not.toBeInTheDocument();
  await user.keyboard("{ArrowDown}{Enter}");
  expect(onChange).toHaveBeenLastCalledWith([employee, manager]);
  await user.keyboard("{Escape}");
  expect(screen.queryByRole("listbox")).not.toBeInTheDocument();

  await user.click(within(cell).getByRole("button", { name: "Remove Manager" }));
  expect(onChange).toHaveBeenLastCalledWith([employee]);
});

