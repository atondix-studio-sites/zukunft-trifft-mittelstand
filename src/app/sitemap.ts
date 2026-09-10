import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.SITE_URL || "http://localhost:3000";
  return ["/", "/idee", "/fuer-schulen", "/fuer-unternehmen", "/kontakt", "/impressum", "/datenschutz"].map((path) => ({ url: `${base}${path}`, lastModified: new Date() }));
}
