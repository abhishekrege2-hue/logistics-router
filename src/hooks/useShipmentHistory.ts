"use client";

import { useEffect, useState } from "react";
import type { Shipment } from "@/lib/shipments";

const STORAGE_KEY = "logistics-router:shipments";

export function useShipmentHistory() {
  const [shipments, setShipments] = useState<Shipment[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);

  // Hydrate only on the client to avoid Next.js hydration mismatches.
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as Shipment[];
        if (Array.isArray(parsed)) {
          setShipments(parsed);
        }
      }
    } catch {
      // Ignore malformed data
    } finally {
      setIsHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!isHydrated || typeof window === "undefined") return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(shipments));
    } catch {
      // Ignore write errors (e.g. quota)
    }
  }, [shipments, isHydrated]);

  function addShipment(shipment: Shipment) {
    setShipments((prev) => [shipment, ...prev]);
  }

  function clearShipments() {
    setShipments([]);
  }

  function exportCsv(): string {
    const header = [
      "ID",
      "Date",
      "Origin City",
      "Origin Lat",
      "Origin Lng",
      "Destination City",
      "Destination Lat",
      "Destination Lng",
      "Weight (kg)",
      "Distance (km)",
      "Estimated Days",
      "Status",
    ];

    const rows = shipments.map((s) => [
      s.id,
      s.createdAt,
      s.origin.city,
      s.origin.lat.toString(),
      s.origin.lng.toString(),
      s.destination.city,
      s.destination.lat.toString(),
      s.destination.lng.toString(),
      s.weightKg.toString(),
      s.distanceKm.toString(),
      s.estimatedDays.toString(),
      s.status,
    ]);

    return [header, ...rows]
      .map((cols) =>
        cols
          .map((value) => {
            const v = value.replace(/"/g, '""');
            return `"${v}"`;
          })
          .join(","),
      )
      .join("\n");
  }

  return {
    shipments,
    isHydrated,
    addShipment,
    clearShipments,
    exportCsv,
  };
}
