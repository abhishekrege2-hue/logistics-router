"use client";

import { useMemo, useState } from "react";
import {
  BadgeCheck,
  Building2,
  Headset,
  PackageSearch,
  Plane,
  Ship,
  Truck,
} from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { BRAND_NAME } from "@/lib/brand";

export function MarketingSections() {
  const [trackingId, setTrackingId] = useState("");

  const division = useMemo(() => {
    if (!trackingId.trim()) return "";
    const value = trackingId.trim().toUpperCase();
    if (value.startsWith("EX") || value.includes("X")) return "Express";
    if (value.startsWith("GF") || value.includes("F"))
      return "Global Forwarding";
    return "Supply Chain";
  }, [trackingId]);

  return (
    <>
      <section
        id="customer-service"
        className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8"
      >
        <Card className="p-8">
          <div className="text-center">
            <h2
              className="text-3xl font-semibold"
              style={{ color: "var(--color-primary)" }}
            >
              Find the Right Contact
            </h2>
            <p
              className="mt-2"
              style={{ color: "var(--color-text-secondary)" }}
            >
              Enter your tracking number and our AI will route you to the
              correct support division.
            </p>
          </div>
          <div className="mx-auto mt-8 flex max-w-3xl flex-col gap-3 md:flex-row">
            <input
              value={trackingId}
              onChange={(e) => setTrackingId(e.target.value)}
              placeholder="Enter tracking number"
              className="input-control min-h-[52px] w-full px-5 py-4 text-base"
            />
            <Button className="min-w-28 min-h-[52px]">Enter</Button>
          </div>
          {division && (
            <p
              className="mt-4 text-center text-sm"
              style={{ color: "var(--color-text-secondary)" }}
            >
              Routed to:{" "}
              <span
                className="font-semibold"
                style={{ color: "var(--color-accent)" }}
              >
                {division}
              </span>{" "}
              division
            </p>
          )}
        </Card>
      </section>

      <section
        id="enterprise-logistics"
        className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8"
      >
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
          <Card className="p-8">
            <div className="flex items-center gap-2">
              <Building2
                className="h-5 w-5"
                style={{ color: "var(--color-accent)" }}
              />
              <h3
                className="text-2xl font-semibold"
                style={{ color: "var(--color-primary)" }}
              >
                Supply Chain Division
              </h3>
            </div>
            <p
              className="mt-3"
              style={{ color: "var(--color-text-secondary)" }}
            >
              Outsourced Logistics (3PL) and custom solutions for
              enterprise-size organizations requiring procurement-to-last-mile
              optimization.
            </p>
            <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
              <div
                className="rounded-lg border p-4"
                style={{
                  borderColor: "var(--color-border)",
                  backgroundColor: "var(--color-bg)",
                }}
              >
                <Truck
                  className="h-5 w-5"
                  style={{ color: "var(--color-primary)" }}
                />
                <p
                  className="mt-2 text-sm font-semibold"
                  style={{ color: "var(--color-text-primary)" }}
                >
                  Domestic 3PL
                </p>
              </div>
              <div
                className="rounded-lg border p-4"
                style={{
                  borderColor: "var(--color-border)",
                  backgroundColor: "var(--color-bg)",
                }}
              >
                <Plane
                  className="h-5 w-5"
                  style={{ color: "var(--color-primary)" }}
                />
                <p
                  className="mt-2 text-sm font-semibold"
                  style={{ color: "var(--color-text-primary)" }}
                >
                  Air Freight
                </p>
              </div>
              <div
                className="rounded-lg border p-4"
                style={{
                  borderColor: "var(--color-border)",
                  backgroundColor: "var(--color-bg)",
                }}
              >
                <Ship
                  className="h-5 w-5"
                  style={{ color: "var(--color-primary)" }}
                />
                <p
                  className="mt-2 text-sm font-semibold"
                  style={{ color: "var(--color-text-primary)" }}
                >
                  Ocean Freight
                </p>
              </div>
            </div>
          </Card>
          <Card className="p-6">
            <p
              className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold"
              style={{
                borderColor: "var(--color-border)",
                color: "var(--color-primary)",
              }}
            >
              <BadgeCheck
                className="h-3.5 w-3.5"
                style={{ color: "var(--color-accent)" }}
              />
              AI Fit
            </p>
            <p
              className="mt-4 text-sm"
              style={{ color: "var(--color-text-secondary)" }}
            >
              Let our Agentic Orchestrator find your perfect supply chain fit.
            </p>
            <div
              className="mt-5 space-y-3 text-xs"
              style={{ color: "var(--color-text-secondary)" }}
            >
              <p>- Recommended service mix based on order profile</p>
              <p>- Multi-carrier risk balancing</p>
              <p>- Lead-time and emissions trade-off simulations</p>
            </div>
          </Card>
        </div>
      </section>

      <section
        id="contact"
        className="mx-auto max-w-7xl px-4 pb-12 pt-2 sm:px-6 lg:px-8"
      >
        <Card className="p-6 sm:p-8">
          <div className="flex items-center gap-2">
            <Headset
              className="h-5 w-5"
              style={{ color: "var(--color-accent)" }}
            />
            <h2
              className="text-xl font-semibold"
              style={{ color: "var(--color-primary)" }}
            >
              Customer Service Command Center
            </h2>
          </div>
          <p
            className="mt-2 text-sm"
            style={{ color: "var(--color-text-secondary)" }}
          >
            Dedicated support for express, forwarding, and supply chain
            operations.
          </p>
          <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            <div
              className="rounded-lg border p-4 text-sm"
              style={{
                borderColor: "var(--color-border)",
                backgroundColor: "var(--color-bg)",
                color: "var(--color-text-primary)",
              }}
            >
              <PackageSearch
                className="mb-2 h-4 w-4"
                style={{ color: "var(--color-accent)" }}
              />
              Shipment exception escalation
            </div>
            <div
              className="rounded-lg border p-4 text-sm"
              style={{
                borderColor: "var(--color-border)",
                backgroundColor: "var(--color-bg)",
                color: "var(--color-text-primary)",
              }}
            >
              <Truck
                className="mb-2 h-4 w-4"
                style={{ color: "var(--color-accent)" }}
              />
              Fleet and routing operational support
            </div>
            <div
              className="rounded-lg border p-4 text-sm"
              style={{
                borderColor: "var(--color-border)",
                backgroundColor: "var(--color-bg)",
                color: "var(--color-text-primary)",
              }}
            >
              <Headset
                className="mb-2 h-4 w-4"
                style={{ color: "var(--color-accent)" }}
              />
              Enterprise account assistance
            </div>
          </div>
        </Card>
      </section>

      <footer
        className="border-t"
        style={{
          borderColor: "var(--color-border)",
          backgroundColor: "var(--color-surface)",
        }}
      >
        <div
          className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-6 text-sm md:flex-row md:items-center md:justify-between sm:px-6 lg:px-8"
          style={{ color: "var(--color-text-secondary)" }}
        >
          <p className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span
                className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-80"
                style={{ backgroundColor: "var(--color-success)" }}
              />
              <span
                className="relative inline-flex h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: "var(--color-success)" }}
              />
            </span>
            All Systems Operational
          </p>
          <p>
            {BRAND_NAME} — Agentic Supply Chain Orchestrator · Tier-1 logistics
            cloud
          </p>
        </div>
      </footer>
    </>
  );
}
