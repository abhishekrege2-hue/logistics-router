import type { Metadata } from "next";
import Image from "next/image";
import { PageShell } from "@/components/layout/PageShell";
import { BRAND_NAME } from "@/lib/brand";

export const metadata: Metadata = {
  title: `Global Forwarding | ${BRAND_NAME}`,
  description: `Air, Ocean, Road, and Rail forwarding by ${BRAND_NAME}.`,
};

const sections = [
  {
    title: "Air Freight | 1-5 Days",
    body: "Best for urgent replenishment and high-value cargo with premium uplift, thermal controls, and rapid customs handling.",
  },
  {
    title: "Ocean Freight | 14-35 Days",
    body: "Best for scale and landed-cost optimization through FCL/LCL design, sailing reliability controls, and port decongestion routing.",
  },
  {
    title: "Road Freight | Regional Precision",
    body: "Best for cross-border continuity with bonded transit options, lane security protocols, and predictable border handoffs.",
  },
  {
    title: "Rail Freight | Balanced Cost-Transit",
    body: "Best for continental moves requiring reliable lead times and lower emissions intensity versus premium air alternatives.",
  },
];

export default function ForwardingPage() {
  return (
    <PageShell>
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <section className="relative mb-8 h-56 overflow-hidden rounded-lg sm:h-72">
          <Image
            src="https://images.unsplash.com/photo-1577412647305-991150c7d163?q=80&w=1600&auto=format&fit=crop"
            alt="Container ship at deep sea port terminal"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 1200px"
          />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(26,43,74,0.82),rgba(26,43,74,0.38))]" />
        </section>
        <h1 className="border-l-4 pl-4 text-3xl font-bold text-[color:var(--color-primary)] sm:text-4xl">
          Explore Global Forwarding
        </h1>
        <p className="mt-3 text-sm font-medium text-[color:var(--color-text-secondary)]">
          Multimodal flexibility designed for volatile global trade lanes.
        </p>
        <p className="mt-2 text-sm font-semibold text-[color:var(--color-primary)]">
          Boundaryless Logistics with Cross-Hemisphere Orchestration across INSTC and Trans-Pacific corridors.
        </p>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          <article className="surface-card rounded-lg border-t-4 p-5" style={{ borderTopColor: "var(--color-accent)" }}>
            <h2 className="text-lg font-bold text-[color:var(--color-primary)]">The Challenge</h2>
            <p className="mt-2 text-sm text-[color:var(--color-text-secondary)]">
              Global shippers face fluctuating capacity, changing compliance rules, and multimarket service expectations that a single transport mode cannot satisfy.
            </p>
            <ul className="mt-3 space-y-1 text-sm font-medium text-[color:var(--color-text-primary)]">
              <li>• Trade-lane volatility</li>
              <li>• Customs and documentation complexity</li>
              <li>• Conflicting cost and speed priorities</li>
            </ul>
          </article>
          <article className="surface-card rounded-lg border-t-4 p-5" style={{ borderTopColor: "var(--color-accent)" }}>
            <h2 className="text-lg font-bold text-[color:var(--color-primary)]">The Solution</h2>
            <p className="mt-2 text-sm text-[color:var(--color-text-secondary)]">
              Whether you need the speed of Air, the scale of Ocean, or the reliability of Road and Rail, Meridian SCM orchestrates multimodal connectivity with end-to-end customs brokerage and compliance.
            </p>
            <ul className="mt-3 space-y-1 text-sm font-medium text-[color:var(--color-text-primary)]">
              <li>• Mode-shift and contingency planning</li>
              <li>• Integrated customs and broker workflows</li>
              <li>• Unified milestone visibility across legs</li>
              <li>• International North-South Transport Corridor (INSTC) routing options</li>
              <li>• Trans-Pacific corridor balancing for peak demand windows</li>
            </ul>
          </article>
          <article className="surface-card rounded-lg border-t-4 p-5" style={{ borderTopColor: "var(--color-accent)" }}>
            <h2 className="text-lg font-bold text-[color:var(--color-primary)]">The Result</h2>
            <p className="mt-2 text-sm text-[color:var(--color-text-secondary)]">
              Enterprises gain resilient lane architecture, improved lead-time predictability, and lower total logistics cost through proactive modal orchestration.
            </p>
            <ul className="mt-3 space-y-1 text-sm font-medium text-[color:var(--color-text-primary)]">
              <li>• Greater service continuity under disruption</li>
              <li>• Better landed-cost governance</li>
              <li>• Stronger market-entry speed</li>
            </ul>
          </article>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {sections.map((section) => (
            <article key={section.title} className="surface-card rounded-lg border-l-4 p-5" style={{ borderLeftColor: "var(--color-accent)" }}>
              <h2 className="text-lg font-bold text-[color:var(--color-primary)]">{section.title}</h2>
              <p className="mt-2 text-sm text-[color:var(--color-text-secondary)]">{section.body}</p>
            </article>
          ))}
        </div>
      </div>
    </PageShell>
  );
}
