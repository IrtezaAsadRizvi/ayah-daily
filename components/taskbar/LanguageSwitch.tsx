"use client";

import React, { useMemo } from "react";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation"; // ← use Next router, not next-intl/client
import { Languages } from "lucide-react";
import Dropdown from "../common/Dropdown";
import { LOCALES, type Locale } from "@/lib/i18n/locales";

type DropdownItem = { text: string; value: Locale };
type DropdownOnSelectArg = string | DropdownItem;

function stripLocalePrefix(path: string) {
  const pattern = new RegExp(`^/(${LOCALES.join("|")})(?=/|$)`);
  return path.replace(pattern, "") || "/";
}

export default function LanguageSwitch() {
  const locale = useLocale() as Locale;
  const t = useTranslations("Header");

  const router = useRouter();
  const pathname = usePathname() || "/";

  const items = useMemo<DropdownItem[]>(
    () => [
      { text: "English", value: "en" },
      { text: "বাংলা", value: "bn" },
      { text: "العربية", value: "ar" },
      { text: "اردو", value: "ur" },
      { text: "Bahasa Indonesia", value: "id" },
      { text: "Türkçe", value: "tr" },
      { text: "فارسی", value: "fa" },
      { text: "Bahasa Melayu", value: "ms" },
      { text: "Français", value: "fr" },
      { text: "Español", value: "es" },
      { text: "हिन्दी", value: "hi" },
      { text: "Svenska", value: "sv" },
    ],
    []
  );

  const handleSelect = (next: DropdownOnSelectArg) => {
    const newLocale = (typeof next === "string" ? next : next?.value) as Locale;
    if (!newLocale || newLocale === locale) return;

    const basePath = stripLocalePrefix(pathname);
    const target = newLocale === "en" ? basePath : `/${newLocale}${basePath}`;
    router.replace(target);
  };

  return (
    <Dropdown
      title={() => <Languages />}
      tooltip={t("select_language")}
      ariaLabel={t("select_language")}
      items={items}
      initialValue={locale}
      onSelect={handleSelect}
    />
  );
}
