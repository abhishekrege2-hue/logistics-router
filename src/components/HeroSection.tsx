import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const ctaGridCell =
  "flex min-h-[7.5rem] w-full flex-col justify-center rounded-[4px] px-4 py-5 text-center sm:min-h-[7.75rem]";

export function HeroSection() {
  return (
    <section
      className="relative border-b"
      style={{
        borderColor: "var(--color-border)",
        backgroundColor: "var(--color-surface)",
      }}
      id="hero"
    >
      <div className="relative isolate flex w-full min-h-[min(62vh,480px)] flex-col overflow-hidden sm:min-h-[min(66vh,560px)] lg:min-h-[min(68vh,620px)]">
        <Image
          src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1800&auto=format&fit=crop"
          alt="Professional logistics agent delivering a package to a modern home"
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
        />
        <div
          className="hero-overlay-gradient pointer-events-none absolute inset-0"
          aria-hidden
        />

        <div className="relative z-10 flex w-full flex-1 flex-col justify-end">
          <div className="mx-auto flex w-full max-w-7xl flex-col px-4 pb-14 pt-10 sm:px-6 sm:pb-16 sm:pt-12 lg:px-8 lg:pb-20 lg:pt-14">
            <h1 className="flex max-w-2xl flex-col gap-2 text-4xl font-bold leading-[1.12] tracking-tight text-white sm:gap-2.5 sm:text-5xl sm:leading-[1.1]">
              <span className="block">Human-Centric Logistics,</span>
              <span className="block text-white">
                Engineered for Enterprise Scale
              </span>
            </h1>
            <p
              className="mt-6 max-w-xl text-base font-medium sm:mt-7"
              style={{
                color:
                  "color-mix(in srgb, var(--color-header-text) 90%, transparent)",
              }}
            >
              Professional logistics execution with AI-enhanced orchestration
              for last-mile and global freight.
            </p>

            <div className="mt-8 grid w-full max-w-4xl grid-cols-1 gap-4 md:max-w-none md:grid-cols-3 md:gap-4 md:items-stretch">
              <Link
                href="/start-shipping"
                className={`${ctaGridCell} shadow-card cursor-pointer font-bold text-white transition hover:opacity-95`}
                style={{ backgroundColor: "var(--color-accent)" }}
              >
                <p className="text-xs font-bold uppercase tracking-[0.12em] text-white/90">
                  Primary
                </p>
                <p className="mt-1 text-lg font-bold">Ship Now</p>
              </Link>
              <Link
                href="/get-a-quote"
                className={`hero-outline-cta ${ctaGridCell} cursor-pointer font-bold`}
              >
                <p className="hero-quote-kicker text-xs font-bold uppercase tracking-[0.12em]">
                  AI Routing
                </p>
                <p className="hero-quote-title mt-1 text-lg font-bold">
                  Get a Quote
                </p>
              </Link>
              <Link
                href="/enterprise-app"
                className={`${ctaGridCell} shadow-card cursor-pointer border-2 border-transparent font-bold transition hover:opacity-95`}
                style={{
                  backgroundColor: "var(--color-primary)",
                  color: "var(--color-header-text)",
                }}
              >
                <p className="text-xs font-bold uppercase tracking-[0.12em] text-white/90">
                  Enterprise
                </p>
                <p className="mt-1 text-lg font-bold">
                  Enterprise Business App
                </p>
              </Link>
            </div>

            <div className="mt-8">
              <Link
                href="#features"
                className="btn-primary inline-flex min-h-[44px] cursor-pointer items-center gap-2 px-6 py-3"
              >
                Start Logistics Workflow
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
