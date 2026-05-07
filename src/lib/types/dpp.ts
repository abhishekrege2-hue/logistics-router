export type DppMaterial = {
  name: string;
  percent: number; // 0..100
  recycledPercent?: number; // 0..100
};

export type DppSustainabilityMetrics = {
  scope3Co2eKg?: number;
  recycledContentPercent?: number;
  repairabilityScore?: number; // 0..10
  complianceNotes?: string[];
};

export type ProductPassport = {
  id: string;
  product_sku: string;
  product_name: string;
  manufacturer: string;
  manufacturing_country: string | null;
  dpp_version: string;
  materials: DppMaterial[];
  sustainability: DppSustainabilityMetrics;
  created_at: string;
  updated_at: string;
};

export type DppLifecycleEvent = {
  id: string;
  passport_id: string;
  event_type: string;
  payload: Record<string, unknown>;
  occurred_at: string;
};

