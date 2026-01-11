const SITE_URL = "https://ayah-daily.web.app";
const SUPPORTED_LOCALES = ["en", "bn"] as const;

type Locale = (typeof SUPPORTED_LOCALES)[number];

function normalizeLocale(value: string | undefined): Locale {
  return SUPPORTED_LOCALES.includes(value as Locale) ? (value as Locale) : "en";
}

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
