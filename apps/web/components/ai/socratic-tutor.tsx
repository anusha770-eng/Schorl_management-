"use client";

import * as React from "react";
import { useState, useRef, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Send, BookOpen, AlertCircle, ShieldCheck, RefreshCw } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

export function SocraticTutor({ initialSubject = "Mathematics", chapter = 4 }: { initialSubject?: string; chapter?: number }) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: `Hello! I'm your Aetheris Socratic Mentor. We're currently studying Grade 9 Mathematics (Chapter 4: Linear Equations & Quadratic Foundations). What concept or problem are you working through right now?`,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isDemoMode, setIsDemoMode] = useState(false);
  const [curriculumInfo, setCurriculumInfo] = useState("Chapter 4: Linear Equations & Factoring");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const query = input.trim();
    if (!query || isLoading) return;

    const userMessage: Message = {
      role: "user",
      content: query,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/ai/socratic", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subject: initialSubject,
          chapter: chapter,
          messages: [...messages, userMessage],
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setIsDemoMode(Boolean(data.isDemoMode));
        if (data.curriculumGroundedIn) setCurriculumInfo(data.curriculumGroundedIn);
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: data.reply,
            timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: data.error || "I ran into a problem fetching the next guiding step. Let's try again!",
            timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          },
        ]);
      }
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Network error connecting to Socratic Mentor. Please check your connection.",
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="flex flex-col h-[600px] border border-surface-border shadow-elevated bg-surface overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between pb-3 bg-surface-subtle/50">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-brand-500/10 text-brand-500 flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <CardTitle className="text-base flex items-center gap-2">
                Aetheris Socratic Mentor
                {isDemoMode && (
                  <Badge variant="warning" className="text-[10px] px-1.5 py-0">
                    Curriculum Demo Engine
                  </Badge>
                )}
              </CardTitle>
              <CardDescription className="flex items-center gap-1.5 mt-0.5 text-xs">
                <BookOpen className="w-3 h-3 text-brand-500" />
                Grounded in: <span className="font-medium text-foreground">{curriculumInfo}</span>
              </CardDescription>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Badge variant="outline" className="gap-1 text-[11px] hidden sm:inline-flex">
            <ShieldCheck className="w-3 h-3 text-status-present" />
            Zero-PII Guarded
          </Badge>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-foreground/60"
            onClick={() =>
              setMessages([
                {
                  role: "assistant",
                  content: "Conversation reset. What quadratic or linear algebra question can we explore step-by-step?",
                  timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
                },
              ])
            }
            title="Reset conversation"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </Button>
        </div>
      </CardHeader>

      {/* Socratic Chat Body */}
      <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((m, index) => (
          <div
            key={index}
            className={`flex flex-col ${
              m.role === "user" ? "items-end" : "items-start"
            }`}
          >
            <div className="flex items-center gap-1.5 mb-1 px-1">
              <span className="text-[11px] font-medium text-foreground/50">
                {m.role === "user" ? "You" : "Socratic Mentor"}
              </span>
              <span className="text-[10px] text-foreground/30">{m.timestamp}</span>
            </div>
            <div
              className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                m.role === "user"
                  ? "bg-brand-600 text-white rounded-br-none shadow-subtle"
                  : "bg-surface-elevated text-foreground border border-surface-border rounded-bl-none shadow-subtle"
              }`}
            >
              {m.content}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex items-center gap-2 text-foreground/50 text-xs py-2 px-3 bg-surface-subtle/50 rounded-xl w-fit">
            <Sparkles className="w-3.5 h-3.5 animate-spin text-brand-500" />
            Analyzing syllabus and formulating guiding prompt...
          </div>
        )}
        <div ref={messagesEndRef} />
      </CardContent>

      {/* Quick Prompts */}
      <div className="px-4 py-2 border-t border-surface-border/40 bg-surface-subtle/30 flex items-center gap-2 overflow-x-auto text-xs">
        <span className="text-foreground/40 shrink-0 font-medium text-[11px]">Quick try:</span>
        <button
          onClick={() => setInput("How do I factor x^2 + 5x + 6?")}
          className="px-2.5 py-1 bg-surface rounded-md border border-surface-border text-foreground/80 hover:border-brand-500 text-xs shrink-0 transition-colors"
        >
          "How do I factor x² + 5x + 6?"
        </button>
        <button
          onClick={() => setInput("What are the values of a, b, and c in 2x^2 + 7x + 3?")}
          className="px-2.5 py-1 bg-surface rounded-md border border-surface-border text-foreground/80 hover:border-brand-500 text-xs shrink-0 transition-colors"
        >
          "Finding a, b, c in 2x² + 7x + 3"
        </button>
        <button
          onClick={() => setInput("Can you write my history homework?")}
          className="px-2.5 py-1 bg-surface rounded-md border border-surface-border text-foreground/80 hover:border-brand-500 text-xs shrink-0 transition-colors"
        >
          Test Out-of-Scope Filter
        </button>
      </div>

      {/* Input bar */}
      <form onSubmit={handleSend} className="p-3 bg-surface border-t border-surface-border flex items-center gap-2">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask a question or explain your next step..."
          className="flex-1 text-sm bg-surface-subtle"
          disabled={isLoading}
        />
        <Button type="submit" size="md" disabled={isLoading || !input.trim()} className="shrink-0 gap-1.5">
          <Send className="w-4 h-4" />
          <span>Ask</span>
        </Button>
      </form>
    </Card>
  );
}
