import { createClient } from "@supabase/supabase-js";
import { randomUUID } from "crypto";
import type { Incoterm, TransportMode } from "@/lib/types/logistics-ledger";

type Env = {
  url: string;
  serviceRoleKey: string;
};

function env(): Env {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceRoleKey) {
    throw new Error(
      "Missing env vars. Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY (see .env.example).",
    );
  }
  return { url, serviceRoleKey };
}

type SeedShipment = {
  reference: string;
  origin: string;
  destination: string;
  mode: TransportMode;
  incoterm: Incoterm;
  etaDate: string;
  demurrageRisk?: boolean;
};

function isoDate(daysFromNow: number) {
  const d = new Date();
  d.setDate(d.getDate() + daysFromNow);
  return d.toISOString().slice(0, 10);
}

const SHIPMENTS: SeedShipment[] = [
  {
    reference: "MS-2026-4101",
    origin: "Mumbai (JNPT)",
    destination: "Rotterdam (RTM)",
    mode: "Ocean",
    incoterm: "CIF",
    etaDate: isoDate(9),
    demurrageRisk: true,
  },
  {
    reference: "MS-2026-4102",
    origin: "Pune (PNQ)",
    destination: "Copenhagen (CPH)",
    mode: "Air",
    incoterm: "DDP",
    etaDate: isoDate(3),
  },
  {
    reference: "MS-2026-4103",
    origin: "Shanghai (PVG)",
    destination: "Los Angeles (LAX)",
    mode: "Ocean",
    incoterm: "FOB",
    etaDate: isoDate(14),
  },
  {
    reference: "MS-2026-4104",
    origin: "Dubai (DXB)",
    destination: "Hamburg (HAM)",
    mode: "Air",
    incoterm: "EXW",
    etaDate: isoDate(5),
  },
];

async function main() {
  const { url, serviceRoleKey } = env();
  const supabase = createClient(url, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  // Idempotency: remove previously-seeded demo shipments by reference prefix.
  // We delete from projection first to avoid orphan read model entries during demo resets.
  const { data: toDelete, error: selectErr } = await supabase
    .from("shipment_projection")
    .select("shipment_id, reference")
    .like("reference", "MS-2026-41%")
    .limit(500);
  if (selectErr) throw new Error(selectErr.message);

  const ids = (toDelete ?? []).map((r) => r.shipment_id);
  if (ids.length) {
    const delProj = await supabase.from("shipment_projection").delete().in("shipment_id", ids);
    if (delProj.error) throw new Error(delProj.error.message);

    const delEvents = await supabase.from("events").delete().in("aggregate_id", ids);
    if (delEvents.error) throw new Error(delEvents.error.message);
  }

  const now = new Date().toISOString();
  const rows = SHIPMENTS.flatMap((s) => {
    const shipmentId = randomUUID();
    const created = {
      aggregate_type: "shipment",
      aggregate_id: shipmentId,
      event_type: "ShipmentCreated",
      payload: {
        reference: s.reference,
        origin: s.origin,
        destination: s.destination,
        mode: s.mode,
        incoterm: s.incoterm,
        etaDate: s.etaDate,
        status: "Created",
      },
      metadata: { source: "seed-ledger", seededAt: now },
    } as const;

    const customs = {
      aggregate_type: "shipment",
      aggregate_id: shipmentId,
      event_type: "CustomsCleared",
      payload: { reference: s.reference, status: "Customs Cleared" },
      metadata: { source: "seed-ledger", seededAt: now },
    } as const;

    const departed = {
      aggregate_type: "shipment",
      aggregate_id: shipmentId,
      event_type: "VesselDeparted",
      payload: { reference: s.reference, status: "In Transit" },
      metadata: { source: "seed-ledger", seededAt: now },
    } as const;

    const risk = s.demurrageRisk
      ? ({
          aggregate_type: "shipment",
          aggregate_id: shipmentId,
          event_type: "DemurrageRiskRaised",
          payload: { reference: s.reference, status: "Demurrage Risk", demurrageRisk: true },
          metadata: { source: "seed-ledger", seededAt: now },
        } as const)
      : null;

    return [created, customs, departed, ...(risk ? [risk] : [])];
  });

  const insert = await supabase.from("events").insert(rows);
  if (insert.error) throw new Error(insert.error.message);

  // Projection trigger should populate shipment_projection.
  const { count, error: countErr } = await supabase
    .from("shipment_projection")
    .select("*", { count: "exact", head: true })
    .like("reference", "MS-2026-41%");
  if (countErr) throw new Error(countErr.message);

  console.log(`Seeded ledger events for ${SHIPMENTS.length} shipments. Projection rows: ${count ?? 0}.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

