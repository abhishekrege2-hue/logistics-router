import type { Metadata } from "next";
import { BRAND_NAME } from "@/lib/brand";
import { PlaceholderPage } from "@/components/footer-pages/PlaceholderPage";

export const metadata: Metadata = {
  title: `Supply Chain | ${BRAND_NAME}`,
  description: `Supply chain division entry for ${BRAND_NAME}.`,
};

export default function Page() {
  return (
    <PlaceholderPage
      title="Supply Chain"
      description="Contract logistics, warehousing, and 3PL orchestration."
      relatedLinks={[{ label: "Go to 3PL Services", href: "/services/3pl" }]}
    />
  );
}

