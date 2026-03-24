import { render, screen } from "@testing-library/react";
import { Sidebar } from "@/components/ui/sidebar";

const items = [
  { href: "/", label: "Home" },
  { href: "/playground", label: "Playground" },
];

describe("Sidebar", () => {
  it("exposes a named navigation landmark", () => {
    render(<Sidebar items={items} />);
    expect(screen.getByRole("navigation", { name: /main navigation/i })).toBeInTheDocument();
  });

  it("renders links for each item", () => {
    render(<Sidebar items={items} />);
    expect(screen.getByRole("link", { name: "Home" })).toHaveAttribute("href", "/");
    expect(screen.getByRole("link", { name: "Playground" })).toHaveAttribute("href", "/playground");
  });

  it("marks home as current when pathname is root", () => {
    render(<Sidebar items={items} />);
    expect(screen.getByRole("link", { name: "Home" })).toHaveAttribute("aria-current", "page");
    expect(screen.getByRole("link", { name: "Playground" })).not.toHaveAttribute("aria-current");
  });

  it("respects custom aria-label on nav", () => {
    render(<Sidebar items={items} aria-label="App sections" />);
    expect(screen.getByRole("navigation", { name: /app sections/i })).toBeInTheDocument();
  });
});
