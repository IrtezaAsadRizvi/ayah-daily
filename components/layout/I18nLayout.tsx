// components/I18nLayout.tsx
import { NextIntlClientProvider } from "next-intl";
import StoreProvider from "@/state/StoreProvider";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import type { Locale } from "@/lib/i18n/locales";

export default function I18nLayout({
  children,
  locale,
  messages
}: {
  children: React.ReactNode;
  locale: Locale;
  messages: any;
}) {
  return (
    <StoreProvider>
      <NextIntlClientProvider locale={locale} messages={messages}>
        <Navigation />
        {children}
        <Footer />
      </NextIntlClientProvider>
    </StoreProvider>
  );
}
