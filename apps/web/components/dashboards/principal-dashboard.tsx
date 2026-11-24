"use client";

import * as React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ShieldAlert,
  AlertTriangle,
  UserCheck,
  Calendar,
  Users,
  CheckCircle2,
  Lock,
  ArrowRight,
} from "lucide-react";

interface PrincipalDashboardProps {
  onNavigate: (tab: string) => void;
}

export function PrincipalDashboard({ onNavigate }: PrincipalDashboardProps) {
  return (
    <div className="space-y-6">
      {/* Principal Executive Greeting */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-brand-600/10 via-surface-elevated to-surface border border-brand-500/20 shadow-subtle flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-brand-500 font-mono">
              Executive School Leadership Suite
            </span>
            <Badge variant="brand" className="text-[10px]">Master Governance</Badge>
          </div>
          <h1 className="text-2xl font-bold font-display text-foreground tracking-tight">
            Dr. Sunita Kulkarni • Head of School
          </h1>
          <p className="text-xs text-foreground/60 mt-1 max-w-xl leading-relaxed">
            Campus telemetry indicates <strong>96.4% student attendance</strong> today. The Autonomous Substitution Dispatcher has pre-evaluated 1 teacher absence with 100% clash-free coverage. 1 student in Tier 2 MTSS review.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Button
            variant="primary"
            size="md"
            onClick={() => onNavigate("timetable")}
            className="gap-2 text-xs font-semibold shadow-glow"
          >
            <UserCheck className="w-4 h-4" />
            Proxy Dispatcher (1)
          </Button>
          <Button
            variant="secondary"
            size="md"
            onClick={() => onNavigate("mtss")}
            className="gap-2 text-xs"
          >
            <Lock className="w-3.5 h-3.5 text-brand-500" />
            Pastoral MTSS Dossier
          </Button>
        </div>
      </div>

      {/* High-Level Institutional Health Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4 bg-surface border border-surface-border">
          <span className="text-xs text-foreground/50 font-medium">Whole-School Attendance</span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold font-display text-foreground">96.4%</span>
            <span className="text-xs text-status-present font-medium">Above Target</span>
          </div>
          <p className="text-[11px] text-foreground/40 mt-1">1,156 of 1,200 students present</p>
        </Card>

        <Card className="p-4 bg-surface border border-surface-border">
          <span className="text-xs text-foreground/50 font-medium">OmniLoop MTSS Alerts</span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold font-display text-status-warning">1 In Tier 2</span>
            <span className="text-xs text-foreground/50 font-medium">0 In Tier 3</span>
          </div>
          <p className="text-[11px] text-foreground/40 mt-1">Targeted remediation assigned</p>
        </Card>

        <Card className="p-4 bg-surface border border-surface-border">
          <span className="text-xs text-foreground/50 font-medium">Faculty Workload Index</span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold font-display text-foreground">78.2%</span>
            <span className="text-xs text-brand-500 font-medium">Healthy Equilibrium</span>
          </div>
          <p className="text-[11px] text-foreground/40 mt-1">Zero teachers in burnout threshold (&gt;32h)</p>
        </Card>

        <Card className="p-4 bg-surface border border-surface-border">
          <span className="text-xs text-foreground/50 font-medium">SafeRide Transit Fleet</span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold font-display text-foreground">14 / 14 Buses</span>
            <span className="text-xs text-status-present font-medium">100% On-Time</span>
          </div>
          <p className="text-[11px] text-foreground/40 mt-1">Dual manifest verification running</p>
        </Card>
      </div>

      {/* Operational Split Pane */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Morning Substitute Dispatch Widget */}
        <Card className="border border-surface-border bg-surface">
          <CardHeader className="pb-3 border-b border-surface-border/50">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base flex items-center gap-2">
                <UserCheck className="w-4 h-4 text-brand-500" />
                Smart Morning Substitute Recommendations
              </CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onNavigate("timetable")}
                className="text-xs"
              >
                Review Matrix
              </Button>
            </div>
            <CardDescription className="text-xs">
              Algorithmic constraint matching evaluating free periods and department synergy.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4 space-y-3">
            <div className="p-3.5 bg-surface-subtle rounded-xl border border-surface-border space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-foreground">
                  Grade 9-A Mathematics (Period 3)
                </span>
                <Badge variant="brand" className="text-[10px]">96% Match</Badge>
              </div>
              <p className="text-xs text-foreground/70">
                Recommended Proxy: <strong className="text-foreground">Priya Patel (Physics)</strong>
              </p>
              <p className="text-[11px] text-foreground/50 leading-relaxed">
                Priya is completely free during Period 3 and has a balanced weekly schedule (18/28 hours).
              </p>
              <Button
                size="sm"
                variant="primary"
                onClick={() => onNavigate("timetable")}
                className="text-xs w-full mt-2"
              >
                1-Click Confirm & Push App Notification
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Confidential Pastoral MTSS Overview */}
        <Card className="border border-surface-border bg-surface">
          <CardHeader className="pb-3 border-b border-surface-border/50">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base flex items-center gap-2">
                <Lock className="w-4 h-4 text-status-warning" />
                Confidential Pastoral Care Oversight
              </CardTitle>
              <Badge variant="outline" className="text-[10px]">Principal Clearance</Badge>
            </div>
            <CardDescription className="text-xs">
              Cryptographically partitioned clinical notes with immutable audit logging.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4 space-y-3">
            <div className="p-3 bg-brand-50/40 dark:bg-brand-500/10 rounded-xl border border-brand-500/20 space-y-1.5 text-xs">
              <div className="flex items-center justify-between font-semibold text-brand-500">
                <span>Active Case: Rahul Nair (Grade 9-A)</span>
                <Badge variant="warning" className="text-[10px]">Tier 2 Moderate</Badge>
              </div>
              <p className="text-foreground/80 leading-relaxed text-[11px]">
                "Confidential: Student experiencing exam stress due to recent family relocation. Socratic remedial algebra module deployed. 1:1 check-in scheduled."
              </p>
              <span className="text-[10px] text-foreground/40 block">
                Last reviewed by Counselor on Nov 24, 2026 • Audit logged
              </span>
            </div>
            <Button
              size="sm"
              variant="secondary"
              onClick={() => onNavigate("mtss")}
              className="w-full text-xs"
            >
              Open Full Pastoral Ledger
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
