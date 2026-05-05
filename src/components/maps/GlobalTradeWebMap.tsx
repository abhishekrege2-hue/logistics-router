"use client";

import { geoMercator, geoPath, type GeoProjection } from "d3-geo";
import type { Feature, Geometry } from "geojson";
import { feature } from "topojson-client";
import { useEffect, useMemo, useState } from "react";

interface Props {
  heightClassName?: string;
}

interface HubNode {
  city: string;
  code: string;
  lon: number;
  lat: number;
  timezone: string;
  signature?: boolean;
}
interface TradeLane {
  from: string;
  to: string;
  signature?: boolean;
  transit: string;
  capacity: string;
  carbon: string;
}

interface LabelStyle {
  dx?: number;
  dy?: number;
  textAnchor?: "start" | "middle" | "end";
}

const HUBS: HubNode[] = [
  { city: "Pune", code: "PNQ", lon: 73.8567, lat: 18.5204, timezone: "Asia/Kolkata", signature: true },
  { city: "Mumbai", code: "BOM/JNPT", lon: 72.8777, lat: 19.076, timezone: "Asia/Kolkata", signature: true },
  { city: "Rotterdam", code: "RTM", lon: 4.4777, lat: 51.9244, timezone: "Europe/Amsterdam", signature: true },
  { city: "Aarhus", code: "AAR", lon: 10.2039, lat: 56.1629, timezone: "Europe/Copenhagen", signature: true },
  { city: "Copenhagen", code: "CPH", lon: 12.5683, lat: 55.6761, timezone: "Europe/Copenhagen", signature: true },
  { city: "Singapore", code: "SIN", lon: 103.8198, lat: 1.3521, timezone: "Asia/Singapore" },
  { city: "Dubai", code: "DXB", lon: 55.2708, lat: 25.2048, timezone: "Asia/Dubai" },
  { city: "Cairo", code: "CAI", lon: 31.2357, lat: 30.0444, timezone: "Africa/Cairo" },
  { city: "Moscow", code: "MOW", lon: 37.6173, lat: 55.7558, timezone: "Europe/Moscow" },
  { city: "Almaty", code: "ALA", lon: 76.886, lat: 43.2389, timezone: "Asia/Almaty" },
  { city: "New York", code: "JFK", lon: -74.006, lat: 40.7128, timezone: "America/New_York" },
  { city: "Los Angeles", code: "LAX", lon: -118.2437, lat: 34.0522, timezone: "America/Los_Angeles" },
  { city: "Vancouver", code: "YVR", lon: -123.1207, lat: 49.2827, timezone: "America/Vancouver" },
  { city: "Toronto", code: "YYZ", lon: -79.3832, lat: 43.6532, timezone: "America/Toronto" },
  { city: "Bogota", code: "BOG", lon: -74.0721, lat: 4.711, timezone: "America/Bogota" },
  { city: "Buenos Aires", code: "EZE", lon: -58.3816, lat: -34.6037, timezone: "America/Argentina/Buenos_Aires" },
  { city: "Shanghai", code: "PVG", lon: 121.4737, lat: 31.2304, timezone: "Asia/Shanghai" },
  { city: "Beijing", code: "PEK", lon: 116.4074, lat: 39.9042, timezone: "Asia/Shanghai" },
  { city: "Shenzhen", code: "SZX", lon: 114.0579, lat: 22.5431, timezone: "Asia/Shanghai" },
  { city: "Seoul", code: "ICN", lon: 126.978, lat: 37.5665, timezone: "Asia/Seoul" },
  { city: "Hamburg", code: "HAM", lon: 9.9937, lat: 53.5511, timezone: "Europe/Berlin" },
  { city: "Santos", code: "SSZ", lon: -46.3289, lat: -23.9608, timezone: "America/Sao_Paulo" },
  { city: "Sydney", code: "SYD", lon: 151.2093, lat: -33.8688, timezone: "Australia/Sydney" },
  { city: "Auckland", code: "AKL", lon: 174.7633, lat: -36.8485, timezone: "Pacific/Auckland" },
  { city: "Johannesburg", code: "JNB", lon: 28.0473, lat: -26.2041, timezone: "Africa/Johannesburg" },
  { city: "Cape Town", code: "CPT", lon: 18.4241, lat: -33.9249, timezone: "Africa/Johannesburg" },
  { city: "Lagos", code: "LOS", lon: 3.3792, lat: 6.5244, timezone: "Africa/Lagos" },
  { city: "Antwerp", code: "ANR", lon: 4.4025, lat: 51.2194, timezone: "Europe/Brussels" },
  { city: "Ho Chi Minh City", code: "SGN", lon: 106.6297, lat: 10.8231, timezone: "Asia/Ho_Chi_Minh" },
  { city: "Chennai", code: "MAA", lon: 80.2707, lat: 13.0827, timezone: "Asia/Kolkata" },
];

