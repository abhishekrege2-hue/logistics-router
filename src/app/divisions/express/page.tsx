import type { Metadata } from "next";
import { BRAND_NAME } from "@/lib/brand";
import { PlaceholderPage } from "@/components/footer-pages/PlaceholderPage";

export const metadata: Metadata = {
  title: `Express | ${BRAND_NAME}`,
  description: `Express division entry for ${BRAND_NAME}.`,
};

export default function Page() {
  return (
    <PlaceholderPage
      title="Express"
      description="Time-definite express shipping and priority handling."
      relatedLinks={[{ label: "Go to Express Services", href: "/services/express" }]}
    />
  );
}

