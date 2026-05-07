import { NextResponse } from "next/server";
import type { ProductPassport } from "@/lib/types/dpp";
import { getSupabaseAdminClient } from "@/lib/supabase/server";

export const runtime = "nodejs";

function mockDpp(): { passports: ProductPassport[] } {
  const now = new Date().toISOString();
  return {
    passports: [
      {
        id: "00000000-0000-0000-0000-00000000dpp1",
        product_sku: "MSC-INV-ALU-001",
        product_name: "Industrial Inverter Assembly",
        manufacturer: "Meridian Contract Manufacturing",
        manufacturing_country: "IN",
        dpp_version: "1.0",
        materials: [
          { name: "Aluminum", percent: 48, recycledPercent: 22 },
          { name: "Copper", percent: 17, recycledPercent: 12 },
          { name: "PCB/Electronics", percent: 35, recycledPercent: 5 },
        ],
        sustainability: {
          scope3Co2eKg: 42.7,
          recycledContentPercent: 14.3,
          repairabilityScore: 6.8,
          complianceNotes: ["ESPR DPP scaffold dataset (mock)"],
        },
        created_at: now,
        updated_at: now,
      },
    ],
  };
}

export async function GET() {
  const supabase = getSupabaseAdminClient();
  if (!supabase) return NextResponse.json(mockDpp(), { status: 200 });

  const { data, error } = await supabase
    .from("product_passports")
    .select("*")
    .order("updated_at", { ascending: false })
    .limit(200);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const passports = (data ?? []) as ProductPassport[];
  return NextResponse.json({ passports }, { status: 200 });
}

