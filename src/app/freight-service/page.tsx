import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import { BRAND_NAME } from "@/lib/brand";

export const metadata: Metadata = {
  title: `Freight Service | ${BRAND_NAME}`,
  description: `Air, ocean, and multimodal freight with ${BRAND_NAME}.`,
};

export default function FreightServicePage() {
  return (
    <PageShell>
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <h1 className="border-l-4 pl-4 text-3xl font-bold text-[color:var(--color-primary)] sm:text-4xl">
          Freight Service
        </h1>
        <p className="mt-3 text-sm font-medium text-[color:var(--color-text-secondary)]">
          Cross-border freight operations with customs-ready documentation and visibility.
        </p>
        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <section className="surface-card rounded-lg p-6">
            <h2 className="text-xl font-semibold text-[color:var(--color-primary)]">
              Customs Clearance Checklist
            </h2>
            <ul className="mt-4 space-y-2 text-sm font-medium text-[color:var(--color-text-secondary)]">
              <li>□ Commercial Invoice and Packing List uploaded</li>
              <li>□ HS Codes validated for all SKUs</li>
              <li>□ Country-of-Origin declarations completed</li>
              <li>□ Import permits / licenses attached</li>
              <li>□ Duty and tax payment terms confirmed</li>
              <li>□ Dangerous goods declaration (if applicable)</li>
            </ul>
          </section>
          <section className="surface-card rounded-lg p-6">
            <h2 className="text-xl font-semibold text-[color:var(--color-primary)]">
              End-to-End Visibility
            </h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <div className="rounded border p-3 text-sm">Bookings: 48 Active</div>
              <div className="rounded border p-3 text-sm">In Transit: 132 Containers</div>
              <div className="rounded border p-3 text-sm">Customs Hold: 3 Shipments</div>
              <div className="rounded border p-3 text-sm">On-time ETA: 94.2%</div>
            </div>
          </section>
        </div>
      </div>
    </PageShell>
  );
}
