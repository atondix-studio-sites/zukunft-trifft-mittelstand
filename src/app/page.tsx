import Link from "next/link";
import { ArrowRight, ChartLineUp, Clock, MapPin, UsersThree } from "@phosphor-icons/react/dist/ssr";
import { AudienceCard } from "@/components/AudienceCard";
import { FeatureBand, FeatureItem } from "@/components/FeatureBand";
import { ImagePlaceholder } from "@/components/ImagePlaceholder";
import { ProcessSteps } from "@/components/ProcessSteps";
import { SectionHeading } from "@/components/SectionHeading";
import { getStudioContent } from "@/lib/content";

export default async function HomePage() {
  const content = await getStudioContent();
  const quote = content.testimonials[0];
  return <>
    <section className="bg-white">
      <div className="page-shell grid gap-0 py-8 sm:py-12 lg:grid-cols-[0.88fr_1.12fr] lg:py-16">
        <div className="flex flex-col justify-center bg-brand-navy p-7 text-white sm:p-12 lg:rounded-l-[16px]">
          <p className="eyebrow text-brand-lime">Zukunft trifft Mittelstand</p>
          <h1 className="display mt-5 text-5xl font-extrabold sm:text-6xl">Unternehmen kommen in die Schule.</h1>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-white/80">Das regionale Azubi-Speed-Dating für Schülerinnen, Schüler und Ausbildungsbetriebe.</p>
          <div className="mt-8 flex flex-wrap gap-3"><Link href="/kontakt?rolle=schule" className="inline-flex min-h-12 items-center gap-2 rounded-[10px] bg-brand-green px-5 font-bold text-white transition hover:-translate-y-px hover:bg-brand-lime hover:text-brand-navy">Als Schule anfragen <ArrowRight size={20} /></Link><Link href="/kontakt?rolle=unternehmen" className="inline-flex min-h-12 items-center gap-2 rounded-[10px] border border-white/50 px-5 font-bold text-white transition hover:bg-white hover:text-brand-navy">Als Unternehmen teilnehmen</Link></div>
          <p className="note mt-8 text-brand-lime">Echte Begegnungen.<br />Echte Chancen.</p>
        </div>
        <ImagePlaceholder label="Schülerinnen, Schüler und Unternehmen im Gespräch" className="min-h-[25rem] rounded-none lg:min-h-[35rem] lg:rounded-r-[16px]" />
      </div>
    </section>

    <FeatureBand>
      <FeatureItem icon={<UsersThree size={30} weight="duotone" />} title="Persönliche Gespräche" text="Berufe werden im direkten Austausch greifbar." />
      <FeatureItem icon={<Clock size={30} weight="duotone" />} title="Kurze Wege" text="Einfach geplant und direkt in der Schule umgesetzt." />
      <FeatureItem icon={<MapPin size={30} weight="duotone" />} title="Starke Region" text="Fürth, Nürnberg, Erlangen und Umgebung." />
      <FeatureItem icon={<ChartLineUp size={30} weight="duotone" />} title="Mehr Chancen" text="Kontakte, die über den Tag hinaus wirken." />
    </FeatureBand>

    <section className="page-shell py-20 sm:py-28"><SectionHeading eyebrow="Die Idee" title="Begegnung statt Bewerbungsmarathon." intro={<p>Jugendliche lernen Ausbildungsberufe dort kennen, wo sie ohnehin sind. Unternehmen zeigen Persönlichkeit, Praxis und Perspektive. So wird aus Orientierung ein echtes Gespräch.</p>} /><div className="mt-12 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center"><ImagePlaceholder label="Echte Begegnung im Klassenzimmer" className="min-h-[21rem]" /><div className="prose-copy text-lg text-brand-ink/75"><p>Wir schaffen einen klaren Rahmen für kurze Gespräche zwischen Schulen und regionalen Unternehmen.</p><ul><li>Einfach für Schulen zu organisieren</li><li>Direkter Zugang zu motivierten Jugendlichen</li><li>Persönliche Einblicke ohne Bewerbungsdruck</li></ul><Link href="/idee" className="mt-7 inline-flex items-center gap-2 font-bold text-brand-green">Die Idee kennenlernen <ArrowRight size={20} /></Link></div></div></section>

    <section className="bg-white py-20 sm:py-28"><div className="page-shell"><SectionHeading eyebrow="Für wen?" title="Zwei Seiten. Ein gemeinsames Ziel." intro={<p>Schulen geben Orientierung. Unternehmen geben Einblicke. Wir verbinden beide Seiten mit einem Format, das in den Alltag passt.</p>} align="center" /><div className="mt-12 grid gap-6 md:grid-cols-2"><AudienceCard kind="schule" /><AudienceCard kind="unternehmen" /></div></div></section>

    <section className="page-shell py-20 sm:py-28"><SectionHeading eyebrow="So läuft es ab" title="Einfach. Effizient. Persönlich." intro={<p>Von der gemeinsamen Planung bis zum nächsten Kontakt bleibt der Ablauf klar und überschaubar.</p>} /><div className="mt-12"><ProcessSteps /></div></section>

    {quote ? <section className="bg-brand-mist py-20 sm:py-28"><div className="page-shell grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:items-center"><div className="image-placeholder min-h-[18rem]" aria-label="Portraitplatzhalter"><p className="image-placeholder__label">Echte Stimmen<br /><span className="font-body text-base font-normal text-white/75">Portrait folgt nach Freigabe</span></p></div><figure><blockquote className="display text-4xl font-bold text-brand-navy sm:text-5xl">„{quote.quote}“</blockquote><figcaption className="mt-6 text-brand-ink/70">{quote.name}{quote.role ? `, ${quote.role}` : ""}{quote.organization ? `, ${quote.organization}` : ""}</figcaption></figure></div></section> : null}

    <section className="page-shell py-20 sm:py-28"><div className="rounded-[16px] bg-brand-green p-8 text-white sm:p-12 lg:flex lg:items-end lg:justify-between lg:gap-10"><div><p className="eyebrow text-brand-lime">Bereit für den nächsten Schritt?</p><h2 className="display mt-4 max-w-2xl text-4xl font-extrabold sm:text-5xl">Bringen wir Menschen und Möglichkeiten zusammen.</h2></div><Link href="/kontakt" className="mt-8 inline-flex min-h-12 shrink-0 items-center gap-2 rounded-[10px] bg-white px-6 font-bold text-brand-navy transition hover:-translate-y-px hover:bg-brand-lime">Jetzt Kontakt aufnehmen <ArrowRight size={20} /></Link></div></section>
  </>;
}
