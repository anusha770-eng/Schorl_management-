"use client";

import * as React from "react";
import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Sparkles,
  BookOpen,
  Calendar,
  Smile,
  Bus,
  CheckCircle2,
  Clock,
  ArrowRight,
} from "lucide-react";

interface StudentDashboardProps {
  onNavigate: (tab: string) => void;
}

export function StudentDashboard({ onNavigate }: StudentDashboardProps) {
  const [selectedMood, setSelectedMood] = useState<number | null>(5);
  const [moodLogged, setMoodLogged] = useState(false);

  const handleMoodSelect = (score: number) => {
    setSelectedMood(score);
    setMoodLogged(true);
    setTimeout(() => setMoodLogged(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Student Welcome Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-brand-600/15 via-surface-elevated to-surface border border-brand-500/20 shadow-subtle flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-brand-500 font-mono">
              Grade 9-A • Roll 9A-04
            </span>
            <Badge variant="present" className="text-[10px]">Safe at Campus</Badge>
          </div>
          <h1 className="text-2xl font-bold font-display text-foreground tracking-tight">
            Welcome back, Ananya Sharma!
          </h1>
          <p className="text-xs text-foreground/60 mt-1 max-w-xl leading-relaxed">
            Today's learning anchor is <strong>Mathematics Chapter 4: Factoring Quadratic Equations</strong>. Your homework load tonight is estimated at <strong>45 mins (Balanced)</strong>.
          </p>
        </div>

        <Button
          variant="primary"
          size="md"
          onClick={() => onNavigate("socratic")}
          className="gap-2 text-xs font-semibold shadow-glow shrink-0"
        >
          <Sparkles className="w-4 h-4" />
          Ask Socratic Mentor
        </Button>
      </div>

      {/* Cognitive Equilibrium & SEL Mood Strip */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Homework Cognitive Load Indicator */}
        <Card className="p-4 bg-surface border border-surface-border md:col-span-2">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-foreground/70">
              Evening Cognitive Load Balancer
            </span>
            <Badge variant="present" className="text-[10px]">Optimal Equilibrium</Badge>
          </div>
          <div className="w-full bg-surface-subtle h-3 rounded-full overflow-hidden flex">
            <div className="bg-brand-500 h-full w-[45%]" title="Math: 25 mins"></div>
            <div className="bg-status-present h-full w-[25%]" title="Physics: 15 mins"></div>
            <div className="bg-status-warning h-full w-[10%]" title="English: 5 mins"></div>
          </div>
          <div className="flex items-center justify-between text-[11px] text-foreground/50 mt-2 font-mono">
            <span>Estimated Study Time: 45m</span>
            <span>School Max Threshold: 90m</span>
          </div>
        </Card>

        {/* 2-Second Non-Punitive SEL Check-In */}
        <Card className="p-4 bg-surface border border-surface-border">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-foreground/70">Daily Energy Check</span>
            <Smile className="w-3.5 h-3.5 text-brand-500" />
          </div>
          <div className="flex items-center justify-between gap-1 pt-1">
            {[
              { score: 1, label: "Tired" },
              { score: 2, label: "Stressed" },
              { score: 3, label: "Okay" },
              { score: 4, label: "Good" },
              { score: 5, label: "Great" },
            ].map((item) => (
              <button
                key={item.score}
                onClick={() => handleMoodSelect(item.score)}
                className={`flex-1 py-1 px-1 rounded-lg text-xs font-medium text-center transition-all ${
                  selectedMood === item.score
                    ? "bg-brand-600 text-white shadow-subtle"
                    : "bg-surface-subtle text-foreground/60 hover:bg-surface-elevated"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
          {moodLogged && (
            <span className="block text-[10px] text-status-present mt-2 text-center">
              ✓ Logged! Have a wonderful day of learning.
            </span>
          )}
        </Card>
      </div>

      {/* Main Learning Hub Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Next Classes */}
        <Card className="lg:col-span-2 border border-surface-border bg-surface">
          <CardHeader className="pb-3 border-b border-surface-border/50">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base flex items-center gap-2">
                <Calendar className="w-4 h-4 text-brand-500" />
                Today's Class Schedule
              </CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onNavigate("timetable")}
                className="text-xs"
              >
                Timetable
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-0 divide-y divide-surface-border/60">
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Badge variant="brand" className="font-mono text-xs">08:30</Badge>
                <div>
                  <span className="font-semibold text-xs text-foreground block">
                    Mathematics (Algebraic Formulas)
                  </span>
                  <span className="text-[11px] text-foreground/50">Mr. Vikram Rathore • Room 204</span>
                </div>
              </div>
              <Badge variant="present" className="text-[10px]">Completed</Badge>
            </div>

            <div className="p-4 flex items-center justify-between bg-brand-50/20 dark:bg-brand-500/5">
              <div className="flex items-center gap-3">
                <Badge variant="outline" className="font-mono text-xs">09:20</Badge>
                <div>
                  <span className="font-semibold text-xs text-foreground block">
                    Physics (Motion & Kinematics)
                  </span>
                  <span className="text-[11px] text-foreground/50">Ms. Priya Patel • Physics Lab 1</span>
                </div>
              </div>
              <Badge variant="brand" className="text-[10px] animate-pulse">Now Active</Badge>
            </div>

            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Badge variant="outline" className="font-mono text-xs">10:25</Badge>
                <div>
                  <span className="font-semibold text-xs text-foreground block">
                    Statistics Lab & Computational Thinking
                  </span>
                  <span className="text-[11px] text-foreground/50">Mr. Rohan Verma • Computer Lab</span>
                </div>
              </div>
              <span className="text-xs font-mono text-foreground/50">Upcoming</span>
            </div>
          </CardContent>
        </Card>

        {/* Transit & Growth Quick Widget */}
        <div className="space-y-4">
          <Card className="border border-surface-border bg-surface p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-foreground/70 flex items-center gap-1.5">
                <Bus className="w-4 h-4 text-brand-500" />
                SafeRide Transit
              </span>
              <Badge variant="present" className="text-[10px]">Boarded Safe</Badge>
            </div>
            <p className="text-xs text-foreground/80 mt-1">
              Route 04 (Outer Ring Road Express). Morning pickup verified at HSR Layout Stop #2 (07:38 AM).
            </p>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => onNavigate("transport")}
              className="w-full text-xs mt-3 bg-surface-subtle"
            >
              View Route ETA Map
            </Button>
          </Card>

          <Card className="border border-surface-border bg-surface p-4">
            <span className="text-xs font-semibold text-foreground/70 block mb-1">
              Holistic Growth Index (HGI)
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-bold font-display text-foreground">91.5%</span>
              <span className="text-xs text-status-present font-medium">Exemplary Tier</span>
            </div>
            <p className="text-[11px] text-foreground/50 mt-1">
              Based on steady assessment consistency and active learning engagement.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}
