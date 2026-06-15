"use client";

import { useTranslations } from "next-intl";

export default function SeoIntro() {
  const t = useTranslations("Home");
  return (
    <div className="mt-10 max-w-2xl mx-auto px-4 text-center text-slate-600 dark:text-slate-400">
      <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
        {t("intro_title")}
      </h2>
      <p className="mt-3 text-sm leading-relaxed">{t("intro_body")}</p>
    </div>
  );
}
