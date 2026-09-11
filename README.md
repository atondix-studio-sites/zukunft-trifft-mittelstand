# Zukunft trifft Mittelstand

Deutschsprachige Next.js-Site für das regionale Azubi-Speed-Dating. Die Anwendung ist als eigenständiger Docker-Service vorbereitet und bindet Atondix Studio für Leads, Analytics, Revisionen und ausgewählte Content-Slots ein.

## Lokal

```bash
pnpm install
pnpm dev
```

Prüfungen:

```bash
pnpm typecheck
pnpm lint
pnpm build
```

## Docker

```bash
copy .env.example .env
docker compose up --build
```

Setze vor dem Produktivbetrieb `SITE_URL` und `ATONDIX_STUDIO_SITE_TOKEN`. Ohne Token bleiben die geprüften Fallbacks sichtbar, Revision-Preview funktioniert weiterhin und das Kontaktformular zeigt eine alternative Kontaktmöglichkeit.

## Atondix Studio

Das SDK wird in `src/components/StudioSdk.tsx` nach der Hydrierung geladen. Derselbe Site-Token wird serverseitig für den Content-Snapshot und clientseitig für Leads und Analytics verwendet; die Revision-Bridge funktioniert ohne Token. Das Kontaktformular sendet direkt an den Studio-Collector, auch nach interner Navigation und ohne geladenes SDK. Analytics bleibt bis zur aktiven Zustimmung auf `pending`.

Die stabilen Content-IDs stehen in `src/lib/content.ts`: `site_info`, `announcement`, `events`, `testimonials`, `faq` und `partners`. Content wird serverseitig mit einer 60-Sekunden-Revalidierung gelesen; bei Fehlern oder leeren Collections bleiben Fallbacks bestehen.

## Launch-Gate

Vor Veröffentlichung müssen echte Fotos, Logo-Freigabe, Organisationsdaten, Kontaktwege, Lead-Empfänger und rechtlich geprüfte Texte ergänzt werden. Platzhalter werden nicht als echte Aussagen ausgegeben.
