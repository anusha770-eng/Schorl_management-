"use client";

import * as React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  CheckSquare,
  Sparkles,
  AlertTriangle,
  GraduationCap,
  Calendar,
  Users,
  Clock,
  ArrowRight,
} from "lucide-react";

interface TeacherDashboardProps {
  onNavigate: (tab: string) => void;
}

export function TeacherDashboard({ onNavigate }: TeacherDashboardProps) {
  return (
    <div className="space-y-6">
      {/* Welcome Hero */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-brand-600/10 via-surface-elevated to-surface border border-brand-500/20 shadow-subtle flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-brand-500 font-mono">
              Academic Block B • Grade 9-A Class Teacher
            </span>
            <Badge variant="present" className="text-[10px]">Active Shift</Badge>
          </div>
          <h1 className="text-2xl font-bold font-display text-foreground tracking-tight">
            Good morning, Vikram Rathore
          </h1>
          <p className="text-xs text-foreground/60 mt-1 max-w-xl leading-relaxed">
            You have <strong>4 instructional periods</strong> today. 1 substitute proxy candidate is pre-matched for Period 3 if needed. 1 student in 9-A requires concept scaffolding in Linear Equations.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Button
            variant="primary"
            size="md"
            onClick={() => onNavigate("attendance")}
            className="gap-2 text-xs font-semibold shadow-glow"
          >
            <CheckSquare className="w-4 h-4" />
            Take 9-A Roll Call
          </Button>
          <Button
            variant="secondary"
            size="md"
            onClick={() => onNavigate("mtss")}
            className="gap-2 text-xs"
          >
            <AlertTriangle className="w-4 h-4 text-status-warning" />
            MTSS Action Cards (1)
          </Button>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4 bg-surface border border-surface-border">
          <span className="text-xs text-foreground/50 font-medium">9-A Morning Attendance</span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold font-display text-foreground">96.8%</span>
            <span className="text-xs text-status-present font-medium">31/32 Present</span>
          </div>
          <p className="text-[11px] text-foreground/40 mt-1">1 student marked excused leave</p>
        </Card>

        <Card className="p-4 bg-surface border border-surface-border">
          <span className="text-xs text-foreground/50 font-medium">Weekly Teaching Load</span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold font-display text-foreground">22 / 28 hrs</span>
            <span className="text-xs text-brand-500 font-medium">Optimal Balance</span>
          </div>
          <p className="text-[11px] text-foreground/40 mt-1">6 free periods reserved for planning</p>
        </Card>

        <Card className="p-4 bg-surface border border-surface-border">
          <span className="text-xs text-foreground/50 font-medium">Formative Health Metric</span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold font-display text-foreground">84.5%</span>
            <span className="text-xs text-status-present font-medium">+3.2% vs Term 1</span>
          </div>
          <p className="text-[11px] text-foreground/40 mt-1">Midterm math class average</p>
        </Card>

        <Card className="p-4 bg-surface border border-surface-border">
          <span className="text-xs text-foreground/50 font-medium">Socratic Remedial Sessions</span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold font-display text-foreground">14 Active</span>
            <span className="text-xs text-brand-500 font-medium">Auto-Tutor</span>
          </div>
          <p className="text-[11px] text-foreground/40 mt-1">Guided quadratic problem solving</p>
        </Card>
      </div>

      {/* Today's Schedule & Action Items */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 border border-surface-border bg-surface">
          <CardHeader className="pb-3 border-b border-surface-border/50">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base flex items-center gap-2">
                <Calendar className="w-4 h-4 text-brand-500" />
                Today's Instructional Routine (Monday)
              </CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onNavigate("timetable")}
                className="text-xs gap-1"
              >
                Full Matrix <ArrowRight className="w-3 h-3" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-0 divide-y divide-surface-border/60">
            <div className="p-4 flex items-center justify-between hover:bg-surface-subtle/30">
              <div className="flex items-center gap-3">
                <Badge variant="brand" className="font-mono text-xs">P1</Badge>
                <div>
                  <span className="font-semibold text-xs text-foreground block">
                    Mathematics (Linear Equations Ch 4)
                  </span>
                  <span className="text-[11px] text-foreground/50">Grade 9-A • Room 204</span>
                </div>
              </div>
              <span className="text-xs font-mono text-foreground/60">08:30 – 09:15</span>
            </div>

            <div className="p-4 flex items-center justify-between bg-brand-50/20 dark:bg-brand-500/5">
              <div className="flex items-center gap-3">
                <Badge variant="outline" className="font-mono text-xs">P2</Badge>
                <div>
                  <span className="font-semibold text-xs text-foreground block">
                    Planning & Remediation Hour
                  </span>
                  <span className="text-[11px] text-foreground/50">Staff Room B • Open Slot</span>
                </div>
              </div>
              <span className="text-xs font-mono text-brand-500 font-medium">09:20 – 10:05</span>
            </div>

            <div className="p-4 flex items-center justify-between hover:bg-surface-subtle/30">
              <div className="flex items-center gap-3">
                <Badge variant="brand" className="font-mono text-xs">P4</Badge>
                <div>
                  <span className="font-semibold text-xs text-foreground block">
                    Mathematics (Quadratic Factoring)
                  </span>
                  <span className="text-[11px] text-foreground/50">Grade 9-B • Room 205</span>
                </div>
              </div>
              <span className="text-xs font-mono text-foreground/60">11:15 – 12:00</span>
            </div>
          </CardContent>
        </Card>

        {/* Quick MTSS Nudge */}
        <Card className="border border-surface-border bg-surface flex flex-col justify-between">
          <CardHeader className="pb-3 border-b border-surface-border/50">
            <CardTitle className="text-base flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-status-warning" />
              MTSS Focus: Rahul Nair
            </CardTitle>
            <CardDescription className="text-xs">
              Formative drop (-24%) detected in factoring polynomials.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4 space-y-3 flex-1 flex flex-col justify-between">
            <div className="p-3 bg-surface-subtle rounded-xl text-xs space-y-1.5 border border-surface-border">
              <span className="font-semibold text-brand-500 text-[11px]">Recommended Strategy:</span>
              <p className="text-foreground/80 leading-relaxed text-[11px]">
                Rahul completed 2 practice problems on splitting the middle term. Assign Socratic Ch 4 module for tonight.
              </p>
            </div>
            <Button
              variant="primary"
              size="sm"
              onClick={() => onNavigate("socratic")}
              className="w-full text-xs gap-1.5 mt-2"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Open Socratic Review
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
