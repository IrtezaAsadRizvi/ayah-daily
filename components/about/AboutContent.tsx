"use client";

import { useTranslations } from "next-intl";

export default function AboutContent() {
  const t = useTranslations("About");

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
            {t("sections.what_title")}
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            {t("sections.what_body")}
          </p>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-gray-600">
            <li>{t("sections.what_list_1")}</li>
            <li>{t("sections.what_list_2")}</li>
            <li>{t("sections.what_list_3")}</li>
            <li>{t("sections.what_list_4")}</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900">
            {t("sections.ai_title")}
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            {t("sections.ai_body")}
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900">
            {t("sections.integrity_title")}
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            {t("sections.integrity_body")}
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900">
            {t("sections.facts_title")}
          </h2>
          <dl className="mt-3 grid gap-3 text-sm text-gray-600">
            <div>
              <dt className="font-semibold text-gray-900">
                {t("sections.facts_product_label")}
              </dt>
              <dd>{t("sections.facts_product_value")}</dd>
            </div>
            <div>
              <dt className="font-semibold text-gray-900">
                {t("sections.facts_category_label")}
              </dt>
              <dd>{t("sections.facts_category_value")}</dd>
            </div>
            <div>
              <dt className="font-semibold text-gray-900">
                {t("sections.facts_access_label")}
              </dt>
              <dd>{t("sections.facts_access_value")}</dd>
            </div>
            <div>
              <dt className="font-semibold text-gray-900">
                {t("sections.facts_primary_label")}
              </dt>
              <dd>{t("sections.facts_primary_value")}</dd>
            </div>
          </dl>
        </section>
      </div>
    </section>
  );
}
