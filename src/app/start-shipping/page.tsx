import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import { BRAND_NAME } from "@/lib/brand";

export const metadata: Metadata = {
  title: `Start Shipping | ${BRAND_NAME}`,
  description: `Start shipping with ${BRAND_NAME}.`,
};

export default function StartShippingPage() {
  return (
    <PageShell>
      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
        <h1 className="border-l-4 pl-4 text-3xl font-bold text-[color:var(--color-primary)] sm:text-4xl">
          Start Shipping
        </h1>
        <p className="mt-3 text-sm font-medium text-[color:var(--color-text-secondary)]">
          Complete shipment details to generate your waybill.
        </p>
        <form className="mt-8 space-y-6">
          <section className="surface-card rounded-lg p-5">
            <h2 className="text-lg font-semibold text-[color:var(--color-primary)]">
              1) Sender Details
            </h2>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              <input className="input-control px-4 py-3" placeholder="Sender Name" />
              <input className="input-control px-4 py-3" placeholder="Contact Number" />
              <input className="input-control px-4 py-3 md:col-span-2" placeholder="Address" />
            </div>
          </section>
          <section className="surface-card rounded-lg p-5">
            <h2 className="text-lg font-semibold text-[color:var(--color-primary)]">
              2) Receiver Details
            </h2>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              <input className="input-control px-4 py-3" placeholder="Receiver Name" />
              <input className="input-control px-4 py-3" placeholder="Contact Number" />
              <input className="input-control px-4 py-3 md:col-span-2" placeholder="Address" />
            </div>
          </section>
          <section className="surface-card rounded-lg p-5">
            <h2 className="text-lg font-semibold text-[color:var(--color-primary)]">
              3) Shipment Specs
            </h2>
            <div className="mt-4 grid gap-3 md:grid-cols-4">
              <input className="input-control px-4 py-3" placeholder="Packages" />
              <input className="input-control px-4 py-3" placeholder="Length (cm)" />
              <input className="input-control px-4 py-3" placeholder="Width (cm)" />
              <input className="input-control px-4 py-3" placeholder="Height (cm)" />
            </div>
          </section>
          <section className="surface-card rounded-lg p-5">
            <h2 className="text-lg font-semibold text-[color:var(--color-primary)]">
              4) Label Generation
            </h2>
            <button type="button" className="btn-primary mt-4 px-6 py-3">
              Generate Waybill
            </button>
          </section>
        </form>
      </div>
    </PageShell>
  );
}
