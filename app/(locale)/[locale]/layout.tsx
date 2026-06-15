// app/(locale)/[locale]/layout.tsx
import type { Metadata } from "next";
import { ReactNode, Suspense } from "react";
import Script from "next/script";
import { notFound } from "next/navigation";

import "../../globals.css";
import "react-tooltip/dist/react-tooltip.css";

import { poppins, spectral, notoArabic } from "@/lib/fonts";
import StoreProvider from "@/state/StoreProvider";
import ClientIntlProvider from "@/components/i18n/ClientIntlProvider";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import GAClient from "@/app/ga-client";
import { GA_ID } from "@/lib/ga";
import { LOCALES, type Locale } from "@/lib/i18n/locales";
import { META_COPY, SITE_URL } from "@/lib/i18n/meta";

const RTL_LOCALES: ReadonlyArray<Locale> = ["ar", "ur", "fa"];
const ANALYTICS_GA_ID = GA_ID || "G-RPGYNG9Q5R";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  robots: { index: true, follow: true },
  verification: { google: "p21olxSwB19NCND1OiQ9My_xGGfGAO9cbjxow4SGhic" },
  icons: { icon: [{ url: "/favicon.ico", sizes: "any" }] },
};

export function generateStaticParams(): Array<{ locale: Locale }> {
  return LOCALES.map((l) => ({ locale: l }));
}

function StructuredData({ locale }: { locale: Locale }) {
  const pageUrl = `${SITE_URL}/${locale}`;
  const meta = META_COPY[locale];

  const org = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#org`,
    name: "Ayah Daily",
    alternateName: "One Verse Daily",
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
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export default function LocaleLayout({
  children,
  params: { locale },
}: {
  children: ReactNode;
  params: { locale: Locale };
}) {
  if (!LOCALES.includes(locale)) notFound();

  const dir = RTL_LOCALES.includes(locale) ? "rtl" : "ltr";

  return (
    <html
      lang={locale}
      dir={dir}
      suppressHydrationWarning
      className={`${poppins.variable} ${spectral.variable} ${notoArabic.variable} ${poppins.className}`}
    >
      <body suppressHydrationWarning>
        <StructuredData locale={locale} />

        {/* Google Analytics */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${ANALYTICS_GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${ANALYTICS_GA_ID}');
          `}
        </Script>

        {/* Ahrefs Analytics */}
        <Script
          src="https://analytics.ahrefs.com/analytics.js"
          data-key="X1UXlwET7usTWzPvkpBIAw"
          strategy="afterInteractive"
        />

        <Suspense fallback={null}>
          <GAClient />
        </Suspense>

        <StoreProvider>
          <ClientIntlProvider>
            <main className="h-[100dvh] w-[100dvw] flex flex-col">
              <Navigation />
              <section className="flex-grow">{children}</section>
              <Footer />
            </main>
          </ClientIntlProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
