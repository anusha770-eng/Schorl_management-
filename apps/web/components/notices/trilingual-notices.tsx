"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bell, Globe, Sparkles } from "lucide-react";

export function TrilingualNotices({ currentLang = "en" }: { currentLang?: string }) {
  const [notices, setNotices] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchNotices();
  }, []);

  const fetchNotices = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/notices");
      const data = await res.json();
      if (res.ok && data.notices) {
        setNotices(data.notices);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="border border-surface-border shadow-card bg-surface overflow-hidden">
      <CardHeader className="bg-surface-subtle/40 pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-brand-500" />
            <CardTitle className="text-base">Institutional Circulars & Notices</CardTitle>
          </div>
          <Badge variant="outline" className="gap-1 text-xs">
            <Globe className="w-3 h-3 text-brand-500" />
            Trilingual Mode: {currentLang.toUpperCase()}
          </Badge>
        </div>
        <CardDescription className="text-xs">
          Auto-translated bidirectional communications (English, Hindi, Kannada).
        </CardDescription>
      </CardHeader>

      <CardContent className="p-4 space-y-4">
        {isLoading ? (
          <div className="p-8 text-center text-foreground/40 text-sm">
            Fetching verified circulars...
          </div>
        ) : (
          notices.map((n) => {
            const localizedContent = n.translations[currentLang] || n.content;
            return (
              <div
                key={n.id}
                className="p-4 rounded-xl border border-surface-border bg-surface-subtle/30 space-y-2 hover:bg-surface-subtle/60 transition-colors"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="font-semibold text-sm text-foreground">{n.title}</span>
                  <Badge variant="brand" className="text-[10px]">
                    {n.category}
                  </Badge>
                </div>

                <p className="text-xs text-foreground/80 leading-relaxed font-sans">
                  {localizedContent}
                </p>

                <div className="flex items-center justify-between pt-2 border-t border-surface-border/40 text-[11px] text-foreground/40">
                  <span>Author: {n.authorName}</span>
                  <span>Published: {n.publishedAt}</span>
                </div>
              </div>
            );
          })
        )}
      </CardContent>
    </Card>
  );
}
