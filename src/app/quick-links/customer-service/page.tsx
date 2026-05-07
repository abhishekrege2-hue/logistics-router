import type { Metadata } from "next";
import { BRAND_NAME } from "@/lib/brand";
import { PlaceholderPage } from "@/components/footer-pages/PlaceholderPage";

export const metadata: Metadata = {
  title: `Customer Service | ${BRAND_NAME}`,
  description: `Customer service entry point for ${BRAND_NAME}.`,
};

export default function Page() {
  return (
    <PlaceholderPage
      title="Customer Service"
      description="Enterprise customer support, claims assistance, and service requests."
      relatedLinks={[{ label: "Go to Customer Service module", href: "/customer-service" }]}
    />
  );
}

