import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { TrackedLink } from "@/components/TrackedLink";

export function AudienceCard({ kind }: { kind: "schule" | "unternehmen" }) {
  const school = kind === "schule";
  return <article className={`audience-option ${school ? "audience-school" : "audience-company"}`}>
    <p className="audience-label">Für {school ? "Schulen" : "Unternehmen"}</p>
    <h3 className="display">{school ? "Berufswelten ins Klassenzimmer holen." : "Zeigen, was in Ihrem Betrieb steckt."}</h3>
    <p>{school ? "Praxisnahe Berufsorientierung für Ihre Klassen. Wir koordinieren die Betriebe und planen den Ablauf gemeinsam mit Ihnen." : "Lernen Sie Jugendliche aus der Region kennen. Bringen Sie Ihre Ausbildungsberufe und Beispiele aus dem Arbeitsalltag mit."}</p>
    <TrackedLink eventName="audience_cta_click" eventProperties={{ audience: kind, source: "audience_card" }} href={school ? "/fuer-schulen" : "/fuer-unternehmen"} className="text-link">{school ? "Das Angebot für Schulen" : "So nehmen Unternehmen teil"} <ArrowRight size={22} /></TrackedLink>
  </article>;
}
