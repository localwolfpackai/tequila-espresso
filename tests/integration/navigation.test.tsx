import { render, screen } from "@testing-library/react";
import { AppShell } from "@/components/layouts/app-shell";

describe("navigation", () => {
  it("sidebar and routing links render", () => {
    render(
      <AppShell>
        <div>Content</div>
      </AppShell>,
    );
    expect(screen.getByRole("link", { name: /Home/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Playground/i })).toBeInTheDocument();
  });
});
