export {};

declare global {
  interface Window {
    AtondixStats?: {
      setConsent: (consent: "granted" | "denied") => void;
      track?: (event: string, properties?: Record<string, unknown>) => void;
    };
  }
}
