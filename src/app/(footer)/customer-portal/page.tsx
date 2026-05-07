import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BRAND_NAME } from "@/lib/brand";

export const metadata: Metadata = {
  title: `Customer Portal | ${BRAND_NAME}`,
  description: `Portal entry points for ${BRAND_NAME} customers.`,
};

export default function CustomerPortalPage() {
  return (
    <div className="min-h-screen bg-[color:var(--color-bg)]">
      <Header />
      <main className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-[color:var(--color-primary)]">Customer Portal Logins</h1>
        <p className="mt-2 text-sm text-[color:var(--color-text-secondary)]">
          This is a scaffold landing page. Connect Supabase Auth and role-based routing to enable production portals.
        </p>
        <div className="mt-6 rounded-xl border border-slate-200 bg-white p-6">
          <p className="text-sm">
            For now, use the existing authentication page:{" "}
            <Link className="font-semibold underline" href="/auth">
              /auth
            </Link>
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}

