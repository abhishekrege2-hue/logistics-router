export interface LatLng {
  lat: number;
  lng: number;
}

export interface GeocodeResult extends LatLng {
  displayName: string;
}

export interface CitySuggestion extends GeocodeResult {
  rawLabel: string;
}

const PRIMARY_MAP_API_KEY = process.env.NEXT_PUBLIC_MAP_API_KEY;

export function isMapApiKeyConfigured(): boolean {
  return Boolean(PRIMARY_MAP_API_KEY && PRIMARY_MAP_API_KEY.trim().length > 0);
}

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

export function haversineKm(a: LatLng, b: LatLng): number {
  const R = 6371;
  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const lat1 = toRad(a.lat);
  const lat2 = toRad(b.lat);
  const sin1 = Math.sin(dLat / 2);
  const sin2 = Math.sin(dLng / 2);
  const h = sin1 * sin1 + Math.cos(lat1) * Math.cos(lat2) * sin2 * sin2;
  const c = 2 * Math.atan2(Math.sqrt(h), Math.sqrt(1 - h));
  return R * c;
}

export function estimateHours(distanceKm: number, weightKg: number): number {
  const base = distanceKm / 55;
  const handling = clamp(weightKg / 250, 0, 2);
  return Math.max(1, base + handling);
}

interface GeoapifyFeature {
  properties?: { formatted?: string };
  geometry?: { coordinates?: [number, number] };
}

async function primarySearch(
  query: string,
  opts?: { signal?: AbortSignal; limit?: number },
): Promise<CitySuggestion[]> {
  if (!isMapApiKeyConfigured()) return [];

  const url = new URL("https://api.geoapify.com/v1/geocode/search");
  url.searchParams.set("text", query);
  url.searchParams.set("format", "json");
  url.searchParams.set("limit", String(opts?.limit ?? 6));
  url.searchParams.set("apiKey", PRIMARY_MAP_API_KEY as string);

  const res = await fetch(url.toString(), {
    method: "GET",
    headers: { Accept: "application/json" },
    signal: opts?.signal,
  });

  if (!res.ok) {
    throw new Error(`Primary geocoding failed (${res.status})`);
  }

  const data = (await res.json()) as { features?: GeoapifyFeature[] };
  const features = data.features ?? [];

  return features
    .map((item) => {
      const coordinates = item.geometry?.coordinates;
      if (!coordinates || coordinates.length < 2) return null;
      const [lng, lat] = coordinates;
      if (!Number.isFinite(lat) || !Number.isFinite(lng)) return null;
      const label =
        item.properties?.formatted ?? `${lat.toFixed(4)}, ${lng.toFixed(4)}`;
      return {
        lat,
        lng,
        displayName: label,
        rawLabel: label,
      } as CitySuggestion;
    })
    .filter((x): x is CitySuggestion => Boolean(x));
}

async function fallbackSearch(
  query: string,
  opts?: { signal?: AbortSignal; limit?: number },
): Promise<CitySuggestion[]> {
  const url = new URL("https://nominatim.openstreetmap.org/search");
  url.searchParams.set("format", "jsonv2");
  url.searchParams.set("limit", String(opts?.limit ?? 5));
  url.searchParams.set("q", query);

  const res = await fetch(url.toString(), {
    method: "GET",
    headers: { Accept: "application/json" },
    signal: opts?.signal,
  });

  if (!res.ok) {
    throw new Error(`Fallback geocoding failed (${res.status})`);
  }

  const data = (await res.json()) as Array<{
    lat: string;
    lon: string;
    display_name: string;
  }>;

  return data
    .map((item) => {
      const lat = Number(item.lat);
      const lng = Number(item.lon);
      if (!Number.isFinite(lat) || !Number.isFinite(lng)) return null;
      return {
        lat,
        lng,
        displayName: item.display_name,
        rawLabel: item.display_name,
      } as CitySuggestion;
    })
    .filter((x): x is CitySuggestion => Boolean(x));
}

export async function geocodeCity(
  query: string,
  opts?: { signal?: AbortSignal },
): Promise<GeocodeResult | null> {
  const q = query.trim();
  if (!q) return null;

  try {
    const primary = await primarySearch(q, { signal: opts?.signal, limit: 1 });
    if (primary[0]) {
      const match = primary[0];
      return { lat: match.lat, lng: match.lng, displayName: match.displayName };
    }
  } catch {
    // fallback below
  }

  const fallback = await fallbackSearch(q, { signal: opts?.signal, limit: 1 });
  const first = fallback[0];
  if (!first) return null;
  return { lat: first.lat, lng: first.lng, displayName: first.displayName };
}

export async function searchCities(
  query: string,
  opts?: { signal?: AbortSignal; limit?: number },
): Promise<CitySuggestion[]> {
  const q = query.trim();
  if (!q || q.length < 3) return [];

  try {
    const primary = await primarySearch(q, opts);
    if (primary.length > 0) return primary;
  } catch {
    // fallback below
  }

  return fallbackSearch(q, opts);
}
