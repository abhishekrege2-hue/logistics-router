import type { Metadata } from "next";
import { BRAND_NAME } from "@/lib/brand";
import { PlaceholderPage } from "@/components/footer-pages/PlaceholderPage";

export const metadata: Metadata = {
  title: `Careers | ${BRAND_NAME}`,
  description: `Careers at ${BRAND_NAME}.`,
};

export default function Page() {
  return <PlaceholderPage title="Careers" description="Join Meridian SCM. Open roles and hiring information." />;
}

