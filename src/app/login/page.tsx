import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { BRAND_NAME } from "@/lib/brand";

export const metadata: Metadata = {
  title: `Login | ${BRAND_NAME}`,
  description: `Sign in to ${BRAND_NAME}.`,
};

export default function LoginRedirectPage() {
  redirect("/auth");
}
