import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export function PlaceholderPage({
  title,
  description,
  relatedLinks,
}: {
  title: string;
  description: string;
  relatedLinks?: Array<{ label: string; href: string }>;
}) {
  return (
    <div className="min-h-screen bg-[color:var(--color-bg)]">
      <Header />
      <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-[color:var(--color-primary)]">{title}</h1>
        <p className="mt-2 text-sm text-[color:var(--color-text-secondary)]">{description}</p>

        <div className="mt-6 rounded-xl border border-slate-200 bg-white p-6 text-sm">
          <p className="font-semibold text-slate-900">Scaffold page</p>
          <p className="mt-1 text-slate-700">
            This page exists to prevent 404 stack traces and provide a stable enterprise footer routing surface.
          </p>

          {relatedLinks && relatedLinks.length > 0 && (
            <div className="mt-4 grid gap-2">
              {relatedLinks.map((l) => (
                <Link key={l.href} href={l.href} className="font-semibold underline">
                  {l.label} &rarr;
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