const LANES: TradeLane[] = [
  { from: "Mumbai", to: "Rotterdam", signature: true, transit: "21 Days (Eco-Ocean)", capacity: "94% Utilized", carbon: "Optimized - Green Lane" },
  { from: "Mumbai", to: "Aarhus", signature: true, transit: "22 Days (Eco-Ocean)", capacity: "91% Utilized", carbon: "Optimized - Green Lane" },
  { from: "Pune", to: "Rotterdam", signature: true, transit: "4 Days (Air Priority)", capacity: "87% Utilized", carbon: "Balanced - Carbon Smart" },
  { from: "Pune", to: "Copenhagen", signature: true, transit: "5 Days (Air Priority)", capacity: "89% Utilized", carbon: "Balanced - Carbon Smart" },
  { from: "Singapore", to: "Rotterdam", transit: "24 Days (Ocean)", capacity: "92% Utilized", carbon: "Optimized" },
  { from: "Dubai", to: "Hamburg", transit: "14 Days (Sea-Air)", capacity: "88% Utilized", carbon: "Moderate" },
  { from: "Shanghai", to: "Los Angeles", transit: "16 Days (Ocean)", capacity: "95% Utilized", carbon: "Optimized" },
  { from: "New York", to: "Rotterdam", transit: "9 Days (Ocean)", capacity: "83% Utilized", carbon: "Optimized" },
  { from: "Santos", to: "Antwerp", transit: "18 Days (Ocean)", capacity: "86% Utilized", carbon: "Moderate" },
  { from: "Sydney", to: "Singapore", transit: "11 Days (Ocean)", capacity: "81% Utilized", carbon: "Optimized" },
  { from: "Johannesburg", to: "Dubai", transit: "7 Days (Air Cargo)", capacity: "78% Utilized", carbon: "Balanced" },
  { from: "Ho Chi Minh City", to: "Hamburg", transit: "20 Days (Ocean)", capacity: "90% Utilized", carbon: "Optimized" },
  { from: "Vancouver", to: "Tokyo", transit: "10 Days (Ocean)", capacity: "89% Utilized", carbon: "Optimized" },
  { from: "Shenzhen", to: "Los Angeles", transit: "15 Days (Ocean)", capacity: "95% Utilized", carbon: "Optimized" },
  { from: "Toronto", to: "Rotterdam", transit: "9 Days (Ocean)", capacity: "86% Utilized", carbon: "Optimized" },
  { from: "Lagos", to: "Santos", transit: "13 Days (Ocean)", capacity: "82% Utilized", carbon: "Moderate" },
  { from: "Rotterdam", to: "Moscow", transit: "3 Days (Rail)", capacity: "79% Utilized", carbon: "Balanced" },
  { from: "Moscow", to: "Almaty", transit: "4 Days (Rail)", capacity: "77% Utilized", carbon: "Balanced" },
  { from: "Almaty", to: "Beijing", transit: "3 Days (Rail/Air)", capacity: "84% Utilized", carbon: "Optimized" },
  { from: "Dubai", to: "Cairo", transit: "2 Days (Air)", capacity: "83% Utilized", carbon: "Balanced" },
  { from: "Cairo", to: "Rotterdam", transit: "8 Days (Sea-Air)", capacity: "88% Utilized", carbon: "Optimized" },
  { from: "Dubai", to: "Lagos", transit: "5 Days (Air)", capacity: "76% Utilized", carbon: "Balanced" },
  { from: "Sydney", to: "Auckland", transit: "3 Days (Ocean)", capacity: "80% Utilized", carbon: "Optimized" },
  { from: "Auckland", to: "Los Angeles", transit: "12 Days (Ocean)", capacity: "78% Utilized", carbon: "Optimized" },
  { from: "Tokyo", to: "Seoul", transit: "2 Days (Air)", capacity: "91% Utilized", carbon: "Balanced" },
  { from: "Seoul", to: "Shanghai", transit: "2 Days (Air)", capacity: "92% Utilized", carbon: "Balanced" },
  { from: "Shanghai", to: "Shenzhen", transit: "1 Day (Rail)", capacity: "94% Utilized", carbon: "Optimized" },
  { from: "Buenos Aires", to: "Santos", transit: "4 Days (Ocean)", capacity: "81% Utilized", carbon: "Moderate" },
  { from: "Bogota", to: "New York", transit: "2 Days (Air)", capacity: "85% Utilized", carbon: "Balanced" },
  { from: "Cape Town", to: "Johannesburg", transit: "1 Day (Road/Air)", capacity: "79% Utilized", carbon: "Balanced" },
];

