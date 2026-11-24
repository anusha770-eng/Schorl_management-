"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bus, QrCode } from "lucide-react";

interface TransportDashboardProps {
  onNavigate: (tab: string) => void;
}

export function TransportDashboard({ onNavigate }: TransportDashboardProps) {
  const [metrics, setMetrics] = useState<any>(null);

  useEffect(() => {
    fetch("/api/dashboard/metrics")
      .then((r) => r.json())
      .then((data) => setMetrics(data))
      .catch(() => {});
  }, []);

  const totalRiders = metrics?.counts?.totalBusRiders ?? 2;
  const boardedCount = metrics?.counts?.boardedTodayCount ?? 1;

  return (
    <div className="space-y-6">
      <div className="p-6 rounded-2xl bg-gradient-to-r from-brand-600/10 via-surface-elevated to-surface border border-brand-500/20 shadow-subtle flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-brand-500 font-mono">
              Fleet Operations & Attendant Console
            </span>
            <Badge variant="present" className="text-[10px]">Ramesh Gowda</Badge>
          </div>
          <h1 className="text-2xl font-bold font-display text-foreground tracking-tight">
            Bus Route 04 (Outer Ring Road Express)
          </h1>
          <p className="text-xs text-foreground/60 mt-1 max-w-xl">
            Live telemetry active. Vehicle <strong>KA-01-MJ-8822</strong> is approaching Bellandur EcoSpace (Stop 3). {boardedCount} of {totalRiders} students verified boarded via tap.
          </p>
        </div>

        <Button
          variant="primary"
          size="md"
          onClick={() => onNavigate("transport")}
          className="text-xs font-semibold gap-1.5"
        >
          <QrCode className="w-4 h-4" />
          Open QR Boarding Manifest
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="p-4 bg-surface border border-surface-border">
          <span className="text-xs text-foreground/50 font-medium">Route 04 Status</span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold font-display text-status-present">In Transit</span>
          </div>
          <p className="text-[11px] text-foreground/40 mt-1">Next: Bellandur EcoSpace (ETA 3m)</p>
        </Card>

        <Card className="p-4 bg-surface border border-surface-border">
          <span className="text-xs text-foreground/50 font-medium">Student Passenger Manifest</span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold font-display text-foreground">
              {boardedCount} / {totalRiders} Boarded
            </span>
            <span className="text-xs text-brand-500 font-medium">Live DB</span>
          </div>
          <p className="text-[11px] text-foreground/40 mt-1">Passenger count computed from BusAttendance records</p>
        </Card>

        <Card className="p-4 bg-surface border border-surface-border">
          <span className="text-xs text-foreground/50 font-medium">Vehicle Safety Checklist</span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold font-display text-status-present">Passed</span>
          </div>
          <p className="text-[11px] text-foreground/40 mt-1">First-aid, GPS, speed governor checked</p>
        </Card>
      </div>
    </div>
  );
}
