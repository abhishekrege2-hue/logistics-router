"use client";

import { BrainCircuit, Leaf, TrendingUp } from "lucide-react";
import { Card } from "@/components/ui/Card";
import type { Shipment } from "@/lib/shipments";

interface SupplyChainAdvisorProps {
  latestShipment?: Shipment;
}

export function SupplyChainAdvisor({
  latestShipment,
}: SupplyChainAdvisorProps) {
  const insight = latestShipment
    ? `Route optimized for 12% lower carbon emissions based on current traffic patterns in ${latestShipment.origin.city}.`
    : "Run a route simulation to receive AI advisory insights.";

  return (
    <Card className="p-5">
      <div className="flex items-center gap-2">
        <BrainCircuit
          className="h-5 w-5"
          style={{ color: "var(--color-accent)" }}
        />
        <h3
          className="text-sm font-semibold uppercase tracking-[0.14em]"
          style={{ color: "var(--color-primary)" }}
        >
          Supply Chain Advisor
        </h3>
      </div>
      <div
        className="mt-4 rounded-lg border p-4"
        style={{
          borderColor: "var(--color-border)",
          backgroundColor: "var(--color-bg)",
        }}
      >
        <p
          className="text-2xl font-bold"
          style={{ color: "var(--color-primary)" }}
        >
          9.5/10
        </p>
        <p
          className="mt-2 text-sm"
          style={{ color: "var(--color-text-secondary)" }}
        >
          {insight}
        </p>
      </div>
      <div
        className="mt-4 grid grid-cols-2 gap-3 text-xs"
        style={{ color: "var(--color-text-secondary)" }}
      >
        <div
          className="rounded-lg border p-3"
          style={{
            borderColor: "var(--color-border)",
            backgroundColor: "var(--color-surface)",
          }}
        >
          <Leaf
            className="mb-2 h-4 w-4"
            style={{ color: "var(--color-accent)" }}
          />
          Sustainability score improving
        </div>
        <div
          className="rounded-lg border p-3"
          style={{
            borderColor: "var(--color-border)",
            backgroundColor: "var(--color-surface)",
          }}
        >
          <TrendingUp
            className="mb-2 h-4 w-4"
            style={{ color: "var(--color-primary)" }}
          />
          ETA confidence at 92%
        </div>
      </div>
    </Card>
  );
}
