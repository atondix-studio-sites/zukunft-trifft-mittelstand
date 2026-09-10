import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, EnvelopeSimple, MapPin, Phone } from "@phosphor-icons/react/dist/ssr";
import type { SiteInfo } from "@/lib/content";
import { ConsentSettingsButton } from "@/components/ConsentSettingsButton";

export function SiteFooter({ info }: { info: SiteInfo }) {
  return (
    <footer className="mt-20 bg-brand-navy text-white">
      <div className="page-shell grid gap-10 py-14 md:grid-cols-[1.2fr_0.8fr_0.8fr]">
        <div>
          <Image src="/brand/logo.svg" alt="Zukunft trifft Mittelstand" width={260} height={78} className="h-14 w-auto brightness-0 invert" />
          <p className="mt-5 max-w-sm text-white/75">Echte Begegnungen. Echte Chancen. Wir bringen Schulen und regionale Unternehmen persönlich zusammen.</p>
        </div>
        <div>
          <p className="font-display text-lg font-bold">Kontakt</p>
          <ul className="mt-4 grid gap-3 text-sm text-white/75">
            <li className="flex gap-2"><EnvelopeSimple size={20} className="mt-0.5 shrink-0 text-brand-lime" /><span>{info.contact_email}</span></li>
            <li className="flex gap-2"><Phone size={20} className="mt-0.5 shrink-0 text-brand-lime" /><span>{info.contact_phone}</span></li>
            <li className="flex gap-2"><MapPin size={20} className="mt-0.5 shrink-0 text-brand-lime" /><span>{info.address}</span></li>
          </ul>
        </div>
        <div>
          <p className="font-display text-lg font-bold">Weiterlesen</p>
          <ul className="mt-4 grid gap-2 text-sm text-white/75">
            <li><Link href="/idee" className="transition hover:text-brand-lime">Die Idee <ArrowUpRight className="inline" size={15} /></Link></li>
            <li><Link href="/fuer-schulen" className="transition hover:text-brand-lime">Für Schulen <ArrowUpRight className="inline" size={15} /></Link></li>
            <li><Link href="/fuer-unternehmen" className="transition hover:text-brand-lime">Für Unternehmen <ArrowUpRight className="inline" size={15} /></Link></li>
            <li><Link href="/kontakt" className="transition hover:text-brand-lime">Kontakt <ArrowUpRight className="inline" size={15} /></Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/15">
        <div className="page-shell flex flex-col gap-3 py-5 text-sm text-white/60 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Zukunft trifft Mittelstand</p>
          <div className="flex flex-wrap gap-4"><Link href="/impressum" className="hover:text-white">Impressum</Link><Link href="/datenschutz" className="hover:text-white">Datenschutz</Link><ConsentSettingsButton /></div>
        </div>
      </div>
    </footer>
  );
}
