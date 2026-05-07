import { NextResponse } from "next/server";
import type { DashboardQueryResult, ShipmentProjection } from "@/lib/types/logistics-ledger";
import { getSupabaseAdminClient } from "@/lib/supabase/server";

export const runtime = "nodejs";

function mockDashboard(): DashboardQueryResult {
  const now = new Date();
  const fmt = (d: Date) => d.toISOString().slice(0, 10);
  const dwellTimeSeries = Array.from({ length: 14 }, (_, i) => {
    const day = new Date(now);
    day.setDate(now.getDate() - (13 - i));
    return { day: fmt(day), dwellHours: Math.round(12 + (Math.sin(i / 2) + 1) * 10) };
  });
  const predictiveDelaySeries = Array.from({ length: 14 }, (_, i) => {
    const day = new Date(now);
    day.setDate(now.getDate() - (13 - i));
    return { day: fmt(day), predictedDelays: Math.max(0, Math.round((Math.cos(i / 2) + 1) * 6 - 2)) };
  });

  const shipments: ShipmentProjection[] = [
    {
      shipment_id: "00000000-0000-0000-0000-000000000001",
      reference: "MS-2026-001",
      origin: "Mumbai (JNPT)",
      destination: "Rotterdam (RTM)",
      status: "In Transit",
      mode: "Ocean",
      incoterm: "CIF",
      eta_date: fmt(new Date(now.getTime() + 7 * 86400000)),
      demurrage_risk: true,
      last_event_at: now.toISOString(),
      created_at: now.toISOString(),
      updated_at: now.toISOString(),
    },
    {
      shipment_id: "00000000-0000-0000-0000-000000000002",
      reference: "MS-2026-002",
      origin: "Pune (PNQ)",
      destination: "Copenhagen (CPH)",
      status: "Customs Cleared",
      mode: "Air",
      incoterm: "DDP",
      eta_date: fmt(new Date(now.getTime() + 2 * 86400000)),
      demurrage_risk: false,
      last_event_at: now.toISOString(),
      created_at: now.toISOString(),
      updated_at: now.toISOString(),
    },
  ];

  return {
    kpis: {
      totalActiveShipments: 2487,
      daysOfInventoryOutstanding: 38.4,
      demurrageAlerts: shipments.filter((s) => s.demurrage_risk).length,
      onTimeDeliveryRate: 0.982,
    },
    dwellTimeSeries,
    predictiveDelaySeries,
    demurrage: shipments.filter((s) => s.demurrage_risk),
    shipments,
  };
}

export async function GET() {
  const supabase = getSupabaseAdminClient();
  if (!supabase) return NextResponse.json(mockDashboard(), { status: 200 });

  const { data: shipments, error } = await supabase
    .from("shipment_projection")
    .select("*")
    .order("last_event_at", { ascending: false })
    .limit(200);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const typedShipments = shipments as ShipmentProjection[];
  const demurrage = typedShipments.filter((s) => s.demurrage_risk);

  // Lightweight KPI derivation (demo-ready; real implementation should be computed server-side).
  const totalActiveShipments = typedShipments.length;
  const demurrageAlerts = demurrage.length;
  const daysOfInventoryOutstanding = 36.9;
  const onTimeDeliveryRate = 0.982;

  const now = new Date();
  const fmt = (d: Date) => d.toISOString().slice(0, 10);
  const dwellTimeSeries = Array.from({ length: 14 }, (_, i) => {
    const day = new Date(now);
    day.setDate(now.getDate() - (13 - i));
    return { day: fmt(day), dwellHours: Math.round(10 + (Math.sin(i / 2) + 1) * 12) };
  });
  const predictiveDelaySeries = Array.from({ length: 14 }, (_, i) => {
    const day = new Date(now);
    day.setDate(now.getDate() - (13 - i));
    return { day: fmt(day), predictedDelays: Math.max(0, Math.round((Math.cos(i / 2) + 1) * 6 - 2)) };
  });

  const result: DashboardQueryResult = {
    kpis: { totalActiveShipments, daysOfInventoryOutstanding, demurrageAlerts, onTimeDeliveryRate },
    dwellTimeSeries,
    predictiveDelaySeries,
    demurrage,
    shipments: typedShipments,
  };

  return NextResponse.json(result, { status: 200 });
}

