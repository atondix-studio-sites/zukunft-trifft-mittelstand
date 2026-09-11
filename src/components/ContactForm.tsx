"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { ArrowRight } from "@phosphor-icons/react";
import { trackEvent } from "@/lib/analytics";

type Role = "schule" | "unternehmen";

export function ContactForm({ initialRole, token }: { initialRole?: Role; token?: string }) {
  const configured = Boolean(token);
  const [role, setRole] = useState<Role>(initialRole ?? "schule");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [started, setStarted] = useState(false);
  const startedAt = useRef(0);
  const pending = useRef(false);

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!token || pending.current) return;
    const form = event.currentTarget;
    const fields = Object.fromEntries(new FormData(form));
    pending.current = true;
    setStatus("sending");
    setMessage("");
    let consent = "pending";
    try {
      const stored = localStorage.getItem("atondix-consent");
      if (stored === "granted" || stored === "denied") consent = stored;
    } catch { /* Lead intake also works without browser storage. */ }
    try {
      const response = await fetch("https://studio.atondix.de/api/collect/forms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: AbortSignal.timeout(15000),
        body: JSON.stringify({ siteToken: token, fields, honeypot: String(fields.website || ""), formStartedAt: startedAt.current, path: window.location.pathname, url: window.location.href, referrer: document.referrer, consent, occurredAt: new Date().toISOString() }),
      });
      if (!response.ok) throw new Error("Submission failed");
      form.reset();
      startedAt.current = Date.now();
      setStatus("success");
      setMessage("Vielen Dank. Ihre Nachricht ist angekommen. Wir melden uns zeitnah.");
      trackEvent("contact_form_success", { role });
    } catch {
      setStatus("error");
      setMessage("Der Versand konnte nicht bestätigt werden. Ihre Eingaben bleiben erhalten. Bitte versuchen Sie es später erneut oder nutzen Sie einen verfügbaren Kontaktweg.");
      trackEvent("contact_form_error", { role });
    } finally {
      pending.current = false;
    }
  }

  return <form className="contact-form surface-card min-w-0 p-6 sm:p-8" aria-busy={status === "sending"} onFocus={() => { if (!started) { setStarted(true); trackEvent("contact_form_start", { role }); } }} onSubmit={submit}>
    <fieldset disabled={!configured || status === "sending"}>
      <legend className="display text-3xl font-bold text-brand-navy">Ich bin …</legend>
      <div className="mt-4 grid grid-cols-2 gap-2 rounded-[10px] bg-brand-mist p-1">
        {(["schule", "unternehmen"] as const).map((value) => <label key={value} className={`flex min-h-11 cursor-pointer items-center justify-center rounded-[8px] px-3 text-center text-sm font-bold transition ${role === value ? "bg-brand-navy text-white" : "text-brand-navy hover:bg-white"}`}><input className="sr-only" type="radio" name="role" value={value} checked={role === value} onChange={() => setRole(value)} />{value === "schule" ? "Schule" : "Unternehmen"}</label>)}
      </div>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <label className="grid gap-1.5 text-sm font-semibold text-brand-navy">Name *<input required name="name" autoComplete="name" className="min-h-12 rounded-[10px] border border-brand-line bg-white px-3 font-normal text-brand-ink" /></label>
        <label className="grid gap-1.5 text-sm font-semibold text-brand-navy">E-Mail *<input required type="email" name="email" autoComplete="email" className="min-h-12 rounded-[10px] border border-brand-line bg-white px-3 font-normal text-brand-ink" /></label>
        <label className="grid gap-1.5 text-sm font-semibold text-brand-navy">Organisation<input name="organization" autoComplete="organization" className="min-h-12 rounded-[10px] border border-brand-line bg-white px-3 font-normal text-brand-ink" /></label>
        <label className="grid gap-1.5 text-sm font-semibold text-brand-navy">Telefon<input name="phone" type="tel" autoComplete="tel" className="min-h-12 rounded-[10px] border border-brand-line bg-white px-3 font-normal text-brand-ink" /></label>
      </div>
      <label className="mt-4 grid gap-1.5 text-sm font-semibold text-brand-navy">Ihre Nachricht *<textarea required name="message" rows={5} className="rounded-[10px] border border-brand-line bg-white px-3 py-3 font-normal text-brand-ink" /></label>
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="absolute -left-[10000px] h-px w-px opacity-0" aria-hidden="true" />
      <label className="mt-4 flex items-start gap-3 text-sm text-brand-ink/75"><input required name="privacy" value="yes" type="checkbox" className="mt-1 h-4 w-4 accent-brand-green" /> <span>Ich stimme der Verarbeitung meiner Angaben gemäß <a href="/datenschutz" className="font-semibold text-brand-green underline underline-offset-2">Datenschutzerklärung</a> zu. *</span></label>
      <button type="submit" className="mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-[10px] bg-brand-green px-5 font-bold text-white transition hover:-translate-y-px hover:bg-brand-navy disabled:cursor-not-allowed disabled:opacity-60">{status === "sending" ? "Wird gesendet …" : "Nachricht senden"}<ArrowRight size={20} aria-hidden="true" /></button>
    </fieldset>
    {!configured ? <p className="mt-4 rounded-[10px] bg-brand-mist p-3 text-sm text-brand-ink/75" role="status">Das Formular ist derzeit nicht verfügbar. Sobald die Kontaktwege freigeschaltet sind, können Sie uns hier erreichen.</p> : null}
    {message ? <p className={`mt-4 rounded-[10px] p-3 text-sm ${status === "error" ? "bg-red-50 text-red-800" : "bg-brand-mist text-brand-navy"}`} role={status === "error" ? "alert" : "status"}>{message}</p> : null}
  </form>;
}
