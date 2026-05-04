"use client";

import { useEffect, useMemo } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import {
  MapContainer,
  TileLayer,
  Marker,
  Polyline,
  useMap,
} from "react-leaflet";
import type { LatLng } from "@/lib/geocoding";

interface LeafletMapInnerProps {
  origin?: LatLng | null;
  destination?: LatLng | null;
}

function FitBounds({ origin, destination }: Required<LeafletMapInnerProps>) {
  const map = useMap();

  useEffect(() => {
    if (!origin || !destination) return;
    const bounds = L.latLngBounds(
      [origin.lat, origin.lng],
      [destination.lat, destination.lng],
    );
    // Smooth animated camera that also ensures both cities are visible.
    map.flyToBounds(bounds.pad(0.35), { animate: true, duration: 1.0 });
  }, [map, origin, destination]);

  return null;
}

export default function LeafletMapInner({
  origin,
  destination,
}: LeafletMapInnerProps) {
  const warehouseIcon = useMemo(
    () =>
      L.divIcon({
        className: "",
        html: `
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
            <defs>
              <linearGradient id="warehouseBody" x1="0" x2="1" y1="0" y2="1">
                <stop offset="0" stop-color="#1A2B4A"/>
                <stop offset="1" stop-color="#1A2B4A"/>
              </linearGradient>
            </defs>
            <g fill="none" fill-rule="evenodd">
              <path d="M4 14L16 5l12 9v11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V14z" fill="url(#warehouseBody)" stroke="#000000" stroke-width="1.2" />
              <path d="M9 18h14v7H9z" fill="#000000" opacity="0.7"/>
              <path d="M12 18h2v7h-2zm6 0h2v7h-2z" fill="#E2E4E7"/>
            </g>
          </svg>
        `,
        iconSize: [32, 32],
        iconAnchor: [16, 28],
      }),
    [],
  );

  const deliveryIcon = useMemo(
    () =>
      L.divIcon({
        className: "",
        html: `
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
            <defs>
              <linearGradient id="deliveryFlag" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0" stop-color="#E87722"/>
                <stop offset="1" stop-color="#C45E10"/>
              </linearGradient>
            </defs>
            <g fill="none" fill-rule="evenodd">
              <path d="M11 4v18" stroke="#1A2B4A" stroke-width="1.4" stroke-linecap="round"/>
              <path d="M12 5h10l-2.5 4L22 13H12z" fill="url(#deliveryFlag)" stroke="#1A2B4A" stroke-width="1.1" />
              <circle cx="11" cy="23.5" r="2.2" fill="#000000" />
            </g>
          </svg>
        `,
        iconSize: [32, 32],
        iconAnchor: [11, 24],
      }),
    [],
  );

  const hasRoute = Boolean(origin && destination);

  const center = useMemo(() => {
    if (origin) return { lat: origin.lat, lng: origin.lng };
    return { lat: 20.5937, lng: 78.9629 }; // India-ish default
  }, [origin]);

  const line = useMemo(() => {
    if (!origin || !destination) return [];
    // Great-circle approximation using spherical interpolation.
    const toRad = (deg: number) => (deg * Math.PI) / 180;
    const toDeg = (rad: number) => (rad * 180) / Math.PI;

    const lat1 = toRad(origin.lat);
    const lon1 = toRad(origin.lng);
    const lat2 = toRad(destination.lat);
    const lon2 = toRad(destination.lng);

    const d =
      2 *
      Math.asin(
        Math.sqrt(
          Math.sin((lat2 - lat1) / 2) ** 2 +
            Math.cos(lat1) * Math.cos(lat2) * Math.sin((lon2 - lon1) / 2) ** 2,
        ),
      );

    if (!Number.isFinite(d) || d === 0) {
      return [
        [origin.lat, origin.lng] as [number, number],
        [destination.lat, destination.lng] as [number, number],
      ];
    }

    const numSegments = 64;
    const points: [number, number][] = [];

    for (let i = 0; i <= numSegments; i++) {
      const f = i / numSegments;
      const A = Math.sin((1 - f) * d) / Math.sin(d);
      const B = Math.sin(f * d) / Math.sin(d);

      const x =
        A * Math.cos(lat1) * Math.cos(lon1) +
        B * Math.cos(lat2) * Math.cos(lon2);
      const y =
        A * Math.cos(lat1) * Math.sin(lon1) +
        B * Math.cos(lat2) * Math.sin(lon2);
      const z = A * Math.sin(lat1) + B * Math.sin(lat2);

      const lat = Math.atan2(z, Math.sqrt(x * x + y * y));
      const lon = Math.atan2(y, x);

      points.push([toDeg(lat), toDeg(lon)]);
    }

    return points;
  }, [origin, destination]);

  return (
    <MapContainer
      center={[center.lat, center.lng]}
      zoom={5}
      scrollWheelZoom={false}
      className="h-full w-full"
      zoomControl={false}
      attributionControl={false}
    >
      <TileLayer
        // Free tiles; for production consider a provider + proper key/rate-limits.
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {origin && (
        <Marker position={[origin.lat, origin.lng]} icon={warehouseIcon} />
      )}
      {destination && (
        <Marker
          position={[destination.lat, destination.lng]}
          icon={deliveryIcon}
        />
      )}

      {hasRoute && (
        <>
          <Polyline
            positions={line}
            pathOptions={{
              color: "#1A2B4A",
              weight: 4,
              opacity: 0.9,
              className: "route-path",
            }}
          />
          <FitBounds origin={origin!} destination={destination!} />
        </>
      )}
    </MapContainer>
  );
}
