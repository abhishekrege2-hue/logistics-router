"use client";

import { useMemo, useState } from "react";
import { ChevronDown, MapPin } from "lucide-react";
import { BRAND_NAME_UPPER } from "@/lib/brand";
import { COUNTRY_OPTIONS } from "@/lib/countries";
import { generateTimeOptions } from "@/lib/time-options";

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] as const;

const PAYMENT_OPTIONS = [
  "Prepaid",
  "Collect",
  "Third-party billing",
  "Account holder",
];
const HANDLING_OPTIONS = [
  "Standard handling",
  "Fragile",
  "Temperature-controlled",
  "Dangerous goods (declared)",
];
const COLLECTION_OPTIONS = [
  "Locker pickup",
  "Counter pickup",
  "Curbside",
  "Scheduled collection",
];

function ConsentModal({ onDismiss }: { onDismiss: () => void }) {
  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 backdrop-blur-[2px]"
      style={{ backgroundColor: "var(--color-overlay-bg)" }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="consent-heading"
    >
      <div className="surface-card max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-lg p-6 sm:p-8">
        <h2
          id="consent-heading"
          className="text-lg font-bold sm:text-xl"
          style={{ color: "var(--color-text-primary)" }}
        >
          Consent to Data Collection and Transfer
        </h2>
        <p
          className="mt-4 text-sm leading-relaxed"
          style={{ color: "var(--color-text-secondary)" }}
        >
          By clicking &apos;Accept All&apos;, you agree that this website may
          use the technologies selected by you to store and read data on your
          terminal device. These technologies enable individualized analysis of
          visits to and use of our website in order to offer the best possible
          online experience and to tailor content or functions to respective
          preferences and interests. This also includes the creation of profiles
          to make our services as user-friendly and audience-oriented as
          possible, as well as to improve our marketing activities. Furthermore,
          you agree that the aforementioned technologies may transfer data to
          third-party providers located in countries without an adequate level
          of data protection.
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-2 text-sm">
          <a
            href="#"
            className="font-medium underline underline-offset-4"
            style={{ color: "var(--color-accent)" }}
          >
            Privacy Notice
          </a>
          <span style={{ color: "var(--color-text-secondary)" }} aria-hidden>
            |
          </span>
          <a
            href="#"
            className="font-medium underline underline-offset-4"
            style={{ color: "var(--color-accent)" }}
          >
            Legal Notice
          </a>
        </div>
        <div className="mt-6 flex flex-col gap-3">
          <button
            type="button"
            onClick={onDismiss}
            className="w-full rounded-[4px] px-4 py-3 text-sm font-bold text-white transition"
            style={{ backgroundColor: "var(--color-success)" }}
          >
            Consent Settings
          </button>
          <button
            type="button"
            onClick={onDismiss}
            className="w-full rounded-[4px] px-4 py-3 text-sm font-bold text-white transition"
            style={{ backgroundColor: "var(--color-success)" }}
          >
            Strictly Necessary Only
          </button>
          <button
            type="button"
            onClick={onDismiss}
            className="w-full rounded-[4px] px-4 py-3 text-sm font-bold text-white transition"
            style={{ backgroundColor: "var(--color-success)" }}
          >
            Accept All
          </button>
        </div>
      </div>
    </div>
  );
}

const selectClass =
  "input-control w-full appearance-none py-2.5 pl-3 pr-10 text-sm font-medium outline-none";

const inputClass = "input-control w-full px-3 py-2.5 text-sm outline-none";

