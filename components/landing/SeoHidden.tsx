"use client";

import { useTranslations } from "next-intl";

export default function SeoHidden() {
  const t = useTranslations("Home");
  return (
    <section className="mt-12 mb-8 max-w-2xl mx-auto px-4 text-center text-slate-600 dark:text-slate-400">
      <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
        {t("h1")}
      </h2>

      <h2 className="mt-8 text-base font-semibold text-slate-900 dark:text-slate-100">
        {t("seo_h2_a")}
      </h2>
      <p className="mt-3 text-sm leading-relaxed">{t("seo_p_a")}</p>

      <h3 className="mt-6 text-base font-semibold text-slate-900 dark:text-slate-100">
        {t("seo_h3_a")}
      </h3>
      <p className="mt-3 text-sm leading-relaxed">{t("seo_p_b")}</p>

      <h3 className="mt-6 text-base font-semibold text-slate-900 dark:text-slate-100">
        {t("seo_h3_b")}
      </h3>
      <p className="mt-3 text-sm leading-relaxed">{t("seo_p_c")}</p>
      <p className="mt-3 text-sm leading-relaxed">{t("seo_p_d")}</p>
    </section>
  );
}
