import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Checkbox } from "@/components/ui/checkbox";

describe("Checkbox", () => {
  it("toggles on click", async () => {
    render(<Checkbox aria-label="checkbox" />);
    const checkbox = screen.getByLabelText("checkbox");
    await userEvent.click(checkbox);
    expect(checkbox).toHaveAttribute("data-state", "checked");
  });

  it("toggles on Space key", async () => {
    render(<Checkbox aria-label="space-checkbox" />);
    const checkbox = screen.getByLabelText("space-checkbox");
    checkbox.focus();
    await userEvent.keyboard("[Space]");
    expect(checkbox).toHaveAttribute("data-state", "checked");
  });

  it("shows indeterminate state", () => {
    render(<Checkbox aria-label="indeterminate" checked="indeterminate" />);
    expect(screen.getByLabelText("indeterminate")).toHaveAttribute("data-state", "indeterminate");
  });

  it("handles disabled state", () => {
    render(<Checkbox aria-label="disabled" disabled />);
    expect(screen.getByLabelText("disabled")).toBeDisabled();
  });
});
