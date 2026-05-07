import type { Metadata } from "next";
import { BRAND_NAME } from "@/lib/brand";
import { PlaceholderPage } from "@/components/footer-pages/PlaceholderPage";

export const metadata: Metadata = {
  title: `Auto-Mobility | ${BRAND_NAME}`,
  description: `Sector solutions for Auto-Mobility by ${BRAND_NAME}.`,
};

export default function Page() {
  return (
    <PlaceholderPage
      title="Auto-Mobility"
      description="Automotive supply chain playbooks, just-in-sequence visibility, and exception management."
    />
  );
}

