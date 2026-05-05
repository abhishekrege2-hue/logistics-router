import type { Metadata } from "next";
import { Building2, Boxes, Radar } from "lucide-react";
import { PageShell } from "@/components/layout/PageShell";
import { BRAND_NAME } from "@/lib/brand";

export const metadata: Metadata = {
  title: `Enterprise Logistics | ${BRAND_NAME}`,
  description: `Supply chain and 3PL solutions from ${BRAND_NAME}.`,
};

export default function EnterpriseLogisticsPage() {
  return (
    <PageShell>
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <h1 className="border-l-4 pl-4 text-3xl font-bold text-[color:var(--color-primary)] sm:text-4xl">
          Enterprise Logistics Services
        </h1>
        <p className="mt-3 text-sm font-medium text-[color:var(--color-text-secondary)]">
          Contract logistics, warehousing, and control tower orchestration for complex supply chains.
        </p>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          <article className="surface-card rounded-lg p-5">
            <Building2 className="h-6 w-6 text-[color:var(--color-accent)]" />
            <h2 className="mt-3 text-lg font-semibold">Contract Logistics</h2>
            <p className="mt-2 text-sm font-medium text-[color:var(--color-text-secondary)]">
              Dedicated operating models for inbound planning, inventory positioning, and SLA-governed distribution.
            </p>
          </article>
          <article className="surface-card rounded-lg p-5">
            <Boxes className="h-6 w-6 text-[color:var(--color-accent)]" />
            <h2 className="mt-3 text-lg font-semibold">Warehousing</h2>
            <p className="mt-2 text-sm font-medium text-[color:var(--color-text-secondary)]">
              Multi-node warehousing with 3D slot planning, optimized put-away, and synchronized order consolidation.
            </p>
          </article>
          <article className="surface-card rounded-lg p-5">
            <Radar className="h-6 w-6 text-[color:var(--color-accent)]" />
            <h2 className="mt-3 text-lg font-semibold">Control Tower Orchestration</h2>
            <p className="mt-2 text-sm font-medium text-[color:var(--color-text-secondary)]">
              Unified event visibility across carriers, milestones, exception triggers, and continuous route optimization.
            </p>
          </article>
        </div>
      </div>
    </PageShell>
  );
}
