"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { isAuthenticated } from "@/lib/auth";
import type { DashboardQueryResult } from "@/lib/types/logistics-ledger";
import { KpiCards } from "@/components/dashboard/KpiCards";
import { DemurrageAlerts } from "@/components/dashboard/DemurrageAlerts";
import { ShipmentTable } from "@/components/dashboard/ShipmentTable";
import { ControlTowerCharts } from "@/components/dashboard/ControlTowerCharts";

export default function DashboardPage() {
  const router = useRouter();
  const authenticated = isAuthenticated();
  const [data, setData] = useState<DashboardQueryResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!authenticated) {
      router.replace("/auth");
    }
  }, [authenticated, router]);

  useEffect(() => {
    if (!authenticated) return;
    let active = true;
    fetch("/api/queries/dashboard")
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
