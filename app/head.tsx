import { LOCALES } from "@/lib/i18n/locales";
import { META_COPY, OG_LOCALE, SITE_URL } from "@/lib/i18n/meta";

export default function Head() {
  const meta = META_COPY.en;
  return (
    <>
      <title>{meta.title}</title>
      <meta name="description" content={meta.description} />
      <meta property="og:title" content={meta.title} />
      <meta property="og:description" content={meta.description} />
      <meta property="og:site_name" content="Ayah Daily" />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={`${SITE_URL}/en`} />
      <meta property="og:locale" content={OG_LOCALE.en} />
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
      <link rel="canonical" href={`${SITE_URL}/en`} />
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
    </>
  );
}
