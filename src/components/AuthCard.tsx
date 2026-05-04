"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { Route, Mail, Lock, LogIn, UserPlus } from "lucide-react";
import { BRAND_NAME } from "@/lib/brand";

type AuthMode = "login" | "signup";

const inputBase = "input-control mt-2 w-full px-4 py-2.5";

export function AuthCard() {
  const [mode, setMode] = useState<AuthMode>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => setIsSubmitting(false), 800);
  }

  return (
    <div className="w-full max-w-md">
      <Link
        href="/"
        className="mb-8 flex items-center justify-center gap-2 font-semibold transition-opacity hover:opacity-90"
        style={{ color: "var(--color-text-primary)" }}
        aria-label={`${BRAND_NAME} - Home`}
      >
        <span
          className="flex h-10 w-10 items-center justify-center rounded-[4px] text-white"
          style={{ backgroundColor: "var(--color-primary)" }}
        >
          <Route className="h-5 w-5" aria-hidden />
        </span>
        <span className="text-xl tracking-tight">{BRAND_NAME}</span>
      </Link>

      <div className="surface-card rounded-lg p-6 sm:p-8">
        <div
          className="mb-8 flex rounded-[4px] p-1"
          style={{ backgroundColor: "var(--color-bg)" }}
          role="tablist"
          aria-label="Auth mode"
        >
          <button
            type="button"
            role="tab"
            aria-selected={mode === "login"}
            onClick={() => setMode("login")}
            className={`flex flex-1 items-center justify-center gap-2 rounded-[4px] px-4 py-2.5 text-sm font-medium transition-colors ${
              mode === "login" ? "shadow-card" : ""
            }`}
            style={
              mode === "login"
                ? {
                    backgroundColor: "var(--color-surface)",
                    color: "var(--color-text-primary)",
                  }
                : { color: "var(--color-text-secondary)" }
            }
          >
            <LogIn className="h-4 w-4" aria-hidden />
            Login
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={mode === "signup"}
            onClick={() => setMode("signup")}
            className={`flex flex-1 items-center justify-center gap-2 rounded-[4px] px-4 py-2.5 text-sm font-medium transition-colors ${
              mode === "signup" ? "shadow-card" : ""
            }`}
            style={
              mode === "signup"
                ? {
                    backgroundColor: "var(--color-surface)",
                    color: "var(--color-text-primary)",
                  }
                : { color: "var(--color-text-secondary)" }
            }
          >
            <UserPlus className="h-4 w-4" aria-hidden />
            Sign Up
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="auth-email"
              className="flex items-center gap-2 text-sm font-medium"
              style={{ color: "var(--color-text-primary)" }}
            >
              <Mail
                className="h-4 w-4"
                style={{ color: "var(--color-text-secondary)" }}
                aria-hidden
              />
              Email
            </label>
            <input
              id="auth-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@company.com"
              required
              autoComplete="email"
              className={inputBase}
            />
          </div>
          <div>
            <label
              htmlFor="auth-password"
              className="flex items-center gap-2 text-sm font-medium"
              style={{ color: "var(--color-text-primary)" }}
            >
              <Lock
                className="h-4 w-4"
                style={{ color: "var(--color-text-secondary)" }}
                aria-hidden
              />
              Password
            </label>
            <input
              id="auth-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              autoComplete={
                mode === "login" ? "current-password" : "new-password"
              }
              minLength={mode === "signup" ? 8 : undefined}
              className={inputBase}
            />
            {mode === "signup" && (
              <p
                className="mt-1.5 text-xs"
                style={{ color: "var(--color-text-secondary)" }}
              >
                At least 8 characters
              </p>
            )}
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-primary flex w-full items-center justify-center gap-2 px-4 py-3 text-base font-semibold disabled:opacity-60"
          >
            {isSubmitting
              ? "Please wait…"
              : mode === "login"
                ? "Log in"
                : "Create account"}
          </button>
        </form>

        <p
          className="mt-6 text-center text-sm"
          style={{ color: "var(--color-text-secondary)" }}
        >
          {mode === "login" ? (
            <>
              Don&apos;t have an account?{" "}
              <button
                type="button"
                onClick={() => setMode("signup")}
                className="font-medium underline-offset-2 hover:underline"
                style={{ color: "var(--color-accent)" }}
              >
                Sign up
              </button>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => setMode("login")}
                className="font-medium underline-offset-2 hover:underline"
                style={{ color: "var(--color-accent)" }}
              >
                Log in
              </button>
            </>
          )}
        </p>
      </div>

      <p className="mt-6 text-center">
        <Link
          href="/"
          className="text-sm font-medium underline-offset-2 hover:underline"
          style={{ color: "var(--color-text-secondary)" }}
        >
          ← Back to home
        </Link>
      </p>
    </div>
  );
}
