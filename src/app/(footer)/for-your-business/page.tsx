import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BRAND_NAME } from "@/lib/brand";

export const metadata: Metadata = {
  title: `For Your Business | ${BRAND_NAME}`,
  description: `Enterprise solutions and modules for ${BRAND_NAME}.`,
};

export default function ForYourBusinessPage() {
  return (
    <div className="min-h-screen bg-[color:var(--color-bg)]">
      <Header />
      <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-[color:var(--color-primary)]">For Your Business</h1>
        <p className="mt-2 text-sm text-[color:var(--color-text-secondary)]">
          Central entry point for enterprise modules.
        </p>
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <Link href="/dashboard" className="rounded-xl border border-slate-200 bg-white p-6 text-sm font-semibold hover:bg-slate-50">
            Control Tower Dashboard
          </Link>
          <Link href="/enterprise-logistics" className="rounded-xl border border-slate-200 bg-white p-6 text-sm font-semibold hover:bg-slate-50">
            Enterprise Logistics
          </Link>
          <Link href="/dpp" className="rounded-xl border border-slate-200 bg-white p-6 text-sm font-semibold hover:bg-slate-50">
            EU Digital Product Passport (DPP)
          </Link>
          <Link href="/command-hub" className="rounded-xl border border-slate-200 bg-white p-6 text-sm font-semibold hover:bg-slate-50">
            Meridian Command Hub
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}

