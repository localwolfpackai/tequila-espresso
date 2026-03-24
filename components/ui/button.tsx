"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Spinner } from "@/components/ui/spinner";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 motion-safe:transition-[color,box-shadow,opacity,filter,background-color,border-color,text-decoration-color] motion-safe:duration-200 motion-safe:ease-out motion-reduce:transition-none",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-sm hover:opacity-95 motion-safe:hover:shadow-md motion-safe:active:brightness-95 motion-reduce:active:brightness-100",
        secondary:
          "bg-secondary text-secondary-foreground hover:opacity-95 motion-safe:active:brightness-95 motion-reduce:active:brightness-100",
        outline:
          "border border-border bg-background hover:bg-muted motion-safe:active:bg-muted/80 motion-reduce:active:bg-muted",
        ghost:
          "hover:bg-muted motion-safe:active:bg-muted/80 motion-reduce:active:bg-muted",
        destructive:
          "bg-destructive text-white shadow-sm hover:opacity-95 motion-safe:hover:shadow-md motion-safe:active:brightness-95 motion-reduce:active:brightness-100",
        success:
          "bg-success text-primary-foreground shadow-sm hover:opacity-95 motion-safe:hover:shadow-md motion-safe:active:brightness-95 motion-reduce:active:brightness-100",
        link: "h-auto p-0 text-primary underline-offset-4 hover:underline motion-safe:transition-[color,opacity,text-decoration-color] active:opacity-80",
      },
      size: {
        xs: "h-7 px-2 text-xs",
        sm: "h-8 px-3",
        md: "h-10 px-4",
        lg: "h-11 px-6 text-base",
        xl: "h-12 px-8 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
  loadingText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      loading = false,
      disabled,
      leftIcon,
      rightIcon,
      loadingText,
      children,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : "button";

    if (asChild) {
      return (
        <Comp
          ref={ref}
          data-slot="button"
          className={cn(buttonVariants({ variant, size }), className)}
          aria-busy={loading}
          {...props}
        >
          {children}
        </Comp>
      );
    }

    return (
      <Comp
        ref={ref}
        data-slot="button"
        className={cn(buttonVariants({ variant, size }), className)}
        disabled={disabled || loading}
        aria-busy={loading}
        {...props}
      >
        {loading ? <Spinner className="size-3.5" /> : leftIcon}
        {loading && loadingText ? loadingText : children}
        {!loading && rightIcon}
      </Comp>
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
