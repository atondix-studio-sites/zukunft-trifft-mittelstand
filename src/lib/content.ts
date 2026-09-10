export type Audience = "schule" | "unternehmen" | "alle";

export type SiteInfo = {
  contact_email: string;
  contact_phone: string;
  address: string;
  region: string;
  response_time: string;
  linkedin_url: string;
  instagram_url: string;
};

export type Announcement = {
  active: boolean;
  text: string;
  cta_label: string;
  cta_url: string;
};

export type EventItem = {
  title: string;
  date_label: string;
  location: string;
  audience: Audience;
  registration_url: string;
  status: string;
};

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  organization: string;
  audience: Audience;
  portrait?: { url: string; fileName?: string };
};

export type FaqItem = {
  question: string;
  answer: string;
  audience: Audience;
};

export type Partner = {
  name: string;
  logo?: { url: string; fileName?: string };
  url: string;
};

export type StudioContent = {
  site_info: SiteInfo;
  announcement: Announcement;
  events: EventItem[];
  testimonials: Testimonial[];
  faq: FaqItem[];
  partners: Partner[];
};

export const fallbackContent: StudioContent = {
  site_info: {
    contact_email: "Ihre E-Mail-Adresse folgt",
    contact_phone: "Ihre Telefonnummer folgt",
    address: "Fürth | Nürnberg | Erlangen",
    region: "Metropolregion Nürnberg",
    response_time: "Wir melden uns zeitnah bei Ihnen.",
    linkedin_url: "",
    instagram_url: "",
  },
  announcement: { active: false, text: "", cta_label: "", cta_url: "" },
  events: [],
  testimonials: [],
  partners: [],
  faq: [
    { question: "Wie lange dauern die Gespräche?", answer: "Die Gesprächszeiten werden gemeinsam mit der Schule geplant und vorab klar kommuniziert.", audience: "alle" },
    { question: "Welche Schulen können teilnehmen?", answer: "Das Angebot richtet sich an weiterführende Schulen in der Region. Wir klären die Voraussetzungen persönlich.", audience: "schule" },
    { question: "Was kostet die Teilnahme?", answer: "Die konkreten Rahmenbedingungen besprechen wir transparent im Erstgespräch.", audience: "alle" },
    { question: "Wie können Unternehmen teilnehmen?", answer: "Unternehmen melden sich über das Formular. Anschließend stimmen wir Branche, Ausbildungsberufe und Termin ab.", audience: "unternehmen" },
  ],
};

type SnapshotEntry = { values?: Record<string, unknown> };
type Snapshot = { collections?: Record<string, { entries?: SnapshotEntry[] }> };

function stringValue(value: unknown, fallback = "") {
  return typeof value === "string" ? value : fallback;
}

function boolValue(value: unknown, fallback = false) {
  return typeof value === "boolean" ? value : fallback;
}

function entry(snapshot: Snapshot | null | undefined, collection: string) {
  return snapshot?.collections?.[collection]?.entries?.[0]?.values ?? {};
}

function list(snapshot: Snapshot | null | undefined, collection: string) {
  return snapshot?.collections?.[collection]?.entries ?? [];
}

function imageValue(value: unknown) {
  if (!value || typeof value !== "object" || !("url" in value)) return undefined;
  const candidate = value as { url?: unknown; fileName?: unknown };
  return typeof candidate.url === "string" ? { url: candidate.url, fileName: stringValue(candidate.fileName) } : undefined;
}

export function mapSnapshot(snapshot: Snapshot | null | undefined): StudioContent {
  const info = entry(snapshot, "site_info");
  const announcement = entry(snapshot, "announcement");
  const mapped: StudioContent = structuredClone(fallbackContent);

  mapped.site_info = {
    contact_email: stringValue(info.contact_email, mapped.site_info.contact_email),
    contact_phone: stringValue(info.contact_phone, mapped.site_info.contact_phone),
    address: stringValue(info.address, mapped.site_info.address),
    region: stringValue(info.region, mapped.site_info.region),
    response_time: stringValue(info.response_time, mapped.site_info.response_time),
    linkedin_url: stringValue(info.linkedin_url),
    instagram_url: stringValue(info.instagram_url),
  };
  mapped.announcement = {
    active: boolValue(announcement.active),
    text: stringValue(announcement.text),
    cta_label: stringValue(announcement.cta_label),
    cta_url: stringValue(announcement.cta_url),
  };
  mapped.events = list(snapshot, "events").flatMap((item) => {
    const values = item.values ?? {};
    const title = stringValue(values.title);
    return title ? [{ title, date_label: stringValue(values.date_label), location: stringValue(values.location), audience: (values.audience === "schule" || values.audience === "unternehmen" ? values.audience : "alle") as Audience, registration_url: stringValue(values.registration_url), status: stringValue(values.status) }] : [];
  });
  mapped.testimonials = list(snapshot, "testimonials").flatMap((item) => {
    const values = item.values ?? {};
    const quote = stringValue(values.quote);
    return quote ? [{ quote, name: stringValue(values.name), role: stringValue(values.role), organization: stringValue(values.organization), audience: (values.audience === "schule" || values.audience === "unternehmen" ? values.audience : "alle") as Audience, portrait: imageValue(values.portrait) }] : [];
  });
  mapped.faq = list(snapshot, "faq").flatMap((item) => {
    const values = item.values ?? {};
    const question = stringValue(values.question);
    return question ? [{ question, answer: stringValue(values.answer), audience: (values.audience === "schule" || values.audience === "unternehmen" ? values.audience : "alle") as Audience }] : [];
  });
  mapped.partners = list(snapshot, "partners").flatMap((item) => {
    const values = item.values ?? {};
    const name = stringValue(values.name);
    return name ? [{ name, logo: imageValue(values.logo), url: stringValue(values.url) }] : [];
  });
  if (!mapped.faq.length) mapped.faq = fallbackContent.faq;
  return mapped;
}

export async function getStudioContent(): Promise<StudioContent> {
  const token = process.env.ATONDIX_STUDIO_SITE_TOKEN;
  if (!token) return fallbackContent;
  try {
    const response = await fetch("https://studio.atondix.de/api/collect/content", {
      headers: { Authorization: `Bearer ${token}` },
      next: { revalidate: 60 },
    });
    if (!response.ok) return fallbackContent;
    return mapSnapshot((await response.json()) as Snapshot);
  } catch {
    return fallbackContent;
  }
}

export function filterAudience<T extends { audience: Audience }>(items: T[], audience: Exclude<Audience, "alle">) {
  return items.filter((item) => item.audience === "alle" || item.audience === audience);
}
