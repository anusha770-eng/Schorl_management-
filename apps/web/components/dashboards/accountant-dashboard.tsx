"use client";

import * as React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CreditCard, DollarSign, HeartHandshake, ArrowRight, CheckCircle2 } from "lucide-react";

interface AccountantDashboardProps {
  onNavigate: (tab: string) => void;
}

export function AccountantDashboard({ onNavigate }: AccountantDashboardProps) {
  return (
    <div className="space-y-6">
      <div className="p-6 rounded-2xl bg-gradient-to-r from-brand-600/10 via-surface-elevated to-surface border border-brand-500/20 shadow-subtle flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-brand-500 font-mono">
              Institutional Bursar & Finance Desk
            </span>
            <Badge variant="brand" className="text-[10px]">Suresh Nair</Badge>
          </div>
          <h1 className="text-2xl font-bold font-display text-foreground tracking-tight">
            Financial Ledger & Invoicing Command
          </h1>
          <p className="text-xs text-foreground/60 mt-1 max-w-xl">
            Term 2 collection stands at <strong>84.2%</strong>. 1 parent has requested a discreet 2-part split installment plan for review.
          </p>
        </div>

        <Button
          variant="primary"
          size="md"
          onClick={() => onNavigate("fees")}
          className="text-xs font-semibold"
        >
          Manage Invoices & Installments
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="p-4 bg-surface border border-surface-border">
          <span className="text-xs text-foreground/50 font-medium">Q3 Collections</span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold font-display text-foreground font-mono">₹45,750</span>
            <span className="text-xs text-status-present font-medium">Verified</span>
          </div>
          <p className="text-[11px] text-foreground/40 mt-1">Reconciled via Razorpay gateway</p>
        </Card>

        <Card className="p-4 bg-surface border border-surface-border">
          <span className="text-xs text-foreground/50 font-medium">Installment Plans Active</span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold font-display text-brand-500">1 Request</span>
            <span className="text-xs text-foreground/50 font-medium">Discreet</span>
          </div>
          <p className="text-[11px] text-foreground/40 mt-1">Rahul Nair family split plan</p>
        </Card>

        <Card className="p-4 bg-surface border border-surface-border">
          <span className="text-xs text-foreground/50 font-medium">Overdue Recovery Rate</span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold font-display text-status-present">94.1%</span>
            <span className="text-xs text-foreground/50 font-medium">Zero-Penalty</span>
          </div>
          <p className="text-[11px] text-foreground/40 mt-1">Empathetic automated reminders</p>
        </Card>
      </div>
    </div>
  );
}
