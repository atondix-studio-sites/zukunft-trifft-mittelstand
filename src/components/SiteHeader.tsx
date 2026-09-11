"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { List, X } from "@phosphor-icons/react";
import { useRef, useState } from "react";

const nav = [

  ["/idee", "Die Idee"],
  ["/fuer-schulen", "Für Schulen"],
  ["/fuer-unternehmen", "Für Unternehmen"],

] as const;

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  return (
    <header onKeyDown={(event) => { if (event.key === "Escape" && open) { setOpen(false); toggle.current?.focus(); } }} onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false); }} className="sticky top-0 z-40 border-b border-brand-line/80 bg-white">
      <a href="#main" className="skip-link">Zum Inhalt springen</a>
      <div className="page-shell flex min-h-[76px] items-center justify-between gap-6">
        <Link href="/" aria-label="Zukunft trifft Mittelstand, Startseite" onClick={() => setOpen(false)} className="shrink-0">
          <Image src="/brand/logo.svg" alt="Zukunft trifft Mittelstand" width={260} height={78} priority className="h-12 w-auto" />
        </Link>
        <button ref={toggle} aria-controls="main-navigation" type="button" className="grid min-h-11 min-w-11 place-items-center rounded-[10px] border border-brand-line text-brand-navy lg:hidden" aria-label={open ? "Menü schließen" : "Menü öffnen"} aria-expanded={open} onClick={() => setOpen((value) => !value)}>
          {open ? <X size={25} weight="bold" /> : <List size={25} weight="bold" />}
        </button>
        <nav id="main-navigation" aria-label="Hauptnavigation" className={`${open ? "absolute inset-x-0 top-full max-h-[calc(100dvh-76px)] overflow-y-auto border-b border-brand-line bg-white px-4 py-5 shadow-xl" : "hidden"} lg:static lg:block lg:max-h-none lg:overflow-visible lg:border-0 lg:bg-transparent lg:p-0 lg:shadow-none`}>
          <ul className="flex flex-col gap-1 lg:flex-row lg:items-center lg:gap-6">
            {nav.map(([href, label]) => {
              const active = pathname.startsWith(href);
              return <li key={href}><Link href={href} aria-current={active ? "page" : undefined} onClick={() => setOpen(false)} className={`inline-flex min-h-11 items-center border-b-2 px-1 text-[0.98rem] font-semibold transition ${active ? "border-brand-green text-brand-navy" : "border-transparent text-brand-ink/75 hover:border-brand-lime hover:text-brand-navy"}`}>{label}</Link></li>;
            })}
            <li><Link href="/kontakt" onClick={() => setOpen(false)} className="inline-flex min-h-11 items-center justify-center rounded-[10px] bg-brand-green px-5 font-semibold text-white transition hover:-translate-y-px hover:bg-brand-navy">Jetzt mitmachen <span aria-hidden="true" className="ml-2">→</span></Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
