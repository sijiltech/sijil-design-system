import * as React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { axe } from "vitest-axe";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DesignSystemProvider,
} from "../src/index.js";

describe("Dialog component", () => {
  it("opens when trigger is clicked and renders content with custom labels", () => {
    render(
      <DesignSystemProvider labels={{ close: "Dismiss Dialog" }}>
        <Dialog>
          <DialogTrigger>Open Dialog</DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Dialog Title</DialogTitle>
              <DialogDescription>Dialog description body</DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </DesignSystemProvider>
    );

    expect(screen.queryByText("Dialog Title")).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: /open dialog/i }));

    expect(screen.getByText("Dialog Title")).toBeInTheDocument();
    expect(screen.getByText("Dialog description body")).toBeInTheDocument();
    expect(screen.getByText("Dismiss Dialog")).toBeInTheDocument();
  });

  it("passes accessibility checks when open", async () => {
    const { container } = render(
      <Dialog defaultOpen>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>A11y Dialog</DialogTitle>
            <DialogDescription>This dialog should pass a11y checks.</DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});

