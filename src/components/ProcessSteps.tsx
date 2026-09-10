const steps = [
  { title: "Gemeinsam planen", text: "Zielgruppe, Termin und Räume stimmen wir mit Ihrer Schule ab." },
  { title: "Betriebe einladen", text: "Regionale Ausbildungsbetriebe bringen ihre Berufswelt mit in die Schule." },
  { title: "Ins Gespräch kommen", text: "Jugendliche stellen Fragen und lernen verschiedene Ausbildungswege kennen." },
  { title: "In Kontakt bleiben", text: "Wer Interesse hat, bespricht mit dem Betrieb die nächsten Schritte." },
];

export function ProcessSteps() {
  return <ol className="process-list">{steps.map(({ title, text }, index) => <li key={title}><span className="process-number" aria-hidden="true">{index + 1}</span><h3 className="display">{title}</h3><p>{text}</p></li>)}</ol>;
}
