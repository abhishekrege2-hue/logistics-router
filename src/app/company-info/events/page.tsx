import type { Metadata } from "next";
import { BRAND_NAME } from "@/lib/brand";
import { PlaceholderPage } from "@/components/footer-pages/PlaceholderPage";

export const metadata: Metadata = {
  title: `Events | ${BRAND_NAME}`,
  description: `Events and webinars by ${BRAND_NAME}.`,
};

export default function Page() {
  return <PlaceholderPage title="Events" description="Upcoming events, webinars, and community sessions." />;
}

