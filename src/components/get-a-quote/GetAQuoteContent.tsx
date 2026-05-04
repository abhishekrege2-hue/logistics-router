"use client";

import { useState, type FormEvent } from "react";
import { Leaf, Loader2, Plane, Ship, Train } from "lucide-react";

type QuotePhase = "idle" | "loading" | "results";

const CARGO_TYPES = [
  { value: "general", label: "General" },
  { value: "perishable", label: "Perishable" },
  { value: "hazmat", label: "Hazmat" },
] as const;

export function GetAQuoteContent() {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [weightKg, setWeightKg] = useState("");
  const [cargoType, setCargoType] = useState<string>("general");
  const [phase, setPhase] = useState<QuotePhase>("idle");

  const handleCalculate = (e: FormEvent) => {
    e.preventDefault();
    if (phase === "loading") return;
    setPhase("loading");
    window.setTimeout(() => setPhase("results"), 2500);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <h1
        className="border-l-4 pl-4 text-3xl font-bold tracking-tight sm:text-4xl"
        style={{
          borderColor: "var(--color-accent)",
          color: "var(--color-primary)",
        }}
      >
        Agentic Quote Generator
      </h1>
      <p
        className="mt-3 max-w-2xl text-base font-medium"
        style={{ color: "var(--color-text-secondary)" }}
      >
        Enter lane and cargo details. Our routing engine simulates multimodal
        options for your shipment.
      </p>

      <div
        className={`mt-10 grid grid-cols-1 gap-8 ${phase === "results" ? "md:grid-cols-2 md:gap-10" : ""}`}
      >
        <div
          className="surface-card rounded-lg border p-6 sm:p-8"
          style={{ borderColor: "var(--color-border)" }}
        >
          <h2
            className="text-lg font-semibold"
            style={{ color: "var(--color-primary)" }}
          >
            Shipment details
          </h2>
          <form className="mt-6 flex flex-col gap-5" onSubmit={handleCalculate}>
            <div>
              <label
                htmlFor="quote-origin"
                className="mb-1.5 block text-sm font-semibold"
                style={{ color: "var(--color-text-primary)" }}
              >
                Origin (City / Port)
              </label>
              <input
                id="quote-origin"
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
                className="input-control min-h-[44px] w-full px-4 py-3 text-sm"
                placeholder="e.g. Mumbai Nhava Sheva"
                autoComplete="off"
              />
            </div>
            <div>
              <label
                htmlFor="quote-destination"
                className="mb-1.5 block text-sm font-semibold"
                style={{ color: "var(--color-text-primary)" }}
              >
                Destination
              </label>
              <input
                id="quote-destination"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="input-control min-h-[44px] w-full px-4 py-3 text-sm"
                placeholder="e.g. Rotterdam"
                autoComplete="off"
              />
            </div>
            <div>
              <label
                htmlFor="quote-weight"
                className="mb-1.5 block text-sm font-semibold"
                style={{ color: "var(--color-text-primary)" }}
              >
                Weight (kg)
              </label>
              <input
                id="quote-weight"
                type="number"
                min={0}
                step="0.1"
                value={weightKg}
                onChange={(e) => setWeightKg(e.target.value)}
                className="input-control min-h-[44px] w-full px-4 py-3 text-sm"
                placeholder="0"
              />
            </div>
            <div>
              <label
                htmlFor="quote-cargo"
                className="mb-1.5 block text-sm font-semibold"
                style={{ color: "var(--color-text-primary)" }}
              >
                Cargo type
              </label>
              <select
                id="quote-cargo"
                value={cargoType}
                onChange={(e) => setCargoType(e.target.value)}
                className="input-control min-h-[44px] w-full cursor-pointer px-4 py-3 text-sm"
              >
                {CARGO_TYPES.map((c) => (
                  <option key={c.value} value={c.value}>
                    {c.label}
                  </option>
                ))}
              </select>
            </div>
            <button
              type="submit"
              disabled={phase === "loading"}
              className="btn-primary inline-flex min-h-[44px] w-full items-center justify-center gap-2 px-6 py-3 disabled:cursor-wait disabled:opacity-90 sm:w-auto"
            >
              {phase === "loading" ? (
                <>
                  <Loader2
                    className="h-5 w-5 shrink-0 animate-spin"
                    aria-hidden
                  />
                  Optimizing Routes...
                </>
              ) : (
                "Calculate Route"
              )}
            </button>
          </form>
        </div>

        {phase === "results" && (
          <div
            className="surface-card rounded-lg border p-6 sm:p-8"
            style={{ borderColor: "var(--color-border)" }}
            aria-live="polite"
          >
            <h2
              className="text-lg font-semibold"
              style={{ color: "var(--color-primary)" }}
            >
              Optimized route options
            </h2>
            <p
              className="mt-1 text-sm"
              style={{ color: "var(--color-text-secondary)" }}
            >
              Mock estimates for {origin || "your origin"} →{" "}
              {destination || "your destination"} · {weightKg || "—"} kg ·{" "}
              {CARGO_TYPES.find((c) => c.value === cargoType)?.label ??
                cargoType}
            </p>
            <ul className="mt-6 flex flex-col gap-4">
              <li
                className="rounded-lg border p-4"
                style={{
                  borderColor: "var(--color-border)",
                  backgroundColor: "var(--color-bg)",
                }}
              >
                <div className="flex items-start gap-3">
                  <Plane
                    className="mt-0.5 h-5 w-5 shrink-0"
                    style={{ color: "var(--color-accent)" }}
                    aria-hidden
                  />
                  <div>
                    <p
                      className="text-xs font-bold uppercase tracking-wider"
                      style={{ color: "var(--color-text-secondary)" }}
                    >
                      Fastest
                    </p>
                    <p
                      className="mt-1 text-base font-semibold"
                      style={{ color: "var(--color-text-primary)" }}
                    >
                      Air Freight
                    </p>
                    <p
                      className="mt-2 text-sm"
                      style={{ color: "var(--color-text-secondary)" }}
                    >
                      2 days ·{" "}
                      <span className="font-semibold text-[color:var(--color-primary)]">
                        $1,250
                      </span>
                    </p>
                  </div>
                </div>
              </li>
              <li
                className="rounded-lg border p-4"
                style={{
                  borderColor: "var(--color-border)",
                  backgroundColor: "var(--color-bg)",
                }}
              >
                <div className="flex items-start gap-3">
                  <Ship
                    className="mt-0.5 h-5 w-5 shrink-0"
                    style={{ color: "var(--color-accent)" }}
                    aria-hidden
                  />
                  <div>
                    <p
                      className="text-xs font-bold uppercase tracking-wider"
                      style={{ color: "var(--color-text-secondary)" }}
                    >
                      Most cost-effective
                    </p>
                    <p
                      className="mt-1 text-base font-semibold"
                      style={{ color: "var(--color-text-primary)" }}
                    >
                      Ocean Freight
                    </p>
                    <p
                      className="mt-2 text-sm"
                      style={{ color: "var(--color-text-secondary)" }}
                    >
                      18 days ·{" "}
                      <span className="font-semibold text-[color:var(--color-primary)]">
                        $350
                      </span>
                    </p>
                  </div>
                </div>
              </li>
              <li
                className="rounded-lg border p-4"
                style={{
                  borderColor: "var(--color-border)",
                  backgroundColor: "var(--color-bg)",
                }}
              >
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 flex shrink-0 items-center gap-1">
                    <Train
                      className="h-5 w-5"
                      style={{ color: "var(--color-success)" }}
                      aria-hidden
                    />
                    <Ship
                      className="-ml-2 h-4 w-4 opacity-80"
                      style={{ color: "var(--color-success)" }}
                      aria-hidden
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <p
                        className="text-xs font-bold uppercase tracking-wider"
                        style={{ color: "var(--color-text-secondary)" }}
                      >
                        Eco-optimized
                      </p>
                      <span
                        className="inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide"
                        style={{
                          borderColor: "var(--color-success)",
                          color: "var(--color-success)",
                        }}
                      >
                        <Leaf className="h-3 w-3" aria-hidden />
                        Lowest CO₂
                      </span>
                    </div>
                    <p
                      className="mt-1 text-base font-semibold"
                      style={{ color: "var(--color-text-primary)" }}
                    >
                      Rail / Sea hybrid
                    </p>
                    <p
                      className="mt-2 text-sm"
                      style={{ color: "var(--color-text-secondary)" }}
                    >
                      12 days ·{" "}
                      <span className="font-semibold text-[color:var(--color-primary)]">
                        $550
                      </span>
                    </p>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
