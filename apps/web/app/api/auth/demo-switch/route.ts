import { NextResponse } from "next/server";
import { prisma } from "@aetheris/database";
import { createSession } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const { role } = await req.json();

    // Map role to seeded demo user email
    const emailMap: Record<string, string> = {
      ADMIN: "admin@aetheris.edu",
      PRINCIPAL: "principal@aetheris.edu",
      TEACHER: "teacher@aetheris.edu",
      STUDENT: "student@aetheris.edu",
      PARENT: "parent@aetheris.edu",
      ACCOUNTANT: "accountant@aetheris.edu",
      TRANSPORT: "transport@aetheris.edu",
    };

    const targetEmail = emailMap[role];
    if (!targetEmail) {
      return NextResponse.json({ error: "Invalid role specified" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { email: targetEmail },
      include: {
        studentProfile: true,
        staffProfile: true,
        parentProfile: true,
      },
    });

    if (!user) {
      return NextResponse.json({ error: "Demo user account not found" }, { status: 404 });
    }

    await createSession({
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role as any,
      schoolId: user.schoolId,
      languagePref: user.languagePref,
      studentProfileId: user.studentProfile?.id,
      staffProfileId: user.staffProfile?.id,
      parentProfileId: user.parentProfile?.id,
    });

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        languagePref: user.languagePref,
      },
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
