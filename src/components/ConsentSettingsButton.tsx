"use client";

export function ConsentSettingsButton() {
  return <button type="button" className="hover:text-white" onClick={() => { try { localStorage.removeItem("atondix-consent"); } catch {} window.AtondixStats?.setConsent("denied"); window.dispatchEvent(new CustomEvent("atondix-consent-change", { detail: "pending" })); }}>Cookie-Einstellungen</button>;
}
