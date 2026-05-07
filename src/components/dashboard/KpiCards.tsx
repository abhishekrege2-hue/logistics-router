"use client";

import { Activity, AlertOctagon, Boxes, Timer } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";

export type KpiCardsProps = {
  totalActiveShipments: number;
  daysOfInventoryOutstanding: number;
  demurrageAlerts: number;
  onTimeDeliveryRate: number; // 0..1
};

function formatPct(x: number) {
  return `${Math.round(x * 1000) / 10}%`;
}

export function KpiCards(props: KpiCardsProps) {
  const kpis = [
    {
      label: "Total Active Shipments",
      value: props.totalActiveShipments.toLocaleString(),
      icon: Boxes,
      hint: "Live shipments across all modes",
    },
    {
      label: "Days of Inventory Outstanding (DIO)",
      value: props.daysOfInventoryOutstanding.toFixed(1),
      icon: Timer,
      hint: "Inventory-to-sales efficiency",
    },
    {
      label: "Demurrage Alerts",
      value: props.demurrageAlerts.toLocaleString(),
      icon: AlertOctagon,
      hint: "Port/terminal cost exposure",
    },
    {
      label: "On-time Delivery",
      value: formatPct(props.onTimeDeliveryRate),
      icon: Activity,
      hint: "Target: 98%+",
    },
  ] as const;

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {kpis.map((k) => (
        <Card key={k.label}>
          <CardHeader className="flex-row items-center justify-between gap-3">
            <CardTitle>{k.label}</CardTitle>
            <k.icon className="h-4 w-4 text-slate-500 dark:text-slate-300" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">{k.value}</p>
            <p className="mt-1 text-xs text-slate-600 dark:text-slate-300">{k.hint}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

