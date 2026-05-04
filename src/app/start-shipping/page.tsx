import type { Metadata } from "next";
import { ComingSoonPage } from "@/components/pages/ComingSoonPage";
import { BRAND_NAME } from "@/lib/brand";

export const metadata: Metadata = {
  title: `Start Shipping | ${BRAND_NAME}`,
  description: `Start shipping with ${BRAND_NAME}.`,
};

export default function StartShippingPage() {
  return (
    <ComingSoonPage
      title="Start Shipping"
      description="Create labels, book pickups, and manage express shipments in one place."
    />
  );
}
