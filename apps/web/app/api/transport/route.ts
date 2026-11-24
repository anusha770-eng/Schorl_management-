import { NextResponse } from "next/server";
import { prisma } from "@aetheris/database";
import { requireAuth } from "@/lib/auth";

export async function GET() {
  try {
    await requireAuth();

    const routes = await prisma.busRoute.findMany({
      include: {
        stops: { orderBy: { sequenceOrder: "asc" } },
        students: {
          include: {
            user: { select: { name: true } },
            classSection: true,
          },
        },
        boardingLogs: {
          orderBy: { boardedAt: "desc" },
          take: 20,
          include: {
            student: { include: { user: { select: { name: true } } } },
          },
        },
      },
    });

    return NextResponse.json({ routes });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await requireAuth(["TRANSPORT", "ADMIN", "PRINCIPAL"]);
    const { busRouteId, studentId, tripType = "MORNING_PICKUP", verifiedBy = "ATTENDANT_SCAN" } = await req.json();

    if (!busRouteId || !studentId) {
      return NextResponse.json({ error: "Route ID and Student ID are required" }, { status: 400 });
    }

    const today = new Date().toISOString().split("T")[0];

    const log = await prisma.busAttendance.create({
      data: {
        date: today,
        busRouteId,
        studentId,
        tripType,
        verifiedBy,
        boardedAt: new Date(),
      },
      include: {
        student: { include: { user: { select: { name: true } } } },
      },
    });

    return NextResponse.json({
      success: true,
      log: {
        id: log.id,
        studentName: log.student.user.name,
        tripType: log.tripType,
        verifiedBy: log.verifiedBy,
        boardedAt: log.boardedAt.toISOString(),
      },
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