const LABEL_OFFSETS: Record<string, LabelStyle> = {
  Rotterdam: { dx: -10, textAnchor: "end" },
  Aarhus: { dy: -15, textAnchor: "middle" },
  Copenhagen: { dx: 10, textAnchor: "start" },
  Mumbai: { dx: -10, textAnchor: "end" },
  Pune: { dx: 10, textAnchor: "start" },
  Seoul: { dy: -10, textAnchor: "middle" },
  Beijing: { dx: -15, textAnchor: "end" },
  Shanghai: { dx: 10, textAnchor: "start" },
  Shenzhen: { dy: 10, textAnchor: "middle" },
  Tokyo: { dx: 10, textAnchor: "start" },
  Toronto: { dy: -10, textAnchor: "middle" },
  "New York": { dx: 10, dy: 10, textAnchor: "start" },
  Cairo: { dx: -10, textAnchor: "end" },
  Dubai: { dx: 10, textAnchor: "start" },
};

function arcPath(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  signature: boolean,
) {
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2;
  const dx = x2 - x1;
  const dy = y2 - y1;
  const curve = (signature ? 0.22 : 0.16) * Math.hypot(dx, dy);
  const cx = mx - dy * 0.14;
  const cy = my - curve;
  return `M ${x1} ${y1} Q ${cx} ${cy} ${x2} ${y2}`;
}

