import type { Metadata } from "next";
import { BRAND_NAME } from "@/lib/brand";
import { PlaceholderPage } from "@/components/footer-pages/PlaceholderPage";

export const metadata: Metadata = {
  title: `Energy | ${BRAND_NAME}`,
  description: `Sector solutions for Energy by ${BRAND_NAME}.`,
};

export default function Page() {
  return (
    <PlaceholderPage
      title="Energy"
      description="Project logistics, compliance gates, and critical spares readiness for the energy sector."
    />
  );
}

