import { useState } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";

function ControlledModalDemo() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button type="button" onClick={() => setOpen(true)}>
        Open modal
      </Button>
      <Modal open={open} onOpenChange={setOpen} title="Modal heading" description="Modal copy.">
        <p>Modal body</p>
      </Modal>
    </>
  );
}

describe("Modal", () => {
  it("renders dialog with title and description when open", async () => {
    const user = userEvent.setup();
    render(<ControlledModalDemo />);
    await user.click(screen.getByRole("button", { name: /Open modal/i }));
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByText("Modal heading")).toBeInTheDocument();
    expect(screen.getByText("Modal copy.")).toBeInTheDocument();
  });

  it("closes on Escape via onOpenChange", async () => {
    const user = userEvent.setup();
    render(<ControlledModalDemo />);
    await user.click(screen.getByRole("button", { name: /Open modal/i }));
    await user.keyboard("{Escape}");
    expect(screen.queryByText("Modal heading")).not.toBeInTheDocument();
  });

  it("closes when overlay is activated", async () => {
    const user = userEvent.setup();
    render(<ControlledModalDemo />);
    await user.click(screen.getByRole("button", { name: /Open modal/i }));
    const overlay = document.querySelector("[data-state='open'].fixed.inset-0");
    if (!overlay) throw new Error("Overlay not found");
    await user.click(overlay as HTMLElement);
    expect(screen.queryByText("Modal heading")).not.toBeInTheDocument();
  });
});
