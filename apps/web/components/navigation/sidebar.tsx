"use client";

import * as React from "react";
import {
  LayoutDashboard,
  Sparkles,
  AlertTriangle,
  Calendar,
  CheckSquare,
  GraduationCap,
  Bus,
  CreditCard,
  Bell,
  Settings,
} from "lucide-react";

interface SidebarProps {
  currentTab: string;
  onTabChange: (tab: string) => void;
  userRole: string;
}

export function Sidebar({ currentTab, onTabChange, userRole }: SidebarProps) {
  const allNavItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: LayoutDashboard,
      roles: ["ADMIN", "PRINCIPAL", "TEACHER", "STUDENT", "PARENT", "ACCOUNTANT", "TRANSPORT"],
    },
    {
      id: "mtss",
      label: "OmniLoop MTSS",
      icon: AlertTriangle,
      badge: "Signature",
      roles: ["ADMIN", "PRINCIPAL", "TEACHER", "STUDENT"],
    },
    {
      id: "socratic",
      label: "Socratic Mentor",
      icon: Sparkles,
      badge: "AI",
      roles: ["STUDENT", "TEACHER", "PRINCIPAL", "ADMIN"],
    },
    {
      id: "attendance",
      label: "Attendance Cockpit",
      icon: CheckSquare,
      roles: ["TEACHER", "PRINCIPAL", "ADMIN", "PARENT", "STUDENT"],
    },
    {
      id: "timetable",
      label: "Timetable & Matrix",
      icon: Calendar,
      roles: ["TEACHER", "STUDENT", "PRINCIPAL", "ADMIN", "PARENT"],
    },
    {
      id: "gradebook",
      label: "Grades & Exams",
      icon: GraduationCap,
      roles: ["TEACHER", "STUDENT", "PRINCIPAL", "PARENT", "ADMIN"],
    },
    {
      id: "transport",
      label: "SafeRide Transit",
      icon: Bus,
      badge: "Dual-Sync",
      roles: ["TRANSPORT", "PARENT", "STUDENT", "ADMIN", "PRINCIPAL"],
    },
    {
      id: "fees",
      label: "Fees & Health",
      icon: CreditCard,
      roles: ["ACCOUNTANT", "PARENT", "ADMIN", "PRINCIPAL"],
    },
    {
      id: "notices",
      label: "School Notices",
      icon: Bell,
      roles: ["ADMIN", "PRINCIPAL", "TEACHER", "STUDENT", "PARENT", "ACCOUNTANT", "TRANSPORT"],
    },
  ];

  const visibleNavItems = allNavItems.filter((item) => item.roles.includes(userRole));

  return (
    <aside className="w-64 border-r border-surface-border bg-surface-subtle/30 flex flex-col justify-between p-3 shrink-0">
      <div className="space-y-1">
        <div className="px-3 py-2 text-[11px] font-semibold text-foreground/40 uppercase tracking-wider">
          Workspace Navigation
        </div>
        {visibleNavItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                isActive
                  ? "bg-brand-600 text-white shadow-subtle font-semibold"
                  : "text-foreground/70 hover:bg-surface-elevated hover:text-foreground"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Icon className={`w-4 h-4 ${isActive ? "text-white" : "text-foreground/50"}`} />
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-md font-mono ${
                    isActive
                      ? "bg-white/20 text-white"
                      : "bg-brand-500/10 text-brand-500"
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      <div className="pt-4 border-t border-surface-border/50 px-2 space-y-2">
        <div className="p-3 bg-surface rounded-xl border border-surface-border/70 text-xs text-foreground/70 space-y-1 shadow-subtle">
          <div className="flex items-center gap-1.5 text-foreground font-semibold text-[11px]">
            <span className="w-2 h-2 rounded-full bg-status-present animate-pulse"></span>
            Aetheris Core 2.0
          </div>
          <p className="text-[10px] text-foreground/50 leading-relaxed">
            Role: <strong className="text-brand-500">{userRole}</strong>
          </p>
        </div>
      </div>
    </aside>
  );
}
