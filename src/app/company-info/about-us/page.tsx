import type { Metadata } from "next";
import { BRAND_NAME } from "@/lib/brand";
import { PlaceholderPage } from "@/components/footer-pages/PlaceholderPage";

export const metadata: Metadata = {
  title: `About Us | ${BRAND_NAME}`,
  description: `Company overview for ${BRAND_NAME}.`,
};

export default function Page() {
  return <PlaceholderPage title="About Us" description="Company overview and operating model." />;
}

