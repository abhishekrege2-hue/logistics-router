"use client";

import { useState, type FormEvent } from "react";
import Image from "next/image";
import {
  CheckCircle,
  ChevronDown,
  Package,
  Truck,
  Warehouse,
} from "lucide-react";
import { ROUTING_LOCATIONS } from "@/lib/hubs";

const FAQ_ITEMS = [
  {
    q: "What is a tracking number, and where can I find it?",
    a: "A tracking number is a unique 10-character shipment identifier assigned when your parcel is booked. You can find it in your shipment confirmation email, shipping label, SMS updates, or in your sender account portal. Enter it exactly as shared so the system can retrieve the latest milestone scans.",
  },
  {
    q: "When will my tracking information appear?",
    a: "Tracking events usually appear 24 to 48 hours after receiving the tracking ID. In general, once the shipment has reached our facility, a tracking event will appear.",
  },
  {
    q: "Why is my tracking number/ID not working?",
    a: "Please make sure you enter the correct tracking number in the correct format. Check for a minimum length of five characters. Special characters such as tab, comma, space, and semicolon are understood as separators between multiple tracking IDs. If your tracking ID is not working, please contact your shipper or online shop.",
  },
  {
    q: "If I do not have my tracking number, is it possible to track my shipment?",
    a: "If you do not have a tracking number, we advise you to contact your shipper. However, if you have other shipping reference numbers, they may work using the tracking systems of the specific business unit handling your shipment.",
  },
] as const;

const VALIDATION_MESSAGE =
  "Please enter a valid 10-character alphanumeric tracking reference.";

type StepStatus = "completed" | "active" | "pending";

type Hub = { label: string; weight: number };

const ORIGIN_HUBS: Hub[] = [
  { label: "Mumbai - BOM Gateway", weight: 28 },
  { label: "Delhi - IGI Hub", weight: 24 },
  { label: "Chennai - Port Terminal", weight: 18 },
  { label: "Bengaluru - BLR Air Cargo", weight: 12 },
  { label: "Hyderabad - HYD Logistics Zone", weight: 10 },
  { label: "Kolkata - NSCBI Air Freight", weight: 8 },
];

const TRANSIT_HUBS: Hub[] = [
  { label: "Dubai - DXB Logistics Park", weight: 22 },
  { label: "Singapore - Tuas Port", weight: 20 },
  { label: "Rotterdam - Europort", weight: 16 },
  { label: "Frankfurt - Cargo City Süd", weight: 14 },
  { label: "Hong Kong - Kwai Tsing Terminal", weight: 12 },
  { label: "Doha - Hamad Air Hub", weight: 10 },
  { label: "Istanbul - IST Cargo Terminal", weight: 6 },
];

function weightedPick(seed: number, options: Hub[]) {
  const total = options.reduce((sum, item) => sum + item.weight, 0);
  let cursor = ((seed % 9973) / 9973) * total;
  for (const option of options) {
    cursor -= option.weight;
    if (cursor <= 0) return option.label;
  }
  return options[0]?.label ?? "Unknown gateway";
}

function hashTracking(value: string) {
  let hash = 0;
  for (const ch of value) hash = (hash * 31 + ch.charCodeAt(0)) >>> 0;
  return hash;
}

function TimelineStep({
  icon: Icon,
  title,
  detail,
  status,
  isLast,
}: {
  icon: typeof Package;
  title: string;
  detail: string;
  status: StepStatus;
  isLast: boolean;
}) {
  const stemColor =
    status === "completed"
      ? "var(--color-success)"
      : status === "active"
        ? "var(--color-accent)"
        : "var(--color-border)";
  const iconBg =
    status === "completed"
      ? "var(--color-success)"
      : status === "active"
        ? "var(--color-accent)"
        : "color-mix(in srgb, var(--color-border) 85%, var(--color-surface))";
  const iconColor =
    status === "pending" ? "var(--color-text-secondary)" : "#ffffff";

  return (
    <li className="flex gap-4">
      <div className="flex w-9 shrink-0 flex-col items-center">
        <div
          className="flex h-9 w-9 items-center justify-center rounded-full"
          style={{ backgroundColor: iconBg }}
        >
          <Icon className="h-4 w-4" style={{ color: iconColor }} aria-hidden />
        </div>
        {!isLast && (
          <div
            className="mt-1 w-0.5 flex-1 min-h-[1.5rem]"
            style={{ backgroundColor: stemColor }}
            aria-hidden
          />
        )}
      </div>
      <div className="min-w-0 flex-1 pb-8">
        <p
          className="text-sm font-bold"
          style={{ color: "var(--color-primary)" }}
        >
          {title}
        </p>
        <p
          className="mt-1 text-sm leading-relaxed"
          style={{ color: "var(--color-text-secondary)" }}
        >
          {detail}
        </p>
      </div>
    </li>
  );
}

