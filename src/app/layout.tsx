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
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { StudioSdk } from "@/components/StudioSdk";
import { getStudioContent } from "@/lib/content";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.SITE_URL || "http://localhost:3000"),
  title: { default: "Zukunft trifft Mittelstand", template: "%s | Zukunft trifft Mittelstand" },
  description: "Echte Begegnungen. Echte Chancen. Unternehmen kommen in die Schule.",
  icons: { icon: "/favicon.svg" },
  openGraph: { type: "website", siteName: "Zukunft trifft Mittelstand", locale: "de_DE" },
  robots: { index: true, follow: true },
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const content = await getStudioContent();
  return <html lang="de" data-scroll-behavior="smooth">
    <body>
      <SiteHeader />
      <main id="main">{children}</main>
      <SiteFooter info={content.site_info} />
      <ConsentBanner />
      <StudioSdk />
    </body>
  </html>;
}
