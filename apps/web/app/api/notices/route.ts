import { NextResponse } from "next/server";
import { prisma } from "@aetheris/database";
import { requireAuth } from "@/lib/auth";

export async function GET() {
  try {
    await requireAuth();

    const notices = await prisma.notice.findMany({
      orderBy: { publishedAt: "desc" },
    });

    const parsedNotices = notices.map((n) => ({
      id: n.id,
      title: n.title,
      content: n.content,
      translations: JSON.parse(n.translations || "{}"),
      category: n.category,
      authorName: n.authorName,
      publishedAt: n.publishedAt.toISOString().split("T")[0],
    }));

    return NextResponse.json({ notices: parsedNotices });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
