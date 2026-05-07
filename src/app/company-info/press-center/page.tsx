import type { Metadata } from "next";
import { BRAND_NAME } from "@/lib/brand";
import { PlaceholderPage } from "@/components/footer-pages/PlaceholderPage";

export const metadata: Metadata = {
  title: `Press Center | ${BRAND_NAME}`,
  description: `Press and media resources for ${BRAND_NAME}.`,
};

export default function Page() {
  return <PlaceholderPage title="Press Center" description="Newsroom, media contacts, and press kits." />;
}

