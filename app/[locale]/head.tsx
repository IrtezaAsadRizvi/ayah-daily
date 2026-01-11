import { LOCALES, normalizeLocale } from "@/lib/i18n/locales";

const SITE_URL = "https://ayah-daily.web.app";

export default function Head({ params }: { params: { locale: string } }) {
  const locale = normalizeLocale(params.locale);
  const pageUrl = `${SITE_URL}/${locale}`;

  const org = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#org`,
    name: "One Verse Daily",
    url: SITE_URL,
    logo: `${SITE_URL}/favicon.ico`,
    sameAs: ["https://github.com/IrtezaAsadRizvi"],
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: "Ayah Daily",
    url: SITE_URL,
    inLanguage: locale,
    publisher: { "@id": `${SITE_URL}/#org` },
  };

  const webpage = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${pageUrl}#webpage`,
    url: pageUrl,
    name: "Ayah Daily",
    inLanguage: locale,
    isPartOf: { "@id": `${SITE_URL}/#website` },
    about: { "@id": `${SITE_URL}/#org` },
  };

  const schema = [org, website, webpage];

  return (
    <>
      <link rel="canonical" href={pageUrl} />
      {LOCALES.map((l) => (
        <link
          key={l}
          rel="alternate"
          hrefLang={l}
          href={`${SITE_URL}/${l}`}
        />
      ))}
      <link rel="alternate" hrefLang="x-default" href={`${SITE_URL}/en`} />
      <meta
        name="google-site-verification"
        content="p21olxSwB19NCND1OiQ9My_xGGfGAO9cbjxow4SGhic"
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </>
  );
}
