import type { Metadata } from "next";
import { BRAND_NAME } from "@/lib/brand";
import { PlaceholderPage } from "@/components/footer-pages/PlaceholderPage";

export const metadata: Metadata = {
  title: `Legal Notice | ${BRAND_NAME}`,
  description: `Legal notice for ${BRAND_NAME}.`,
};

export default function Page() {
  return <PlaceholderPage title="Legal Notice" description="Legal notices, jurisdiction, and disclaimers." />;
}

