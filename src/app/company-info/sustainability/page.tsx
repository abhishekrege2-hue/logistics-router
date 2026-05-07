import type { Metadata } from "next";
import { BRAND_NAME } from "@/lib/brand";
import { PlaceholderPage } from "@/components/footer-pages/PlaceholderPage";

export const metadata: Metadata = {
  title: `Sustainability | ${BRAND_NAME}`,
  description: `Sustainability programs and reporting for ${BRAND_NAME}.`,
};

export default function Page() {
  return <PlaceholderPage title="Sustainability" description="Sustainability initiatives, GLEC/ISO 14083 reporting, and ESG programs." />;
}

