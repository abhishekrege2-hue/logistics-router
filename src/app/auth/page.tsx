import { AuthCard } from "@/components/AuthCard";
import { BRAND_NAME } from "@/lib/brand";

export const metadata = {
  title: `Login | ${BRAND_NAME}`,
  description: `Sign in or create an account to manage your logistics and routes with ${BRAND_NAME}.`,
};

export default function AuthPage() {
  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: "var(--color-bg)" }}
    >
      <div
        className="pointer-events-none fixed inset-0 opacity-40"
        style={{
          backgroundImage: `linear-gradient(to right, var(--color-border) 1px, transparent 1px), linear-gradient(to bottom, var(--color-border) 1px, transparent 1px)`,
          backgroundSize: "4rem 4rem",
        }}
        aria-hidden
      />
      <div className="relative flex min-h-screen flex-col items-center justify-center px-4 py-12">
        <AuthCard />
      </div>
    </div>
  );
}
