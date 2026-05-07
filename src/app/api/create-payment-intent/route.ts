import { NextResponse } from "next/server";
import { getStripeServer } from "@/lib/stripe/server";

export const runtime = "nodejs";

type CreatePaymentIntentRequest = {
  amount: number; // integer in smallest currency unit
  currency: string; // e.g. "usd"
  shipmentReference?: string;
  setupFutureUsage?: "on_session" | "off_session" | null;
};

function isNonEmptyString(x: unknown): x is string {
  return typeof x === "string" && x.trim().length > 0;
}

export async function POST(req: Request) {
  const stripe = getStripeServer();

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const b = body as Partial<CreatePaymentIntentRequest>;
  if (typeof b.amount !== "number" || !Number.isInteger(b.amount) || b.amount <= 0) {
    return NextResponse.json({ error: "Invalid amount" }, { status: 400 });
  }
  if (!isNonEmptyString(b.currency)) return NextResponse.json({ error: "Invalid currency" }, { status: 400 });

  const setup_future_usage =
    b.setupFutureUsage === "on_session" || b.setupFutureUsage === "off_session" ? b.setupFutureUsage : undefined;

  const intent = await stripe.paymentIntents.create({
    amount: b.amount,
    currency: b.currency.toLowerCase(),
    automatic_payment_methods: { enabled: true }, // enables 3DS2/SCA paths when required
    setup_future_usage,
    metadata: {
      app: "Meridian SCM",
      shipmentReference: b.shipmentReference ?? "",
    },
  });

  return NextResponse.json({ clientSecret: intent.client_secret }, { status: 200 });
}

