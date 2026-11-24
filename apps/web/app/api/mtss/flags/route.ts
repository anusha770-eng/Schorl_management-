import { NextResponse } from "next/server";
import { prisma } from "@aetheris/database";
import { requireAuth } from "@/lib/auth";
import { decryptSensitiveData } from "@aetheris/shared";

export async function GET(req: Request) {
  try {
    const session = await requireAuth(["ADMIN", "PRINCIPAL", "TEACHER", "STUDENT"]);

    const url = new URL(req.url);
    const studentIdParam = url.searchParams.get("studentId");

    // Fetch MTSS Flags with student & class details
    const flags = await prisma.mTSSFlag.findMany({
      where: studentIdParam ? { studentId: studentIdParam } : undefined,
      include: {
        student: {
          include: {
            user: { select: { name: true, email: true } },
            classSection: { select: { gradeLevel: true, sectionName: true } },
            grades: { include: { exam: true } },
          },
        },
        interventions: {
          include: {
            staff: { include: { user: { select: { name: true } } } },
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    const isAuthorizedForClinicalNotes = ["PRINCIPAL", "ADMIN"].includes(session.role);

    // If Principal reads sensitive records, record an immutable audit log
    if (isAuthorizedForClinicalNotes) {
      for (const flag of flags) {
        if (flag.encryptedNotes) {
          await prisma.auditLog.create({
            data: {
              userId: session.id,
              action: "SENSITIVE_RECORD_READ",
              entityType: "MTSS_FLAG",
              entityId: flag.id,
              metadata: JSON.stringify({
                accessedByRole: session.role,
                studentId: flag.studentId,
                timestamp: new Date().toISOString(),
              }),
            },
          });
        }
      }
    }

    const sanitizedFlags = flags.map((flag) => {
      let decryptedNote: string | null = null;
      if (flag.encryptedNotes) {
        if (isAuthorizedForClinicalNotes) {
          decryptedNote = decryptSensitiveData(flag.encryptedNotes);
        } else {
          decryptedNote = "[Confidential Pastoral Note - Principal/Counselor Access Only]";
        }
      }

      return {
        id: flag.id,
        studentId: flag.studentId,
        studentName: flag.student.user.name,
        gradeLevel: flag.student.classSection.gradeLevel,
        sectionName: flag.student.classSection.sectionName,
        holisticGrowthIndex: flag.student.holisticGrowthIndex,
        severity: flag.severity,
        domain: flag.domain,
        triggerReason: flag.triggerReason,
        status: flag.status,
        recommendedAction: flag.recommendedAction,
        encryptedNotes: decryptedNote,
        hasConfidentialNotes: Boolean(flag.encryptedNotes),
        interventions: flag.interventions.map((i) => ({
          id: i.id,
          assignedStaffName: i.staff.user.name,
          strategy: i.strategy,
          progressNotes: i.progressNotes,
          outcomeStatus: i.outcomeStatus,
        })),
        createdAt: flag.createdAt.toISOString(),
      };
    });

    return NextResponse.json({ flags: sanitizedFlags });
  } catch (err: any) {
    if (err.message === "UNAUTHORIZED") {
      return NextResponse.json({ error: "Please log in to access MTSS records" }, { status: 401 });
    }
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
