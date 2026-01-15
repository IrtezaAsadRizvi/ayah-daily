"use client";

import { useTranslations } from "next-intl";

export default function FaqContent() {
  const t = useTranslations("Faq");

  return (
    <section className="mx-auto w-full max-w-4xl px-6 py-10 text-center">
      <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
        {t("title")}
      </h1>
      <p className="mt-3 text-base text-gray-600">
        {t("intro")}
      </p>

      <div className="mt-10 space-y-6 text-left">
        <section>
          <h2 className="text-lg font-semibold text-gray-900">
            {t("questions.q1")}
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            {t("answers.a1")}
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900">
            {t("questions.q2")}
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            {t("answers.a2")}
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900">
            {t("questions.q3")}
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            {t("answers.a3")}
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900">
            {t("questions.q4")}
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            {t("answers.a4")}
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900">
            {t("questions.q5")}
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            {t("answers.a5")}
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900">
            {t("questions.ai_title")}
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            {t("answers.ai_body")}
          </p>
        </section>
      </div>
    </section>
  );
}
