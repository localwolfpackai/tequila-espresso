import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

function DemoAlertDialog() {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button>Open alert</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Confirm action</AlertDialogTitle>
          <AlertDialogDescription>This cannot be undone.</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

describe("AlertDialog", () => {
  it("uses alertdialog role and shows labelled content", async () => {
    const user = userEvent.setup();
    render(<DemoAlertDialog />);
    await user.click(screen.getByRole("button", { name: /Open alert/i }));
    expect(screen.getByRole("alertdialog")).toBeInTheDocument();
    expect(screen.getByText("Confirm action")).toBeInTheDocument();
    expect(screen.getByText("This cannot be undone.")).toBeInTheDocument();
  });

  it("closes on Escape", async () => {
    const user = userEvent.setup();
    render(<DemoAlertDialog />);
    await user.click(screen.getByRole("button", { name: /Open alert/i }));
    await user.keyboard("{Escape}");
    expect(screen.queryByRole("alertdialog")).not.toBeInTheDocument();
  });

  it("moves focus to first focusable control and closes on Cancel click", async () => {
    const user = userEvent.setup();
    render(<DemoAlertDialog />);
    await user.click(screen.getByRole("button", { name: /Open alert/i }));
    const cancel = screen.getByRole("button", { name: /Cancel/i });
    expect(cancel).toHaveFocus();
    await user.click(cancel);
    expect(screen.queryByRole("alertdialog")).not.toBeInTheDocument();
  });

  it("tabs between footer actions while open", async () => {
    const user = userEvent.setup();
    render(<DemoAlertDialog />);
    await user.click(screen.getByRole("button", { name: /Open alert/i }));
    await user.tab();
    expect(screen.getByRole("button", { name: /Continue/i })).toHaveFocus();
    await user.tab({ shift: true });
    expect(screen.getByRole("button", { name: /Cancel/i })).toHaveFocus();
  });
});
