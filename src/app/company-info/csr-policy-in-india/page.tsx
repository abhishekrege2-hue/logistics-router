import type { Metadata } from "next";
import { BRAND_NAME } from "@/lib/brand";
import { PlaceholderPage } from "@/components/footer-pages/PlaceholderPage";

export const metadata: Metadata = {
  title: `CSR Policy in India | ${BRAND_NAME}`,
  description: `CSR policy and disclosures for ${BRAND_NAME} in India.`,
};

export default function Page() {
  return <PlaceholderPage title="CSR Policy in India" description="Corporate social responsibility policy and India-specific disclosures." />;
}

