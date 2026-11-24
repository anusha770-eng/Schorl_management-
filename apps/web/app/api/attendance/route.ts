import { NextResponse } from "next/server";
import { prisma } from "@aetheris/database";
import { requireAuth } from "@/lib/auth";

export async function GET(req: Request) {
  try {
    await requireAuth();
    const url = new URL(req.url);
    const date = url.searchParams.get("date") || new Date().toISOString().split("T")[0];

    // Fetch Grade 9-A students and their attendance for date
    const students = await prisma.studentProfile.findMany({
      include: {
        user: { select: { name: true, email: true } },
        classSection: true,
        attendanceRecords: {
          where: { date: date },
        },
      },
      orderBy: { rollNumber: "asc" },
    });

    const roster = students.map((s) => ({
      studentId: s.id,
      name: s.user.name,
      rollNumber: s.rollNumber,
      gradeLevel: s.classSection.gradeLevel,
      sectionName: s.classSection.sectionName,
      status: s.attendanceRecords[0]?.status || "PRESENT",
      remarks: s.attendanceRecords[0]?.remarks || "",
    }));

    return NextResponse.json({ date, roster });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await requireAuth(["TEACHER", "PRINCIPAL", "ADMIN"]);
    const { date, records } = await req.json();

    if (!records || !Array.isArray(records)) {
      return NextResponse.json({ error: "Invalid records format" }, { status: 400 });
    }

    const classSection = await prisma.classSection.findFirst();

    for (const record of records) {
      // Upsert attendance record
      const existing = await prisma.attendanceRecord.findFirst({
        where: {
          studentId: record.studentId,
          date: date,
        },
      });

      if (existing) {
        await prisma.attendanceRecord.update({
          where: { id: existing.id },
          data: {
            status: record.status,
            remarks: record.remarks,
            markedById: session.id,
          },
        });
      } else {
        await prisma.attendanceRecord.create({
          data: {
            date: date,
            studentId: record.studentId,
            classSectionId: classSection?.id || "",
            status: record.status,
            remarks: record.remarks,
            markedById: session.id,
          },
        });
      }
    }

    return NextResponse.json({ success: true, count: records.length });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
