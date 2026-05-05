import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/layout/PageShell";
import { BRAND_NAME } from "@/lib/brand";
import { SERVICE_UPDATES } from "@/lib/updates";

export function generateStaticParams() {
  return SERVICE_UPDATES.map((update) => ({ slug: update.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const update = SERVICE_UPDATES.find((item) => item.slug === params.slug);
  if (!update) return { title: `Update | ${BRAND_NAME}` };
  return {
    title: `${update.title} | ${BRAND_NAME}`,
    description: update.summary,
  };
}

export default function UpdateDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const update = SERVICE_UPDATES.find((item) => item.slug === params.slug);
  if (!update) notFound();

  return (
    <PageShell>
      <article className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-wide text-[color:var(--color-text-secondary)]">
          Published: {update.publishedAt} · Last updated: {update.lastUpdated}
        </p>
        <h1 className="mt-3 border-l-4 pl-4 text-3xl font-bold text-[color:var(--color-primary)] sm:text-4xl">
          {update.title}
        </h1>
        <p className="mt-4 text-base font-semibold text-[color:var(--color-text-primary)]">
          {update.summary}
        </p>
        <div className="mt-6 space-y-4">
          {update.paragraphs.map((paragraph) => (
            <p
              key={paragraph}
              className="text-sm leading-relaxed text-[color:var(--color-text-secondary)]"
            >
              {paragraph}
            </p>
          ))}
        </div>
      </article>
    </PageShell>
  );
}
