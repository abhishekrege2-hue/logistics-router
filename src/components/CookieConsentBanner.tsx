"use client";

import { useState } from "react";

export function CookieConsentBanner() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[90]">
      <div
        className="absolute inset-0 backdrop-blur-sm"
        style={{ backgroundColor: "rgba(17, 24, 39, 0.55)" }}
      />
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div className="surface-card w-full max-w-xl rounded-lg border p-6 shadow-card sm:p-7">
          <h2 className="text-lg font-bold text-[color:var(--color-primary)]">
            Cookie Preferences
          </h2>
          <p className="mt-2 text-sm font-medium text-[color:var(--color-text-secondary)]">
            Meridian SCM uses cookies to improve site performance, secure
            sessions, and personalize your shipping experience.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setVisible(false)}
              className="rounded-[4px] border px-3 py-2 text-xs font-semibold"
              style={{
                borderColor: "var(--color-primary)",
                color: "var(--color-primary)",
                backgroundColor: "#ffffff",
              }}
            >
              Strictly Necessary
            </button>
            <button
              type="button"
              onClick={() => setVisible(false)}
              className="rounded-[4px] px-3 py-2 text-xs font-semibold text-white"
              style={{ backgroundColor: "var(--color-accent)" }}
            >
              Accept All
            </button>
            <button
              type="button"
              onClick={() => setVisible(false)}
              className="rounded-[4px] border px-3 py-2 text-xs font-semibold"
              style={{
                borderColor: "var(--color-border)",
                color: "var(--color-text-primary)",
                backgroundColor: "#ffffff",
              }}
            >
              Consent Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
