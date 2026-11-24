"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, UserCheck, AlertCircle, Sparkles, CheckCircle2 } from "lucide-react";

interface SlotItem {
  slotId: string;
  periodNumber: number;
  startTime: string;
  endTime: string;
  subject: string;
  gradeLevel: number;
  sectionName: string;
  roomNumber: string;
  assignedTeacherName: string;
  assignedStaffId: string;
  recommendedProxies: {
    staffId: string;
    teacherName: string;
    department: string;
    matchingScore: number;
    reason: string;
    currentHours: number;
    maxHours: number;
  }[];
}

export function SmartTimetable({ userRole = "TEACHER" }: { userRole?: string }) {
  const [slots, setSlots] = useState<SlotItem[]>([]);
  const [dayOfWeek, setDayOfWeek] = useState(1); // 1 = Monday
  const [isLoading, setIsLoading] = useState(true);
  const [dispatchSuccess, setDispatchSuccess] = useState<string | null>(null);

  useEffect(() => {
    fetchSlots();
  }, [dayOfWeek]);

  const fetchSlots = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/substitutions?dayOfWeek=${dayOfWeek}`);
      const data = await res.json();
      if (res.ok && data.slots) {
        setSlots(data.slots);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDispatchSubstitute = async (slot: SlotItem, proxy: any) => {
    try {
      const res = await fetch("/api/substitutions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          slotId: slot.slotId,
          originalStaffId: slot.assignedStaffId,
          substituteStaffId: proxy.staffId,
          matchingScore: proxy.matchingScore,
        }),
      });

      if (res.ok) {
        setDispatchSuccess(
          `Smart Proxy Dispatched! ${proxy.teacherName} assigned to Period ${slot.periodNumber} (${slot.subject}). Notification pushed.`
        );
        setTimeout(() => setDispatchSuccess(null), 5000);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const days = [
    { id: 1, label: "Monday" },
    { id: 2, label: "Tuesday" },
    { id: 3, label: "Wednesday" },
    { id: 4, label: "Thursday" },
    { id: 5, label: "Friday" },
  ];

  const isPrincipal = ["PRINCIPAL", "ADMIN"].includes(userRole);

  return (
    <div className="space-y-6">
      {/* Day Selector */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-2">
          {days.map((d) => (
            <button
              key={d.id}
              onClick={() => setDayOfWeek(d.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all ${
                dayOfWeek === d.id
                  ? "bg-brand-600 text-white shadow-subtle font-semibold"
                  : "bg-surface border border-surface-border text-foreground/70 hover:bg-surface-elevated"
              }`}
            >
              {d.label}
            </button>
          ))}
        </div>

        {isPrincipal && (
          <Badge variant="brand" className="gap-1.5 text-xs py-1 px-3">
            <Sparkles className="w-3.5 h-3.5" />
            Autonomous Substitution Orchestrator Active
          </Badge>
        )}
      </div>

      {dispatchSuccess && (
        <div className="p-3 bg-status-present-bg border border-status-present/30 rounded-xl text-status-present text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          {dispatchSuccess}
        </div>
      )}

      {/* Timetable Period Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {isLoading ? (
          <div className="col-span-full p-8 text-center text-foreground/40 text-sm">
            Calculating schedule and constraint matrices...
          </div>
        ) : (
          slots.map((slot) => (
            <Card
              key={slot.slotId}
              className="border border-surface-border shadow-subtle bg-surface flex flex-col justify-between"
            >
              <CardHeader className="p-4 pb-2 border-b border-surface-border/50">
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="font-mono text-[11px]">
                    Period {slot.periodNumber}
                  </Badge>
                  <span className="text-[11px] text-foreground/50 font-mono flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {slot.startTime} – {slot.endTime}
                  </span>
                </div>
                <CardTitle className="text-base mt-2">{slot.subject}</CardTitle>
                <CardDescription className="text-xs">
                  Grade {slot.gradeLevel}-{slot.sectionName} • {slot.roomNumber}
                </CardDescription>
              </CardHeader>

              <CardContent className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="text-foreground/50">Primary Teacher:</span>
                    <strong className="text-foreground">{slot.assignedTeacherName}</strong>
                  </div>

                  {/* Smart Proxy Recommendations (Visible to Principal/Admin or upon request) */}
                  {slot.recommendedProxies.length > 0 && (
                    <div className="mt-3 p-3 bg-surface-subtle rounded-xl border border-surface-border/60 space-y-2">
                      <div className="flex items-center justify-between text-[11px] font-semibold text-foreground/70">
                        <span className="flex items-center gap-1">
                          <Sparkles className="w-3 h-3 text-brand-500" />
                          Top Ranked Proxy:
                        </span>
                        <Badge variant="brand" className="text-[10px] px-1.5 py-0">
                          {slot.recommendedProxies[0].matchingScore}% Match
                        </Badge>
                      </div>

                      <div className="text-xs">
                        <strong className="text-foreground">
                          {slot.recommendedProxies[0].teacherName}
                        </strong>{" "}
                        <span className="text-foreground/50 font-mono text-[11px]">
                          ({slot.recommendedProxies[0].department})
                        </span>
                        <p className="text-[11px] text-foreground/60 leading-tight mt-1">
                          {slot.recommendedProxies[0].reason}
                        </p>
                      </div>

                      {isPrincipal && (
                        <Button
                          size="sm"
                          variant="secondary"
                          className="w-full text-xs mt-2 gap-1 bg-surface"
                          onClick={() => handleDispatchSubstitute(slot, slot.recommendedProxies[0])}
                        >
                          <UserCheck className="w-3.5 h-3.5 text-brand-500" />
                          1-Click Confirm Proxy
                        </Button>
                      )}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
