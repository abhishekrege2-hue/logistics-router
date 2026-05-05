import type { Metadata } from "next";
import Image from "next/image";
import { PageShell } from "@/components/layout/PageShell";
import { BRAND_NAME } from "@/lib/brand";

export const metadata: Metadata = {
  title: `AI Solutions | ${BRAND_NAME}`,
  description: `AI route optimization, predictive visibility, and carbon intelligence from ${BRAND_NAME}.`,
};

export default function AISolutionsPage() {
  return (
    <PageShell>
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <section className="relative mb-8 h-56 overflow-hidden rounded-lg sm:h-72">
          <Image
            src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1600&auto=format&fit=crop"
            alt="Abstract analytics and world map data overlay"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 1200px"
          />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(26,43,74,0.84),rgba(232,119,34,0.24))]" />
        </section>
        <h1 className="border-l-4 pl-4 text-3xl font-bold text-[color:var(--color-primary)] sm:text-4xl">
          Explore AI Solutions
        </h1>
        <p className="mt-3 text-sm font-medium text-[color:var(--color-text-secondary)]">
          Predictive logistics intelligence engineered for margin protection and lead-time optimization.
        </p>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          <article className="surface-card rounded-lg border-t-4 p-5" style={{ borderTopColor: "var(--color-accent)" }}>
            <h2 className="text-lg font-bold text-[color:var(--color-primary)]">The Challenge</h2>
            <p className="mt-2 text-sm text-[color:var(--color-text-secondary)]">
              Volatile transit conditions, fragmented carrier data, and delayed exception alerts force teams into reactive firefighting that erodes service performance.
            </p>
            <ul className="mt-3 space-y-1 text-sm font-medium text-[color:var(--color-text-primary)]">
              <li>• Limited disruption foresight</li>
              <li>• Lead-time variability across lanes</li>
              <li>• Margin leakage from manual rerouting</li>
            </ul>
          </article>
          <article className="surface-card rounded-lg border-t-4 p-5" style={{ borderTopColor: "var(--color-accent)" }}>
            <h2 className="text-lg font-bold text-[color:var(--color-primary)]">The Solution</h2>
            <p className="mt-2 text-sm text-[color:var(--color-text-secondary)]">
              Meridian SCM uses predictive logistics models to detect risk signals early, recalculate multimodal options in real time, and preserve cold chain integrity where required.
            </p>
            <ul className="mt-3 space-y-1 text-sm font-medium text-[color:var(--color-text-primary)]">
              <li>• Dynamic route recalibration</li>
              <li>• Carbon-aware lane optimization</li>
              <li>• ETA confidence scoring and alerts</li>
            </ul>
          </article>
          <article className="surface-card rounded-lg border-t-4 p-5" style={{ borderTopColor: "var(--color-accent)" }}>
            <h2 className="text-lg font-bold text-[color:var(--color-primary)]">The Result</h2>
            <p className="mt-2 text-sm text-[color:var(--color-text-secondary)]">
              Our AI does not just track shipments; it anticipates disruptions before they happen, helping enterprises stabilize lead times, lower expedite spend, and protect operating margin.
            </p>
            <ul className="mt-3 space-y-1 text-sm font-medium text-[color:var(--color-text-primary)]">
              <li>• Faster decision cycles for planners</li>
              <li>• Reduced cost-to-serve on volatile lanes</li>
              <li>• Better customer promise reliability</li>
            </ul>
          </article>
        </div>
      </div>
    </PageShell>
  );
}
