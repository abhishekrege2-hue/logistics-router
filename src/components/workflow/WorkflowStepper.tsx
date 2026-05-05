"use client";

import { useState } from "react";

const STEPS = [
  {
    title: "Booking",
    summary: "Initial order entry, shipper details, and lane selection.",
  },
  {
    title: "Origin Hub (Pune/Mumbai)",
    summary: "Consolidation at Pune and Mumbai gateways with export documentation and pre-carriage checks.",
  },
  {
    title: "International Transit",
    summary: "Ocean or air movement across Meridian SCM trade lanes with milestone visibility and predictive ETAs.",
  },
  {
    title: "Destination Clearance",
    summary: "Import customs clearance, terminal release, and handover to final-mile distribution partners.",
  },
];

export function WorkflowStepper() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section className="surface-card mt-8 rounded-lg p-5 sm:p-6">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {STEPS.map((step, idx) => {
          const active = idx === activeStep;
          return (
            <button
              key={step.title}
              type="button"
              onClick={() => setActiveStep(idx)}
              className={`rounded-md border p-4 text-left transition ${
                active
                  ? "border-[color:var(--color-accent)] bg-[color:var(--color-bg)]"
                  : "border-[color:var(--color-border)] bg-white hover:bg-[color:var(--color-bg)]"
              }`}
            >
              <p className="text-xs font-bold uppercase tracking-wide text-[color:var(--color-text-secondary)]">
                Step {idx + 1}
              </p>
              <p className="mt-1 text-base font-bold text-[color:var(--color-primary)]">
                {step.title}
              </p>
            </button>
          );
        })}
      </div>

      <div className="mt-6 rounded-lg border border-[color:var(--color-border)] bg-white p-5">
        <p className="text-xs font-semibold uppercase tracking-wide text-[color:var(--color-text-secondary)]">
          Active Stage
        </p>
        <h2 className="mt-2 text-2xl font-bold text-[color:var(--color-primary)]">
          {STEPS[activeStep]?.title}
        </h2>
        <p className="mt-2 text-sm font-medium text-[color:var(--color-text-secondary)]">
          {STEPS[activeStep]?.summary}
        </p>
        <div className="mt-5 h-2 w-full rounded bg-[color:var(--color-border)]">
          <div
            className="h-2 rounded bg-[color:var(--color-accent)] transition-all"
            style={{ width: `${((activeStep + 1) / STEPS.length) * 100}%` }}
          />
        </div>
      </div>
    </section>
  );
}
