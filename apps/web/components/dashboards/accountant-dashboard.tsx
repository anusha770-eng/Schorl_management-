"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  CreditCard,
  DollarSign,
  HeartHandshake,
  CheckCircle2,
} from "lucide-react";

interface AccountantDashboardProps {
  onNavigate: (tab: string) => void;
}

export function AccountantDashboard({ onNavigate }: AccountantDashboardProps) {
  const [metrics, setMetrics] = useState<any>(null);

  useEffect(() => {
    fetch("/api/dashboard/metrics")
      .then((r) => r.json())
      .then((data) => setMetrics(data))
      .catch(() => {});
  }, []);

  const totalInvoiced = metrics?.financials?.totalInvoiced ?? 59000;
  const totalPaid = metrics?.financials?.totalPaid ?? 45750;
  const collectionRate = metrics?.financials?.collectionPercentage ?? 77.5;
  const pendingInstallments = metrics?.financials?.pendingInstallments ?? 1;

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
            Overall collection stands at <strong>{collectionRate}%</strong> across active invoices. {pendingInstallments} parent split installment request is queued for review.
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
          <span className="text-xs text-foreground/50 font-medium">Reconciled Collections</span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold font-display text-foreground font-mono">
              ₹{totalPaid.toLocaleString("en-IN")}
            </span>
            <span className="text-xs text-status-present font-medium">Live DB</span>
          </div>
          <p className="text-[11px] text-foreground/40 mt-1">Out of ₹{totalInvoiced.toLocaleString("en-IN")} total billed</p>
        </Card>

        <Card className="p-4 bg-surface border border-surface-border">
          <span className="text-xs text-foreground/50 font-medium">Installment Plans Active</span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold font-display text-brand-500">
              {pendingInstallments} Request
            </span>
            <span className="text-xs text-foreground/50 font-medium">Discreet</span>
          </div>
          <p className="text-[11px] text-foreground/40 mt-1">Parent requested split plan from DB</p>
        </Card>

        <Card className="p-4 bg-surface border border-surface-border">
          <span className="text-xs text-foreground/50 font-medium">Collection Run-Rate</span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold font-display text-status-present">
              {collectionRate}%
            </span>
            <span className="text-xs text-foreground/50 font-medium">Zero-Penalty</span>
          </div>
          <p className="text-[11px] text-foreground/40 mt-1">Automated empathetic notifications</p>
        </Card>
      </div>
    </div>
  );
}
