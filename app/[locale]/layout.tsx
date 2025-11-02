// app/[locale]/layout.tsx
import { ReactNode } from "react";
import { notFound } from "next/navigation";

export const dynamic = "force-static";
export const revalidate = false;

const LOCALES = ["bn"] as const;
type Locale = (typeof LOCALES)[number];

export function generateStaticParams(): Array<{ locale: Locale }> {
    return LOCALES.map((l) => ({ locale: l }));
}

export default function LocaleLayout({
    children,
    params: { locale }
}: { children: ReactNode; params: { locale: Locale } }) {
    if (!LOCALES.includes(locale)) notFound();
    return children; // Root wraps with provider + nav/footer
}
