"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bus, MapPin, CheckCircle2, ShieldCheck, QrCode, Navigation, Phone, UserCheck } from "lucide-react";

export function SafeRideView({ userRole = "PARENT" }: { userRole?: string }) {
  const [routes, setRoutes] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [tapSuccess, setTapSuccess] = useState<string | null>(null);

  useEffect(() => {
    fetchRoutes();
  }, []);

  const fetchRoutes = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/transport");
      const data = await res.json();
      if (res.ok && data.routes) {
        setRoutes(data.routes);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const simulateBoardingTap = async (busRouteId: string, studentId: string, studentName: string) => {
    try {
      const res = await fetch("/api/transport", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          busRouteId,
          studentId,
          tripType: "MORNING_PICKUP",
          verifiedBy: "ATTENDANT_SCAN",
        }),
      });

      if (res.ok) {
        setTapSuccess(
          `SafeRide Verification: ${studentName} successfully boarded Bus Route 4. Instant push alert sent to parent!`
        );
        fetchRoutes();
        setTimeout(() => setTapSuccess(null), 5000);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const isTransportStaff = ["TRANSPORT", "ADMIN", "PRINCIPAL"].includes(userRole);
  const route = routes[0]; // Route 4 Outer Ring Road Express

  return (
    <div className="space-y-6">
      {/* SafeRide Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h2 className="text-xl font-display font-bold text-foreground flex items-center gap-2">
            <Bus className="w-5 h-5 text-brand-500" />
            SafeRide Dual-Verification Transit Platform
          </h2>
          <p className="text-xs text-foreground/60 mt-1">
            Eliminating the "frozen dot" panic. Vehicle GPS location synchronized with attendant digital boarding manifests.
          </p>
        </div>

        <Badge variant="present" className="gap-1.5 py-1 px-3 text-xs">
          <ShieldCheck className="w-3.5 h-3.5" />
          Dual-Verification Active
        </Badge>
      </div>

      {tapSuccess && (
        <div className="p-3.5 bg-status-present-bg border border-status-present/30 rounded-xl text-status-present text-xs flex items-center gap-2 shadow-subtle animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          {tapSuccess}
        </div>
      )}

      {isLoading ? (
        <div className="p-8 text-center text-foreground/40 text-sm">
          Connecting to GPS telemetry & boarding manifest gateway...
        </div>
      ) : route ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Live Vehicle Status */}
          <Card className="lg:col-span-2 border border-surface-border shadow-card bg-surface overflow-hidden">
            <CardHeader className="bg-surface-subtle/40 pb-4">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-base flex items-center gap-2">
                    {route.routeNumber}
                    <Badge variant="brand" className="text-[10px]">
                      {route.vehicleNumber}
                    </Badge>
                  </CardTitle>
                  <CardDescription className="text-xs mt-1">
                    Driver: {route.driverName} • Attendant: {route.attendantName}
                  </CardDescription>
                </div>
                <div className="text-right">
                  <Badge variant="present" className="animate-pulse text-[10px]">
                    IN TRANSIT
                  </Badge>
                  <span className="block text-[11px] text-foreground/50 font-mono mt-1">
                    ETA Campus: 8:15 AM
                  </span>
                </div>
              </div>
            </CardHeader>

            <CardContent className="p-6 space-y-6">
              {/* Route Progress Visualizer */}
              <div>
                <span className="text-xs font-semibold text-foreground/70 uppercase tracking-wider block mb-3">
                  Route Stops & Live Proximity
                </span>
                <div className="relative pl-6 space-y-6 before:content-[''] before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-surface-border">
                  {route.stops?.map((stop: any, idx: number) => {
                    const isPassed = idx < 2;
                    const isCurrent = idx === 2; // Bellandur EcoSpace
                    return (
                      <div key={stop.id} className="relative flex items-center justify-between">
                        <div
                          className={`absolute -left-6 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                            isCurrent
                              ? "bg-brand-600 border-white text-white shadow-glow"
                              : isPassed
                              ? "bg-status-present border-white text-white"
                              : "bg-surface border-surface-border text-foreground/40"
                          }`}
                        >
                          {isPassed ? (
                            <CheckCircle2 className="w-3 h-3" />
                          ) : (
                            <span className="text-[10px] font-bold">{idx + 1}</span>
                          )}
                        </div>

                        <div>
                          <span
                            className={`text-xs font-medium block ${
                              isCurrent
                                ? "text-brand-500 font-bold"
                                : isPassed
                                ? "text-foreground line-through opacity-70"
                                : "text-foreground/80"
                            }`}
                          >
                            {stop.stopName}
                          </span>
                          <span className="text-[11px] text-foreground/40 font-mono">
                            Scheduled: {stop.scheduledTime}
                          </span>
                        </div>

                        {isCurrent && (
                          <Badge variant="brand" className="text-[10px] animate-pulse">
                            Current Approach (ETA 3 mins)
                          </Badge>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Attendant Manifest & Tap-In Simulator */}
          <Card className="border border-surface-border shadow-card bg-surface flex flex-col justify-between">
            <CardHeader className="bg-surface-subtle/40 pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base flex items-center gap-2">
                  <UserCheck className="w-4 h-4 text-brand-500" />
                  Boarding Manifest
                </CardTitle>
                <Badge variant="outline" className="text-[10px]">
                  Roster: {route.students?.length || 0}
                </Badge>
              </div>
              <CardDescription className="text-xs">
                Real-time passenger verification via attendant tap-in or QR scan.
              </CardDescription>
            </CardHeader>

            <CardContent className="p-4 space-y-3 flex-1 overflow-y-auto max-h-96">
              {route.students?.map((student: any) => {
                const hasBoarded = route.boardingLogs?.some(
                  (l: any) => l.studentId === student.id
                );
                return (
                  <div
                    key={student.id}
                    className="p-3 rounded-xl border border-surface-border bg-surface-subtle/50 flex items-center justify-between gap-2"
                  >
                    <div>
                      <span className="font-semibold text-xs text-foreground block">
                        {student.user.name}
                      </span>
                      <span className="text-[11px] text-foreground/40 font-mono">
                        Roll: {student.rollNumber}
                      </span>
                    </div>

                    {hasBoarded ? (
                      <Badge variant="present" className="text-[10px] gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        Boarded Safe
                      </Badge>
                    ) : (
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() =>
                          simulateBoardingTap(route.id, student.id, student.user.name)
                        }
                        className="text-[11px] h-7 px-2.5 gap-1 bg-surface"
                      >
                        <QrCode className="w-3 h-3 text-brand-500" />
                        Tap to Board
                      </Button>
                    )}
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </div>
      ) : null}
    </div>
  );
}
