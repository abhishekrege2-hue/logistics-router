import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BRAND_NAME } from "@/lib/brand";

export const metadata: Metadata = {
  title: `Developer Portal | ${BRAND_NAME}`,
  description: `API docs and integration tooling for ${BRAND_NAME}.`,
};

export default function DeveloperPortalPage() {
  return (
    <div className="min-h-screen bg-[color:var(--color-bg)]">
      <Header />
      <main className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-[color:var(--color-primary)]">Developer Portal</h1>
        <p className="mt-2 text-sm text-[color:var(--color-text-secondary)]">
          Scaffold page for enterprise integrations (webhooks, EDI/X12, event streaming).
        </p>
        <div className="mt-6 grid gap-3">
          <div className="rounded-xl border border-slate-200 bg-white p-6 text-sm">
            Command API: <span className="font-mono">POST /api/commands/shipment</span>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-6 text-sm">
            Query API: <span className="font-mono">GET /api/queries/dashboard</span>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

