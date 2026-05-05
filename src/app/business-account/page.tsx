import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import { BRAND_NAME } from "@/lib/brand";

export const metadata: Metadata = {
  title: `Request a Business Account | ${BRAND_NAME}`,
  description: `Enterprise shipping accounts with ${BRAND_NAME}.`,
};

export default function BusinessAccountPage() {
  return (
    <PageShell>
      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
        <h1 className="border-l-4 pl-4 text-3xl font-bold text-[color:var(--color-primary)] sm:text-4xl">
          Request a Business Account
        </h1>
        <p className="mt-3 text-sm font-medium text-[color:var(--color-text-secondary)]">
          Share your shipping profile and our enterprise team will contact you.
        </p>
        <form className="surface-card mt-8 space-y-4 rounded-lg p-6">
          <div>
            <label className="mb-1 block text-sm font-semibold">Company Name</label>
            <input className="input-control w-full px-4 py-3" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-semibold">Monthly Shipping Volume</label>
            <select className="input-control w-full px-4 py-3">
              <option>0 - 100 shipments</option>
              <option>101 - 500 shipments</option>
              <option>501 - 2000 shipments</option>
              <option>2000+ shipments</option>
            </select>
          </div>
          <div>
            <label className="mb-1 block text-sm font-semibold">Preferred Payment Terms</label>
            <select className="input-control w-full px-4 py-3">
              <option>Net 30</option>
              <option>Net 60</option>
            </select>
          </div>
          <button type="button" className="btn-primary px-6 py-3">
            Submit Business Request
          </button>
        </form>
      </div>
    </PageShell>
  );
}
