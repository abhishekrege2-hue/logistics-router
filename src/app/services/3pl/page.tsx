import type { Metadata } from "next";
import Image from "next/image";
import { PageShell } from "@/components/layout/PageShell";
import { BRAND_NAME } from "@/lib/brand";

export const metadata: Metadata = {
  title: `Supply Chain 3PL | ${BRAND_NAME}`,
  description: `Contract logistics and multi-user warehousing with ${BRAND_NAME}.`,
};

export default function Services3PLPage() {
  return (
    <PageShell>
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <section className="relative mb-8 h-56 overflow-hidden rounded-lg sm:h-72">
          <Image
            src="https://images.unsplash.com/photo-1586528116493-a029325540fa?q=80&w=1600&auto=format&fit=crop"
            alt="Automated warehouse with robotic picking systems"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 1200px"
          />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(26,43,74,0.84),rgba(26,43,74,0.36))]" />
        </section>
        <h1 className="border-l-4 pl-4 text-3xl font-bold text-[color:var(--color-primary)] sm:text-4xl">
          Explore Supply Chain 3PL
        </h1>
        <p className="mt-3 text-sm font-medium text-[color:var(--color-text-secondary)]">
          Operational resilience through scalable contract logistics and inventory control.
        </p>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          <article className="surface-card rounded-lg border-t-4 p-5" style={{ borderTopColor: "var(--color-accent)" }}>
            <h2 className="text-lg font-bold text-[color:var(--color-primary)]">The Challenge</h2>
            <p className="mt-2 text-sm text-[color:var(--color-text-secondary)]">
              Growth often creates fulfillment bottlenecks: fragmented inventory, inconsistent warehouse productivity, and rising cost-to-serve.
            </p>
            <ul className="mt-3 space-y-1 text-sm font-medium text-[color:var(--color-text-primary)]">
              <li>• Capacity strain during demand spikes</li>
              <li>• Low inventory accuracy</li>
              <li>• Inflexible distribution networks</li>
            </ul>
          </article>
          <article className="surface-card rounded-lg border-t-4 p-5" style={{ borderTopColor: "var(--color-accent)" }}>
            <h2 className="text-lg font-bold text-[color:var(--color-primary)]">The Solution</h2>
            <p className="mt-2 text-sm text-[color:var(--color-text-secondary)]">
              Meridian SCM provides contract logistics, multi-user warehousing, and inventory management designed for throughput, governance, and SKU-level visibility.
            </p>
            <ul className="mt-3 space-y-1 text-sm font-medium text-[color:var(--color-text-primary)]">
              <li>• Adaptive warehousing and labor orchestration</li>
              <li>• WMS-integrated inventory controls</li>
              <li>• Multi-node replenishment optimization</li>
            </ul>
          </article>
          <article className="surface-card rounded-lg border-t-4 p-5" style={{ borderTopColor: "var(--color-accent)" }}>
            <h2 className="text-lg font-bold text-[color:var(--color-primary)]">The Result</h2>
            <p className="mt-2 text-sm text-[color:var(--color-text-secondary)]">
              Scalable warehousing and contract logistics turn supply chain operations into a profit center while your teams focus on growth and commercial strategy.
            </p>
            <ul className="mt-3 space-y-1 text-sm font-medium text-[color:var(--color-text-primary)]">
              <li>• Improved order cycle performance</li>
              <li>• Lower fulfillment complexity</li>
              <li>• Higher enterprise service resilience</li>
            </ul>
          </article>
        </div>
      </div>
    </PageShell>
  );
}
