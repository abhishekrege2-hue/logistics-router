import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import { GetAQuoteContent } from "@/components/get-a-quote/GetAQuoteContent";
import { BRAND_NAME } from "@/lib/brand";

export const metadata: Metadata = {
  title: `Get a Quote | ${BRAND_NAME}`,
  description: `AI-backed routing and pricing estimates from ${BRAND_NAME}.`,
};

export default function GetAQuotePage() {
  return (
    <PageShell>
      <GetAQuoteContent />
    </PageShell>
  );
}
