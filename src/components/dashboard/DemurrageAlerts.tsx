"use client";

import { AlertTriangle } from "lucide-react";
import type { ShipmentProjection } from "@/lib/types/logistics-ledger";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/badge";

export function DemurrageAlerts({ items }: { items: ShipmentProjection[] }) {
  return (
    <Card className="border-amber-200/60 bg-amber-50/40 dark:border-amber-900/50 dark:bg-amber-950/30">
      <CardHeader className="flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-300" />
          <CardTitle>Demurrage &amp; Detention Alerts</CardTitle>
        </div>
        <Badge variant={items.length ? "warning" : "success"}>
          {items.length ? `${items.length} at risk` : "No active risk"}
        </Badge>
      </CardHeader>
      <CardContent>
        {items.length === 0 ? (
          <p className="text-xs text-slate-700 dark:text-slate-300">
            No shipments are currently flagged for demurrage risk.
          </p>
        ) : (
          <div className="grid gap-2">
            {items.slice(0, 5).map((s) => (
              <div
                key={s.shipment_id}
                className="flex items-center justify-between rounded-lg border border-amber-200/60 bg-white/70 px-3 py-2 text-xs dark:border-amber-900/40 dark:bg-slate-950/60"
              >
                <div className="min-w-0">
                  <p className="truncate font-semibold text-slate-900 dark:text-slate-100">{s.reference}</p>
                  <p className="truncate text-slate-600 dark:text-slate-300">
                    {(s.origin ?? "—")} &rarr; {(s.destination ?? "—")}
                  </p>
                </div>
                <Badge variant="warning">{s.status}</Badge>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

