import type { Metadata } from "next";
import { BRAND_NAME } from "@/lib/brand";
import { PlaceholderPage } from "@/components/footer-pages/PlaceholderPage";

export const metadata: Metadata = {
  title: `Developer Portal | ${BRAND_NAME}`,
  description: `Integration entry point for ${BRAND_NAME}.`,
};

export default function Page() {
  return (
    <PlaceholderPage
      title="Developer Portal"
      description="Integration and API documentation hub (webhooks, EDI/X12, streaming)."
      relatedLinks={[{ label: "Existing developer portal scaffold", href: "/developer-portal" }]}
    />
  );
}

