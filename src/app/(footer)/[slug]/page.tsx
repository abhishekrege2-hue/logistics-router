import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BRAND_NAME } from "@/lib/brand";

const TITLES: Record<string, { title: string; description: string }> = {
  about: { title: "About Us", description: `Company overview for ${BRAND_NAME}.` },
  delivered: { title: "Delivered", description: `Customer stories and outcomes for ${BRAND_NAME}.` },
  careers: { title: "Careers", description: `Open roles and hiring at ${BRAND_NAME}.` },
  "press-center": { title: "Press Center", description: `Newsroom and media resources for ${BRAND_NAME}.` },
  investors: { title: "Investors", description: `Investor relations for ${BRAND_NAME}.` },
  sustainability: { title: "Sustainability", description: `Sustainability and ESG programs for ${BRAND_NAME}.` },
  "csr-india": { title: "CSR Policy in India", description: `CSR policy and disclosures for ${BRAND_NAME} India.` },
  innovation: { title: "Innovation", description: `Innovation programs and R&D for ${BRAND_NAME}.` },
  events: { title: "Events", description: `Events and webinars by ${BRAND_NAME}.` },
  "brand-partnerships": { title: "Brand Partnerships", description: `Partnership programs for ${BRAND_NAME}.` },
  "fraud-awareness": { title: "Fraud Awareness", description: `Fraud prevention guidance for ${BRAND_NAME}.` },
  legal: { title: "Legal Notice", description: `Legal notices for ${BRAND_NAME}.` },
  terms: { title: "Terms of Use", description: `Terms of use for ${BRAND_NAME}.` },
  privacy: { title: "Privacy Notes", description: `Privacy information for ${BRAND_NAME}.` },
  "additional-info": { title: "Additional Info", description: `Additional information and disclosures for ${BRAND_NAME}.` },
  "cookie-settings": { title: "Cookie Settings", description: `Cookie settings for ${BRAND_NAME}.` },
};

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const meta = TITLES[params.slug] ?? { title: params.slug, description: `Information page for ${BRAND_NAME}.` };
  return { title: `${meta.title} | ${BRAND_NAME}`, description: meta.description };
}

export default function FooterLandingPage({ params }: { params: { slug: string } }) {
  const meta = TITLES[params.slug] ?? { title: params.slug.replace(/-/g, " "), description: "" };
  return (
    <div className="min-h-screen bg-[color:var(--color-bg)]">
      <Header />
      <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-[color:var(--color-primary)]">{meta.title}</h1>
        <p className="mt-2 text-sm text-[color:var(--color-text-secondary)]">
          This is a scaffold page to ensure all global footer links resolve. Replace with production content as needed.
        </p>
      </main>
      <Footer />
    </div>
  );
}

