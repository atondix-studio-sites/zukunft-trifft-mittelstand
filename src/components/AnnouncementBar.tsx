import Link from "next/link";
import type { Announcement } from "@/lib/content";

export function AnnouncementBar({ announcement }: { announcement: Announcement }) {
  if (!announcement.active || !announcement.text) return null;

  return <aside aria-label="Aktuelle Meldung" className="bg-brand-lime text-brand-navy">
    <div className="page-shell flex flex-col gap-2 py-3 text-sm font-semibold sm:flex-row sm:items-center sm:justify-between sm:gap-6">
      <p>{announcement.text}</p>
      {announcement.cta_label && announcement.cta_url ? <Link href={announcement.cta_url} className="inline-flex min-h-11 items-center underline underline-offset-4">{announcement.cta_label}<span aria-hidden="true" className="ml-2">→</span></Link> : null}
    </div>
  </aside>;
}
