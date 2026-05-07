export type ShipmentEventType =
  | "ShipmentCreated"
  | "CustomsCleared"
  | "VesselDeparted"
  | "VesselArrived"
  | "FinalMileOutForDelivery"
  | "Delivered"
  | "DemurrageRiskRaised"
  | "InsuranceBound"
  | "BillingTriggered";

export type TransportMode = "Air" | "Ocean" | "Road" | "Rail";

export type Incoterm = "EXW" | "FOB" | "CIF" | "DDP";

export type ShipmentEventPayload = {
  reference: string;
  origin?: string;
  destination?: string;
  status?: string;
  mode?: TransportMode;
  incoterm?: Incoterm;
  etaDate?: string; // ISO date
  demurrageRisk?: boolean;
  details?: Record<string, unknown>;
};

export type ShipmentEvent = {
  id: string;
  aggregate_id: string;
  aggregate_type: "shipment";
  event_type: ShipmentEventType;
  payload: ShipmentEventPayload;
  occurred_at: string;
};

export type ShipmentProjection = {
  shipment_id: string;
  reference: string;
  origin: string | null;
  destination: string | null;
  status: string;
  mode: TransportMode | null;
  incoterm: Incoterm | null;
  eta_date: string | null;
  demurrage_risk: boolean;
  last_event_at: string;
  created_at: string;
  updated_at: string;
};

export type DashboardQueryResult = {
  kpis: {
    totalActiveShipments: number;
    daysOfInventoryOutstanding: number;
    demurrageAlerts: number;
    onTimeDeliveryRate: number;
  };
  dwellTimeSeries: Array<{ day: string; dwellHours: number }>;
  predictiveDelaySeries: Array<{ day: string; predictedDelays: number }>;
  demurrage: Array<ShipmentProjection>;
  shipments: Array<ShipmentProjection>;
};

