import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

function DemoSheet() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button>Open sheet</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetTitle>Sheet title</SheetTitle>
        <SheetDescription>Sheet description</SheetDescription>
      </SheetContent>
    </Sheet>
  );
}

describe("Sheet", () => {
  it("opens and exposes dialog semantics", async () => {
    const user = userEvent.setup();
    render(<DemoSheet />);
    await user.click(screen.getByRole("button", { name: /Open sheet/i }));
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByText("Sheet title")).toBeInTheDocument();
  });

  it("closes on Escape", async () => {
    const user = userEvent.setup();
    render(<DemoSheet />);
    await user.click(screen.getByRole("button", { name: /Open sheet/i }));
    expect(screen.getByText("Sheet description")).toBeInTheDocument();
    await user.keyboard("{Escape}");
    expect(screen.queryByText("Sheet description")).not.toBeInTheDocument();
  });

  it("closes on overlay pointer down (outside interaction)", async () => {
    const user = userEvent.setup();
    render(<DemoSheet />);
    await user.click(screen.getByRole("button", { name: /Open sheet/i }));
    const overlay = document.querySelector("[data-state='open'].fixed.inset-0");
    if (!overlay) throw new Error("Overlay not found");
    await user.click(overlay as HTMLElement);
    expect(screen.queryByText("Sheet title")).not.toBeInTheDocument();
  });
});
