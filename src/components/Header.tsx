"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type RefObject,
} from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Boxes,
  ChevronDown,
  Globe,
  Leaf,
  MapPin,
  Menu,
  Radar,
  Route,
  Search,
  UserCircle2,
  X,
  LogOut,
} from "lucide-react";
import { BRAND_NAME } from "@/lib/brand";
import { COUNTRY_OPTIONS_BY_CONTINENT, type CountryOption } from "@/lib/countries";
import { isAuthenticated, setAuthenticated } from "@/lib/auth";

type MenuKey = "nexship" | "enterprise" | null;

const NEXSHIP_LINKS = [
  {
    href: "/start-shipping",
    title: "Start Shipping",
    description: "Create shipment labels in seconds.",
    icon: Route,
  },
  {
    href: "/get-a-quote",
    title: "Get a Quote",
    description: "AI-backed route and pricing estimates.",
    icon: Radar,
  },
  {
    href: "/business-account",
    title: "Request a Business Account",
    description: "Scale with enterprise workflows.",
    icon: Boxes,
  },
  {
    href: "/freight-service",
    title: "Freight Service",
    description: "Cross-border and multimodal freight.",
    icon: Leaf,
  },
] as const;

function useMenuClose(
  menu: MenuKey,
  setMenu: (m: MenuKey) => void,
  nexRef: RefObject<HTMLDivElement | null>,
  entRef: RefObject<HTMLDivElement | null>,
) {
  useEffect(() => {
    if (!menu) return;

    const onPointerDown = (e: PointerEvent) => {
      const t = e.target as Node;
      if (nexRef.current?.contains(t)) return;
      if (entRef.current?.contains(t)) return;
      setMenu(null);
    };

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenu(null);
    };

    document.addEventListener("pointerdown", onPointerDown, true);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown, true);
      document.removeEventListener("keydown", onKey);
    };
  }, [menu, setMenu, nexRef, entRef]);
}

