import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BRAND_NAME } from "@/lib/brand";

export const dynamicParams = true;

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const label = params.slug.replace(/-/g, " ");
  return {
    title: `${label} | ${BRAND_NAME}`,
    description: `Sector-focused logistics solutions for ${label} by ${BRAND_NAME}.`,
  };
}

export default function SectorPage({ params }: { params: { slug: string } }) {
  const label = params.slug.replace(/-/g, " ");
  return (
    <div className="min-h-screen bg-[color:var(--color-bg)]">
      <Header />
      <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-[color:var(--color-primary)]">
          Industry Sector: {label}
        </h1>
        <p className="mt-2 text-sm text-[color:var(--color-text-secondary)]">
          Scaffold page for sector-specific playbooks, compliance patterns, and lane strategies.
        </p>
      </main>
      <Footer />
    </div>
  );
}

