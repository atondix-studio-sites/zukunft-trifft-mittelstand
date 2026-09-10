import { ArrowRight, Buildings, GraduationCap } from "@phosphor-icons/react/dist/ssr";
import { TrackedLink } from "@/components/TrackedLink";

export function AudienceCard({ kind }: { kind: "schule" | "unternehmen" }) {
  const school = kind === "schule";
  return <article className="surface-card group flex h-full flex-col p-6 transition hover:-translate-y-1 sm:p-8">
    <div className="flex items-start justify-between gap-4"><div className="grid h-14 w-14 place-items-center rounded-full bg-brand-mist text-brand-green">{school ? <GraduationCap size={31} weight="duotone" /> : <Buildings size={31} weight="duotone" />}</div><span className="eyebrow">Für {school ? "Schulen" : "Unternehmen"}</span></div>
    <h3 className="display mt-7 text-3xl font-extrabold text-brand-navy">{school ? "Berufsorientierung, die begeistert." : "Talente von morgen persönlich kennenlernen."}</h3>
    <p className="mt-4 flex-1 text-brand-ink/75">{school ? "Wir bringen Wirtschaft ins Klassenzimmer und machen Ausbildungswege ohne großen organisatorischen Aufwand erlebbar." : "Treffen Sie motivierte Jugendliche direkt vor Ort und zeigen Sie, was Ihre Ausbildung besonders macht."}</p>
    <TrackedLink eventName="audience_cta_click" eventProperties={{ audience: kind, source: "audience_card" }} href={`/kontakt?rolle=${kind}`} className="mt-7 inline-flex min-h-11 items-center gap-2 font-bold text-brand-green transition group-hover:gap-3">{school ? "Als Schule anfragen" : "Als Unternehmen teilnehmen"} <ArrowRight size={20} /></TrackedLink>
  </article>;
}
