"use client";

import Script from "next/script";
import { useEffect } from "react";

const CONSENT_KEY = "atondix-consent";

export function StudioSdk({ token }: { token?: string }) {
  useEffect(() => {
    const applyStoredConsent = () => {
      try {
        const value = window.localStorage.getItem(CONSENT_KEY);
        if (value === "granted" || value === "denied") window.AtondixStats?.setConsent(value);
      } catch {
        // Storage can be unavailable in hardened browsers.
      }
    };
    applyStoredConsent();
    window.addEventListener("atondix-consent-change", applyStoredConsent);
    return () => window.removeEventListener("atondix-consent-change", applyStoredConsent);
  }, []);

  return (
    <Script
      src="https://studio.atondix.de/sdk/atondix.js"
      data-site-token={token || undefined}
      data-consent="pending"
      data-auto-track="true"
      onLoad={() => {
        try {
          const value = window.localStorage.getItem(CONSENT_KEY);
          if (value === "granted" || value === "denied") window.AtondixStats?.setConsent(value);
        } catch {
          // Storage can be unavailable in hardened browsers.
        }
      }}
      strategy="afterInteractive"
    />
  );
}
