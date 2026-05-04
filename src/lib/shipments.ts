import type { LatLng } from "@/lib/geocoding";

export type ShipmentStatus = "Pending" | "In Transit" | "Delivered";

export interface ShipmentLocation extends LatLng {
  city: string;
}

export interface Shipment {
  id: string;
  createdAt: string; // ISO date string
  origin: ShipmentLocation;
  destination: ShipmentLocation;
  weightKg: number;
  distanceKm: number;
  estimatedDays: number;
  status: ShipmentStatus;
}
