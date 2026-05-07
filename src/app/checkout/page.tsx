"use client";

import { useMemo, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/badge";

type ShipmentDraft = {
  origin: string;
  destination: string;
  hsCode: string;
  destinationCountry: string;
  declaredValue: number;
  weightKg: number;
};

type CostBreakdown = {
  currency: string;
  baseFreight: number;
  fuelSurcharge: number;
  duties: number;
  vat: number;
  total: number;
};

type LandedCostApiResponse = {
  currency: string;
  duties: number;
  vat: number;
};

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? "");

function Stepper({ step }: { step: 1 | 2 | 3 }) {
  const steps = [
    { n: 1, label: "Shipment Details" },
    { n: 2, label: "Cost Breakdown" },
    { n: 3, label: "Payment" },
  ] as const;
  return (
    <div className="flex flex-wrap items-center gap-3 text-xs">
      {steps.map((s) => (
        <div key={s.n} className="flex items-center gap-2">
          <span
            className={`grid h-6 w-6 place-items-center rounded-full border ${
              step === s.n ? "border-[color:var(--color-accent)] bg-[color:var(--color-accent)] text-slate-900" : "border-slate-200 bg-white text-slate-700"
            }`}
          >
            {s.n}
          </span>
          <span className={step === s.n ? "font-semibold text-slate-900" : "text-slate-600"}>{s.label}</span>
        </div>
      ))}
    </div>
  );
}

