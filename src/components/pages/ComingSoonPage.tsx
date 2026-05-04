import { PageShell } from "@/components/layout/PageShell";

interface ComingSoonPageProps {
  title: string;
  description?: string;
}

export function ComingSoonPage({ title, description }: ComingSoonPageProps) {
  return (
    <PageShell>
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <h1
          className="border-l-4 pl-4 text-3xl font-bold tracking-tight sm:text-4xl"
          style={{
            borderColor: "var(--color-accent)",
            color: "var(--color-primary)",
          }}
        >
          {title}
        </h1>
        {description && (
          <p
            className="mt-4 text-base"
            style={{ color: "var(--color-text-secondary)" }}
          >
            {description}
          </p>
        )}
        <div
          className="surface-card mt-10 rounded-lg border p-8 text-center"
          style={{ borderColor: "var(--color-border)" }}
        >
          <p
            className="text-lg font-semibold"
            style={{ color: "var(--color-text-primary)" }}
          >
            Coming Soon
          </p>
          <p
            className="mt-2 text-sm"
            style={{ color: "var(--color-text-secondary)" }}
          >
            Full feature launching shortly.
          </p>
        </div>
      </div>
    </PageShell>
  );
}
