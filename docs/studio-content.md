# Atondix Studio Content Contract

Die Website verwendet den veröffentlichten Snapshot von `GET /api/collect/content` mit dem Header `Authorization: Bearer <ATONDIX_STUDIO_SITE_TOKEN>`. Der Abruf wird für 60 Sekunden revalidiert. Fehlende Collections oder ungültige Werte fallen auf die geprüften Werte in `src/lib/content.ts` zurück.

## Collections und Feld-IDs

- `site_info`: `contact_email`, `contact_phone`, `address`, `region`, `response_time`, `linkedin_url`, `instagram_url`
- `announcement`: `active`, `text`, `cta_label`, `cta_url`
- `events`: `title`, `date_label`, `location`, `audience`, `registration_url`, `status`
- `testimonials`: `quote`, `name`, `role`, `organization`, `audience`, `portrait`
- `faq`: `question`, `answer`, `audience`
- `partners`: `name`, `logo`, `url`

Die IDs sind Teil des Templates und dürfen nicht ohne gleichzeitige Template-Anpassung geändert werden. Das Studio verändert Inhalte und Reihenfolge, nicht Layout oder Komponenten.
