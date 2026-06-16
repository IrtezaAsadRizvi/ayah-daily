"use client";

import { useTranslations } from "next-intl";

const CARD =
  "rounded-2xl border border-black/5 dark:border-white/10 bg-white/50 dark:bg-white/[0.05] backdrop-blur-sm shadow-sm";

export default function HowItWorksContent() {
  const t = useTranslations("HowItWorks");
  // Reuses the already-translated "Random Ayah / verse discovery" strings that
  // used to live on the home page (Home namespace).
  const tHome = useTranslations("Home");

  const steps: Array<{ title: string; body: string }> = [
    { title: t("sections.daily_title"), body: t("sections.daily_body") },
    { title: t("sections.translation_title"), body: t("sections.translation_body") },
    { title: tHome("seo_h3_a"), body: tHome("seo_p_b") },
    { title: t("sections.clean_title"), body: t("sections.clean_body") },
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

      <ol className="mt-10 space-y-5 text-left">
        {steps.map((s, i) => (
          <li
            key={i}
            className={`animate-verse-rise ${CARD} flex gap-4 p-6`}
            style={{ animationDelay: `${180 + i * 80}ms` }}
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[--accent] font-spectral font-semibold text-white">
              {i + 1}
            </span>
            <div>
              <h2 className="font-spectral text-lg font-semibold text-slate-900 dark:text-slate-100">
                {s.title}
              </h2>
              <p className="mt-1.5 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                {s.body}
              </p>
            </div>
          </li>
        ))}
      </ol>

      <section
        className={`animate-verse-rise ${CARD} mt-5 p-6 text-left`}
        style={{ animationDelay: `${180 + steps.length * 80}ms` }}
      >
        <h2 className="font-spectral text-base font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
          {t("sections.ai_title")}
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
          {t("sections.ai_body")}
        </p>
      </section>
    </div>
  );
}
