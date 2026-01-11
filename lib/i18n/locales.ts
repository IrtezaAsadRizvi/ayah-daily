export const LOCALES = [
  "en",
  "bn",
  "ar",
  "ur",
  "id",
  "tr",
  "fa",
  "ms",
  "fr",
  "es",
  "hi",
] as const;

export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "en";

export function normalizeLocale(value: string | undefined): Locale {
  return LOCALES.includes(value as Locale) ? (value as Locale) : DEFAULT_LOCALE;
}
