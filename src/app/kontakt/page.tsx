import { EnvelopeSimple, MapPin, Phone } from "@phosphor-icons/react/dist/ssr";
import { ContactForm } from "@/components/ContactForm";
import { ImagePlaceholder } from "@/components/ImagePlaceholder";
import { SectionHeading } from "@/components/SectionHeading";
import { getStudioContent } from "@/lib/content";

export const metadata = { title: "Kontakt", description: "Kontaktieren Sie Zukunft trifft Mittelstand als Schule oder Ausbildungsbetrieb.", alternates: { canonical: "/kontakt" } };

export default async function ContactPage({ searchParams }: { searchParams: Promise<{ rolle?: string }> }) {
  const [content, params] = await Promise.all([getStudioContent(), searchParams]);
  const initialRole = params.rolle === "unternehmen" ? "unternehmen" : "schule";
  const configured = Boolean(process.env.ATONDIX_STUDIO_SITE_TOKEN);
  return <>
    <section className="bg-white py-14 sm:py-20"><div className="page-shell grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start"><div><p className="eyebrow">Kontakt</p><h1 className="display mt-4 text-5xl font-extrabold text-brand-navy sm:text-6xl">Wir freuen uns auf Ihre Nachricht.</h1><p className="mt-6 max-w-xl text-xl leading-relaxed text-brand-ink/75">Sie möchten als Schule oder Unternehmen dabei sein? Schreiben Sie uns kurz, was Sie vorhaben. Wir melden uns persönlich.</p><div className="mt-10 grid gap-5 text-brand-ink/80"><p className="flex gap-3"><EnvelopeSimple size={25} className="mt-0.5 text-brand-green" /><span><strong className="block text-brand-navy">E-Mail</strong>{content.site_info.contact_email}</span></p><p className="flex gap-3"><Phone size={25} className="mt-0.5 text-brand-green" /><span><strong className="block text-brand-navy">Telefon</strong>{content.site_info.contact_phone}</span></p><p className="flex gap-3"><MapPin size={25} className="mt-0.5 text-brand-green" /><span><strong className="block text-brand-navy">Region</strong>{content.site_info.address}</span></p></div><ImagePlaceholder label="Persönlich erreichbar in der Region" className="mt-10 min-h-[14rem]" /></div><ContactForm initialRole={initialRole} configured={configured} /></div></section>
    <section className="page-shell py-20 sm:py-28"><SectionHeading eyebrow="Was passiert danach?" title="Wir melden uns mit einem konkreten nächsten Schritt." intro={<p>{content.site_info.response_time}</p>} /></section>
  </>;
}
