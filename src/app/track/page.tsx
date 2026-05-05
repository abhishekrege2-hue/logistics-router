import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { TrackPageContent } from "@/components/TrackPageContent";
import { BRAND_NAME, SITE_DESCRIPTION } from "@/lib/brand";

export const metadata: Metadata = {
  title: `Track and trace | ${BRAND_NAME}`,
  description: `Track shipments with ${BRAND_NAME}. ${SITE_DESCRIPTION}`,
};

export default function TrackPage() {
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
        <TrackPageContent />
      </main>
      <Footer />
    </div>
  );
}
