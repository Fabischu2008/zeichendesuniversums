import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Script from "next/script";

const gaRaw = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim() ?? "";
const gaId = /^G-[A-Z0-9]+$/i.test(gaRaw) ? gaRaw : null;

/**
 * Vercel Web Analytics + Speed Insights (Root-Layout, Ende von <body> – wie Doku).
 * Im Vercel-Projekt unter Observability → Web Analytics / Speed Insights aktivieren,
 * dann Production deployen. Mobile-RUM kann bei wenig Traffic oder Blockern leer wirken.
 * Optional: GA4 mit NEXT_PUBLIC_GA_MEASUREMENT_ID=G-…
 */
export function SiteAnalytics() {
  return (
    <>
      <Analytics />
      <SpeedInsights />
      {gaId ? (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(gaId)}`}
            strategy="afterInteractive"
          />
          <Script id="zd-ga4" strategy="afterInteractive">
            {`
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${gaId}', { anonymize_ip: true });
`}
          </Script>
        </>
      ) : null}
    </>
  );
}
