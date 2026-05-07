import type { Metadata } from "next";
import { BRAND_NAME } from "@/lib/brand";
import { PlaceholderPage } from "@/components/footer-pages/PlaceholderPage";

export const metadata: Metadata = {
  title: `Customer Portal Logins | ${BRAND_NAME}`,
  description: `Customer portal entry points for ${BRAND_NAME}.`,
};

export default function Page() {
  return (
    <PlaceholderPage
      title="Customer Portal Logins"
      description="Portal entry points for authenticated business users (operations, billing, and tracking)."
      relatedLinks={[
        { label: "Sign in / Sign up", href: "/auth" },
        { label: "Billing portal", href: "/dashboard/billing" },
      ]}
    />
  );
}

