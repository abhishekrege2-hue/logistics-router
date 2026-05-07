import { NextResponse } from "next/server";
import { getSupabaseAdminClient } from "@/lib/supabase/server";

export const runtime = "nodejs";

type InterventionFinding = {
  shipmentId: string;
  reference: string;
  severity: "low" | "medium" | "high";
  issue: string;
  recommendation: string;
};

/**
 * Scaffold endpoint:
 * - In production, this would run anomaly detection on projections + external signals
 * - Then append intervention events (e.g., RerouteSuggested) and/or emit webhooks.
 */
export async function POST() {
  const supabase = getSupabaseAdminClient();
  if (!supabase) {
    const findings: InterventionFinding[] = [
      {
        shipmentId: "00000000-0000-0000-0000-000000000001",
        reference: "MS-2026-001",
        severity: "high",
        issue: "Port dwell time exceeds threshold; demurrage risk trending upward.",
        recommendation: "Propose alternate discharge port and switch to sea-air via DXB for final segment.",
      },
    ];
    return NextResponse.json({ ok: true, mode: "mock", findings }, { status: 200 });
  }

  type ProjectionRow = {
    shipment_id: string;
    reference: string;
    demurrage_risk: boolean;
    status: string;
    origin: string | null;
    destination: string | null;
    last_event_at: string;
  };

  const { data, error } = await supabase
    .from("shipment_projection")
    .select("shipment_id, reference, demurrage_risk, status, origin, destination, last_event_at")
    .order("last_event_at", { ascending: false })
    .limit(200);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const rows = (data ?? []) as ProjectionRow[];
  const findings: InterventionFinding[] = rows
    .filter((s) => s.demurrage_risk)
    .slice(0, 10)
    .map((s) => ({
      shipmentId: s.shipment_id,
      reference: s.reference,
      severity: "medium",
      issue: `Demurrage risk raised for route ${s.origin ?? "—"} → ${s.destination ?? "—"}.`,
      recommendation: "Trigger carrier escalation and evaluate alternative capacity with earliest cut-off.",
    }));

  // TODO: append intervention events into public.events (service role), emit webhook, etc.
  return NextResponse.json({ ok: true, mode: "scaffold", findings }, { status: 200 });
}

