import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Button } from "@/components/ui/button";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";

function DemoHoverCard() {
  return (
    <HoverCard openDelay={0} closeDelay={0}>
      <HoverCardTrigger asChild>
        <Button type="button">Open hover card</Button>
      </HoverCardTrigger>
      <HoverCardContent>
        <p>Hover card panel body</p>
      </HoverCardContent>
    </HoverCard>
  );
}

describe("HoverCard", () => {
  it("opens panel on hover with dialog semantics", async () => {
    const user = userEvent.setup();
    render(<DemoHoverCard />);
    await user.hover(screen.getByRole("button", { name: /Open hover card/i }));
    await waitFor(() => {
      expect(screen.getByRole("dialog")).toBeInTheDocument();
    });
    expect(screen.getByText("Hover card panel body")).toBeInTheDocument();
  });

  it("opens on keyboard focus of trigger", async () => {
    const user = userEvent.setup();
    render(<DemoHoverCard />);
    await user.tab();
    expect(screen.getByRole("button", { name: /Open hover card/i })).toHaveFocus();
    await waitFor(() => {
      expect(screen.getByRole("dialog")).toBeInTheDocument();
    });
  });

  it("closes on Escape", async () => {
    const user = userEvent.setup();
    render(<DemoHoverCard />);
    await user.hover(screen.getByRole("button", { name: /Open hover card/i }));
    await waitFor(() => {
      expect(screen.getByText("Hover card panel body")).toBeInTheDocument();
    });
    await user.keyboard("{Escape}");
    await waitFor(() => {
      expect(screen.queryByText("Hover card panel body")).not.toBeInTheDocument();
    });
  });
});
