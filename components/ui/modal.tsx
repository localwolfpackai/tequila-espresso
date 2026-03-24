"use client";

import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

export type ModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: React.ReactNode;
  description?: React.ReactNode;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  contentClassName?: string;
  size?: "sm" | "md" | "lg" | "xl" | "full";
};

export function Modal({
  open,
  onOpenChange,
  title,
  description,
  children,
  footer,
  contentClassName,
  size = "md",
}: ModalProps) {
  const hasVisibleTitle =
    title != null && (typeof title !== "string" || title.trim().length > 0);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={cn(contentClassName)} size={size}>
        <DialogHeader>
          <DialogTitle className={cn(!hasVisibleTitle && "sr-only")}>
            {hasVisibleTitle ? title : "Dialog"}
          </DialogTitle>
          {description != null ? <DialogDescription>{description}</DialogDescription> : null}
        </DialogHeader>
        {children}
        {footer != null ? <DialogFooter>{footer}</DialogFooter> : null}
      </DialogContent>
    </Dialog>
  );
}
