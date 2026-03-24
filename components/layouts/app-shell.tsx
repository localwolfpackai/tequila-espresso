import type { ReactNode } from "react";
import { Home, Layers, Palette, PanelTop, SquareTerminal } from "lucide-react";
import { Sidebar } from "@/components/ui/sidebar";

type AppShellProps = {
  children: ReactNode;
};

const items = [
  { href: "/", label: "Home", icon: <Home className="size-4" /> },
  { href: "/playground", label: "Playground", icon: <SquareTerminal className="size-4" /> },
  { href: "/blocks", label: "Blocks", icon: <PanelTop className="size-4" /> },
  { href: "/themes", label: "Themes", icon: <Palette className="size-4" /> },
  { href: "/docs/button", label: "Docs", icon: <Layers className="size-4" /> },
];

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="flex min-h-screen">
      <Sidebar items={items} />
      <main className="flex-1 bg-background p-6">{children}</main>
    </div>
  );
}
