"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { isAuthenticated } from "@/lib/auth";

export default function DashboardPage() {
  const router = useRouter();
  const authenticated = isAuthenticated();

  useEffect(() => {
    if (!authenticated) {
      router.replace("/auth");
    }
  }, [authenticated, router]);

  if (!authenticated) return null;

  return (
    <div className="min-h-screen bg-[color:var(--color-bg)]">
      <Header />
      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-[color:var(--color-primary)]">
          User Dashboard
        </h1>
        <p className="mt-2 text-sm font-medium text-[color:var(--color-text-secondary)]">
          Welcome back. This simulated dashboard represents authenticated portal
          access for enterprise customers.
        </p>
      </main>
      <Footer />
    </div>
  );
}