export function TrackPageContent() {
  const [trackingId, setTrackingId] = useState("");
  const [hubQuery, setHubQuery] = useState("");
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [showError, setShowError] = useState(false);
  const [showTimeline, setShowTimeline] = useState(false);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const v = trackingId.trim().toUpperCase();
    if (!/^[A-Z0-9]{10}$/.test(v)) {
      setShowError(true);
      setShowTimeline(false);
      return;
    }
    setTrackingId(v);
    setShowError(false);
    setShowTimeline(true);
  };

  const onTrackingChange = (value: string) => {
    const normalized = value.replace(/[^a-zA-Z0-9]/g, "").toUpperCase();
    setTrackingId(normalized.slice(0, 10));
    if (showError && /^[A-Z0-9]{10}$/.test(normalized)) setShowError(false);
  };

  const trackingSeed = hashTracking(trackingId.trim());
  const originLocation = weightedPick(trackingSeed + 13, ORIGIN_HUBS);
  const processedLocation = weightedPick(trackingSeed + 37, ORIGIN_HUBS);
  const departedLocation = weightedPick(trackingSeed + 71, TRANSIT_HUBS);
  const destinationLocation = weightedPick(trackingSeed + 103, ORIGIN_HUBS);
  const hubSuggestions = ROUTING_LOCATIONS.filter((city) =>
    city.toLowerCase().includes(hubQuery.trim().toLowerCase()),
  ).slice(0, 5);

  return (
    <>
      <section
        className="py-10 sm:py-14"
        style={{ backgroundColor: "var(--color-bg)" }}
      >
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h1
            className="border-l-4 pl-4 text-3xl font-bold sm:text-4xl"
            style={{
              borderColor: "var(--color-accent)",
              color: "var(--color-primary)",
            }}
          >
            Track and Trace
          </h1>
          <p
            className="mt-2 text-sm font-medium"
            style={{ color: "var(--color-text-secondary)" }}
          >
            Enter your shipment identifier to view the latest status.
          </p>
          <form
            className="mt-8 flex flex-col gap-3 md:flex-row md:items-stretch"
            onSubmit={onSubmit}
          >
            <label htmlFor="track-id" className="sr-only">
              Tracking number
            </label>
            <input
              id="track-id"
              type="text"
              inputMode="text"
              autoComplete="off"
              value={trackingId}
              onChange={(e) => onTrackingChange(e.target.value)}
              placeholder="Enter your tracking number"
              aria-invalid={showError}
              aria-describedby={showError ? "track-error" : undefined}
              maxLength={10}
              className="input-control min-h-[44px] w-full flex-1 px-5 text-base font-medium md:min-h-[52px]"
              style={showError ? { borderColor: "#dc2626" } : undefined}
            />
            <button
              type="submit"
              className="btn-primary inline-flex min-h-[44px] shrink-0 items-center justify-center px-10 text-base md:w-auto md:min-h-[52px]"
            >
              Track
            </button>
          </form>
          {showError && (
            <p
              id="track-error"
              className="mt-2 text-sm font-medium"
              style={{ color: "#b91c1c" }}
              role="alert"
            >
              {VALIDATION_MESSAGE}
            </p>
          )}
          <p className="mt-2 text-xs font-medium text-[color:var(--color-text-secondary)]">
            *Example: 8823AX9910
          </p>
          <div className="mt-4 max-w-xl">
            <label className="text-xs font-semibold text-[color:var(--color-text-secondary)]">
              Global Hub Search
            </label>
            <input
              value={hubQuery}
              onChange={(e) => setHubQuery(e.target.value)}
              placeholder="Type a city, port, or airport (e.g. L)"
              className="input-control mt-1 w-full px-3 py-2 text-sm"
            />
            {hubQuery.trim().length > 0 && (
              <div className="surface-card mt-1 rounded-md border p-1">
                {hubSuggestions.map((hub) => (
                  <p key={hub} className="px-2 py-1 text-xs">
                    {hub}
                  </p>
                ))}
              </div>
            )}
          </div>

          {showTimeline && (
            <div
              className="surface-card mt-10 rounded-lg border p-6 sm:p-8"
              style={{ borderColor: "var(--color-border)" }}
            >
              <h2
                className="text-lg font-semibold"
                style={{ color: "var(--color-primary)" }}
              >
                Shipment progress
              </h2>
              <p
                className="mt-1 text-sm"
                style={{ color: "var(--color-text-secondary)" }}
              >
                Reference:{" "}
                <span className="font-mono font-semibold text-[color:var(--color-text-primary)]">
                  {trackingId.trim()}
                </span>
              </p>
              <ol className="relative mt-8 pl-0">
                <TimelineStep
                  icon={Package}
                  title="Order Received"
                  detail={`Today, 06:15 AM — Confirmed at ${originLocation}`}
                  status="completed"
                  isLast={false}
                />
                <TimelineStep
                  icon={Warehouse}
                  title="Processed at Hub"
                  detail={`Today, 08:30 AM — Processed and sorted at ${processedLocation}`}
                  status="completed"
                  isLast={false}
                />
                <TimelineStep
                  icon={Truck}
                  title="In Transit"
                  detail={`Today, 11:45 AM — Departed ${departedLocation}; ETA next scan 4h`}
                  status="active"
                  isLast={false}
                />
                <TimelineStep
                  icon={CheckCircle}
                  title="Out for Delivery"
                  detail={`Pending — Last-mile carrier assignment at ${destinationLocation}`}
                  status="pending"
                  isLast
                />
              </ol>
            </div>
          )}
        </div>
      </section>

      {!showTimeline && (
        <section
          className="border-t py-12 sm:py-16"
          style={{
            backgroundColor: "var(--color-surface)",
            borderColor: "var(--color-border)",
          }}
        >
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <h2
              className="text-2xl font-bold"
              style={{ color: "var(--color-primary)" }}
            >
              Frequently Asked Questions
            </h2>
            <ul
              className="mt-8 border-y"
              style={{ borderColor: "var(--color-border)" }}
            >
              {FAQ_ITEMS.map((item, index) => {
                const open = openIndex === index;
                return (
                  <li
                    key={item.q}
                    className="border-b last:border-b-0"
                    style={{ borderColor: "var(--color-border)" }}
                  >
                    <button
                      type="button"
                      onClick={() => setOpenIndex(open ? null : index)}
                      className="flex min-h-[44px] w-full items-center justify-between gap-4 py-4 text-left transition sm:py-5"
                      style={{
                        backgroundColor: open ? "#f4f4f4" : "var(--color-surface)",
                      }}
                      aria-expanded={open}
                    >
                      <span
                        className="text-base font-semibold"
                        style={{ color: "var(--color-text-primary)" }}
                      >
                        {item.q}
                      </span>
                      <ChevronDown
                        className={`h-5 w-5 shrink-0 transition-transform ${open ? "rotate-180" : ""}`}
                        style={{ color: "var(--color-primary)" }}
                        aria-hidden
                      />
                    </button>
                    {open && (
                      <div
                        className="border-t px-0 pb-5 pr-8 pt-0"
                        style={{
                          borderColor: "var(--color-border)",
                          backgroundColor: "#f4f4f4",
                        }}
                      >
                        <p
                          className="pl-0 text-sm font-semibold leading-relaxed"
                          style={{ color: "var(--color-text-primary)" }}
                        >
                          {item.a}
                        </p>
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </section>
      )}

      <section
        className="border-t py-12"
        style={{
          borderColor: "var(--color-border)",
          backgroundColor: "var(--color-bg)",
        }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div
            className="flex flex-col items-stretch gap-8 rounded-lg border p-6 md:flex-row md:items-center md:justify-between md:p-8 lg:p-10"
            style={{
              backgroundColor: "var(--color-primary)",
              borderColor:
                "color-mix(in srgb, var(--color-header-text) 18%, var(--color-primary))",
              color: "#ffffff",
            }}
          >
            <div className="max-w-xl">
              <h2 className="text-xl font-bold text-white md:text-2xl">
                Stop tracking the log, start tracking your future
              </h2>
              <p className="mt-3 text-sm font-medium text-white">
                Your career deserves the fast route too.
              </p>
              <p
                className="mt-2 text-sm"
                style={{
                  color:
                    "color-mix(in srgb, var(--color-header-text) 85%, transparent)",
                }}
              >
                Explore open roles in IT, logistics, driving, and more.
              </p>
              <p
                className="mt-2 text-sm"
                style={{
                  color:
                    "color-mix(in srgb, var(--color-header-text) 85%, transparent)",
                }}
              >
                Don&apos;t wait for your next step — build it!
              </p>
              <p
                className="mt-4 text-lg font-semibold md:text-xl"
                style={{ color: "var(--color-accent)" }}
              >
                Unbox your potential.
              </p>
            </div>
            <div className="relative mx-auto w-full max-w-[220px] shrink-0 md:mx-0">
              <div
                className="relative aspect-[4/5] w-full overflow-hidden rounded-lg shadow-card"
                style={{
                  border:
                    "1px solid color-mix(in srgb, var(--color-header-text) 25%, transparent)",
                }}
              >
                <Image
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=600&auto=format&fit=crop"
                  alt="Professional team member with company identification"
                  fill
                  className="object-cover object-top"
                  sizes="220px"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
