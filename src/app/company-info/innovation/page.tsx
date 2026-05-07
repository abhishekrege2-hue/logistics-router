import type { Metadata } from "next";
import { BRAND_NAME } from "@/lib/brand";
import { PlaceholderPage } from "@/components/footer-pages/PlaceholderPage";

export const metadata: Metadata = {
  title: `Innovation | ${BRAND_NAME}`,
  description: `Innovation programs for ${BRAND_NAME}.`,
};

export default function Page() {
  return <PlaceholderPage title="Innovation" description="Innovation programs, AI routing, and product roadmap initiatives." />;
}

