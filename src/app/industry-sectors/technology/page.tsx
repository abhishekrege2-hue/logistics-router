import type { Metadata } from "next";
import { BRAND_NAME } from "@/lib/brand";
import { PlaceholderPage } from "@/components/footer-pages/PlaceholderPage";

export const metadata: Metadata = {
  title: `Technology | ${BRAND_NAME}`,
  description: `Sector solutions for Technology by ${BRAND_NAME}.`,
};

export default function Page() {
  return (
    <PlaceholderPage
      title="Technology"
      description="High-value shipment controls, compliance-ready documentation, and predictive exception handling."
    />
  );
}

