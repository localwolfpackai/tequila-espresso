"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Blocks, BookOpen, Palette, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";

const navItems = [
  { href: "/playground", label: "Playground", icon: Sparkles },
  { href: "/blocks", label: "Blocks", icon: Blocks },
  { href: "/docs/button", label: "Docs", icon: BookOpen },
  { href: "/themes", label: "Themes", icon: Palette },
] as const;

export function SiteNav() {
  const pathname = usePathname();

  return (
    <header className="amber-glass sticky top-4 z-20 mx-auto max-w-6xl rounded-xl border border-border/80 px-4 py-3 md:px-5">
      <div className="flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 text-lg font-semibold tracking-tight text-foreground transition-opacity hover:opacity-80"
        >
          <span
            className="inline-block size-7 rounded-lg bg-gradient-to-br from-amber-500 to-orange-700 dark:from-amber-400 dark:to-orange-600"
            aria-hidden
          />
          Tequila Espresso
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 md:flex" aria-label="Main">
          {navItems.map(({ href, label }) => {
            const isActive =
              pathname === href || (href.startsWith("/docs") && pathname.startsWith("/docs"));

            return (
              <Button
                key={href}
                asChild
                variant="ghost"
                size="sm"
                className={cn(isActive && "bg-accent text-accent-foreground")}
              >
                <Link href={href}>{label}</Link>
              </Button>
            );
          })}
          <div className="ml-1 border-l border-border/60 pl-2">
            <ThemeToggle />
          </div>
        </nav>

        {/* Mobile nav */}
        <div className="flex items-center gap-1 md:hidden">
          <ThemeToggle />
        </div>
      </div>

      {/* Mobile nav links */}
      <nav
        className="mt-2 flex gap-1 overflow-x-auto border-t border-border/40 pt-2 md:hidden"
        aria-label="Main"
      >
        {navItems.map(({ href, label, icon: Icon }) => {
          const isActive =
            pathname === href || (href.startsWith("/docs") && pathname.startsWith("/docs"));

          return (
            <Button
              key={href}
              asChild
              variant="ghost"
              size="sm"
              className={cn(
                "shrink-0 gap-1.5 text-xs",
                isActive && "bg-accent text-accent-foreground"
              )}
            >
              <Link href={href}>
                <Icon className="size-3.5" aria-hidden />
                {label}
              </Link>
            </Button>
          );
        })}
      </nav>
    </header>
  );
}
