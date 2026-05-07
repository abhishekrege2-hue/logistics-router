import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BRAND_NAME } from "@/lib/brand";
import { DppRegistry } from "@/components/dpp/DppRegistry";

export const metadata: Metadata = {
  title: `EU Digital Product Passport | ${BRAND_NAME}`,
  description: `Digital Product Passport registry and sustainability compliance for ${BRAND_NAME}.`,
};

export default function DppPage() {
  return (
    <div className="min-h-screen bg-[color:var(--color-bg)]">
      <Header />
      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-[color:var(--color-primary)]">EU Digital Product Passport</h1>
        <p className="mt-2 text-sm font-medium text-[color:var(--color-text-secondary)]">
          Track lifecycle, materials composition, and sustainability metrics for ESPR-aligned compliance.
        </p>
        <div className="mt-6">
          <DppRegistry />
        </div>
      </main>
      <Footer />
    </div>
  );
}

