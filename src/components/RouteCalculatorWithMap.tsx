"use client";

import { useState } from "react";
import { RouteCalculator } from "@/components/RouteCalculator";
import { LiveMap } from "@/components/LiveMap";
import type { LatLng } from "@/lib/geocoding";
import { useShipmentHistory } from "@/hooks/useShipmentHistory";
import type { Shipment } from "@/lib/shipments";
import { ShipmentHistory } from "@/components/ShipmentHistory";
import { SupplyChainAdvisor } from "@/components/SupplyChainAdvisor";
import { MapGeocodingErrorBoundary } from "@/components/MapGeocodingErrorBoundary";

export function RouteCalculatorWithMap() {
  const [route, setRoute] = useState<{
    originLabel: string;
    destinationLabel: string;
    origin: LatLng;
    destination: LatLng;
  } | null>(null);
  const { shipments, addShipment, clearShipments, exportCsv } =
    useShipmentHistory();
  const latestShipment = shipments[0];

  return (
    <section id="get-quote" style={{ backgroundColor: "var(--color-bg)" }}>
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid items-start gap-6 lg:grid-cols-[420px_minmax(0,1fr)]">
          <aside id="ship-now" className="surface-card rounded-lg p-5 sm:p-6">
            <div className="mb-4">
              <h2
                className="text-base font-semibold tracking-tight"
                style={{ color: "var(--color-primary)" }}
              >
                Route Calculator
              </h2>
              <p
                className="mt-1 text-sm"
                style={{ color: "var(--color-text-secondary)" }}
              >
                Search cities, estimate distance, and create a shipment.
              </p>
            </div>
            <MapGeocodingErrorBoundary>
              <RouteCalculator
                onRouteCalculated={(payload) => {
                  setRoute({
                    originLabel: payload.originLabel,
                    destinationLabel: payload.destinationLabel,
                    origin: payload.origin,
                    destination: payload.destination,
                  });

                  const estimatedDays = Math.max(
                    1,
                    payload.estimatedHours / 24,
                  );

                  const shipment: Shipment = {
                    id: crypto.randomUUID(),
                    createdAt: new Date().toISOString(),
                    origin: {
                      city: payload.originLabel,
                      lat: payload.origin.lat,
                      lng: payload.origin.lng,
                    },
                    destination: {
                      city: payload.destinationLabel,
                      lat: payload.destination.lat,
                      lng: payload.destination.lng,
                    },
                    weightKg: payload.weightKg,
                    distanceKm: payload.distanceKm,
                    estimatedDays,
                    status: "In Transit",
                  };

                  addShipment(shipment);
                }}
              />
            </MapGeocodingErrorBoundary>
          </aside>

          <div className="space-y-6">
            <div className="min-h-[360px]">
              <MapGeocodingErrorBoundary>
                <LiveMap
                  originLabel={route?.originLabel}
                  destinationLabel={route?.destinationLabel}
                  origin={route?.origin}
                  destination={route?.destination}
                />
              </MapGeocodingErrorBoundary>
            </div>
            <SupplyChainAdvisor latestShipment={latestShipment} />

            <div className="surface-card overflow-hidden rounded-lg">
              <ShipmentHistory
                shipments={shipments}
                onClear={clearShipments}
                onExportCsv={exportCsv}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
