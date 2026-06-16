"use client";

import { useTranslations } from "next-intl";

const CARD =
  "rounded-2xl border border-black/5 dark:border-white/10 bg-white/50 dark:bg-white/[0.05] backdrop-blur-sm shadow-sm";

export default function AboutContent() {
  const t = useTranslations("About");

  const facts: Array<[string, string]> = [
    ["sections.facts_product_label", "sections.facts_product_value"],
    ["sections.facts_category_label", "sections.facts_category_value"],
    ["sections.facts_access_label", "sections.facts_access_value"],
    ["sections.facts_primary_label", "sections.facts_primary_value"],
  ];

  return (
    <div className="mx-auto w-full max-w-2xl px-6 py-12 sm:py-16">
      <header className="text-center">
        <h1
          className="animate-verse-rise font-spectral font-bold text-3xl sm:text-4xl text-slate-900 dark:text-slate-100"
          style={{ animationDelay: "0ms" }}
        >
          {t("title")}
        </h1>
        <p
          className="animate-verse-rise mx-auto mt-4 max-w-xl text-base leading-relaxed text-slate-600 dark:text-slate-300"
          style={{ animationDelay: "90ms" }}
        >
          {t("intro")}
        </p>
      </header>

      <div className="mt-10 space-y-5 text-left">
        <section className={`animate-verse-rise ${CARD} p-6`} style={{ animationDelay: "180ms" }}>
          <h2 className="font-spectral text-xl font-semibold text-slate-900 dark:text-slate-100">
            {t("sections.what_title")}
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
            {t("sections.what_body")}
          </p>
          <ul className="mt-4 space-y-2.5 text-sm text-slate-600 dark:text-slate-300">
            {["what_list_1", "what_list_2", "what_list_3", "what_list_4"].map((k) => (
              <li key={k} className="flex gap-3">
                <span aria-hidden className="mt-[0.45rem] h-1.5 w-1.5 shrink-0 rounded-full bg-[--accent]" />
                <span>{t(`sections.${k}`)}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className={`animate-verse-rise ${CARD} p-6`} style={{ animationDelay: "260ms" }}>
          <h2 className="font-spectral text-xl font-semibold text-slate-900 dark:text-slate-100">
            {t("sections.integrity_title")}
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
            {t("sections.integrity_body")}
          </p>
        </section>

        <section className={`animate-verse-rise ${CARD} p-6`} style={{ animationDelay: "340ms" }}>
          <h2 className="font-spectral text-xl font-semibold text-slate-900 dark:text-slate-100">
            {t("sections.facts_title")}
          </h2>
          <dl className="mt-4 grid gap-3 sm:grid-cols-2">
            {facts.map(([labelK, valueK]) => (
              <div key={labelK} className="rounded-xl bg-black/[0.03] dark:bg-white/[0.04] px-4 py-3">
                <dt className="text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
                  {t(labelK)}
                </dt>
                <dd className="mt-1 text-sm font-medium text-slate-800 dark:text-slate-100">
                  {t(valueK)}
                </dd>
              </div>
            ))}
          </dl>
        </section>

        <section className={`animate-verse-rise ${CARD} p-6`} style={{ animationDelay: "420ms" }}>
          <h2 className="font-spectral text-xl font-semibold text-slate-900 dark:text-slate-100">
            {t("sections.ai_title")}
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
            {t("sections.ai_body")}
          </p>
        </section>
      </div>
    </div>
  );
}
