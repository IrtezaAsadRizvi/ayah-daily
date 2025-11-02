// app/layout.tsx
import { ReactNode } from "react";
import "./globals.css";
import "react-tooltip/dist/react-tooltip.css";

import { poppins, spectral, notoArabic } from "@/lib/fonts";
import StoreProvider from "@/state/StoreProvider";
import ClientIntlProvider from "@/components/i18n/ClientIntlProvider";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";

export const dynamic = "force-static";
export const revalidate = false;

export const metadata = {
  metadataBase: new URL("https://ayah-daily.web.app"),
  title: "Ayah Daily - One Quran verse a day",
  description: "One Quran verse a day — simple and beautiful.",
  alternates: { canonical: "/", languages: { en: "/", bn: "/bn", "x-default": "/" } },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${poppins.variable} ${spectral.variable} ${notoArabic.variable} ${poppins.className}`}
    >
      <body suppressHydrationWarning>
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
