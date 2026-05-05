"use client";

const AUTH_KEY = "logistics-router-authenticated";

export function isAuthenticated() {
  if (typeof window === "undefined") return false;
  return window.localStorage.getItem(AUTH_KEY) === "true";
}

export function setAuthenticated(value: boolean) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(AUTH_KEY, value ? "true" : "false");
}
