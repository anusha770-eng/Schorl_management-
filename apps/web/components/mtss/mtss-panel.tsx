"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertTriangle, TrendingDown, CheckCircle2, Lock, ArrowUpRight, ShieldAlert, Sparkles } from "lucide-react";

interface MTSSFlag {
  id: string;
  studentId: string;
  studentName: string;
  gradeLevel: number;
  sectionName: string;
  holisticGrowthIndex: number;
  severity: "TIER_1_LOW" | "TIER_2_MODERATE" | "TIER_3_CRITICAL";
  domain: string;
  triggerReason: string;
  status: string;
  recommendedAction: string;
  encryptedNotes?: string | null;
  hasConfidentialNotes: boolean;
  interventions: {
    id: string;
    assignedStaffName: string;
    strategy: string;
    progressNotes: string | null;
    outcomeStatus: string;
  }[];
  createdAt: string;
}

export function MTSSPanel({ userRole = "TEACHER" }: { userRole?: string }) {
  const [flags, setFlags] = useState<MTSSFlag[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedFlag, setSelectedFlag] = useState<MTSSFlag | null>(null);
  const [actionSuccess, setActionSuccess] = useState<string | null>(null);
  const [metrics, setMetrics] = useState<any>(null);

  const isPrincipal = ["PRINCIPAL", "ADMIN"].includes(userRole);

  useEffect(() => {
    fetchFlags();
    fetch("/api/dashboard/metrics")
      .then((r) => r.json())
      .then((data) => setMetrics(data))
      .catch(() => {});
  }, []);

  const fetchFlags = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/mtss/flags");
      const data = await res.json();
      if (res.ok && data.flags) {
        setFlags(data.flags);
      }
    } catch (err) {
      console.error("Failed to load MTSS flags", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleApplyIntervention = async (flagId: string) => {
    try {
      const res = await fetch("/api/mtss/interventions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          flagId,
          strategy: "Assigned Socratic Chapter 4 Remediation Module with 1:1 Concept Verification",
          progressNotes: "Teacher initiated targeted scaffolding via Aetheris Socratic Mentor.",
          outcomeStatus: "IN_PROGRESS",
        }),
      });
      if (res.ok) {
        setActionSuccess("Targeted MTSS intervention dispatched and logged!");
        fetchFlags();
        setTimeout(() => setActionSuccess(null), 4000);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const tier2Flags = flags.filter((f) => f.severity === "TIER_2_MODERATE");
  const tier3Flags = flags.filter((f) => f.severity === "TIER_3_CRITICAL");

  return (
    <div className="space-y-6">
      {/* Metric summary banner */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="p-4 bg-surface-subtle/50 border border-surface-border">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-foreground/60">Campus Health Average</span>
            <Badge variant="brand" className="text-[11px]">Active Matrix</Badge>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold font-display text-foreground">
              {metrics?.mtss?.campusAverageHGI ?? 88.0}%
            </span>
            <span className="text-xs text-status-present font-medium">HGI Benchmark</span>
          </div>
          <p className="text-[11px] text-foreground/50 mt-1">Holistic Growth Index across Grades 9–10</p>
        </Card>

        <Card className="p-4 bg-status-warning-bg border border-status-warning/30">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-status-warning">Tier 2: Targeted Support</span>
            <AlertTriangle className="w-4 h-4 text-status-warning" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold font-display text-status-warning">{tier2Flags.length} Students</span>
          </div>
          <p className="text-[11px] text-status-warning/80 mt-1">Formative deceleration detected early</p>
        </Card>

        <Card className="p-4 bg-status-absent-bg border border-status-absent/30">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-status-absent">Tier 3: Intensive Review</span>
            <ShieldAlert className="w-4 h-4 text-status-absent" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold font-display text-status-absent">{tier3Flags.length} Students</span>
          </div>
          <p className="text-[11px] text-status-absent/80 mt-1">Pastoral team case management</p>
        </Card>
      </div>

      {actionSuccess && (
        <div className="p-3 bg-status-present-bg border border-status-present/30 rounded-xl text-status-present text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          {actionSuccess}
        </div>
      )}

      {/* Flag List */}
      <Card className="border border-surface-border shadow-card bg-surface overflow-hidden">
        <CardHeader className="bg-surface-subtle/30 pb-4">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-base flex items-center gap-2">
                OmniLoop Early-Warning Action Cards
                <Badge variant="outline" className="text-xs">Live Telemetry</Badge>
              </CardTitle>
              <CardDescription>
                Continuous multi-factor early detection synthesized from attendance, late assignments, and formative scores.
              </CardDescription>
            </div>
            <Button variant="secondary" size="sm" onClick={fetchFlags} className="text-xs">
              Refresh Telemetry
            </Button>
          </div>
        </CardHeader>

        <CardContent className="p-0 divide-y divide-surface-border">
          {isLoading ? (
            <div className="p-8 text-center text-foreground/40 text-sm">
              Loading real-time MTSS indicators...
            </div>
          ) : flags.length === 0 ? (
            <div className="p-8 text-center text-foreground/50 text-sm">
              No students currently flagged in Tier 2 or Tier 3. All growth trajectories stable!
            </div>
          ) : (
            flags.map((flag) => (
              <div key={flag.id} className="p-5 hover:bg-surface-subtle/30 transition-colors">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-semibold text-foreground text-sm">
                        {flag.studentName}
                      </span>
                      <span className="text-xs text-foreground/50 font-mono">
                        Grade {flag.gradeLevel}-{flag.sectionName}
                      </span>
                      <Badge
                        variant={
                          flag.severity === "TIER_3_CRITICAL"
                            ? "absent"
                            : flag.severity === "TIER_2_MODERATE"
                            ? "warning"
                            : "default"
                        }
                      >
                        {flag.severity.replace("_", " ")}
                      </Badge>
                      <Badge variant="outline" className="text-[11px]">
                        HGI: {flag.holisticGrowthIndex}%
                      </Badge>
                    </div>

                    <p className="text-xs text-foreground/80 font-medium">
                      <span className="text-status-absent font-semibold">Trigger:</span>{" "}
                      {flag.triggerReason}
                    </p>

                    <div className="p-2.5 bg-surface-subtle rounded-lg text-xs border border-surface-border/50 text-foreground/90 mt-2">
                      <span className="font-semibold text-brand-500">Recommended MTSS Action:</span>{" "}
                      {flag.recommendedAction}
                    </div>

                    {/* Sensitive Counselor Note Area */}
                    {flag.hasConfidentialNotes && (
                      <div className="mt-2 text-xs">
                        {isPrincipal ? (
                          <div className="p-2.5 bg-brand-50/50 dark:bg-brand-500/10 rounded-lg border border-brand-500/20 text-foreground/80">
                            <div className="flex items-center gap-1.5 text-brand-500 font-semibold mb-1">
                              <Lock className="w-3.5 h-3.5" />
                              Decrypted Pastoral Clinical Note (Principal Confidentiality Enforced):
                            </div>
                            <p className="text-[11px] leading-relaxed italic">{flag.encryptedNotes}</p>
                          </div>
                        ) : (
                          <div className="flex items-center gap-1.5 text-foreground/40 text-[11px]">
                            <Lock className="w-3 h-3 text-status-warning" />
                            Confidential pastoral notes locked (Requires Principal / Counselor elevation).
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex sm:flex-col items-center sm:items-end gap-2 shrink-0">
                    <Button
                      size="sm"
                      variant="primary"
                      className="gap-1.5 text-xs w-full sm:w-auto"
                      onClick={() => handleApplyIntervention(flag.id)}
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      Deploy Socratic Remediation
                    </Button>
                    <span className="text-[11px] text-foreground/40">
                      Status: <strong className="text-foreground/70">{flag.status}</strong>
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );
}
