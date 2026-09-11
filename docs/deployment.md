# Deployment Runbook

## Variablen

- `SITE_URL`: kanonische Produktions-URL für Metadata, Sitemap und Robots.
- `ATONDIX_STUDIO_SITE_TOKEN`: Laufzeit-Token für Snapshot, Lead-Formulare und Analytics.
- `PORT`: HTTP-Port, standardmäßig 3000.

## Lead-Erfassung

`ContactForm` sendet direkt an `https://studio.atondix.de/api/collect/forms` mit dem bestehenden Site-Token und dem Payload des Studio-SDKs (`fields`, `honeypot`, `formStartedAt`, Seiten-URL, Referrer und Consent). Das Formular benötigt weder Analytics-Zustimmung noch ein geladenes SDK und funktioniert auch nach clientseitiger Navigation. Es trägt bewusst kein `data-atondix-form`, damit das SDK keine zweite Anfrage auslöst.

Die Felder sind `role` (`schule` / `unternehmen`), `name`, `email`, `organization`, `phone`, `message`, `privacy` und `website` (Honeypot). Nach bestätigtem Erfolg werden die Eingaben geleert; bei Fehlern oder nach 15 Sekunden ohne Antwort bleiben sie erhalten. Keine automatische Wiederholung, da eine Antwort nach bereits erfolgter Annahme verloren gehen kann.

Der Root-Layout liest die Konfiguration zur Laufzeit. Damit bleibt ein ohne Token gebautes Container-Image nach Setzen von `ATONDIX_STUDIO_SITE_TOKEN` verwendbar. Ohne Token ist die Absendung gesperrt. Den zur Website gehörenden Token in der Deployment-Umgebung setzen und den Lead-Empfänger in Studio prüfen; anschließend die Annahme einer autorisierten Testanfrage im zugehörigen Studio-Projekt bestätigen.

`pnpm test:e2e` verwendet ausschließlich einen künstlichen Token und abgefangene Browser-Anfragen. Diese Tests belegen Formularverhalten und Payload, nicht die produktive Zustellung.

## Container

Das Dockerfile baut Next.js als Standalone-Ausgabe, startet als nicht privilegierter Benutzer und stellt `/api/health` bereit. `docker compose up --build` ist der lokale Produktions-Smoke-Test.

Die CSP erlaubt das Einbetten ausschließlich durch `https://studio.atondix.de`, damit die Revisions-Preview ihre Seitenposition über das SDK melden kann. Weitere Frame-Hosts werden nicht freigeschaltet.

## Freigabe

Vor dem Rollout prüfen: DNS und HTTPS, Atondix-Lead-Empfänger, Studio-Schema, Consent-Text, Impressum, Datenschutz, Bildrechte, Formularzustände, Sitemap und eine echte Testanfrage. Nach dem Rollout eine Revision-Pin-Probe und eine Testanfrage im Studio prüfen.
