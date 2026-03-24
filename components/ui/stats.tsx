import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const statsGroupVariants = cva("grid gap-4", {
  variants: {
    columns: {
      1: "grid-cols-1",
      2: "sm:grid-cols-2",
      3: "sm:grid-cols-2 lg:grid-cols-3",
      4: "sm:grid-cols-2 xl:grid-cols-4",
    },
  },
  defaultVariants: {
    columns: 4,
  },
});

export type StatsGroupProps = React.ComponentPropsWithoutRef<"div"> & VariantProps<typeof statsGroupVariants>;

function StatsGroup({ className, columns, "aria-label": ariaLabel, ...props }: StatsGroupProps) {
  return (
    <div
      data-slot="stats-group"
      role="group"
      aria-label={ariaLabel ?? "Statistics"}
      className={cn(statsGroupVariants({ columns }), className)}
      {...props}
    />
  );
}

export type StatProps = React.ComponentPropsWithoutRef<"section">;

function Stat({ className, ...props }: StatProps) {
  return (
    <section
      data-slot="stat"
      className={cn("rounded-xl border border-border bg-card p-6 text-card-foreground shadow-sm", className)}
      {...props}
    />
  );
}

export type StatLabelProps = React.ComponentPropsWithoutRef<"p">;

function StatLabel({ className, ...props }: StatLabelProps) {
  return (
    <p data-slot="stat-label" className={cn("text-sm font-medium text-muted-foreground", className)} {...props} />
  );
}

export type StatValueProps = React.ComponentPropsWithoutRef<"p">;

function StatValue({ className, ...props }: StatValueProps) {
  return (
    <p data-slot="stat-value" className={cn("mt-2 text-3xl font-semibold tracking-tight", className)} {...props} />
  );
}

export type StatDescriptionProps = React.ComponentPropsWithoutRef<"p">;

function StatDescription({ className, ...props }: StatDescriptionProps) {
  return (
    <p data-slot="stat-description" className={cn("mt-2 text-sm text-muted-foreground", className)} {...props} />
  );
}

const statDeltaVariants = cva("mt-2 inline-flex items-center text-sm font-medium", {
  variants: {
    trend: {
      positive: "text-success",
      negative: "text-destructive",
      neutral: "text-muted-foreground",
    },
  },
  defaultVariants: {
    trend: "neutral",
  },
});

export type StatDeltaProps = React.ComponentPropsWithoutRef<"p"> &
  VariantProps<typeof statDeltaVariants> & {
    /** A11Y: short description of the change, e.g. "up 3 percent from last week" */
    label: string;
  };

function StatDelta({ className, trend, label, children, ...props }: StatDeltaProps) {
  return (
    <p
      data-slot="stat-delta"
      role="status"
      aria-label={label}
      className={cn(statDeltaVariants({ trend }), className)}
      {...props}
    >
      {children}
    </p>
  );
}

export { StatsGroup, Stat, StatLabel, StatValue, StatDescription, StatDelta, statsGroupVariants, statDeltaVariants };
