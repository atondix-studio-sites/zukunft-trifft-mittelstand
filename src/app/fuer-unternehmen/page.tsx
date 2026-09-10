import Link from "next/link";
import { ArrowRight, ChartLineUp, Handshake, RocketLaunch, UsersThree } from "@phosphor-icons/react/dist/ssr";
import { FaqList } from "@/components/FaqList";
import { FeatureBand, FeatureItem } from "@/components/FeatureBand";
import { ImagePlaceholder } from "@/components/ImagePlaceholder";
import { PageHero } from "@/components/PageHero";
import { SectionHeading } from "@/components/SectionHeading";
import { filterAudience, getStudioContent } from "@/lib/content";

export const metadata = { title: "Für Unternehmen" };

export default async function CompaniesPage() {
  const content = await getStudioContent();
  const faq = filterAudience(content.faq, "unternehmen");
  return <>
    <PageHero eyebrow="Für Unternehmen" title="Talente von morgen persönlich kennenlernen." intro="Zeigen Sie Jugendlichen, was Ihre Ausbildung ausmacht. Direkt vor Ort, mit kurzen Gesprächen und ohne großen Bewerbungsaufwand." imageLabel="Ausbildungsbetrieb im Gespräch mit Jugendlichen" cta="Als Unternehmen teilnehmen" ctaHref="/kontakt?rolle=unternehmen" />
    <FeatureBand><FeatureItem icon={<UsersThree size={30} weight="duotone" />} title="Direkter Zugang" text="Lernen Sie interessierte Jugendliche persönlich kennen." /><FeatureItem icon={<RocketLaunch size={30} weight="duotone" />} title="Effizient" text="Kurze Gespräche mit einem klaren Rahmen." /><FeatureItem icon={<ChartLineUp size={30} weight="duotone" />} title="Sichtbar werden" text="Zeigen Sie Ihre Ausbildungsberufe und Ihre Kultur." /><FeatureItem icon={<Handshake size={30} weight="duotone" />} title="Nachhaltig" text="Gute Kontakte können über den Tag hinaus wirken." /></FeatureBand>
    <section className="page-shell grid gap-10 py-20 sm:py-28 lg:grid-cols-[0.95fr_1.05fr] lg:items-center"><ImagePlaceholder label="Unternehmen zeigen ihre Praxis und Persönlichkeit" className="min-h-[24rem]" /><div className="prose-copy text-lg text-brand-ink/75"><p className="eyebrow">Ihre Teilnahme</p><h2 className="display mt-3 text-4xl font-extrabold text-brand-navy sm:text-5xl">Gemeinsam Zukunft zeigen.</h2><p className="mt-5">Sie bringen eine Ansprechperson, echte Einblicke und Lust auf Austausch mit. Wir übernehmen die Abstimmung mit der Schule und sorgen für einen strukturierten Tag.</p><ul><li>Ausbildungsberufe verständlich vorstellen</li><li>Motivierte Jugendliche direkt erreichen</li><li>Fragen aus erster Hand beantworten</li><li>Nach dem Termin ansprechbar bleiben</li></ul><Link href="/kontakt?rolle=unternehmen" className="mt-8 inline-flex min-h-12 items-center gap-2 rounded-[10px] bg-brand-green px-6 font-bold text-white transition hover:bg-brand-navy">Teilnahme besprechen <ArrowRight size={20} /></Link></div></section>
    <section className="bg-white py-20 sm:py-28"><div className="page-shell"><SectionHeading eyebrow="Vor Ort" title="Ein Gespräch mit Wirkung." intro={<p>Die Jugendlichen kommen mit Fragen. Sie bringen Antworten, Beispiele und echte Einblicke mit.</p>} /><div className="mt-12 grid gap-6 md:grid-cols-3"><div className="rounded-[16px] border border-brand-line p-6"><p className="display text-4xl font-bold text-brand-green">01</p><h3 className="mt-5 font-display text-2xl font-bold text-brand-navy">Vorbereiten</h3><p className="mt-2 text-brand-ink/75">Wir klären Ausbildungsberufe, Zielgruppe und Termin.</p></div><div className="rounded-[16px] border border-brand-line p-6"><p className="display text-4xl font-bold text-brand-green">02</p><h3 className="mt-5 font-display text-2xl font-bold text-brand-navy">Begegnen</h3><p className="mt-2 text-brand-ink/75">Sie führen kurze persönliche Gespräche direkt in der Schule.</p></div><div className="rounded-[16px] border border-brand-line p-6"><p className="display text-4xl font-bold text-brand-green">03</p><h3 className="mt-5 font-display text-2xl font-bold text-brand-navy">Verbinden</h3><p className="mt-2 text-brand-ink/75">Interessierte Jugendliche wissen, wie es weitergehen kann.</p></div></div></div></section>
    {faq.length ? <section className="page-shell py-20 sm:py-28"><div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start"><SectionHeading eyebrow="FAQ für Unternehmen" title="Klarheit vor dem ersten Gespräch." /><FaqList items={faq} /></div></section> : null}
  </>;
}
