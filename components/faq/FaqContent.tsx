"use client";

import { useTranslations } from "next-intl";
import { ChevronDown } from "lucide-react";

const CARD =
  "rounded-2xl border border-black/5 dark:border-white/10 bg-white/50 dark:bg-white/[0.05] backdrop-blur-sm shadow-sm";

export default function FaqContent() {
  const t = useTranslations("Faq");

  const qa: Array<[string, string]> = [
    ["questions.q1", "answers.a1"],
    ["questions.q2", "answers.a2"],
    ["questions.q3", "answers.a3"],
    ["questions.q4", "answers.a4"],
    ["questions.q5", "answers.a5"],
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

      <div className="mt-10 space-y-3 text-left">
        {qa.map(([qK, aK], i) => (
          <details
            key={qK}
            className={`group animate-verse-rise ${CARD} overflow-hidden`}
            style={{ animationDelay: `${180 + i * 70}ms` }}
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 font-spectral text-base font-semibold text-slate-900 dark:text-slate-100 [&::-webkit-details-marker]:hidden">
              <span>{t(qK)}</span>
              <ChevronDown
                size={18}
                className="shrink-0 text-slate-400 transition-transform duration-300 group-open:rotate-180"
              />
            </summary>
            <p className="px-5 pb-5 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              {t(aK)}
            </p>
          </details>
        ))}

        <section
          className={`animate-verse-rise ${CARD} p-5`}
          style={{ animationDelay: `${180 + qa.length * 70}ms` }}
        >
          <h2 className="font-spectral text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
            {t("questions.ai_title")}
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
            {t("answers.ai_body")}
          </p>
        </section>
      </div>
    </div>
  );
}
