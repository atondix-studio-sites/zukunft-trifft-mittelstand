import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { EncounterImage } from "@/components/EncounterImage";
import { TrackedLink } from "@/components/TrackedLink";

export function PageHero({ eyebrow, title, intro, imageLabel, cta, ctaHref = "/kontakt" }: { eyebrow: string; title: string; intro: string; imageLabel: string; cta?: string; ctaHref?: string }) {
  return <section className="page-shell grid gap-8 py-12 sm:py-16 lg:grid-cols-[0.92fr_1.08fr] lg:items-center lg:py-20">
    <div className="max-w-2xl">
      <p className="eyebrow">{eyebrow}</p>
      <h1 className="display mt-4 text-5xl font-extrabold text-brand-navy sm:text-6xl">{title}</h1>
      <p className="mt-6 max-w-xl text-xl leading-relaxed text-brand-ink/75">{intro}</p>
      {cta ? <TrackedLink eventName={ctaHref.includes("rolle=") ? "audience_cta_click" : "navigation_cta_click"} eventProperties={ctaHref.includes("rolle=") ? { audience: ctaHref.includes("unternehmen") ? "unternehmen" : "schule", source: "page_hero" } : { source: "page_hero" }} href={ctaHref} className="mt-8 inline-flex min-h-12 items-center gap-2 rounded-[10px] bg-brand-green px-6 font-bold text-white transition hover:-translate-y-px hover:bg-brand-navy">{cta}<ArrowRight size={20} /></TrackedLink> : null}
    </div>
    <EncounterImage preload variant={ctaHref.includes("unternehmen") ? "craft" : "classroom"} label={imageLabel} className="min-h-[22rem] lg:min-h-[30rem]" />
  </section>;
}
