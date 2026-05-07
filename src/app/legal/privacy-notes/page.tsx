import type { Metadata } from "next";
import { BRAND_NAME } from "@/lib/brand";
import { PlaceholderPage } from "@/components/footer-pages/PlaceholderPage";

export const metadata: Metadata = {
  title: `Privacy Notes | ${BRAND_NAME}`,
  description: `Privacy notes for ${BRAND_NAME}.`,
};

export default function Page() {
  return <PlaceholderPage title="Privacy Notes" description="Privacy policy, data processing, and retention notes." />;
}

