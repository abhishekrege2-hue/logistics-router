import type { Metadata } from "next";
import { BRAND_NAME } from "@/lib/brand";
import { PlaceholderPage } from "@/components/footer-pages/PlaceholderPage";

export const metadata: Metadata = {
  title: `Get a Quote | ${BRAND_NAME}`,
  description: `Pricing and routing quote entry point for ${BRAND_NAME}.`,
};

export default function Page() {
  return (
    <PlaceholderPage
      title="Get a Quote"
      description="AI-backed routing and pricing estimates."
      relatedLinks={[{ label: "Go to Quote Engine", href: "/get-a-quote" }]}
    />
  );
}

