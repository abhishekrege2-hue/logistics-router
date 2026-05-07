import type { Metadata } from "next";
import { BRAND_NAME } from "@/lib/brand";
import { PlaceholderPage } from "@/components/footer-pages/PlaceholderPage";

export const metadata: Metadata = {
  title: `Shipping Guidance | ${BRAND_NAME}`,
  description: `Documentation and operational guidance for ${BRAND_NAME}.`,
};

export default function Page() {
  return (
    <PlaceholderPage
      title="Shipping Guidance"
      description="Packaging, documentation, Incoterms, and customs readiness guidance."
      relatedLinks={[{ label: "Existing shipping guidance scaffold", href: "/shipping-guidance" }]}
    />
  );
}

