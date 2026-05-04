"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Building2, ChevronDown, LogIn } from "lucide-react";

export function TrackSubNav() {
  const pathname = usePathname();
  const onTrack = pathname === "/track";

  const barStyle = {
    backgroundColor: "var(--color-header-bg)",
    color: "var(--color-header-text)",
    borderBottom: "1px solid var(--color-header-divider)",
  } as const;

  return (
    <div style={barStyle}>
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-3 md:flex-row md:items-center md:justify-between sm:px-6 lg:px-8">
        <nav
          className="flex flex-wrap items-center gap-4 md:gap-6"
          aria-label="Track section navigation"
        >
          <Link
            href="/track"
            className={`min-h-[44px] cursor-pointer text-sm font-semibold ${onTrack ? "subnav-link-active" : "subnav-link"}`}
          >
            Track
          </Link>

          <div className="group relative">
            <button
              type="button"
              className="subnav-link inline-flex min-h-[44px] cursor-pointer items-center gap-1 text-sm font-semibold"
            >
              Ship
              <ChevronDown className="h-3.5 w-3.5 opacity-70" aria-hidden />
            </button>
            <div className="invisible absolute left-0 top-full z-40 mt-2 w-80 translate-y-1 rounded-lg border p-4 opacity-0 shadow-card transition-all group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 surface-card">
              <div
                className="flex items-start gap-3"
                style={{ color: "var(--color-text-primary)" }}
              >
                <Building2
                  className="mt-0.5 h-5 w-5 shrink-0"
                  style={{ color: "var(--color-accent)" }}
                  aria-hidden
                />
                <div>
                  <p className="text-sm font-bold">
                    Enterprise Logistics Service
                  </p>
                  <p
                    className="mt-1 text-xs leading-relaxed"
                    style={{ color: "var(--color-text-secondary)" }}
                  >
                    Dedicated freight, contract logistics, and control-tower
                    visibility for large shippers.
                  </p>
                  <Link
                    href="/enterprise-logistics"
                    className="mt-3 inline-block min-h-[44px] cursor-pointer text-xs font-semibold underline underline-offset-2"
                    style={{ color: "var(--color-accent)" }}
                  >
                    View enterprise capabilities →
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <Link
            href="/#customer-service"
            className="subnav-link min-h-[44px] cursor-pointer text-sm font-semibold"
          >
            Customer Service
          </Link>
        </nav>

        <div className="group relative self-start md:self-auto">
          <button
            type="button"
            className="subnav-link inline-flex min-h-[44px] cursor-pointer items-center gap-1.5 rounded-[4px] border px-3 py-2 text-xs font-semibold"
            style={{
              borderColor: "var(--color-header-divider)",
              backgroundColor:
                "color-mix(in srgb, var(--color-header-text) 8%, transparent)",
            }}
          >
            <LogIn className="h-3.5 w-3.5" aria-hidden />
            Customer Portal Login
            <ChevronDown className="h-3.5 w-3.5 opacity-80" aria-hidden />
          </button>
          <div className="invisible absolute right-0 top-full z-40 mt-2 w-56 translate-y-1 rounded-lg border py-2 opacity-0 shadow-card transition-all group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 surface-card">
            <Link
              href="/login"
              className="block min-h-[44px] cursor-pointer px-4 py-2.5 text-sm transition hover:bg-[color:var(--color-bg)]"
              style={{ color: "var(--color-text-primary)" }}
            >
              Sign in
            </Link>
            <Link
              href="/auth"
              className="block min-h-[44px] cursor-pointer px-4 py-2.5 text-sm transition hover:bg-[color:var(--color-bg)]"
              style={{ color: "var(--color-text-primary)" }}
            >
              Register for portal access
            </Link>
            <button
              type="button"
              className="block w-full min-h-[44px] cursor-pointer px-4 py-2.5 text-left text-sm transition hover:bg-[color:var(--color-bg)]"
              style={{ color: "var(--color-text-primary)" }}
            >
              Forgot password
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
