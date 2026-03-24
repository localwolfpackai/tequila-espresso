import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

function BasicTabs() {
  return (
    <Tabs defaultValue="account">
      <TabsList aria-label="Account settings">
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
      </TabsList>
      <TabsContent value="account">Account panel</TabsContent>
      <TabsContent value="password">Password panel</TabsContent>
    </Tabs>
  );
}

describe("Tabs", () => {
  it("renders tablist and default panel", () => {
    render(<BasicTabs />);
    expect(screen.getByRole("tablist", { name: /account settings/i })).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: /account/i })).toHaveAttribute("data-state", "active");
    expect(screen.getByText("Account panel")).toBeVisible();
  });

  it("switches panel on click", async () => {
    const user = userEvent.setup();
    render(<BasicTabs />);
    await user.click(screen.getByRole("tab", { name: /password/i }));
    expect(screen.getByRole("tab", { name: /password/i })).toHaveAttribute("data-state", "active");
    expect(screen.getByText("Password panel")).toBeVisible();
  });

  it("moves focus with arrow keys", async () => {
    const user = userEvent.setup();
    render(<BasicTabs />);
    const account = screen.getByRole("tab", { name: /account/i });
    account.focus();
    await user.keyboard("{ArrowRight}");
    expect(screen.getByRole("tab", { name: /password/i })).toHaveFocus();
  });
});
