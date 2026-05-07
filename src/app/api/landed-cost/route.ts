import { NextResponse } from "next/server";

export const runtime = "nodejs";

type LandedCostRequest = {
  hsCode: string;
  destinationCountry: string; // ISO-2
  declaredValue: number; // in major units (e.g. USD)
  currency?: string;
};

type LandedCostResponse = {
  currency: string;
  declaredValue: number;
  dutyRatePercent: number;
  duties: number;
  vatRatePercent: number;
  vat: number;
  totalImportTaxes: number;
};

function isNonEmptyString(x: unknown): x is string {
  return typeof x === "string" && x.trim().length > 0;
}

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const b = body as Partial<LandedCostRequest>;
  if (!isNonEmptyString(b.hsCode) || !isNonEmptyString(b.destinationCountry) || typeof b.declaredValue !== "number") {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const currency = (b.currency ?? "USD").toUpperCase();
  const declaredValue = Math.max(0, b.declaredValue);

  // Mocked landed-cost logic:
  // - Duty rate based on HS prefix heuristic
  // - VAT based on destination region heuristic
  const hsPrefix = b.hsCode.replace(/\D/g, "").slice(0, 2);
  const dutyRatePercent = hsPrefix === "84" || hsPrefix === "85" ? 0 : 6.5;
  const vatRatePercent = ["DE", "NL", "DK", "FR", "ES", "IT", "SE", "PL"].includes(b.destinationCountry.toUpperCase()) ? 21 : 10;

  const duties = Math.round(declaredValue * (dutyRatePercent / 100) * 100) / 100;
  const vatBase = declaredValue + duties;
  const vat = Math.round(vatBase * (vatRatePercent / 100) * 100) / 100;
  const totalImportTaxes = Math.round((duties + vat) * 100) / 100;

  const res: LandedCostResponse = {
    currency,
    declaredValue,
    dutyRatePercent,
    duties,
    vatRatePercent,
    vat,
    totalImportTaxes,
  };
  return NextResponse.json(res, { status: 200 });
}

