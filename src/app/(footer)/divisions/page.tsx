import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BRAND_NAME } from "@/lib/brand";

export const metadata: Metadata = {
  title: `Divisions | ${BRAND_NAME}`,
  description: `Business divisions and service lines for ${BRAND_NAME}.`,
};

export default function DivisionsPage() {
  return (
    <div className="min-h-screen bg-[color:var(--color-bg)]">
      <Header />
      <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-[color:var(--color-primary)]">Our Divisions</h1>
        <p className="mt-2 text-sm text-[color:var(--color-text-secondary)]">
          Scaffold landing page for Meridian SCM’s global service lines.
        </p>
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <Link href="/services/express" className="rounded-xl border border-slate-200 bg-white p-6 text-sm font-semibold hover:bg-slate-50">
            Express
          </Link>
          <Link href="/services/forwarding" className="rounded-xl border border-slate-200 bg-white p-6 text-sm font-semibold hover:bg-slate-50">
            Global Forwarding
          </Link>
          <Link href="/services/3pl" className="rounded-xl border border-slate-200 bg-white p-6 text-sm font-semibold hover:bg-slate-50">
            Supply Chain (3PL)
          </Link>
          <Link href="/enterprise-logistics" className="rounded-xl border border-slate-200 bg-white p-6 text-sm font-semibold hover:bg-slate-50">
            Contract Logistics
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}

