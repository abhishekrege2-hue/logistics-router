import type { Metadata } from "next";
import { BRAND_NAME } from "@/lib/brand";
import { PlaceholderPage } from "@/components/footer-pages/PlaceholderPage";

export const metadata: Metadata = {
  title: `Other Global Divisions | ${BRAND_NAME}`,
  description: `Additional global divisions for ${BRAND_NAME}.`,
};

export default function Page() {
  return (
    <PlaceholderPage
      title="Other Global Divisions"
      description="Scaffold landing page for additional divisions and specialized offerings."
      relatedLinks={[{ label: "Divisions overview", href: "/divisions" }]}
    />
  );
}

