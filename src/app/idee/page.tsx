import Link from "next/link";
import { ArrowRight, Lightbulb, UsersThree, Wrench } from "@phosphor-icons/react/dist/ssr";
import { FaqList } from "@/components/FaqList";
import { FeatureBand, FeatureItem } from "@/components/FeatureBand";
import { ImagePlaceholder } from "@/components/ImagePlaceholder";
import { PageHero } from "@/components/PageHero";
import { ProcessSteps } from "@/components/ProcessSteps";
import { SectionHeading } from "@/components/SectionHeading";
import { filterAudience, getStudioContent } from "@/lib/content";

export const metadata = { title: "Die Idee" };

export default async function IdeaPage() {
  const content = await getStudioContent();
  return <>
    <PageHero eyebrow="Die Idee" title="Begegnung statt Bewerbungsmarathon." intro="Ausbildung wird dann greifbar, wenn junge Menschen echte Menschen und echte Arbeitswelten kennenlernen." imageLabel="Begegnungen, die Perspektiven öffnen" cta="So läuft es ab" ctaHref="#ablauf" />
    <FeatureBand><FeatureItem icon={<Lightbulb size={30} weight="duotone" />} title="Einfach zugänglich" text="Kurze Gespräche bauen erste Hürden ab." /><FeatureItem icon={<UsersThree size={30} weight="duotone" />} title="Persönlich" text="Menschen zeigen, was Berufe wirklich bedeuten." /><FeatureItem icon={<Wrench size={30} weight="duotone" />} title="Praxisnah" text="Unternehmen bringen Alltag und Aufgaben mit." /><FeatureItem icon={<ArrowRight size={30} weight="duotone" />} title="Auf den Punkt" text="Ein klarer Rahmen macht nächste Schritte sichtbar." /></FeatureBand>
    <section className="page-shell grid gap-10 py-20 sm:py-28 lg:grid-cols-[0.9fr_1.1fr] lg:items-center"><ImagePlaceholder label="Ein offenes Klassenzimmer für neue Möglichkeiten" className="min-h-[23rem]" /><div className="prose-copy text-lg text-brand-ink/75"><p className="eyebrow">Unser Ansatz</p><h2 className="display mt-3 text-4xl font-extrabold text-brand-navy sm:text-5xl">Weniger Distanz. Mehr Einblick.</h2><p className="mt-5">Viele Jugendliche kennen Ausbildungsberufe nur aus Beschreibungen. Beim Azubi-Speed-Dating begegnen sie den Menschen dahinter, stellen Fragen und entdecken, was zu ihnen passen könnte.</p><p>Für Schulen bleibt der Aufwand überschaubar. Für Unternehmen entsteht ein direkter, fairer Zugang zu motivierten Jugendlichen aus der Region.</p></div></section>
    <section id="ablauf" className="scroll-mt-24 bg-white py-20 sm:py-28"><div className="page-shell"><SectionHeading eyebrow="Der Ablauf" title="Vier Schritte, ein klares Ziel." intro={<p>Wir halten den Rahmen einfach, damit die Gespräche im Mittelpunkt stehen.</p>} /><div className="mt-12"><ProcessSteps /></div></div></section>
    <section className="page-shell py-20 sm:py-28"><div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start"><SectionHeading eyebrow="Häufige Fragen" title="Was Sie wissen möchten." intro={<p>Die wichtigsten Antworten auf einen Blick. Alles Weitere klären wir persönlich.</p>} /><FaqList items={filterAudience(content.faq, "schule").concat(filterAudience(content.faq, "unternehmen")).filter((item, index, all) => all.findIndex((candidate) => candidate.question === item.question) === index).slice(0, 5)} /></div></section>
    <section className="page-shell pb-20 sm:pb-28"><div className="rounded-[16px] bg-brand-navy p-8 text-white sm:p-12"><p className="eyebrow text-brand-lime">Gemeinsam loslegen</p><h2 className="display mt-4 max-w-2xl text-4xl font-extrabold sm:text-5xl">Eine Begegnung kann den Unterschied machen.</h2><Link href="/kontakt" className="mt-8 inline-flex min-h-12 items-center gap-2 rounded-[10px] bg-brand-green px-6 font-bold text-white transition hover:bg-brand-lime hover:text-brand-navy">Kontakt aufnehmen <ArrowRight size={20} /></Link></div></section>
  </>;
}
