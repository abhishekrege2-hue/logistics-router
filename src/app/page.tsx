import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import Image from "next/image";
import {
  ArrowDownToLine,
  ArrowRight,
  BriefcaseBusiness,
  Building,
  CalendarClock,
  Layers,
  PackageCheck,
  Plane,
  PlusCircle,
  Route,
  Ship,
  Train,
  Truck,
  Warehouse,
  Wrench,
} from "lucide-react";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { BRAND_NAME } from "@/lib/brand";

interface FeatureItem {
  label: string;
  icon: LucideIcon;
}

interface AlternatingSplitSectionProps {
  title: ReactNode;
  subtitle: string;
  imageSrc: string;
  imageAlt: string;
  cta: string;
  ctaHref: string;
  features: FeatureItem[];
  imageLeft?: boolean;
  featureGridClass?: string;
}

function SplitImage({ src, alt }: { src: string; alt: string }) {
  return (
    <div
      className="relative aspect-video w-full overflow-hidden rounded-lg shadow-card"
      style={{ border: "1px solid var(--color-border)" }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        sizes="(max-width: 1024px) 100vw, 50vw"
        priority={false}
      />
    </div>
  );
}

function AlternatingSplitSection({
  title,
  subtitle,
  imageSrc,
  imageAlt,
  cta,
  ctaHref,
  features,
  imageLeft = false,
  featureGridClass = "grid grid-cols-1 gap-3 md:grid-cols-2",
}: AlternatingSplitSectionProps) {
  const textBlock = (
    <div>
      <h2
        className="border-l-4 pl-4 text-3xl font-bold tracking-tight sm:text-4xl"
        style={{
          borderColor: "var(--color-accent)",
          color: "var(--color-primary)",
        }}
      >
        {title}
      </h2>
      <p
        className="mt-4 text-base font-medium"
        style={{ color: "var(--color-text-secondary)" }}
      >
        {subtitle}
      </p>
      <div className={`mt-8 ${featureGridClass}`}>
        {features.map(({ label, icon: Icon }) => (
          <div
            key={label}
            className="surface-card flex items-center gap-3 rounded-lg px-4 py-3"
          >
            <Icon
              className="h-5 w-5 shrink-0"
              style={{ color: "var(--color-accent)" }}
              aria-hidden
            />
            <span
              className="text-sm font-semibold"
              style={{ color: "var(--color-text-primary)" }}
            >
              {label}
            </span>
          </div>
        ))}
      </div>
      <a
        href={ctaHref}
        className="btn-primary mt-8 inline-flex items-center gap-2 px-6 py-3"
      >
        {cta}
        <ArrowRight className="h-4 w-4" aria-hidden />
      </a>
    </div>
  );

  const imageBlock = <SplitImage src={imageSrc} alt={imageAlt} />;

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
        {imageLeft ? (
          <>
            {imageBlock}
            {textBlock}
          </>
        ) : (
          <>
            {textBlock}
            {imageBlock}
          </>
        )}
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <div
      className="min-h-screen"
      style={{
        backgroundColor: "var(--color-bg)",
        color: "var(--color-text-primary)",
      }}
    >
      <Header />
      <main>
        <HeroSection />

        <section
          id="features"
          className="scroll-mt-28 border-y px-4 py-12 sm:px-6 sm:py-14 lg:px-8"
          style={{
            backgroundColor: "var(--color-bg)",
            borderColor: "var(--color-border)",
          }}
        >
          <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-5 md:flex-row md:items-center md:gap-6">
            <p
              className="max-w-4xl text-sm font-semibold md:text-base"
              style={{ color: "var(--color-text-primary)" }}
            >
              Navigating Latest Global Tariffs: Global trade is becoming
              increasingly complex as new tariffs and varying reciprocal
              measures emerge. Our AI Orchestrator is committed to helping you
              navigate these changes.
            </p>
            <button
              type="button"
              className="btn-primary min-h-[44px] shrink-0 px-5 py-2.5 text-sm"
            >
              Explore AI Solutions
            </button>
          </div>
        </section>

        <section
          id="ship-now"
          className="py-16 sm:py-20"
          style={{ backgroundColor: "var(--color-surface)" }}
        >
          <AlternatingSplitSection
            title="Document and Parcel Shipping."
            subtitle="Learn about our platform, the undisputed global leader in international express shipping."
            imageSrc="https://images.unsplash.com/photo-1586769852044-692d6e3703f0?q=80&w=1200&auto=format&fit=crop"
            imageAlt="Logistics delivery with customer signing on a digital pad"
            cta="Explore Express."
            ctaHref="#"
            features={[
              { label: "Next possible business day", icon: CalendarClock },
              { label: "Tailored business solutions", icon: BriefcaseBusiness },
              { label: "Flexible import options", icon: ArrowDownToLine },
              { label: "Wide variety of optional services", icon: Layers },
            ]}
          />
        </section>

        <section
          id="get-quote"
          className="py-16 sm:py-20"
          style={{ backgroundColor: "var(--color-bg)" }}
        >
          <AlternatingSplitSection
            imageLeft
            title={
              <>
                <span className="font-bold">Cargo Shipping</span>
                <span
                  className="font-normal"
                  style={{ color: "var(--color-text-secondary)" }}
                >
                  {" "}
                  | Business Only
                </span>
              </>
            }
            subtitle="Discover heavy shipping and logistics service options powered by Global Forwarding AI."
            imageSrc="https://images.unsplash.com/photo-1553413077-190dd305871c?q=80&w=1200&auto=format&fit=crop"
            imageAlt="Supply chain managers in a modern warehouse in discussion"
            cta="Explore Global Forwarding."
            ctaHref="#"
            features={[
              { label: "Air Freight", icon: Plane },
              { label: "Ocean Freight", icon: Ship },
              { label: "Road Freight", icon: Truck },
              { label: "Rail Freight", icon: Train },
            ]}
          />
        </section>

        <section
          id="enterprise-logistics"
          className="py-16 sm:py-20"
          style={{ backgroundColor: "var(--color-surface)" }}
        >
          <AlternatingSplitSection
            title="Enterprise Logistic Services."
            subtitle="Find out how our Supply Chain Orchestrator can revolutionize your business as a 3PL provider."
            imageSrc="https://images.unsplash.com/photo-1587293852726-70cdb56c2866?q=80&w=1200&auto=format&fit=crop"
            imageAlt="Two warehouse workers with advanced packing trolleys"
            cta="Explore Supply Chain 3PL."
            ctaHref="#"
            featureGridClass="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3"
            features={[
              { label: "Warehousing", icon: Warehouse },
              { label: "Packaging", icon: PackageCheck },
              { label: "Real Estate", icon: Building },
              { label: "Transport", icon: Route },
              { label: "Service Logistics", icon: Wrench },
              { label: "And More...", icon: PlusCircle },
            ]}
          />
        </section>

        <section
          id="customer-service"
          className="px-4 py-16 sm:px-6 lg:px-8"
          style={{ backgroundColor: "var(--color-bg)" }}
        >
          <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-2 md:items-start lg:grid-cols-[1.2fr_1fr]">
            <div className="surface-card rounded-lg p-6 sm:p-8">
              <div
                className="relative aspect-video w-full overflow-hidden rounded-lg shadow-card"
                style={{ border: "1px solid var(--color-border)" }}
              >
                <Image
                  src="https://images.unsplash.com/photo-1556740758-90de374c12ad?q=80&w=1200&auto=format&fit=crop"
                  alt="Business owner with merchandise on a trolley"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 60vw"
                />
              </div>
              <h3
                className="mt-6 border-l-4 pl-4 text-2xl font-bold"
                style={{
                  borderColor: "var(--color-accent)",
                  color: "var(--color-primary)",
                }}
              >
                {BRAND_NAME} for your Business
              </h3>
              <p
                className="mt-3 text-base font-medium"
                style={{ color: "var(--color-text-secondary)" }}
              >
                Power your small and medium-sized business success with
                world-class shipping. Our team of experts helps address
                ever-changing needs.
              </p>
              <button
                type="button"
                className="btn-primary mt-6 min-h-[44px] px-6 py-3"
              >
                Explore Business Solutions
              </button>
            </div>

            <div className="surface-card rounded-lg p-6 sm:p-8">
              <h3
                className="border-l-4 pl-4 text-2xl font-bold"
                style={{
                  borderColor: "var(--color-accent)",
                  color: "var(--color-primary)",
                }}
              >
                Important Service Updates
              </h3>
              <p
                className="mt-3 text-base font-medium"
                style={{ color: "var(--color-text-secondary)" }}
              >
                Service bulletins keep you up to date with news and alerts.
              </p>
              <ul
                className="mt-6 space-y-3 text-base font-medium"
                style={{ color: "var(--color-text-primary)" }}
              >
                <li className="flex gap-2">
                  <span style={{ color: "var(--color-accent)" }} aria-hidden>
                    •
                  </span>
                  Operational Update: Middle East
                </li>
                <li className="flex gap-2">
                  <span style={{ color: "var(--color-accent)" }} aria-hidden>
                    •
                  </span>
                  Sustainability Innovation
                </li>
                <li className="flex gap-2">
                  <span style={{ color: "var(--color-accent)" }} aria-hidden>
                    •
                  </span>
                  Globalization holds firm at record levels
                </li>
              </ul>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
