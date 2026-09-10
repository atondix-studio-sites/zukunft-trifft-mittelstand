const CONSENT_KEY = "atondix-consent";

export function trackEvent(event: string, properties?: Record<string, unknown>) {
  if (typeof window === "undefined") return;

  try {
    if (window.localStorage.getItem(CONSENT_KEY) !== "granted") return;
  } catch {
    return;
  }

  window.AtondixStats?.track?.(event, properties);
}
