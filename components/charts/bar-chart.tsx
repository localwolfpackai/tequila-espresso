"use client";

import {
  Bar,
  BarChart as RechartsBarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  AMBER_AXIS_TICK_PROPS,
  AMBER_CHART_GRID_COLOR,
  AMBER_TOOLTIP_CONTENT_STYLE,
  AMBER_TOOLTIP_LABEL_STYLE,
} from "@/components/charts/chart-theme";

export type BarChartDatum = { label: string; value: number };

type BarChartProps = {
  data: BarChartDatum[];
  /** Accessible name for the chart (announced by screen readers). */
  title: string;
  /** Optional short description for assistive tech. */
  description?: string;
};

export function BarChart({ data, title, description }: BarChartProps) {
  const isEmpty = data.length === 0;

  if (isEmpty) {
    return (
      <figure
        className="flex h-64 w-full flex-col items-center justify-center rounded-xl border border-border bg-card p-6 text-center"
        aria-label={title}
      >
        <figcaption className="sr-only">{description ?? title}</figcaption>
        <p className="text-sm font-medium text-foreground">No data to display</p>
        <p className="mt-1 max-w-sm text-sm text-muted-foreground">
          Add one or more labeled values to render this bar chart.
        </p>
      </figure>
    );
  }

  return (
    <figure className="h-64 w-full rounded-xl border border-border bg-card p-4 text-muted-foreground">
      <figcaption className="sr-only">
        {description ?? title}. Values: {data.map((d) => `${d.label} ${d.value}`).join(", ")}.
      </figcaption>
      <div className="h-full w-full" role="img" aria-label={title}>
        <ResponsiveContainer width="100%" height="100%">
          <RechartsBarChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
            <CartesianGrid stroke={AMBER_CHART_GRID_COLOR} strokeDasharray="4 4" vertical={false} />
            <XAxis dataKey="label" tick={AMBER_AXIS_TICK_PROPS} tickLine={false} axisLine={{ stroke: AMBER_CHART_GRID_COLOR }} />
            <YAxis tick={AMBER_AXIS_TICK_PROPS} tickLine={false} axisLine={{ stroke: AMBER_CHART_GRID_COLOR }} width={40} />
            <Tooltip
              contentStyle={AMBER_TOOLTIP_CONTENT_STYLE}
              labelStyle={AMBER_TOOLTIP_LABEL_STYLE}
              cursor={{ fill: "color-mix(in oklab, var(--primary) 12%, transparent)" }}
            />
            <Bar dataKey="value" fill="var(--primary)" radius={[6, 6, 0, 0]} name="Value" />
          </RechartsBarChart>
        </ResponsiveContainer>
      </div>
    </figure>
  );
}
