"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckSquare, Check, X, Clock, AlertCircle, Save, Sparkles } from "lucide-react";

interface StudentRosterItem {
  studentId: string;
  name: string;
  rollNumber: string;
  gradeLevel: number;
  sectionName: string;
  status: "PRESENT" | "ABSENT" | "LATE" | "EXCUSED";
  remarks: string;
}

export function AttendanceCockpit() {
  const [roster, setRoster] = useState<StudentRosterItem[]>([]);
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    fetchRoster();
  }, [date]);

  const fetchRoster = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/attendance?date=${date}`);
      const data = await res.json();
      if (res.ok && data.roster) {
        setRoster(data.roster);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const setStudentStatus = (studentId: string, status: "PRESENT" | "ABSENT" | "LATE" | "EXCUSED") => {
    setRoster((prev) =>
      prev.map((s) => (s.studentId === studentId ? { ...s, status } : s))
    );
  };

  const markAllPresent = () => {
    setRoster((prev) => prev.map((s) => ({ ...s, status: "PRESENT" })));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const res = await fetch("/api/attendance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ date, records: roster }),
      });
      if (res.ok) {
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3000);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };

  const presentCount = roster.filter((s) => s.status === "PRESENT").length;
  const absentCount = roster.filter((s) => s.status === "ABSENT").length;
  const attendanceRate = roster.length ? Math.round((presentCount / roster.length) * 100) : 0;

  return (
    <Card className="border border-surface-border shadow-card bg-surface overflow-hidden">
      <CardHeader className="bg-surface-subtle/40 pb-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <CheckSquare className="w-5 h-5 text-brand-500" />
              <CardTitle className="text-lg">Class Attendance Cockpit</CardTitle>
              <Badge variant="outline" className="font-mono text-xs">Grade 9-A</Badge>
            </div>
            <CardDescription className="mt-1">
              High-velocity roll call. Use keyboard shortcuts or 1-click status chips.
            </CardDescription>
          </div>

          <div className="flex items-center gap-3">
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="bg-surface border border-surface-border rounded-lg px-3 py-1.5 text-xs text-foreground font-mono focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
            <Button variant="secondary" size="sm" onClick={markAllPresent} className="text-xs">
              Mark All Present
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={handleSave}
              isLoading={isSaving}
              className="gap-1.5 text-xs"
            >
              <Save className="w-3.5 h-3.5" />
              {saveSuccess ? "Saved!" : "Save Register"}
            </Button>
          </div>
        </div>

        {/* Live Metrics */}
        <div className="flex items-center gap-4 mt-3 pt-3 border-t border-surface-border/50 text-xs">
          <span className="text-foreground/70">
            Attendance Rate: <strong className="text-status-present font-semibold">{attendanceRate}%</strong>
          </span>
          <span className="text-foreground/40">•</span>
          <span className="text-foreground/70">
            Present: <strong className="text-foreground">{presentCount}</strong>
          </span>
          <span className="text-foreground/40">•</span>
          <span className="text-foreground/70">
            Absent: <strong className="text-status-absent">{absentCount}</strong>
          </span>
        </div>
      </CardHeader>

      <CardContent className="p-0 overflow-x-auto">
        {isLoading ? (
          <div className="p-8 text-center text-foreground/40 text-sm">Loading class roster...</div>
        ) : (
          <table className="w-full text-left text-xs">
            <thead className="bg-surface-subtle border-b border-surface-border text-foreground/60 font-semibold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3 px-4">Roll</th>
                <th className="py-3 px-4">Student</th>
                <th className="py-3 px-4">Attendance Status</th>
                <th className="py-3 px-4">Remarks</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-border/60">
              {roster.map((student) => (
                <tr key={student.studentId} className="hover:bg-surface-subtle/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-medium text-foreground/60">
                    {student.rollNumber}
                  </td>
                  <td className="py-3 px-4">
                    <span className="font-semibold text-foreground text-sm block">
                      {student.name}
                    </span>
                    <span className="text-[11px] text-foreground/40 font-mono">
                      AIA-2024-G9
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => setStudentStatus(student.studentId, "PRESENT")}
                        className={`px-3 py-1.5 rounded-lg font-medium text-xs flex items-center gap-1 transition-all ${
                          student.status === "PRESENT"
                            ? "bg-status-present text-white shadow-subtle"
                            : "bg-surface-subtle text-foreground/70 hover:bg-surface-elevated"
                        }`}
                      >
                        <Check className="w-3 h-3" />
                        Present
                      </button>
                      <button
                        onClick={() => setStudentStatus(student.studentId, "ABSENT")}
                        className={`px-3 py-1.5 rounded-lg font-medium text-xs flex items-center gap-1 transition-all ${
                          student.status === "ABSENT"
                            ? "bg-status-absent text-white shadow-subtle"
                            : "bg-surface-subtle text-foreground/70 hover:bg-surface-elevated"
                        }`}
                      >
                        <X className="w-3 h-3" />
                        Absent
                      </button>
                      <button
                        onClick={() => setStudentStatus(student.studentId, "LATE")}
                        className={`px-3 py-1.5 rounded-lg font-medium text-xs flex items-center gap-1 transition-all ${
                          student.status === "LATE"
                            ? "bg-status-late text-white shadow-subtle"
                            : "bg-surface-subtle text-foreground/70 hover:bg-surface-elevated"
                        }`}
                      >
                        <Clock className="w-3 h-3" />
                        Late
                      </button>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <input
                      type="text"
                      placeholder="Add brief note..."
                      value={student.remarks}
                      onChange={(e) => {
                        const val = e.target.value;
                        setRoster((prev) =>
                          prev.map((s) => (s.studentId === student.studentId ? { ...s, remarks: val } : s))
                        );
                      }}
                      className="bg-transparent border-b border-surface-border focus:border-brand-500 py-1 px-1 text-xs text-foreground focus:outline-none w-full max-w-xs"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </CardContent>
    </Card>
  );
}
