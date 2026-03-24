import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

function DemoTooltip() {
  return (
    <TooltipProvider delayDuration={0} skipDelayDuration={0}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button type="button">Focus target</Button>
        </TooltipTrigger>
        <TooltipContent>Tooltip help text</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

describe("Tooltip", () => {
  it("shows tooltip on keyboard focus", async () => {
    const user = userEvent.setup();
    render(<DemoTooltip />);
    await user.tab();
    expect(screen.getByRole("button", { name: /Focus target/i })).toHaveFocus();
    await waitFor(() => {
      expect(screen.getByRole("tooltip", { name: /Tooltip help text/i })).toBeInTheDocument();
    });
  });

  it("shows tooltip on hover", async () => {
    const user = userEvent.setup();
    render(<DemoTooltip />);
    await user.hover(screen.getByRole("button", { name: /Focus target/i }));
    await waitFor(() => {
      expect(screen.getByRole("tooltip")).toHaveTextContent("Tooltip help text");
    });
  });

  it("hides tooltip on Escape when trigger is focused", async () => {
    const user = userEvent.setup();
    render(<DemoTooltip />);
    await user.tab();
    await waitFor(() => {
      expect(screen.getByRole("tooltip")).toBeInTheDocument();
    });
    await user.keyboard("{Escape}");
    await waitFor(() => {
      expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
    });
  });
});
