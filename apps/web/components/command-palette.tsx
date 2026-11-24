"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import {
  Search,
  LayoutDashboard,
  Sparkles,
  AlertTriangle,
  Calendar,
  CheckSquare,
  GraduationCap,
  Bus,
  CreditCard,
  Moon,
  Sun,
  UserCheck,
  Command,
} from "lucide-react";
import { useTheme } from "@/components/theme-provider";

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (tab: string) => void;
  onRoleSwitch: (role: string) => void;
}

export function CommandPalette({
  isOpen,
  onClose,
  onNavigate,
  onRoleSwitch,
}: CommandPaletteProps) {
  const [query, setQuery] = useState("");
  const { toggleTheme } = useTheme();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        if (isOpen) onClose();
        else onClose(); // parent handles toggle
      }
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const actions = [
    { id: "dashboard", title: "Go to Overview Dashboard", icon: LayoutDashboard, category: "Navigation" },
    { id: "mtss", title: "Open OmniLoop MTSS Early-Warning Action Cards", icon: AlertTriangle, category: "Navigation" },
    { id: "socratic", title: "Launch Socratic AI Mentor", icon: Sparkles, category: "Navigation" },
    { id: "attendance", title: "Take Class Attendance", icon: CheckSquare, category: "Navigation" },
    { id: "timetable", title: "View Master Timetable & Substitutes", icon: Calendar, category: "Navigation" },
    { id: "gradebook", title: "Open Smart Gradebook", icon: GraduationCap, category: "Navigation" },
    { id: "transport", title: "Open SafeRide Transit Tracker", icon: Bus, category: "Navigation" },
    { id: "fees", title: "Review Fees & Installment Requests", icon: CreditCard, category: "Navigation" },
    { id: "theme", title: "Toggle Obsidian / Parchment Theme", icon: Moon, category: "System", action: toggleTheme },
    { id: "role_teacher", title: "Switch to Teacher Role (Vikram)", icon: UserCheck, category: "Demo Persona", action: () => onRoleSwitch("TEACHER") },
    { id: "role_student", title: "Switch to Student Role (Ananya)", icon: UserCheck, category: "Demo Persona", action: () => onRoleSwitch("STUDENT") },
    { id: "role_principal", title: "Switch to Principal Role (Dr. Sunita)", icon: UserCheck, category: "Demo Persona", action: () => onRoleSwitch("PRINCIPAL") },
    { id: "role_parent", title: "Switch to Parent Role (Meera)", icon: UserCheck, category: "Demo Persona", action: () => onRoleSwitch("PARENT") },
  ];

  const filtered = actions.filter((a) =>
    a.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-start justify-center pt-20 p-4 animate-in fade-in">
      <div
        className="w-full max-w-xl bg-surface-elevated border border-surface-border rounded-2xl shadow-elevated overflow-hidden animate-in zoom-in-95"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-3 border-b border-surface-border flex items-center gap-2.5">
          <Search className="w-4 h-4 text-foreground/40 shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && filtered.length > 0) {
                const item = filtered[0];
                if (item.action) {
                  item.action();
                } else {
                  onNavigate(item.id);
                }
                onClose();
              }
            }}
            placeholder="Type a command or search students, subjects, actions... (ESC to close)"
            className="w-full bg-transparent text-sm text-foreground placeholder:text-foreground/40 focus:outline-none"
            autoFocus
          />
          <kbd className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-surface-subtle border border-surface-border text-foreground/50">
            ESC
          </kbd>
        </div>

        <div className="max-h-80 overflow-y-auto p-2 space-y-1">
          {filtered.length === 0 ? (
            <div className="p-6 text-center text-xs text-foreground/40">
              No matching actions found for "{query}".
            </div>
          ) : (
            filtered.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    if (item.action) {
                      item.action();
                    } else {
                      onNavigate(item.id);
                    }
                    onClose();
                  }}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium text-foreground hover:bg-surface-subtle transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4 text-brand-500" />
                    <span>{item.title}</span>
                  </div>
                  <span className="text-[10px] font-mono text-foreground/40 uppercase">
                    {item.category}
                  </span>
                </button>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
