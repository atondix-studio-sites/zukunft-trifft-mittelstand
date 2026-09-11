import { ArrowRight, CalendarBlank, ChatsCircle, GraduationCap, Handshake } from "@phosphor-icons/react/dist/ssr";

const steps = [
  { icon: CalendarBlank, title: "Gemeinsam planen", text: "Wir stimmen Format, Zielgruppe und Termin gemeinsam mit Ihrer Schule ab." },
  { icon: Handshake, title: "Unternehmen vor Ort", text: "Regionale Ausbildungsbetriebe kommen in die Schule und bringen Einblicke aus ihrem Alltag mit." },
  { icon: ChatsCircle, title: "Persönliche Gespräche", text: "Jugendliche stellen ihre Fragen und lernen die Menschen hinter den Ausbildungsberufen kennen." },
  { icon: GraduationCap, title: "Neue Chancen", text: "Kontakte entstehen. Wer Interesse hat, bespricht mit dem Betrieb die nächsten Schritte." },
];

export function ProcessSteps() {
  return <ol className="process-list">{steps.map(({ icon: Icon, title, text }, index) => <li key={title}>
    <div className="process-step-top"><Icon size={36} weight="duotone" aria-hidden="true" /><span className="process-number" aria-hidden="true">0{index + 1}</span></div>
    <h3 className="display">{title}</h3><p>{text}</p>
    {index < steps.length - 1 ? <ArrowRight className="process-connector" size={20} aria-hidden="true" /> : null}
  </li>)}</ol>;
}
