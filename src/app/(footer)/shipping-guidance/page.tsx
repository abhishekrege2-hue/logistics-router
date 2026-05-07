import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BRAND_NAME } from "@/lib/brand";

export const metadata: Metadata = {
  title: `Shipping Guidance | ${BRAND_NAME}`,
  description: `Operational guidance and documentation for shipping with ${BRAND_NAME}.`,
};

export default function ShippingGuidancePage() {
  return (
    <div className="min-h-screen bg-[color:var(--color-bg)]">
      <Header />
      <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-[color:var(--color-primary)]">Shipping Guidance</h1>
        <p className="mt-2 text-sm text-[color:var(--color-text-secondary)]">
          Scaffold page for packaging standards, documentation, Incoterms guidance, and customs checklists.
        </p>
      </main>
      <Footer />
    </div>
  );
}

