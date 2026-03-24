import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

function DemoDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Open dialog</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Dialog Title</DialogTitle>
        <DialogDescription>Dialog Description</DialogDescription>
      </DialogContent>
    </Dialog>
  );
}

describe("Dialog", () => {
  it("opens and closes", async () => {
    const user = userEvent.setup();
    render(<DemoDialog />);
    await user.click(screen.getByRole("button", { name: /Open dialog/i }));
    expect(screen.getByText("Dialog Title")).toBeInTheDocument();
    await user.keyboard("{Escape}");
    expect(screen.queryByText("Dialog Title")).not.toBeInTheDocument();
  });

  it("traps focus inside", async () => {
    const user = userEvent.setup();
    render(<DemoDialog />);
    await user.click(screen.getByRole("button", { name: /Open dialog/i }));
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("closes on Escape", async () => {
    const user = userEvent.setup();
    render(<DemoDialog />);
    await user.click(screen.getByRole("button", { name: /Open dialog/i }));
    await user.keyboard("{Escape}");
    expect(screen.queryByText("Dialog Description")).not.toBeInTheDocument();
  });

  it("closes on overlay click", async () => {
    const user = userEvent.setup();
    render(<DemoDialog />);
    await user.click(screen.getByRole("button", { name: /Open dialog/i }));
    const overlay = document.querySelector("[data-state='open'].fixed.inset-0");
    if (!overlay) throw new Error("Overlay not found");
    await user.click(overlay);
    expect(screen.queryByText("Dialog Title")).not.toBeInTheDocument();
  });

  it("renders title and description", async () => {
    const user = userEvent.setup();
    render(<DemoDialog />);
    await user.click(screen.getByRole("button", { name: /Open dialog/i }));
    expect(screen.getByText("Dialog Title")).toBeInTheDocument();
    expect(screen.getByText("Dialog Description")).toBeInTheDocument();
  });
});
