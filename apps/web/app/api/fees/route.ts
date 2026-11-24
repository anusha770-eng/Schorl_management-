import { NextResponse } from "next/server";
import { prisma } from "@aetheris/database";
import { requireAuth } from "@/lib/auth";

export async function GET() {
  try {
    await requireAuth();

    const invoices = await prisma.feeInvoice.findMany({
      include: {
        student: {
          include: {
            user: { select: { name: true, email: true } },
            classSection: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    const parsedInvoices = invoices.map((inv) => ({
      id: inv.id,
      invoiceNumber: inv.invoiceNumber,
      studentName: inv.student.user.name,
      studentGrade: `${inv.student.classSection.gradeLevel}-${inv.student.classSection.sectionName}`,
      totalAmount: inv.totalAmount,
      paidAmount: inv.paidAmount,
      status: inv.status,
      dueDate: inv.dueDate.toISOString().split("T")[0],
      installmentNote: inv.installmentNote,
      breakdown: JSON.parse(inv.breakdown || "[]"),
    }));

    return NextResponse.json({ invoices: parsedInvoices });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await requireAuth(["PARENT", "ACCOUNTANT", "ADMIN"]);
    const { invoiceId, action, installmentNote, amountToPay } = await req.json();

    const invoice = await prisma.feeInvoice.findUnique({ where: { id: invoiceId } });
    if (!invoice) return NextResponse.json({ error: "Invoice not found" }, { status: 404 });

    if (action === "REQUEST_INSTALLMENT") {
      const updated = await prisma.feeInvoice.update({
        where: { id: invoiceId },
        data: {
          status: "INSTALLMENT_REQUESTED",
          installmentNote: installmentNote || "Parent requested 2-part split installment plan.",
        },
      });
      return NextResponse.json({ success: true, invoice: updated });
    }

    if (action === "PAY") {
      const payment = Number(amountToPay || invoice.totalAmount - invoice.paidAmount);
      const newPaid = invoice.paidAmount + payment;
      const newStatus = newPaid >= invoice.totalAmount ? "PAID" : "PARTIAL";

      const updated = await prisma.feeInvoice.update({
        where: { id: invoiceId },
        data: {
          paidAmount: newPaid,
          status: newStatus,
        },
      });
      return NextResponse.json({ success: true, invoice: updated });
    }

    return NextResponse.json({ error: "Unknown action" }, { status: 400 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
