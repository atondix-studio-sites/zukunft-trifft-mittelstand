import Link from "next/link";
import { ArrowRight, ArrowDown, MapPin } from "@phosphor-icons/react/dist/ssr";
import { AudienceCard } from "@/components/AudienceCard";
import { EncounterImage } from "@/components/EncounterImage";
import { ProcessSteps } from "@/components/ProcessSteps";
import { getStudioContent } from "@/lib/content";
import { TrackedLink } from "@/components/TrackedLink";

export default async function HomePage() {
  const content = await getStudioContent();
  const quote = content.testimonials[0];
  return <>
    <section className="home-hero">
      <div className="page-shell hero-grid">
        <div className="hero-copy">
          <p className="hero-location"><MapPin size={18} /> Fürth · Nürnberg · Erlangen</p>
          <h1 className="display">Unternehmen kommen <span>in die Schule.</span></h1>
          <p className="hero-intro">Beim regionalen Azubi-Speed-Dating treffen Jugendliche die Menschen hinter den Ausbildungsberufen. Direkt im Klassenzimmer. Auf Augenhöhe.</p>
          <div className="hero-actions">
            <TrackedLink eventName="audience_cta_click" eventProperties={{ audience: "schule", source: "home_hero" }} href="/kontakt?rolle=schule" className="button button-lime">Als Schule anfragen <ArrowRight size={20} /></TrackedLink>
            <TrackedLink eventName="audience_cta_click" eventProperties={{ audience: "unternehmen", source: "home_hero" }} href="/kontakt?rolle=unternehmen" className="button button-outline">Als Unternehmen teilnehmen <ArrowRight size={20} /></TrackedLink>
          </div>
          <a href="#begegnung" className="hero-discover">Das Format kennenlernen <ArrowDown size={18} /></a>
        </div>
        <div className="hero-visual"><EncounterImage label="Eine Ausbilderin spricht mit zwei Jugendlichen über ein mechanisches Werkstück im Klassenzimmer." preload /><p className="hero-promise">Echte Begegnungen.<br /><span>Echte Chancen.</span></p></div>
      </div>
    </section>
    <div className="region-strip"><div className="page-shell"><p>Berufsorientierung beginnt mit einem Gespräch.</p><span>In der Schule. Mit Betrieben aus der Region.</span></div></div>

    <section id="begegnung" className="page-shell encounter-section">
      <div className="encounter-copy"><h2 className="display">Wie sieht dein<br />Beruf eigentlich aus?</h2><p>Eine Frage, die viel in Bewegung bringen kann. Jugendliche lernen Ausbildungsberufe im persönlichen Austausch kennen – mit Raum für ihre Fragen und ohne Bewerbungsdruck.</p><p>Unternehmen bringen Einblicke aus ihrem Alltag mit. Wir schaffen den Rahmen, damit beide Seiten ins Gespräch kommen.</p><Link href="/idee" className="text-link">Mehr über die Idee <ArrowRight size={20} /></Link></div>
      <EncounterImage variant="craft" label="Ein Handwerker erklärt zwei Jugendlichen eine Holzverbindung an einem Schultisch." />
    </section>

    <section className="audience-section"><div className="page-shell"><div className="section-intro"><h2 className="display">Zusammen wird<br />Ausbildung greifbar.</h2><p>Sie möchten Berufsorientierung an Ihrer Schule gestalten oder Ihren Ausbildungsbetrieb vorstellen? Hier geht es weiter.</p></div><div className="audience-grid"><AudienceCard kind="schule" /><AudienceCard kind="unternehmen" /></div></div></section>

    <section className="page-shell process-section"><div className="section-intro"><h2 className="display">Vom ersten Kontakt<br />zum nächsten Schritt.</h2><p>Wir stimmen den Tag gemeinsam ab. So bleibt vor Ort Zeit für das, worauf es ankommt: die Gespräche.</p></div><ProcessSteps /></section>

    {quote ? <section className="quote-section"><figure className="page-shell"><blockquote className="display">„{quote.quote}“</blockquote><figcaption>{quote.name}{quote.role ? `, ${quote.role}` : ""}{quote.organization ? `, ${quote.organization}` : ""}</figcaption></figure></section> : null}
    {content.partners.length ? <section className="page-shell partners-section"><h2 className="display">Gemeinsam in der Region.</h2><ul>{content.partners.map((partner) => <li key={partner.name}>{partner.url ? <a href={partner.url} target="_blank" rel="noreferrer">{partner.name}</a> : partner.name}</li>)}</ul></section> : null}

    <section className="contact-band"><div className="page-shell"><div><h2 className="display">Der nächste Schritt?<br />Ein Gespräch mit uns.</h2><p>Erzählen Sie uns von Ihrer Schule oder Ihrem Betrieb.</p></div><Link href="/kontakt" className="button button-lime">Jetzt Kontakt aufnehmen <ArrowRight size={22} /></Link></div></section>
  </>;
}
