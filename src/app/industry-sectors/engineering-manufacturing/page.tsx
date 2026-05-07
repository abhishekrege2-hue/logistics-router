import type { Metadata } from "next";
import { BRAND_NAME } from "@/lib/brand";
import { PlaceholderPage } from "@/components/footer-pages/PlaceholderPage";

export const metadata: Metadata = {
  title: `Engineering & Manufacturing | ${BRAND_NAME}`,
  description: `Sector solutions for Engineering & Manufacturing by ${BRAND_NAME}.`,
};

export default function Page() {
  return (
    <PlaceholderPage
      title="Engineering & Manufacturing"
      description="Complex BOM flows, supplier orchestration, and multi-modal execution visibility."
    />
  );
}

