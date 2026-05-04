import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { ServicePointFinderClient } from "@/components/find-service-point/ServicePointFinderClient";
import { BRAND_NAME, SITE_DESCRIPTION } from "@/lib/brand";

export const metadata: Metadata = {
  title: `Find a service point | ${BRAND_NAME}`,
  description: `Locate ${BRAND_NAME} drop-off and service locations. ${SITE_DESCRIPTION}`,
};

export default function FindServicePointPage() {
  return (
    <div
      className="min-h-screen"
      style={{
        backgroundColor: "var(--color-bg)",
        color: "var(--color-text-primary)",
      }}
    >
      <Header />
      <main>
        <ServicePointFinderClient />
      </main>
      <Footer />
    </div>
  );
}
