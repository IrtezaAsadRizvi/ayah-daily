"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { normalizeLocale } from "@/lib/i18n/locales";

export default function LocaleHtmlLang() {
  const pathname = usePathname() || "/";
  const locale = normalizeLocale(pathname.split("/")[1]);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  return null;
}
