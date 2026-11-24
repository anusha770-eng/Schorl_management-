"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CreditCard, HeartHandshake, CheckCircle2, ShieldCheck, DollarSign } from "lucide-react";

export function FeeHealthView({ userRole = "PARENT" }: { userRole?: string }) {
  const [invoices, setInvoices] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [actionSuccess, setActionSuccess] = useState<string | null>(null);

  useEffect(() => {
    fetchInvoices();
  }, []);

  const fetchInvoices = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/fees");
      const data = await res.json();
      if (res.ok && data.invoices) {
        setInvoices(data.invoices);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRequestInstallment = async (invoiceId: string) => {
    try {
      const res = await fetch("/api/fees", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          invoiceId,
          action: "REQUEST_INSTALLMENT",
          installmentNote: "Parent activated 2-part split installment schedule (50% now, 50% in 30 days).",
        }),
      });

      if (res.ok) {
        setActionSuccess("Installment plan activated with zero penalty fee! Next due date updated.");
        fetchInvoices();
        setTimeout(() => setActionSuccess(null), 4000);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handlePayInvoice = async (invoiceId: string, amount: number) => {
    try {
      const res = await fetch("/api/fees", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          invoiceId,
          action: "PAY",
          amountToPay: amount,
        }),
      });

      if (res.ok) {
        setActionSuccess("Payment successfully recorded! Digital receipt generated.");
        fetchInvoices();
        setTimeout(() => setActionSuccess(null), 4000);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h2 className="text-xl font-display font-bold text-foreground flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-brand-500" />
            Financial Health & Empathetic Fee Portals
          </h2>
          <p className="text-xs text-foreground/60 mt-1">
            Transparent fee structures with 1-click flexible installment options. Zero public callouts, zero stigmatization.
          </p>
        </div>

        <Badge variant="brand" className="gap-1.5 py-1 px-3 text-xs">
          <HeartHandshake className="w-3.5 h-3.5" />
          Respectful Billing Protocols
        </Badge>
      </div>

      {actionSuccess && (
        <div className="p-3 bg-status-present-bg border border-status-present/30 rounded-xl text-status-present text-xs flex items-center gap-2 shadow-subtle">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          {actionSuccess}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {isLoading ? (
          <div className="col-span-full p-8 text-center text-foreground/40 text-sm">
            Loading institutional financial ledgers...
          </div>
        ) : (
          invoices.map((inv) => {
            const balanceDue = inv.totalAmount - inv.paidAmount;
            return (
              <Card
                key={inv.id}
                className="border border-surface-border shadow-card bg-surface flex flex-col justify-between"
              >
                <CardHeader className="bg-surface-subtle/40 pb-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-base">{inv.studentName}</CardTitle>
                      <CardDescription className="text-xs mt-0.5">
                        Grade {inv.studentGrade} • Inv #{inv.invoiceNumber}
                      </CardDescription>
                    </div>
                    <Badge
                      variant={
                        inv.status === "PAID"
                          ? "present"
                          : inv.status === "INSTALLMENT_REQUESTED"
                          ? "warning"
                          : "outline"
                      }
                    >
                      {inv.status.replace("_", " ")}
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent className="p-5 space-y-4 flex-1">
                  {/* Amount Breakdown */}
                  <div className="space-y-1.5 border-b border-surface-border/50 pb-3 text-xs">
                    {inv.breakdown.map((item: any, idx: number) => (
                      <div key={idx} className="flex items-center justify-between text-foreground/70">
                        <span>{item.title}</span>
                        <span className="font-mono">₹{item.amount.toLocaleString("en-IN")}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-baseline justify-between pt-1">
                    <div>
                      <span className="text-[11px] text-foreground/50 block">Balance Due:</span>
                      <span className="text-xl font-bold font-mono text-foreground">
                        ₹{balanceDue.toLocaleString("en-IN")}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-[11px] text-foreground/50 block">Due Date:</span>
                      <span className="text-xs font-mono font-medium text-foreground/80">
                        {inv.dueDate}
                      </span>
                    </div>
                  </div>

                  {inv.installmentNote && (
                    <div className="p-2.5 bg-brand-50/50 dark:bg-brand-500/10 rounded-lg border border-brand-500/20 text-[11px] text-brand-600 dark:text-brand-400">
                      <strong>Active Installment Plan:</strong> {inv.installmentNote}
                    </div>
                  )}

                  {balanceDue > 0 && (
                    <div className="flex items-center gap-2 pt-2">
                      <Button
                        size="sm"
                        variant="primary"
                        onClick={() => handlePayInvoice(inv.id, balanceDue)}
                        className="flex-1 text-xs"
                      >
                        Pay Balance (₹{balanceDue.toLocaleString("en-IN")})
                      </Button>
                      {inv.status !== "INSTALLMENT_REQUESTED" && (
                        <Button
                          size="sm"
                          variant="secondary"
                          onClick={() => handleRequestInstallment(inv.id)}
                          className="text-xs gap-1"
                        >
                          <HeartHandshake className="w-3.5 h-3.5 text-brand-500" />
                          Split Plan
                        </Button>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })
        )}
      </div>
    </div>
  );
}
