import type { Metadata } from "next";
import { BRAND_NAME } from "@/lib/brand";
import { PlaceholderPage } from "@/components/footer-pages/PlaceholderPage";

export const metadata: Metadata = {
  title: `Terms of Use | ${BRAND_NAME}`,
  description: `Terms of use for ${BRAND_NAME}.`,
};

export default function Page() {
  return <PlaceholderPage title="Terms of Use" description="Platform terms of use and service conditions." />;
}

