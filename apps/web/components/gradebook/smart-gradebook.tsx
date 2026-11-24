"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { GraduationCap, Sparkles, Save, CheckCircle2 } from "lucide-react";

export function SmartGradebook() {
  const [exams, setExams] = useState<any[]>([]);
  const [selectedExamId, setSelectedExamId] = useState<string>("");
  const [grades, setGrades] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    fetchExams();
  }, []);

  const fetchExams = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/grades");
      const data = await res.json();
      if (res.ok && data.exams?.length) {
        setExams(data.exams);
        setSelectedExamId(data.exams[0].id);
        setGrades(data.exams[0].grades || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleExamChange = (examId: string) => {
    setSelectedExamId(examId);
    const chosen = exams.find((e) => e.id === examId);
    if (chosen) setGrades(chosen.grades || []);
  };

  const updateMark = (studentId: string, markStr: string) => {
    const val = parseFloat(markStr) || 0;
    setGrades((prev) =>
      prev.map((g) => (g.studentId === studentId ? { ...g, marksObtained: val } : g))
    );
  };

  const updateRemarks = (studentId: string, remarks: string) => {
    setGrades((prev) =>
      prev.map((g) => (g.studentId === studentId ? { ...g, teacherRemarks: remarks } : g))
    );
  };

  const handleSaveGrades = async () => {
    setIsSaving(true);
    try {
      for (const grade of grades) {
        await fetch("/api/grades", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            examId: selectedExamId,
            studentId: grade.studentId,
            marksObtained: grade.marksObtained,
            teacherRemarks: grade.teacherRemarks,
          }),
        });
      }
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };

  const selectedExam = exams.find((e) => e.id === selectedExamId);

  return (
    <Card className="border border-surface-border shadow-card bg-surface overflow-hidden">
      <CardHeader className="bg-surface-subtle/40 pb-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-brand-500" />
              <CardTitle className="text-lg">Smart Gradebook & Narrative Reporting</CardTitle>
            </div>
            <CardDescription className="mt-1">
              Marks entry with automatic letter scales and AI-assisted qualitative draft remarks.
            </CardDescription>
          </div>

          <div className="flex items-center gap-3">
            <select
              value={selectedExamId}
              onChange={(e) => handleExamChange(e.target.value)}
              className="bg-surface border border-surface-border rounded-lg px-3 py-1.5 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-brand-500"
            >
              {exams.map((exam) => (
                <option key={exam.id} value={exam.id}>
                  {exam.title} ({exam.subject} - Max {exam.maxMarks})
                </option>
              ))}
            </select>

            <Button
              variant="primary"
              size="sm"
              onClick={handleSaveGrades}
              isLoading={isSaving}
              className="text-xs gap-1.5"
            >
              <Save className="w-3.5 h-3.5" />
              {saveSuccess ? "Saved!" : "Save Marks"}
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-0 overflow-x-auto">
        {isLoading ? (
          <div className="p-8 text-center text-foreground/40 text-sm">Loading gradebook records...</div>
        ) : (
          <table className="w-full text-left text-xs">
            <thead className="bg-surface-subtle border-b border-surface-border text-foreground/60 font-semibold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3 px-4">Student</th>
                <th className="py-3 px-4">Marks (Max {selectedExam?.maxMarks || 100})</th>
                <th className="py-3 px-4">Letter Grade</th>
                <th className="py-3 px-4">Teacher Remark</th>
                <th className="py-3 px-4">AI Narrative Suggestion</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-border/60">
              {grades.map((grade) => (
                <tr key={grade.id} className="hover:bg-surface-subtle/30 transition-colors">
                  <td className="py-3 px-4">
                    <span className="font-semibold text-foreground text-sm block">
                      {grade.student?.user?.name || "Student"}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <input
                      type="number"
                      value={grade.marksObtained}
                      onChange={(e) => updateMark(grade.studentId, e.target.value)}
                      className="w-20 bg-surface border border-surface-border rounded-md px-2 py-1 text-xs font-mono text-foreground focus:outline-none focus:ring-1 focus:ring-brand-500"
                    />
                  </td>
                  <td className="py-3 px-4">
                    <Badge variant={grade.letterGrade === "A+" ? "present" : grade.letterGrade === "C" ? "warning" : "default"}>
                      {grade.letterGrade || "—"}
                    </Badge>
                  </td>
                  <td className="py-3 px-4">
                    <input
                      type="text"
                      value={grade.teacherRemarks || ""}
                      onChange={(e) => updateRemarks(grade.studentId, e.target.value)}
                      placeholder="Add qualitative remark..."
                      className="w-full bg-transparent border-b border-surface-border focus:border-brand-500 py-1 px-1 text-xs text-foreground focus:outline-none"
                    />
                  </td>
                  <td className="py-3 px-4 text-foreground/60 max-w-xs">
                    <div className="flex items-start gap-1.5 p-2 bg-brand-50/40 dark:bg-brand-500/10 rounded-lg border border-brand-500/20 text-[11px] leading-relaxed">
                      <Sparkles className="w-3.5 h-3.5 text-brand-500 shrink-0 mt-0.5" />
                      <span>{grade.aiRemarkDraft || "Draft generated based on assessment trajectory"}</span>
                    </div>
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
