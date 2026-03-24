import * as React from "react";
import { cn } from "@/lib/utils";

export type TimelineProps = React.ComponentPropsWithoutRef<"ol">;

/** Vertical timeline list; use with TimelineItem children. */
function Timeline({ className, ...props }: TimelineProps) {
  return (
    <ol
      data-slot="timeline"
      className={cn("relative m-0 list-none space-y-0 ps-0", className)}
      {...props}
    />
  );
}

export type TimelineItemProps = React.ComponentPropsWithoutRef<"li">;

/** Grid row with optional vertical connector (hidden on last item). */
function TimelineItem({ className, ...props }: TimelineItemProps) {
  return (
    <li
      data-slot="timeline-item"
      className={cn(
        "relative grid grid-cols-[2.5rem_1fr] gap-x-4 pb-8 last:pb-0",
        "before:absolute before:start-5 before:top-10 before:bottom-0 before:w-px before:bg-border last:before:hidden",
        className,
      )}
      {...props}
    />
  );
}

export type TimelineIndicatorProps = React.HTMLAttributes<HTMLDivElement>;

/** Column for dot / custom icon; place inside first grid column. */
function TimelineIndicator({ className, children, ...props }: TimelineIndicatorProps) {
  return (
    <div
      data-slot="timeline-indicator"
      className={cn("relative z-10 flex justify-center pt-1", className)}
      {...props}
    >
      {children ?? (
        <div
          className="flex size-10 shrink-0 items-center justify-center rounded-full border border-border bg-card text-muted-foreground shadow-sm"
          aria-hidden
        />
      )}
    </div>
  );
}

export type TimelineContentProps = React.ComponentPropsWithoutRef<"div">;

function TimelineContent({ className, ...props }: TimelineContentProps) {
  return <div data-slot="timeline-content" className={cn("min-w-0 pt-1", className)} {...props} />;
}

export type TimelineTitleProps = React.ComponentPropsWithoutRef<"p">;

function TimelineTitle({ className, ...props }: TimelineTitleProps) {
  return <p data-slot="timeline-title" className={cn("text-sm font-semibold text-foreground", className)} {...props} />;
}

export type TimelineMetaProps = React.ComponentPropsWithoutRef<"p">;

function TimelineMeta({ className, ...props }: TimelineMetaProps) {
  return (
    <p data-slot="timeline-meta" className={cn("text-xs text-muted-foreground", className)} {...props} />
  );
}

export type TimelineBodyProps = React.ComponentPropsWithoutRef<"div">;

function TimelineBody({ className, ...props }: TimelineBodyProps) {
  return (
    <div data-slot="timeline-body" className={cn("mt-2 text-sm text-muted-foreground", className)} {...props} />
  );
}

export { Timeline, TimelineItem, TimelineIndicator, TimelineContent, TimelineTitle, TimelineMeta, TimelineBody };
