import { NextResponse } from "next/server";
import { prisma } from "@aetheris/database";
import { requireAuth } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const session = await requireAuth(["ADMIN", "PRINCIPAL", "TEACHER"]);
    const body = await req.json();
    const { flagId, strategy, progressNotes, outcomeStatus } = body;

    if (!flagId || !strategy) {
      return NextResponse.json(
        { error: "Flag ID and intervention strategy are required" },
        { status: 400 }
      );
    }

    // Get current staff profile
    let staffId = session.staffProfileId;
    if (!staffId) {
      const staff = await prisma.staffProfile.findFirst();
      staffId = staff?.id;
    }

    if (!staffId) {
      return NextResponse.json({ error: "Staff profile required to assign intervention" }, { status: 400 });
    }

    const intervention = await prisma.mTSSIntervention.create({
      data: {
        flagId,
        assignedToStaffId: staffId,
        strategy,
        progressNotes: progressNotes || "Initial intervention assigned.",
        outcomeStatus: outcomeStatus || "IN_PROGRESS",
      },
    });

    // Update flag status to IN_INTERVENTION
    await prisma.mTSSFlag.update({
      where: { id: flagId },
      data: { status: "IN_INTERVENTION" },
    });

    return NextResponse.json({ success: true, intervention });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