export function ServicePointFinderClient() {
  const [consentDone, setConsentDone] = useState(false);
  const [country, setCountry] = useState("IN");
  const [placeOrZip, setPlaceOrZip] = useState("");
  const [payment, setPayment] = useState(PAYMENT_OPTIONS[0] ?? "");
  const [handling, setHandling] = useState(HANDLING_OPTIONS[0] ?? "");
  const [collection, setCollection] = useState(COLLECTION_OPTIONS[0] ?? "");
  const [len, setLen] = useState("");
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [lenUnit, setLenUnit] = useState("cm");
  const [widthUnit, setWidthUnit] = useState("cm");
  const [heightUnit, setHeightUnit] = useState("cm");
  const [weight, setWeight] = useState("");
  const [weightUnit, setWeightUnit] = useState("kg");
  const [openDays, setOpenDays] = useState<Set<string>>(
    () => new Set([...DAYS]),
  );
  const [openBefore, setOpenBefore] = useState("6:00 PM");
  const [openAfter, setOpenAfter] = useState("8:00 AM");

  const timeOptions = useMemo(() => generateTimeOptions(), []);

  function toggleDay(d: string) {
    setOpenDays((prev) => {
      const next = new Set(prev);
      if (next.has(d)) next.delete(d);
      else next.add(d);
      return next;
    });
  }

  function useCurrentLocation() {
    if (typeof navigator === "undefined" || !navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPlaceOrZip(
          `${pos.coords.latitude.toFixed(5)}, ${pos.coords.longitude.toFixed(5)}`,
        );
      },
      () => {
        setPlaceOrZip("");
      },
    );
  }

  return (
    <>
      {!consentDone ? (
        <ConsentModal onDismiss={() => setConsentDone(true)} />
      ) : (
        <div
          className="py-10 sm:py-14"
          style={{ backgroundColor: "var(--color-bg)" }}
        >
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <h1
              className="text-center text-2xl font-bold uppercase tracking-wide sm:text-3xl md:text-4xl"
              style={{ color: "var(--color-primary)" }}
            >
              Find {BRAND_NAME_UPPER} Location
            </h1>

            <div className="surface-card relative mt-10 rounded-lg p-4 sm:p-6 md:p-8">
              <div
                className="mb-6 inline-block rounded-[4px] px-4 py-2"
                style={{
                  backgroundColor: "var(--color-primary)",
                  color: "var(--color-header-text)",
                }}
              >
                <p className="text-xs font-semibold sm:text-sm">
                  Shipping today? Check latest drop-off times!
                </p>
              </div>

              <form
                className="space-y-8"
                onSubmit={(e) => {
                  e.preventDefault();
                }}
              >
                <div className="grid grid-cols-1 gap-4 lg:grid-cols-12 lg:items-end">
                  <div className="lg:col-span-4">
                    <label
                      className="mb-1.5 block text-xs font-semibold uppercase tracking-wide"
                      style={{ color: "var(--color-text-primary)" }}
                    >
                      Country / Region
                    </label>
                    <div className="relative">
                      <select
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        className={selectClass}
                        aria-label="Select a Country or Region"
                      >
                        <option value="">Select a Country / Region</option>
                        {COUNTRY_OPTIONS.map((c) => (
                          <option key={c.code} value={c.code}>
                            {c.flag} {c.name}
                          </option>
                        ))}
                      </select>
                      <ChevronDown
                        className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2"
                        style={{ color: "var(--color-primary)" }}
                        aria-hidden
                      />
                    </div>
                  </div>
                  <div className="lg:col-span-3">
                    <span
                      className="mb-1.5 hidden text-xs font-semibold uppercase tracking-wide lg:block"
                      style={{ color: "var(--color-text-primary)" }}
                    >
                      Location
                    </span>
                    <button
                      type="button"
                      onClick={useCurrentLocation}
                      className="btn-secondary-outline flex w-full cursor-pointer items-center justify-center gap-2 px-4 py-2.5 text-sm"
                    >
                      <MapPin className="h-4 w-4 shrink-0" aria-hidden />
                      Use My Current Location
                    </button>
                  </div>
                  <div className="lg:col-span-5">
                    <label
                      className="mb-1.5 block text-xs font-semibold uppercase tracking-wide"
                      style={{ color: "var(--color-text-primary)" }}
                    >
                      Place or ZIP Code
                    </label>
                    <input
                      type="text"
                      value={placeOrZip}
                      onChange={(e) => setPlaceOrZip(e.target.value)}
                      placeholder="[street name, house number, full address]"
                      className={inputClass}
                      autoComplete="street-address"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                  <div className="space-y-4">
                    <h3
                      className="text-base font-bold"
                      style={{ color: "var(--color-text-primary)" }}
                    >
                      Drop Off
                    </h3>
                    <div>
                      <label
                        className="mb-1.5 block text-xs font-medium"
                        style={{ color: "var(--color-text-primary)" }}
                      >
                        Choose Payment Option
                      </label>
                      <div className="relative">
                        <select
                          value={payment}
                          onChange={(e) => setPayment(e.target.value)}
                          className={selectClass}
                        >
                          {PAYMENT_OPTIONS.map((o) => (
                            <option key={o} value={o}>
                              {o}
                            </option>
                          ))}
                        </select>
                        <ChevronDown
                          className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2"
                          style={{ color: "var(--color-primary)" }}
                          aria-hidden
                        />
                      </div>
                    </div>
                    <div>
                      <label
                        className="mb-1.5 block text-xs font-medium"
                        style={{ color: "var(--color-text-primary)" }}
                      >
                        Choose Handling Option
                      </label>
                      <div className="relative">
                        <select
                          value={handling}
                          onChange={(e) => setHandling(e.target.value)}
                          className={selectClass}
                        >
                          {HANDLING_OPTIONS.map((o) => (
                            <option key={o} value={o}>
                              {o}
                            </option>
                          ))}
                        </select>
                        <ChevronDown
                          className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2"
                          style={{ color: "var(--color-primary)" }}
                          aria-hidden
                        />
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h3
                      className="text-base font-bold"
                      style={{ color: "var(--color-text-primary)" }}
                    >
                      Collection
                    </h3>
                    <div>
                      <label
                        className="mb-1.5 block text-xs font-medium"
                        style={{ color: "var(--color-text-primary)" }}
                      >
                        Choose Collection Option
                      </label>
                      <div className="relative">
                        <select
                          value={collection}
                          onChange={(e) => setCollection(e.target.value)}
                          className={selectClass}
                        >
                          {COLLECTION_OPTIONS.map((o) => (
                            <option key={o} value={o}>
                              {o}
                            </option>
                          ))}
                        </select>
                        <ChevronDown
                          className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2"
                          style={{ color: "var(--color-primary)" }}
                          aria-hidden
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3
                    className="mb-4 text-base font-bold"
                    style={{ color: "var(--color-text-primary)" }}
                  >
                    Packaging Parameters
                  </h3>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    {[
                      {
                        label: "Length",
                        val: len,
                        set: setLen,
                        u: lenUnit,
                        setU: setLenUnit,
                      },
                      {
                        label: "Width",
                        val: width,
                        set: setWidth,
                        u: widthUnit,
                        setU: setWidthUnit,
                      },
                      {
                        label: "Height",
                        val: height,
                        set: setHeight,
                        u: heightUnit,
                        setU: setHeightUnit,
                      },
                    ].map(({ label, val, set, u, setU }) => (
                      <div key={label}>
                        <label
                          className="mb-1.5 block text-xs font-medium"
                          style={{ color: "var(--color-text-primary)" }}
                        >
                          {label}
                        </label>
                        <div className="flex gap-2">
                          <input
                            type="number"
                            min={0}
                            step="0.01"
                            value={val}
                            onChange={(e) => set(e.target.value)}
                            className={`${inputClass} min-w-0 flex-1`}
                            placeholder="0"
                          />
                          <select
                            value={u}
                            onChange={(e) => setU(e.target.value)}
                            className={`${selectClass} w-24 shrink-0 pr-8`}
                          >
                            <option value="cm">cm</option>
                            <option value="m">m</option>
                            <option value="inches">in</option>
                          </select>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 max-w-md">
                    <label
                      className="mb-1.5 block text-xs font-medium"
                      style={{ color: "var(--color-text-primary)" }}
                    >
                      Weight
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="number"
                        min={0}
                        step="0.01"
                        value={weight}
                        onChange={(e) => setWeight(e.target.value)}
                        className={`${inputClass} min-h-[48px] min-w-0 flex-1 text-base font-medium`}
                        placeholder="0"
                      />
                      <select
                        value={weightUnit}
                        onChange={(e) => setWeightUnit(e.target.value)}
                        className={`${selectClass} w-28 shrink-0 py-3 pr-8 text-base`}
                      >
                        <option value="kg">kg</option>
                        <option value="lb">lb</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div>
                  <h3
                    className="mb-3 text-base font-bold"
                    style={{ color: "var(--color-text-primary)" }}
                  >
                    Open On
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {DAYS.map((d) => {
                      const on = openDays.has(d);
                      return (
                        <button
                          key={d}
                          type="button"
                          onClick={() => toggleDay(d)}
                          className={`min-w-[3rem] rounded-[4px] border px-3 py-2 text-sm font-semibold transition ${
                            on ? "" : "day-toggle-off"
                          }`}
                          style={
                            on
                              ? {
                                  backgroundColor: "var(--color-primary)",
                                  color: "#ffffff",
                                  borderColor: "var(--color-primary)",
                                }
                              : {
                                  backgroundColor: "var(--color-surface)",
                                  color: "var(--color-text-secondary)",
                                  borderColor: "var(--color-border)",
                                }
                          }
                        >
                          {d}
                        </button>
                      );
                    })}
                  </div>
                  <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div>
                      <label
                        className="mb-1.5 block text-xs font-medium"
                        style={{ color: "var(--color-text-primary)" }}
                      >
                        Open Before
                      </label>
                      <div className="relative">
                        <select
                          value={openBefore}
                          onChange={(e) => setOpenBefore(e.target.value)}
                          className={selectClass}
                        >
                          {timeOptions.map((t) => (
                            <option key={t} value={t}>
                              {t}
                            </option>
                          ))}
                        </select>
                        <ChevronDown
                          className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2"
                          style={{ color: "var(--color-primary)" }}
                          aria-hidden
                        />
                      </div>
                    </div>
                    <div>
                      <label
                        className="mb-1.5 block text-xs font-medium"
                        style={{ color: "var(--color-text-primary)" }}
                      >
                        Open After
                      </label>
                      <div className="relative">
                        <select
                          value={openAfter}
                          onChange={(e) => setOpenAfter(e.target.value)}
                          className={selectClass}
                        >
                          {timeOptions.map((t) => (
                            <option key={`a-${t}`} value={t}>
                              {t}
                            </option>
                          ))}
                        </select>
                        <ChevronDown
                          className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2"
                          style={{ color: "var(--color-primary)" }}
                          aria-hidden
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn-primary w-full py-4 text-base"
                >
                  Search service points
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
