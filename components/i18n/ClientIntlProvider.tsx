"use client";

import { NextIntlClientProvider } from "next-intl";
import { usePathname } from "next/navigation";
import en from "@/messages/en.json";
import bn from "@/messages/bn.json";
import ar from "@/messages/ar.json";
import ur from "@/messages/ur.json";
import id from "@/messages/id.json";
import tr from "@/messages/tr.json";
import fa from "@/messages/fa.json";
import ms from "@/messages/ms.json";
import fr from "@/messages/fr.json";
import es from "@/messages/es.json";
import hi from "@/messages/hi.json";
import sv from "@/messages/sv.json";
import { DEFAULT_LOCALE, normalizeLocale } from "@/lib/i18n/locales";

const MESSAGES: Record<string, any> = { en, bn, ar, ur, id, tr, fa, ms, fr, es, hi, sv };

export default function ClientIntlProvider({ children }: { children: React.ReactNode }) {
    const pathname = usePathname() || "/";
    const locale = normalizeLocale(pathname.split("/")[1]);
    const messages = MESSAGES[locale] ?? MESSAGES[DEFAULT_LOCALE] ?? en;

    return (
        <NextIntlClientProvider locale={locale} messages={messages}>
            {children}
        </NextIntlClientProvider>
    );
}
