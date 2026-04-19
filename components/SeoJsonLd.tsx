import { SITE_DESCRIPTION, SITE_NAME, SITE_SAME_AS } from "@/lib/brand";
import { getSiteUrl } from "@/lib/site";

/** schema.org JSON-LD für Organization + WebSite (Rich Results / SEO). */
export function SeoJsonLd() {
  const base = getSiteUrl();
  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    alternateName: "zeichendesuniversums",
    description: SITE_DESCRIPTION,
    url: base,
    sameAs: [...SITE_SAME_AS],
    knowsAbout: [
      "Astrologie",
      "Bewusstsein",
      "Sternzeichen",
      "Geburtshoroskop",
      "Human Design",
      "Beziehungskompatibilität",
    ],
  };
  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    alternateName: "zeichendesuniversums",
    description: SITE_DESCRIPTION,
    url: base,
    inLanguage: "de-DE",
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: base,
      sameAs: [...SITE_SAME_AS],
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }}
      />
    </>
  );
}
