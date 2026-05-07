import type { Metadata } from "next";
import { BRAND_NAME } from "@/lib/brand";
import { PlaceholderPage } from "@/components/footer-pages/PlaceholderPage";

export const metadata: Metadata = {
  title: `Cookie Settings | ${BRAND_NAME}`,
  description: `Cookie settings for ${BRAND_NAME}.`,
};

export default function Page() {
  return <PlaceholderPage title="Cookie Settings" description="Cookie preferences and consent settings." />;
}

