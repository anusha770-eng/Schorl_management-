"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import { Topbar } from "@/components/navigation/topbar";
import { Sidebar } from "@/components/navigation/sidebar";
import { CommandPalette } from "@/components/command-palette";

// Dashboards
import { TeacherDashboard } from "@/components/dashboards/teacher-dashboard";
import { StudentDashboard } from "@/components/dashboards/student-dashboard";
import { PrincipalDashboard } from "@/components/dashboards/principal-dashboard";
import { ParentDashboard } from "@/components/dashboards/parent-dashboard";
import { AccountantDashboard } from "@/components/dashboards/accountant-dashboard";
import { TransportDashboard } from "@/components/dashboards/transport-dashboard";
import { AdminDashboard } from "@/components/dashboards/admin-dashboard";

// Modules & Innovation Suites
import { MTSSPanel } from "@/components/mtss/mtss-panel";
import { SocraticTutor } from "@/components/ai/socratic-tutor";
import { AttendanceCockpit } from "@/components/attendance/attendance-cockpit";
import { SmartTimetable } from "@/components/timetable/smart-timetable";
import { SmartGradebook } from "@/components/gradebook/smart-gradebook";
import { SafeRideView } from "@/components/transport/saferide-view";
import { FeeHealthView } from "@/components/fees/fee-health-view";
import { TrilingualNotices } from "@/components/notices/trilingual-notices";

export default function App() {
  const [currentRole, setCurrentRole] = useState<string>("TEACHER");
  const [userName, setUserName] = useState<string>("Vikram Rathore");
  const [currentTab, setCurrentTab] = useState<string>("dashboard");
  const [currentLang, setCurrentLang] = useState<string>("en");
  const [isCommandOpen, setIsCommandOpen] = useState<boolean>(false);

  useEffect(() => {
    // Initial sync with session if available
    fetch("/api/auth/me")
      .then((res) => res.json())
      .then((data) => {
        if (data.user) {
          setCurrentRole(data.user.role);
          setUserName(data.user.name);
          if (data.user.languagePref) setCurrentLang(data.user.languagePref);
        }
      })
      .catch(() => {});
  }, []);

  const handleRoleSwitch = async (role: string) => {
    try {
      const res = await fetch("/api/auth/demo-switch", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role }),
      });
      const data = await res.json();
      if (res.ok && data.user) {
        setCurrentRole(data.user.role);
        setUserName(data.user.name);
        setCurrentTab("dashboard");
      }
    } catch (err) {
      console.error("Failed to switch role", err);
    }
  };

  const renderCurrentView = () => {
    switch (currentTab) {
      case "dashboard":
        switch (currentRole) {
          case "STUDENT":
            return <StudentDashboard onNavigate={setCurrentTab} />;
          case "PRINCIPAL":
            return <PrincipalDashboard onNavigate={setCurrentTab} />;
          case "PARENT":
            return <ParentDashboard onNavigate={setCurrentTab} />;
          case "ACCOUNTANT":
            return <AccountantDashboard onNavigate={setCurrentTab} />;
          case "TRANSPORT":
            return <TransportDashboard onNavigate={setCurrentTab} />;
          case "ADMIN":
            return <AdminDashboard onNavigate={setCurrentTab} />;
          case "TEACHER":
          default:
            return <TeacherDashboard onNavigate={setCurrentTab} />;
        }
      case "mtss":
        return <MTSSPanel userRole={currentRole} />;
      case "socratic":
        return (
          <div className="max-w-4xl mx-auto space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold font-display text-foreground">
                  Socratic AI Tutor ("Aetheris Mentor")
                </h2>
                <p className="text-xs text-foreground/60 mt-0.5">
                  Pedagogically constrained to active textbook chapters. Prompts deeper reasoning with hints.
                </p>
              </div>
            </div>
            <SocraticTutor />
          </div>
        );
      case "attendance":
        return <AttendanceCockpit />;
      case "timetable":
        return <SmartTimetable userRole={currentRole} />;
      case "gradebook":
        return <SmartGradebook />;
      case "transport":
        return <SafeRideView userRole={currentRole} />;
      case "fees":
        return <FeeHealthView userRole={currentRole} />;
      case "notices":
        return <TrilingualNotices currentLang={currentLang} />;
      default:
        return <TeacherDashboard onNavigate={setCurrentTab} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      {/* Top Navigation */}
      <Topbar
        currentRole={currentRole}
        userName={userName}
        onRoleSwitch={handleRoleSwitch}
        currentLang={currentLang}
        onLangSwitch={setCurrentLang}
      />

      {/* Main Workspace Body */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <Sidebar
          currentTab={currentTab}
          onTabChange={setCurrentTab}
          userRole={currentRole}
        />

        {/* Content Pane */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 max-w-7xl mx-auto w-full">
          {renderCurrentView()}
        </main>
      </div>

      {/* Global Command Palette */}
      <CommandPalette
        isOpen={isCommandOpen}
        onClose={() => setIsCommandOpen(false)}
        onNavigate={setCurrentTab}
        onRoleSwitch={handleRoleSwitch}
      />

      {/* Mobile Cmd+K trigger button */}
      <button
        onClick={() => setIsCommandOpen(true)}
        className="fixed bottom-4 right-4 h-11 px-4 rounded-full bg-brand-600 text-white shadow-elevated flex items-center gap-2 text-xs font-semibold hover:bg-brand-500 transition-transform active:scale-95 z-40"
      >
        <span>Cmd+K</span>
      </button>
    </div>
  );
}
