import type { Metadata } from "next";
import EnterpriseLogisticsPage from "@/app/enterprise-logistics/page";
import { BRAND_NAME } from "@/lib/brand";

export const metadata: Metadata = {
  title: `Enterprise | ${BRAND_NAME}`,
  description: `Enterprise logistics capabilities from ${BRAND_NAME}.`,
};

export default function EnterprisePage() {
  return <EnterpriseLogisticsPage />;
}
