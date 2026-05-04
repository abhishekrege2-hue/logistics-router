"use client";

import { useEffect, useState, type FormEvent } from "react";
import { MapPin, Package, Route } from "lucide-react";
import {
  estimateHours,
  geocodeCity,
  haversineKm,
  searchCities,
  type CitySuggestion,
  type LatLng,
} from "@/lib/geocoding";

interface RouteCalculatorProps {
  onRouteCalculated?: (payload: {
    originLabel: string;
    destinationLabel: string;
    origin: LatLng;
    destination: LatLng;
    weightKg: number;
    distanceKm: number;
    estimatedHours: number;
  }) => void;
}

const inputClass = "input-control mt-2 w-full px-4 py-3.5 text-sm shadow-none";

export function RouteCalculator({ onRouteCalculated }: RouteCalculatorProps) {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [weight, setWeight] = useState("");
  const [result, setResult] = useState<{
    distanceKm: number;
    estimatedHours: number;
  } | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [originSuggestions, setOriginSuggestions] = useState<CitySuggestion[]>(
    [],
  );
  const [destSuggestions, setDestSuggestions] = useState<CitySuggestion[]>([]);
  const [originLoading, setOriginLoading] = useState(false);
  const [destLoading, setDestLoading] = useState(false);
  const [originCoords, setOriginCoords] = useState<LatLng | null>(null);
  const [destCoords, setDestCoords] = useState<LatLng | null>(null);

  useEffect(() => {
    if (origin.trim().length < 3) {
      setOriginSuggestions([]);
      setOriginLoading(false);
      return;
    }
    let active = true;
    const controller = new AbortController();
    setOriginLoading(true);
    const id = window.setTimeout(async () => {
      try {
        const results = await searchCities(origin, {
          signal: controller.signal,
          limit: 6,
        });
        if (!active) return;
        setOriginSuggestions(results);
      } catch {
        if (!active) return;
        setOriginSuggestions([]);
      } finally {
        if (active) setOriginLoading(false);
      }
    }, 250);

    return () => {
      active = false;
      controller.abort();
      window.clearTimeout(id);
    };
  }, [origin]);

  useEffect(() => {
    if (destination.trim().length < 3) {
      setDestSuggestions([]);
      setDestLoading(false);
      return;
    }
    let active = true;
    const controller = new AbortController();
    setDestLoading(true);
    const id = window.setTimeout(async () => {
      try {
        const results = await searchCities(destination, {
          signal: controller.signal,
          limit: 6,
        });
        if (!active) return;
        setDestSuggestions(results);
      } catch {
        if (!active) return;
        setDestSuggestions([]);
      } finally {
        if (active) setDestLoading(false);
      }
    }, 250);

    return () => {
      active = false;
      controller.abort();
      window.clearTimeout(id);
    };
  }, [destination]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const weightNum = Math.max(0, parseFloat(weight.replace(",", ".")) || 0);
    const originTrimmed = origin.trim();
    const destTrimmed = destination.trim();
    if (!originTrimmed || !destTrimmed) {
      setResult(null);
      setError("Please enter both an origin and a destination city.");
      return;
    }
    setIsCalculating(true);
    setResult(null);
    try {
      const [originGeo, destGeo] = await Promise.all([
        originCoords ?? geocodeCity(originTrimmed),
        destCoords ?? geocodeCity(destTrimmed),
      ]);

      if (!originGeo) {
        setError(
          `We couldn't find “${originTrimmed}”. Try adding a state/country (e.g., “${originTrimmed}, IN”).`,
        );
        return;
      }
      if (!destGeo) {
        setError(
          `We couldn't find “${destTrimmed}”. Try adding a state/country (e.g., “${destTrimmed}, IN”).`,
        );
        return;
      }

      const distanceKm = Math.round(haversineKm(originGeo, destGeo));
      const estimatedHours = Math.max(
        1,
        Math.round(estimateHours(distanceKm, weightNum)),
      );
      setResult({ distanceKm, estimatedHours });

      onRouteCalculated?.({
        originLabel: originTrimmed,
        destinationLabel: destTrimmed,
        origin: { lat: originGeo.lat, lng: originGeo.lng },
        destination: { lat: destGeo.lat, lng: destGeo.lng },
        weightKg: weightNum,
        distanceKm,
        estimatedHours,
      });
    } catch {
      setError(
        "We couldn’t reach the geocoding service right now. Please try again in a moment.",
      );
    } finally {
      setIsCalculating(false);
    }
  }

  const dropdownClass =
    "absolute z-20 mt-1 w-full overflow-hidden rounded-lg border text-left shadow-card surface-card";
  const suggestionBtn =
    "flex w-full flex-col items-start gap-0.5 px-3 py-2 text-left text-sm transition hover:bg-[color:var(--color-bg)]";

  return (
    <section id="route-calculator" aria-label="Route Calculator">
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid gap-5">
          <div>
            <label
              htmlFor="origin"
              className="flex items-center gap-2 text-sm font-medium"
              style={{ color: "var(--color-text-primary)" }}
            >
              <MapPin
                className="h-4 w-4"
                style={{ color: "var(--color-text-secondary)" }}
                aria-hidden
              />
              Origin City
            </label>
            <input
              id="origin"
              type="text"
              value={origin}
              onChange={(e) => {
                setOrigin(e.target.value);
                setOriginCoords(null);
              }}
              placeholder="e.g. Mumbai"
              className={inputClass}
              autoComplete="address-level2"
            />
            {(originSuggestions.length > 0 || originLoading) && (
              <div className="relative">
                <div
                  className={dropdownClass}
                  style={{ borderColor: "var(--color-border)" }}
                >
                  {originLoading && (
                    <div
                      className="px-3 py-2 text-xs"
                      style={{ color: "var(--color-text-secondary)" }}
                    >
                      Searching cities…
                    </div>
                  )}
                  {originSuggestions.map((s) => (
                    <button
                      key={`${s.lat}-${s.lng}-${s.displayName}`}
                      type="button"
                      className={suggestionBtn}
                      style={{ color: "var(--color-text-primary)" }}
                      onClick={() => {
                        setOrigin(s.displayName);
                        setOriginCoords({ lat: s.lat, lng: s.lng });
                        setOriginSuggestions([]);
                        setError(null);
                      }}
                    >
                      <span className="line-clamp-1 font-medium">
                        {s.displayName}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div>
            <label
              htmlFor="destination"
              className="flex items-center gap-2 text-sm font-medium"
              style={{ color: "var(--color-text-primary)" }}
            >
              <Route
                className="h-4 w-4"
                style={{ color: "var(--color-text-secondary)" }}
                aria-hidden
              />
              Destination City
            </label>
            <input
              id="destination"
              type="text"
              value={destination}
              onChange={(e) => {
                setDestination(e.target.value);
                setDestCoords(null);
              }}
              placeholder="e.g. Delhi"
              className={inputClass}
              autoComplete="address-level2"
            />
            {(destSuggestions.length > 0 || destLoading) && (
              <div className="relative">
                <div
                  className={dropdownClass}
                  style={{ borderColor: "var(--color-border)" }}
                >
                  {destLoading && (
                    <div
                      className="px-3 py-2 text-xs"
                      style={{ color: "var(--color-text-secondary)" }}
                    >
                      Searching cities…
                    </div>
                  )}
                  {destSuggestions.map((s) => (
                    <button
                      key={`${s.lat}-${s.lng}-${s.displayName}`}
                      type="button"
                      className={suggestionBtn}
                      style={{ color: "var(--color-text-primary)" }}
                      onClick={() => {
                        setDestination(s.displayName);
                        setDestCoords({ lat: s.lat, lng: s.lng });
                        setDestSuggestions([]);
                        setError(null);
                      }}
                    >
                      <span className="line-clamp-1 font-medium">
                        {s.displayName}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div>
            <label
              htmlFor="weight"
              className="flex items-center gap-2 text-sm font-medium"
              style={{ color: "var(--color-text-primary)" }}
            >
              <Package
                className="h-4 w-4"
                style={{ color: "var(--color-text-secondary)" }}
                aria-hidden
              />
              Package Weight (kg)
            </label>
            <input
              id="weight"
              type="text"
              inputMode="decimal"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder="e.g. 5.5"
              className={inputClass}
            />
          </div>
        </div>

        {error && (
          <div
            className="rounded-lg border px-4 py-3 text-xs shadow-card"
            style={{
              borderColor: "var(--color-border)",
              backgroundColor: "var(--color-surface)",
              color: "var(--color-text-primary)",
            }}
            role="alert"
          >
            {error}
          </div>
        )}

        <div className="flex flex-col gap-4">
          <button
            type="submit"
            disabled={isCalculating}
            className="btn-primary inline-flex w-full items-center justify-center gap-2 px-5 py-3.5 text-sm font-semibold disabled:opacity-60"
          >
            {isCalculating && (
              <span
                className="h-4 w-4 animate-spin rounded-full border-2 border-solid"
                style={{
                  borderColor: "var(--color-border)",
                  borderTopColor: "var(--color-button-primary-text)",
                }}
              />
            )}
            {isCalculating ? "Calculating…" : "Calculate Route"}
          </button>

          {result && (
            <div className="grid grid-cols-2 gap-3">
              <div
                className="surface-card rounded-lg border px-4 py-3"
                style={{ borderColor: "var(--color-border)" }}
              >
                <p
                  className="text-xs font-medium"
                  style={{ color: "var(--color-text-secondary)" }}
                >
                  Distance
                </p>
                <p
                  className="mt-1 text-lg font-semibold"
                  style={{ color: "var(--color-text-primary)" }}
                >
                  {result.distanceKm} km
                </p>
              </div>
              <div
                className="surface-card rounded-lg border px-4 py-3"
                style={{ borderColor: "var(--color-border)" }}
              >
                <p
                  className="text-xs font-medium"
                  style={{ color: "var(--color-text-secondary)" }}
                >
                  Est. time
                </p>
                <p
                  className="mt-1 text-lg font-semibold"
                  style={{ color: "var(--color-text-primary)" }}
                >
                  ~{result.estimatedHours} hrs
                </p>
              </div>
            </div>
          )}
        </div>
      </form>
    </section>
  );
}
