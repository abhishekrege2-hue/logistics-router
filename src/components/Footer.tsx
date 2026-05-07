"use client";

import { Facebook, Instagram, Linkedin, Youtube } from "lucide-react";
import Link from "next/link";
import { BRAND_NAME } from "@/lib/brand";

const quickLinks: Array<{ label: string; href: string }> = [
  { label: "Customer Service", href: "/customer-service" },
  { label: "Customer Portal Logins", href: "/customer-portal" },
  { label: "Developer Portal", href: "/developer-portal" },
  { label: "Get a Quote", href: "/get-a-quote" },
  { label: "Request a Business Account", href: "/business-account" },
  { label: "For Your Business", href: "/for-your-business" },
  { label: "Shipping Guidance", href: "/shipping-guidance" },
];

const divisions: Array<{ label: string; href: string }> = [
  { label: "Express", href: "/services/express" },
  { label: "Global Forwarding", href: "/services/forwarding" },
  { label: "Supply Chain", href: "/services/3pl" },
  { label: "Other Global Divisions", href: "/divisions" },
];

const sectors: Array<{ label: string; href: string }> = [
  { label: "Auto-Mobility", href: "/sectors/auto-mobility" },
  { label: "Energy", href: "/sectors/energy" },
  { label: "Engineering & Manufacturing", href: "/sectors/engineering-manufacturing" },
  { label: "Life Sciences & Healthcare", href: "/sectors/life-sciences-healthcare" },
  { label: "Retail & Fashion", href: "/sectors/retail-fashion" },
  { label: "Technology", href: "/sectors/technology" },
];

const companyInfo: Array<{ label: string; href: string }> = [
  { label: "About Us", href: "/about" },
  { label: "Delivered", href: "/delivered" },
  { label: "Careers", href: "/careers" },
  { label: "Press Center", href: "/press-center" },
  { label: "Investors", href: "/investors" },
  { label: "Sustainability", href: "/sustainability" },
  { label: "CSR Policy in India", href: "/csr-india" },
  { label: "Innovation", href: "/innovation" },
  { label: "Events", href: "/events" },
  { label: "Brand Partnerships", href: "/brand-partnerships" },
];

const legal: Array<{ label: string; href: string }> = [
  { label: "Fraud Awareness", href: "/fraud-awareness" },
  { label: "Legal Notice", href: "/legal" },
  { label: "Terms of Use", href: "/terms" },
  { label: "Privacy Notes", href: "/privacy" },
  { label: "Additional Info", href: "/additional-info" },
  { label: "Cookie Settings", href: "/cookie-settings" },
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
