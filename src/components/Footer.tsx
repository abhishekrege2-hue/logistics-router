"use client";

import { Facebook, Instagram, Linkedin, Youtube } from "lucide-react";
import { BRAND_NAME } from "@/lib/brand";

const quickLinks = [
  "Customer Service",
  "Customer Portal Logins",
  "Developer Portal",
  "Get a Quote",
  "Request a Business Account",
  "For Your Business",
  "Shipping Guidance",
];

const divisions = [
  "Express",
  "Global Forwarding",
  "Supply Chain",
  "Other Global Divisions",
];

const sectors = [
  "Auto-Mobility",
  "Energy",
  "Engineering & Manufacturing",
  "Life Sciences & Healthcare",
  "Retail & Fashion",
  "Technology",
];

const companyInfo = [
  "About Us",
  "Delivered",
  "Careers",
  "Press Center",
  "Investors",
  "Sustainability",
  "CSR Policy in India",
  "Innovation",
  "Events",
  "Brand Partnerships",
];

const legal = [
  "Fraud Awareness",
  "Legal Notice",
  "Terms of Use",
  "Privacy Notes",
  "Additional Info",
  "Cookie Settings",
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
                <a key={item} href="#" className="footer-link text-sm">
                  {item}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="mb-6 font-bold text-white">Our Divisions</h4>
            <div className="flex flex-col space-y-3">
              {divisions.map((item) => (
                <a key={item} href="#" className="footer-link text-sm">
                  {item}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="mb-6 font-bold text-white">Industry Sectors</h4>
            <div className="flex flex-col space-y-3">
              {sectors.map((item) => (
                <a key={item} href="#" className="footer-link text-sm">
                  {item}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="mb-6 font-bold text-white">Company Info</h4>
            <div className="flex flex-col space-y-3">
              {companyInfo.map((item) => (
                <a key={item} href="#" className="footer-link text-sm">
                  {item}
                </a>
              ))}
            </div>
          </div>

          <div className="md:col-span-1">
            <h4 className="mb-6 font-bold text-white">Follow Us</h4>
            <div className="flex flex-col space-y-3">
              <div className="flex flex-wrap gap-4">
                <a href="#" aria-label="YouTube" className="footer-link">
                  <Youtube className="h-5 w-5" />
                </a>
                <a href="#" aria-label="Facebook" className="footer-link">
                  <Facebook className="h-5 w-5" />
                </a>
                <a href="#" aria-label="LinkedIn" className="footer-link">
                  <Linkedin className="h-5 w-5" />
                </a>
                <a href="#" aria-label="Instagram" className="footer-link">
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
                <a key={item} href="#" className="footer-link">
                  {item}
                </a>
              ))}
            </div>
            <p className="text-sm text-white">
              © 2026 {BRAND_NAME} - All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
