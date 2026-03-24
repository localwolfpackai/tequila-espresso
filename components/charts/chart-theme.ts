import type { CSSProperties } from "react";

// NOTE: Shared Recharts styling aligned with Amber CSS variables (styles/globals.css).

export const AMBER_TOOLTIP_CONTENT_STYLE: CSSProperties = {
  backgroundColor: "var(--card)",
  border: "1px solid var(--border)",
  borderRadius: "var(--radius-md)",
  color: "var(--foreground)",
  boxShadow: "var(--shadow-md)",
};

export const AMBER_TOOLTIP_LABEL_STYLE: CSSProperties = {
  color: "var(--muted-foreground)",
};

export const AMBER_CHART_GRID_COLOR = "var(--border)";

export const AMBER_AXIS_TICK_PROPS = {
  fill: "var(--muted-foreground)",
  fontSize: 12,
} as const;

export const AMBER_SERIES_COLORS = [
  "var(--primary)",
  "var(--secondary)",
  "var(--accent)",
  "var(--info)",
  "var(--warning)",
] as const;
