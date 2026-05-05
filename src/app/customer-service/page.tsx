import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { ChevronDown } from "lucide-react";
import { BRAND_NAME } from "@/lib/brand";

export const metadata: Metadata = {
  title: `Customer Service | ${BRAND_NAME}`,
  description: `Customer support, claims assistance, and help center for ${BRAND_NAME}.`,
};

export default function CustomerServicePage() {
  const faqs = [
    {
      q: "What is a tracking number?",
      a: "A tracking number is a shipment identifier issued at booking time. It links your package to scan events across pickup, hub processing, transit, customs, and final delivery.",
    },
    {
      q: "How do I escalate a delayed shipment?",
      a: "Use the Global Support or India Regional Hub contacts with your tracking number, invoice reference, and expected delivery date so our team can trigger an operations investigation.",
    },
    {
      q: "Where can I get API support?",
      a: "For API authentication issues, webhook failures, and rate-limit guidance, contact the Technical Desk for rapid triage and integration support.",
    },
  ];

  return (
    <div
      className="min-h-screen"
      style={{
        backgroundColor: "var(--color-bg)",
        color: "var(--color-text-primary)",
      }}
    >
      <Header />
      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <h1
          className="border-l-4 pl-4 text-3xl font-bold sm:text-4xl"
          style={{ borderColor: "var(--color-accent)", color: "var(--color-primary)" }}
        >
          Customer Service
        </h1>
        <p className="mt-3 text-sm font-medium text-[color:var(--color-text-secondary)]">
          Professional support across contact, help center, and claims journeys.
        </p>

        <section className="mt-8 grid gap-4 md:grid-cols-3">
          {[
            {
              title: "Global Support",
              text: "support@logistics-router.com | +1-800-ROUTER (24/7).",
            },
            {
              title: "India Regional Hub",
              text: "support.in@logistics-router.com | +91-20-XXXX-XXXX (9 AM - 6 PM IST).",
            },
            {
              title: "Technical Desk",
              text: "For API and Business Account issues, integration incidents, and enterprise onboarding support.",
            },
          ].map((item) => (
            <article
              key={item.title}
              className="surface-card rounded-lg p-5"
              style={{ borderColor: "var(--color-border)" }}
            >
              <h2 className="text-lg font-bold text-[color:var(--color-primary)]">
                {item.title}
              </h2>
              <p className="mt-2 text-sm font-medium text-[color:var(--color-text-secondary)]">
                {item.text}
              </p>
            </article>
          ))}
        </section>
        <section className="mt-10">
          <h2 className="text-2xl font-bold text-[color:var(--color-primary)]">Help Desk FAQ</h2>
          <div className="mt-4 space-y-3">
            {faqs.map((item) => (
              <details
                key={item.q}
                className="rounded-[4px] border bg-white p-4"
                style={{ borderColor: "#e5e7eb" }}
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-2 text-sm font-semibold text-[color:var(--color-text-primary)]">
                  {item.q}
                  <ChevronDown className="h-4 w-4" />
                </summary>
                <p className="mt-3 text-sm font-semibold text-[color:var(--color-text-primary)]">
                  {item.a}
                </p>
              </details>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
