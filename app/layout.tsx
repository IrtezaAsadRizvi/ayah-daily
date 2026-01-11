// app/layout.tsx
import type { Metadata } from "next";
import { ReactNode } from "react";
import "./globals.css";
import "react-tooltip/dist/react-tooltip.css";

import { poppins, spectral, notoArabic } from "@/lib/fonts";
import StoreProvider from "@/state/StoreProvider";
import ClientIntlProvider from "@/components/i18n/ClientIntlProvider";
import LocaleHtmlLang from "@/components/i18n/LocaleHtmlLang";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://ayah-daily.web.app"),
  title: "Ayah Daily - One Quran verse a day",
  description: "One Quran verse a day — simple and beautiful.",
  robots: { index: true, follow: true },
  verification: { google: "p21olxSwB19NCND1OiQ9My_xGGfGAO9cbjxow4SGhic" },

  openGraph: {
    type: "website",
    siteName: "Ayah Daily",
    title: "Ayah Daily - One Quran verse a day",
    description: "One Quran verse a day — simple and beautiful.",
    images: [
      {
        url: "https://ayah-daily.web.app/ayah_daily_og.png",
        width: 1200,
        height: 630,
        alt: "Ayah Daily - One Quran verse a day",
      },
    ],
    locale: "en_US",
  },

  twitter: {
    card: "summary_large_image",
    title: "Ayah Daily - One Quran verse a day",
    description: "One Quran verse a day — simple and beautiful.",
    images: ["https://ayah-daily.web.app/ayah_daily_og.png"],
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${poppins.variable} ${spectral.variable} ${notoArabic.variable} ${poppins.className}`}
    >
      <body suppressHydrationWarning>
        <LocaleHtmlLang />
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
