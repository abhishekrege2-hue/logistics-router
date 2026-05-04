import type { Metadata } from "next";
import { ComingSoonPage } from "@/components/pages/ComingSoonPage";
import { BRAND_NAME } from "@/lib/brand";

export const metadata: Metadata = {
  title: `Freight Service | ${BRAND_NAME}`,
  description: `Air, ocean, and multimodal freight with ${BRAND_NAME}.`,
};

export default function FreightServicePage() {
  return (
    <ComingSoonPage
      title="Freight Service"
      description="Cross-border freight, customs coordination, and end-to-end visibility."
    />
  );
}
