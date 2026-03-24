"use client";

import { useId, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export type CtaSectionProps = {
  title: string;
  description: string;
  children: ReactNode;
  className?: string;
};

export function CtaSection({ title, description, children, className }: CtaSectionProps) {
  const titleId = useId();

  return (
    <section
      className={cn(
        "rounded-xl border border-border bg-card px-6 py-10 shadow-sm md:px-10 md:py-12",
        className,
      )}
      aria-labelledby={titleId}
    >
      <div className="mx-auto flex max-w-3xl flex-col gap-6 text-center md:gap-8">
        <div className="space-y-2">
          <h2 id={titleId} className="text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
            {title}
          </h2>
          <p className="text-muted-foreground md:text-lg">{description}</p>
        </div>
        <div className="flex flex-col items-center justify-center gap-3 sm:flex-row sm:flex-wrap">{children}</div>
      </div>
    </section>
  );
}
