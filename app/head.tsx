import { LOCALES } from "@/lib/i18n/locales";

const SITE_URL = "https://ayah-daily.web.app";

export default function Head() {
  return (
    <>
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
    </>
  );
}