export function GlobalTradeWebMap({ heightClassName = "h-[28rem]" }: Props) {
  const [hoveredHubName, setHoveredHubName] = useState<string | null>(null);
  const [hoveredLaneKey, setHoveredLaneKey] = useState<string | null>(null);
  const [countries, setCountries] = useState<Feature<Geometry>[]>([]);

  const hubsByName = useMemo(
    () => Object.fromEntries(HUBS.map((h) => [h.city, h])),
    [],
  );
  const laneLookup = useMemo(
    () => Object.fromEntries(LANES.map((lane) => [`${lane.from}->${lane.to}`, lane])),
    [],
  );

  const hoveredHub = hoveredHubName ? hubsByName[hoveredHubName] : null;
  const hoveredLane = hoveredLaneKey ? laneLookup[hoveredLaneKey] : null;
  const hubTime = hoveredHub
    ? new Intl.DateTimeFormat("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
        timeZone: hoveredHub.timezone,
      }).format(new Date())
    : null;

  const projection: GeoProjection = useMemo(
    () =>
      geoMercator()
        .center([15, 20])
        .scale(145)
        .translate([500, 265]),
    [],
  );

  useEffect(() => {
    let active = true;
    fetch("https://unpkg.com/world-atlas@2.0.2/countries-110m.json")
      .then((res) => res.json())
      .then((topology) => {
        if (!active) return;
        const topologyObj = topology as { objects: { countries: object } };
        const geo = feature(topologyObj as object, topologyObj.objects.countries);
        const features = (geo as { features?: Feature<Geometry>[] }).features ?? [];
        setCountries(features);
      })
      .catch(() => setCountries([]));
    return () => {
      active = false;
    };
  }, []);

  return (
    <div
      className={`relative overflow-hidden rounded-xl border border-slate-700 bg-[#0a0f1e] p-4 sm:p-6 ${heightClassName}`}
    >
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 1000 520"
        preserveAspectRatio="xMidYMid meet"
        aria-hidden
      >
        <defs>
          <radialGradient id="oceanShade" cx="45%" cy="35%" r="70%">
            <stop offset="0%" stopColor="#10243f" />
            <stop offset="100%" stopColor="#06101f" />
          </radialGradient>
          <linearGradient id="contShade" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#233953" />
            <stop offset="100%" stopColor="#1a2f47" />
          </linearGradient>
          <filter id="saffronGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2.2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <rect width="1000" height="520" fill="url(#oceanShade)" />
        {countries.map((country, idx) => (
          <path
            key={idx}
            d={geoPath(projection)(country) ?? ""}
            fill="#16213e"
            stroke="#2f425f"
            strokeWidth="0.45"
            opacity="0.95"
          />
        ))}

        {LANES.map((lane) => {
          const fromHub = hubsByName[lane.from];
          const toHub = hubsByName[lane.to];
          if (!fromHub || !toHub) return null;
          const from = projection([fromHub.lon, fromHub.lat]);
          const to = projection([toHub.lon, toHub.lat]);
          if (!from || !to) return null;
          const key = `${lane.from}->${lane.to}`;
          const [x1, y1] = from;
          const [x2, y2] = to;
          return (
            <g
              key={key}
              onMouseEnter={() => setHoveredLaneKey(key)}
              onMouseLeave={() => setHoveredLaneKey(null)}
            >
              <path
                d={arcPath(x1, y1, x2, y2, !!lane.signature)}
                className={lane.signature ? "trade-lane-signature" : "trade-lane-pulse"}
                filter="url(#saffronGlow)"
                fill="none"
                stroke="#F4C430"
              />
              <circle r={lane.signature ? 3 : 2.3} fill="#ffd27a" opacity="0.9">
                <animateMotion
                  dur={lane.signature ? "5.2s" : "7.4s"}
                  repeatCount="indefinite"
                  path={arcPath(x1, y1, x2, y2, !!lane.signature)}
                />
              </circle>
            </g>
          );
        })}

        {HUBS.map((hub) => {
          const p = projection([hub.lon, hub.lat]);
          if (!p) return null;
          const [x, y] = p;
          return (
            <g
              key={`${hub.city}-${hub.code}`}
              onMouseEnter={() => setHoveredHubName(hub.city)}
              onMouseLeave={() => setHoveredHubName(null)}
            >
              <circle
                cx={x}
                cy={y}
                r={hub.signature ? 4.6 : 3.2}
                fill={hub.signature ? "#f4c430" : "#93a8c0"}
                stroke={hub.signature ? "#ffd778" : "#3f5872"}
                strokeWidth={hub.signature ? 1.2 : 0.9}
              />
              <text
                x={x + (LABEL_OFFSETS[hub.city]?.dx ?? 8)}
                y={y + (LABEL_OFFSETS[hub.city]?.dy ?? -6)}
                textAnchor={LABEL_OFFSETS[hub.city]?.textAnchor ?? "start"}
                fill={hub.signature ? "#F4C430" : "#d6dbe4"}
                fontSize="10"
                fontWeight={hub.signature ? "700" : "500"}
                style={{ fontFamily: "Inter, Arial, sans-serif" }}
              >
                {hub.city}
              </text>
            </g>
          );
        })}
      </svg>

      <div className="absolute left-5 top-5 z-20 w-[min(42rem,92%)] rounded-md border border-slate-500/70 bg-[#0b1a31]/55 p-3 text-xs text-slate-200 backdrop-blur-md">
        <p className="font-bold text-[color:var(--color-accent)]">
          The Meridian Global Network: Orchestrating Trade at Scale.
        </p>
        <p className="mt-1">
          Signature Corridor: Pune & Mumbai (BOM/JNPT) &rarr; Rotterdam & Aarhus/Copenhagen
        </p>
      </div>

      {hoveredHub && (hoveredHub.city === "Mumbai" || hoveredHub.city === "Pune") && (
        <div className="absolute bottom-14 left-3 z-20 w-64 rounded-md border border-[color:var(--color-accent)] bg-slate-900/92 p-3 text-xs text-slate-200 shadow-card">
          <p className="font-bold text-[color:var(--color-accent)]">
            {hoveredHub.city} ({hoveredHub.code})
          </p>
          <p className="mt-1 text-[color:var(--color-accent)]">Status: Operational - High Flow</p>
          <p>Primary Cargo: Industrial/Tech</p>
          <p>Local Time: {hubTime}</p>
          <p>Network Latency: 28.30 mcs</p>
        </div>
      )}
      {hoveredLane && (
        <div className="absolute bottom-14 right-3 z-20 w-64 rounded-md border border-[color:var(--color-accent)] bg-slate-900/92 p-3 text-xs text-slate-200 shadow-card">
          <p className="font-bold text-[color:var(--color-accent)]">Live Logistics Card</p>
          <p className="mt-1">Transit Time: {hoveredLane.transit}</p>
          <p>Network Capacity: {hoveredLane.capacity}</p>
          <p>Carbon Footprint: {hoveredLane.carbon}</p>
        </div>
      )}

      <div className="absolute bottom-0 left-0 right-0 z-20 overflow-hidden border-t border-slate-700 bg-[#0a1830]/95 py-2">
        <div className="trade-ticker whitespace-nowrap text-xs text-slate-200">
          Vessel MERIDIAN-04 departed Mumbai Port... JNPT terminal congestion easing... New Green-Lane established: Pune &rarr; Rotterdam... Rotterdam berth turnover stable at 94%... Aarhus cold-chain integrity index: 98.7%...
        </div>
      </div>
      <div className="absolute bottom-8 left-3 z-20 rounded border border-slate-600/80 bg-[#0b1a31]/70 px-2 py-1 text-[10px] font-bold tracking-wide text-slate-200 backdrop-blur-sm">
        MERIDIAN SCM
      </div>
      <div className="absolute bottom-8 right-3 z-20 text-[10px] font-semibold text-slate-400">
        Network Design by Abhishek Rege
      </div>
    </div>
  );
}
