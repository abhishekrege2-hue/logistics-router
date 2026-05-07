"use client";

import { useEffect, useState } from "react";
import type { ProductPassport } from "@/lib/types/dpp";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/badge";

type DppQueryResponse = { passports: ProductPassport[] };

export function DppRegistry() {
  const [items, setItems] = useState<ProductPassport[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    fetch("/api/queries/dpp", { cache: "no-store" })
      .then((r) => r.json())
      .then((json: unknown) => {
        if (!active) return;
        const parsed = json as Partial<DppQueryResponse>;
        if (!parsed.passports) throw new Error("Invalid DPP response");
        setError(null);
        setItems(parsed.passports);
      })
      .catch((e: unknown) => {
        if (!active) return;
        setError(e instanceof Error ? e.message : "Failed to load DPP registry");
      });
    return () => {
      active = false;
    };
  }, []);

  return (
    <div className="grid gap-4">
      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-800">
          {error}
        </div>
      )}

      <Card>
        <CardHeader className="flex-row items-center justify-between gap-3">
          <CardTitle>EU Digital Product Passport Registry</CardTitle>
          <Badge variant="info">ESPR 2026 scaffold</Badge>
        </CardHeader>
        <CardContent>
          <div className="overflow-auto rounded-lg border border-slate-200 dark:border-slate-800">
            <table className="min-w-[60rem] w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-700 dark:bg-slate-900 dark:text-slate-200">
                <tr>
                  <th className="px-3 py-2 font-semibold">SKU</th>
                  <th className="px-3 py-2 font-semibold">Product</th>
                  <th className="px-3 py-2 font-semibold">Manufacturer</th>
                  <th className="px-3 py-2 font-semibold">Country</th>
                  <th className="px-3 py-2 font-semibold">Recycled %</th>
                  <th className="px-3 py-2 font-semibold">Scope 3 (kg CO2e)</th>
                  <th className="px-3 py-2 font-semibold">Repairability</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 bg-white dark:divide-slate-800 dark:bg-slate-950">
                {items.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-50/70 dark:hover:bg-slate-900/40">
                    <td className="px-3 py-2 font-semibold text-slate-900 dark:text-slate-100">
                      {p.product_sku}
                    </td>
                    <td className="px-3 py-2 text-slate-700 dark:text-slate-200">{p.product_name}</td>
                    <td className="px-3 py-2 text-slate-700 dark:text-slate-200">{p.manufacturer}</td>
                    <td className="px-3 py-2 text-slate-700 dark:text-slate-200">{p.manufacturing_country ?? "—"}</td>
                    <td className="px-3 py-2 text-slate-700 dark:text-slate-200">
                      {p.sustainability.recycledContentPercent ?? "—"}
                    </td>
                    <td className="px-3 py-2 text-slate-700 dark:text-slate-200">
                      {p.sustainability.scope3Co2eKg ?? "—"}
                    </td>
                    <td className="px-3 py-2">
                      <Badge variant="default">{p.sustainability.repairabilityScore ?? "—"}</Badge>
                    </td>
                  </tr>
                ))}
                {items.length === 0 && (
                  <tr>
                    <td className="px-3 py-8 text-center text-slate-600 dark:text-slate-300" colSpan={7}>
                      No passports available.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

