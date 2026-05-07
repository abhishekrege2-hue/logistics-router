import type { Metadata } from "next";
import { BRAND_NAME } from "@/lib/brand";
import { PlaceholderPage } from "@/components/footer-pages/PlaceholderPage";

export const metadata: Metadata = {
  title: `For Your Business | ${BRAND_NAME}`,
  description: `Enterprise modules entry point for ${BRAND_NAME}.`,
};

export default function Page() {
  return (
    <PlaceholderPage
      title="For Your Business"
      description="Discover enterprise modules: control tower, DPP, billing, and orchestration."
      relatedLinks={[{ label: "Existing business landing", href: "/for-your-business" }]}
    />
  );
}

