import type { Metadata } from "next";
import "./globals.css";
import "@fontsource/barlow-semi-condensed/600.css";
import "@fontsource/barlow-semi-condensed/700.css";
import "@fontsource/barlow-semi-condensed/800.css";
import "@fontsource/source-sans-3/400.css";
import "@fontsource/source-sans-3/600.css";
import "@fontsource/source-sans-3/700.css";
import "@fontsource/caveat/600.css";
import { ConsentBanner } from "@/components/ConsentBanner";
import { AnnouncementBar } from "@/components/AnnouncementBar";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { StudioSdk } from "@/components/StudioSdk";
import { getStudioContent } from "@/lib/content";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.SITE_URL || "http://localhost:3000"),
  title: { default: "Zukunft trifft Mittelstand", template: "%s | Zukunft trifft Mittelstand" },
  description: "Echte Begegnungen. Echte Chancen. Unternehmen kommen in die Schule.",
  alternates: { canonical: "/" },
  icons: { icon: "/favicon.svg" },
  openGraph: { type: "website", siteName: "Zukunft trifft Mittelstand", locale: "de_DE", images: [{ url: "/brand/og-card.png", width: 1200, height: 630, alt: "Zukunft trifft Mittelstand – Echte Begegnungen. Echte Chancen." }] },
  twitter: { card: "summary_large_image", images: ["/brand/og-card.png"] },
  robots: { index: true, follow: true },
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const content = await getStudioContent();
  const origin = process.env.SITE_URL || "http://localhost:3000";
  const sameAs = [content.site_info.linkedin_url, content.site_info.instagram_url].filter((url) => /^https:\/\//.test(url));
  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Zukunft trifft Mittelstand",
    url: origin,
    logo: `${origin}/brand/logo.svg`,
    areaServed: { "@type": "AdministrativeArea", name: content.site_info.region },
    ...(sameAs.length ? { sameAs } : {}),
    ...(content.site_info.contact_email.includes("@") ? { email: content.site_info.contact_email } : {}),
    ...(content.site_info.contact_phone.startsWith("+") ? { telephone: content.site_info.contact_phone } : {}),
  };
  return <html lang="de" data-scroll-behavior="smooth">
    <body>
      <SiteHeader />
      <AnnouncementBar announcement={content.announcement} />
      <main id="main">{children}</main>
      <SiteFooter info={content.site_info} />
      <ConsentBanner />
      <StudioSdk token={process.env.ATONDIX_STUDIO_SITE_TOKEN} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }} />
    </body>
  </html>;
}
