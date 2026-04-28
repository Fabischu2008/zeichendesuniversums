import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Script from "next/script";

const gaRaw = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim() ?? "";
const gaId = /^G-[A-Z0-9]+$/i.test(gaRaw) ? gaRaw : null;
const adsTagRaw = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID?.trim() ?? "";
const adsSendToRaw =
  process.env.NEXT_PUBLIC_GOOGLE_ADS_PURCHASE_SEND_TO?.trim() ?? "";
const adsIdFromSendTo = adsSendToRaw.match(/^(AW-\d+)\//i)?.[1] ?? null;
const adsId = /^AW-\d+$/i.test(adsTagRaw)
  ? adsTagRaw
  : adsIdFromSendTo && /^AW-\d+$/i.test(adsIdFromSendTo)
    ? adsIdFromSendTo
    : null;
const googleTagIds = Array.from(
  new Set([gaId, adsId].filter((x): x is string => Boolean(x))),
);

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
      {googleTagIds.length > 0 ? (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(googleTagIds[0])}`}
            strategy="afterInteractive"
          />
          <Script id="zd-ga4" strategy="afterInteractive">
            {`
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
${googleTagIds
  .map((id) =>
    /^G-/i.test(id)
      ? `gtag('config', '${id}', { anonymize_ip: true });`
      : `gtag('config', '${id}');`,
  )
  .join("\n")}
`}
          </Script>
        </>
      ) : null}
    </>
  );
}
