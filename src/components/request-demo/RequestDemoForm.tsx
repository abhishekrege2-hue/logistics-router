"use client";

import { useState, type FormEvent } from "react";
import { COUNTRY_OPTIONS } from "@/lib/countries";

const COMPANY_SIZES = ["1-50", "51-200", "201-1000", "1000+"] as const;

export function RequestDemoForm() {
  const [submitted, setSubmitted] = useState(false);
  const [fullName, setFullName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState(COUNTRY_OPTIONS[0]?.code ?? "");
  const [companySize, setCompanySize] = useState<string>(COMPANY_SIZES[0]);
  const [message, setMessage] = useState("");

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div
        className="surface-card rounded-lg border p-10 text-center shadow-card"
        style={{ borderColor: "var(--color-border)" }}
        role="status"
      >
        <p
          className="text-lg font-semibold"
          style={{ color: "var(--color-text-primary)" }}
        >
          Thank you. A Meridian SCM representative will contact you shortly.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="surface-card space-y-5 rounded-lg border p-6 shadow-card sm:p-8"
      style={{ borderColor: "var(--color-border)" }}
    >
      <div>
        <label
          htmlFor="demo-name"
          className="block text-sm font-medium"
          style={{ color: "var(--color-text-primary)" }}
        >
          Full Name
        </label>
        <input
          id="demo-name"
          type="text"
          required
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className="input-control mt-2 w-full px-4 py-2.5"
        />
      </div>
      <div>
        <label
          htmlFor="demo-company"
          className="block text-sm font-medium"
          style={{ color: "var(--color-text-primary)" }}
        >
          Company Name
        </label>
        <input
          id="demo-company"
          type="text"
          required
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          className="input-control mt-2 w-full px-4 py-2.5"
        />
      </div>
      <div>
        <label
          htmlFor="demo-email"
          className="block text-sm font-medium"
          style={{ color: "var(--color-text-primary)" }}
        >
          Business Email
        </label>
        <input
          id="demo-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input-control mt-2 w-full px-4 py-2.5"
        />
      </div>
      <div>
        <label
          htmlFor="demo-phone"
          className="block text-sm font-medium"
          style={{ color: "var(--color-text-primary)" }}
        >
          Phone Number
        </label>
        <input
          id="demo-phone"
          type="tel"
          required
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="input-control mt-2 w-full px-4 py-2.5"
        />
      </div>
      <div>
        <label
          htmlFor="demo-country"
          className="block text-sm font-medium"
          style={{ color: "var(--color-text-primary)" }}
        >
          Country / Region
        </label>
        <select
          id="demo-country"
          required
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          className="input-control mt-2 w-full px-4 py-2.5"
        >
          {COUNTRY_OPTIONS.map((c) => (
            <option key={c.code} value={c.code}>
              {c.flag} {c.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label
          htmlFor="demo-size"
          className="block text-sm font-medium"
          style={{ color: "var(--color-text-primary)" }}
        >
          Company Size
        </label>
        <select
          id="demo-size"
          required
          value={companySize}
          onChange={(e) => setCompanySize(e.target.value)}
          className="input-control mt-2 w-full px-4 py-2.5"
        >
          {COMPANY_SIZES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label
          htmlFor="demo-message"
          className="block text-sm font-medium"
          style={{ color: "var(--color-text-primary)" }}
        >
          Message / What are you looking to solve?{" "}
          <span style={{ color: "var(--color-text-secondary)" }}>
            (optional)
          </span>
        </label>
        <textarea
          id="demo-message"
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="input-control mt-2 w-full resize-y px-4 py-2.5"
        />
      </div>
      <button
        type="submit"
        className="w-full cursor-pointer rounded-[4px] px-6 py-3 text-base font-bold text-white transition"
        style={{ backgroundColor: "var(--color-accent)" }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = "var(--color-accent-hover)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = "var(--color-accent)";
        }}
      >
        Book My Demo
      </button>
    </form>
  );
}
