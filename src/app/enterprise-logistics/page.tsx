import type { Metadata } from "next";
import { ComingSoonPage } from "@/components/pages/ComingSoonPage";
import { BRAND_NAME } from "@/lib/brand";

export const metadata: Metadata = {
  title: `Enterprise Logistics | ${BRAND_NAME}`,
  description: `Supply chain and 3PL solutions from ${BRAND_NAME}.`,
};

export default function EnterpriseLogisticsPage() {
  return (
    <ComingSoonPage
      title="Enterprise Logistics"
      description="Contract logistics, warehousing, and control-tower orchestration for large shippers."
    />
  );
}
