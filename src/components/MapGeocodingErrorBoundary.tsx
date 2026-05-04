"use client";

import React from "react";
import { AlertTriangle } from "lucide-react";

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
}

export class MapGeocodingErrorBoundary extends React.Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          className="surface-card rounded-lg border p-6 shadow-card"
          style={{ borderColor: "var(--color-border)" }}
        >
          <div
            className="flex items-center gap-3"
            style={{ color: "var(--color-text-primary)" }}
          >
            <AlertTriangle
              className="h-5 w-5"
              style={{ color: "var(--color-accent)" }}
            />
            <p className="text-sm font-semibold">Map Service Unavailable</p>
          </div>
          <p
            className="mt-2 text-sm"
            style={{ color: "var(--color-text-secondary)" }}
          >
            A map or geocoding module failed to load. Please refresh, or contact
            support if the issue persists.
          </p>
        </div>
      );
    }

    return this.props.children;
  }
}
