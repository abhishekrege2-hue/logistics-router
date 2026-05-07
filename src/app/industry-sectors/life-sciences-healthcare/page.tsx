import type { Metadata } from "next";
import { BRAND_NAME } from "@/lib/brand";
import { PlaceholderPage } from "@/components/footer-pages/PlaceholderPage";

export const metadata: Metadata = {
  title: `Life Sciences & Healthcare | ${BRAND_NAME}`,
  description: `Sector solutions for Life Sciences & Healthcare by ${BRAND_NAME}.`,
};

export default function Page() {
  return (
    <PlaceholderPage
      title="Life Sciences & Healthcare"
      description="Cold-chain integrity monitoring, compliance workflows, and validated lane controls."
    />
  );
}

