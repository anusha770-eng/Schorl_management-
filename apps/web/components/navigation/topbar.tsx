"use client";

import * as React from "react";
import { useState } from "react";
import { useTheme } from "@/components/theme-provider";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sun, Moon, Globe, UserCheck, Shield, Sparkles, ChevronDown } from "lucide-react";

interface TopbarProps {
  currentRole: string;
  userName: string;
  onRoleSwitch: (role: string) => void;
  currentLang: string;
  onLangSwitch: (lang: string) => void;
  switchError?: string | null;
  isSwitching?: boolean;
}

export function Topbar({
  currentRole,
  userName,
  onRoleSwitch,
  currentLang,
  onLangSwitch,
  switchError,
  isSwitching,
}: TopbarProps) {
  const { theme, toggleTheme } = useTheme();
  const [showRoleMenu, setShowRoleMenu] = useState(false);
  const [showLangMenu, setShowLangMenu] = useState(false);

  const roles = [
    { id: "ADMIN", label: "Admin (Aditi Rao)" },
    { id: "PRINCIPAL", label: "Principal (Dr. Sunita Kulkarni)" },
    { id: "TEACHER", label: "Teacher (Vikram Rathore - Math)" },
    { id: "STUDENT", label: "Student (Ananya Sharma - 9A)" },
    { id: "PARENT", label: "Parent (Meera Iyer)" },
    { id: "ACCOUNTANT", label: "Accountant (Suresh Nair)" },
    { id: "TRANSPORT", label: "Transport (Ramesh Gowda)" },
  ];

  const languages = [
    { code: "en", label: "English" },
    { code: "hi", label: "हिन्दी (Hindi)" },
    { code: "kn", label: "ಕನ್ನಡ (Kannada)" },
  ];

  return (
    <header className="h-14 border-b border-surface-border bg-surface/80 backdrop-blur-md sticky top-0 z-40 px-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-brand-600 text-white flex items-center justify-center font-bold font-display shadow-subtle">
            Æ
          </div>
          <span className="font-display font-bold text-base tracking-tight text-foreground hidden sm:inline">
            Aetheris <span className="text-brand-500 font-normal text-xs ml-1">School OS</span>
          </span>
        </div>

        {/* 1-Click Demo Role Switcher */}
        <div className="relative">
          <button
            data-testid="persona-switcher"
            onClick={() => {
              setShowRoleMenu(!showRoleMenu);
              setShowLangMenu(false);
            }}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-brand-500/30 bg-brand-50/50 dark:bg-brand-500/10 text-xs font-medium text-brand-600 dark:text-brand-400 hover:border-brand-500 transition-colors"
          >
            <UserCheck className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Demo Persona:</span>
            <span className="font-semibold">{isSwitching ? "Switching..." : currentRole}</span>
            <ChevronDown className="w-3 h-3 ml-0.5 opacity-60" />
          </button>

          {switchError && (
            <div className="absolute left-0 mt-1 px-2.5 py-1 rounded-md bg-status-absent-bg border border-status-absent/40 text-status-absent text-[10px] whitespace-nowrap z-50 flex items-center gap-1 shadow-card">
              <span>⚠️ {switchError}</span>
            </div>
          )}

          {showRoleMenu && (
            <div className="absolute left-0 mt-2 w-64 rounded-xl border border-surface-border bg-surface-elevated shadow-elevated p-1.5 z-50 animate-in fade-in zoom-in-95">
              <div className="px-2.5 py-1.5 text-[11px] font-semibold text-foreground/40 uppercase tracking-wider">
                Switch Role Instantly
              </div>
              {roles.map((r) => (
                <button
                  key={r.id}
                  onClick={() => {
                    onRoleSwitch(r.id);
                    setShowRoleMenu(false);
                  }}
                  className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium transition-colors flex items-center justify-between ${
                    currentRole === r.id
                      ? "bg-brand-600 text-white"
                      : "text-foreground/80 hover:bg-surface-subtle"
                  }`}
                >
                  <span>{r.label}</span>
                  {currentRole === r.id && <Sparkles className="w-3 h-3 text-white" />}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2">
        {/* Trilingual Selector */}
        <div className="relative">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setShowLangMenu(!showLangMenu);
              setShowRoleMenu(false);
            }}
            className="h-8 px-2.5 text-xs gap-1.5 text-foreground/70"
          >
            <Globe className="w-3.5 h-3.5" />
            <span className="uppercase font-semibold">{currentLang}</span>
          </Button>

          {showLangMenu && (
            <div className="absolute right-0 mt-2 w-44 rounded-xl border border-surface-border bg-surface-elevated shadow-elevated p-1 z-50">
              {languages.map((l) => (
                <button
                  key={l.code}
                  onClick={() => {
                    onLangSwitch(l.code);
                    setShowLangMenu(false);
                  }}
                  className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    currentLang === l.code
                      ? "bg-brand-500/10 text-brand-500 font-semibold"
                      : "text-foreground/80 hover:bg-surface-subtle"
                  }`}
                >
                  {l.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Dark / Light Toggle */}
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          className="h-8 w-8 text-foreground/70"
          title={`Switch to ${theme === "dark" ? "Parchment Light" : "Obsidian Dark"}`}
        >
          {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </Button>

        {/* User profile avatar badge */}
        <div className="flex items-center gap-2 pl-2 border-l border-surface-border/60">
          <div className="w-7 h-7 rounded-full bg-brand-500/20 text-brand-500 flex items-center justify-center font-semibold text-xs border border-brand-500/30">
            {userName.charAt(0)}
          </div>
          <span className="text-xs font-medium text-foreground hidden lg:inline">{userName}</span>
        </div>
      </div>
    </header>
  );
}
