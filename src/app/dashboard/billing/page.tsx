"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { isAuthenticated } from "@/lib/auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

type TxStatus = "paid" | "pending" | "disputed";

type TransactionRow = {
  id: string;
  shipmentReference: string;
  amount: number;
  currency: string;
  status: TxStatus;
  createdAt: string;
};

function statusVariant(s: TxStatus): "success" | "warning" | "danger" | "default" {
  if (s === "paid") return "success";
  if (s === "pending") return "warning";
  if (s === "disputed") return "danger";
  return "default";
}

export default function BillingDashboardPage() {
  const router = useRouter();
  const authenticated = isAuthenticated();
  const now = new Date();
  const items: TransactionRow[] = authenticated
    ? [
        {
          id: "tx_001",
          shipmentReference: "Mumbai → Rotterdam",
          amount: 3942.18,
          currency: "USD",
          status: "paid",
          createdAt: now.toISOString(),
        },
        {
          id: "tx_002",
          shipmentReference: "Pune → Copenhagen",
          amount: 1820.44,
          currency: "USD",
          status: "pending",
          createdAt: new Date(now.getTime() - 86400000).toISOString(),
        },
        {
          id: "tx_003",
          shipmentReference: "Shanghai → Los Angeles",
          amount: 6220.0,
          currency: "USD",
          status: "disputed",
          createdAt: new Date(now.getTime() - 3 * 86400000).toISOString(),
        },
      ]
    : [];

  useEffect(() => {
    if (!authenticated) router.replace("/auth");
  }, [authenticated, router]);

  if (!authenticated) return null;

  return (
    <div className="min-h-screen bg-[color:var(--color-bg)]">
      <Header />
      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-[color:var(--color-primary)]">Billing &amp; Payments</h1>
            <p className="mt-1 text-sm font-medium text-[color:var(--color-text-secondary)]">
              View transaction history and manage payment profile.
            </p>
          </div>
          <Link href="/checkout" className="text-sm font-semibold underline">
            Start a checkout &rarr;
          </Link>
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-3">
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle>Payment Profile</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-2 text-sm">
                <p className="text-slate-700">
                  Vaulted cards are enabled via Stripe Payment Intents with configurable <span className="font-mono">setup_future_usage</span>.
                </p>
                <div className="rounded-lg border border-slate-200 bg-slate-50 p-3 text-xs text-slate-700">
                  Scaffold: Wire this to a Stripe Customer + PaymentMethods list once Supabase Auth user mapping is in place.
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="lg:col-span-2">
            <CardHeader className="flex-row items-center justify-between gap-3">
              <CardTitle>Transactions</CardTitle>
              <p className="text-xs text-slate-600">{items.length} visible</p>
            </CardHeader>
            <CardContent>
              <div className="overflow-auto rounded-lg border border-slate-200 dark:border-slate-800">
                <table className="min-w-[50rem] w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-700 dark:bg-slate-900 dark:text-slate-200">
                    <tr>
                      <th className="px-3 py-2 font-semibold">Transaction</th>
                      <th className="px-3 py-2 font-semibold">Shipment</th>
                      <th className="px-3 py-2 font-semibold">Amount</th>
                      <th className="px-3 py-2 font-semibold">Status</th>
                      <th className="px-3 py-2 font-semibold">Created</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 bg-white dark:divide-slate-800 dark:bg-slate-950">
                    {items.map((t) => (
                      <tr key={t.id} className="hover:bg-slate-50/70 dark:hover:bg-slate-900/40">
                        <td className="px-3 py-2 font-semibold text-slate-900">{t.id}</td>
                        <td className="px-3 py-2 text-slate-700">{t.shipmentReference}</td>
                        <td className="px-3 py-2 text-slate-700">
                          {t.currency} {t.amount.toFixed(2)}
                        </td>
                        <td className="px-3 py-2">
                          <Badge variant={statusVariant(t.status)}>{t.status}</Badge>
                        </td>
                        <td className="px-3 py-2 text-slate-700">{new Date(t.createdAt).toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}

