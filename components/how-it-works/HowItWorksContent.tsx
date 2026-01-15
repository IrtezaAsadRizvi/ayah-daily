"use client";

import { useTranslations } from "next-intl";

export default function HowItWorksContent() {
  const t = useTranslations("HowItWorks");

  return (
    <section className="mx-auto w-full max-w-4xl px-6 py-10 text-center">
      <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
        {t("title")}
      </h1>
      <p className="mt-3 text-base text-gray-600">
        {t("intro")}
      </p>

      <div className="mt-10 space-y-8 text-left">
        <section>
          <h2 className="text-xl font-semibold text-gray-900">
            {t("sections.daily_title")}
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            {t("sections.daily_body")}
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900">
            {t("sections.translation_title")}
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            {t("sections.translation_body")}
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900">
            {t("sections.clean_title")}
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            {t("sections.clean_body")}
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900">
            {t("sections.ai_title")}
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            {t("sections.ai_body")}
          </p>
        </section>
      </div>
    </section>
  );
}
