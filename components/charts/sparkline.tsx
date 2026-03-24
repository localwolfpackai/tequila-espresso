"use client";

import { Line, LineChart as RechartsLineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import {
  AMBER_TOOLTIP_CONTENT_STYLE,
  AMBER_TOOLTIP_LABEL_STYLE,
} from "@/components/charts/chart-theme";

export type SparklineDatum = { label: string; value: number };

type SparklineProps = {
  data: SparklineDatum[];
  title: string;
  description?: string;
};

export function Sparkline({ data, title, description }: SparklineProps) {
  const isEmpty = data.length === 0;

  if (isEmpty) {
    return (
      <figure
        className="flex h-12 w-full min-w-24 items-center justify-center rounded-md border border-dashed border-border bg-muted/40 px-2"
        aria-label={title}
      >
        <figcaption className="sr-only">{description ?? title}</figcaption>
        <span className="text-xs text-muted-foreground">No trend data</span>
      </figure>
    );
  }

  const summary = data.map((d) => `${d.label} ${d.value}`).join(", ");

  return (
    <figure className="h-12 w-full min-w-24 text-muted-foreground">
      <figcaption className="sr-only">
        {description ?? title}. Values: {summary}.
      </figcaption>
      <div className="h-full w-full" role="img" aria-label={`${title}. ${summary}`}>
        <ResponsiveContainer width="100%" height="100%">
          <RechartsLineChart data={data} margin={{ top: 4, right: 4, left: 4, bottom: 4 }}>
            <XAxis dataKey="label" hide />
            <YAxis hide domain={["dataMin", "dataMax"]} />
            <Tooltip
              contentStyle={AMBER_TOOLTIP_CONTENT_STYLE}
              labelStyle={AMBER_TOOLTIP_LABEL_STYLE}
              cursor={{ stroke: "var(--border)", strokeWidth: 1 }}
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke="var(--primary)"
              strokeWidth={2}
              dot={false}
              name="Value"
              isAnimationActive={false}
            />
          </RechartsLineChart>
        </ResponsiveContainer>
      </div>
    </figure>
  );
}
