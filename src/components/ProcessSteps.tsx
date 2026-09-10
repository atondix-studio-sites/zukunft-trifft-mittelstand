import { ArrowRight, CalendarBlank, ChatsCircle, GraduationCap, Handshake } from "@phosphor-icons/react/dist/ssr";

const steps = [
  { icon: CalendarBlank, title: "Planung", text: "Wir stimmen Format, Zielgruppe und Termin gemeinsam mit der Schule ab." },
  { icon: Handshake, title: "Unternehmen vor Ort", text: "Regionale Ausbildungsbetriebe kommen direkt in die Schule." },
  { icon: ChatsCircle, title: "Persönliche Gespräche", text: "Kurze, echte Gespräche machen Berufe und Menschen greifbar." },
  { icon: GraduationCap, title: "Neue Chancen", text: "Kontakte entstehen und nächste Schritte werden konkret." },
];

export function ProcessSteps() {
  return <div className="grid gap-6 md:grid-cols-4">
    {steps.map(({ icon: Icon, title, text }, index) => <div key={title} className="relative border-t-2 border-brand-green pt-5">
      <div className="flex items-center justify-between"><Icon size={34} weight="duotone" className="text-brand-green" /><span className="font-display text-3xl font-extrabold text-brand-line">0{index + 1}</span></div>
      <h3 className="display mt-6 text-2xl font-bold text-brand-navy">{title}</h3>
      <p className="mt-2 text-brand-ink/75">{text}</p>
      {index < steps.length - 1 ? <ArrowRight size={22} className="absolute -right-4 top-5 hidden text-brand-green md:block" aria-hidden="true" /> : null}
    </div>)}
  </div>;
}
