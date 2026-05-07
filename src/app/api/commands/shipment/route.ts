import { NextResponse } from "next/server";
import { commandToEvents, type ShipmentCommand } from "@/lib/cqrs/shipmentCommands";
import { getSupabaseAdminClient } from "@/lib/supabase/server";

export const runtime = "nodejs";

function isString(x: unknown): x is string {
  return typeof x === "string" && x.trim().length > 0;
}

export async function POST(req: Request) {
  const supabase = getSupabaseAdminClient();
  if (!supabase) {
    return NextResponse.json(
      { error: "Supabase is not configured. Set SUPABASE_SERVICE_ROLE_KEY and NEXT_PUBLIC_SUPABASE_* env vars." },
      { status: 500 },
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const cmd = body as Partial<ShipmentCommand>;
  if (!cmd.type) return NextResponse.json({ error: "Missing command type" }, { status: 400 });

  if (cmd.type === "CreateShipment") {
    const raw = body as Record<string, unknown>;
    const ok =
      isString(raw.reference) &&
      isString(raw.origin) &&
      isString(raw.destination) &&
      isString(raw.mode) &&
      isString(raw.incoterm);
    if (!ok) return NextResponse.json({ error: "Invalid CreateShipment payload" }, { status: 400 });
  }

  const events = commandToEvents(cmd as ShipmentCommand);

  const rows = events.map((e) => ({
    aggregate_type: "shipment",
    aggregate_id: e.aggregateId,
    event_type: e.eventType,
    payload: e.payload,
    metadata: { source: "api.commands.shipment", commandType: cmd.type },
  }));

  const { data, error } = await supabase.from("events").insert(rows).select("aggregate_id, event_type, occurred_at");
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ ok: true, appended: data }, { status: 200 });
}

