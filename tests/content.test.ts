import { describe, expect, it } from "vitest";
import { fallbackContent, filterAudience, mapSnapshot } from "@/lib/content";

describe("Studio content adapter", () => {
  it("keeps fallbacks when a snapshot is empty", () => {
    const result = mapSnapshot({ collections: {} });
    expect(result.site_info.contact_email).toBe(fallbackContent.site_info.contact_email);
    expect(result.faq.length).toBeGreaterThan(0);
  });

  it("maps stable collection ids and filters audiences", () => {
    const result = mapSnapshot({ collections: { faq: { entries: [{ values: { question: "Nur Unternehmen?", answer: "Ja", audience: "unternehmen" } }] } } });
    expect(filterAudience(result.faq, "unternehmen")).toHaveLength(1);
    expect(filterAudience(result.faq, "schule")).toHaveLength(0);
  });
});
