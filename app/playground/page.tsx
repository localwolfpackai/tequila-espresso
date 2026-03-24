"use client";

import { useState } from "react";
import { WandSparkles } from "lucide-react";
import { BarChart } from "@/components/charts/bar-chart";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Combobox } from "@/components/ui/combobox";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const options = [
  { value: "default", label: "Default" },
  { value: "secondary", label: "Secondary" },
  { value: "destructive", label: "Destructive" },
  { value: "success", label: "Success" },
];

const chartPreviewData = [
  { label: "Mon", value: 12 },
  { label: "Tue", value: 19 },
  { label: "Wed", value: 15 },
  { label: "Thu", value: 22 },
  { label: "Fri", value: 28 },
  { label: "Sat", value: 18 },
  { label: "Sun", value: 24 },
];

export default function PlaygroundPage() {
  const [variant, setVariant] = useState("default");
  const [checked, setChecked] = useState(false);

  return (
    <main className="mx-auto max-w-5xl space-y-10 px-6 py-14 md:space-y-12 md:px-8">
      <section className="space-y-4">
        <p className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium uppercase tracking-wide text-muted-foreground motion-safe:transition-colors motion-safe:duration-200 hover:border-foreground/20">
          <WandSparkles className="size-3.5" aria-hidden /> interactive sandbox
        </p>
        <h1 className="text-3xl font-bold tracking-tight">Playground</h1>
        <p className="max-w-2xl text-pretty text-muted-foreground">
          Interact with Tequila Espresso primitives, compare states, and feel motion + accessibility behavior in real time.
        </p>
        <div className="flex flex-wrap gap-2 pt-1">
          <Badge variant="outline">Live variants</Badge>
          <Badge variant="outline">Keyboard-safe</Badge>
          <Badge variant="outline">Copy-ready patterns</Badge>
        </div>
      </section>
      <div className="grid gap-6 md:grid-cols-2 md:gap-8">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Chart preview</CardTitle>
            <CardDescription>Recharts bar chart using Amber tokens for grid, axes, and fills.</CardDescription>
          </CardHeader>
          <CardContent>
            <BarChart
              data={chartPreviewData}
              title="Weekly activity"
              description="Bar chart showing activity counts for each weekday."
            />
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Button Variants</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <Combobox options={options} value={variant} onChange={setVariant} />
            <Button
              variant={variant as "default" | "secondary" | "destructive" | "success"}
              className="w-full sm:w-auto"
            >
              Sample Button
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Inputs + Dialog</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <Input placeholder="Email address" aria-label="Email address" />
            <label className="flex items-center gap-2 text-sm">
              <Checkbox checked={checked} onCheckedChange={(value) => setChecked(value === true)} />
              Enable marketing updates
            </label>
            <Dialog>
              <DialogTrigger asChild><Button variant="outline">Open Dialog</Button></DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Amber Dialog</DialogTitle>
                  <DialogDescription>Dialog primitives with focus trapping and Escape behavior.</DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
