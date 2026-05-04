import type { Metadata } from "next";
import { ComingSoonPage } from "@/components/pages/ComingSoonPage";
import { BRAND_NAME } from "@/lib/brand";

export const metadata: Metadata = {
  title: `Request a Business Account | ${BRAND_NAME}`,
  description: `Enterprise shipping accounts with ${BRAND_NAME}.`,
};

export default function BusinessAccountPage() {
  return (
    <ComingSoonPage
      title="Request a Business Account"
      description="Scale with consolidated billing, APIs, and dedicated operations support."
    />
  );
}
