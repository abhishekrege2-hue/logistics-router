import type { Metadata } from "next";
import { BRAND_NAME } from "@/lib/brand";
import { PlaceholderPage } from "@/components/footer-pages/PlaceholderPage";

export const metadata: Metadata = {
  title: `Global Forwarding | ${BRAND_NAME}`,
  description: `Forwarding division entry for ${BRAND_NAME}.`,
};

export default function Page() {
  return (
    <PlaceholderPage
      title="Global Forwarding"
      description="Air, ocean, road, and rail forwarding across global corridors."
      relatedLinks={[{ label: "Go to Forwarding Services", href: "/services/forwarding" }]}
    />
  );
}

