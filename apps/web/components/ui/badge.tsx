"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "brand" | "present" | "absent" | "warning" | "outline";
}

export function Badge({ className, variant = "default", ...props }: BadgeProps) {
  const variants = {
    default: "bg-surface-subtle text-foreground/80 border-surface-border",
    brand: "bg-brand-50 text-brand-600 dark:bg-brand-500/10 dark:text-brand-500 border-brand-500/20",
    present: "bg-status-present-bg text-status-present border-status-present/20",
    absent: "bg-status-absent-bg text-status-absent border-status-absent/20",
    warning: "bg-status-warning-bg text-status-warning border-status-warning/20",
    outline: "border-surface-border text-foreground/80",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border transition-colors",
        variants[variant],
        className
      )}
      {...props}
    />
  );
}
