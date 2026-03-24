"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  type DefaultValues,
  useForm as useReactHookForm,
  type FieldValues,
  type Resolver,
  type SubmitHandler,
  type UseFormReturn,
} from "react-hook-form";
import type { z } from "zod";

type UseAmberFormProps<TFieldValues extends FieldValues> = {
  schema: z.ZodType<unknown>;
  defaultValues?: DefaultValues<TFieldValues>;
};

export function useAmberForm<TFieldValues extends FieldValues>({
  schema,
  defaultValues,
}: UseAmberFormProps<TFieldValues>): UseFormReturn<TFieldValues> {
  const resolver = zodResolver(
    schema as unknown as Parameters<typeof zodResolver>[0],
  ) as unknown as Resolver<TFieldValues>;

  return useReactHookForm<TFieldValues>({
    resolver,
    defaultValues,
  });
}

type FormProps<TFieldValues extends FieldValues> = {
  form: UseFormReturn<TFieldValues>;
  onSubmit: SubmitHandler<TFieldValues>;
  className?: string;
  children: React.ReactNode;
};

export function Form<TFieldValues extends FieldValues>({
  form,
  onSubmit,
  className,
  children,
}: FormProps<TFieldValues>) {
  return (
    <form className={className} onSubmit={form.handleSubmit(onSubmit)}>
      {children}
    </form>
  );
}
