import { NextResponse } from "next/server";
import { prisma } from "@aetheris/database";
import { requireAuth } from "@/lib/auth";

export async function GET() {
  try {
    await requireAuth();

    const exams = await prisma.exam.findMany({
      include: {
        classSection: true,
        grades: {
          include: {
            student: {
              include: { user: { select: { name: true } } },
            },
          },
        },
      },
      orderBy: { date: "desc" },
    });

    return NextResponse.json({ exams });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await requireAuth(["TEACHER", "PRINCIPAL", "ADMIN"]);
    const { examId, studentId, marksObtained, teacherRemarks } = await req.json();

    const exam = await prisma.exam.findUnique({ where: { id: examId } });
    if (!exam) return NextResponse.json({ error: "Exam not found" }, { status: 404 });

    const maxMarks = exam.maxMarks || 100;
    const percentage = (marksObtained / maxMarks) * 100;

    let letterGrade = "F";
    if (percentage >= 90) letterGrade = "A+";
    else if (percentage >= 80) letterGrade = "A";
    else if (percentage >= 70) letterGrade = "B";
    else if (percentage >= 60) letterGrade = "C";
    else if (percentage >= 50) letterGrade = "D";

    // Auto-generate AI remark draft if not provided
    const aiRemarkDraft =
      percentage >= 85
        ? "Exhibits excellent grasp of core principles and consistently demonstrates analytical precision."
        : percentage >= 65
        ? "Consistent effort shown; targeted focus on multi-step reasoning will solidify conceptual mastery."
        : "Needs foundational scaffolding and remedial practice to improve assessment confidence.";

    const existing = await prisma.gradeRecord.findFirst({
      where: { examId, studentId },
    });

    let grade;
    if (existing) {
      grade = await prisma.gradeRecord.update({
        where: { id: existing.id },
        data: {
          marksObtained,
          letterGrade,
          teacherRemarks,
          aiRemarkDraft,
        },
      });
    } else {
      grade = await prisma.gradeRecord.create({
        data: {
          examId,
          studentId,
          marksObtained,
          letterGrade,
          teacherRemarks,
          aiRemarkDraft,
        },
      });
    }

    return NextResponse.json({ success: true, grade });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
