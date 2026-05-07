import type { Metadata } from "next";
import { BRAND_NAME } from "@/lib/brand";
import { PlaceholderPage } from "@/components/footer-pages/PlaceholderPage";

export const metadata: Metadata = {
  title: `Delivered | ${BRAND_NAME}`,
  description: `Customer outcomes for ${BRAND_NAME}.`,
};

export default function Page() {
  return <PlaceholderPage title="Delivered" description="Customer stories, results, and platform outcomes." />;
}

