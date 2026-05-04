import type { ReactNode } from "react";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

export function PageShell({ children }: { children: ReactNode }) {
  return (
    <div
      className="min-h-screen"
      style={{
        backgroundColor: "var(--color-bg)",
        color: "var(--color-text-primary)",
      }}
    >
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
