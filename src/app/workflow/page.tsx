import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { WorkflowStepper } from "@/components/workflow/WorkflowStepper";
import { BRAND_NAME } from "@/lib/brand";

export const metadata: Metadata = {
  title: `Workflow | ${BRAND_NAME}`,
  description: `Interactive shipping wizard from booking to final-mile delivery.`,
};

export default function WorkflowPage() {
  return (
    <div className="min-h-screen bg-[color:var(--color-bg)] text-[color:var(--color-text-primary)]">
      <Header />
      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <h1 className="border-l-4 pl-4 text-3xl font-bold text-[color:var(--color-primary)] sm:text-4xl">
          Start Logistics Workflow
        </h1>
        <p className="mt-3 text-sm font-medium text-[color:var(--color-text-secondary)]">
          Interactive stepper to track exactly where a shipment sits in the logistics lifecycle.
        </p>

        <WorkflowStepper />
      </main>
      <Footer />
    </div>
  );
}
