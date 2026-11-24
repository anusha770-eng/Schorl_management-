"use client";

import { useEffect } from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Root layout error caught:", error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground p-6">
      <div className="max-w-lg w-full bg-surface border border-status-warning/40 rounded-2xl p-6 shadow-elevated text-center space-y-4">
        <div className="w-12 h-12 rounded-full bg-status-warning/15 text-status-warning flex items-center justify-center mx-auto">
          <AlertTriangle className="w-6 h-6" />
        </div>
        <h1 className="text-xl font-bold font-display">Aetheris Application Notice</h1>
        <p className="text-xs text-foreground/70 leading-relaxed font-mono bg-surface-subtle p-3 rounded-lg text-left overflow-auto max-h-32">
          {error.message || "An unexpected error occurred while rendering the workspace."}
        </p>
        <button
          onClick={() => reset()}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-600 text-white text-xs font-semibold hover:bg-brand-500 transition-colors"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          Try Again
        </button>
      </div>
    </div>
  );
}
