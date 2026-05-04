"use client";

import type { CSSProperties } from "react";
import type { Shipment, ShipmentStatus } from "@/lib/shipments";

interface ShipmentHistoryProps {
  shipments: Shipment[];
  onClear: () => void;
  onExportCsv: () => string;
}

function statusBadgeClasses() {
  return "inline-flex rounded-full border px-2.5 py-1 text-xs font-medium";
}

function statusBadgeStyle(status: ShipmentStatus): CSSProperties {
  switch (status) {
    case "Pending":
      return {
        borderColor: "var(--color-border)",
        color: "var(--color-text-secondary)",
        backgroundColor: "var(--color-surface)",
      };
    case "In Transit":
      return {
        borderColor: "var(--color-primary)",
        color: "var(--color-primary)",
        backgroundColor:
          "color-mix(in srgb, var(--color-primary) 8%, var(--color-surface))",
      };
    case "Delivered":
      return {
        borderColor: "var(--color-success)",
        color: "var(--color-success)",
        backgroundColor:
          "color-mix(in srgb, var(--color-success) 10%, var(--color-surface))",
      };
    default:
      return {
        borderColor: "var(--color-border)",
        color: "var(--color-text-secondary)",
        backgroundColor: "var(--color-surface)",
      };
  }
}

export function ShipmentHistory({
  shipments,
  onClear,
  onExportCsv,
}: ShipmentHistoryProps) {
  const hasShipments = shipments.length > 0;

  return (
    <section
      aria-labelledby="shipment-history-heading"
      className="py-8 sm:py-10"
    >
      <div className="px-4 sm:px-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2
              id="shipment-history-heading"
              className="text-lg font-semibold tracking-tight sm:text-xl"
              style={{ color: "var(--color-primary)" }}
            >
              Shipment History
            </h2>
            <p
              className="mt-1 text-sm"
              style={{ color: "var(--color-text-secondary)" }}
            >
              Recent routes you&apos;ve calculated. Stored locally in your
              browser.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => {
                const csv = onExportCsv();
                const blob = new Blob([csv], {
                  type: "text/csv;charset=utf-8;",
                });
                const url = URL.createObjectURL(blob);
                const link = document.createElement("a");
                link.href = url;
                link.download = "shipments.csv";
                link.click();
                URL.revokeObjectURL(url);
              }}
              disabled={!hasShipments}
              className="btn-primary inline-flex items-center justify-center px-3 py-2 text-xs font-medium disabled:cursor-not-allowed disabled:opacity-50"
            >
              Export CSV
            </button>
            <button
              type="button"
              onClick={onClear}
              disabled={!hasShipments}
              className="btn-secondary-outline inline-flex items-center justify-center px-3 py-2 text-xs font-medium disabled:cursor-not-allowed disabled:opacity-50"
            >
              Clear History
            </button>
          </div>
        </div>

        <div className="mt-6 overflow-hidden rounded-lg shadow-card surface-card">
          {!hasShipments ? (
            <div
              className="flex h-32 items-center justify-center px-6 text-sm"
              style={{ color: "var(--color-text-secondary)" }}
            >
              No shipments yet. Calculate a route to start building history.
            </div>
          ) : (
            <div className="max-h-[420px] overflow-auto">
              <table
                className="min-w-full divide-y text-left text-sm"
                style={{ borderColor: "var(--color-border)" }}
              >
                <thead
                  className="text-xs uppercase tracking-wide"
                  style={{
                    backgroundColor: "var(--color-bg)",
                    color: "var(--color-text-secondary)",
                  }}
                >
                  <tr>
                    <th className="px-4 py-3 font-medium">Shipment</th>
                    <th className="px-4 py-3 font-medium">Route</th>
                    <th className="hidden px-4 py-3 font-medium lg:table-cell">
                      Weight
                    </th>
                    <th className="px-4 py-3 font-medium">Distance</th>
                    <th className="hidden px-4 py-3 font-medium sm:table-cell">
                      ETA
                    </th>
                    <th className="px-4 py-3 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody
                  className="divide-y"
                  style={{
                    borderColor: "var(--color-border)",
                    color: "var(--color-text-primary)",
                  }}
                >
                  {shipments.map((s) => (
                    <tr
                      key={s.id}
                      className="transition hover:bg-[color:var(--color-bg)]"
                    >
                      <td className="px-4 py-3 align-top">
                        <div className="flex flex-col gap-0.5">
                          <span
                            className="font-mono text-xs"
                            style={{ color: "var(--color-text-secondary)" }}
                          >
                            {s.id.slice(0, 8)}
                          </span>
                          <span
                            className="text-xs"
                            style={{ color: "var(--color-text-secondary)" }}
                          >
                            {new Date(s.createdAt).toLocaleString()}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3 align-top">
                        <div className="flex flex-col gap-1">
                          <span
                            className="text-xs"
                            style={{ color: "var(--color-text-secondary)" }}
                          >
                            From
                            <span
                              className="ml-1 font-medium"
                              style={{ color: "var(--color-text-primary)" }}
                            >
                              {s.origin.city}
                            </span>
                          </span>
                          <span
                            className="text-xs"
                            style={{ color: "var(--color-text-secondary)" }}
                          >
                            To
                            <span
                              className="ml-1 font-medium"
                              style={{ color: "var(--color-text-primary)" }}
                            >
                              {s.destination.city}
                            </span>
                          </span>
                        </div>
                      </td>
                      <td
                        className="hidden px-4 py-3 align-top text-xs lg:table-cell"
                        style={{ color: "var(--color-text-secondary)" }}
                      >
                        {s.weightKg.toFixed(1)} kg
                      </td>
                      <td
                        className="px-4 py-3 align-top text-xs"
                        style={{ color: "var(--color-text-secondary)" }}
                      >
                        {s.distanceKm.toFixed(0)} km
                      </td>
                      <td
                        className="hidden px-4 py-3 align-top text-xs sm:table-cell"
                        style={{ color: "var(--color-text-secondary)" }}
                      >
                        ~{s.estimatedDays.toFixed(1)} days
                      </td>
                      <td className="px-4 py-3 align-top">
                        <span
                          className={statusBadgeClasses()}
                          style={statusBadgeStyle(s.status)}
                        >
                          {s.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
