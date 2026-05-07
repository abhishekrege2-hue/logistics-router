"use client";

import { Facebook, Instagram, Linkedin, Youtube } from "lucide-react";
import Link from "next/link";
import { BRAND_NAME } from "@/lib/brand";

const quickLinks: Array<{ label: string; href: string }> = [
  { label: "Customer Service", href: "/quick-links/customer-service" },
  { label: "Customer Portal Logins", href: "/quick-links/customer-portal-logins" },
  { label: "Developer Portal", href: "/quick-links/developer-portal" },
  { label: "Get a Quote", href: "/quick-links/get-a-quote" },
  { label: "Request a Business Account", href: "/quick-links/request-a-business-account" },
  { label: "For Your Business", href: "/quick-links/for-your-business" },
  { label: "Shipping Guidance", href: "/quick-links/shipping-guidance" },
];

const divisions: Array<{ label: string; href: string }> = [
  { label: "Express", href: "/divisions/express" },
  { label: "Global Forwarding", href: "/divisions/global-forwarding" },
  { label: "Supply Chain", href: "/divisions/supply-chain" },
  { label: "Other Global Divisions", href: "/divisions/other-global-divisions" },
];

const sectors: Array<{ label: string; href: string }> = [
  { label: "Auto-Mobility", href: "/industry-sectors/auto-mobility" },
  { label: "Energy", href: "/industry-sectors/energy" },
  { label: "Engineering & Manufacturing", href: "/industry-sectors/engineering-manufacturing" },
  { label: "Life Sciences & Healthcare", href: "/industry-sectors/life-sciences-healthcare" },
  { label: "Retail & Fashion", href: "/industry-sectors/retail-fashion" },
  { label: "Technology", href: "/industry-sectors/technology" },
];

const companyInfo: Array<{ label: string; href: string }> = [
  { label: "About Us", href: "/company-info/about-us" },
  { label: "Delivered", href: "/company-info/delivered" },
  { label: "Careers", href: "/company-info/careers" },
  { label: "Press Center", href: "/company-info/press-center" },
  { label: "Investors", href: "/company-info/investors" },
  { label: "Sustainability", href: "/company-info/sustainability" },
  { label: "CSR Policy in India", href: "/company-info/csr-policy-in-india" },
  { label: "Innovation", href: "/company-info/innovation" },
  { label: "Events", href: "/company-info/events" },
  { label: "Brand Partnerships", href: "/company-info/brand-partnerships" },
];

const legal: Array<{ label: string; href: string }> = [
  { label: "Fraud Awareness", href: "/legal/fraud-awareness" },
  { label: "Legal Notice", href: "/legal/legal-notice" },
  { label: "Terms of Use", href: "/legal/terms-of-use" },
  { label: "Privacy Notes", href: "/legal/privacy-notes" },
  { label: "Additional Info", href: "/legal/additional-info" },
  { label: "Cookie Settings", href: "/legal/cookie-settings" },
];

export function Footer() {
  return (
    <footer
      className="py-16"
      style={{
        backgroundColor: "var(--color-footer-bg)",
        color: "var(--color-footer-muted)",
      }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-5">
          <div>
            <h4 className="mb-6 font-bold text-white">Quick Links</h4>
            <div className="flex flex-col space-y-3">
              {quickLinks.map((item) => (
                <Link key={item.href} href={item.href} className="footer-link text-sm">
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="mb-6 font-bold text-white">Our Divisions</h4>
            <div className="flex flex-col space-y-3">
              {divisions.map((item) => (
                <Link key={item.href} href={item.href} className="footer-link text-sm">
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="mb-6 font-bold text-white">Industry Sectors</h4>
            <div className="flex flex-col space-y-3">
              {sectors.map((item) => (
                <Link key={item.href} href={item.href} className="footer-link text-sm">
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="mb-6 font-bold text-white">Company Info</h4>
            <div className="flex flex-col space-y-3">
              {companyInfo.map((item) => (
                <Link key={item.href} href={item.href} className="footer-link text-sm">
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="md:col-span-1">
            <h4 className="mb-6 font-bold text-white">Follow Us</h4>
            <div className="flex flex-col space-y-3">
              <div className="flex flex-wrap gap-4">
                <a href="https://www.youtube.com" target="_blank" rel="noreferrer" aria-label="YouTube" className="footer-link">
                  <Youtube className="h-5 w-5" />
                </a>
                <a href="https://www.facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook" className="footer-link">
                  <Facebook className="h-5 w-5" />
                </a>
                <a href="https://www.linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="footer-link">
                  <Linkedin className="h-5 w-5" />
                </a>
                <a href="https://www.instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram" className="footer-link">
                  <Instagram className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div
          className="mt-12 border-t pt-8"
          style={{
            borderColor:
              "color-mix(in srgb, var(--color-footer-muted) 35%, transparent)",
          }}
        >
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs">
              {legal.map((item) => (
                <Link key={item.href} href={item.href} className="footer-link">
                  {item.label}
                </Link>
              ))}
            </div>
            <p className="text-sm text-white">
              © 2026 {BRAND_NAME} | Developed by Abhishek Rege
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
