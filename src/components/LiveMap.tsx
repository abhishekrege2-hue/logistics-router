"use client";

import dynamic from "next/dynamic";
import { MapPin } from "lucide-react";
import type { LatLng } from "@/lib/geocoding";

interface LiveMapProps {
  originLabel?: string | null;
  destinationLabel?: string | null;
  origin?: LatLng | null;
  destination?: LatLng | null;
}

const LeafletMap = dynamic(() => import("./_LeafletMapInner"), {
  ssr: false,
  loading: () => (
    <div className="flex aspect-[16/10] w-full min-h-[280px] items-center justify-center sm:min-h-[320px]">
      <p
        className="text-sm font-medium"
        style={{ color: "var(--color-text-secondary)" }}
      >
        Loading map…
      </p>
    </div>
  ),
});

export function LiveMap({
  originLabel,
  destinationLabel,
  origin,
  destination,
}: LiveMapProps) {
  const hasRoute = Boolean(origin && destination);

  return (
    <section
      id="live-map"
      className="h-full"
      aria-labelledby="live-map-heading"
    >
      <div className="h-full">
        <div className="sr-only">
          <h2 id="live-map-heading">Live Map</h2>
        </div>

        <div className="surface-card relative h-full overflow-hidden rounded-lg">
          <div className="relative aspect-[16/10] w-full min-h-[280px] sm:min-h-[320px]">
            <LeafletMap origin={origin} destination={destination} />

            <div
              className="pointer-events-none absolute left-4 top-4 sm:left-6 sm:top-6"
              style={{ maxWidth: "48%" }}
            >
              <div
                className="rounded-lg border px-3 py-2 shadow-card surface-card"
                style={{ borderColor: "var(--color-border)" }}
              >
                <p
                  className="text-xs font-medium uppercase"
                  style={{ color: "var(--color-text-secondary)" }}
                >
                  Origin
                </p>
                <p
                  className="truncate font-semibold"
                  style={{ color: "var(--color-text-primary)" }}
                >
                  {originLabel || "—"}
                </p>
              </div>
            </div>
            <div
              className="pointer-events-none absolute right-4 top-4 sm:right-6 sm:top-6"
              style={{ maxWidth: "48%" }}
            >
              <div
                className="rounded-lg border px-3 py-2 shadow-card surface-card"
                style={{ borderColor: "var(--color-border)" }}
              >
                <p
                  className="text-xs font-medium uppercase"
                  style={{ color: "var(--color-text-secondary)" }}
                >
                  Destination
                </p>
                <p
                  className="truncate font-semibold"
                  style={{ color: "var(--color-text-primary)" }}
                >
                  {destinationLabel || "—"}
                </p>
              </div>
            </div>

            {!hasRoute && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div
                  className="flex flex-col items-center gap-2 rounded-lg border px-6 py-4 text-center shadow-card surface-card"
                  style={{ borderColor: "var(--color-border)" }}
                >
                  <MapPin
                    className="h-8 w-8"
                    style={{ color: "var(--color-text-secondary)" }}
                    aria-hidden
                  />
                  <p
                    className="text-sm font-medium"
                    style={{ color: "var(--color-text-secondary)" }}
                  >
                    Calculate a route to see it on the map
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
