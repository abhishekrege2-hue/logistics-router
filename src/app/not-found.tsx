import Link from "next/link";

export default function NotFound() {
  return (
    <div
      className="flex min-h-screen flex-col items-center justify-center px-6 py-16 text-center"
      style={{ backgroundColor: "var(--color-primary)", color: "#ffffff" }}
    >
      <p className="text-4xl font-bold tracking-tight sm:text-5xl">
        404 — Shipment Lost.
      </p>
      <p
        className="mt-4 max-w-md text-base font-medium sm:text-lg"
        style={{ color: "color-mix(in srgb, #ffffff 82%, transparent)" }}
      >
        The page or route you are looking for cannot be found in our network.
      </p>
      <Link
        href="/"
        className="btn-primary mt-10 inline-flex min-h-[44px] min-w-[44px] items-center justify-center px-8 py-3 text-base font-bold"
      >
        Return to Logistics Hub
      </Link>
    </div>
  );
}
