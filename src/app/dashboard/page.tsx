"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { isAuthenticated } from "@/lib/auth";
import type { DashboardQueryResult, Incoterm, TransportMode } from "@/lib/types/logistics-ledger";
import { KpiCards } from "@/components/dashboard/KpiCards";
import { DemurrageAlerts } from "@/components/dashboard/DemurrageAlerts";
import { ShipmentTable } from "@/components/dashboard/ShipmentTable";
import { ControlTowerCharts } from "@/components/dashboard/ControlTowerCharts";
import { Button } from "@/components/ui/Button";

export default function DashboardPage() {
  const router = useRouter();
  const authenticated = isAuthenticated();
  const [data, setData] = useState<DashboardQueryResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState<{
    reference: string;
    origin: string;
    destination: string;
    mode: TransportMode;
    incoterm: Incoterm;
    etaDate: string;
  }>({
    reference: `MS-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
    origin: "Mumbai (JNPT)",
    destination: "Rotterdam (RTM)",
    mode: "Ocean",
    incoterm: "CIF",
    etaDate: new Date(Date.now() + 9 * 86400000).toISOString().slice(0, 10),
  });

  useEffect(() => {
    if (!authenticated) {
      router.replace("/auth");
    }
  }, [authenticated, router]);

  const refresh = async () => {
    const r = await fetch("/api/queries/dashboard", { cache: "no-store" });
    const json = (await r.json()) as unknown;
    const parsed = json as Partial<DashboardQueryResult>;
    if (!parsed.kpis || !parsed.shipments) throw new Error("Invalid dashboard response");
    setError(null);
    setData(parsed as DashboardQueryResult);
  };

  useEffect(() => {
    if (!authenticated) return;
    let active = true;
    fetch("/api/queries/dashboard", { cache: "no-store" })
      .then((r) => r.json())
      .then((json: unknown) => {
        if (!active) return;
        setError(null);
        const parsed = json as Partial<DashboardQueryResult>;
        if (!parsed.kpis || !parsed.shipments) {
          setError("Invalid dashboard response");
          setData(null);
          return;
        }
        setData(parsed as DashboardQueryResult);
      })
      .catch((e: unknown) => {
        if (!active) return;
        setError(e instanceof Error ? e.message : "Failed to load dashboard");
        setData(null);
      });
    return () => {
      active = false;
    };
  }, [authenticated]);

  const demurrage = useMemo(() => data?.demurrage ?? [], [data]);

  if (!authenticated) return null;

  return (
    <div className="min-h-screen bg-[color:var(--color-bg)]">
      <Header />
      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-[color:var(--color-primary)]">Meridian Command Tower</h1>
            <p className="mt-1 text-sm font-medium text-[color:var(--color-text-secondary)]">
              Operational visibility, predictive intervention, and cost risk in one view.
            </p>
          </div>
          <div className="text-xs text-slate-600">
            Data source: event-sourced ledger (projection-backed)
          </div>
        </div>

        {error && (
          <div className="mt-6 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-800">
            {error}
          </div>
        )}

        <div className="mt-6 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-bold text-[color:var(--color-primary)]">Create shipment</p>
              <p className="mt-1 text-xs text-slate-600">
                Appends `ShipmentCreated` into the event store and updates the projection.
              </p>
            </div>
            <div className="text-xs text-slate-600">
              Tip: Run <code className="rounded bg-slate-100 px-1 py-0.5">npm run seed:ledger</code> for demo data.
            </div>
          </div>

          <form
            className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-6"
            onSubmit={async (e) => {
              e.preventDefault();
              setCreating(true);
              try {
                const res = await fetch("/api/commands/shipment", {
                  method: "POST",
                  headers: { "content-type": "application/json" },
                  body: JSON.stringify({ type: "CreateShipment", ...form }),
                });
                const json = (await res.json()) as { error?: string };
                if (!res.ok) throw new Error(json.error ?? "Command failed");
                await refresh();
              } catch (err: unknown) {
                setError(err instanceof Error ? err.message : "Failed to create shipment");
              } finally {
                setCreating(false);
              }
            }}
          >
            <label className="grid gap-1 text-xs text-slate-700 lg:col-span-2">
              Reference
              <input
                value={form.reference}
                onChange={(e) => setForm((f) => ({ ...f, reference: e.target.value }))}
                className="h-10 rounded-md border border-slate-200 px-3 text-sm"
                required
              />
            </label>
            <label className="grid gap-1 text-xs text-slate-700">
              Origin
              <input
                value={form.origin}
                onChange={(e) => setForm((f) => ({ ...f, origin: e.target.value }))}
                className="h-10 rounded-md border border-slate-200 px-3 text-sm"
                required
              />
            </label>
            <label className="grid gap-1 text-xs text-slate-700">
              Destination
              <input
                value={form.destination}
                onChange={(e) => setForm((f) => ({ ...f, destination: e.target.value }))}
                className="h-10 rounded-md border border-slate-200 px-3 text-sm"
                required
              />
            </label>
            <label className="grid gap-1 text-xs text-slate-700">
              Mode
              <select
                value={form.mode}
                onChange={(e) => setForm((f) => ({ ...f, mode: e.target.value as TransportMode }))}
                className="h-10 rounded-md border border-slate-200 px-3 text-sm"
              >
                <option value="Ocean">Ocean</option>
                <option value="Air">Air</option>
                <option value="Road">Road</option>
                <option value="Rail">Rail</option>
              </select>
            </label>
            <label className="grid gap-1 text-xs text-slate-700">
              Incoterm
              <select
                value={form.incoterm}
                onChange={(e) => setForm((f) => ({ ...f, incoterm: e.target.value as Incoterm }))}
                className="h-10 rounded-md border border-slate-200 px-3 text-sm"
              >
                <option value="EXW">EXW</option>
                <option value="FOB">FOB</option>
                <option value="CIF">CIF</option>
                <option value="DDP">DDP</option>
              </select>
            </label>
            <label className="grid gap-1 text-xs text-slate-700">
              ETA date
              <input
                type="date"
                value={form.etaDate}
                onChange={(e) => setForm((f) => ({ ...f, etaDate: e.target.value }))}
                className="h-10 rounded-md border border-slate-200 px-3 text-sm"
              />
            </label>
            <div className="flex items-end lg:col-span-6">
              <Button type="submit" disabled={creating} className="w-full sm:w-auto">
                {creating ? "Creating…" : "Create shipment"}
              </Button>
            </div>
          </form>
        </div>

        {!data ? (
          <div className="mt-8 rounded-xl border border-slate-200 bg-white p-6 text-sm text-slate-700 shadow-sm">
            Loading dashboard…
          </div>
        ) : (
          <div className="mt-6 grid gap-4">
            <KpiCards
              totalActiveShipments={data.kpis.totalActiveShipments}
              daysOfInventoryOutstanding={data.kpis.daysOfInventoryOutstanding}
              demurrageAlerts={data.kpis.demurrageAlerts}
              onTimeDeliveryRate={data.kpis.onTimeDeliveryRate}
            />
            <ControlTowerCharts
              dwellTimeSeries={data.dwellTimeSeries}
              predictiveDelaySeries={data.predictiveDelaySeries}
            />
            <DemurrageAlerts items={demurrage} />
            <ShipmentTable items={data.shipments} />
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
