import type { Metadata } from "next";
import { BRAND_NAME } from "@/lib/brand";
import { PlaceholderPage } from "@/components/footer-pages/PlaceholderPage";

export const metadata: Metadata = {
  title: `Brand Partnerships | ${BRAND_NAME}`,
  description: `Brand partnerships for ${BRAND_NAME}.`,
};

export default function Page() {
  return <PlaceholderPage title="Brand Partnerships" description="Strategic partnerships and co-innovation programs." />;
}

