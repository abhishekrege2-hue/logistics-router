import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/layout/PageShell";
import { BRAND_NAME } from "@/lib/brand";
import { SERVICE_UPDATES } from "@/lib/updates";

export const metadata: Metadata = {
  title: `Service Updates | ${BRAND_NAME}`,
  description: `Latest market and operations updates from ${BRAND_NAME}.`,
};

export default function UpdatesPage() {
  return (
    <PageShell>
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        <h1 className="border-l-4 pl-4 text-3xl font-bold text-[color:var(--color-primary)] sm:text-4xl">
          Service Updates & Market News
        </h1>
        <p className="mt-3 text-sm font-medium text-[color:var(--color-text-secondary)]">
          Regional bulletins and network intelligence for enterprise shippers.
        </p>
        <div className="mt-8 space-y-4">
          {SERVICE_UPDATES.map((update) => (
            <Link
              key={update.slug}
              href={`/updates/${update.slug}`}
              className="surface-card block rounded-lg border p-5 transition hover:border-[color:var(--color-accent)]"
            >
              <p className="text-xs font-semibold uppercase tracking-wide text-[color:var(--color-text-secondary)]">
                Published: {update.publishedAt} · Last updated: {update.lastUpdated}
              </p>
              <h2 className="mt-2 text-xl font-bold text-[color:var(--color-primary)]">
                {update.title}
              </h2>
              <p className="mt-2 text-sm font-medium text-[color:var(--color-text-secondary)]">
                {update.summary}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </PageShell>
  );
}
