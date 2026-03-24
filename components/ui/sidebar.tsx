"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

type SidebarItem = {
  href: string;
  label: string;
  icon?: ReactNode;
};

const sidebarNavLinkVariants = cva(
  "flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
  {
    variants: {
      active: {
        true: "bg-muted font-medium text-foreground",
        false: "text-muted-foreground hover:bg-muted hover:text-foreground",
      },
    },
    defaultVariants: {
      active: false,
    },
  },
);

const sidebarAsideVariants = cva("h-screen border-r border-border bg-card px-2 py-4 transition-all");

type SidebarProps = {
  items: SidebarItem[];
  collapsed?: boolean;
  /** A11Y: accessible name for the sidebar navigation landmark */
  "aria-label"?: string;
};

function isActivePath(pathname: string, href: string): boolean {
  if (href === "/") {
    return pathname === "/";
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Sidebar({
  items,
  collapsed = false,
  "aria-label": ariaLabel = "Main navigation",
  className,
  ...props
}: SidebarProps & React.ComponentPropsWithoutRef<"aside">) {
  const pathname = usePathname();

  return (
    <aside
      className={cn(sidebarAsideVariants(), collapsed ? "w-16" : "w-64", className)}
      {...props}
    >
      <nav aria-label={ariaLabel} className="space-y-1">
        {items.map((item) => {
          const active = isActivePath(pathname, item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(sidebarNavLinkVariants({ active }))}
              aria-current={active ? "page" : undefined}
            >
              {item.icon}
              <span className={cn(collapsed && "sr-only")}>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}

export { sidebarNavLinkVariants, sidebarAsideVariants };
