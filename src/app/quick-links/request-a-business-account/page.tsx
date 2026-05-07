import type { Metadata } from "next";
import { BRAND_NAME } from "@/lib/brand";
import { PlaceholderPage } from "@/components/footer-pages/PlaceholderPage";

export const metadata: Metadata = {
  title: `Request a Business Account | ${BRAND_NAME}`,
  description: `Enterprise account request entry point for ${BRAND_NAME}.`,
};

export default function Page() {
  return (
    <PlaceholderPage
      title="Request a Business Account"
      description="Apply for enterprise terms, invoicing, and contract logistics access."
      relatedLinks={[{ label: "Go to Business Account form", href: "/business-account" }]}
    />
  );
}

