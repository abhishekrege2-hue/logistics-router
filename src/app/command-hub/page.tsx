import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { GlobalTradeWebMap } from "@/components/maps/GlobalTradeWebMap";
import { BRAND_NAME } from "@/lib/brand";

export const metadata: Metadata = {
  title: `Meridian Command Hub | ${BRAND_NAME}`,
  description: `Executive command center for network health, IoT monitoring, and predictive delivery analytics.`,
};

const fleetFeed = [
  { id: "VSL-204", mode: "Vessel", status: "On Schedule", location: "Singapore - Tuas Port" },
  { id: "AIR-881", mode: "Air", status: "Delay Risk", location: "Dubai - DXB Logistics Park" },
  { id: "TRK-119", mode: "Road", status: "In Transit", location: "Delhi - IGI Hub" },
  { id: "VSL-617", mode: "Vessel", status: "On Schedule", location: "Rotterdam - Europort" },
];

export default function CommandHubPage() {
  return (
    <div className="min-h-screen bg-[color:var(--color-bg)] text-[color:var(--color-text-primary)]">
      <Header />
      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <h1 className="border-l-4 pl-4 text-3xl font-bold text-[color:var(--color-primary)] sm:text-4xl">
          Meridian Command Hub
        </h1>
        <p className="mt-3 text-sm font-medium text-[color:var(--color-text-secondary)]">
          Enterprise control tower for network resilience, fleet monitoring, and delivery predictability.
        </p>

        <section className="surface-card mt-8 rounded-lg p-5 sm:p-6">
          <h2 className="text-xl font-bold text-[color:var(--color-primary)]">Real-Time Network Health</h2>
          <div className="mt-4 rounded-lg border border-[#1f2937] bg-[#0f172a] p-4">
            <div className="mb-3 flex items-center justify-between text-xs font-semibold text-[#94a3b8]">
              <span>Night Mode Trade Lane Map</span>
              <span>Global Lanes Active: 125</span>
            </div>
            <GlobalTradeWebMap heightClassName="h-80 sm:h-[28rem]" />
          </div>
        </section>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1.3fr_1fr]">
          <section className="surface-card rounded-lg p-5 sm:p-6">
            <h2 className="text-xl font-bold text-[color:var(--color-primary)]">Global Supply Chain Health Index (G-SCHI)</h2>
            <p className="mt-2 text-sm text-[color:var(--color-text-secondary)]">Network score: 8.7 / 10 · Stable with localized EMEA port variability.</p>
            <div className="mt-4 grid grid-cols-3 gap-3 text-center">
              <div className="rounded border p-3"><p className="text-xs text-[color:var(--color-text-secondary)]">Vessels</p><p className="text-lg font-bold text-[color:var(--color-primary)]">458</p></div>
              <div className="rounded border p-3"><p className="text-xs text-[color:var(--color-text-secondary)]">Aircraft</p><p className="text-lg font-bold text-[color:var(--color-primary)]">1,246</p></div>
              <div className="rounded border p-3"><p className="text-xs text-[color:var(--color-text-secondary)]">Ground Units</p><p className="text-lg font-bold text-[color:var(--color-primary)]">15,320</p></div>
            </div>
            <h2 className="text-xl font-bold text-[color:var(--color-primary)]">IoT Fleet Monitoring</h2>
            <div className="mt-4 space-y-3">
              {fleetFeed.map((item) => (
                <article key={item.id} className="rounded-md border border-[color:var(--color-border)] bg-[color:var(--color-surface)] p-3">
                  <p className="text-xs font-semibold uppercase tracking-wide text-[color:var(--color-text-secondary)]">
                    {item.mode} · {item.id}
                  </p>
                  <p className="mt-1 text-sm font-semibold">{item.location}</p>
                  <p className="mt-1 text-xs font-medium text-[color:var(--color-accent)]">{item.status}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="surface-card rounded-lg p-5 sm:p-6">
            <h2 className="text-xl font-bold text-[color:var(--color-primary)]">Regional Live Status</h2>
            <div className="mt-3 h-44 overflow-auto rounded border p-3 text-sm">
              <p><strong>APAC:</strong> Mundra Port operating at 95% capacity.</p>
              <p className="mt-2"><strong>EMEA:</strong> Rotterdam Terminal 4 clearance delayed by 2 hours.</p>
              <p className="mt-2"><strong>AMER:</strong> Los Angeles Port congestion easing; 24h turnaround achieved.</p>
              <p className="mt-2"><strong>APAC:</strong> Singapore transshipment reliability at 97.8% this week.</p>
              <p className="mt-2"><strong>EMEA:</strong> Hamburg rail feeder slots expanded for overnight departures.</p>
            </div>
            <h2 className="mt-5 text-xl font-bold text-[color:var(--color-primary)]">Predictive Delay Alerts</h2>
            <p className="mt-2 text-sm text-[color:var(--color-text-secondary)]">
              Projected vs. actual delivery performance across priority trade corridors.
            </p>
            <div className="mt-5 space-y-4">
              {[
                { lane: "India -> UAE", projected: 94, actual: 90 },
                { lane: "India -> EU", projected: 92, actual: 93 },
                { lane: "APAC -> NA", projected: 89, actual: 86 },
              ].map((row) => (
                <div key={row.lane}>
                  <div className="mb-1 flex justify-between text-xs font-semibold">
                    <span>{row.lane}</span>
                    <span>Projected {row.projected}% / Actual {row.actual}%</span>
                  </div>
                  <div className="h-2 rounded bg-[color:var(--color-border)]">
                    <div className="h-2 rounded bg-[color:var(--color-primary)]" style={{ width: `${row.projected}%` }} />
                  </div>
                  <div className="mt-1 h-2 rounded bg-[color:var(--color-border)]">
                    <div className="h-2 rounded bg-[color:var(--color-accent)]" style={{ width: `${row.actual}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
