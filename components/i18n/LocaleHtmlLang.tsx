"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const SUPPORTED_LOCALES = ["en", "bn"];

function getLocale(pathname: string): string {
  const segment = pathname.split("/")[1];
  return SUPPORTED_LOCALES.includes(segment) ? segment : "en";
}

export default function LocaleHtmlLang() {
  const pathname = usePathname() || "/";
  const locale = getLocale(pathname);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  return null;
}
