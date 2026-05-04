import type { Metadata } from "next";
import Link from "next/link";
import { BarChart3, Headphones, Map, Radar } from "lucide-react";
import { PageShell } from "@/components/layout/PageShell";
import { BRAND_NAME } from "@/lib/brand";

export const metadata: Metadata = {
  title: `Enterprise Business App | ${BRAND_NAME}`,
  description: `Enterprise portal for ${BRAND_NAME} clients.`,
};

const features = [
  { icon: Map, text: "Real-time shipment visibility" },
  { icon: Radar, text: "AI-powered route optimization" },
  { icon: Headphones, text: "Dedicated account management" },
  { icon: BarChart3, text: "Custom reporting dashboard" },
];

export default function EnterpriseAppPage() {
  return (
    <PageShell>
      <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 lg:px-8">
        <h1
          className="border-l-4 pl-4 text-3xl font-bold tracking-tight sm:text-4xl"
          style={{
            borderColor: "var(--color-accent)",
            color: "var(--color-primary)",
          }}
        >
          Enterprise Business App
        </h1>
        <p
          className="mt-4 text-base"
          style={{ color: "var(--color-text-secondary)" }}
        >
          A dedicated portal for enterprise clients to manage shipments, view
          analytics, and coordinate logistics at scale.
        </p>
        <div className="mt-8 flex flex-col gap-3 md:flex-row md:items-center">
          <Link
            href="/request-demo"
            className="btn-primary inline-flex min-h-[44px] cursor-pointer items-center justify-center px-6 py-3 text-center text-sm font-bold"
          >
            Request Access
          </Link>
          <a
            href="#features-list"
            className="btn-secondary-outline inline-flex min-h-[44px] cursor-pointer items-center justify-center px-6 py-3 text-center text-sm font-semibold"
          >
            Learn More
          </a>
        </div>

        <div id="features-list" className="mt-16 scroll-mt-24">
          <h2
            className="text-xl font-bold"
            style={{ color: "var(--color-primary)" }}
          >
            What you get
          </h2>
          <ul className="mt-6 space-y-4">
            {features.map(({ icon: Icon, text }) => (
              <li
                key={text}
                className="surface-card flex cursor-default items-center gap-4 rounded-lg border p-4"
                style={{ borderColor: "var(--color-border)" }}
              >
                <span
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border"
                  style={{
                    borderColor: "var(--color-border)",
                    color: "var(--color-accent)",
                  }}
                >
                  <Icon className="h-5 w-5" aria-hidden />
                </span>
                <span
                  className="font-medium"
                  style={{ color: "var(--color-text-primary)" }}
                >
                  {text}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </PageShell>
  );
}
