import type { Metadata } from "next";
import { BRAND_NAME } from "@/lib/brand";
import { PlaceholderPage } from "@/components/footer-pages/PlaceholderPage";

export const metadata: Metadata = {
  title: `Additional Info | ${BRAND_NAME}`,
  description: `Additional information for ${BRAND_NAME}.`,
};

export default function Page() {
  return <PlaceholderPage title="Additional Info" description="Additional disclosures and informational resources." />;
}

