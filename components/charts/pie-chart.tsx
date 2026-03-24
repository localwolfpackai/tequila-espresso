"use client";

import { Cell, Pie, PieChart as RechartsPieChart, ResponsiveContainer, Tooltip } from "recharts";
import {
  AMBER_SERIES_COLORS,
  AMBER_TOOLTIP_CONTENT_STYLE,
  AMBER_TOOLTIP_LABEL_STYLE,
} from "@/components/charts/chart-theme";

export type PieChartDatum = { name: string; value: number };

type PieChartProps = {
  data: PieChartDatum[];
  title: string;
  description?: string;
};

export function PieChart({ data, title, description }: PieChartProps) {
  const isEmpty = data.length === 0;

  if (isEmpty) {
    return (
      <figure
        className="flex h-64 w-full flex-col items-center justify-center rounded-xl border border-border bg-card p-6 text-center"
        aria-label={title}
      >
        <figcaption className="sr-only">{description ?? title}</figcaption>
        <p className="text-sm font-medium text-foreground">No segments to display</p>
        <p className="mt-1 max-w-sm text-sm text-muted-foreground">
          Provide named slices with numeric values to render this pie chart.
        </p>
      </figure>
    );
  }

  const summary = data.map((d) => `${d.name}: ${d.value}`).join("; ");

  return (
    <figure className="h-64 w-full rounded-xl border border-border bg-card p-4 text-muted-foreground">
      <figcaption className="sr-only">
        {description ?? title}. {summary}.
      </figcaption>
      <div className="flex h-full w-full flex-col gap-3 md:flex-row md:items-center">
        <div className="min-h-48 flex-1" role="img" aria-label={title}>
          <ResponsiveContainer width="100%" height="100%">
            <RechartsPieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius="48%"
                outerRadius="78%"
                paddingAngle={2}
                stroke="var(--card)"
                strokeWidth={2}
              >
                {data.map((entry, index) => (
                  <Cell key={entry.name} fill={AMBER_SERIES_COLORS[index % AMBER_SERIES_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip contentStyle={AMBER_TOOLTIP_CONTENT_STYLE} labelStyle={AMBER_TOOLTIP_LABEL_STYLE} />
            </RechartsPieChart>
          </ResponsiveContainer>
        </div>
        <ul className="shrink-0 space-y-2 text-sm text-foreground md:max-w-40" aria-label="Legend">
          {data.map((entry, index) => (
            <li key={entry.name} className="flex items-center gap-2">
              <span
                className="size-2.5 shrink-0 rounded-sm"
                style={{ backgroundColor: AMBER_SERIES_COLORS[index % AMBER_SERIES_COLORS.length] }}
                aria-hidden
              />
              <span className="min-w-0 truncate">
                <span className="text-muted-foreground">{entry.name}</span>
                <span className="ms-1 font-medium tabular-nums">{entry.value}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </figure>
  );
}
