import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import { RequestDemoForm } from "@/components/request-demo/RequestDemoForm";
import { BRAND_NAME } from "@/lib/brand";

export const metadata: Metadata = {
  title: `Request a Demo | ${BRAND_NAME}`,
  description: `Book a demo with ${BRAND_NAME}.`,
};

export default function RequestDemoPage() {
  return (
    <PageShell>
      <div className="mx-auto max-w-xl px-4 py-14 sm:px-6 lg:px-8">
        <h1
          className="border-l-4 pl-4 text-3xl font-bold tracking-tight sm:text-4xl"
          style={{
            borderColor: "var(--color-accent)",
            color: "var(--color-primary)",
          }}
        >
          Request a Demo
        </h1>
        <p
          className="mt-4 text-base"
          style={{ color: "var(--color-text-secondary)" }}
        >
          See Meridian SCM in action. Fill in your details and our team will
          reach out within 24 hours.
        </p>
        <div className="mt-10">
          <RequestDemoForm />
        </div>
      </div>
    </PageShell>
  );
}
