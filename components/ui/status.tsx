import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const statusDotVariants = cva("size-2 shrink-0 rounded-full", {
  variants: {
    variant: {
      default: "bg-muted-foreground",
      success: "bg-success",
      warning: "bg-warning",
      destructive: "bg-destructive",
      info: "bg-info",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export type StatusProps = React.HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof statusDotVariants> & {
    /** A11Y: visible label; also used for aria-labelledby when labelId is omitted */
    label: React.ReactNode;
    /** Optional id for the label element (links to role=status via aria-labelledby) */
    labelId?: string;
  };

/**
 * Inline status with dot + label. Uses role="status" for static state display (not live announcements).
 */
function Status({ className, variant, label, labelId, id, ...props }: StatusProps) {
  const autoLabelId = React.useId();
  const resolvedLabelId = labelId ?? autoLabelId;

  return (
    <div
      id={id}
      role="status"
      className={cn("inline-flex items-center gap-2 text-sm text-foreground", className)}
      aria-labelledby={resolvedLabelId}
      {...props}
    >
      <span className={cn(statusDotVariants({ variant }))} aria-hidden />
      <span id={resolvedLabelId} className="font-medium leading-none">
        {label}
      </span>
    </div>
  );
}

export { Status, statusDotVariants };
