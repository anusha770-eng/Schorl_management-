"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Bus,
  CheckCircle2,
  CreditCard,
  Sparkles,
} from "lucide-react";

interface ParentDashboardProps {
  onNavigate: (tab: string) => void;
}

export function ParentDashboard({ onNavigate }: ParentDashboardProps) {
  const [selectedChild, setSelectedChild] = useState<"ananya" | "arjun">("ananya");
  const [metrics, setMetrics] = useState<any>(null);

  useEffect(() => {
    fetch("/api/dashboard/metrics")
      .then((r) => r.json())
      .then((data) => setMetrics(data))
      .catch(() => {});
  }, []);

  const totalPaid = metrics?.financials?.totalPaid ?? 45750;

  return (
    <div className="space-y-6">
      {/* Multi-Child Switcher Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-brand-600/10 via-surface-elevated to-surface border border-brand-500/20 shadow-subtle flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-brand-500 font-mono">
              Family Guardian Portal • Meera Iyer
            </span>
          </div>
          <h1 className="text-2xl font-bold font-display text-foreground tracking-tight">
            Family Learning & Transit Hub
          </h1>
          <p className="text-xs text-foreground/60 mt-1">
            Seamlessly monitor your children's safe transit, growth milestones, and circulars.
          </p>
        </div>

        {/* Seamless Child Switcher */}
        <div className="flex items-center gap-2 p-1 bg-surface-subtle rounded-xl border border-surface-border">
          <button
            onClick={() => setSelectedChild("ananya")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              selectedChild === "ananya"
                ? "bg-brand-600 text-white shadow-subtle"
                : "text-foreground/70 hover:bg-surface-elevated"
            }`}
          >
            Ananya (Grade 9-A)
          </button>
          <button
            onClick={() => setSelectedChild("arjun")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              selectedChild === "arjun"
                ? "bg-brand-600 text-white shadow-subtle"
                : "text-foreground/70 hover:bg-surface-elevated"
            }`}
          >
            Arjun (Grade 4-A)
          </button>
        </div>
      </div>

      {/* SafeRide Live Status Card */}
      <Card className="border border-surface-border shadow-card bg-surface overflow-hidden">
        <CardHeader className="bg-surface-subtle/40 pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bus className="w-5 h-5 text-brand-500" />
              <CardTitle className="text-base">SafeRide Dual-Verification Transit</CardTitle>
            </div>
            <Badge variant="present" className="gap-1 text-xs">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Boarded Safe
            </Badge>
          </div>
          <CardDescription className="text-xs">
            {selectedChild === "ananya"
              ? "Ananya scanned into Bus Route 04 at Stop #2 (HSR Layout) with verified attendant manifest."
              : "Arjun arrived safely at campus at 08:12 AM."}
          </CardDescription>
        </CardHeader>
        <CardContent className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="text-xs text-foreground/80 space-y-1">
            <p>
              Vehicle: <strong className="font-mono text-foreground">KA-01-MJ-8822 (Route 4)</strong>
            </p>
            <p className="text-foreground/50">
              Attendant: Ramesh Gowda (+91 98808 34567)
            </p>
          </div>
          <Button
            size="sm"
            variant="secondary"
            onClick={() => onNavigate("transport")}
            className="text-xs bg-surface"
          >
            View Live Route Progress
          </Button>
        </CardContent>
      </Card>

      {/* Academic & Financial Split Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border border-surface-border bg-surface p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-sm text-foreground flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-brand-500" />
              {selectedChild === "ananya" ? "Ananya's Growth Pulse" : "Arjun's Growth Pulse"}
            </h3>
            <Badge variant="outline" className="text-xs">HGI: 91.5%</Badge>
          </div>
          <p className="text-xs text-foreground/70 leading-relaxed">
            Latest Mid-Term assessment: <strong>94% in Mathematics</strong> and <strong>94% in Physics</strong>. Teacher remark notes strong resilience in algebraic derivations.
          </p>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => onNavigate("gradebook")}
            className="text-xs p-0 text-brand-500 hover:text-brand-600 justify-start"
          >
            View Detailed Term Report Card →
          </Button>
        </Card>

        <Card className="border border-surface-border bg-surface p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-sm text-foreground flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-brand-500" />
              Fee Account Status
            </h3>
            <Badge variant="present" className="text-xs">Term 2 Settled</Badge>
          </div>
          <p className="text-xs text-foreground/70 leading-relaxed">
            Current dues are fully settled. Total cleared across invoices: ₹{totalPaid.toLocaleString("en-IN")}. Flexible split installment options are available for upcoming terms.
          </p>
          <Button
            size="sm"
            variant="secondary"
            onClick={() => onNavigate("fees")}
            className="text-xs bg-surface-subtle"
          >
            Review Invoices & Split Options
          </Button>
        </Card>
      </div>
    </div>
  );
}
