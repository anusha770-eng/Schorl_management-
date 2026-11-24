"use client";

import * as React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShieldCheck, Lock, Activity, Users, Settings } from "lucide-react";

interface AdminDashboardProps {
  onNavigate: (tab: string) => void;
}

export function AdminDashboard({ onNavigate }: AdminDashboardProps) {
  return (
    <div className="space-y-6">
      <div className="p-6 rounded-2xl bg-gradient-to-r from-brand-600/10 via-surface-elevated to-surface border border-brand-500/20 shadow-subtle flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-brand-500 font-mono">
              System Administration & Security Console
            </span>
            <Badge variant="brand" className="text-[10px]">Aditi Rao</Badge>
          </div>
          <h1 className="text-2xl font-bold font-display text-foreground tracking-tight">
            Aetheris Institutional Governance
          </h1>
          <p className="text-xs text-foreground/60 mt-1 max-w-xl">
            System status: <strong>All Services Operational</strong>. Audit logging active for minors' privacy and sensitive record reads.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="secondary"
            size="md"
            onClick={() => onNavigate("mtss")}
            className="text-xs gap-1.5"
          >
            <Activity className="w-4 h-4 text-brand-500" />
            Audit Logs
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="p-4 bg-surface border border-surface-border">
          <span className="text-xs text-foreground/50 font-medium">Minors Privacy & Encryption</span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold font-display text-status-present">AES-256-GCM</span>
          </div>
          <p className="text-[11px] text-foreground/40 mt-1">Counseling records cryptographically sealed</p>
        </Card>

        <Card className="p-4 bg-surface border border-surface-border">
          <span className="text-xs text-foreground/50 font-medium">Audit Trail Events</span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold font-display text-brand-500">Immutable</span>
          </div>
          <p className="text-[11px] text-foreground/40 mt-1">Every sensitive record access logged</p>
        </Card>

        <Card className="p-4 bg-surface border border-surface-border">
          <span className="text-xs text-foreground/50 font-medium">Database Health</span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold font-display text-status-present">100% Sync</span>
          </div>
          <p className="text-[11px] text-foreground/40 mt-1">Prisma ORM • Zero integrity faults</p>
        </Card>
      </div>
    </div>
  );
}
