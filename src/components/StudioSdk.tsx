import Script from "next/script";

export function StudioSdk() {
  const token = process.env.ATONDIX_STUDIO_SITE_TOKEN;
  return (
    <Script
      src="https://studio.atondix.de/sdk/atondix.js"
      data-site-token={token || undefined}
      data-consent="pending"
      data-auto-track="true"
      strategy="afterInteractive"
    />
  );
}
