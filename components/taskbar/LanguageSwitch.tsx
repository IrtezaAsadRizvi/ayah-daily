"use client";

import React, { useMemo } from "react";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation"; // ← use Next router, not next-intl/client
import { Languages } from "lucide-react";
import Dropdown from "../common/Dropdown";

type LocaleCode = "en" | "bn";
type DropdownItem = { text: string; value: LocaleCode };
type DropdownOnSelectArg = string | DropdownItem;

function stripLocalePrefix(path: string) {
  // remove leading /en or /bn
  return path.replace(/^\/(en|bn)(?=\/|$)/, "") || "/";
}

export default function LanguageSwitch() {
  const t = useTranslations("Header");
  const locale = useLocale() as LocaleCode;

  const router = useRouter();
  const pathname = usePathname() || "/";

  const items = useMemo<DropdownItem[]>(
    () => [
      { text: "English", value: "en" },
      { text: "বাংলা", value: "bn" },
    ],
    []
  );

  const handleSelect = (next: DropdownOnSelectArg) => {
    const newLocale = (typeof next === "string" ? next : next?.value) as LocaleCode;
    if (!newLocale || newLocale === locale) return;

    const basePath = stripLocalePrefix(pathname);
    const target = newLocale === "en" ? basePath : `/bn${basePath}`;
    router.replace(target);
  };

  return (
    <Dropdown
      title={() => <Languages />}
      // tooltip={t("select_language")}
      items={items}
      initialValue={locale}
      onSelect={handleSelect}
    />
  );
}
