# Deployment Runbook

## Variablen

- `SITE_URL`: kanonische Produktions-URL für Metadata, Sitemap und Robots.
- `ATONDIX_STUDIO_SITE_TOKEN`: Laufzeit-Token für Snapshot, Lead-Formulare und Analytics.
- `PORT`: HTTP-Port, standardmäßig 3000.

## Container

Das Dockerfile baut Next.js als Standalone-Ausgabe, startet als nicht privilegierter Benutzer und stellt `/api/health` bereit. `docker compose up --build` ist der lokale Produktions-Smoke-Test.

## Freigabe

Vor dem Rollout prüfen: DNS und HTTPS, Atondix-Lead-Empfänger, Studio-Schema, Consent-Text, Impressum, Datenschutz, Bildrechte, Formularzustände, Sitemap und eine echte Testanfrage. Nach dem Rollout eine Revision-Pin-Probe und eine Testanfrage im Studio prüfen.
