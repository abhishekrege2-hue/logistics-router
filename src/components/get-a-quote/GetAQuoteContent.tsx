"use client";

import { useMemo, useState, type FormEvent } from "react";
import { Leaf, Loader2, Plane, Ship, Train } from "lucide-react";
import { ROUTING_LOCATIONS } from "@/lib/hubs";

type QuotePhase = "idle" | "loading" | "results";

const CARGO_TYPES = [
  { value: "general", label: "General" },
  { value: "perishable", label: "Perishable" },
  { value: "hazmat", label: "Hazmat" },
] as const;

type Unit = "kg" | "lbs" | "tons";
type ServiceTier = "ocean" | "air";

function toKg(value: number, unit: Unit) {
  if (unit === "lbs") return value * 0.453592;
  if (unit === "tons") return value * 1000;
  return value;
}

export function GetAQuoteContent() {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [weight, setWeight] = useState("");
  const [unit, setUnit] = useState<Unit>("kg");
  const [cargoType, setCargoType] = useState<string>("general");
  const [serviceTier, setServiceTier] = useState<ServiceTier>("ocean");
  const [premiumHandling, setPremiumHandling] = useState(false);
  const [phase, setPhase] = useState<QuotePhase>("idle");

  const originChoices = useMemo(
    () =>
      ROUTING_LOCATIONS.filter((city) =>
        city.toLowerCase().includes(origin.trim().toLowerCase()),
      ).slice(0, 5),
    [origin],
  );
  const destinationChoices = useMemo(
    () =>
      ROUTING_LOCATIONS.filter((city) =>
        city.toLowerCase().includes(destination.trim().toLowerCase()),
      ).slice(0, 5),
    [destination],
  );

  const normalizedWeightKg = useMemo(
    () => toKg(Number.parseFloat(weight || "0"), unit),
    [weight, unit],
  );
  const surchargeMultiplier = serviceTier === "air" || premiumHandling ? 1.35 : 1;
  const oceanBase = Math.max(220, normalizedWeightKg * 0.55);
  const airBase = Math.max(680, normalizedWeightKg * 1.35);
  const hybridBase = Math.max(420, normalizedWeightKg * 0.9);

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
        AI Routing Quote Engine
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
              <div className="relative">
                <input
                  id="quote-origin"
                  value={origin}
                  onChange={(e) => setOrigin(e.target.value)}
                  className="input-control min-h-[44px] w-full px-4 py-3 text-sm"
                  placeholder="e.g. Mumbai (BOM)"
                  autoComplete="off"
                />
                {origin.trim().length > 0 && (
                  <div className="surface-card absolute z-20 mt-1 w-full rounded-md border p-1">
                    {originChoices.map((choice) => (
                      <button
                        key={choice}
                        type="button"
                        onClick={() => setOrigin(choice)}
                        className="block w-full rounded-[4px] px-2 py-2 text-left text-xs font-medium hover:bg-[color:var(--color-bg)]"
                      >
                        {choice}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div>
              <label
                htmlFor="quote-destination"
                className="mb-1.5 block text-sm font-semibold"
                style={{ color: "var(--color-text-primary)" }}
              >
                Destination
              </label>
              <div className="relative">
                <input
                  id="quote-destination"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="input-control min-h-[44px] w-full px-4 py-3 text-sm"
                  placeholder="e.g. Rotterdam (RTM)"
                  autoComplete="off"
                />
                {destination.trim().length > 0 && (
                  <div className="surface-card absolute z-20 mt-1 w-full rounded-md border p-1">
                    {destinationChoices.map((choice) => (
                      <button
                        key={choice}
                        type="button"
                        onClick={() => setDestination(choice)}
                        className="block w-full rounded-[4px] px-2 py-2 text-left text-xs font-medium hover:bg-[color:var(--color-bg)]"
                      >
                        {choice}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              <label
                htmlFor="quote-weight"
                className="mb-1.5 block text-sm font-semibold sm:col-span-3"
                style={{ color: "var(--color-text-primary)" }}
              >
                Weight
              </label>
              <input
                id="quote-weight"
                type="number"
                min={0}
                step="0.1"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="input-control min-h-[44px] w-full px-4 py-3 text-sm"
                placeholder="0"
              />
              <button
                type="button"
                className={`rounded-[4px] border px-3 py-2 text-xs font-semibold ${unit === "kg" ? "bg-[color:var(--color-bg)]" : ""}`}
                onClick={() => setUnit("kg")}
              >
                KG
              </button>
              <button
                type="button"
                className={`rounded-[4px] border px-3 py-2 text-xs font-semibold ${unit === "lbs" ? "bg-[color:var(--color-bg)]" : ""}`}
                onClick={() => setUnit("lbs")}
              >
                LBS
              </button>
              <button
                type="button"
                className={`rounded-[4px] border px-3 py-2 text-xs font-semibold ${unit === "tons" ? "bg-[color:var(--color-bg)]" : ""}`}
                onClick={() => setUnit("tons")}
              >
                Tons
              </button>
            </div>
            <div>
              <p className="mb-1.5 text-sm font-semibold">Service Tier</p>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={() => setServiceTier("ocean")}
                  className={`rounded-[4px] border px-4 py-2 text-sm font-semibold ${serviceTier === "ocean" ? "bg-[color:var(--color-bg)]" : ""}`}
                >
                  Standard (Ocean)
                </button>
                <button
                  type="button"
                  onClick={() => setServiceTier("air")}
                  className={`rounded-[4px] border px-4 py-2 text-sm font-semibold ${serviceTier === "air" ? "bg-[color:var(--color-bg)]" : ""}`}
                >
                  Premium (Air)
                </button>
              </div>
            </div>
            <label className="inline-flex items-center gap-2 text-sm font-medium">
              <input
                type="checkbox"
                checked={premiumHandling}
                onChange={(e) => setPremiumHandling(e.target.checked)}
              />
              Premium Handling (+35% estimated pricing uplift)
            </label>
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
              {destination || "your destination"} · {weight || "—"} {unit} ·{" "}
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
                        ${Math.round(airBase * surchargeMultiplier).toLocaleString()}
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
                        ${Math.round(oceanBase * surchargeMultiplier).toLocaleString()}
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
                        ${Math.round(hybridBase * surchargeMultiplier).toLocaleString()}
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
