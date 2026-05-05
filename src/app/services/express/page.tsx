import type { Metadata } from "next";
import Image from "next/image";
import { PageShell } from "@/components/layout/PageShell";
import { BRAND_NAME } from "@/lib/brand";

export const metadata: Metadata = {
  title: `Express Services | ${BRAND_NAME}`,
  description: `Time-definite international express shipping with ${BRAND_NAME}.`,
};

export default function ExpressServicesPage() {
  return (
    <PageShell>
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <section className="relative mb-8 h-56 overflow-hidden rounded-lg sm:h-72">
          <Image
            src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=1600&auto=format&fit=crop"
            alt="High-speed cargo aircraft in motion"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 1200px"
          />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(26,43,74,0.82),rgba(26,43,74,0.35))]" />
        </section>
        <h1 className="border-l-4 pl-4 text-3xl font-bold text-[color:var(--color-primary)] sm:text-4xl">
          Explore Express
        </h1>
        <p className="mt-3 text-sm font-medium text-[color:var(--color-text-secondary)]">
          Velocity and trust for time-definite cross-border delivery.
        </p>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          <article className="surface-card rounded-lg border-t-4 p-5" style={{ borderTopColor: "var(--color-accent)" }}>
            <h2 className="text-lg font-bold text-[color:var(--color-primary)]">The Challenge</h2>
            <p className="mt-2 text-sm text-[color:var(--color-text-secondary)]">
              Missed delivery windows on urgent parcels and critical documents can delay launches, disrupt cash flow, and weaken customer confidence.
            </p>
            <ul className="mt-3 space-y-1 text-sm font-medium text-[color:var(--color-text-primary)]">
              <li>• Tight commercial deadlines</li>
              <li>• Border clearance uncertainty</li>
              <li>• High value shipment sensitivity</li>
            </ul>
          </article>
          <article className="surface-card rounded-lg border-t-4 p-5" style={{ borderTopColor: "var(--color-accent)" }}>
            <h2 className="text-lg font-bold text-[color:var(--color-primary)]">The Solution</h2>
            <p className="mt-2 text-sm text-[color:var(--color-text-secondary)]">
              Meridian SCM delivers time-definite international express with synchronized pickup, air uplift, customs brokerage, and door-to-door milestone visibility.
            </p>
            <ul className="mt-3 space-y-1 text-sm font-medium text-[color:var(--color-text-primary)]">
              <li>• Priority cutoffs and uplift control</li>
              <li>• Pre-clearance and compliance validation</li>
              <li>• High-frequency status transparency</li>
            </ul>
          </article>
          <article className="surface-card rounded-lg border-t-4 p-5" style={{ borderTopColor: "var(--color-accent)" }}>
            <h2 className="text-lg font-bold text-[color:var(--color-primary)]">The Result</h2>
            <p className="mt-2 text-sm text-[color:var(--color-text-secondary)]">
              Time-definite delivery is not a luxury; it is a competitive necessity. From documents to high-value parcels, we help businesses reach markets in hours, not days.
            </p>
            <ul className="mt-3 space-y-1 text-sm font-medium text-[color:var(--color-text-primary)]">
              <li>• Faster market and customer response</li>
              <li>• Improved SLA attainment</li>
              <li>• Stronger brand trust at delivery</li>
            </ul>
          </article>
        </div>
      </div>
    </PageShell>
  );
}
