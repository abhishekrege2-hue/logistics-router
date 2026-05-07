import type { Metadata } from "next";
import { BRAND_NAME } from "@/lib/brand";
import { PlaceholderPage } from "@/components/footer-pages/PlaceholderPage";

export const metadata: Metadata = {
  title: `Investors | ${BRAND_NAME}`,
  description: `Investor relations for ${BRAND_NAME}.`,
};

export default function Page() {
  return <PlaceholderPage title="Investors" description="Investor relations and financial disclosures." />;
}

