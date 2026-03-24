"use client";

import { useState } from "react";
import { Sparkles } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "@/components/ui/theme-toggle";

export default function ThemesPage() {
  const [primary, setPrimary] = useState("oklch(0.65 0.18 145)");
  const [radius, setRadius] = useState("0.75rem");

  return (
    <main className="mx-auto max-w-5xl space-y-10 px-6 py-12">
      <section aria-labelledby="themes-heading" className="space-y-4">
        <div className="flex items-center justify-between gap-4">
          <p className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">
            <Sparkles className="size-3.5" aria-hidden /> Live tokens
          </p>
          <ThemeToggle />
        </div>
        <div className="space-y-2">
          <h1 id="themes-heading" className="text-3xl font-bold tracking-tight">
            Theme Studio
          </h1>
          <p className="max-w-2xl text-muted-foreground">
            Shape brand color and corner radius, then see them on real controls—not abstract swatches.
          </p>
          <p className="max-w-2xl text-sm text-muted-foreground">
            Adjust the fields, choose Apply theme, and use the theme toggle to check light and dark together.
          </p>
        </div>
      </section>

      <section aria-labelledby="studio-workspace-heading" className="space-y-4">
        <h2 id="studio-workspace-heading" className="sr-only">
          Token controls and preview
        </h2>
        <p className="text-sm text-muted-foreground md:hidden">
          Scroll to preview after you apply changes.
        </p>
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Controls</CardTitle>
              <CardDescription>Values map to CSS variables on the document root.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="primary-token">
                  Primary (Oklch)
                </label>
                <Input
                  id="primary-token"
                  value={primary}
                  onChange={(event) => setPrimary(event.target.value)}
                  aria-describedby="primary-token-hint"
                />
                <p id="primary-token-hint" className="text-xs text-muted-foreground">
                  Example: <code className="rounded bg-muted px-1 py-0.5 text-xs">oklch(L C H)</code>
                </p>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="radius-token">
                  Radius
                </label>
                <Input
                  id="radius-token"
                  value={radius}
                  onChange={(event) => setRadius(event.target.value)}
                  aria-describedby="radius-token-hint"
                />
                <p id="radius-token-hint" className="text-xs text-muted-foreground">
                  Applied to <code className="rounded bg-muted px-1 py-0.5 text-xs">--radius-lg</code>
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button
                  onClick={() => {
                    document.documentElement.style.setProperty("--primary", primary);
                    document.documentElement.style.setProperty("--radius-lg", radius);
                  }}
                >
                  Apply theme
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    document.documentElement.style.removeProperty("--primary");
                    document.documentElement.style.removeProperty("--radius-lg");
                    setPrimary("oklch(0.65 0.18 145)");
                    setRadius("0.75rem");
                  }}
                >
                  Reset
                </Button>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Preview</CardTitle>
              <CardDescription>Quick read on contrast, hierarchy, and button balance.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-xl border border-border bg-card p-4">
                <h3 className="text-base font-semibold">Sample surface</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  If primary and radius feel right here, they will likely hold across the system.
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <Button size="sm">Primary</Button>
                  <Button size="sm" variant="outline">
                    Secondary
                  </Button>
                </div>
              </div>
              <div className="flex flex-wrap gap-2" aria-label="Badge variants">
                <Badge>Primary</Badge>
                <Badge variant="secondary">Secondary</Badge>
                <Badge variant="outline">Outline</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  );
}
