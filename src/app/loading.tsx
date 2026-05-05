"use client";

import { useEffect, useState } from "react";

const LOADING_MESSAGES = [
  "Optimizing your global trade lanes...",
  "Analyzing port congestion data...",
  "Syncing with Meridian Global Network...",
  "Orchestrating multi-modal logistics...",
] as const;

export default function Loading() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % LOADING_MESSAGES.length);
    }, 1200);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="fixed inset-0 z-[95] bg-[rgba(247,246,242,0.96)]">
      <div className="h-1.5 w-full overflow-hidden bg-[linear-gradient(to_right,#000080,#F4C430)]">
        <div className="h-full w-1/3 animate-[pulse_1.2s_ease-in-out_infinite] bg-white/40" />
      </div>
      <div className="flex h-[calc(100%-6px)] items-center justify-center">
        <p className="text-sm font-semibold text-[color:var(--color-primary)]">
          {LOADING_MESSAGES[index]}
        </p>
      </div>
    </div>
  );
}
