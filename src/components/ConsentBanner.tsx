"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type ConsentState = "pending" | "granted" | "denied";
const KEY = "atondix-consent";
const EVENT = "atondix-consent-change";

function readConsent(): ConsentState {
  try {
    const value = localStorage.getItem(KEY);
    return value === "granted" || value === "denied" ? value : "pending";
  } catch {
    return "pending";
  }
}

export function setAnalyticsConsent(next: Exclude<ConsentState, "pending">) {
  try {
    localStorage.setItem(KEY, next);
    if (next === "denied") {
      localStorage.removeItem("atondix-funnel-visitor");
      sessionStorage.removeItem("atondix-funnel-session");
    }
  } catch {
    // Storage can be unavailable in hardened browsers. The SDK remains pending.
  }
  window.dispatchEvent(new CustomEvent(EVENT, { detail: next }));
  window.AtondixStats?.setConsent(next);
}

export function ConsentBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const sync = () => setVisible(readConsent() === "pending");
    sync();
    window.addEventListener(EVENT, sync);
    window.addEventListener("storage", sync);
    const timer = window.setTimeout(() => {
      const consent = readConsent();
      if (consent !== "pending") window.AtondixStats?.setConsent(consent);
    }, 0);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener(EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-white/15 bg-brand-navy px-4 py-4 text-white shadow-2xl" role="region" aria-label="Datenschutzeinstellungen">
      <div className="page-shell flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between lg:gap-8">
        <p className="max-w-3xl text-sm leading-relaxed text-white/80">
          Wir nutzen eine datensparsame, eigene Messung, um die Website zu verbessern. Sie entscheiden selbst, ob diese Messung aktiviert wird. Mehr dazu in der <Link href="/datenschutz" className="font-semibold text-brand-lime underline underline-offset-4">Datenschutzerklärung</Link>.
        </p>
        <div className="flex shrink-0 gap-3">
          <button type="button" onClick={() => setAnalyticsConsent("denied")} className="min-h-11 min-w-32 rounded-[10px] border border-white/50 px-4 py-2 font-semibold text-white transition hover:bg-white/10">Ablehnen</button>
          <button type="button" onClick={() => setAnalyticsConsent("granted")} className="min-h-11 min-w-32 rounded-[10px] bg-white px-4 py-2 font-semibold text-brand-navy transition hover:bg-brand-lime">Zustimmen</button>
        </div>
      </div>
    </div>
  );
}
