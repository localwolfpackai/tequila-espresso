import * as React from "react";
import { cn } from "@/lib/utils";

type FieldProps = React.HTMLAttributes<HTMLDivElement>;

function Field({ className, ...props }: FieldProps) {
  return <div className={cn("grid gap-1.5", className)} {...props} />;
}

function FieldLabel({
  className,
  required,
  ...props
}: React.LabelHTMLAttributes<HTMLLabelElement> & { required?: boolean }) {
  return (
    <label className={cn("text-sm font-medium leading-none", className)} {...props}>
      {props.children}
      {required ? <span className="ml-1 text-destructive">*</span> : null}
    </label>
  );
}

function FieldDescription({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn("text-xs text-muted-foreground", className)} {...props} />;
}

function FieldError({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn("text-xs text-destructive", className)} {...props} />;
}

export { Field, FieldLabel, FieldDescription, FieldError };
