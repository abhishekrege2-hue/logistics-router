"use client";

import type { ShipmentProjection } from "@/lib/types/logistics-ledger";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";

function statusVariant(status: string): "default" | "success" | "warning" | "danger" | "info" {
  const s = status.toLowerCase();
  if (s.includes("deliver")) return "success";
  if (s.includes("risk") || s.includes("demurrage")) return "warning";
  if (s.includes("delay") || s.includes("hold")) return "danger";
  if (s.includes("customs")) return "info";
  return "default";
}

export function ShipmentTable({ items }: { items: ShipmentProjection[] }) {
  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between gap-3">
        <CardTitle>Active Shipments</CardTitle>
        <p className="text-xs text-slate-600 dark:text-slate-300">{items.length} visible</p>
      </CardHeader>
      <CardContent>
        <div className="overflow-auto rounded-lg border border-slate-200 dark:border-slate-800">
          <table className="min-w-[60rem] w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-700 dark:bg-slate-900 dark:text-slate-200">
              <tr>
                <th className="px-3 py-2 font-semibold">Reference</th>
                <th className="px-3 py-2 font-semibold">Route</th>
                <th className="px-3 py-2 font-semibold">Mode</th>
                <th className="px-3 py-2 font-semibold">Incoterm</th>
                <th className="px-3 py-2 font-semibold">ETA</th>
                <th className="px-3 py-2 font-semibold">Status</th>
                <th className="px-3 py-2 font-semibold">Risk</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white dark:divide-slate-800 dark:bg-slate-950">
              {items.slice(0, 50).map((s) => (
                <tr key={s.shipment_id} className="hover:bg-slate-50/70 dark:hover:bg-slate-900/40">
                  <td className="px-3 py-2 font-semibold text-slate-900 dark:text-slate-100">{s.reference}</td>
                  <td className="px-3 py-2 text-slate-700 dark:text-slate-200">
                    {(s.origin ?? "—")} &rarr; {(s.destination ?? "—")}
                  </td>
                  <td className="px-3 py-2 text-slate-700 dark:text-slate-200">{s.mode ?? "—"}</td>
                  <td className="px-3 py-2 text-slate-700 dark:text-slate-200">{s.incoterm ?? "—"}</td>
                  <td className="px-3 py-2 text-slate-700 dark:text-slate-200">{s.eta_date ?? "—"}</td>
                  <td className="px-3 py-2">
                    <Badge variant={statusVariant(s.status)}>{s.status}</Badge>
                  </td>
                  <td className="px-3 py-2">
                    <Badge variant={s.demurrage_risk ? "warning" : "success"}>
                      {s.demurrage_risk ? "Demurrage risk" : "Clear"}
                    </Badge>
                  </td>
                </tr>
              ))}
              {items.length === 0 && (
                <tr>
                  <td className="px-3 py-8 text-center text-slate-600 dark:text-slate-300" colSpan={7}>
                    No shipments available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}

