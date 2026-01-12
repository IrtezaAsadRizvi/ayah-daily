import { LOCALES, normalizeLocale } from "@/lib/i18n/locales";
import { META_COPY, OG_LOCALE, SITE_URL } from "@/lib/i18n/meta";

export default function Head({ params }: { params: { locale: string } }) {
  const locale = normalizeLocale(params.locale);
  const pageUrl = `${SITE_URL}/${locale}`;
  const meta = META_COPY[locale];

  const org = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#org`,
    name: "One Verse Daily",
    description:
      "Daily Quran verse, Quran tilawat, and reading Quran for Quran education and Islamic education.",
    url: SITE_URL,
    logo: {
      "@type": "ImageObject",
      url: `${SITE_URL}/favicon.ico`,
    },
    sameAs: ["https://github.com/IrtezaAsadRizvi"],
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: "Ayah Daily",
    alternateName: "One Verse Daily",
    url: SITE_URL,
    inLanguage: locale,
    description: meta.description,
    publisher: { "@id": `${SITE_URL}/#org` },
  };

  const webpage = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${pageUrl}#webpage`,
    url: pageUrl,
    name: meta.title,
    description: meta.description,
    inLanguage: locale,
    isPartOf: { "@id": `${SITE_URL}/#website` },
    about: { "@id": `${SITE_URL}/#org` },
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: `${SITE_URL}/ayah_daily_og.png`,
    },
  };

  const schema = [org, website, webpage];

  return (
    <>
      <title>{meta.title}</title>
      <meta name="description" content={meta.description} />
      <meta name="keywords" content={meta.keywords} />
      <meta property="og:title" content={meta.title} />
      <meta property="og:description" content={meta.description} />
      <meta property="og:site_name" content="Ayah Daily" />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={pageUrl} />
      <meta property="og:locale" content={OG_LOCALE[locale]} />
      <meta property="og:image" content={`${SITE_URL}/ayah_daily_og.png`} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={meta.title} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={meta.title} />
      <meta name="twitter:description" content={meta.description} />
      <meta name="twitter:image" content={`${SITE_URL}/ayah_daily_og.png`} />
      <meta name="robots" content="index, follow" />
      <link rel="icon" href="/favicon.ico" sizes="any" />
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
        src="https://analytics.ahrefs.com/analytics.js"
        data-key="X1UXlwET7usTWzPvkpBIAw"
        async
      ></script>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </>
  );
}