export function Header() {
  const [marketOpen, setMarketOpen] = useState(false);
  const [marketQuery, setMarketQuery] = useState("");
  const [selectedMarket, setSelectedMarket] = useState<CountryOption | null>(
    null,
  );
  const [authed, setAuthed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [menu, setMenu] = useState<MenuKey>(null);
  const nexRef = useRef<HTMLDivElement>(null);
  const entRef = useRef<HTMLDivElement>(null);
  const marketRef = useRef<HTMLDivElement>(null);
  const nexLeaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const entLeaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearTimer = useCallback(
    (r: { current: ReturnType<typeof setTimeout> | null }) => {
      if (r.current) {
        clearTimeout(r.current);
        r.current = null;
      }
    },
    [],
  );

  useMenuClose(menu, setMenu, nexRef, entRef);

  useEffect(() => {
    const syncAuth = () => setAuthed(isAuthenticated());
    syncAuth();
    window.addEventListener("storage", syncAuth);
    return () => window.removeEventListener("storage", syncAuth);
  }, []);

  const filteredByContinent = useMemo(() => {
    const q = marketQuery.trim().toLowerCase();
    return Object.entries(COUNTRY_OPTIONS_BY_CONTINENT)
      .map(([continent, countries]) => ({
        continent,
        countries: q
          ? countries.filter((c) => c.name.toLowerCase().includes(q))
          : countries,
      }))
      .filter((entry) => entry.countries.length > 0);
  }, [marketQuery]);

  useEffect(() => {
    if (!marketOpen) return;
    const onPointerDown = (e: PointerEvent) => {
      const t = e.target as Node;
      if (marketRef.current?.contains(t)) return;
      setMarketOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMarketOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown, true);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown, true);
      document.removeEventListener("keydown", onKey);
    };
  }, [marketOpen]);

  const headerBar = "w-full border-b text-[color:var(--color-header-text)]";
  const headerBarStyle = {
    backgroundColor: "var(--color-header-bg)",
    borderColor: "var(--color-header-divider)",
  } as const;

  const linkHover =
    "transition-colors hover:text-[color:var(--color-accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--color-header-bg)]";

  const nexshipLinkClass =
    "group/item flex min-h-[44px] cursor-pointer flex-col gap-0.5 rounded-md border-l-[3px] border-transparent px-3 py-3 transition-colors duration-150 hover:border-[color:var(--color-accent)] hover:text-[color:var(--color-accent)]";

  const panelBase =
    "surface-card absolute left-0 top-full z-50 mt-2 overflow-hidden rounded-lg border shadow-card transition-[opacity,visibility] duration-150 ease-out";

  return (
    <header
      className="sticky top-0 z-50 w-full"
      style={{ color: "var(--color-header-text)" }}
    >
      <div className={headerBar} style={headerBarStyle}>
        <div className="mx-auto flex min-h-14 max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-2 sm:px-6 lg:px-8">
          <Link
            href="/"
            className={`flex min-h-[44px] items-center gap-2 font-semibold ${linkHover}`}
            aria-label={`${BRAND_NAME} - Home`}
            onClick={() => setMobileOpen(false)}
          >
            <span
              className="flex h-9 w-9 items-center justify-center rounded-[4px] border"
              style={{
                borderColor: "var(--color-header-divider)",
                backgroundColor:
                  "color-mix(in srgb, var(--color-header-text) 8%, transparent)",
              }}
            >
              <Route
                className="h-5 w-5"
                style={{ color: "var(--color-header-text)" }}
                aria-hidden
              />
            </span>
            <span className="text-lg tracking-tight">{BRAND_NAME}</span>
          </Link>

          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <Link
              href="/find-service-point"
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex min-h-[44px] cursor-pointer items-center gap-1.5 rounded-[4px] border px-3 py-2 text-xs font-semibold ${linkHover}`}
              style={{
                borderColor: "var(--color-header-divider)",
                backgroundColor:
                  "color-mix(in srgb, var(--color-header-text) 6%, transparent)",
              }}
            >
              <MapPin className="h-3.5 w-3.5" />
              Find Service Point
            </Link>
            <label className="relative">
              <Search
                className="pointer-events-none absolute left-2.5 top-2.5 h-3.5 w-3.5"
                style={{ color: "var(--color-text-secondary)" }}
              />
              <input
                placeholder="Global Search"
                className="input-control w-44 cursor-text py-2 pl-8 pr-3 text-xs sm:w-52"
              />
            </label>
            <div className="relative" ref={marketRef}>
              <button
                type="button"
                onClick={() => setMarketOpen((prev) => !prev)}
                className={`inline-flex min-h-[44px] cursor-pointer items-center gap-1.5 rounded-[4px] border px-3 py-2 text-xs font-semibold ${linkHover}`}
                style={{
                  borderColor: "var(--color-header-divider)",
                  backgroundColor:
                    "color-mix(in srgb, var(--color-header-text) 6%, transparent)",
                }}
                aria-expanded={marketOpen}
              >
                <Globe
                  className="h-3.5 w-3.5"
                  style={{ color: "var(--color-header-text)" }}
                />
                {(selectedMarket?.name ?? "India")} (English)
                <ChevronDown className="h-3.5 w-3.5" />
              </button>
              {marketOpen && (
                <div
                  className="surface-card absolute right-0 top-full z-50 mt-2 w-[min(96vw,720px)] rounded-lg border p-3"
                  style={{ color: "var(--color-text-primary)" }}
                >
                  <p
                    className="text-xs font-semibold uppercase tracking-[0.14em]"
                    style={{ color: "var(--color-text-secondary)" }}
                  >
                    Market Selector
                  </p>
                  <input
                    type="text"
                    value={marketQuery}
                    onChange={(e) => setMarketQuery(e.target.value)}
                    placeholder="Search countries"
                    className="input-control mt-2 w-full px-3 py-2 text-sm"
                  />
                  <div className="mt-3 max-h-72 overflow-auto pr-1">
                    {filteredByContinent.map(({ continent, countries }) => (
                      <div key={continent} className="mb-3 last:mb-0">
                        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.1em] text-[color:var(--color-text-secondary)]">
                          {continent}
                        </p>
                        <div className="grid grid-cols-1 gap-1 sm:grid-cols-2">
                          {countries.map((country) => (
                            <button
                              key={country.code}
                              type="button"
                              onClick={() => {
                                setSelectedMarket(country);
                                setMarketOpen(false);
                              }}
                              className="min-h-[44px] cursor-pointer rounded-[4px] border px-2 py-2 text-left text-xs font-medium transition hover:bg-[color:var(--color-bg)]"
                              style={{
                                borderColor: "var(--color-border)",
                                color: "var(--color-text-primary)",
                                backgroundColor: "var(--color-surface)",
                              }}
                            >
                              {country.flag} {country.name}
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className={headerBar} style={headerBarStyle}>
        <div className="sub-nav-row mx-auto box-border flex h-12 max-w-7xl items-center justify-between gap-0 px-4 sm:px-6 lg:px-8">
          <Link
            href="/command-hub"
            className={`sub-nav-item hidden items-center text-xs font-semibold uppercase tracking-[0.16em] sm:inline-flex ${linkHover}`}
            style={{
              color:
                "color-mix(in srgb, var(--color-header-text) 88%, transparent)",
            }}
            aria-label={`${BRAND_NAME} command hub`}
            onClick={() => setMobileOpen(false)}
          >
            Meridian Command Hub
          </Link>

          <nav
            className="hidden h-full items-center gap-0 lg:flex"
            aria-label="Main navigation"
          >
            <Link
              href="/track"
              className={`sub-nav-item cursor-pointer justify-center text-sm font-medium ${linkHover}`}
            >
              Track
            </Link>

            <div
              ref={nexRef}
              className="relative flex h-full items-stretch"
              onMouseEnter={() => {
                clearTimer(nexLeaveTimer);
                setMenu("nexship");
              }}
              onMouseLeave={() => {
                clearTimer(nexLeaveTimer);
                nexLeaveTimer.current = setTimeout(() => {
                  setMenu((m) => (m === "nexship" ? null : m));
                }, 180);
              }}
            >
              <button
                type="button"
                className={`sub-nav-item inline-flex cursor-pointer items-center justify-center gap-1 text-sm font-medium ${linkHover}`}
                aria-expanded={menu === "nexship"}
                aria-haspopup="true"
                onClick={() =>
                  setMenu((m) => (m === "nexship" ? null : "nexship"))
                }
              >
                Meridian SCM
                <ChevronDown className="h-3.5 w-3.5 shrink-0" aria-hidden />
              </button>
              <div
                className={`${panelBase} w-[min(100vw-2rem,540px)] p-3`}
                style={{
                  borderColor: "var(--color-border)",
                  opacity: menu === "nexship" ? 1 : 0,
                  visibility: menu === "nexship" ? "visible" : "hidden",
                  pointerEvents: menu === "nexship" ? "auto" : "none",
                }}
              >
                <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                  {NEXSHIP_LINKS.map(
                    ({ href, title, description, icon: Icon }) => (
                      <Link
                        key={href}
                        href={href}
                        className={nexshipLinkClass}
                        style={{ color: "var(--color-text-primary)" }}
                        onClick={() => setMenu(null)}
                      >
                        <span className="flex items-center gap-2">
                          <Icon
                            className="h-4 w-4 shrink-0 text-[color:var(--color-accent)] group-hover/item:text-[color:var(--color-accent)]"
                            aria-hidden
                          />
                          <span className="text-sm font-semibold">{title}</span>
                        </span>
                        <span
                          className="pl-6 text-xs"
                          style={{ color: "var(--color-text-secondary)" }}
                        >
                          {description}
                        </span>
                      </Link>
                    ),
                  )}
                </div>
              </div>
            </div>

            <div
              ref={entRef}
              className="relative flex h-full items-stretch"
              onMouseEnter={() => {
                clearTimer(entLeaveTimer);
                setMenu("enterprise");
              }}
              onMouseLeave={() => {
                clearTimer(entLeaveTimer);
                entLeaveTimer.current = setTimeout(() => {
                  setMenu((m) => (m === "enterprise" ? null : m));
                }, 180);
              }}
            >
              <button
                type="button"
                className={`sub-nav-item inline-flex cursor-pointer items-center justify-center gap-1 text-sm font-medium ${linkHover}`}
                aria-expanded={menu === "enterprise"}
                aria-haspopup="true"
                onClick={() =>
                  setMenu((m) => (m === "enterprise" ? null : "enterprise"))
                }
              >
                Enterprise Logistics Services
                <ChevronDown className="h-3.5 w-3.5 shrink-0" aria-hidden />
              </button>
              <div
                className={`${panelBase} grid w-[min(100vw-2rem,900px)] grid-cols-1 gap-0 p-0 md:grid-cols-2`}
                style={{
                  borderColor: "var(--color-border)",
                  opacity: menu === "enterprise" ? 1 : 0,
                  visibility: menu === "enterprise" ? "visible" : "hidden",
                  pointerEvents: menu === "enterprise" ? "auto" : "none",
                }}
              >
                <div
                  className="flex flex-col justify-center border-0 p-6 md:min-h-[280px] md:border-r"
                  style={{ borderColor: "var(--color-border)" }}
                >
                  <p
                    className="text-xs font-bold uppercase tracking-[0.2em]"
                    style={{ color: "var(--color-text-primary)" }}
                  >
                    Enterprise Logistics Services
                  </p>
                  <p
                    className="mt-4 text-sm leading-relaxed"
                    style={{ color: "var(--color-text-secondary)" }}
                  >
                    Our supply chain divisions create custom solutions for
                    enterprise-sized organizations. Discover what makes
                    Meridian SCM Supply Chain the perfect fit as your
                    outsourced logistics provider (3PL).
                  </p>
                  <Link
                    href="/enterprise-logistics"
                    className="mt-6 inline-flex min-h-[44px] w-fit cursor-pointer items-center justify-center rounded-[4px] px-5 py-2.5 text-sm font-bold text-white transition hover:opacity-95"
                    style={{ backgroundColor: "var(--color-primary)" }}
                    onClick={() => setMenu(null)}
                  >
                    Explore Meridian SCM Supply Chain
                  </Link>
                </div>
                <div className="relative hidden min-h-[280px] md:block">
                  <Image
                    src="https://images.unsplash.com/photo-1553413077-190dd305871c?q=80&w=900&auto=format&fit=crop"
                    alt="Supply chain warehouse with shelving and operations"
                    fill
                    className="object-cover"
                    sizes="450px"
                  />
                  <div
                    className="pointer-events-none absolute inset-0 bg-[rgba(0,0,0,0.15)]"
                    aria-hidden
                  />
                </div>
              </div>
            </div>

            <Link
              href="/customer-service"
              className={`sub-nav-item cursor-pointer justify-center text-sm font-medium ${linkHover}`}
            >
              Customer Service
            </Link>
          </nav>

          <div className="flex h-full items-center gap-3">
            {authed ? (
              <button
                type="button"
                onClick={() => {
                  setAuthenticated(false);
                  setAuthed(false);
                }}
                className={`sub-nav-item hidden cursor-pointer items-center gap-2 rounded-[4px] border-2 text-sm font-semibold transition sm:inline-flex ${linkHover}`}
                style={{
                  color: "var(--color-header-text)",
                  borderColor: "var(--color-header-divider)",
                  backgroundColor: "transparent",
                }}
              >
                <LogOut className="h-4 w-4" />
                Logout
              </button>
            ) : (
              <Link
                href="/login"
                className={`sub-nav-item hidden cursor-pointer items-center gap-2 rounded-[4px] border-2 text-sm font-semibold transition sm:inline-flex ${linkHover}`}
                style={{
                  color: "var(--color-header-text)",
                  borderColor: "var(--color-header-divider)",
                  backgroundColor: "transparent",
                }}
              >
                <UserCircle2 className="h-4 w-4" />
                Login
              </Link>
            )}
            <Link
              href="/request-demo"
              className="sub-nav-item hidden cursor-pointer items-center rounded-[4px] text-sm font-bold text-white transition sm:inline-flex"
              style={{ backgroundColor: "var(--color-accent)" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor =
                  "var(--color-accent-hover)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "var(--color-accent)";
              }}
            >
              Request a Demo
            </Link>
            <button
              type="button"
              className={`inline-flex min-h-[44px] min-w-[44px] cursor-pointer items-center justify-center rounded-[4px] lg:hidden ${linkHover}`}
              style={{
                color: "var(--color-header-text)",
                backgroundColor:
                  "color-mix(in srgb, var(--color-header-text) 8%, transparent)",
              }}
              aria-expanded={mobileOpen}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              onClick={() => setMobileOpen((v) => !v)}
            >
              {mobileOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div
            className="border-t lg:hidden"
            style={{
              borderColor: "var(--color-header-divider)",
              backgroundColor: "var(--color-header-bg)",
            }}
          >
            <div className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-4">
              <Link
                href="/track"
                className={`min-h-[44px] cursor-pointer px-2 py-3 text-sm font-medium ${linkHover}`}
                onClick={() => setMobileOpen(false)}
              >
                Track
              </Link>
              {NEXSHIP_LINKS.map(({ href, title }) => (
                <Link
                  key={href}
                  href={href}
                  className={`min-h-[44px] cursor-pointer px-2 py-3 text-sm font-medium ${linkHover}`}
                  onClick={() => setMobileOpen(false)}
                >
                  Meridian SCM · {title}
                </Link>
              ))}
              <Link
                href="/enterprise-logistics"
                className={`min-h-[44px] cursor-pointer px-2 py-3 text-sm font-medium ${linkHover}`}
                onClick={() => setMobileOpen(false)}
              >
                Enterprise Logistics Services
              </Link>
              <Link
                href="/customer-service"
                className={`min-h-[44px] cursor-pointer px-2 py-3 text-sm font-medium ${linkHover}`}
                onClick={() => setMobileOpen(false)}
              >
                Customer Service
              </Link>
              <div
                className="mt-2 flex flex-col gap-2 border-t pt-3"
                style={{ borderColor: "var(--color-header-divider)" }}
              >
                {authed ? (
                  <button
                    type="button"
                    className={`min-h-[44px] cursor-pointer px-2 py-3 text-left text-sm font-semibold ${linkHover}`}
                    onClick={() => {
                      setAuthenticated(false);
                      setAuthed(false);
                      setMobileOpen(false);
                    }}
                  >
                    Logout
                  </button>
                ) : (
                  <Link
                    href="/login"
                    className={`min-h-[44px] cursor-pointer px-2 py-3 text-sm font-semibold ${linkHover}`}
                    onClick={() => setMobileOpen(false)}
                  >
                    Login
                  </Link>
                )}
                <Link
                  href="/request-demo"
                  className="min-h-[44px] cursor-pointer rounded-[4px] px-4 py-3 text-center text-sm font-bold text-white"
                  style={{ backgroundColor: "var(--color-accent)" }}
                  onClick={() => setMobileOpen(false)}
                >
                  Request a Demo
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
