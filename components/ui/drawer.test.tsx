import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

function DemoDrawer() {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button>Open drawer</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerTitle>Drawer title</DrawerTitle>
        <DrawerDescription>Drawer description</DrawerDescription>
      </DrawerContent>
    </Drawer>
  );
}

describe("Drawer", () => {
  it("opens with dialog role and labelled content", async () => {
    const user = userEvent.setup();
    render(<DemoDrawer />);
    await user.click(screen.getByRole("button", { name: /Open drawer/i }));
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByText("Drawer title")).toBeInTheDocument();
  });

  it("closes on Escape (drawer enters closed state)", async () => {
    const user = userEvent.setup();
    render(<DemoDrawer />);
    await user.click(screen.getByRole("button", { name: /Open drawer/i }));
    const dialog = screen.getByRole("dialog");
    expect(dialog).toHaveAttribute("data-state", "open");
    dialog.focus();
    await user.keyboard("{Escape}");
    await waitFor(() => {
      expect(dialog).toHaveAttribute("data-state", "closed");
    });
  });
});
