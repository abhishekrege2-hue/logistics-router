export type FuelType = "Diesel" | "JetA" | "MarineFuel" | "Electric";
export type TransportMode = "Air" | "Ocean" | "Road" | "Rail";

export type EmissionsInput = {
  mode: TransportMode;
  distanceKm: number;
  weightKg: number;
  fuelType: FuelType;
};

export type EmissionsResult = {
  co2eKg: number;
  methodology: "GLEC/ISO14083";
  factors: {
    intensityKgCo2ePerTonneKm: number;
    tonneKm: number;
  };
};

// Simplified, auditable factors for scaffolding.
// Replace with provider-grade factors (carrier fuel, lane, load factor, well-to-wheel).
const INTENSITY: Record<TransportMode, Record<FuelType, number>> = {
  Air: { JetA: 0.85, Diesel: 0.9, MarineFuel: 0.9, Electric: 0.35 },
  Ocean: { MarineFuel: 0.015, Diesel: 0.02, JetA: 0.02, Electric: 0.01 },
  Road: { Diesel: 0.09, Electric: 0.03, JetA: 0.09, MarineFuel: 0.09 },
  Rail: { Diesel: 0.02, Electric: 0.006, JetA: 0.02, MarineFuel: 0.02 },
};

export function calculateGlecIso14083Emissions(input: EmissionsInput): EmissionsResult {
  if (input.distanceKm <= 0) throw new Error("distanceKm must be > 0");
  if (input.weightKg <= 0) throw new Error("weightKg must be > 0");

  const intensity = INTENSITY[input.mode]?.[input.fuelType];
  if (typeof intensity !== "number") throw new Error("Unsupported mode/fuelType combination");

  const tonneKm = (input.weightKg / 1000) * input.distanceKm;
  const co2eKg = intensity * tonneKm;
  return {
    co2eKg: Math.round(co2eKg * 100) / 100,
    methodology: "GLEC/ISO14083",
    factors: { intensityKgCo2ePerTonneKm: intensity, tonneKm: Math.round(tonneKm * 100) / 100 },
  };
}

