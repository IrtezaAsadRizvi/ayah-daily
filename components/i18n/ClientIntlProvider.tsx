"use client";

import { NextIntlClientProvider } from "next-intl";
import { usePathname } from "next/navigation";
import en from "@/messages/en.json";
import bn from "@/messages/bn.json";

const MESSAGES: Record<string, any> = { en, bn };

export default function ClientIntlProvider({ children }: { children: React.ReactNode }) {
    const pathname = usePathname() || "/";
    const locale = pathname.startsWith("/bn") ? "bn" : "en";
    const messages = MESSAGES[locale] ?? en;

    return (
        <NextIntlClientProvider locale={locale} messages={messages}>
            {children}
        </NextIntlClientProvider>
    );
}
