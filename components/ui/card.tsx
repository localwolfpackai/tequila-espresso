import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const cardVariants = cva(
  "rounded-xl border text-card-foreground motion-safe:transition-[box-shadow,border-color,background-color,transform] motion-safe:duration-300 motion-safe:ease-out motion-reduce:transition-none",
  {
    variants: {
      variant: {
        elevated:
          "border-border/70 bg-card/95 shadow-md ring-1 ring-foreground/[0.04] motion-safe:hover:shadow-lg motion-safe:hover:border-primary/25 dark:ring-foreground/[0.08]",
        outlined:
          "border-border bg-card shadow-xs motion-safe:hover:border-foreground/15 motion-safe:hover:shadow-sm",
        filled:
          "border-transparent bg-muted/80 motion-safe:hover:bg-muted/90",
        glass:
          "border-border/50 bg-card/80 shadow-md backdrop-blur-md motion-safe:hover:shadow-lg dark:border-border/40 dark:bg-card/55",
      },
    },
    defaultVariants: {
      variant: "elevated",
    },
  },
);

export type CardProps = React.HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof cardVariants>;

function Card({ className, variant, ...props }: CardProps) {
  return <div className={cn(cardVariants({ variant }), className)} {...props} />;
}

function CardHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex flex-col space-y-1.5 p-6", className)} {...props} />;
}

function CardTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h3 className={cn("font-semibold leading-none tracking-tight", className)} {...props} />;
}

function CardDescription({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn("text-sm text-muted-foreground", className)} {...props} />;
}

function CardContent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("p-6 pt-0", className)} {...props} />;
}

function CardFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex items-center p-6 pt-0", className)} {...props} />;
}

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter };
