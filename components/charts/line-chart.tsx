"use client";

import {
  CartesianGrid,
  Line,
  LineChart as RechartsLineChart,
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

export type LineChartDatum = { label: string; value: number };

type LineChartProps = {
  data: LineChartDatum[];
  title?: string;
  description?: string;
};

const DEFAULT_TITLE = "Line chart";

export function LineChart({ data, title = DEFAULT_TITLE, description }: LineChartProps) {
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
          Add labeled points to render this line chart.
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
          <RechartsLineChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
            <CartesianGrid stroke={AMBER_CHART_GRID_COLOR} strokeDasharray="4 4" vertical={false} />
            <XAxis dataKey="label" tick={AMBER_AXIS_TICK_PROPS} tickLine={false} axisLine={{ stroke: AMBER_CHART_GRID_COLOR }} />
            <YAxis tick={AMBER_AXIS_TICK_PROPS} tickLine={false} axisLine={{ stroke: AMBER_CHART_GRID_COLOR }} width={40} />
            <Tooltip
              contentStyle={AMBER_TOOLTIP_CONTENT_STYLE}
              labelStyle={AMBER_TOOLTIP_LABEL_STYLE}
              cursor={{ stroke: "var(--border)", strokeWidth: 1 }}
            />
            <Line
              type="monotone"
              dataKey="value"
              name="Value"
              stroke="var(--primary)"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4, strokeWidth: 2, stroke: "var(--card)", fill: "var(--primary)" }}
            />
          </RechartsLineChart>
        </ResponsiveContainer>
      </div>
    </figure>
  );
}
