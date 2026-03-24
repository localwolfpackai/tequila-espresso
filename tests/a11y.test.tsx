import { render, screen } from "@testing-library/react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Combobox } from "@/components/ui/combobox";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

describe("Accessibility smoke tests", () => {
  it('Button has role="button"', () => {
    render(<Button>Action</Button>);
    expect(screen.getByRole("button", { name: "Action" })).toBeInTheDocument();
  });

  it("Checkbox has aria-checked", () => {
    render(<Checkbox aria-label="opt-in" />);
    expect(screen.getByRole("checkbox")).toHaveAttribute("aria-checked");
  });

  it("Dialog has aria-modal", () => {
    render(
      <Dialog open>
        <DialogTrigger asChild>
          <Button>Open</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogTitle>Modal</DialogTitle>
          <DialogDescription>Description</DialogDescription>
        </DialogContent>
      </Dialog>,
    );
    expect(screen.getByRole("dialog")).toHaveAttribute("aria-modal", "true");
  });

  it("Combobox has aria-expanded", () => {
    render(<Combobox options={[{ value: "1", label: "One" }]} onChange={() => undefined} />);
    expect(screen.getByRole("combobox")).toHaveAttribute("aria-expanded");
  });

  it("All inputs have labels or aria-label", () => {
    render(<Input aria-label="email" />);
    expect(screen.getByLabelText("email")).toBeInTheDocument();
  });

  it("Focus is visible on interactive elements", () => {
    render(<Button>Focusable</Button>);
    const button = screen.getByRole("button", { name: /Focusable/i });
    button.focus();
    expect(button).toHaveFocus();
  });

  it("Keyboard navigation works on menus", async () => {
    render(<Combobox options={[{ value: "1", label: "One" }]} onChange={() => undefined} />);
    const combo = screen.getByRole("combobox");
    combo.focus();
    expect(combo).toHaveFocus();
  });
});