function CheckoutPayment({
  amountLabel,
  onBack,
}: {
  amountLabel: string;
  onBack: () => void;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  return (
    <form
      className="grid gap-4"
      onSubmit={async (e) => {
        e.preventDefault();
        if (!stripe || !elements) return;
        setSubmitting(true);
        setError(null);
        const res = await stripe.confirmPayment({
          elements,
          confirmParams: { return_url: `${window.location.origin}/dashboard/billing` },
        });
        if (res.error) setError(res.error.message ?? "Payment failed");
        setSubmitting(false);
      }}
    >
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-semibold text-slate-900">Pay {amountLabel}</p>
        <Badge variant="info">3DS2 / SCA-ready</Badge>
      </div>
      <div className="rounded-xl border border-slate-200 bg-white p-4">
        <PaymentElement />
      </div>
      {error && <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-800">{error}</div>}
      <div className="flex flex-col gap-2 sm:flex-row sm:justify-between">
        <Button type="button" variant="secondary" onClick={onBack}>
          Back
        </Button>
        <Button type="submit" disabled={!stripe || submitting}>
          {submitting ? "Processing…" : "Pay now"}
        </Button>
      </div>
    </form>
  );
}

export default function CheckoutPage() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [draft, setDraft] = useState<ShipmentDraft>({
    origin: "Mumbai (JNPT)",
    destination: "Rotterdam (RTM)",
    hsCode: "3926.90",
    destinationCountry: "NL",
    declaredValue: 2500,
    weightKg: 180,
  });
  const [costs, setCosts] = useState<CostBreakdown | null>(null);
  const [loadingCosts, setLoadingCosts] = useState(false);
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const canStripe = Boolean(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

  const amountLabel = useMemo(() => {
    if (!costs) return "—";
    return `${costs.currency} ${costs.total.toFixed(2)}`;
  }, [costs]);

  return (
    <div className="min-h-screen bg-[color:var(--color-bg)]">
      <Header />
      <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-[color:var(--color-primary)]">B2B Checkout</h1>
            <p className="mt-1 text-sm font-medium text-[color:var(--color-text-secondary)]">
              Linear checkout with transparent landed cost and embedded payment.
            </p>
          </div>
          <Stepper step={step} />
        </div>

        {error && <div className="mt-6 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-800">{error}</div>}

        <div className="mt-6 grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
          <Card>
            <CardHeader>
              <CardTitle>
                {step === 1 ? "Shipment Details" : step === 2 ? "Cost Breakdown" : "Payment"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {step === 1 && (
                <form
                  className="grid gap-3 sm:grid-cols-2"
                  onSubmit={async (e) => {
                    e.preventDefault();
                    setError(null);
                    setLoadingCosts(true);
                    setCosts(null);
                    try {
                      const res = await fetch("/api/landed-cost", {
                        method: "POST",
                        headers: { "content-type": "application/json" },
                        body: JSON.stringify({
                          hsCode: draft.hsCode,
                          destinationCountry: draft.destinationCountry,
                          declaredValue: draft.declaredValue,
                          currency: "USD",
                        }),
                      });
                      const json = (await res.json()) as Partial<LandedCostApiResponse> & { error?: string };
                      if (!res.ok) throw new Error(json.error ?? "Failed to calculate landed cost");
                      if (typeof json.duties !== "number" || typeof json.vat !== "number") {
                        throw new Error("Invalid landed cost response");
                      }

                      // Simple freight model for demo.
                      const baseFreight = Math.round((220 + draft.weightKg * 1.9) * 100) / 100;
                      const fuelSurcharge = Math.round(baseFreight * 0.18 * 100) / 100;
                      const duties = json.duties;
                      const vat = json.vat;
                      const total = Math.round((baseFreight + fuelSurcharge + duties + vat) * 100) / 100;

                      setCosts({
                        currency: json.currency ?? "USD",
                        baseFreight,
                        fuelSurcharge,
                        duties,
                        vat,
                        total,
                      });
                      setStep(2);
                    } catch (err: unknown) {
                      setError(err instanceof Error ? err.message : "Failed to calculate");
                    } finally {
                      setLoadingCosts(false);
                    }
                  }}
                >
                  <label className="grid gap-1 text-xs text-slate-700">
                    Origin
                    <input className="h-10 rounded-md border border-slate-200 px-3 text-sm" value={draft.origin} onChange={(e) => setDraft((d) => ({ ...d, origin: e.target.value }))} required />
                  </label>
                  <label className="grid gap-1 text-xs text-slate-700">
                    Destination
                    <input className="h-10 rounded-md border border-slate-200 px-3 text-sm" value={draft.destination} onChange={(e) => setDraft((d) => ({ ...d, destination: e.target.value }))} required />
                  </label>
                  <label className="grid gap-1 text-xs text-slate-700">
                    HS Code
                    <input className="h-10 rounded-md border border-slate-200 px-3 text-sm" value={draft.hsCode} onChange={(e) => setDraft((d) => ({ ...d, hsCode: e.target.value }))} required />
                  </label>
                  <label className="grid gap-1 text-xs text-slate-700">
                    Destination Country (ISO-2)
                    <input className="h-10 rounded-md border border-slate-200 px-3 text-sm uppercase" value={draft.destinationCountry} onChange={(e) => setDraft((d) => ({ ...d, destinationCountry: e.target.value.toUpperCase() }))} required />
                  </label>
                  <label className="grid gap-1 text-xs text-slate-700">
                    Declared Value (USD)
                    <input type="number" min={0} step={0.01} className="h-10 rounded-md border border-slate-200 px-3 text-sm" value={draft.declaredValue} onChange={(e) => setDraft((d) => ({ ...d, declaredValue: Number(e.target.value) }))} required />
                  </label>
                  <label className="grid gap-1 text-xs text-slate-700">
                    Weight (kg)
                    <input type="number" min={0} step={1} className="h-10 rounded-md border border-slate-200 px-3 text-sm" value={draft.weightKg} onChange={(e) => setDraft((d) => ({ ...d, weightKg: Number(e.target.value) }))} required />
                  </label>
                  <div className="sm:col-span-2 flex flex-col gap-2 sm:flex-row sm:justify-between">
                    <div className="text-xs text-slate-600">
                      Uses mocked landed-cost + freight model for DDP simulation.
                    </div>
                    <Button type="submit" disabled={loadingCosts}>
                      {loadingCosts ? "Calculating…" : "Continue"}
                    </Button>
                  </div>
                </form>
              )}

              {step === 2 && costs && (
                <div className="grid gap-4">
                  <div className="rounded-xl border border-slate-200 bg-white p-4">
                    <div className="grid gap-2 text-sm">
                      <div className="flex items-center justify-between"><span className="text-slate-600">Base Freight</span><span className="font-semibold">{costs.currency} {costs.baseFreight.toFixed(2)}</span></div>
                      <div className="flex items-center justify-between"><span className="text-slate-600">Fuel Surcharge</span><span className="font-semibold">{costs.currency} {costs.fuelSurcharge.toFixed(2)}</span></div>
                      <div className="flex items-center justify-between"><span className="text-slate-600">Import Duties</span><span className="font-semibold">{costs.currency} {costs.duties.toFixed(2)}</span></div>
                      <div className="flex items-center justify-between"><span className="text-slate-600">Taxes (VAT/GST)</span><span className="font-semibold">{costs.currency} {costs.vat.toFixed(2)}</span></div>
                      <div className="mt-2 flex items-center justify-between border-t pt-3"><span className="font-semibold text-slate-900">Total</span><span className="text-lg font-bold text-slate-900">{costs.currency} {costs.total.toFixed(2)}</span></div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 sm:flex-row sm:justify-between">
                    <Button variant="secondary" onClick={() => setStep(1)}>Back</Button>
                    <Button
                      onClick={async () => {
                        if (!costs) return;
                        setError(null);
                        if (!canStripe) {
                          setError("Missing NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY. Set Stripe env vars to enable payment step.");
                          return;
                        }
                        try {
                          const amount = Math.round(costs.total * 100);
                          const res = await fetch("/api/create-payment-intent", {
                            method: "POST",
                            headers: { "content-type": "application/json" },
                            body: JSON.stringify({
                              amount,
                              currency: costs.currency,
                              shipmentReference: `${draft.origin}→${draft.destination}`,
                              setupFutureUsage: "off_session",
                            }),
                          });
                          const json = (await res.json()) as { clientSecret?: string; error?: string };
                          if (!res.ok || !json.clientSecret) throw new Error(json.error ?? "Failed to create payment intent");
                          setClientSecret(json.clientSecret);
                          setStep(3);
                        } catch (err: unknown) {
                          setError(err instanceof Error ? err.message : "Failed to initialize payment");
                        }
                      }}
                    >
                      Continue to payment
                    </Button>
                  </div>
                </div>
              )}

              {step === 3 && clientSecret && costs && (
                <Elements stripe={stripePromise} options={{ clientSecret, appearance: { theme: "stripe" } }}>
                  <CheckoutPayment amountLabel={amountLabel} onBack={() => setStep(2)} />
                </Elements>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3 text-sm">
                <div>
                  <p className="text-xs text-slate-600">Route</p>
                  <p className="font-semibold text-slate-900">{draft.origin} &rarr; {draft.destination}</p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-xs text-slate-600">HS Code</p>
                    <p className="font-semibold text-slate-900">{draft.hsCode}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-600">DDP Destination</p>
                    <p className="font-semibold text-slate-900">{draft.destinationCountry}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-xs text-slate-600">Declared Value</p>
                    <p className="font-semibold text-slate-900">USD {draft.declaredValue.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-600">Weight</p>
                    <p className="font-semibold text-slate-900">{draft.weightKg} kg</p>
                  </div>
                </div>
                <div className="rounded-lg border border-slate-200 bg-slate-50 p-3 text-xs text-slate-700">
                  Payment uses Stripe Payment Intents with automatic payment methods enabled (3DS2/SCA supported where required).
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}

